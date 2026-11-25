import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { startServer } from "./server.mjs";
const server = await startServer();
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
        deviceScaleFactor: 1,
      }),
      page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.setDefaultTimeout(5000);
    await page.goto("http://127.0.0.1:4519/", {
      waitUntil: "domcontentloaded",
    });
    assert.equal(
      await page.getByRole("heading", { level: 1 }).innerText(),
      "LOAD 加载边界实验",
    );
    await page.waitForFunction(
      () =>
        getComputedStyle(document.querySelector("#decoration"))
          .borderTopStyle === "solid",
    );
    await page.evaluate(() => document.fonts.ready);
    const data = await page.evaluate(() => {
      const img = document.querySelector("#hero");
      const css = performance.getEntriesByName(
        location.origin + "/noncritical.css",
      )[0];
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      return {
        currentSrc: img.currentSrc,
        naturalWidth: img.naturalWidth,
        loaded: img.complete && img.naturalWidth > 0,
        width: img.getAttribute("width"),
        height: img.getAttribute("height"),
        background: getComputedStyle(document.querySelector("#preview"))
          .backgroundImage,
        cssEnd: css.responseEnd,
        fcp: fcp?.startTime ?? null,
        fontRequests: performance
          .getEntriesByType("resource")
          .filter((e) => e.name.endsWith(".woff2")).length,
        fontStatus: [...document.fonts].map((f) => ({
          family: f.family,
          status: f.status,
          display: f.display,
        })),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    assert.equal(data.loaded, true);
    assert.match(data.currentSrc, /hero-(320|640)\.(avif|webp|png)$/);
    assert.equal(data.width, "640");
    assert.equal(data.height, "240");
    assert.match(data.background, /placeholder\.svg/);
    assert.equal(data.fontRequests, 1);
    assert.equal(
      data.fontStatus.find((f) => f.family === "LabRoboto").status,
      "loaded",
    );
    assert.equal(
      data.fontStatus.find((f) => f.family === "LabRoboto").display,
      "swap",
    );
    assert.ok(data.fcp !== null && data.fcp < data.cssEnd);
    assert.equal(data.overflow, false);
    await page
      .getByRole("button", { name: "为公开下一页添加预取建议" })
      .click();
    const supported = await page.evaluate(() =>
      Boolean(HTMLScriptElement.supports?.("speculationrules")),
    );
    if (supported) {
      const plan = JSON.parse(
        await page.locator('script[type="speculationrules"]').innerText(),
      );
      assert.deepEqual(plan.prefetch[0].urls, ["/next.html"]);
    }
    await page.getByRole("link", { name: "正常链接始终可用" }).click();
    await page.getByRole("heading", { name: "公开下一页" }).waitFor();
    assert.equal(errors.length, 0);
    results.push({
      viewportWidth: width,
      ...data,
      speculationSupported: supported,
      speculationExecution:
        "Hint emitted only;actual prefetch/prerender not asserted",
    });
    await context.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/runtime.json",
    JSON.stringify({ browser: browser.version(), results }, null, 2) + "\n",
  );
  console.log(JSON.stringify(results));
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((r) => server.close(r));
}
