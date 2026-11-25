import { test } from "node:test";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdtemp, writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createReleaseLab } from "./server.mjs";

const request = (url, options = {}) =>
  fetch(url, { ...options, signal: AbortSignal.timeout(2000) });

async function start(lab) {
  lab.server.listen(0, "127.0.0.1");
  await once(lab.server, "listening");
  return `http://127.0.0.1:${lab.server.address().port}`;
}
async function close(lab) {
  lab.server.closeAllConnections();
  await new Promise((resolve) => lab.server.close(resolve));
}

test("A -> B -> A, hashed assets survive, HTML revalidates", async () => {
  const lab = createReleaseLab();
  const a = lab.stage("A");
  const b = lab.stage("B");
  lab.activate("A");
  const url = await start(lab);
  try {
    const first = await request(url);
    assert.match(await first.text(), /Release A/);
    assert.equal(first.headers.get("cache-control"), "no-cache");
    lab.activate("B");
    assert.match(
      await (await request(url + "/courses/nuxt")).text(),
      /Release B/,
    );
    const old = await request(url + a.asset);
    assert.equal(old.status, 200);
    assert.match(old.headers.get("cache-control"), /immutable/);
    assert.match(await old.text(), /"A"/);
    assert.notEqual(a.asset, b.asset);
    lab.activate("A");
    assert.equal((await (await request(url + "/health")).json()).release, "A");
  } finally {
    await close(lab);
  }
});
test("candidate gate and readiness failure are observable without switching", async () => {
  const lab = createReleaseLab();
  lab.stage("A");
  lab.stage("bad", { healthy: false });
  lab.activate("A");
  const url = await start(lab);
  try {
    assert.throws(() => lab.activate("bad"), /rejected/);
    assert.equal((await (await request(url + "/health")).json()).release, "A");
    lab.setReadiness(false);
    assert.equal((await request(url + "/health")).status, 503);
    lab.setReadiness(true);
    assert.equal((await request(url + "/health")).status, 200);
  } finally {
    await close(lab);
  }
});
test("missing assets/API stay404; logs omit query and credentials", async () => {
  const lab = createReleaseLab();
  lab.stage("A");
  lab.activate("A");
  const url = await start(lab);
  try {
    for (const path of ["/assets/missing.js", "/api/missing"])
      assert.equal(
        (
          await request(url + path + "?token=SYNTHETIC_SECRET", {
            headers: { authorization: "Bearer SYNTHETIC_SECRET" },
          })
        ).status,
        404,
      );
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(
      JSON.stringify(lab.records).includes("SYNTHETIC_SECRET"),
      false,
    );
    assert.ok(lab.records.every((x) => Number.isFinite(x.durationMs)));
  } finally {
    await close(lab);
  }
});
test("real Nginx config: SPA fallback, strict assets/API404, proxy and gzip", async () => {
  const nginx = process.env.NGINX_PATH || "/opt/homebrew/bin/nginx";
  assert.equal(
    spawnSync(nginx, ["-v"]).status,
    0,
    "Install Nginx explicitly to run this optional tool-specific verification",
  );
  const lab = createReleaseLab();
  lab.stage("A");
  lab.activate("A");
  const backend = await start(lab);
  const dir = await mkdtemp(join(tmpdir(), "compass-stage7-nginx-"));
  let child;
  try {
    await mkdir(join(dir, "www/assets"), { recursive: true });
    await writeFile(
      join(dir, "www/index.html"),
      '<!doctype html><html lang="en"><meta charset="utf-8"><title>SPA shell</title><h1>SPA shell</h1></html>',
    );
    const large = "// text asset\n".repeat(1000);
    const assetName = `large.${createHash("sha256").update(large).digest("hex").slice(0, 12)}.js`;
    await writeFile(join(dir, "www/assets", assetName), large);
    const config = `daemon off;\nworker_processes 1;\npid "${dir}/nginx.pid";\nerror_log "${dir}/error.log";\nevents { worker_connections 32; }\nhttp { log_format minimal '$request_method $uri $status'; access_log "${dir}/access.log" minimal; default_type application/octet-stream; gzip on; gzip_vary on; gzip_min_length 100; gzip_types application/javascript; server { listen 127.0.0.1:4508; root "${dir}/www"; location ^~ /api/ { proxy_pass ${backend}; } location = /health { proxy_pass ${backend}; } location ^~ /assets/ { types { application/javascript js; } try_files $uri =404; add_header Cache-Control "public, max-age=31536000, immutable"; } location / { try_files $uri $uri/ /index.html; add_header Cache-Control "no-cache"; } } }`;
    await writeFile(join(dir, "nginx.conf"), config);
    const check = spawnSync(
      nginx,
      ["-t", "-p", dir + "/", "-c", join(dir, "nginx.conf")],
      { encoding: "utf8" },
    );
    assert.equal(check.status, 0, check.stderr);
    child = spawn(nginx, ["-p", dir + "/", "-c", join(dir, "nginx.conf")], {
      stdio: "ignore",
    });
    let ready = false;
    for (let i = 0; i < 40; i++) {
      if (child.exitCode !== null) throw new Error("Nginx exited");
      try {
        if ((await request("http://127.0.0.1:4508/health")).status === 200) {
          ready = true;
          break;
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 50));
    }
    assert.ok(ready, "Nginx startup bounded2s");
    const spa = await request("http://127.0.0.1:4508/courses/nuxt");
    assert.equal(spa.status, 200);
    assert.match(await spa.text(), /SPA shell/);
    assert.equal(spa.headers.get("cache-control"), "no-cache");
    for (const path of ["/assets/missing.js", "/api/missing"])
      assert.equal((await request("http://127.0.0.1:4508" + path)).status, 404);
    assert.equal(
      (await (await request("http://127.0.0.1:4508/api/status")).json())
        .release,
      "A",
    );
    const compressed = await request(
      `http://127.0.0.1:4508/assets/${assetName}`,
      { headers: { "Accept-Encoding": "gzip" } },
    );
    assert.equal(compressed.headers.get("content-encoding"), "gzip");
    assert.match(compressed.headers.get("vary"), /accept-encoding/i);
    assert.equal((await compressed.text()).length, 14000);
    await request("http://127.0.0.1:4508/?token=SYNTHETIC_SECRET");
    child.kill("SIGQUIT");
    await once(child, "exit");
    child = undefined;
    assert.equal(
      (await readFile(join(dir, "access.log"), "utf8")).includes(
        "SYNTHETIC_SECRET",
      ),
      false,
    );
  } finally {
    if (child && child.exitCode === null) {
      child.kill("SIGQUIT");
      await once(child, "exit");
    }
    await close(lab);
    await rm(dir, { recursive: true, force: true });
  }
});
