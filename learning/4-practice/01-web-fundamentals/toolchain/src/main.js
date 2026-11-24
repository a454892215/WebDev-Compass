import "./style.css";
import "./card.scss";
import a from "./CardA.module.css";
import b from "./CardB.module.css";
const first = document.querySelector("#module-a");
const second = document.querySelector("#module-b");
first.className = a.card;
second.className = b.card;
function inspect() {
  const sass = getComputedStyle(document.querySelector("#sass-card"));
  const grid = getComputedStyle(document.querySelector("#tailwind-grid"));
  const evidence = {
    moduleA: a.card,
    moduleB: b.card,
    distinctClasses: a.card !== b.card,
    moduleAColor: getComputedStyle(first).color,
    moduleBColor: getComputedStyle(second).color,
    sassPadding: sass.paddingTop,
    sassBorder: sass.borderTopColor,
    tailwindDisplay: grid.display,
    tailwindColumns: grid.gridTemplateColumns,
    tailwindGap: grid.gap,
  };
  document.querySelector("#result").textContent = JSON.stringify(
    evidence,
    null,
    2,
  );
  document.body.dataset.ready = "true";
}
document.querySelector("#inspect").addEventListener("click", inspect);
window.addEventListener("resize", inspect);
inspect();
