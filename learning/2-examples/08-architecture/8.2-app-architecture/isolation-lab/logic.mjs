export function parseMessage(value) {
  if (
    !value ||
    Object.getPrototypeOf(value) !== Object.prototype ||
    Object.keys(value).some((k) => !["v", "type", "slug"].includes(k)) ||
    value.v !== 1 ||
    value.type !== "course:selected" ||
    typeof value.slug !== "string" ||
    !/^[a-z0-9-]{1,32}$/.test(value.slug)
  )
    throw new TypeError("Invalid message");
  return { v: 1, type: "course:selected", slug: value.slug };
}
export function createRegistry() {
  const entries = new Map();
  return {
    register(name, version, mount) {
      if (
        typeof name !== "string" ||
        !/^[a-z-]{1,24}$/.test(name) ||
        version !== 1 ||
        typeof mount !== "function" ||
        entries.has(name)
      )
        throw new TypeError("Invalid registration");
      entries.set(name, mount);
    },
    mount(name, root) {
      const factory = entries.get(name);
      if (!factory) throw new Error("Unknown extension");
      const dispose = factory(root);
      if (typeof dispose !== "function")
        throw new TypeError("Disposer required");
      let active = true;
      return () => {
        if (active) {
          active = false;
          dispose();
        }
      };
    },
  };
}
export function parseFields(value) {
  if (!Array.isArray(value) || value.length > 5)
    throw new TypeError("Invalid fields");
  const ids = new Set();
  return value.map((field) => {
    if (
      !field ||
      Object.getPrototypeOf(field) !== Object.prototype ||
      Object.keys(field).some((k) => !["id", "label"].includes(k)) ||
      typeof field.id !== "string" ||
      !/^[a-z]{1,12}$/.test(field.id) ||
      ids.has(field.id) ||
      typeof field.label !== "string" ||
      field.label.length > 60 ||
      !field.label.trim()
    )
      throw new TypeError("Invalid field");
    ids.add(field.id);
    return { id: field.id, label: field.label };
  });
}
export async function listTitles(port) {
  const raw = await port.list();
  if (!Array.isArray(raw) || raw.some((x) => typeof x.title !== "string"))
    throw new TypeError("Invalid DTO");
  return raw.map((x) => x.title);
}
