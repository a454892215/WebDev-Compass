import { createHash } from 'node:crypto'
export type Subject = 'fixture-a' | 'fixture-b' | 'guest'
export function subjectFrom(value?: string): Subject {
  return value === 'fixture-a' || value === 'fixture-b' ? value : 'guest'
}
export function flagDecision(subject: Subject, kill: boolean, percentage = 50) {
  const valid = Number.isFinite(percentage) && percentage >= 0 && percentage <= 100
  const bucket =
    (createHash('sha256')
      .update('new-panel:v1:' + subject)
      .digest()
      .readUInt32BE(0) /
      2 ** 32) *
    100
  return {
    enabled: !kill && valid && subject !== 'guest' && bucket < percentage,
    bucket: Math.floor(bucket),
    reason: kill
      ? 'kill-switch'
      : subject === 'guest' || !valid
        ? 'safe-default'
        : 'stable-bucket',
  }
}
