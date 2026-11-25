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
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.setDefaultTimeout(5000);
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4509");
    const help = await page.request.get("http://127.0.0.1:4509/README.md");
    assert.equal(help.status(), 200);
    assert.match(help.headers()["content-type"], /text\/plain/);
    await page.getByRole("button", { name: "课程计数 0", exact: true }).click();
    await page
      .getByRole("button", { name: "课程计数 1", exact: true })
      .waitFor();
    assert.match(await page.locator("#events").innerText(), /count-change: 1/);
    const lifecycle = await page.evaluate(() => {
      const c = window.stage7Lab.counter;
      c.remove();
      const before = c.count;
      window.dispatchEvent(new Event("stage7-tick"));
      const disconnectedUnchanged = c.count === before;
      document.querySelector("#counter-mount").append(c);
      window.dispatchEvent(new Event("stage7-tick"));
      return {
        connections: c.connections,
        disconnections: c.disconnections,
        delta: c.count - before,
        disconnectedUnchanged,
      };
    });
    assert.deepEqual(lifecycle, {
      connections: 2,
      disconnections: 1,
      delta: 1,
      disconnectedUnchanged: true,
    });
    await page.getByRole("button", { name: "课程计数 2", exact: true }).focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("button", { name: "课程计数 3", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "计算 7 + 5", exact: true }).click();
    await page.getByText("WASM add(7, 5) = 12", { exact: true }).waitFor();
    assert.equal(await page.locator("#chart rect").count(), 3);
    assert.equal(await page.locator("#data-body tr").count(), 3);
    assert.deepEqual(await page.locator("#data-body td").allTextContents(), [
      "30",
      "50",
      "20",
    ]);
    await page
      .getByRole("button", { name: "尝试未知 script 类型", exact: true })
      .click();
    assert.match(await page.locator("#schema-status").innerText(), /拒绝/);
    await page.evaluate(() =>
      window.stage7Lab.renderSchema({
        version: 1,
        nodes: [
          { kind: "text", text: '<img src=x onerror="window.__injected=1">' },
        ],
      }),
    );
    assert.equal(await page.locator("#schema-result img").count(), 0);
    assert.equal(await page.evaluate(() => window.__injected), undefined);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    assert.deepEqual(errors, []);
    results.push({
      width,
      lifecycle,
      wasm: 12,
      svgBars: 3,
      tableRows: 3,
      unsafeNodeRejected: true,
      textInjectionSafe: true,
      pageErrors: errors,
    });
    await page.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/browser.json",
    JSON.stringify(
      {
        executedAt: new Date().toISOString(),
        results,
        limits: [
          "Headless Chrome simulated viewports; no native wrapper, framework/editor integration, actual screen reader or full accessibility audit",
        ],
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
