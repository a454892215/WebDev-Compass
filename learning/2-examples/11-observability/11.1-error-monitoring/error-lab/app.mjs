import * as Sentry from "@sentry/browser";
import { createEventPolicy, breadcrumbPolicy } from "./policy.mjs";
const envelopes = [];
const rate = new URL(location.href).searchParams.get("sample") === "0" ? 0 : 1;
Sentry.init({
  dsn: "https://public@example.invalid/1",
  release: "error-lab@1.0.0",
  environment: "local-fixture",
  defaultIntegrations: false,
  sampleRate: rate,
  sendClientReports: false,
  maxBreadcrumbs: 3,
  beforeBreadcrumb: breadcrumbPolicy,
  beforeSend: createEventPolicy(2),
  transport: () => ({
    send(envelope) {
      envelopes.push(structuredClone(envelope));
      return Promise.resolve({ statusCode: 200 });
    },
    flush() {
      return Promise.resolve(true);
    },
  }),
});
function refresh() {
  document.querySelector("#result").textContent = JSON.stringify(
    envelopes,
    null,
    2,
  );
}
export function fixtureFailure() {
  throw new Error("fixture-email@example.invalid token=DO_NOT_SEND_THIS");
}
async function capture(kind = "fixture") {
  Sentry.setUser({ id: "secret-user", email: "fixture-email@example.invalid" });
  Sentry.setExtra("token", "DO_NOT_SEND_THIS");
  Sentry.setContext("private-fixture", { password: "DO_NOT_SEND_THIS" });
  try {
    if (kind === "abort")
      throw new DOMException("Expected cancellation", "AbortError");
    fixtureFailure();
  } catch (error) {
    Sentry.captureException(error);
  }
  await Sentry.flush(1500);
  refresh();
  return structuredClone(envelopes);
}
function crumb(action) {
  Sentry.addBreadcrumb({
    category: "ui.action",
    message: action,
    data: { text: "DO_NOT_SEND_THIS" },
  });
}
document.querySelector("#capture").addEventListener("click", () => {
  crumb("submit-fixture");
  void capture();
});
document.querySelector("#abort").addEventListener("click", () => {
  void capture("abort");
});
window.lab = {
  capture,
  crumb,
  envelopes,
  refresh,
  version: Sentry.SDK_VERSION,
  sampleRate: rate,
};
refresh();
