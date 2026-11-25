export function safeLog(input) {
  const allowedRoutes = new Set(["/", "/optional-event", "/isolation"]);
  const path = new URL(input.url, "http://localhost").pathname;
  return {
    route: allowedRoutes.has(path) ? path : "other",
    status: Number.isInteger(input.status) ? input.status : 0,
    kind: input.kind === "opened" ? "opened" : "request",
  };
}
export function eventBody(value) {
  if (
    !value ||
    Object.getPrototypeOf(value) !== Object.prototype ||
    Object.keys(value).length !== 1 ||
    value.kind !== "opened"
  )
    throw new TypeError("Unexpected event");
  return { kind: "opened" };
}
