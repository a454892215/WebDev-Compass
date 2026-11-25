const state = document.querySelector("#state"),
  cookie = document.querySelector("#cookie");
function showCookie() {
  cookie.textContent = `document.cookie 可见：${document.cookie || "空（HttpOnly不可读）"}`;
}
document.querySelector("#create").addEventListener("click", async () => {
  const response = await fetch("/session", { method: "POST" });
  state.textContent = `创建状态 ${response.status}`;
  showCookie();
});
document.querySelector("#read").addEventListener("click", async () => {
  const response = await fetch("/api/note");
  state.textContent = `读取状态 ${response.status}`;
  showCookie();
});
document.querySelector("#logout").addEventListener("click", async () => {
  const response = await fetch("/logout", { method: "POST" });
  state.textContent = `撤销状态 ${response.status}`;
  showCookie();
});
showCookie();
