import { test } from "node:test";
import { get } from "node:http";
import assert from "node:assert/strict";
import { publicKey, speculationPlan } from "../logic.mjs";
import { startServer } from "../server.mjs";
test("cache identity includes declared output dimensions and bypasses credentials", () => {
  const u = (q) => new URL(q, "http://local");
  assert.notEqual(
    publicKey(u("/public-data?q=vue")),
    publicKey(u("/public-data?q=nuxt")),
  );
  assert.equal(
    publicKey(u("/public-data?q=vue&lang=en")),
    publicKey(u("/public-data?lang=en&q=vue")),
  );
  assert.equal(publicKey(u("/public-data"), { cookie: "scope=alice" }), null);
  assert.equal(publicKey(u("/public-data"), { cookie: "" }), null);
  assert.equal(publicKey(u("/public-data"), { Authorization: "" }), null);
  assert.equal(
    publicKey(u("/public-data"), { authorization: "Bearer synthetic" }),
    null,
  );
  assert.equal(publicKey(u("/public-data?scope=alice")), null);
});
test("speculation is progressive and skips save-data; only fixed public GET target", () => {
  assert.equal(speculationPlan(false), null);
  assert.equal(speculationPlan(true, { saveData: true }), null);
  assert.deepEqual(speculationPlan(true).prefetch[0].urls, ["/next.html"]);
});
test("actual public cache and concurrent credential bypass never share private fixture", async () => {
  const server = await startServer();
  const get = (path, headers = {}) =>
    fetch("http://127.0.0.1:4519" + path, {
      headers,
      signal: AbortSignal.timeout(2000),
    });
  try {
    let r = await get("/public-data?q=vue&lang=en");
    assert.equal(r.headers.get("x-lab-cache"), "MISS");
    const first = await r.json();
    r = await get("/public-data?lang=en&q=vue");
    assert.equal(r.headers.get("x-lab-cache"), "HIT");
    assert.equal((await r.json()).read, first.read);
    assert.equal((await (await get("/public-data?q=nuxt")).json()).q, "nuxt");
    const privateResults = await Promise.all(
      [
        { cookie: "scope=alice" },
        { cookie: "scope=bob" },
        { authorization: "Bearer alice" },
        { authorization: "Bearer bob" },
      ].map(async (headers) => {
        const response = await get("/public-data?q=vue&lang=en", headers);
        assert.equal(response.headers.get("x-lab-cache"), "BYPASS");
        assert.match(
          response.headers.get("cache-control"),
          /private.*no-store/,
        );
        return response.json();
      }),
    );
    assert.deepEqual(
      privateResults.map((x) => x.scope),
      ["alice", "bob", "alice", "bob"],
    );
    assert.equal(new Set(privateResults.map((x) => x.read)).size, 4);
    assert.equal(
      (await (await get("/public-data?q=vue&lang=en")).json()).scope,
      "public",
    );
  } finally {
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  }
});

test("real HTTP103 informational response before final200, not browserHTTP3 proof", async () => {
  const server = await startServer();
  try {
    const statuses = [];
    await new Promise((yes, no) => {
      const req = get("http://127.0.0.1:4519/early-hints", (res) => {
        assert.equal(res.statusCode, 200);
        res.resume();
        res.on("end", yes);
      });
      req.on("information", (info) => {
        statuses.push(info.statusCode);
        assert.match(info.headers.link, /noncritical\.css/);
      });
      req.setTimeout(2000, () => req.destroy(new Error("timeout")));
      req.on("error", no);
    });
    assert.deepEqual(statuses, [103]);
  } finally {
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  }
});
