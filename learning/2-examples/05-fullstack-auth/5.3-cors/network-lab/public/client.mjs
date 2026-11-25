const api = "http://127.0.0.1:4405";
const result = document.querySelector("#result");
const controllers = new Set();
function show(value) {
  result.textContent = JSON.stringify(value, null, 2);
}
export async function corsExperiment() {
  const blocked = async (path, options) => {
    try {
      await fetch(api + path, options);
      return false;
    } catch {
      return true;
    }
  };
  const simple = await (await fetch(api + "/simple")).json();
  const denied = await blocked("/plain");
  const writeBlocked = await blocked("/write", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "local fixture",
  });
  const preflight = await (
    await fetch(api + "/preflight", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Course": "yes" },
      body: "{}",
    })
  ).json();
  const preflightBlocked = await blocked("/blocked-preflight", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Course": "yes" },
    body: "{}",
  });
  await fetch(api + "/seed", { credentials: "include" });
  const credential = await (
    await fetch(api + "/cookie", { credentials: "include" })
  ).json();
  const wildcardBlocked = await blocked("/wildcard", {
    credentials: "include",
  });
  const proxy = await (await fetch("/proxy")).json();
  const stats = await (await fetch(api + "/stats")).json();
  return {
    simple,
    denied,
    writeBlocked,
    preflight,
    preflightBlocked,
    credential,
    wildcardBlocked,
    proxy,
    stats,
  };
}
export function openSocket({
  onMessage = () => {},
  onOpen = () => {},
  maxReconnects = 2,
} = {}) {
  let socket,
    timer,
    stopped = false,
    reconnects = 0;
  function connect() {
    if (stopped) return;
    socket = new WebSocket("ws://127.0.0.1:4405/ws");
    socket.onopen = () => onOpen();
    socket.onmessage = (event) => onMessage(event.data);
    socket.onclose = () => {
      if (!stopped && reconnects < maxReconnects) {
        const delay = 10 * 2 ** reconnects++;
        timer = setTimeout(connect, delay);
      }
    };
  }
  const controller = {
    send(value) {
      if (socket?.readyState === WebSocket.OPEN) socket.send(value);
    },
    stop() {
      stopped = true;
      clearTimeout(timer);
      socket?.close(1000, "explicit cleanup");
      controllers.delete(controller);
    },
    get reconnects() {
      return reconnects;
    },
  };
  controllers.add(controller);
  connect();
  return controller;
}
export function openFeed(onMessage = () => {}) {
  const source = new EventSource(api + "/sse", { withCredentials: true });
  let errors = 0;
  const seen = new Set();
  const controller = {
    stop() {
      source.close();
      controllers.delete(controller);
    },
  };
  source.onmessage = (event) => {
    if (seen.has(event.lastEventId)) return;
    seen.add(event.lastEventId);
    onMessage(JSON.parse(event.data), event.lastEventId);
  };
  source.onerror = () => {
    if (++errors >= 3) controller.stop();
  };
  controllers.add(controller);
  return controller;
}
window.addEventListener("pagehide", () => {
  for (const controller of [...controllers]) controller.stop();
});
document.querySelector("#cors").addEventListener(
  "click",
  () =>
    void corsExperiment()
      .then(show)
      .catch((error) => show({ error: error.message })),
);
document.querySelector("#live").addEventListener("click", () => {
  for (const controller of [...controllers]) controller.stop();
  const messages = [];
  const socket = openSocket({
    onOpen() {
      socket.send("ping");
    },
    onMessage(value) {
      messages.push(value);
      show(messages);
    },
  });
  openFeed((value) => {
    messages.push(value);
    show(messages);
  });
});
document.querySelector("#stop").addEventListener("click", () => {
  for (const controller of [...controllers]) controller.stop();
  show({ stopped: true });
});
