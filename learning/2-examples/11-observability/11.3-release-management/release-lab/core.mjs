import { createHash } from "node:crypto";
export const subjects = ["fixture-001", "fixture-002", "fixture-003"];
export const baseline = Object.freeze({
  enabled: true,
  kill: false,
  percent: 25,
  group: "reader-v1",
  allow: [],
  regions: ["CN", "DE"],
});
export function bucket(subject, group) {
  if (
    typeof subject !== "string" ||
    !subject ||
    typeof group !== "string" ||
    !group
  )
    throw new TypeError("Stable subject/group required");
  return (
    createHash("sha256")
      .update(JSON.stringify([group, subject]))
      .digest()
      .readUInt32BE(0) % 10000
  );
}
export function evaluate(config, context) {
  // Config is server-owned. The fixture context is not an authorization identity.
  if (!config || config.kill === true || config.enabled !== true)
    return { enabled: false, reason: "off" };
  if (
    !Number.isInteger(config.percent) ||
    config.percent < 0 ||
    config.percent > 100 ||
    typeof config.group !== "string" ||
    !config.group ||
    !Array.isArray(config.allow) ||
    !config.allow.every((x) => typeof x === "string") ||
    !Array.isArray(config.regions) ||
    !config.regions.every((x) => typeof x === "string")
  )
    return { enabled: false, reason: "invalid" };
  if (
    !context ||
    !subjects.includes(context.subject) ||
    !config.regions.includes(context.region)
  )
    return { enabled: false, reason: "ineligible" };
  if (config.allow.includes(context.subject))
    return { enabled: true, reason: "allowlist" };
  return {
    enabled: bucket(context.subject, config.group) < config.percent * 100,
    reason: "bucket",
  };
}
export function assign(subject) {
  if (!subjects.includes(subject)) throw new TypeError("Unknown fixture");
  return bucket(subject, "cta-experiment-v1") < 5000 ? "A" : "B";
}
export function createLedger() {
  // Fixed 3 fixtures and one experiment; bounded demonstration, no production analytics.
  const exposed = new Set(),
    converted = new Set();
  return {
    event(subject, variant, kind) {
      if (
        !subjects.includes(subject) ||
        variant !== assign(subject) ||
        !["exposure", "conversion"].includes(kind)
      )
        return false;
      const key = JSON.stringify([subject, "cta-experiment-v1", variant]);
      if (kind === "exposure") exposed.add(key);
      else {
        if (!exposed.has(key)) return false;
        converted.add(key);
      }
      return true;
    },
    snapshot() {
      return {
        exposed: exposed.size,
        converted: converted.size,
        experiment: "cta-experiment-v1",
      };
    },
    clear() {
      exposed.clear();
      converted.clear();
    },
  };
}
