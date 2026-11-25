import { chromium, expect } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { createLabServer } from "./server.mjs";
const update = process.argv.includes("--update-baseline");
const server = createLabServer();
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(4542, "127.0.0.1", resolve);
});
let browser;
try {
  const binary =
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  browser = await chromium.launch({
    headless: true,
    ...(existsSync(binary) ? { executablePath: binary } : {}),
  });
  await mkdir("baselines", { recursive: true });
  await mkdir("artifacts", { recursive: true });
  const results = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4542/card");
    await page.evaluate(() => document.fonts.ready);
    const actual = await page
      .locator("#card")
      .screenshot({ animations: "disabled" });
    const path = "baselines/card-" + width + "-macos-chrome.png";
    if (update) {
      await writeFile(path, actual);
      results.push({ width, baselineCreated: true });
    } else {
      const expected = await readFile(path);
      await writeFile("artifacts/actual-" + width + ".png", actual);
      assert.ok(
        actual.equals(expected),
        "Unapproved visual change or environment mismatch at " + width,
      );
      await page.goto("http://127.0.0.1:4542/card?variant=changed");
      await page.evaluate(() => document.fonts.ready);
      const changed = await page
        .locator("#card")
        .screenshot({ animations: "disabled" });
      await writeFile("artifacts/changed-" + width + ".png", changed);
      assert.ok(
        !changed.equals(expected),
        "Controlled padding mutation was not detected",
      );
      await page.getByRole("button", { name: "Reserve a place" }).click();
      await expect(page.getByRole("status")).toHaveText("Reserved fixture");
      results.push({
        width,
        unchangedMatch: true,
        changedDetected: true,
        delayedStatusAwaited: true,
      });
    }
    await context.close();
  }
  console.log(
    JSON.stringify(
      {
        browser: await browser.version(),
        platform: process.platform,
        update,
        results,
      },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
