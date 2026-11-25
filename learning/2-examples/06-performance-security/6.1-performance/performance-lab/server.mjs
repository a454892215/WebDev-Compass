import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { gzipSync, brotliCompressSync } from "node:zlib";
export const PAYLOAD = "performance fixture data ".repeat(5000);
export function createLabServer() {
  let revalidations = 0,
    hits = 0,
    privateHits = 0,
    network = 0;
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    if (url.pathname === "/api/compressed") {
      const encoding = url.searchParams.get("encoding");
      const data = Buffer.from(PAYLOAD);
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Vary", "Accept-Encoding");
      if (encoding === "gzip") {
        res.setHeader("Content-Encoding", "gzip");
        res.end(gzipSync(data));
      } else if (encoding === "br") {
        res.setHeader("Content-Encoding", "br");
        res.end(brotliCompressSync(data));
      } else res.end(data);
      return;
    }
    if (url.pathname === "/api/cache") {
      hits++;
      res.setHeader("ETag", '"v1"');
      res.setHeader("Cache-Control", "public,max-age=0,must-revalidate");
      if (req.headers["if-none-match"] === '"v1"') {
        revalidations++;
        res.statusCode = 304;
        res.end();
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ version: 1 }));
      }
      return;
    }
    if (url.pathname === "/api/private") {
      res.setHeader("Cache-Control", "private,no-store");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ mockPrivateCounter: ++privateHits }));
      return;
    }
    if (url.pathname === "/api/stats") {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify({ revalidations, hits, privateHits, network }));
      return;
    }
    if (url.pathname === "/sw-lab/network-first.txt") {
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("Content-Type", "text/plain");
      res.end(`network-response-${++network}`);
      return;
    }
    try {
      const root = resolve("dist");
      const path = resolve(
        root,
        "." +
          decodeURIComponent(url.pathname) +
          (url.pathname.endsWith("/") ? "index.html" : ""),
      );
      if (!path.startsWith(root + "/")) {
        res.statusCode = 403;
        res.end();
        return;
      }
      const body = await readFile(path);
      const mime = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".txt": "text/plain",
        ".json": "application/json",
      };
      res.setHeader(
        "Content-Type",
        mime[extname(path)] || "application/octet-stream",
      );
      res.setHeader("Cache-Control", "no-cache");
      res.end(body);
    } catch {
      res.statusCode = 404;
      res.end("not found");
    }
  });
}
if (
  process.argv[1] &&
  import.meta.url === new URL(process.argv[1], "file:").href
) {
  const server = createLabServer();
  server.listen(4501, "127.0.0.1", () => console.log("http://127.0.0.1:4501"));
}
