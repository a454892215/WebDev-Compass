// Optional QA runner. Supply a locally installed playwright-core via PLAYWRIGHT_MODULE.
import assert from "node:assert/strict";
import { readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = "learning/2-examples/01-web-fundamentals/1.1-html/";
const files = (await readdir(resolve(root, directory)))
  .filter((name) => name.endsWith("-demo.html"))
  .sort();
assert.equal(
  files.length,
  19,
  "HTML chapter must contain 19 demo entry points",
);
const moduleName = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(
  moduleName ? pathToFileURL(resolve(moduleName)).href : "playwright-core"
);
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const report = {
  browser: browser.version(),
  date: new Date().toISOString(),
  checks: [],
  scope:
    "Desktop Chrome and mobile viewport simulation; no real device, screen reader, SEO crawler or backend validation.",
};
const base = process.env.EXAMPLES_BASE_URL || "http://127.0.0.1:4173/";

async function clickText(page, selector, expected, output = "#result") {
  await page.locator(selector).click();
  assert.match(await page.locator(output).innerText(), expected);
}

async function interaction(page, file, width) {
  const id = file.match(/^\d+\.\d+\.\d+\.\d+/)[0];
  switch (id) {
    case "1.1.1.1":
      await clickText(page, "#inspect", /CSS1Compat/);
      break;
    case "1.1.1.2":
      await clickText(page, "#toggle", /已开启/, "#status");
      assert.equal(
        await page.locator("#toggle").getAttribute("aria-pressed"),
        "true",
      );
      break;
    case "1.1.1.3":
      await clickText(page, "#flatten", /仍然是 h2 和 h3/);
      assert.equal(
        await page
          .locator("#content")
          .evaluate((e) => e.classList.contains("preview-flat")),
        true,
      );
      break;
    case "1.1.1.4":
      await clickText(page, "#count", /项目 3 个/);
      break;
    case "1.1.1.5":
      await page.locator("#address").fill("../relative-path?q=学习");
      await clickText(page, "#resolve", /relative-path\?q=/);
      await page.locator('a[href="#destination"]').click();
      assert.equal(new URL(page.url()).hash, "#destination");
      break;
    case "1.1.1.6":
      assert.match(
        await page.locator("#diagram").evaluate((e) => e.currentSrc),
        width < 500 ? /semantics-narrow.svg$/ : /semantics-wide.svg$/,
      );
      await page.waitForFunction(
        () => document.querySelector("audio").readyState >= 1,
      );
      assert.ok(await page.locator("audio").evaluate((e) => e.duration > 0));
      break;
    case "1.1.1.7":
      await clickText(page, "#headers", /行头 3 个/);
      break;
    case "1.1.1.8":
      await clickText(page, "#read-meta", /脚本读取 DOM 成功/);
      break;
    case "1.1.2.1": {
      await page.locator("#password").fill("NeverPrintThisPassword");
      await page.locator('#demo button[type="submit"]').click();
      const result = await page.locator("#result").innerText();
      assert.match(result, /已隐藏/);
      assert.ok(!result.includes("NeverPrintThisPassword"));
      break;
    }
    case "1.1.2.2":
      await clickText(page, "#fill", /没有提交/);
      await page.locator("#topic").selectOption("nuxt");
      await page.locator('#demo button[type="submit"]').click();
      assert.match(await page.locator("#result").innerText(), /nuxt/);
      break;
    case "1.1.2.3": {
      await page.locator('#demo button[type="submit"]').click();
      const first = JSON.parse(await page.locator("#result").innerText());
      assert.ok(first.some(([key]) => key === "order"));
      assert.ok(!first.some(([key]) => key === "server"));
      await page.locator("#toggle").click();
      await page.locator('#demo button[type="submit"]').click();
      assert.ok(
        JSON.parse(await page.locator("#result").innerText()).some(
          ([key]) => key === "server",
        ),
      );
      await page.locator("#user").fill("1");
      assert.equal(
        await page.locator("#user").evaluate((e) => e.checkValidity()),
        false,
      );
      break;
    }
    case "1.1.2.4":
      for (const mode of ["get", "urlencoded", "multipart", "json"]) {
        await page.locator("#mode").selectOption(mode);
        await page.locator("#request").click();
        assert.match(
          await page.locator("#result").innerText(),
          mode === "get" ? /^GET/ : /^POST/,
        );
      }
      assert.equal(new URL(page.url()).pathname, `/${directory}${file}`);
      break;
    case "1.1.2.5":
      await page.locator('#demo button[type="submit"]').click();
      assert.equal(
        await page.locator("#confirm").getAttribute("aria-invalid"),
        "true",
      );
      await page.locator("#confirm").fill("demo@example.com");
      await page.locator('#demo button[type="submit"]').click();
      assert.match(await page.locator("#result").innerText(), /校验通过/);
      break;
    case "1.1.3.1":
      await page.locator("#amount").fill("80");
      assert.match(await page.locator("#summary").innerText(), /80%/);
      assert.ok(
        await page
          .locator("#chart")
          .evaluate((e) => e.getContext("2d") !== null),
      );
      break;
    case "1.1.3.2":
      await page.locator("#value").fill("25");
      assert.equal(await page.locator("#bar").getAttribute("width"), "90");
      assert.match(await page.locator("#svg-desc").textContent(), /25%/);
      break;
    case "1.1.3.3":
      assert.ok(
        await page
          .locator("learning-card")
          .evaluate((e) => e.shadowRoot !== null),
      );
      await clickText(page, "#add", /已添加 1 行/, "#count");
      assert.equal(await page.locator("#rows .row").count(), 1);
      break;
    case "1.1.3.4":
      await page.locator("summary").click();
      assert.equal(await page.locator("details").evaluate((e) => e.open), true);
      await page.locator("#open-dialog").click();
      assert.equal(await page.locator("dialog").evaluate((e) => e.open), true);
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.querySelector("dialog").open);
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        "open-dialog",
      );
      await page.locator("#advance").click();
      assert.equal(await page.locator("progress").evaluate((e) => e.value), 40);
      break;
    case "1.1.3.5":
      await page.locator('[data-action="increment"]').click();
      assert.equal(await page.locator("#card").getAttribute("data-count"), "1");
      assert.equal(
        JSON.parse(await page.locator("#result").innerText()).countType,
        "string",
      );
      break;
    case "1.1.3.6":
      await page.locator("#inspect").click();
      assert.equal(
        JSON.parse(await page.locator("#result").innerText()).structuredData[
          "@type"
        ],
        "Article",
      );
      break;
    default:
      throw new Error(`Missing interaction check for ${file}`);
  }
}

try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      isMobile: width === 390,
      hasTouch: width === 390,
    });
    for (const file of files) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (r) => {
        if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
      });
      const response = await page.goto(new URL(directory + file, base).href, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      const problems = await page.evaluate(() => {
        const result = [];
        if (!document.title || !document.documentElement.lang)
          result.push("Missing title/lang");
        if (
          document.querySelectorAll("h1").length !== 1 ||
          document.querySelectorAll("main").length !== 1
        )
          result.push("Expected single h1/main");
        if (
          !document.querySelector('meta[name="viewport"]') ||
          /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\D|$)/.test(
            document.querySelector('meta[name="viewport"]').content,
          )
        )
          result.push("Viewport restricts zoom");
        if (document.documentElement.scrollWidth > innerWidth + 1)
          result.push("Horizontal viewport overflow");
        const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
        if (new Set(ids).size !== ids.length) result.push("Duplicate IDs");
        if (
          [...document.images].some(
            (e) =>
              !e.hasAttribute("alt") || !e.complete || e.naturalWidth === 0,
          )
        )
          result.push("Image missing alternative or failed to load");
        return result;
      });
      assert.deepEqual(problems, [], `${file} width=${width}`);
      await page.keyboard.press("Tab");
      assert.notEqual(
        await page.evaluate(() => document.activeElement.tagName),
        "BODY",
      );
      await interaction(page, file, width);
      assert.deepEqual(errors, [], `${file} width=${width}`);
      report.checks.push({ file, width, status: "passed" });
      await page.close();
    }
    await context.close();
  }
  const target =
    process.env.EXAMPLES_REPORT || "/tmp/webdev-compass-html-checks.json";
  await writeFile(target, `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `PASS ${report.checks.length} page/viewport checks; report: ${target}`,
  );
} finally {
  await browser.close();
}
