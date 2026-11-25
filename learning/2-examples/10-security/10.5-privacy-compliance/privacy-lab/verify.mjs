import assert from "node:assert/strict";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { startServer } from "./server.mjs";
const local = await startServer();
let browser;
const result = [];
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
    const optionalRequests = [],
      external = [];
    page.on("request", (r) => {
      const u = new URL(r.url());
      if (!["127.0.0.1"].includes(u.hostname)) external.push(r.url());
      if (u.pathname.includes("/optional-") || u.pathname === "/optional-event")
        optionalRequests.push(u.pathname);
    });
    await page.goto("http://127.0.0.1:4524/");
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.equal(optionalRequests.length, 0);
    await page.getByRole("button", { name: "拒绝可选演示" }).click();
    assert.equal(optionalRequests.length, 0);
    const before = local.records.length;
    const acknowledged = page.waitForResponse(
      (r) => r.url().endsWith("/optional-event") && r.status() === 204,
    );
    await page.getByRole("button", { name: "允许可选演示" }).click();
    await page.waitForFunction(
      () => document.querySelector("#status").textContent === "可选演示已允许",
    );
    await acknowledged;
    assert.equal(local.records.length, before + 1);
    assert.equal(
      await page.evaluate(() => localStorage.getItem("stage10:optional-id")),
      "synthetic-only",
    );
    await page.getByRole("button", { name: "撤回并清除本地可选数据" }).click();
    assert.equal(
      await page.evaluate(() => localStorage.getItem("stage10:optional-id")),
      null,
    );
    await page.reload();
    assert.equal(
      await page.locator("#status").textContent(),
      "未选择，可选能力未加载",
    );
    assert.equal(local.records.length, before + 1);
    assert.ok(optionalRequests.some((x) => x.includes("/optional-")));
    const map = (await readdir("dist/assets")).find((n) => n.endsWith(".map"));
    assert.equal(
      (
        await context.request.get("http://127.0.0.1:4524/assets/" + map)
      ).status(),
      200,
    );
    assert.equal(
      (
        await (
          await context.request.get(
            "http://127.0.0.1:4524/server-canary-present",
          )
        ).json()
      ).configured,
      true,
    );
    const bad = await context.request.post(
      "http://127.0.0.1:4524/optional-event",
      { data: { kind: "opened", email: "synthetic@example.invalid" } },
    );
    assert.equal(bad.status(), 400);
    assert.equal(
      (
        await context.request.post("http://127.0.0.1:4524/optional-event", {
          data: "x".repeat(1600),
        })
      ).status(),
      413,
    );
    await page.goto("http://127.0.0.1:4524/isolation");
    await page.waitForFunction(
      () =>
        document.querySelector("#allowed").complete &&
        document.querySelector("#blocked").complete,
    );
    const isolation = await page.evaluate(() => ({
      crossOriginIsolated,
      naturalAllowed: document.querySelector("#allowed").naturalWidth,
      naturalBlocked: document.querySelector("#blocked").naturalWidth,
    }));
    assert.equal(isolation.crossOriginIsolated, true);
    assert.equal(isolation.naturalAllowed, 20);
    assert.equal(isolation.naturalBlocked, 0);
    assert.equal(external.length, 0);
    result.push({
      width,
      consentDefaultNoOptional: true,
      rejectedNoOptional: true,
      acceptedEvent204: true,
      withdrawCleared: true,
      extraPII400: true,
      hiddenMap200: true,
      isolation,
      externalRequests: 0,
    });
    await context.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/browser-results.json",
    JSON.stringify({ result, logs: local.records }, null, 2),
  );
  console.log(JSON.stringify({ passed: result.length, result }, null, 2));
} finally {
  await browser?.close();
  await local.close();
}
