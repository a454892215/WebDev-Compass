export const actions = new Set([
  "open-panel",
  "choose-filter",
  "submit-fixture",
  "retry-panel",
]);
export function breadcrumbPolicy(crumb) {
  if (crumb.category !== "ui.action" || !actions.has(crumb.message))
    return null;
  return { category: "ui.action", message: crumb.message, level: "info" };
}
export function createEventPolicy(limit = 2) {
  let sent = 0;
  return (event, hint = {}) => {
    if (hint.originalException?.name === "AbortError" || sent >= limit)
      return null;
    sent++;
    const frames = event.exception?.values?.[0]?.stacktrace?.frames?.map(
      (frame) => ({
        lineno: frame.lineno,
        colno: frame.colno,
        function: frame.function,
        in_app: frame.in_app,
        filename: frame.filename?.split(/[?#]/)[0],
      }),
    );
    // Explicit allowlist: request/user/extra/contexts and original text never leave this boundary.
    return {
      event_id: event.event_id,
      timestamp: event.timestamp,
      platform: event.platform,
      release: event.release,
      environment: event.environment,
      level: "error",
      tags: { module: "fixture-panel" },
      exception: {
        values: [
          {
            type: "Error",
            value: "FIXTURE_PANEL_FAILED",
            stacktrace: { frames },
          },
        ],
      },
      breadcrumbs: event.breadcrumbs
        ?.map(breadcrumbPolicy)
        .filter(Boolean)
        .slice(-3),
    };
  };
}
export function priority({ criticalJourney, affectedRatio, recoverable }) {
  if (!Number.isFinite(affectedRatio) || affectedRatio < 0 || affectedRatio > 1)
    throw new Error("Invalid impact");
  if (criticalJourney && affectedRatio >= 0.5 && !recoverable) return "P0";
  if (criticalJourney && !recoverable) return "P1";
  return recoverable ? "P3" : "P2";
}
