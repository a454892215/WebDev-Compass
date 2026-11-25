import "./style.css";
import { labels } from "./labels.mjs";
const select = document.querySelector("#language");
const input = document.querySelector("#name");
const label = document.querySelector("#name-label");
const status = document.querySelector("#status");
const dialog = document.querySelector("#details");
const trigger = document.querySelector("#open");
select.addEventListener("change", () => {
  const copy = labels[select.value];
  document.documentElement.lang = copy.lang;
  document.documentElement.dir = copy.dir;
  label.textContent = copy.label;
  document.querySelector("#long").textContent = copy.description;
  document.querySelector("#save").textContent = copy.save;
});
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "样本已保存";
});
document.querySelector("#fault").addEventListener("click", () => {
  if (label.htmlFor) label.removeAttribute("for");
  else label.htmlFor = "name";
});
document
  .querySelector("#wide")
  .addEventListener("click", () =>
    document.querySelector(".card").classList.toggle("fixed"),
  );
trigger.addEventListener("click", () => dialog.showModal());
dialog.addEventListener("close", () => trigger.focus());
input.addEventListener("input", () => {
  status.textContent = "尚未保存";
});
