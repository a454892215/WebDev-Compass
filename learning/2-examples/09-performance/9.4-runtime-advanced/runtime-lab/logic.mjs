export function prefixHeights(heights) {
  const result = [0];
  for (const height of heights) {
    if (!Number.isFinite(height) || height < 24)
      throw new TypeError("Invalid height");
    result.push(result.at(-1) + height);
  }
  return result;
}
export function indexAt(prefix, offset) {
  let lo = 0,
    hi = prefix.length - 2;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (prefix[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
export function visibleRange(prefix, offset, height) {
  return {
    start: Math.max(0, indexAt(prefix, offset) - 2),
    end: Math.min(prefix.length - 1, indexAt(prefix, offset + height) + 3),
  };
}
export function preserveAnchor(oldPrefix, newPrefix, scroll) {
  const index = indexAt(oldPrefix, scroll);
  return newPrefix[index] + scroll - oldPrefix[index];
}
export function queueIdle(
  callback,
  { forceFallback = false, timeout = 1000 } = {},
) {
  if (!forceFallback && typeof globalThis.requestIdleCallback === "function") {
    const id = globalThis.requestIdleCallback(callback, { timeout });
    return () => globalThis.cancelIdleCallback(id);
  }
  const id = setTimeout(
    () => callback({ didTimeout: true, timeRemaining: () => 0 }),
    Math.min(timeout, 20),
  );
  return () => clearTimeout(id);
}
export async function yieldMain() {
  if (typeof globalThis.scheduler?.yield === "function")
    return globalThis.scheduler.yield();
  return new Promise((r) => setTimeout(r, 0));
}
