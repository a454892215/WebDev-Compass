import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { startServer } from "./server.mjs";
const servers = [];
let browser;
const results = [];
try {
  servers.push(await startServer(4513));
  servers.push(await startServer(4516));
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    page.setDefaultTimeout(5000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4513");
    await page.getByRole("button", { name: "插件计数", exact: true }).click();
    assert.equal(await page.locator("#ticks").innerText(), "1");
    await page.getByRole("button", { name: "卸载后重挂" }).click();
    const lifecycle = await page.evaluate(() => {
      const before = window.lab.stats.ticks;
      window.dispatchEvent(new Event("lab-tick"));
      const after = window.lab.stats.ticks;
      window.lab.dispose();
      window.dispatchEvent(new Event("lab-tick"));
      return {
        delta: after - before,
        stopped: window.lab.stats.ticks === after,
        unmounted: window.lab.stats.unmounted,
      };
    });
    assert.deepEqual(lifecycle, { delta: 1, stopped: true, unmounted: 2 });
    const colors = await page.evaluate(() => [
      getComputedStyle(document.querySelector("#global")).color,
      getComputedStyle(
        document.querySelector("#shadow").shadowRoot.querySelector(".badge"),
      ).color,
    ]);
    assert.deepEqual(colors, ["rgb(150, 20, 20)", "rgb(15, 76, 129)"]);
    await page
      .frameLocator("#trusted")
      .getByRole("button", { name: "发送课程", exact: true })
      .click();
    await page.locator("#message").filter({ hasText: "vue" }).waitFor();
    const before = await page.evaluate(() => ({ ...window.lab.stats }));
    await page
      .frameLocator("#other")
      .getByRole("button", { name: "发送课程", exact: true })
      .click();
    await page
      .frameLocator("#bad-origin")
      .getByRole("button", { name: "发送课程", exact: true })
      .click();
    await page
      .frameLocator("#trusted")
      .getByRole("button", { name: "发送错误版本", exact: true })
      .click();
    await page.waitForFunction(
      (n) => window.lab.stats.rejected === n + 3,
      before.rejected,
    );
    assert.equal(
      await page.evaluate(() => window.lab.stats.accepted),
      before.accepted,
    );
    await page.locator("#trusted").evaluate(
      (frame) =>
        new Promise((resolve) => {
          frame.addEventListener("load", () => resolve(), { once: true });
          frame.src = "http://127.0.0.1:4513/child.html";
        }),
    );
    await page
      .frameLocator("#trusted")
      .getByRole("button", { name: "发送课程", exact: true })
      .click();
    await page.waitForFunction(
      (n) => window.lab.stats.rejected === n + 4,
      before.rejected,
    );
    assert.equal(
      await page.evaluate(() => window.lab.stats.accepted),
      before.accepted,
    );

    const schema = await page.evaluate(() => {
      window.lab.renderForm([
        { id: "safe", label: "<img src=x onerror=alert(1)>" },
      ]);
      let rejected = false;
      try {
        window.lab.renderForm([{ id: "bad", label: "Bad", onclick: "code" }]);
      } catch {
        rejected = true;
      }
      return {
        rejected,
        images: document.querySelectorAll("#fields img").length,
        label: document.querySelector("#fields label").textContent,
      };
    });
    assert.equal(schema.rejected, true);
    assert.equal(schema.images, 0);
    assert.match(schema.label, /<img/);
    await page.getByRole("link", { name: "报表", exact: true }).click();
    assert.equal(await page.locator("#route").innerText(), "报表模块");
    await page.reload();
    assert.equal(await page.locator("#route").innerText(), "报表模块");
    assert.equal(
      (await page.request.get("http://127.0.0.1:4513/missing.js")).status(),
      404,
    );
    assert.equal(
      (await page.goto("http://127.0.0.1:4513/unknown")).status(),
      404,
    );
    assert.match(await page.locator("#route").innerText(), /404/);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.deepEqual(errors, []);
    results.push({
      width,
      passed: true,
      lifecycle,
      colors,
      messageChecks:
        "real cross-origin valid, wrong-source frame, invalid version, and same target WindowProxy after origin navigation rejected",
      schema,
      routes: "history/reload/404",
    });
    await page.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/browser.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
} finally {
  await browser?.close();
  for (const server of servers) {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}
