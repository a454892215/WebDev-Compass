import { info } from "virtual:build-info";
import "./style.css";
const text = document.querySelector<HTMLParagraphElement>("#label")!;
text.textContent = "公开构建：" + info.label;
let count: number = 0;
const button = document.querySelector<HTMLButtonElement>("#counter")!;
button.addEventListener("click", () => {
  count++;
  button.textContent = "计数：" + count;
});
