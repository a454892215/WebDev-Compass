import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const origin = "http://127.0.0.1:4306";
const server = spawn(process.execPath, ["server.mjs"], {
  cwd: new URL(".", import.meta.url),
  stdio: ["ignore", "pipe", "pipe"],
});
let browser;
const checks = [];
try {
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      if ((await fetch(origin)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "theme preview did not start");
  const local = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const executablePath =
    process.env.CHROME_PATH || (existsSync(local) ? local : undefined);
  browser = await chromium.launch({ headless: true, executablePath });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: "light",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(origin);
    const columns = await page
      .locator("#cards")
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      );
    assert.equal(columns, width === 390 ? 1 : 2);
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(255, 255, 255)",
    );
    await page.emulateMedia({ colorScheme: "dark" });
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(17, 24, 39)",
    );
    await page.getByLabel("显示主题").selectOption("light");
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(255, 255, 255)",
    );
    assert.equal(
      await page
        .locator("html")
        .evaluate((el) => getComputedStyle(el).colorScheme),
      "light",
    );
    await page.getByLabel("显示主题").selectOption("dark");
    await page.emulateMedia({ colorScheme: "light" });
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(17, 24, 39)",
    );
    assert.equal(
      await page.locator("#save").evaluate((el) => getComputedStyle(el).color),
      "rgb(147, 197, 253)",
    );
    await page.getByLabel("显示主题").selectOption("system");
    assert.equal(await page.locator("html").getAttribute("data-theme"), null);
    assert.equal(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(255, 255, 255)",
    );
    await page.getByRole("button", { name: "收藏卡片" }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "收藏卡片" })
        .getAttribute("aria-pressed"),
      "true",
    );
    await page.getByRole("button", { name: "查看构建说明" }).click();
    assert.equal(await page.locator("#help").isVisible(), true);
    assert.equal(await page.getByRole("img", { name: "构建成功" }).count(), 1);
    assert.equal(
      await page.locator("#save svg").getAttribute("aria-hidden"),
      "true",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    );
    await page.getByLabel("显示主题").focus();
    assert.equal(
      await page
        .locator("#theme")
        .evaluate((el) => document.activeElement === el),
      true,
    );
    assert.deepEqual(errors, []);
    checks.push({
      viewport: width,
      passed: true,
      observed:
        "actual grid columns; OS light/dark; explicit overrides and reset; named/decorative icons; controls and no overflow/pageerror",
    });
    await context.close();
  }
  // Without JS, the first response remains system-aware. The lab has no hydration-dependent theme label.
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: "dark",
    viewport: { width: 390, height: 844 },
  });
  const page = await noJs.newPage();
  await page.goto(origin);
  assert.equal(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(17, 24, 39)",
  );
  checks.push({
    javaScriptEnabled: false,
    passed: true,
    observed: "CSS system dark works without script; no persistence claimed",
  });
  await noJs.close();
  console.log(JSON.stringify({ passed: checks.length, checks }, null, 2));
  if (process.env.REPORT_PATH)
    await writeFile(
      process.env.REPORT_PATH,
      JSON.stringify(
        {
          date: "2026-11-24",
          tailwind: "4.3.5",
          passed: checks.length,
          checks,
        },
        null,
        2,
      ) + "\n",
    );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
  if (server.exitCode === null && server.signalCode === null)
    await new Promise((resolve) => server.once("exit", resolve));
}
