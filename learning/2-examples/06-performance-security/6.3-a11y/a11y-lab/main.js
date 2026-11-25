const form = document.querySelector("form"),
  input = document.querySelector("#title"),
  error = document.querySelector("#error"),
  result = document.querySelector("#result");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim().length < 2) {
    error.textContent = "课程名称至少两个字符。";
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", "hint error");
    input.focus();
    result.textContent = "";
    return;
  }
  input.removeAttribute("aria-invalid");
  input.setAttribute("aria-describedby", "hint");
  error.textContent = "";
  result.textContent = `已保存本页草稿：${input.value.trim()}`;
});
const dialog = document.querySelector("#help"),
  open = document.querySelector("#open");
open.addEventListener("click", () => {
  dialog.showModal();
  document.querySelector("#dialog-title").focus();
});
document
  .querySelector("#close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => open.focus());
