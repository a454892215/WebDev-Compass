import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { randomBytes } from "node:crypto";
const origin = "http://127.0.0.1:4503",
  other = "http://127.0.0.1:4504";
const sessions = new Map();
let changes = 0;
function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}
const protectedPage =
  '<!doctype html><html><head><title>Frame guard</title></head><body><h1>Protected frame</h1><script src="/frame.js"></script></body></html>';
export function start() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, origin);
      const sid = /compass_stage6_demo=([^;]+)/.exec(
        req.headers.cookie ?? "",
      )?.[1];
      const session = sessions.get(sid);
      if (url.pathname === "/api/session") {
        const id = randomBytes(16).toString("hex"),
          csrf = randomBytes(16).toString("hex");
        sessions.set(id, csrf);
        res.setHeader(
          "Set-Cookie",
          `compass_stage6_demo=${id}; HttpOnly; SameSite=Lax; Path=/`,
        );
        return json(res, 200, { csrf });
      }
      if (url.pathname === "/api/change") {
        if (req.method !== "POST") return json(res, 405, {});
        if (
          req.headers.origin !== origin ||
          !session ||
          req.headers["x-csrf-token"] !== session
        )
          return json(res, 403, { changed: false });
        changes++;
        return json(res, 200, { changed: true });
      }
      if (url.pathname === "/api/stats") return json(res, 200, { changes });
      if (url.pathname === "/cors-wrong" || url.pathname === "/cors-correct") {
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        if (url.pathname === "/cors-wrong")
          res.setHeader(
            "Access-Control-Allow-Origin",
            req.headers.origin ?? origin,
          );
        else res.setHeader("Access-Control-Allow-Origin", origin);
        return json(
          res,
          session ? 200 : 401,
          session ? { demoPrivate: "ONLY_LOCAL_FIXTURE" } : {},
        );
      }
      if (url.pathname === "/protected") {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Security-Policy": "frame-ancestors 'none'",
          "X-Frame-Options": "DENY",
        });
        return res.end(protectedPage);
      }
      if (url.pathname === "/allowed-frame") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(
          protectedPage.replace("Protected frame", "Allowed frame"),
        );
      }
      if (url.pathname === "/frame.js") {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        return res.end(
          "parent.postMessage(location.pathname,'http://127.0.0.1:4504')",
        );
      }
      let path = resolve(
        "dist",
        url.pathname === "/" ? "index.html" : url.pathname.slice(1),
      );
      if (!path.startsWith(resolve("dist") + "/")) return json(res, 403, {});
      const data = await readFile(path);
      const types = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".map": "application/json",
      };
      res.setHeader(
        "Content-Type",
        types[extname(path)] ?? "application/octet-stream",
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      if (url.pathname === "/security.html")
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'",
        );
      res.end(data);
    } catch (error) {
      if (error.code === "ENOENT") return json(res, 404, {});
      console.error(error);
      json(res, 500, {});
    }
  });
  const frameServer = createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<!doctype html><html><head><title>Local framing fixture</title></head><body><h1>Attacker fixture without real data</h1><output id="messages"></output><iframe title="blocked" src="${origin}/protected"></iframe><iframe title="allowed" src="${origin}/allowed-frame"></iframe><script>window.loaded=[];addEventListener('message',e=>{if(e.origin!=='${origin}')return;if(![...document.querySelectorAll('iframe')].some(f=>f.contentWindow===e.source))return;window.loaded.push(e.data);document.querySelector('#messages').textContent=window.loaded.join(',')})</script></body></html>`,
    );
  });
  return Promise.all([
    new Promise((r) => server.listen(4503, "127.0.0.1", r)),
    new Promise((r) => frameServer.listen(4504, "127.0.0.1", r)),
  ]).then(() => ({
    close: () =>
      Promise.all([
        new Promise((r) => server.close(r)),
        new Promise((r) => frameServer.close(r)),
      ]),
  }));
}
