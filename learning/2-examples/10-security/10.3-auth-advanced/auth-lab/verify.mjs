import assert from "node:assert/strict";
import { once } from "node:events";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { createLab } from "./server.mjs";
const { server, clear } = createLab();
let browser;
try {
  server.listen(4523, "127.0.0.1");
  await once(server, "listening");
  const origin = "http://127.0.0.1:4523";
  const create = await fetch(origin + "/session", {
    method: "POST",
    headers: { origin },
  });
  assert.equal(create.status, 201);
  const setCookie = create.headers.get("set-cookie");
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  const cookie = setCookie.split(";")[0];
  assert.equal(
    (
      await fetch(origin + "/session", {
        method: "POST",
        headers: { origin: "http://127.0.0.1:4525" },
      })
    ).status,
    403,
  );
  assert.equal(
    (await fetch(origin + "/api/note", { headers: { cookie } })).status,
    200,
  );
  assert.equal(
    (await fetch(origin + "/api/note?id=note-b", { headers: { cookie } }))
      .status,
    403,
  );
  assert.equal(
    (await fetch(origin + "/api/note?id=note-c", { headers: { cookie } }))
      .status,
    403,
  );
  assert.equal(
    (
      await fetch(origin + "/api/note", {
        method: "DELETE",
        headers: { origin, cookie },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await fetch(origin + "/logout", {
        method: "POST",
        headers: { origin, cookie },
      })
    ).status,
    204,
  );
  assert.equal(
    (await fetch(origin + "/api/note", { headers: { cookie } })).status,
    401,
  );
  const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  browser = await chromium.launch({
    headless: true,
    ...(existsSync(chrome) ? { executablePath: chrome } : {}),
  });
  const results = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
        viewport: { width, height: 844 },
      }),
      page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(origin);
    await page.locator("#read").click();
    await page.waitForFunction(
      () => document.querySelector("#state").textContent === "读取状态 401",
    );
    await page.locator("#create").click();
    await page.waitForFunction(
      () => document.querySelector("#state").textContent === "创建状态 201",
    );
    assert.equal(await page.evaluate(() => document.cookie), "");
    const cookies = await context.cookies();
    assert.equal(cookies.find((c) => c.name === "stage10-auth").httpOnly, true);
    await page.locator("#read").click();
    await page.waitForFunction(
      () => document.querySelector("#state").textContent === "读取状态 200",
    );
    await page.locator("#logout").click();
    await page.waitForFunction(
      () => document.querySelector("#state").textContent === "撤销状态 204",
    );
    await page.locator("#read").click();
    await page.waitForFunction(
      () => document.querySelector("#state").textContent === "读取状态 401",
    );
    assert.deepEqual(errors, []);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    results.push({
      width,
      cookieHttpOnly: true,
      javascriptCookieEmpty: true,
      readBefore401: true,
      readAfter200: true,
      revoked401: true,
      pageErrors: errors,
    });
    await context.close();
  }
  mkdirSync("artifacts", { recursive: true });
  writeFileSync(
    "artifacts/browser.json",
    JSON.stringify(
      {
        http: "Origin403,session201,ownread200,foreignowner403,othertenant403,roledelete403,logout204,stolenOldCookie401",
        results,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ http: "passed", viewports: results }, null, 2));
} finally {
  if (browser) await browser.close();
  server.closeAllConnections();
  await new Promise((r) => server.close(r));
  clear();
}
