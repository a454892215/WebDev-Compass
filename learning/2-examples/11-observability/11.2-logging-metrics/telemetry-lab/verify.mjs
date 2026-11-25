import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { start } from "./server.mjs";
import { mkdir, writeFile } from "node:fs/promises";
const app = await start();
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
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [],
      external = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (req) => {
      if (!req.url().startsWith(app.url)) external.push(req.url());
    });
    await page.goto(app.url);
    await page.locator("#sensitive").fill("synthetic-secret@example.invalid");
    await page.getByRole("button", { name: "执行本地请求" }).click();
    await page.waitForFunction(() =>
      document.querySelector("#output").textContent.includes("traceId"),
    );
    const before = await (await fetch(app.url + "/stats")).json();
    const initial = before.events.length;
    const waiting = page.waitForResponse(
      (r) => r.url().endsWith("/telemetry") && r.status() === 204,
    );
    await page.getByRole("button", { name: "开启本次耗时演示" }).click();
    await page.getByRole("button", { name: "执行本地请求" }).click();
    await waiting;
    await page.waitForFunction(() => !document.querySelector("#work").disabled);
    const enabled = await (await fetch(app.url + "/stats")).json();
    assert.equal(enabled.events.length, initial + 1);
    await page.getByRole("button", { name: "停止后续采集" }).click();
    await page.getByRole("button", { name: "执行本地请求" }).click();
    await page.waitForFunction(() => !document.querySelector("#work").disabled);
    const stopped = await (await fetch(app.url + "/stats")).json();
    assert.equal(stopped.events.length, initial + 1);
    assert.ok(!JSON.stringify(stopped).includes("synthetic-secret"));
    assert.equal(
      stopped.logs.at(-1).traceId,
      stopped.otel.spans.at(-1).traceId,
    );
    assert.ok(
      stopped.otel.metrics.find((x) => x.name === "lab.request.duration"),
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    results.push({
      width,
      defaultOptionalUnsent: true,
      optIn204: true,
      optOutStops: true,
      secretAbsent: true,
      traceCorrelated: true,
      pageErrors: errors,
      externalRequests: external.length,
    });
    await page.close();
  }
  const bad = await fetch(app.url + "/telemetry", {
    method: "POST",
    headers: { origin: app.url, "content-type": "application/json" },
    body: JSON.stringify({
      kind: "duration",
      value: 3,
      email: "synthetic@example.invalid",
    }),
  });
  assert.equal(bad.status, 400);
  const cross = await fetch(app.url + "/telemetry", {
    method: "POST",
    headers: {
      origin: "http://127.0.0.1:4536",
      "content-type": "application/json",
    },
    body: JSON.stringify({ kind: "duration", value: 3 }),
  });
  assert.equal(cross.status, 403);
  const huge = await fetch(app.url + "/telemetry", {
    method: "POST",
    headers: { origin: app.url, "content-type": "application/json" },
    body: " ".repeat(1600),
  });
  assert.equal(huge.status, 413);
  assert.equal((await fetch(app.url + "/README.md")).status, 200);
  const trace = "d".repeat(32);
  const [one, two] = await Promise.all([
    fetch(app.url + "/work", {
      headers: { traceparent: "00-" + trace + "-" + "e".repeat(16) + "-01" },
    }),
    fetch(app.url + "/work", {
      headers: {
        traceparent: "00-" + "f".repeat(32) + "-" + "e".repeat(16) + "-01",
      },
    }),
  ]);
  assert.equal((await one.json()).traceId, trace);
  assert.equal((await two.json()).traceId, "f".repeat(32));
  await mkdir("artifacts", { recursive: true });
  const report = {
    recordedAt: new Date().toISOString(),
    browser: results,
    http: {
      unknownPII400: true,
      crossOrigin403: true,
      actualBody1600B413: true,
      parallelTraceIsolation: true,
    },
  };
  await writeFile("artifacts/result.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  await app.close();
}
