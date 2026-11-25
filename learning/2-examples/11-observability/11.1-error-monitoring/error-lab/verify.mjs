import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
import { createLab } from "./server.mjs";
const server = createLab();
let browser;
const results = [];
try {
  server.listen(4532, "127.0.0.1");
  await once(server, "listening");
  const chrome =
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  browser = await chromium.launch({
    headless: true,
    ...(existsSync(chrome) ? { executablePath: chrome } : {}),
  });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const external = [];
    context.on("request", (req) => {
      if (!req.url().startsWith("http://127.0.0.1:4532/"))
        external.push(req.url());
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4532/");
    await page.waitForFunction(() => window.lab);
    const value = await page.evaluate(async () => {
      for (const action of [
        "open-panel",
        "choose-filter",
        "retry-panel",
        "submit-fixture",
        "typed secret",
      ])
        window.lab.crumb(action);
      await window.lab.capture("abort");
      const afterAbort = window.lab.envelopes.length;
      await window.lab.capture();
      await window.lab.capture();
      await window.lab.capture();
      return {
        afterAbort,
        envelopes: window.lab.envelopes,
        version: window.lab.version,
      };
    });
    const events = value.envelopes.flatMap((e) =>
      e[1].filter((i) => i[0].type === "event").map((i) => i[1]),
    );
    assert.equal(value.afterAbort, 0);
    assert.equal(events.length, 2);
    assert.equal(value.version, "11.17.0");
    assert.equal(events[0].release, "error-lab@1.0.0");
    assert.equal(events[0].environment, "local-fixture");
    assert.equal(events[0].breadcrumbs.length, 3);
    assert.deepEqual(
      events[0].breadcrumbs.map((b) => b.message),
      ["choose-filter", "retry-panel", "submit-fixture"],
    );
    const text = JSON.stringify(value.envelopes);
    assert.equal(text.includes("DO_NOT_SEND_THIS"), false);
    assert.equal(text.includes("fixture-email@example.invalid"), false);
    assert.equal(text.includes("secret-user"), false);
    const frames = events[0].exception.values[0].stacktrace.frames;
    let mapped;
    for (const frame of frames) {
      if (!frame.filename?.includes("/assets/") || !frame.lineno) continue;
      const url = new URL(frame.filename);
      const content = await readFile("dist" + url.pathname, "utf8");
      assert.equal(content.includes("sourceMappingURL="), false);
      const map = new TraceMap(
        JSON.parse(await readFile("dist" + url.pathname + ".map", "utf8")),
      );
      const pos = originalPositionFor(map, {
        line: frame.lineno,
        column: Math.max(0, (frame.colno || 1) - 1),
      });
      if (pos.source?.endsWith("/app.mjs")) {
        mapped = pos;
        break;
      }
    }
    assert.ok(mapped?.line > 0);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    await page.goto("http://127.0.0.1:4532/?sample=0");
    await page.waitForFunction(() => window.lab);
    const dropped = await page.evaluate(async () => {
      await window.lab.capture();
      return window.lab.envelopes.length;
    });
    assert.equal(dropped, 0);
    assert.deepEqual(external, []);
    results.push({
      width,
      sdk: value.version,
      events: events.length,
      abortDropped: true,
      sampleZeroDropped: true,
      breadcrumbs: 3,
      mappedSource: mapped.source,
      mappedLine: mapped.line,
      externalRequests: 0,
    });
    await context.close();
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/verification.json",
    JSON.stringify(
      {
        results,
        limits: [
          "custom memory transport, no SaaS ingest/upload/alerts",
          "only manual capture; default integrations disabled",
          "hidden maps served by this local fixture; not access control",
        ],
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify({ results }, null, 2));
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
