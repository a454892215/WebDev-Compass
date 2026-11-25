const names = new Set(["LCP", "INP", "CLS"]);
export function safeMetric(metric) {
  if (
    !metric ||
    !names.has(metric.name) ||
    typeof metric.id !== "string" ||
    !/^[-a-zA-Z0-9]{1,100}$/.test(metric.id) ||
    !Number.isFinite(metric.value) ||
    metric.value < 0
  )
    return null;
  const a = metric.attribution || {},
    parts = {};
  for (const key of [
    "inputDelay",
    "processingDuration",
    "presentationDelay",
    "timeToFirstByte",
    "resourceLoadDelay",
    "resourceLoadDuration",
    "elementRenderDelay",
  ])
    if (Number.isFinite(a[key]) && a[key] >= 0) parts[key] = a[key];
  return {
    name: metric.name,
    id: metric.id,
    value: metric.value,
    route: "/metrics-lab",
    build: "teaching-v1",
    parts,
  };
}
export function createBuffer({ sampled = true, limit = 12 } = {}) {
  const latest = new Map();
  return {
    add(metric) {
      if (!sampled) return false;
      const safe = safeMetric(metric);
      if (!safe) return false;
      const key = safe.name + ":" + safe.id;
      if (!latest.has(key) && latest.size >= limit) return false;
      const old = latest.get(key);
      if (old?.value === safe.value) return false;
      latest.set(key, safe);
      return true;
    },
    snapshot() {
      return [...latest.values()].map((row) => ({
        ...row,
        parts: { ...row.parts },
      }));
    },
  };
}
export function percentile75(values) {
  if (
    !Array.isArray(values) ||
    !values.length ||
    values.some((v) => !Number.isFinite(v) || v < 0)
  )
    throw new TypeError("Need nonempty finite sample");
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil(0.75 * sorted.length) - 1];
}
