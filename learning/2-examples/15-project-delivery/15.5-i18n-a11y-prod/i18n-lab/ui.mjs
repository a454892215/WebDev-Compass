const heading = document.querySelector("#page-title");
const status = document.querySelector("#route-status");
const positions = new Map();
function render(route, announce) {
  const page = route === "details" ? "Details" : "Catalog";
  heading.textContent = page;
  document.title = page + " · Accessibility lab";
  document.querySelector("#route-content").textContent = page + " content";
  for (const link of document.querySelectorAll("[data-route]")) {
    if (link.dataset.route === route) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  status.textContent = announce ? page + " loaded" : "";
  heading.focus({ preventScroll: true });
}
for (const link of document.querySelectorAll("[data-route]"))
  link.addEventListener("click", (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    positions.set(location.pathname, scrollY);
    history.pushState({}, "", link.getAttribute("href"));
    render(link.dataset.route, true);
    scrollTo(0, 0);
  });
addEventListener("popstate", () => {
  render(location.pathname.slice(1), true);
  scrollTo(0, positions.get(location.pathname) ?? 0);
});
// Initial load keeps normal browser focus; SPA navigation applies focus deliberately.
if (location.pathname === "/details") {
  heading.textContent = "Details";
  document.title = "Details · Accessibility lab";
  document.querySelector("#route-content").textContent = "Details content";
  for (const link of document.querySelectorAll("[data-route]")) {
    if (link.dataset.route === "details")
      link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}
const direction = document.querySelector("#direction");
direction.addEventListener("click", () => {
  const rtl = document.documentElement.dir !== "rtl";
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  // Layout direction changes only; the primary teaching text remains English.
  direction.textContent = rtl ? "Use LTR layout" : "Use RTL layout";
  document.querySelector("#mixed").lang = "ar";
});
const dialog = document.querySelector("#instructions");
document
  .querySelector("#open-dialog")
  .addEventListener("click", () => dialog.showModal());
const input = document.querySelector("#city"),
  list = document.querySelector("#cities");
const cities = ["Berlin", "Cairo", "Tokyo"];
let active = -1,
  filtered = [];
function close() {
  list.hidden = true;
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
  active = -1;
}
function show() {
  filtered = cities.filter((city) =>
    city.toLowerCase().includes(input.value.toLowerCase()),
  );
  active = -1;
  list.replaceChildren();
  for (const [index, city] of filtered.entries()) {
    const option = document.createElement("li");
    option.id = "city-" + index;
    option.role = "option";
    option.setAttribute("aria-selected", "false");
    option.textContent = city;
    option.addEventListener("mousedown", (e) => e.preventDefault());
    option.addEventListener("click", () => choose(index));
    list.append(option);
  }
  list.hidden = !filtered.length;
  input.setAttribute("aria-expanded", String(!!filtered.length));
  input.removeAttribute("aria-activedescendant");
}
function highlight(index) {
  active = index;
  for (const [i, option] of Array.from(list.children).entries())
    option.setAttribute("aria-selected", String(i === index));
  input.setAttribute("aria-activedescendant", "city-" + index);
}
function choose(index) {
  if (filtered[index]) input.value = filtered[index];
  close();
  input.focus();
}
input.addEventListener("input", show);
input.addEventListener("blur", close);
input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (list.hidden) show();
    if (filtered.length)
      highlight(
        (active +
          (event.key === "ArrowDown" ? 1 : filtered.length - 1) +
          filtered.length) %
          filtered.length,
      );
  } else if (event.key === "Escape") close();
  else if (event.key === "Enter" && active >= 0) {
    event.preventDefault();
    choose(active);
  }
});
