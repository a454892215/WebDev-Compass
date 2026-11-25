import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { publicKey } from "./logic.mjs";
const root = dirname(fileURLToPath(import.meta.url));
export async function startServer() {
  const cache = new Map();
  let originReads = 0;
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method !== "GET") {
      res.writeHead(405).end();
      return;
    }
    if (url.pathname === "/early-hints") {
      res.writeEarlyHints({
        link: "</noncritical.css>; rel=preload; as=style",
      });
      await new Promise((r) => setTimeout(r, 20));
      res
        .writeHead(200, { "content-type": "text/plain" })
        .end("Final response");
      return;
    }
    if (url.pathname === "/public-data") {
      const key = publicKey(url, req.headers);
      if (!key) {
        res
          .writeHead(200, {
            "content-type": "application/json",
            "cache-control": "private, no-store",
            "x-lab-cache": "BYPASS",
          })
          .end(
            JSON.stringify({
              q: url.searchParams.get("q") || "",
              lang: url.searchParams.get("lang") || "zh-CN",
              scope:
                req.headers.cookie?.match(
                  /(?:^|;\s*)scope=(alice|bob)(?:;|$)/,
                )?.[1] ||
                req.headers.authorization?.match(/^Bearer (alice|bob)$/)?.[1] ||
                "uncacheable",
              read: ++originReads,
            }),
          );
        return;
      }
      let data = cache.get(key);
      const hit = Boolean(data);
      if (!data) {
        data = {
          q: url.searchParams.get("q") || "",
          lang: url.searchParams.get("lang") || "zh-CN",
          scope: "public",
          read: ++originReads,
        };
        if (cache.size >= 32) cache.delete(cache.keys().next().value);
        cache.set(key, data);
      }
      res
        .writeHead(200, {
          "content-type": "application/json",
          "cache-control": "public, max-age=30",
          "x-lab-cache": hit ? "HIT" : "MISS",
        })
        .end(JSON.stringify(data));
      return;
    }
    try {
      const path = url.pathname === "/" ? "/index.html" : url.pathname;
      if (
        !/^\/(?:index\.html|next\.html|README\.md|app\.mjs|logic\.mjs|noncritical\.css|assets\/[\w.-]+)$/.test(
          path,
        )
      ) {
        res.writeHead(404).end("Not found");
        return;
      }
      const data = await readFile(resolve(root, "." + path));
      const delay =
        path === "/noncritical.css"
          ? 600
          : path.endsWith(".woff2")
            ? 180
            : path.includes("/hero-")
              ? 100
              : 0;
      if (delay) await new Promise((r) => setTimeout(r, delay));
      const types = {
        ".html": "text/html; charset=utf-8",
        ".mjs": "text/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".avif": "image/avif",
        ".webp": "image/webp",
        ".png": "image/png",
        ".woff2": "font/woff2",
        ".md": "text/plain; charset=utf-8",
      };
      res
        .writeHead(200, {
          "content-type": types[extname(path)] || "text/plain",
          "cache-control": "no-cache",
        })
        .end(data);
    } catch {
      res.writeHead(404).end("Not found");
    }
  });
  server.listen(4519, "127.0.0.1");
  await new Promise((yes, no) => {
    server.once("listening", yes);
    server.once("error", no);
  });
  return server;
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await startServer();
