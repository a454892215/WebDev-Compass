import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { Server as SocketServer } from "socket.io";
const appOrigin = "http://127.0.0.1:4404";
const apiOrigin = "http://127.0.0.1:4405";
const state = {
  writes: 0,
  options: 0,
  preflightPosts: 0,
  blockedPosts: 0,
  wsOpened: 0,
  wsActive: 0,
  sseActive: 0,
  lastEventIds: [],
  sseSent: [],
};
const sockets = new Set();
function cors(req, res) {
  if (req.headers.origin !== appOrigin) return false;
  res.setHeader("Access-Control-Allow-Origin", appOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return true;
}
function json(res, data, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(data));
}
const app = createServer(async (req, res) => {
  const url = new URL(req.url, appOrigin);
  if (url.pathname === "/proxy") {
    const response = await fetch(`${apiOrigin}/plain`);
    return json(res, await response.json());
  }
  if (url.pathname === "/csp" || url.pathname === "/csp.html") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    return res.end(
      await readFile(new URL("./public/csp.html", import.meta.url)),
    );
  }
  const files = {
    "/": "index.html",
    "/client.mjs": "client.mjs",
    "/style.css": "style.css",
    "/allowed.js": "allowed.js",
  };
  if (!(url.pathname in files)) return json(res, { error: "not found" }, 404);
  const content = await readFile(
    fileURLToPath(new URL("./public/" + files[url.pathname], import.meta.url)),
  );
  res.writeHead(200, {
    "Content-Type":
      url.pathname.endsWith(".mjs") || url.pathname.endsWith(".js")
        ? "text/javascript"
        : url.pathname.endsWith(".css")
          ? "text/css"
          : "text/html; charset=utf-8",
  });
  res.end(content);
});
const api = createServer(async (req, res) => {
  const url = new URL(req.url, apiOrigin);
  if (req.method === "OPTIONS") {
    state.options++;
    if (url.pathname === "/preflight" && cors(req, res)) {
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Course");
      res.setHeader("Access-Control-Max-Age", "0");
    }
    res.writeHead(204);
    return res.end();
  }
  if (url.pathname === "/plain") return json(res, { plain: true });
  if (url.pathname === "/write" && req.method === "POST") {
    state.writes++;
    req.resume();
    return json(res, { written: true });
  }
  if (url.pathname === "/blocked-preflight" && req.method === "POST") {
    state.blockedPosts++;
    return json(res, { unexpected: true });
  }
  if (url.pathname === "/wildcard") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return json(res, { badPolicy: true });
  }
  if (url.pathname === "/jsonp") {
    if (url.searchParams.get("callback") !== "courseReceiver")
      return json(res, { error: "invalid callback" }, 400);
    res.writeHead(200, {
      "Content-Type": "text/javascript",
      "X-Content-Type-Options": "nosniff",
    });
    return res.end('courseReceiver({source:"local JSONP execution"})');
  }
  if (url.pathname === "/sse") {
    if (!cors(req, res)) return json(res, { error: "origin rejected" }, 403);
    const previous = req.headers["last-event-id"] || "";
    state.lastEventIds.push(previous);
    state.sseActive++;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.flushHeaders();
    res.write(": keep-alive comment\nretry: 30\n\n");
    let timer;
    const id = previous === "1" ? "2" : "1";
    timer = setTimeout(() => {
      const frame = `id: ${id}\nevent: message\ndata: ${JSON.stringify({ id: Number(id), text: "update-" + id })}\n\n`;
      res.write(frame);
      state.sseSent.push(id);
      if (id === "1") {
        res.write(frame);
        state.sseSent.push(id);
        res.end();
      }
    }, 20);
    res.on("close", () => {
      clearTimeout(timer);
      state.sseActive--;
    });
    return;
  }
  cors(req, res);
  if (url.pathname === "/simple") return json(res, { readable: true });
  if (url.pathname === "/seed") {
    res.setHeader(
      "Set-Cookie",
      "course_cookie=fixture; HttpOnly; SameSite=Lax; Path=/",
    );
    return json(res, { seeded: true });
  }
  if (url.pathname === "/cookie")
    return json(res, {
      hasCookie: (req.headers.cookie || "").includes("course_cookie=fixture"),
    });
  if (url.pathname === "/stats") return json(res, { ...state });
  if (url.pathname === "/preflight" && req.method === "POST") {
    state.preflightPosts++;
    req.resume();
    return json(res, { preflight: true });
  }
  return json(res, { error: "not found" }, 404);
});
const wsServer = new WebSocketServer({ noServer: true });
api.on("upgrade", (req, socket, head) => {
  if (new URL(req.url, apiOrigin).pathname !== "/ws") return;
  if (req.headers.origin !== appOrigin) {
    socket.end("HTTP/1.1 403 Forbidden\r\n\r\n");
    return;
  }
  wsServer.handleUpgrade(req, socket, head, (ws) =>
    wsServer.emit("connection", ws, req),
  );
});
wsServer.on("connection", (ws) => {
  state.wsOpened++;
  state.wsActive++;
  ws.on("message", (data) => {
    const value = data.toString();
    if (value === "drop") ws.close(1012, "teaching reconnect");
    else ws.send(value === "ping" ? "pong" : "echo:" + value);
  });
  ws.on("close", () => state.wsActive--);
});
const io = new SocketServer(api, {
  cors: { origin: appOrigin, credentials: true },
  allowRequest: (req, callback) =>
    callback(null, req.headers.origin === appOrigin),
});
io.on("connection", (socket) =>
  socket.on("course-ping", (value, ack) => ack("received:" + value)),
);
for (const server of [app, api])
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
await Promise.all(
  [
    [app, 4404],
    [api, 4405],
  ].map(
    ([server, port]) =>
      new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen(port, "127.0.0.1", resolve);
      }),
  ),
);
console.log("Network lab ready on " + appOrigin + " / " + apiOrigin);
async function close() {
  for (const client of wsServer.clients) client.terminate();
  io.close();
  for (const socket of sockets) socket.destroy();
  await Promise.all(
    [app, api].map((server) => new Promise((resolve) => server.close(resolve))),
  );
}
process.on("SIGTERM", () => void close().then(() => process.exit(0)));
process.on("SIGINT", () => void close().then(() => process.exit(0)));
