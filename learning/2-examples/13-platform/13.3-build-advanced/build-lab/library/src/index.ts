export function sumPositive(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b < 0)
    throw new RangeError("Finite nonnegative inputs required");
  return a + b;
}
