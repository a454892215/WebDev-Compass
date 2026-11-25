import { test } from "node:test";
import assert from "node:assert/strict";
import { upgradeDecision } from "../policy.mjs";
test("minor with peer or breaking change still requires migration review", () => {
  assert.equal(
    upgradeDecision({ kind: "minor", peerChanges: true }),
    "manual-migration",
  );
  assert.equal(upgradeDecision({ kind: "major" }), "manual-migration");
});
test("successful version classification is not enough to bypass quality or authorization", () => {
  assert.equal(
    upgradeDecision({
      kind: "patch",
      checks: "failed",
      protectedBranch: true,
      ownerApproved: true,
    }),
    "hold",
  );
  assert.equal(
    upgradeDecision({
      kind: "patch",
      checks: "passed",
      protectedBranch: false,
      ownerApproved: true,
    }),
    "hold",
  );
});
test("security update accelerates review but does not autoapprove it", () => {
  const fixture = {
    kind: "patch",
    checks: "passed",
    protectedBranch: true,
    ownerApproved: true,
  };
  assert.equal(upgradeDecision(fixture), "eligible-by-team-policy");
  assert.equal(
    upgradeDecision({ ...fixture, security: true }),
    "expedited-review",
  );
  assert.equal(upgradeDecision({ kind: "unknown" }), "invalid");
});
