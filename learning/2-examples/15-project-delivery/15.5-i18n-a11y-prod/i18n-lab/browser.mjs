import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { startServer } from "./server.mjs";
const server = startServer();
await new Promise((resolve) => server.once("listening", resolve));
let browser;
const results = [];
try {
  browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4574/");
    await page.keyboard.press("Tab");
    assert.equal(
      await page.locator(".skip").evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator("#page-title")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.getByRole("link", { name: "Details", exact: true }).click();
    assert.match(await page.title(), /^Details/);
    assert.equal(
      await page
        .locator("#page-title")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    assert.equal(
      await page.locator("#route-status").textContent(),
      "Details loaded",
    );
    await page.goBack();
    assert.match(await page.title(), /^Catalog/);
    await page.getByRole("button", { name: "Use RTL layout" }).click();
    assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
    const rtl = await page
      .locator(".card")
      .evaluate((e) => ({
        start: getComputedStyle(e).borderInlineStartWidth,
        right: getComputedStyle(e).borderRightWidth,
        dir: getComputedStyle(e).direction,
      }));
    assert.equal(rtl.right, "6px");
    assert.equal(rtl.dir, "rtl");
    assert.equal(await page.locator("bdi").first().getAttribute("dir"), "ltr");
    const city = page.getByRole("combobox");
    await city.fill("");
    await city.press("ArrowDown");
    assert.equal(await city.getAttribute("aria-expanded"), "true");
    assert.equal(await city.getAttribute("aria-activedescendant"), "city-0");
    assert.equal(
      await city.evaluate((e) => e === document.activeElement),
      true,
    );
    await city.press("ArrowDown");
    await city.press("Enter");
    assert.equal(await city.inputValue(), "Cairo");
    assert.equal(await city.getAttribute("aria-expanded"), "false");
    await city.fill("T");
    await city.press("Escape");
    assert.equal(await city.getAttribute("aria-expanded"), "false");
    await page.getByRole("button", { name: "Open instructions" }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Close instructions" })
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator("dialog")
        .evaluate((e) => e.contains(document.activeElement)),
      true,
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .getByRole("button", { name: "Open instructions" })
        .evaluate((e) => e === document.activeElement),
      true,
    );
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(
      axe.violations.map((v) => v.id),
      [],
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.deepEqual(errors, []);
    results.push({
      viewport: width,
      checks: [
        "skip focus",
        "SPA title/focus/status/back",
        "RTL logical border and BiDi isolation",
        "combobox keyboard/active descendant",
        "native modal focus/Tab/Escape/return",
        "axe selected rules no violations",
        "no horizontal overflow/pageerror",
      ],
    });
    await context.close();
  }
  await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
  await writeFile(
    new URL("./dist/browser-results.json", import.meta.url),
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        chrome: await browser.version(),
        results,
        limitations: [
          "No screen reader, real device, WCAG conformance evaluation or real learner trial",
          "No full custom DatePicker; native dialog and small combobox only",
          "Scroll restoration stores pathname only; repeated-entry positions require per-entry keys",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(JSON.stringify(results));
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
