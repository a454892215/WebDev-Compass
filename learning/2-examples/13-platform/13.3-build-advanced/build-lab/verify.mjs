import assert from "node:assert/strict";
import {
  mkdtemp,
  readFile,
  writeFile,
  mkdir,
  copyFile,
  readdir,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";
import { build } from "vite";
import { cachedBuild } from "./cache.mjs";
import { startServer } from "./server.mjs";
const root = resolve("."),
  tmp = await mkdtemp(join(tmpdir(), "stage13-build-"));
const run = (bin, args, cwd = root) => {
  const r = spawnSync(bin, args, { cwd, encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr || r.stdout);
  return r.stdout;
};
let server, browser;
try {
  const source = join(tmp, "source");
  await mkdir(source);
  for (const name of [
    "app.ts",
    "style.css",
    "index.html",
    "plugin.mjs",
    "vite.config.mjs",
    "cache.mjs",
    "package.json",
    "pnpm-lock.yaml",
  ])
    await copyFile(join(root, name), join(source, name));
  const outDir = join(tmp, "app"),
    cacheDir = join(tmp, "cache");
  const cold = await cachedBuild({ root: source, cacheDir, outDir });
  assert.equal(cold.hit, false);
  const initial = await readFile(join(outDir, "build-audit.json"), "utf8");
  await rm(outDir, { recursive: true, force: true });
  const warm = await cachedBuild({ root: source, cacheDir, outDir });
  assert.equal(warm.hit, true);
  assert.equal(
    await readFile(join(outDir, "build-audit.json"), "utf8"),
    initial,
  );
  const config = await cachedBuild({
    root: source,
    cacheDir,
    outDir,
    label: "build-lab-v2",
  });
  assert.equal(config.hit, false);
  assert.notEqual(config.key, cold.key);
  await writeFile(
    join(source, "app.ts"),
    (await readFile(join(source, "app.ts"), "utf8")).replace(
      "计数：",
      "点击次数：",
    ),
  );
  const changed = await cachedBuild({
    root: source,
    cacheDir,
    outDir,
    label: "build-lab-v2",
  });
  assert.equal(changed.hit, false);
  assert.notEqual(changed.key, config.key);
  await writeFile(
    join(cacheDir, changed.key, "files/build-audit.json"),
    "corrupted",
  );
  const corrupted = await cachedBuild({
    root: source,
    cacheDir,
    outDir,
    label: "build-lab-v2",
  });
  assert.equal(corrupted.hit, false);
  assert.equal(
    JSON.parse(await readFile(join(outDir, "build-audit.json"), "utf8")).label,
    "build-lab-v2",
  );
  const faultDir = join(tmp, "fault");
  await mkdir(faultDir);
  await symlink(
    join(root, "node_modules"),
    join(faultDir, "node_modules"),
    "dir",
  );
  const faultCode = (await readFile(join(root, "cache.mjs"), "utf8"))
    .replace(/\binputs,\s*label,\s*node:/, "inputs,node:")
    .replace(
      /from\s+(['"])\.\/plugin\.mjs\1/,
      "from " + JSON.stringify(pathToFileURL(join(root, "plugin.mjs")).href),
    );
  await writeFile(join(faultDir, "cache.mjs"), faultCode);
  const { cachedBuild: badKeyBuild } = await import(
    pathToFileURL(join(faultDir, "cache.mjs")).href
  );
  const badOptions = {
    root: source,
    cacheDir: join(tmp, "bad-cache"),
    outDir: join(tmp, "bad-out"),
  };
  await badKeyBuild({ ...badOptions, label: "broken-v1" });
  const omittedInput = await badKeyBuild({ ...badOptions, label: "broken-v2" });
  assert.equal(omittedInput.hit, true);
  assert.equal(
    JSON.parse(
      await readFile(join(badOptions.outDir, "build-audit.json"), "utf8"),
    ).label,
    "broken-v1",
  );
  const bad = join(tmp, "type-bad.ts");
  await writeFile(bad, "const total:number='not-a-number';export {total};");
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      outDir: join(tmp, "bad-dist"),
      lib: { entry: bad, formats: ["es"], fileName: "type-bad" },
    },
  });
  const diagnostic = spawnSync(
    process.execPath,
    [
      join(root, "node_modules/typescript/bin/tsc"),
      "--noEmit",
      "--skipLibCheck",
      "--target",
      "es2022",
      bad,
    ],
    { encoding: "utf8" },
  );
  assert.notEqual(diagnostic.status, 0);
  assert.match(diagnostic.stdout + diagnostic.stderr, /TS2322/);
  const consumer = join(tmp, "consumer"),
    scope = join(consumer, "node_modules/@compass");
  await mkdir(scope, { recursive: true });
  await symlink(join(root, "library"), join(scope, "build-utils"), "dir");
  await writeFile(
    join(consumer, "esm.mjs"),
    "import {sumPositive} from '@compass/build-utils';console.log(sumPositive(2,3));",
  );
  await writeFile(
    join(consumer, "cjs.cjs"),
    "const {sumPositive}=require('@compass/build-utils');console.log(sumPositive(2,3));",
  );
  assert.equal(run(process.execPath, ["esm.mjs"], consumer).trim(), "5");
  assert.equal(run(process.execPath, ["cjs.cjs"], consumer).trim(), "5");
  for (const extension of ["mts", "cts"]) {
    const filename = join(consumer, "types." + extension);
    await writeFile(
      filename,
      "import {sumPositive} from '@compass/build-utils';const value:number=sumPositive(1,2);\n// @ts-expect-error string is not a valid public input\nsumPositive('1',2);\nvoid value;",
    );
    run(
      process.execPath,
      [
        join(root, "node_modules/typescript/bin/tsc"),
        "--noEmit",
        "--strict",
        "--skipLibCheck",
        "--module",
        "nodenext",
        "--moduleResolution",
        "nodenext",
        filename,
      ],
      consumer,
    );
  }
  server = await startServer(root);
  browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const results = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage(),
      errors = [],
      external = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (new URL(r.url()).origin !== "http://127.0.0.1:4553")
        external.push(r.url());
    });
    await page.goto("http://127.0.0.1:4553/");
    await page.getByRole("button", { name: "计数：0" }).waitFor();
    assert.equal(
      await page.locator("#label").textContent(),
      "公开构建：build-lab-v1",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .getByRole("button")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#counter").textContent(), "计数：1");
    const audit = await (
      await page.request.get("http://127.0.0.1:4553/build-audit.json")
    ).json();
    assert.equal(audit.label, "build-lab-v1");
    assert.ok(audit.files.some((x) => x.endsWith(".js")));
    const manifest = await page.request.get(
      "http://127.0.0.1:4553/.vite/manifest.json",
    );
    assert.equal(manifest.status(), 200);
    assert.equal(
      (await page.request.get("http://127.0.0.1:4553/README.md")).status(),
      200,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    results.push({
      width,
      virtualModule: true,
      pluginAudit: true,
      builtinManifest: true,
      keyboard: true,
      noOverflow: true,
      externalRequests: external.length,
    });
    await context.close();
  }
  console.log(
    JSON.stringify(
      {
        versions: {
          node: process.version,
          vite: "8.3.8",
          typescript: "6.0.3",
          playwright: "1.65.1",
        },
        cache: {
          cold,
          warm,
          config,
          sourceChange: changed,
          corruption: corrupted,
          omittedLabelFault: {
            hit: omittedInput.hit,
            staleLabel: "broken-v1",
            requestedLabel: "broken-v2",
          },
        },
        library: {
          esm: true,
          cjs: true,
          esmTypes: true,
          cjsTypes: true,
          negativeTypeExpectedError: true,
        },
        transformVsTypecheck: {
          viteEmittedInvalidTypedSource: true,
          tscRejectedTS2322: true,
        },
        browser: results,
        limitations: [
          "cache is explicit local artifact wrapper, not Vite optimizer/Rolldown persistence/remote cache",
          "no Module Federation runtime or esbuild/SWC API executed",
          "no realdevice/multi-engine/remoteCI/production profiling",
        ],
      },
      null,
      2,
    ),
  );
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  await rm(tmp, { recursive: true, force: true });
}
