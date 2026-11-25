import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { startServer } from "./server.mjs";
const local = await startServer();
let browser;
const results = [];
try {
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    const errors = [];
    const outbound = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (!r.url().startsWith("http://127.0.0.1:4518/")) outbound.push(r.url());
    });
    await page.goto("http://127.0.0.1:4518/?token=synthetic-secret");
    assert.equal(
      (await page.request.get("http://127.0.0.1:4518/README.md")).status(),
      200,
    );
    assert.equal(local.records.length, results.length);
    await page.waitForFunction(() => window.stage9Metrics?.webVitalsRegistered);
    await page.getByRole("button", { name: "制造90ms合成长任务" }).click();
    await page.waitForFunction(() =>
      window.stage9Metrics.raw.longtask.some((e) => e.duration >= 50),
    );
    await page.getByRole("button", { name: "650ms后插入位移样本" }).click();
    await page.waitForFunction(() =>
      window.stage9Metrics.buffer
        .snapshot()
        .some((e) => e.name === "CLS" && e.value > 0),
    );
    await page.getByRole("button", { name: "记录交互业务耗时" }).click();
    await page.waitForFunction(
      () => window.stage9Metrics.raw.measure.length > 0,
    );
    await page.waitForFunction(
      () =>
        window.stage9Metrics.buffer.snapshot().some((e) => e.name === "LCP") &&
        window.stage9Metrics.buffer.snapshot().some((e) => e.name === "INP"),
    );
    const state = await page.evaluate(() => ({
      metrics: window.stage9Metrics.buffer.snapshot(),
      raw: window.stage9Metrics.raw,
      support: PerformanceObserver.supportedEntryTypes,
    }));
    assert.ok(
      state.metrics.every((e) => e.value >= 0 && Number.isFinite(e.value)),
    );
    assert.ok(state.raw.navigation.length > 0 && state.raw.resource.length > 0);
    await page.getByRole("button", { name: "发送本地最小快照" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "本地最小快照已接收" })
      .waitFor();
    assert.equal(local.records.length, results.length + 1);
    assert.ok(!JSON.stringify(local.records).includes("synthetic-secret"));
    assert.ok(!JSON.stringify(local.records).includes("target"));
    const bad = await page.request.post("http://127.0.0.1:4518/collect", {
      data: [
        {
          name: "LCP",
          id: "test",
          value: 1,
          route: "/metrics-lab",
          build: "teaching-v1",
          parts: {},
          url: "private",
        },
      ],
    });
    assert.equal(bad.status(), 400);
    const large = await page.request.post("http://127.0.0.1:4518/collect", {
      data: "x".repeat(17000),
    });
    assert.equal(large.status(), 413);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(outbound, []);
    results.push({
      width,
      metrics: state.metrics,
      raw: state.raw,
      supportedEntryTypes: state.support,
      noExternalRequests: true,
      localSnapshotCount: 1,
      badPayloadStatus: 400,
      oversizeStatus: 413,
    });
    await page.evaluate(() => window.stage9Metrics.disconnect());
    await context.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/browser.json",
    JSON.stringify({ passed: results.length, results }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        passed: results.length,
        metrics: results.map((r) => ({
          width: r.width,
          metrics: r.metrics,
          longtasks: r.raw.longtask.length,
        })),
      },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  await local.close();
}
