import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { startServer } from "./server.mjs";
const results = [];
let browser, server;
try {
  await mkdir("artifacts", { recursive: true });
  server = await startServer();
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      locale: "zh-CN",
    });
    const page = await context.newPage(),
      requests = [],
      errors = [];
    page.on("request", (r) => requests.push(r.url()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4554/");
    await page
      .getByRole("status")
      .filter({ hasText: "增强模式：native" })
      .waitFor();
    assert.equal(
      requests.filter((url) => url.includes("/list-fallback.mjs")).length,
      0,
    );
    await page.getByRole("button", { name: "生成列表摘要" }).click();
    assert.ok((await page.locator("#result").textContent()).includes("契约"));
    const support = await page.evaluate(() => ({
      grid: CSS.supports("display", "grid"),
      invalid: CSS.supports("display", "definitely-missing"),
      display: getComputedStyle(document.querySelector(".layout")).display,
    }));
    assert.equal(support.grid, true);
    assert.equal(support.invalid, false);
    assert.equal(support.display, "grid");
    await page.goto("http://127.0.0.1:4554/?fixture=missing");
    await page
      .getByRole("status")
      .filter({ hasText: "local-fallback" })
      .waitFor();
    assert.equal(
      requests.filter((url) => url.includes("/list-fallback.mjs")).length,
      1,
    );
    await page.getByRole("button", { name: "生成列表摘要" }).click();
    assert.equal(
      await page.locator("#result").textContent(),
      "契约、能力、回退",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    await page.emulateMedia({ media: "print" });
    assert.equal(
      await page
        .locator("header")
        .evaluate((el) => getComputedStyle(el).display),
      "none",
    );
    assert.equal(
      await page
        .locator(".print-only")
        .evaluate((el) => getComputedStyle(el).display),
      "block",
    );
    assert.equal(
      await page
        .locator(".layout")
        .evaluate((el) => getComputedStyle(el).display),
      "block",
    );
    await page.screenshot({
      path: "artifacts/print-" + width + ".png",
      fullPage: true,
    });
    if (width === 1440) {
      const pdf = await page.pdf({
        path: "artifacts/print-fixture.pdf",
        format: "A4",
        printBackground: false,
      });
      assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
      assert.ok(pdf.length > 1000);
    }
    assert.equal(
      requests.filter((url) => !url.startsWith("http://127.0.0.1:4554/"))
        .length,
      0,
    );
    assert.deepEqual(errors, []);
    results.push({
      width,
      nativeNoFallbackRequest: true,
      injectedMissingLoadsLocal: true,
      cssSupports: support,
      printMedia: true,
      overflow: false,
      externalRequests: 0,
    });
    await context.close();
  }
  const cssFallback = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const cssPage = await cssFallback.newPage();
  const cssSource = await readFile("style.css", "utf8");
  await cssPage.route("**/style.css", (route) =>
    route.fulfill({
      contentType: "text/css",
      body: cssSource.replace(
        /@supports\s*\(\s*display\s*:\s*grid\s*\)/,
        "@supports(display:definitely-missing)",
      ),
    }),
  );
  await cssPage.goto("http://127.0.0.1:4554/");
  assert.equal(
    await cssPage
      .locator(".layout")
      .evaluate((el) => getComputedStyle(el).display),
    "block",
  );
  assert.equal(
    await cssPage.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  const badWidth = await cssPage.addStyleTag({
    content: ".layout{inline-size:900px}",
  });
  assert.equal(
    await cssPage.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    true,
  );
  await badWidth.evaluate((el) => el.remove());
  assert.equal(
    await cssPage.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
  );
  await cssFallback.close();
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const basic = await noJS.newPage();
  await basic.goto("http://127.0.0.1:4554/");
  await basic.getByText("基础功能说明", { exact: true }).click();
  assert.equal(await basic.locator("#baseline").getAttribute("open"), "");
  assert.equal(await basic.locator("#baseline-copy").isVisible(), true);
  assert.equal(
    await basic.locator("#feature-status").textContent(),
    "增强尚未启动",
  );
  await noJS.close();
  const spoof = await browser.newContext({
    userAgent: "NotARealLegacyBrowser/1.0",
  });
  const spoofPage = await spoof.newPage();
  await spoofPage.goto("http://127.0.0.1:4554/");
  await spoofPage
    .getByRole("status")
    .filter({ hasText: "增强模式：native" })
    .waitFor();
  await spoof.close();
  const failed = await browser.newContext();
  const failedPage = await failed.newPage();
  await failedPage.route("**/list-fallback.mjs", (route) => route.abort());
  await failedPage.goto("http://127.0.0.1:4554/?fixture=missing");
  await failedPage
    .getByRole("status")
    .filter({ hasText: "增强加载失败" })
    .waitFor();
  assert.equal(
    await failedPage.getByRole("button", { name: "生成列表摘要" }).isDisabled(),
    true,
  );
  await failedPage.getByText("基础功能说明", { exact: true }).click();
  assert.equal(await failedPage.locator("#baseline-copy").isVisible(), true);
  await failed.close();
  const pdf = await readFile("artifacts/print-fixture.pdf");
  console.log(
    JSON.stringify(
      {
        browser: await browser.version(),
        results,
        cssConditionFalseBaselineAndWidthFault: true,
        noJavaScriptBaseline: true,
        spoofedUserAgentSameCapability: true,
        fallbackNetworkFailureKeepsBaseline: true,
        pdfHeaderAndSize: {
          header: pdf.subarray(0, 5).toString(),
          bytes: pdf.length,
        },
        limits: [
          "single Chrome engine, not old-browser execution",
          "injected capability absence not a real missing-Intl browser",
          "print media/headless PDF not physical printer/OS print dialog",
        ],
      },
      null,
      2,
    ),
  );
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
