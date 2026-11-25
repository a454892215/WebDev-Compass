// (module (func (export "add") (param i32 i32) (result i32)
//   local.get 0 local.get 1 i32.add))
// Raw teaching fixture: no Emscripten compiler/toolchain was run.
export const addBytes = new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 3, 2, 1, 0, 7,
  7, 1, 3, 97, 100, 100, 0, 0, 10, 9, 1, 7, 0, 32, 0, 32, 1, 106, 11,
]);
export async function wasmAdd(a, b) {
  const { instance } = await WebAssembly.instantiate(addBytes);
  return instance.exports.add(a, b);
}
export function validateSchema(value) {
  if (
    !value ||
    Object.getPrototypeOf(value) !== Object.prototype ||
    Object.keys(value).some((k) => !["version", "nodes"].includes(k)) ||
    value.version !== 1 ||
    !Array.isArray(value.nodes) ||
    value.nodes.length > 10
  )
    throw new TypeError("Invalid schema");
  return value.nodes.map((node) => {
    if (
      !node ||
      Object.getPrototypeOf(node) !== Object.prototype ||
      Object.keys(node).some((k) => !["kind", "text"].includes(k)) ||
      !["heading", "text"].includes(node.kind) ||
      typeof node.text !== "string" ||
      node.text.length > 200
    )
      throw new TypeError("Invalid node");
    return { kind: node.kind, text: node.text };
  });
}
export function validSeries(rows) {
  if (!Array.isArray(rows) || rows.length > 12)
    throw new TypeError("Invalid series");
  return rows.map((row) => {
    if (
      !row ||
      typeof row.label !== "string" ||
      row.label.length > 40 ||
      typeof row.value !== "number" ||
      !Number.isFinite(row.value) ||
      row.value < 0 ||
      row.value > 100
    )
      throw new TypeError("Invalid data");
    return { label: row.label, value: row.value };
  });
}
