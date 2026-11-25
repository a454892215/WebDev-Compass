import "./style.css";
import { onCLS, onINP, onLCP } from "web-vitals/attribution";
import { createBuffer } from "./telemetry.mjs";
const buffer = createBuffer(),
  raw = { longtask: [], navigation: [], resource: [], measure: [] };
function render() {
  document.querySelector("#metrics").textContent = JSON.stringify(
    buffer.snapshot(),
    null,
    2,
  );
}
function report(metric) {
  buffer.add(metric);
  render();
}
onCLS(report, { reportAllChanges: true });
onINP(report, { reportAllChanges: true });
onLCP(report, { reportAllChanges: true });
const observers = [];
for (const type of ["longtask", "navigation", "resource", "measure"])
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        raw[type].push({
          entryType: entry.entryType,
          duration: entry.duration,
          startTime: entry.startTime,
        });
        if (raw[type].length > 30) raw[type].shift();
      }
    });
    observer.observe({ type, buffered: true });
    observers.push(observer);
  }
document.querySelector("#block").addEventListener("click", () => {
  const start = performance.now();
  while (performance.now() - start < 90) {
    /* controlled local diagnostic fixture */
  }
  document.querySelector("#status").textContent =
    "90ms合成阻塞完成，不代表真实INP阈值判断";
});
document.querySelector("#shift").addEventListener("click", () => {
  setTimeout(() => {
    const space = document.createElement("div");
    space.style.height = "90px";
    space.textContent = "故意注入位移";
    document.querySelector("#shift-target").prepend(space);
    document.querySelector("#status").textContent = "位移样本已插入";
  }, 650);
});
document.querySelector("#measure").addEventListener("click", async () => {
  performance.clearMarks("business-start");
  performance.clearMarks("business-end");
  performance.clearMeasures("business-interaction");
  performance.mark("business-start");
  await new Promise((r) => setTimeout(r, 20));
  document.querySelector("#status").textContent = "业务结果已写DOM";
  performance.mark("business-end");
  performance.measure("business-interaction", "business-start", "business-end");
});
document.querySelector("#send").addEventListener("click", async () => {
  const response = await fetch("/collect", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(buffer.snapshot()),
  });
  document.querySelector("#status").textContent = response.ok
    ? "本地最小快照已接收"
    : "接收失败，不能记为上报成功";
});
window.stage9Metrics = {
  buffer,
  raw,
  webVitalsRegistered: true,
  disconnect: () => observers.forEach((o) => o.disconnect()),
};
