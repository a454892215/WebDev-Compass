import { strict as assert } from "node:assert";
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { start } from "./server.mjs";
const require = createRequire(import.meta.url);
const playwright = await import(
  process.env.PLAYWRIGHT_MODULE || "@playwright/test"
);
const server = await start();
let browser;
const checks = [];
let colorPairs;
try {
  browser = await playwright.chromium.launch({
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
    await page.goto("http://127.0.0.1:4505/");
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const result = await page.evaluate(() =>
      axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
        },
      }),
    );
    assert.equal(
      result.violations.length,
      0,
      JSON.stringify(result.violations.map((v) => v.id)),
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.locator(".skip").evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator("#main").evaluate((e) => e === document.activeElement),
      true,
    );
    await page.locator("button[type=submit]").click();
    assert.equal(
      await page.locator("#title").getAttribute("aria-invalid"),
      "true",
    );
    assert.equal(
      await page
        .locator("#title")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    assert.equal(
      await page.locator("#title").getAttribute("aria-describedby"),
      "hint error",
    );
    await page.locator("#title").fill("Vue课程");
    await page.locator("button[type=submit]").click();
    assert.ok(
      (await page.locator("#result").textContent()).includes("Vue课程"),
    );
    assert.equal(
      await page.locator("#title").getAttribute("aria-invalid"),
      null,
    );
    await page.locator("#open").click();
    assert.equal(await page.locator("#help").evaluate((e) => e.open), true);
    assert.equal(
      await page
        .locator("#dialog-title")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator("#close")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#help").evaluate((e) => e.open), false);
    assert.equal(
      await page.locator("#open").evaluate((e) => e === document.activeElement),
      true,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    );
    const targets = await page.locator("button").evaluateAll((es) =>
      es
        .filter((e) => !e.closest("dialog") || e.closest("dialog").open)
        .map((e) => ({
          w: e.getBoundingClientRect().width,
          h: e.getBoundingClientRect().height,
        })),
    );
    assert.ok(targets.every((t) => t.w >= 44 && t.h >= 44));
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator("#open")
        .evaluate((e) => getComputedStyle(e).transitionDuration),
      "0s",
    );
    checks.push({
      width,
      passed: true,
      axeViolations: result.violations.length,
      axeIncomplete: result.incomplete.map((v) => v.id),
      observed:
        "semantic names, skip focus, invalid field/description/focus, valid status, dialog Escape/return focus, 44px buttons, reduced-motion, no overflow",
    });
    if (!colorPairs) {
      await page.locator("#main").focus();
      colorPairs = await page.evaluate(() => {
        const style = (selector) =>
          getComputedStyle(document.querySelector(selector));
        const white = style(":root").backgroundColor;
        return {
          bodyOnWhite: [style("body").color, white],
          buttonOnWhite: [style("#open").color, style("#open").backgroundColor],
          errorOnWhite: [style("#error").color, white],
          focusOnWhite: [style("#main").outlineColor, white],
        };
      });
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 320, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4505/");
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
    false,
  );
  await page.addStyleTag({ content: ":root{font-size:200%}" });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
    false,
  );
  assert.equal(await page.locator("#title").isVisible(), true);
  assert.equal(await page.locator("button[type=submit]").isVisible(), true);
  checks.push({
    width: 320,
    rootFontScale: "200%",
    passed: true,
    observed:
      "no horizontal overflow/content loss in controlled CSS text-size test; not actual browser zoom or complete WCAG proof",
  });
  await page.goto("http://127.0.0.1:4505/bad.html");
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const bad = await page.evaluate(() => axe.run(document));
  const ids = bad.violations.map((v) => v.id);
  assert.ok(
    ids.includes("button-name") &&
      ids.includes("image-alt") &&
      ids.includes("label"),
  );
  checks.push({
    negativeFixture: true,
    passed: true,
    detected: ids,
    observed:
      "scanner actually detects missing button name/image alt/input label",
  });
  await context.close();
  const luminance = (color) => {
    const values = color.match(/[0-9.]+/g).map(Number);
    assert.ok(
      values.length === 3 || values[3] === 1,
      "This lab contrast test requires opaque colors",
    );
    const rgb = values
      .slice(0, 3)
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const contrast = ([foreground, background]) => {
    const a = luminance(foreground),
      b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  const ratios = Object.fromEntries(
    Object.entries(colorPairs).map(([name, pair]) => [name, contrast(pair)]),
  );
  assert.ok(Object.values(ratios).every((value) => value >= 4.5));
  checks.push({
    contrast: true,
    passed: true,
    colors: colorPairs,
    ratios,
    observed:
      "WCAG sRGB ratios for the lab actual opaque CSS colors on white; other states/backgrounds still need review",
  });
  const report = {
    date: "2026-11-25",
    axeCore: JSON.parse(
      await readFile(require.resolve("axe-core/package.json"), "utf8"),
    ).version,
    passed: checks.length,
    checks,
    notVerified: [
      "real screen reader",
      "disabled-user testing",
      "browser zoom UI",
      "other browsers",
      "formal WCAG conformance",
      "real mobile",
    ],
  };
  await writeFile(
    new URL(
      "../../../../../docs/audits/stage-6-a11y-lab-runtime.json",
      import.meta.url,
    ),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
