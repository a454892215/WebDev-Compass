import { debounce } from "./control.mjs";
import { sum } from "./math.js";
const $ = (selector) => document.querySelector(selector);
const observations = { longtasks: [], lcp: [], shifts: [], events: [] };
const observers = [];
for (const [type, key] of [
  ["longtask", "longtasks"],
  ["largest-contentful-paint", "lcp"],
  ["layout-shift", "shifts"],
  ["event", "events"],
]) {
  if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
  const observer = new PerformanceObserver((list) => {
    for (const e of list.getEntries())
      observations[key].push({
        name: e.name,
        startTime: e.startTime,
        duration: e.duration,
        value: e.value ?? null,
        hadRecentInput: e.hadRecentInput ?? null,
        interactionId: e.interactionId ?? null,
      });
  });
  observer.observe({
    type,
    buffered: true,
    ...(type === "event" ? { durationThreshold: 16 } : {}),
  });
  observers.push(observer);
}
$("#lazy").onclick = async () => {
  $("#lazy-result").textContent =
    (await import("./statistics.js")).summary() + ` / sum=${sum([1, 2, 3])}`;
};
$("#third").onclick = async () => {
  $("#third-result").textContent = (await import("./third-party.js")).loaded;
};
const busy = (duration) => {
  const start = performance.now();
  let value = 0;
  while (performance.now() - start < duration) value++;
  return value;
};
async function measure(name, run) {
  performance.clearMarks();
  performance.mark(`${name}:start`);
  await run();
  performance.mark(`${name}:end`);
  performance.measure(name, `${name}:start`, `${name}:end`);
  $("#work-result").textContent =
    `${name}完成；读取Performance API观察，不保证一次对照有统计意义。`;
}
$("#block").onclick = () => measure("blocking", () => busy(90));
$("#chunk").onclick = () =>
  measure("chunked", async () => {
    for (let i = 0; i < 6; i++) {
      busy(15);
      if (globalThis.scheduler?.yield) await scheduler.yield();
      else await new Promise((resolve) => setTimeout(resolve, 0));
    }
  });
let worker;
$("#worker").onclick = () => {
  worker?.terminate();
  worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
  worker.onmessage = (e) => {
    $("#work-result").textContent = `worker结果：${e.data}`;
    worker.terminate();
    worker = undefined;
  };
  worker.postMessage(2000000);
};
let count = 0;
$("#counter").onclick = () => {
  $("#counter-result").textContent = String(++count);
};
function layout(mode) {
  const elements = [...$("#layout-box").children];
  const start = performance.now();
  for (let round = 0; round < 80; round++) {
    if (mode === "thrash") {
      for (const el of elements) {
        const width = $("#layout-box").offsetWidth;
        el.style.width = `${width - 8}px`;
      }
    } else {
      const width = $("#layout-box").offsetWidth;
      for (const el of elements) el.style.width = `${width - 8}px`;
    }
  }
  performance.measure(mode, { start, end: performance.now() });
  $("#layout-result").textContent =
    `${mode}观测已记录，结果宽度${elements[0].offsetWidth}`;
}
$("#thrash").onclick = () => layout("thrash");
$("#batch").onclick = () => layout("batch");
const viewport = $("#viewport"),
  rows = $("#rows");
let full = false;
function renderRows() {
  const start = full ? 0 : Math.max(0, Math.floor(viewport.scrollTop / 36) - 2),
    end = full ? 1000 : Math.min(1000, start + 12);
  rows.style.transform = full ? "none" : `translateY(${start * 36}px)`;
  rows.replaceChildren(
    ...Array.from({ length: end - start }, (_, i) => {
      const li = document.createElement("li");
      li.textContent = `项目 ${start + i}`;
      return li;
    }),
  );
  $("#render-count").textContent = `DOM中${end - start}/1000项`;
}
viewport.addEventListener(
  "scroll",
  () => {
    if (!full) renderRows();
  },
  { passive: true },
);
$("#full").onclick = () => {
  full = !full;
  viewport.dataset.full = String(full);
  renderRows();
};
renderRows();
$("#snapshot").onclick = () => {
  $("#metrics").textContent = JSON.stringify(
    {
      supported: PerformanceObserver.supportedEntryTypes,
      measures: performance
        .getEntriesByType("measure")
        .map((e) => ({ name: e.name, duration: e.duration })),
      resources: performance
        .getEntriesByType("resource")
        .map((e) => ({
          name: new URL(e.name).pathname,
          duration: e.duration,
          transferSize: e.transferSize,
        })),
      observations,
    },
    null,
    2,
  );
};
const search = debounce((value) => {
  $("#query-result").textContent = `查询：${value}`;
}, 100);
$("#query").addEventListener("input", (event) => search(event.target.value));
window.addEventListener("pagehide", () => {
  search.cancel();
  worker?.terminate();
  observers.forEach((o) => o.disconnect());
});
window.__stage6 = { observations };
