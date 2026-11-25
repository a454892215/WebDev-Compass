import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { safeLog } from "./core.mjs";
import { createTelemetry } from "./otel.mjs";
export async function start(port = 4533) {
  const t = createTelemetry(),
    rows = [],
    events = [];
  let workCount = 0;
  const origin = "http://127.0.0.1:" + port;
  const send = (res, status, value) => {
    res.writeHead(status, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(JSON.stringify(value));
  };
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, origin);
      if (
        req.method === "GET" &&
        (url.pathname === "/" ||
          url.pathname === "/index.html" ||
          url.pathname === "/app.mjs" ||
          url.pathname === "/README.md")
      ) {
        const name =
          url.pathname === "/app.mjs"
            ? "app.mjs"
            : url.pathname === "/README.md"
              ? "README.md"
              : "index.html";
        res.writeHead(200, {
          "content-type": name.endsWith(".mjs")
            ? "text/javascript"
            : name.endsWith(".md")
              ? "text/plain; charset=utf-8"
              : "text/html; charset=utf-8",
          "cache-control": "no-store",
          "referrer-policy": "no-referrer",
          "x-content-type-options": "nosniff",
        });
        res.end(await readFile(new URL(name, import.meta.url)));
        return;
      }
      if (req.method === "GET" && url.pathname === "/work") {
        if (++workCount > 32) {
          send(res, 429, { error: "lab capacity; restart server" });
          return;
        }
        const result = await t.work(req.headers);
        rows.push(
          safeLog(
            {
              level: "info",
              traceId: result.traceId,
              route: "catalog",
              outcome: "ok",
              url: req.url,
            },
            "fixture-server-key",
          ),
        );
        if (rows.length > 20) rows.shift();
        res.setHeader("x-trace-id", result.traceId);
        send(res, 200, result);
        return;
      }
      if (req.method === "POST" && url.pathname === "/telemetry") {
        if (req.headers.origin !== origin) {
          req.resume();
          send(res, 403, { error: "origin" });
          return;
        }
        if (req.headers["content-type"] !== "application/json") {
          req.resume();
          send(res, 415, { error: "json" });
          return;
        }
        let size = 0,
          body = "",
          tooLarge = false;
        for await (const chunk of req.iterator({ destroyOnReturn: false })) {
          size += chunk.length;
          if (size > 1000) tooLarge = true;
          else body += chunk;
        }
        if (tooLarge) {
          send(res, 413, { error: "size" });
          return;
        }
        let value;
        try {
          value = JSON.parse(body);
        } catch {
          send(res, 400, { error: "json" });
          return;
        }
        if (
          !value ||
          typeof value !== "object" ||
          Array.isArray(value) ||
          Object.keys(value).sort().join(",") !== "kind,value" ||
          value.kind !== "duration" ||
          !Number.isFinite(value.value) ||
          value.value < 0 ||
          value.value > 60000
        ) {
          send(res, 400, { error: "schema" });
          return;
        }
        t.recordDuration(value.value);
        events.push({ kind: value.kind, value: value.value });
        if (events.length > 20) events.shift();
        res.writeHead(204);
        res.end();
        return;
      }
      if (req.method === "GET" && url.pathname === "/stats") {
        send(res, 200, { logs: rows, events, otel: await t.snapshot() });
        return;
      }
      send(res, 404, { error: "not-found" });
    } catch {
      if (!res.headersSent) send(res, 500, { error: "lab" });
      else res.end();
    }
  });
  server.requestTimeout = 5000;
  server.headersTimeout = 6000;
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return {
    url: origin,
    async close() {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
      await t.close();
    },
  };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const app = await start();
  console.log(app.url);
  for (const signal of ["SIGINT", "SIGTERM"])
    process.once(signal, async () => {
      await app.close();
      process.exit(0);
    });
}
