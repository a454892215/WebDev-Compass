import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { startServer } from "./server.mjs";
const server = await startServer();
let browser;
const results = [];
function summarizeHeap(raw) {
  const h = JSON.parse(raw),
    nf = h.snapshot.meta.node_fields,
    ef = h.snapshot.meta.edge_fields,
    nw = nf.length,
    ew = ef.length,
    nt = h.snapshot.meta.node_types[nf.indexOf("type")],
    et = h.snapshot.meta.edge_types[ef.indexOf("type")];
  const name = (i) => h.strings[h.nodes[i + nf.indexOf("name")]],
    type = (i) => nt[h.nodes[i + nf.indexOf("type")]];
  const targets = new Set();
  for (let i = 0; i < h.nodes.length; i += nw)
    if (type(i) === "object" && name(i) === "Stage9RetainedPanel")
      targets.add(i);
  const incoming = [];
  let edge = 0;
  for (let i = 0; i < h.nodes.length; i += nw) {
    const count = h.nodes[i + nf.indexOf("edge_count")];
    for (let j = 0; j < count; j++, edge += ew) {
      const target = h.edges[edge + ef.indexOf("to_node")];
      if (targets.has(target) && incoming.length < 8) {
        const edgeType = et[h.edges[edge + ef.indexOf("type")]],
          value = h.edges[edge + ef.indexOf("name_or_index")];
        incoming.push({
          fromType: type(i),
          fromName: name(i),
          edgeType,
          edgeName: ["element", "hidden"].includes(edgeType)
            ? value
            : h.strings[value],
        });
      }
    }
  }
  return { retainedPanelObjects: targets.size, incomingReferences: incoming };
}
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
      page = await context.newPage();
    page.setDefaultTimeout(6000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4520");
    await page.waitForFunction(() => Boolean(window.stage9Runtime));
    const readme = await page.request.get("http://127.0.0.1:4520/README.md");
    assert.equal(readme.status(), 200);
    await page
      .getByRole("button", { name: "同步阻塞90ms", exact: true })
      .click();
    await page.waitForFunction(() =>
      window.stage9Runtime.observations.longtasks.some((x) => x.duration >= 50),
    );
    await page.getByRole("button", { name: "分片工作", exact: true }).click();
    await page.waitForFunction(() =>
      document.querySelector("#task-result").textContent.includes("sliced"),
    );
    const sliced = JSON.parse(await page.locator("#task-result").textContent());
    assert.equal(sliced.steps, 6);
    await page.evaluate(() => {
      document.querySelector("#task-result").textContent = "";
      document.querySelector("#slice").click();
      document.querySelector("#cancel").click();
    });
    await page.waitForFunction(() =>
      document.querySelector("#feedback").textContent.includes("已取消"),
    );
    await page.evaluate(() => new Promise((r) => setTimeout(r, 40)));
    assert.equal(await page.locator("#task-result").textContent(), "");
    const before = await page.evaluate(() => {
      const v = document.querySelector("#viewport");
      v.scrollTop = 1000;
      v.dispatchEvent(new Event("scroll"));
      const row = [...document.querySelectorAll("#list>[role=listitem]")].find(
        (x) =>
          x.getBoundingClientRect().bottom > v.getBoundingClientRect().top + 1,
      );
      return {
        index: row.dataset.index,
        top: row.getBoundingClientRect().top,
        scroll: v.scrollTop,
        count: window.stage9Runtime.getWindow().count,
      };
    });
    assert.ok(before.count < 30);
    await page.getByRole("button", { name: "增加首行高度并保持锚点" }).click();
    const after = await page.evaluate((index) => {
      const row = document.querySelector(`[data-index="${index}"]`);
      return {
        top: row.getBoundingClientRect().top,
        scroll: document.querySelector("#viewport").scrollTop,
      };
    }, before.index);
    assert.ok(Math.abs(after.top - before.top) < 1);
    assert.equal(after.scroll, before.scroll + 20);
    await page.getByRole("button", { name: "切换全量模式" }).click();
    assert.equal(await page.locator("#list>[role=listitem]").count(), 1000);
    await page.getByRole("button", { name: "切换全量模式" }).click();
    assert.ok((await page.locator("#list>[role=listitem]").count()) < 30);
    const worker = await page.evaluate(async () => {
      const pool = window.stage9Runtime.pool;
      const first = new Uint32Array(100000).fill(1);
      const promises = [
        pool.submit(first.buffer),
        pool.submit(new Uint32Array(10).fill(2).buffer),
        pool.submit(new Uint32Array(10).fill(3).buffer),
        pool.submit(new Uint32Array(10).buffer),
      ];
      const detached = first.byteLength === 0;
      const done = await Promise.allSettled(promises);
      const cancelled = pool
        .submit(new Uint32Array(100).buffer)
        .catch((e) => e.message);
      pool.cancelAll();
      const reason = await cancelled;
      const restarted = await pool.submit(new Uint32Array(3).fill(5).buffer);
      return {
        detached,
        done: done.map((r) =>
          r.status === "fulfilled" ? r.value : r.reason.message,
        ),
        reason,
        restarted,
      };
    });
    assert.equal(worker.detached, true);
    assert.deepEqual(worker.done, [100000, 20, 30, "Queue full"]);
    assert.equal(worker.reason, "Cancelled");
    assert.equal(worker.restarted, 15);
    const idle = await page.evaluate(async () => {
      let called = false;
      const cancel = window.stage9Runtime.queueIdle(() => (called = true), {
        forceFallback: true,
      });
      cancel();
      await new Promise((r) => setTimeout(r, 30));
      const observed = await new Promise((r) =>
        window.stage9Runtime.queueIdle(
          (d) => r({ didTimeout: d.didTimeout, budget: d.timeRemaining() }),
          { forceFallback: true },
        ),
      );
      return { called, ...observed };
    });
    assert.deepEqual(idle, { called: false, didTimeout: true, budget: 0 });
    const observations = await page.evaluate(() => ({
      supported: PerformanceObserver.supportedEntryTypes,
      longtasks: window.stage9Runtime.observations.longtasks,
      events: window.stage9Runtime.observations.events,
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    assert.equal(observations.overflow, false);
    assert.deepEqual(errors, []);
    results.push({
      width,
      status: "passed",
      window: { before, after },
      worker,
      idle,
      sliced,
      observations,
    });
    if (width === 1440) {
      const cdp = await context.newCDPSession(page);
      await cdp.send("HeapProfiler.enable");
      await mkdir("artifacts", { recursive: true });
      async function snapshot(label) {
        await cdp.send("HeapProfiler.collectGarbage");
        const chunks = [];
        const capture = ({ chunk }) => chunks.push(chunk);
        cdp.on("HeapProfiler.addHeapSnapshotChunk", capture);
        await cdp.send("HeapProfiler.takeHeapSnapshot", {
          reportProgress: false,
        });
        cdp.off("HeapProfiler.addHeapSnapshotChunk", capture);
        const raw = chunks.join("");
        await writeFile(`artifacts/${label}.heapsnapshot`, raw);
        return summarizeHeap(raw);
      }
      const baseline = await snapshot("baseline");
      await page.evaluate(() => window.stage9Runtime.leak());
      const leaked = await snapshot("leaked");
      await page.evaluate(() => window.stage9Runtime.clean());
      const cleaned = await snapshot("cleaned");
      assert.equal(baseline.retainedPanelObjects, 0);
      assert.equal(leaked.retainedPanelObjects, 20);
      assert.ok(
        leaked.incomingReferences.some((x) => x.edgeType === "element"),
      );
      assert.equal(cleaned.retainedPanelObjects, 0);
      results.push({
        kind: "actualCDPHeap",
        baseline,
        leaked,
        cleaned,
        scope:
          "Synthetic detached panels and strong-reference fix, controlledGC not normalGC guarantee",
      });
      await cdp.detach();
    }
    await page.evaluate(() => window.stage9Runtime.dispose());
    await context.close();
  }
  await writeFile("artifacts/results.json", JSON.stringify(results, null, 2));
  console.log(
    JSON.stringify({ passedGroups: results.length, results }, null, 2),
  );
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((r) => server.close(r));
}
