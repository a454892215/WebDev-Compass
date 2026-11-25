export function decodeSummary(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("summary object required");
  const { id, title, remaining } = value;
  if (
    typeof id !== "string" ||
    !id ||
    typeof title !== "string" ||
    !title ||
    !Number.isInteger(remaining) ||
    remaining < 0
  )
    throw new Error("summary contract rejected");
  return { id, title, remaining };
}
export function canReserve(remaining) {
  return Number.isInteger(remaining) && remaining > 0;
}
export function safeRetry(error) {
  return error?.name === "TimeoutError";
}
