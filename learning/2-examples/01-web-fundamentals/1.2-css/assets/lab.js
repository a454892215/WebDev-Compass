const toggle = document.querySelector("#toggle");
const output = document.querySelector("#result");
const target = document.querySelector("#target");
const properties = JSON.parse(document.body.dataset.properties);
function inspect() {
  const computed = getComputedStyle(target);
  const values = {
    active: document.body.dataset.active,
    ...Object.fromEntries(properties.map((key) => [key, computed[key]])),
    width: Math.round(target.getBoundingClientRect().width * 100) / 100,
    height: Math.round(target.getBoundingClientRect().height * 100) / 100,
  };
  output.textContent = JSON.stringify(values, null, 2);
}
toggle.addEventListener("click", () => {
  const active = document.body.dataset.active !== "true";
  document.body.dataset.active = String(active);
  toggle.setAttribute("aria-pressed", String(active));
  if (window.applyLessonState) window.applyLessonState(active);
  requestAnimationFrame(inspect);
  setTimeout(inspect, 220);
});
document.querySelector("#inspect").addEventListener("click", inspect);
window.addEventListener("resize", inspect);
if (document.querySelector("#click-count")) {
  let n = 0;
  target.addEventListener("click", () => {
    document.querySelector("#click-count").textContent = `触发次数：${++n}`;
  });
}
inspect();
