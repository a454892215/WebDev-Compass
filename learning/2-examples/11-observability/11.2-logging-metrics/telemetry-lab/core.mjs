import { createHmac } from "node:crypto";

const levels = new Set(["info", "warn", "error"]);
const routes = new Set(["catalog", "checkout"]);
const outcomes = new Set(["ok", "error"]);
export function safeLog(input, secret) {
  if (
    !levels.has(input.level) ||
    !routes.has(input.route) ||
    !outcomes.has(input.outcome)
  )
    throw new TypeError("enum");
  if (!/^[a-f0-9]{32}$/.test(input.traceId) || /^0+$/.test(input.traceId))
    throw new TypeError("traceId");
  const row = {
    level: input.level,
    traceId: input.traceId,
    route: input.route,
    outcome: input.outcome,
  };
  if (typeof input.userId === "string" && input.userId.length <= 100) {
    row.subject = createHmac("sha256", secret)
      .update(input.userId)
      .digest("hex")
      .slice(0, 16);
  }
  return row;
}
export function createHistogram(bounds = [100, 300, 1000]) {
  let count = 0,
    sum = 0;
  const buckets = bounds.map(() => 0);
  return {
    observe(ms) {
      if (!Number.isFinite(ms) || ms < 0 || ms > 60000)
        throw new TypeError("milliseconds");
      count++;
      sum += ms;
      bounds.forEach((bound, i) => {
        if (ms <= bound) buckets[i]++;
      });
    },
    snapshot() {
      return {
        unit: "ms",
        count,
        sum,
        buckets: bounds.map((le, i) => ({ le, count: buckets[i] })),
        infinity: count,
      };
    },
  };
}
export function percentile(values, p = 0.75) {
  if (!values.length) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.ceil(p * sorted.length) - 1];
}
export function evaluateSlo({ good, total, slo = 0.999, minimum = 100 }) {
  if (
    !Number.isInteger(total) ||
    !Number.isInteger(good) ||
    total < 0 ||
    good < 0 ||
    good > total ||
    !(slo > 0 && slo < 1)
  )
    throw new TypeError("SLO input");
  if (total < minimum) return { state: "insufficient-data", total };
  const badRate = (total - good) / total;
  return { state: "measured", total, badRate, burnRate: badRate / (1 - slo) };
}
export function alertPair(long, short, threshold = 14.4) {
  if (long.state !== "measured" || short.state !== "measured")
    return "insufficient-data";
  return long.burnRate > threshold && short.burnRate > threshold
    ? "page"
    : "quiet";
}
export function replayDecision({ consent, page, vendorReady, sensitive }) {
  return (
    consent === true &&
    page === "catalog" &&
    vendorReady === true &&
    sensitive === false
  );
}
