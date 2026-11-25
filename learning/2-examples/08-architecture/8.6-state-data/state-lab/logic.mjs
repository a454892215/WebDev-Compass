export function scopedKey(scope, query = "") {
  if (!["alice", "bob"].includes(scope))
    throw new TypeError("Unknown fixture scope");
  return JSON.stringify(["workspace-v1", scope, query]);
}
export class OptimisticValue {
  constructor(scope, value = 0, revision = 1) {
    this.epoch = 0;
    this.switchScope(scope, value, revision);
  }
  switchScope(scope, value = 0, revision = 1) {
    scopedKey(scope);
    this.scope = scope;
    this.epoch++;
    this.latest = 0;
    this.value = value;
    this.confirmed = value;
    this.revision = revision;
    this.error = null;
  }
  begin(value) {
    if (!Number.isFinite(value)) throw new TypeError("Invalid value");
    this.value = value;
    this.error = null;
    return {
      scope: this.scope,
      epoch: this.epoch,
      id: ++this.latest,
      baseRevision: this.revision,
    };
  }
  current(token) {
    return token.scope === this.scope && token.epoch === this.epoch;
  }
  accept(token, { value, revision }) {
    if (!this.current(token)) return false;
    if (!Number.isFinite(value) || !Number.isInteger(revision) || revision < 1)
      throw new TypeError("Invalid response");
    if (revision >= this.revision) {
      this.confirmed = value;
      this.revision = revision;
    }
    if (token.id === this.latest) {
      this.value = this.confirmed;
      this.error = null;
    }
    return true;
  }
  reject(token, reason = "conflict") {
    if (!this.current(token) || token.id !== this.latest) return false;
    this.value = this.confirmed;
    this.error = reason;
    return true;
  }
}
export function staleResult(previous, result) {
  return result.ok
    ? { data: result.data, stale: false, error: null }
    : {
        data: previous.data,
        stale: previous.data !== null,
        error: "刷新失败，现有内容可能过期",
      };
}
// Projection exercise, not a persistent event store or full CQRS implementation.
export function project(events) {
  return events.reduce((count, event) => {
    if (event.type !== "added" || !Number.isInteger(event.amount))
      throw new TypeError("Unknown event");
    return count + event.amount;
  }, 0);
}
