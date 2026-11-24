import { scenarios } from "./scenarios.mjs";
const id = document.body.dataset.lesson,
  button = document.querySelector("#run"),
  lab = document.querySelector("#lab"),
  output = document.querySelector("#output");
let controller;
const format = (value) => {
  if (typeof value === "string") return value;
  if (typeof value === "bigint") return value.toString() + "n";
  if (typeof value === "undefined") return "undefined";
  if (typeof value === "symbol" || typeof value === "function")
    return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};
button.addEventListener("click", async () => {
  controller?.abort();
  controller = new AbortController();
  const signal = controller.signal;
  output.textContent = "";
  delete document.body.dataset.experimentError;
  button.disabled = true;
  const log = (...values) => {
    output.textContent += values.map(format).join(": ") + "\n";
  };
  try {
    await scenarios[id]({
      lab,
      log,
      signal,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    });
  } catch (error) {
    document.body.dataset.experimentError = "true";
    log("实验失败", error.name, error.message);
  } finally {
    button.disabled = false;
  }
});
window.addEventListener("pagehide", () => controller?.abort());
