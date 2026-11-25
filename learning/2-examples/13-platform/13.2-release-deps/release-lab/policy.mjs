export function upgradeDecision(change) {
  if (!change || !["patch", "minor", "major"].includes(change.kind))
    return "invalid";
  if (change.kind === "major" || change.breaking || change.peerChanges)
    return "manual-migration";
  if (
    change.checks !== "passed" ||
    !change.protectedBranch ||
    !change.ownerApproved
  )
    return "hold";
  return change.security ? "expedited-review" : "eligible-by-team-policy";
}
