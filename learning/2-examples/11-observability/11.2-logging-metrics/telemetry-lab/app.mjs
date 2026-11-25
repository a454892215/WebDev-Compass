let enabled = false,
  epoch = 0,
  busy = false;
const state = document.querySelector("#state"),
  output = document.querySelector("#output"),
  work = document.querySelector("#work");
document.querySelector("#enable").addEventListener("click", () => {
  enabled = true;
  epoch++;
  state.textContent = "可选采集开启（无录屏）";
});
document.querySelector("#disable").addEventListener("click", () => {
  enabled = false;
  epoch++;
  state.textContent = "可选采集关闭";
});
work.addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  work.disabled = true;
  const version = epoch,
    allowed = enabled,
    started = performance.now();
  try {
    const traceId = crypto.randomUUID().replaceAll("-", ""),
      spanId = crypto.randomUUID().replaceAll("-", "").slice(0, 16);
    const response = await fetch("./work", {
      headers: { traceparent: "00-" + traceId + "-" + spanId + "-01" },
    });
    if (!response.ok) throw new Error("work unavailable");
    const value = await response.json();
    if (allowed && enabled && epoch === version) {
      const result = await fetch("./telemetry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "duration",
          value: performance.now() - started,
        }),
      });
      if (!result.ok) throw new Error("telemetry rejected");
    }
    output.textContent = JSON.stringify(value, null, 2);
  } catch {
    output.textContent =
      "请求失败；教学错误码 WORK_FAILED，不收集输入或原始URL";
  } finally {
    busy = false;
    work.disabled = false;
  }
});
document.querySelector("#stats").addEventListener("click", async () => {
  try {
    const response = await fetch("./stats");
    if (!response.ok) throw Error();
    output.textContent = JSON.stringify(await response.json(), null, 2);
  } catch {
    output.textContent = "快照不可用";
  }
});
