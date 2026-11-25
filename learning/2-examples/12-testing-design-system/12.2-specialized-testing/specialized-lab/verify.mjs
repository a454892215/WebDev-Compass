import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { build } from "vite";
import {
  mkdir,
  writeFile,
  readFile,
  mkdtemp,
  copyFile,
  rm,
} from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { startServer } from "./server.mjs";
import { bundleStats, checkBudget, delta } from "./budget.mjs";
const root = fileURLToPath(new URL(".", import.meta.url));
const tmp = await mkdtemp(join(tmpdir(), "stage12-budget-build-"));
const browserResults = [];
let browser, server;
try {
  const before = await bundleStats(join(root, "dist"));
  const budget = { raw: 20000, gzip: 10000 };
  checkBudget(before, budget);
  for (const name of ["index.html", "app.mjs", "labels.mjs", "style.css"])
    await copyFile(join(root, name), join(tmp, name));
  const app = await readFile(join(tmp, "app.mjs"), "utf8");
  await writeFile(
    join(tmp, "app.mjs"),
    app +
      "\ndocument.body.dataset.fixtureBloat=" +
      JSON.stringify(randomBytes(30000).toString("base64")) +
      "\n",
  );
  await build({
    root: tmp,
    logLevel: "silent",
    build: { outDir: join(tmp, "dist"), emptyOutDir: true },
  });
  const after = await bundleStats(join(tmp, "dist"));
  assert.throws(() => checkBudget(after, budget), /Bundle budget exceeded/);
  const diff = delta(before, after);
  assert.ok(diff.raw > 30000 && diff.gzip > 20000);
  server = await startServer();
  browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  await mkdir(join(root, "artifacts"), { recursive: true });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    const errors = [],
      outside = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (req) => {
      if (!req.url().startsWith("http://127.0.0.1:4543"))
        outside.push(req.url());
    });
    await page.goto("http://127.0.0.1:4543/");
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .getByRole("link", { name: "跳到正文" })
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator("#content")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    const normal = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(normal.violations, []);
    await page.getByRole("button", { name: "打开说明" }).click();
    assert.equal(await page.locator("#details").evaluate((e) => e.open), true);
    assert.equal(
      await page
        .locator("#close")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#details").evaluate((e) => e.open), false);
    assert.equal(
      await page.locator("#open").evaluate((e) => e === document.activeElement),
      true,
    );
    await page.getByRole("button", { name: "切换标签缺失故障" }).click();
    const bad = await new AxeBuilder({ page }).withRules(["label"]).analyze();
    assert.ok(bad.violations.some((v) => v.id === "label"));
    await page.getByRole("button", { name: "切换标签缺失故障" }).click();
    assert.equal(
      (await new AxeBuilder({ page }).withRules(["label"]).analyze()).violations
        .length,
      0,
    );
    await page.getByLabel("语言", { exact: true }).selectOption("pseudo");
    assert.equal(await page.locator("html").getAttribute("lang"), "en-XA");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    await page.screenshot({
      path: join(root, "artifacts", "pseudo-" + width + ".png"),
      fullPage: true,
      animations: "disabled",
    });
    await page.getByLabel("语言", { exact: true }).selectOption("ar");
    assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
    assert.equal(
      await page.locator("bdi").evaluate((e) => getComputedStyle(e).direction),
      "ltr",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    await page.screenshot({
      path: join(root, "artifacts", "rtl-" + width + ".png"),
      fullPage: true,
      animations: "disabled",
    });
    if (width === 390) {
      await page.getByRole("button", { name: "切换固定宽度故障" }).click();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        true,
      );
      await page.getByRole("button", { name: "切换固定宽度故障" }).click();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
    }
    await page.getByLabel("语言", { exact: true }).selectOption("zh");
    await page.getByLabel("合成名称", { exact: true }).fill("合成样本");
    await page.getByRole("button", { name: "保存样本", exact: true }).click();
    assert.equal(await page.getByRole("status").textContent(), "样本已保存");
    assert.deepEqual(errors, []);
    assert.deepEqual(outside, []);
    browserResults.push({
      width,
      axeViolations: 0,
      labelFaultDetected: true,
      keyboardSkip: true,
      dialogFocusEscapeRestore: true,
      pseudoNoOverflow: true,
      rtlDirectionAndLTRIdentifier: true,
      fixedWidthFault: width === 390 ? "detected and restored" : "not needed",
      outsideRequests: 0,
    });
    await context.close();
  }
  console.log(
    JSON.stringify(
      {
        browserVersion: browser.version(),
        before,
        after,
        delta: diff,
        budget,
        overBudgetRejected: true,
        syntheticChange:
          "random fixture payload kept in DOM dataset, actual second Vite build",
        browser: browserResults,
        unrun: [
          "LighthouseCI",
          "screen reader",
          "Firefox",
          "WebKit",
          "BrowserStack",
          "real mobile",
          "remoteCI",
        ],
      },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  await rm(tmp, { recursive: true, force: true });
}
