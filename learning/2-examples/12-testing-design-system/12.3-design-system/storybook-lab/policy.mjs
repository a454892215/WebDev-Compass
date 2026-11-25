export function requiredBump({
  removed = false,
  added = false,
  fix = false,
} = {}) {
  return removed ? "major" : added ? "minor" : fix ? "patch" : "none";
}
export function migrateVariant(value) {
  if (value === "solid")
    return {
      variant: "primary",
      warning: "solid removed in v2; review contrast",
    };
  if (value === "outline")
    return {
      variant: "secondary",
      warning: "outline removed in v2; review contrast",
    };
  return { variant: value, warning: null };
}
