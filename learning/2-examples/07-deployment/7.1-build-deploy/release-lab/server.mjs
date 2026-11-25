import { createServer } from "node:http";
import { createHash } from "node:crypto";

// Synthetic immutable bundles stand in for actual Vite/Nuxt output.
export function createReleaseLab() {
  const releases = new Map();
  const assets = new Map();
  const records = [];
  let current;
  function stage(id, { healthy = true } = {}) {
    if (!/^[A-Za-z0-9-]{1,30}$/.test(id) || releases.has(id))
      throw new Error("Invalid/duplicate release");
    const body =
      `document.body.dataset.release=${JSON.stringify(id)};\n` +
      "// fixture padding\n".repeat(200);
    const name = `/assets/app.${createHash("sha256").update(body).digest("hex").slice(0, 12)}.js`;
    assets.set(name, body);
    releases.set(id, { id, healthy, asset: name });
    return releases.get(id);
  }
  function activate(id) {
    const candidate = releases.get(id);
    if (!candidate?.healthy || !assets.has(candidate.asset))
      throw new Error("Candidate gate rejected");
    current = candidate;
  }
  function setReadiness(healthy) {
    if (!current) throw new Error("No release");
    current.healthy = healthy;
  }
  const server = createServer((req, res) => {
    const started = performance.now();
    const path = new URL(req.url, "http://localhost").pathname;
    const requestRelease = current?.id ?? "none";
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "no-store");
    res.on("finish", () =>
      records.push({
        method: req.method,
        path,
        status: res.statusCode,
        release: requestRelease,
        durationMs: Math.round((performance.now() - started) * 100) / 100,
      }),
    );
    if (req.method !== "GET") {
      res.writeHead(405, { Allow: "GET" });
      res.end();
      return;
    }
    if (assets.has(path)) {
      res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      res.end(assets.get(path));
      return;
    }
    if (path === "/health") {
      res.writeHead(current?.healthy ? 200 : 503, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          ready: !!current?.healthy,
          release: current?.id ?? null,
        }),
      );
      return;
    }
    if (path === "/api/status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ release: current?.id ?? null }));
      return;
    }
    if ((path === "/" || path === "/courses/nuxt") && current) {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      res.end(
        `<!doctype html><html lang="en"><meta charset="utf-8"><title>Release ${current.id}</title><h1>Release ${current.id}</h1><script type="module" src="${current.asset}"></script></html>`,
      );
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });
  return { server, stage, activate, setReadiness, records };
}
