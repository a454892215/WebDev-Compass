import assert from "node:assert/strict";
import { once } from "node:events";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { createLab } from "./server.mjs";
const { server, clear } = createLab();
let browser;
const results = [];
try {
  server.listen(4534, "127.0.0.1");
  await once(server, "listening");
  const origin = "http://127.0.0.1:4534";
  const assignment = await (await fetch(origin + "/assignment")).json();
  const post = (data, customOrigin = origin) =>
    fetch(origin + "/event", {
      method: "POST",
      headers: { origin: customOrigin, "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  assert.equal(
    (await post({ kind: "conversion", variant: assignment.variant })).status,
    409,
  );
  assert.equal(
    (
      await post(
        { kind: "exposure", variant: assignment.variant },
        "http://127.0.0.1:4535",
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await post({
        kind: "exposure",
        variant: assignment.variant,
        email: "synthetic@example.invalid",
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await fetch(origin + "/event", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: " ".repeat(3000),
      })
    ).status,
    413,
  );
  assert.equal(
    (await fetch(origin + "/assignment?subject=unknown")).status,
    400,
  );
  assert.equal((await fetch(origin + "/README.md")).status, 200);
  clear();
  const chrome =
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  browser = await chromium.launch({
    headless: true,
    ...(existsSync(chrome) ? { executablePath: chrome } : {}),
  });
  for (const width of [390, 1440]) {
    clear();
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const external = [];
    page.on("request", (r) => {
      if (!r.url().startsWith(origin)) external.push(r.url());
    });
    await page.goto(origin);
    await page.locator("#assign").click();
    await page
      .locator("#assignment")
      .filter({ hasText: "fixture-001" })
      .waitFor();
    assert.equal((await (await fetch(origin + "/stats")).json()).exposed, 0);
    const first = JSON.parse(await page.locator("#assignment").textContent());
    await page.locator("#assign").click();
    await page.locator("#show:enabled").waitFor();
    const second = JSON.parse(await page.locator("#assignment").textContent());
    assert.equal(second.variant, first.variant);
    assert.equal(second.feature.enabled, first.feature.enabled);
    assert.equal((await (await fetch(origin + "/stats")).json()).exposed, 0);
    await page.locator("#show").click();
    await page.locator("#convert:enabled").waitFor();
    assert.equal((await (await fetch(origin + "/stats")).json()).exposed, 1);
    const duplicate = page.waitForResponse(
      (r) =>
        r.url().includes("/event") &&
        r.request().postDataJSON().kind === "exposure",
    );
    await page.locator("#show").click();
    assert.equal((await duplicate).status(), 200);
    assert.equal((await (await fetch(origin + "/stats")).json()).exposed, 1);
    const conversion = page.waitForResponse(
      (r) =>
        r.url().includes("/event") &&
        r.request().postDataJSON().kind === "conversion",
    );
    await page.locator("#convert").click();
    assert.equal((await conversion).status(), 200);
    await page.waitForFunction(() =>
      document.getElementById("status").textContent.includes("合成转化"),
    );
    const stats = await (await fetch(origin + "/stats")).json();
    assert.equal(stats.converted, 1);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    results.push({
      width,
      stableAssignment: true,
      assignmentNotExposure: true,
      visibleExposure: 1,
      conversion: 1,
      overflow: false,
      pageErrors: errors,
      externalRequests: external.length,
    });
    await context.close();
  }
  mkdirSync("artifacts", { recursive: true });
  writeFileSync(
    "artifacts/browser.json",
    JSON.stringify(
      {
        http: {
          beforeExposure409: true,
          origin403: true,
          extraField400: true,
          oversize413: true,
          unknownSubject400: true,
          readme200: true,
        },
        results,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ http: "passed", results }, null, 2));
} finally {
  await browser?.close();
  clear();
  await new Promise((resolve) => server.close(resolve));
}
