let assignment,
  epoch = 0,
  observer;
const $ = (id) => document.getElementById(id);
async function readStats() {
  $("stats").textContent = JSON.stringify(await (await fetch("/stats")).json());
}
async function event(kind, current = assignment) {
  const response = await fetch(
    "/event?subject=" + encodeURIComponent(current.subject),
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, variant: current.variant }),
    },
  );
  if (!response.ok) throw new Error("Event rejected " + response.status);
  return response.json();
}
$("assign").addEventListener("click", async () => {
  const requestEpoch = ++epoch;
  observer?.disconnect();
  $("card").hidden = true;
  $("convert").disabled = true;
  $("show").disabled = true;
  try {
    const result = await (
      await fetch(
        "/assignment?subject=" + encodeURIComponent($("subject").value),
      )
    ).json();
    if (requestEpoch !== epoch) return;
    assignment = result;
    $("assignment").textContent = JSON.stringify(result);
    $("show").disabled = false;
    $("status").textContent = "已分配，尚未曝光";
    await readStats();
  } catch {
    $("status").textContent = "读取失败，可重试";
  }
});
$("show").addEventListener("click", () => {
  const current = assignment,
    currentEpoch = epoch;
  $("variant").textContent = "实验版本 " + current.variant;
  $("card").hidden = false;
  observer?.disconnect();
  observer = new IntersectionObserver(
    async (entries) => {
      if (!entries.some((x) => x.isIntersecting && x.intersectionRatio >= 0.5))
        return;
      observer.disconnect();
      try {
        await event("exposure", current);
        if (currentEpoch !== epoch) return;
        $("convert").disabled = false;
        $("status").textContent = "已曝光（去重）";
        await readStats();
      } catch {
        if (currentEpoch === epoch)
          $("status").textContent = "曝光失败，请重新显示卡片";
      }
    },
    { threshold: [0.5] },
  );
  observer.observe($("card"));
});
$("convert").addEventListener("click", async () => {
  const current = assignment,
    currentEpoch = epoch;
  try {
    await event("conversion", current);
    if (currentEpoch !== epoch) return;
    $("status").textContent = "已记录合成转化（去重）";
    await readStats();
  } catch {
    if (currentEpoch === epoch) $("status").textContent = "转化失败，请先曝光";
  }
});
window.addEventListener("pagehide", () => observer?.disconnect());
