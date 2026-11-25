import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { once } from "node:events";
import { safeLog, eventBody } from "./logic.mjs";
export async function startServer() {
  const records = [];
  const root = resolve("dist");
  const serverOnly =
    process.env.STAGE10_PRIVATE_CANARY || "STAGE10_SERVER_ONLY_CANARY";
  const secondary = createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    if (pathname === "/allowed.svg")
      res.setHeader("cross-origin-resource-policy", "cross-origin");
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.end(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="blue"/></svg>',
    );
  });
  secondary.listen(4526, "127.0.0.1");
  await once(secondary, "listening");
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    try {
      if (url.pathname === "/server-canary-present") {
        res
          .writeHead(200, { "content-type": "application/json" })
          .end(JSON.stringify({ configured: Boolean(serverOnly) }));
        return;
      }
      if (url.pathname === "/optional-event") {
        if (req.method !== "POST") {
          res.writeHead(405).end();
          return;
        }
        let bytes = 0;
        const chunks = [];
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes <= 1024) chunks.push(chunk);
        }
        if (bytes > 1024) {
          res.writeHead(413).end();
          return;
        }
        try {
          const body = eventBody(JSON.parse(Buffer.concat(chunks).toString()));
          if (records.length >= 50) records.shift();
          records.push(safeLog({ url: req.url, status: 204, kind: body.kind }));
          res.writeHead(204).end();
        } catch {
          res.writeHead(400).end();
        }
        return;
      }
      if (url.pathname === "/isolation") {
        res.writeHead(200, {
          "content-type": "text/html; charset=utf-8",
          "cross-origin-opener-policy": "same-origin",
          "cross-origin-embedder-policy": "require-corp",
        });
        res.end(
          '<!doctype html><html lang="en"><meta charset="utf-8"><title>Isolation</title><h1>Isolation</h1><img id="allowed" src="http://127.0.0.1:4526/allowed.svg" alt="allowed"><img id="blocked" src="http://127.0.0.1:4526/blocked.svg" alt="blocked"></html>',
        );
        return;
      }
      if (url.pathname === "/README.md") {
        res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
        res.end(await readFile("README.md"));
        return;
      }
      const target = resolve(
        root,
        "." + (url.pathname === "/" ? "/index.html" : url.pathname),
      );
      if (
        !target.startsWith(root + sep) ||
        !(await stat(target).catch(() => null))?.isFile()
      ) {
        res.writeHead(404).end();
        return;
      }
      const type =
        {
          ".html": "text/html; charset=utf-8",
          ".js": "text/javascript; charset=utf-8",
          ".css": "text/css; charset=utf-8",
          ".map": "application/json",
        }[extname(target)] || "application/octet-stream";
      res.writeHead(200, {
        "content-type": type,
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
      });
      res.end(await readFile(target));
    } catch {
      if (!res.headersSent) res.writeHead(500);
      res.end();
    }
  });
  server.listen(4524, "127.0.0.1");
  await once(server, "listening");
  return {
    records,
    close: async () => {
      records.length = 0;
      server.closeAllConnections();
      secondary.closeAllConnections();
      await Promise.all([
        new Promise((r) => server.close(r)),
        new Promise((r) => secondary.close(r)),
      ]);
    },
  };
}
