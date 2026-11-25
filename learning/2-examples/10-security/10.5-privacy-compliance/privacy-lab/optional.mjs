export function startOptional() {
  const controller = new AbortController();
  localStorage.setItem("stage10:optional-id", "synthetic-only");
  fetch("/optional-event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind: "opened" }),
    signal: controller.signal,
  }).catch(() => {});
  return () => {
    controller.abort();
    localStorage.removeItem("stage10:optional-id");
  };
}
