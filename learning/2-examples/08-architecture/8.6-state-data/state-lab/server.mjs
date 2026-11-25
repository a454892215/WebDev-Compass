import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL(".", import.meta.url);
export async function startServer(port = 4515) {
  const applied = new Map();
  let applications = 0;
  const values = new Map();
  const server = createServer(async (req, res) => {
    res.setHeader("cache-control", "no-store");
    res.setHeader("x-content-type-options", "nosniff");
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api/value" && req.method === "POST") {
      let body = "";
      for await (const b of req) {
        body += b;
        if (body.length > 4096) {
          res.writeHead(413).end();
          return;
        }
      }
      try {
        const d = JSON.parse(body);
        if (
          !["alice", "bob"].includes(d.scope) ||
          !Number.isInteger(d.expectedRevision) ||
          !Number.isFinite(d.value)
        )
          throw Error("invalid");
        const current = values.get(d.scope) || { value: 0, revision: 1 };
        res.setHeader("content-type", "application/json");
        if (current.revision !== d.expectedRevision) {
          res
            .writeHead(409)
            .end(JSON.stringify({ error: "revision conflict", current }));
          return;
        }
        const next = { value: d.value, revision: current.revision + 1 };
        values.set(d.scope, next);
        res.end(JSON.stringify(next));
        return;
      } catch {
        res.writeHead(400).end();
        return;
      }
    }
    if (url.pathname === "/api/sync" && req.method === "POST") {
      let text = "";
      for await (const b of req) {
        text += b;
        if (text.length > 4096) {
          res.writeHead(413).end();
          return;
        }
      }
      try {
        const data = JSON.parse(text);
        if (
          !["alice", "bob"].includes(data.scope) ||
          typeof data.id !== "string" ||
          data.id.length > 80 ||
          typeof data.text !== "string" ||
          data.text.length > 1000
        )
          throw Error("invalid");
        const key = JSON.stringify([data.scope, data.id]);
        const existing = applied.get(key);
        if (existing !== undefined && existing !== data.text) {
          res
            .writeHead(409, { "content-type": "application/json" })
            .end(JSON.stringify({ error: "id reused for different payload" }));
          return;
        }
        if (existing === undefined) {
          applied.set(key, data.text);
          applications++;
        }
        res
          .writeHead(200, { "content-type": "application/json" })
          .end(JSON.stringify({ ack: data.id, applications }));
        return;
      } catch {
        res.writeHead(400).end("Invalid synthetic entry");
        return;
      }
    }
    if (url.pathname === "/api/sync") {
      res.writeHead(405).end();
      return;
    }
    const allow = {
      "/": "index.html",
      "/app.mjs": "app.mjs",
      "/logic.mjs": "logic.mjs",
      "/storage.mjs": "storage.mjs",
      "/style.css": "style.css",
      "/README.md": "README.md",
    };
    const name = allow[url.pathname];
    if (!name) {
      res.writeHead(404).end();
      return;
    }
    const body = await readFile(new URL(name, root));
    res.setHeader(
      "content-type",
      name.endsWith(".mjs")
        ? "text/javascript; charset=utf-8"
        : name.endsWith(".css")
          ? "text/css; charset=utf-8"
          : name.endsWith(".md")
            ? "text/plain; charset=utf-8"
            : "text/html; charset=utf-8",
    );
    res.end(body);
  });
  await new Promise((r, j) => {
    server.once("error", j);
    server.listen(port, "127.0.0.1", r);
  });
  return server;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await startServer();
  console.log("http://127.0.0.1:4515");
}
