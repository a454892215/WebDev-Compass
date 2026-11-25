import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
export async function startServer() {
  const records = [];
  const base = resolve("dist");
  const server = createServer(async (req, res) => {
    try {
      const path = new URL(req.url, "http://localhost").pathname;
      if (path === "/collect" && req.method === "POST") {
        let size = 0;
        const chunks = [];
        for await (const chunk of req) {
          size += chunk.length;
          if (size <= 16000) chunks.push(chunk);
        }
        if (size > 16000) {
          res.writeHead(413).end();
          return;
        }
        let body;
        try {
          body = JSON.parse(Buffer.concat(chunks).toString());
        } catch {
          res.writeHead(400).end();
          return;
        }
        if (
          !Array.isArray(body) ||
          body.length > 12 ||
          body.some(
            (row) =>
              !row ||
              Object.keys(row).some(
                (k) =>
                  !["name", "id", "value", "route", "build", "parts"].includes(
                    k,
                  ),
              ) ||
              !["LCP", "INP", "CLS"].includes(row.name) ||
              typeof row.id !== "string" ||
              !/^[-a-zA-Z0-9]{1,100}$/.test(row.id) ||
              !Number.isFinite(row.value) ||
              row.value < 0 ||
              row.route !== "/metrics-lab" ||
              row.build !== "teaching-v1" ||
              !row.parts ||
              Object.keys(row.parts).some(
                (k) =>
                  ![
                    "inputDelay",
                    "processingDuration",
                    "presentationDelay",
                    "timeToFirstByte",
                    "resourceLoadDelay",
                    "resourceLoadDuration",
                    "elementRenderDelay",
                  ].includes(k) ||
                  !Number.isFinite(row.parts[k]) ||
                  row.parts[k] < 0,
              ),
          )
        ) {
          res.writeHead(400).end();
          return;
        }
        records.push(body);
        if (records.length > 20) records.shift();
        res.writeHead(204).end();
        return;
      }
      if (req.method !== "GET") {
        res.writeHead(405).end();
        return;
      }
      const root = path === "/README.md" ? resolve(".") : base;
      const target =
        path === "/README.md"
          ? resolve("README.md")
          : resolve(base, "." + decodeURIComponent(path));
      if (target !== root && !target.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      let file = target;
      try {
        if ((await stat(file)).isDirectory())
          file = resolve(file, "index.html");
      } catch {
        res.writeHead(404).end();
        return;
      }
      const types = {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".md": "text/plain; charset=utf-8",
      };
      res.writeHead(200, {
        "content-type": types[extname(file)] || "application/octet-stream",
        "cache-control": "no-store",
      });
      res.end(await readFile(file));
    } catch {
      if (!res.headersSent) res.writeHead(500);
      res.end("Local fixture error");
    }
  });
  server.listen(4518, "127.0.0.1");
  await new Promise((r, j) => {
    server.once("listening", r);
    server.once("error", j);
  });
  return {
    server,
    records,
    close: () =>
      new Promise((r) => {
        server.closeAllConnections();
        server.close(r);
      }),
  };
}
