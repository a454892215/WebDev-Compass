import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { once } from "node:events";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const root = resolve("dist/storybook");
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, "http://127.0.0.1").pathname;
    const path = resolve(
      root,
      "." + decodeURIComponent(pathname === "/" ? "/index.html" : pathname),
    );
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const info = await stat(path);
    if (!info.isFile()) throw new Error("Not file");
    res.setHeader(
      "content-type",
      mime[extname(path)] || "application/octet-stream",
    );
    res.end(await readFile(path));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
let browser;
const result = [];
try {
  server.listen(4544, "127.0.0.1");
  await once(server, "listening");
  const chrome =
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  browser = await chromium.launch({
    headless: true,
    ...(existsSync(chrome) ? { executablePath: chrome } : {}),
  });
  await mkdir("artifacts", { recursive: true });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const errors = [],
      external = [];
    context.on("request", (req) => {
      if (!req.url().startsWith("http://127.0.0.1:4544/"))
        external.push(req.url());
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    for (const id of [
      "compass-uibutton--primary",
      "compass-uibutton--disabled",
      "compass-webelement--native-host",
    ]) {
      await page.goto(
        "http://127.0.0.1:4544/iframe.html?id=" + id + "&viewMode=story",
      );
      await page.locator("#storybook-root[data-play-done=yes]").waitFor();
      if (id.includes("primary")) {
        assert.equal(
          await page
            .getByRole("button", { name: "保存合成偏好" })
            .getAttribute("type"),
          "button",
        );
        await page.screenshot({ path: "artifacts/primary-" + width + ".png" });
      }
      if (id.includes("disabled"))
        assert.equal(await page.getByRole("button").isDisabled(), true);
      if (id.includes("native-host")) {
        await page
          .locator("compass-counter")
          .evaluate((el) => el.setAttribute("label", "原生属性更新"));
        await page.getByRole("button", { name: "原生属性更新：1" }).waitFor();
        const delegated = await page
          .locator("compass-counter")
          .evaluate((host) => {
            document.activeElement?.blur();
            host.focus();
            return (
              host.shadowRoot.activeElement ===
              host.shadowRoot.querySelector("button")
            );
          });
        assert.equal(delegated, true);
      }
    }
    await page.goto(
      "http://127.0.0.1:4544/iframe.html?id=compass-uibutton--dark-brand&viewMode=story",
    );
    const panel = page.locator("[data-theme=dark]");
    await panel.waitFor();
    const color = await page
      .getByRole("button")
      .evaluate((el) => getComputedStyle(el).color);
    assert.equal(color, "rgb(233, 182, 255)");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    result.push({
      width,
      realStorybookPlay: [
        "sharedButtonClick",
        "disabledNoClick",
        "vueCustomElementEvent",
      ],
      themeComputed: color,
      externalRequests: external.length,
      pageErrors: errors.length,
    });
    await context.close();
  }
  console.log(
    JSON.stringify(
      {
        results: result,
        limits: [
          "no SaaS/Chromatic/Figma/TokensStudio cloud sync",
          "Storybook imports shared SFC source, not packed distribution",
          "only Chrome simulated viewports, no realmobile/multiengine/screenreader",
        ],
      },
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
