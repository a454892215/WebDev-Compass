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
    const context = await browser.newContext({
        viewport: { width, height: 900 },
      }),
      page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.setDefaultTimeout(5000);
    await page.goto("http://127.0.0.1:4515");
    await page
      .getByRole("status")
      .filter({ hasText: "alice 本地草稿已读取" })
      .waitFor();
    const note = `独立草稿 ${width}`;
    await page.getByRole("textbox", { name: "草稿" }).fill(note);
    await page.getByRole("button", { name: "保存本地草稿" }).click();
    await page
      .locator("#status")
      .filter({ hasText: "本地草稿已保存" })
      .waitFor();
    await page.reload();
    await page
      .locator("#status")
      .filter({ hasText: "alice 本地草稿已读取" })
      .waitFor();
    assert.equal(await page.locator("#draft").inputValue(), note);
    await page.locator("#scope").selectOption("bob");
    await page
      .locator("#status")
      .filter({ hasText: "bob 本地草稿已读取" })
      .waitFor();
    assert.equal(await page.locator("#draft").inputValue(), "");
    await page.locator("#scope").selectOption("alice");
    await page
      .locator("#status")
      .filter({ hasText: "alice 本地草稿已读取" })
      .waitFor();
    assert.equal(await page.locator("#draft").inputValue(), note);
    await context.setOffline(true);
    await page.getByRole("button", { name: "加入待发送队列" }).click();
    await page.locator("#pending").filter({ hasText: "待发送：1" }).waitFor();
    await page.getByRole("button", { name: "加入待发送队列" }).click();
    await page
      .locator("#status")
      .filter({ hasText: "重复加入同一内容不会多一项" })
      .waitFor();
    assert.equal(
      await page.evaluate(
        async () => (await window.stage8State.listQueue()).length,
      ),
      1,
    );
    const entry = await page.evaluate(
      async () => (await window.stage8State.listQueue())[0],
    );
    await page.getByRole("button", { name: "显式重试" }).click();
    await page.locator("#status").filter({ hasText: "失败：" }).waitFor();
    assert.equal(
      await page.evaluate(
        async () => (await window.stage8State.listQueue()).length,
      ),
      1,
    );
    await context.setOffline(false);
    await page.reload();
    await page
      .locator("#status")
      .filter({ hasText: "alice 本地草稿已读取" })
      .waitFor();
    assert.equal(
      await page.evaluate(
        async () => (await window.stage8State.listQueue()).length,
      ),
      1,
    );
    await page.getByRole("button", { name: "显式重试" }).click();
    await page.locator("#status").filter({ hasText: "重试完成" }).waitFor();
    assert.equal(
      await page.evaluate(
        async () => (await window.stage8State.listQueue()).length,
      ),
      0,
    );
    const first = await page.request.post("http://127.0.0.1:4515/api/sync", {
      data: entry,
    });
    const second = await page.request.post("http://127.0.0.1:4515/api/sync", {
      data: entry,
    });
    assert.equal(
      (await first.json()).applications,
      (await second.json()).applications,
    );
    const altered = await page.request.post("http://127.0.0.1:4515/api/sync", {
      data: { ...entry, text: "different" },
    });
    assert.equal(altered.status(), 409);
    await page.getByRole("button", { name: "模拟刷新失败" }).click();
    assert.equal(
      await page.locator("#stale-data").innerText(),
      "已缓存课程：Vue 3",
    );
    assert.match(await page.locator("#stale-status").innerText(), /可能过期/);
    await page.getByRole("button", { name: "模拟刷新成功" }).click();
    assert.equal(
      await page.locator("#stale-data").innerText(),
      "已缓存课程：Nuxt",
    );
    const owner = width === 390 ? "alice" : "bob";
    const saved = await page.request.post("http://127.0.0.1:4515/api/value", {
      data: { scope: owner, value: 3, expectedRevision: 1 },
    });
    assert.equal(saved.status(), 200);
    const conflict = await page.request.post(
      "http://127.0.0.1:4515/api/value",
      { data: { scope: owner, value: 4, expectedRevision: 1 } },
    );
    assert.equal(conflict.status(), 409);
    assert.equal((await conflict.json()).current.value, 3);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.deepEqual(errors, []);
    await page.evaluate(async () => {
      window.stage8State.db.close();
      await new Promise((r, j) => {
        const q = indexedDB.deleteDatabase("compass-stage8-state-lab-v1");
        q.onsuccess = r;
        q.onerror = j;
      });
    });
    await context.close();
    results.push({
      width,
      result: "passed",
      facts: [
        "real IndexedDB persisted reload and scoped drafts",
        "real browser offline keeps durable outbox",
        "explicit retry ACK-only delete and same-ID HTTP dedupe",
        "changed payload sameID409",
        "actual expectedRevision409/current unchanged",
        "controlled stale error keeps prior data",
        "no page errors or horizontal overflow",
      ],
    });
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/browser.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((r) => server.close(r));
}
