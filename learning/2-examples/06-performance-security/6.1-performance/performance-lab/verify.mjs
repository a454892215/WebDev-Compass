import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createLabServer } from "./server.mjs";
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const server = createLabServer();
await new Promise((resolve) => server.listen(4501, "127.0.0.1", resolve));
let browser;
let report = {
  date: "2026-11-25",
  scope:
    "local controlled mechanisms, not field CWV or universal performance gain",
  checks: [],
};
if (process.env.PERF_PHASE === "cache") { report = JSON.parse(await readFile("artifacts/runtime-partial.json", "utf8")); report.resumedUnaffectedViewportMeasurements = true; }
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
await mkdir("artifacts", { recursive: true });
const dynamic = Object.entries(manifest)
  .filter(([, v]) => v.isDynamicEntry)
  .map(([key, v]) => ({ key, file: `/${v.file}` }));
try {
  browser = await chromium.launch({ executablePath: CHROME, headless: true });
  for (const width of (process.env.PERF_PHASE === "cache" ? [] : [390, 1440])) {
    const context = await browser.newContext({
        viewport: { width, height: 900 },
      }),
      page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const requests = [];
    page.on("request", (r) => requests.push(new URL(r.url()).pathname));
    await page.goto("http://127.0.0.1:4501/");
    assert.ok(!requests.some((p) => dynamic.some((d) => p === d.file)));
    await page.locator("#lazy").click();
    await page.waitForFunction(() =>
      document.querySelector("#lazy-result").textContent.includes("sum=6"),
    );
    assert.ok(
      requests.some((p) =>
        dynamic.some((d) => d.key.includes("statistics") && p === d.file),
      ),
    );
    assert.ok(!(await page.evaluate(() => window.__stage6ThirdLoaded)));
    await page.locator("#third").click();
    await page.waitForFunction(() => window.__stage6ThirdLoaded === true);
    await page.locator("#block").click();
    await page.waitForFunction(() =>
      window.__stage6.observations.longtasks.some((e) => e.duration >= 50),
    );
    await page.locator("#chunk").click();
    await page.waitForFunction(() =>
      document
        .querySelector("#work-result")
        .textContent.startsWith("chunked完成"),
    );
    await page.locator("#worker").click();
    await page.locator("#counter").click();
    await page.waitForFunction(
      () =>
        document.querySelector("#work-result").textContent ===
        "worker结果：1999999000000",
    );
    assert.equal(await page.locator("#counter-result").textContent(), "1");
    await page.locator("#thrash").click();
    await page.locator("#batch").click();
    assert.equal(await page.locator("#rows li").count(), 12);
    await page.locator("#viewport").evaluate((el) => {
      el.scrollTop = 18000;
    });
    await page.waitForFunction(
      () => document.querySelector("#rows li").textContent === "项目 498",
    );
    await page.locator("#full").click();
    assert.equal(await page.locator("#rows li").count(), 1000);
    await page.locator("#full").click();
    assert.equal(await page.locator("#rows li").count(), 12);
    await page.locator("#query").fill("first");
    await page.locator("#query").fill("latest");
    await page.waitForFunction(
      () =>
        document.querySelector("#query-result").textContent === "查询：latest",
    );
    await page.evaluate(async () => {
      await fetch("/api/cache");
      await fetch("/api/cache");
      await fetch("/api/private");
      await fetch("/api/private");
    });
    const stats = await (
      await context.request.get("http://127.0.0.1:4501/api/stats")
    ).json();
    assert.ok(stats.revalidations >= 1);
    const image = await page
      .locator("#hero")
      .evaluate((el) => ({
        currentSrc: el.currentSrc,
        naturalWidth: el.naturalWidth,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
      }));
    assert.ok(image.currentSrc.endsWith(".avif"));
    assert.ok(image.naturalWidth > 0);
    assert.ok(Math.abs(image.height / image.width - 0.375) < 0.01);
    const lazyBefore = requests.filter((p) =>
      p.endsWith("banner-320.svg"),
    ).length;
    await page.locator("#below-image").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () =>
        document.querySelector("#below-image").complete &&
        document.querySelector("#below-image").naturalWidth > 0,
    );
    await page.locator("#snapshot").click();
    const metrics = JSON.parse(await page.locator("#metrics").textContent());
    for (const name of ["blocking", "chunked", "thrash", "batch"])
      assert.ok(
        metrics.measures.some(
          (m) => m.name === name && Number.isFinite(m.duration),
        ),
      );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    );
    assert.deepEqual(errors, []);
    report.checks.push({
      viewport: width,
      passed: true,
      observed:
        "real dynamic imports, local deferred replacement, longtask/chunk measure, worker result, virtual/full DOM, debounce, conditional cache, responsive image",
      image,
      lazyBefore,
      metrics: {
        supported: metrics.supported,
        measures: metrics.measures,
        longtasks: metrics.observations.longtasks,
        lcp: metrics.observations.lcp,
        shifts: metrics.observations.shifts,
      },
      http: stats,
    });
    await writeFile("artifacts/runtime-partial.json", JSON.stringify(report, null, 2));
    await context.close();
  }
  const context = await browser.newContext(),
    page = await context.newPage();
  await page.goto("http://127.0.0.1:4501/sw-lab/");
  await page.evaluate(async () => {
    await caches.open("compass-stage6-performance-v0");
    await caches.open("foreign-fixture-do-not-delete");
  });
  await page.locator("#register").click();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  const cacheState = await page.evaluate(async () => ({
    keys: await caches.keys(),
    cacheFirst: await (await fetch("./cache-first.txt")).text(),
    networkFirst: await (await fetch("./network-first.txt")).text(),
  }));
  assert.ok(!cacheState.keys.includes("compass-stage6-performance-v0"));
  assert.ok(cacheState.keys.includes("foreign-fixture-do-not-delete"));
  assert.equal(cacheState.cacheFirst.trim(), "cache-first-install-v1");
  const online = await page.evaluate(
    async () => await (await fetch("./network-first.txt")).text(),
  );
  assert.notEqual(online, cacheState.networkFirst);
  await context.setOffline(true);
  const offline = await page.evaluate(
    async () => await (await fetch("./network-first.txt")).text(),
  );
  assert.equal(offline, online);
  await page.goto("http://127.0.0.1:4501/sw-lab/offline-missing-page");
  assert.equal(await page.locator("h1").textContent(), "离线公开fixture");
  await context.setOffline(false);
  await page.evaluate(async () => {
    for (const r of await navigator.serviceWorker.getRegistrations())
      if (r.scope.endsWith("/sw-lab/")) await r.unregister();
    for (const k of await caches.keys())
      if (k.startsWith("compass-stage6-performance-")) await caches.delete(k);
  });
  report.checks.push({
    passed: true,
    scope: "/sw-lab/",
    observed:
      "cache-first, online network-first update, offline cached fallback, offline navigation, old own cache cleanup while foreign prefix retained",
    online,
    offline,
  });
  await context.close();
  await browser.close();
  browser = undefined;
  await mkdir("artifacts", { recursive: true });
  const child = spawn(
    "pnpm",
    [
      "exec",
      "lighthouse",
      "http://127.0.0.1:4501/",
      "--only-categories=performance",
      "--output=json",
      "--output-path=artifacts/lighthouse.json",
      "--quiet",
      `--chrome-path=${CHROME}`,
      "--chrome-flags=--headless --disable-background-networking",
      "--max-wait-for-load=10000",
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  let output = "";
  child.stdout.on("data", (x) => {
    output += x;
  });
  child.stderr.on("data", (x) => {
    output += x;
  });
  const timeout = setTimeout(() => child.kill("SIGTERM"), 45000);
  const exit = await new Promise((resolve) => child.on("exit", resolve));
  clearTimeout(timeout);
  assert.equal(exit, 0, output);
  const audit = JSON.parse(await readFile("artifacts/lighthouse.json", "utf8"));
  report.lighthouse = {
    version: audit.lighthouseVersion,
    score: audit.categories.performance.score,
    environment: audit.configSettings,
    metrics: {
      fcp: audit.audits["first-contentful-paint"].numericValue,
      lcp: audit.audits["largest-contentful-paint"].numericValue,
      tbt: audit.audits["total-blocking-time"].numericValue,
      cls: audit.audits["cumulative-layout-shift"].numericValue,
    },
    boundary:
      "single local lab audit, no real-user INP or production p75 claim",
  };
  await writeFile("artifacts/runtime.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
