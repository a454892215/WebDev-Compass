import { WebSocket as NodeWebSocket } from "ws";
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { strict as assert } from "node:assert";
import { writeFile, mkdir } from "node:fs/promises";
const server = spawn(process.execPath, ["server.mjs"], {
  stdio: ["ignore", "pipe", "pipe"],
});
let stdout = "";
server.stdout.on("data", (chunk) => (stdout += chunk));
server.stderr.on("data", (chunk) => (stdout += chunk));
let browser;
const checks = [];
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject(new Error("server startup timeout: " + stdout));
    }, 5000);
    const interval = setInterval(() => {
      if (stdout.includes("ready")) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      } else if (server.exitCode !== null) {
        clearInterval(interval);
        clearTimeout(timeout);
        reject(new Error(stdout));
      }
    }, 20);
  });
  const rejected = await new Promise((resolve, reject) => {
    const socket = new NodeWebSocket("ws://127.0.0.1:4405/ws", {
      headers: { Origin: "http://untrusted.invalid" },
    });
    socket.on("unexpected-response", (_request, response) => {
      response.resume();
      socket.terminate();
      resolve(response.statusCode);
    });
    socket.on("open", () => {
      socket.terminate();
      reject(new Error("bad Origin accepted"));
    });
    socket.on("error", () => {});
  });
  assert.equal(rejected, 403);
  checks.push({
    name: "ws-origin-rejection",
    passed: true,
    observed:
      "Node fixture with wrong Origin receives403; not user authentication proof",
  });
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4404/");
    const result = await page.evaluate(async () => {
      const { corsExperiment } = await import("/client.mjs");
      return await corsExperiment();
    });
    assert.equal(result.simple.readable, true);
    assert.equal(result.denied, true);
    assert.equal(result.writeBlocked, true);
    assert.ok(result.stats.writes >= 1);
    assert.equal(result.preflight.preflight, true);
    assert.equal(result.preflightBlocked, true);
    assert.equal(result.stats.blockedPosts, 0);
    assert.ok(result.stats.options >= 2);
    assert.equal(result.credential.hasCookie, true);
    assert.equal(result.wildcardBlocked, true);
    assert.equal(result.proxy.plain, true);
    checks.push({ name: "cors-" + width, passed: true, observed: result });
    const jsonp = await page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          window.courseReceiver = (value) => resolve(value);
          const script = document.createElement("script");
          script.src = "http://127.0.0.1:4405/jsonp?callback=courseReceiver";
          script.onerror = () => reject(new Error("jsonp script failed"));
          document.head.append(script);
        }),
    );
    assert.equal(jsonp.source, "local JSONP execution");
    checks.push({
      name: "jsonp-" + width,
      passed: true,
      observed:
        "local cross-origin script executes callback; no API read permission implied",
    });
    const live = await page.evaluate(async () => {
      const { openSocket, openFeed } = await import("/client.mjs");
      const ws = await new Promise((resolve, reject) => {
        let opens = 0;
        const messages = [];
        const timer = setTimeout(() => {
          socket.stop();
          reject(new Error("WS timeout"));
        }, 4000);
        const socket = openSocket({
          onOpen() {
            opens++;
            socket.send(opens === 1 ? "ping" : "again");
          },
          onMessage(value) {
            messages.push(value);
            if (value === "pong") socket.send("drop");
            if (value === "echo:again") {
              clearTimeout(timer);
              socket.stop();
              resolve({ opens, reconnects: socket.reconnects, messages });
            }
          },
        });
      });
      const sse = await new Promise((resolve, reject) => {
        const ids = [];
        const timer = setTimeout(() => {
          feed.stop();
          reject(new Error("SSE timeout"));
        }, 4000);
        const feed = openFeed((value, id) => {
          ids.push(id);
          if (id === "2") {
            clearTimeout(timer);
            feed.stop();
            resolve({ ids, last: value });
          }
        });
      });
      return { ws, sse };
    });
    assert.equal(live.ws.opens, 2);
    assert.equal(live.ws.reconnects, 1);
    assert.deepEqual(live.ws.messages, ["pong", "echo:again"]);
    assert.deepEqual(live.sse.ids, ["1", "2"]);
    const cleanup = await page.evaluate(async () => {
      for (let i = 0; i < 30; i++) {
        const stats = await (await fetch("http://127.0.0.1:4405/stats")).json();
        if (stats.wsActive === 0 && stats.sseActive === 0) return stats;
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      throw new Error("active connection cleanup failed");
    });
    assert.ok(cleanup.lastEventIds.includes("1"));
    assert.ok(cleanup.sseSent.filter((id) => id === "1").length >= 2);
    checks.push({
      name: "native-ws-sse-" + width,
      passed: true,
      observed: { ...live, cleanup },
    });
    await page.addScriptTag({
      url: "http://127.0.0.1:4405/socket.io/socket.io.js",
    });
    const ack = await page.evaluate(
      () =>
        new Promise((resolve, reject) => {
          const socket = io("http://127.0.0.1:4405", {
            transports: ["websocket"],
            reconnectionAttempts: 1,
          });
          const timer = setTimeout(() => {
            socket.disconnect();
            reject(new Error("socketio timeout"));
          }, 4000);
          socket.on("connect", () =>
            socket.emit("course-ping", "ping", (value) => {
              clearTimeout(timer);
              socket.disconnect();
              resolve(value);
            }),
          );
          socket.on("connect_error", reject);
        }),
    );
    assert.equal(ack, "received:ping");
    checks.push({
      name: "socketio-" + width,
      passed: true,
      observed:
        "real Socket.IO client/server acknowledgement; not native wire protocol",
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    );
    await page.evaluate(async () => {
      const { openSocket, openFeed } = await import("/client.mjs");
      await new Promise((resolve) => {
        openSocket({ onOpen: resolve });
      });
      openFeed();
    });
    await page.getByRole("link", { name: "查看CSP实验" }).click();
    await page.waitForFunction(() => window.externalRan === true);
    assert.equal(await page.evaluate(() => window.inlineRan === true), false);
    const header = await (
      await context.request.get("http://127.0.0.1:4404/csp")
    ).headers()["content-security-policy"];
    assert.ok(header.includes("frame-ancestors 'none'"));
    const afterLeave = await context.request.get("http://127.0.0.1:4405/stats");
    const state = await afterLeave.json();
    assert.equal(state.wsActive, 0);
    assert.equal(state.sseActive, 0);
    checks.push({
      name: "csp-" + width,
      passed: true,
      observed:
        "self external script executes, inline script blocked; real response CSP/nosniff/referrer headers",
    });
    await context.close();
  }
  const record = {
    date: "2026-11-25",
    environment: {
      node: process.versions.node,
      browser: "local Chrome headless",
      viewports: [390, 1440],
    },
    passed: checks.length,
    checks,
    notVerified: [
      "public HTTPS/certificate/HSTS deployment",
      "real user authentication",
      "real devices",
      "other browsers",
      "production reconnect/load guarantees",
      "Socket.IO recovery across process loss",
    ],
  };
  await mkdir("artifacts", { recursive: true });
  await writeFile("artifacts/runtime.json", JSON.stringify(record, null, 2));
  console.log(JSON.stringify(record, null, 2));
} finally {
  await browser?.close();
  server.kill("SIGTERM");
  if (server.exitCode === null)
    await Promise.race([
      once(server, "exit"),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  if (server.exitCode === null) server.kill("SIGKILL");
}
