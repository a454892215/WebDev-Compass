import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { baseline, evaluate, assign, subjects, createLedger } from "./core.mjs";
const files = new Map([
  ["/", "index.html"],
  ["/app.mjs", "app.mjs"],
  ["/README.md", "README.md"],
]);
export function createLab() {
  const ledger = createLedger();
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1:4534");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const json = (status, data) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    };
    try {
      if (req.method === "GET" && files.has(url.pathname)) {
        res.setHeader(
          "Content-Type",
          url.pathname.endsWith(".mjs")
            ? "text/javascript"
            : url.pathname.endsWith(".md")
              ? "text/plain; charset=utf-8"
              : "text/html; charset=utf-8",
        );
        return res.end(
          await readFile(new URL(files.get(url.pathname), import.meta.url)),
        );
      }
      const subject = url.searchParams.get("subject") || subjects[0];
      if (!subjects.includes(subject))
        return json(400, { error: "Unknown fixture" });
      if (req.method === "GET" && url.pathname === "/assignment") {
        return json(200, {
          subject,
          variant: assign(subject),
          feature: evaluate(baseline, { subject, region: "CN" }),
        });
      }
      if (req.method === "GET" && url.pathname === "/stats")
        return json(200, ledger.snapshot());
      if (req.method === "POST" && url.pathname === "/event") {
        if (req.headers.origin !== "http://127.0.0.1:4534")
          return json(403, { error: "Origin rejected" });
        if (req.headers["content-type"] !== "application/json")
          return json(415, { error: "JSON required" });
        let bytes = 0,
          overflow = false;
        const chunks = [];
        for await (const chunk of req.iterator({ destroyOnReturn: false })) {
          bytes += chunk.length;
          if (bytes > 2048) overflow = true;
          if (!overflow) chunks.push(chunk);
          if (bytes > 8192) {
            res.setHeader("Connection", "close");
            req.resume();
            break;
          }
        }
        if (overflow) return json(413, { error: "Too large" });
        let body;
        try {
          body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        } catch {
          return json(400, { error: "Invalid JSON" });
        }
        if (
          !body ||
          typeof body !== "object" ||
          Array.isArray(body) ||
          Object.keys(body).some((x) => !["variant", "kind"].includes(x))
        )
          return json(400, { error: "Fields rejected" });
        if (!ledger.event(subject, body.variant, body.kind))
          return json(409, { error: "Assignment/exposure rejected" });
        return json(200, ledger.snapshot());
      }
      json(404, { error: "Not found" });
    } catch {
      if (!res.headersSent) json(500, { error: "Lab failed" });
      else res.end();
    }
  });
  return { server, clear: () => ledger.clear() };
}
if (process.argv[1] === fileURLToPath(import.meta.url))
  createLab().server.listen(4534, "127.0.0.1", () =>
    console.log("http://127.0.0.1:4534"),
  );
