const output = document.querySelector("#result");
const button = document.querySelector("#read-meta");
button.addEventListener("click", () => {
  const description = document.querySelector(
    'meta[name="description"]',
  ).content;
  output.textContent = `标题：${document.title}；编码：${document.characterSet}；描述：${description}；脚本读取 DOM 成功。`;
});
