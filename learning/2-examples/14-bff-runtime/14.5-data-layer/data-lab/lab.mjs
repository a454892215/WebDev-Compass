import { buildSchema, graphql } from "graphql";
import DataLoader from "dataloader";
import { InMemoryCache, gql } from "@apollo/client/core";
import { createHash } from "node:crypto";

export const schema = buildSchema(
  "type Person { id: ID!, name: String! } type Post { id: ID!, author: Person } type Query { posts: [Post!]! }",
);
export const operation = "{ posts { id author { id name } } }";
export const operationHash = createHash("sha256")
  .update(operation)
  .digest("hex");
const allowedOperations = new Map([[operationHash, operation]]);
export function persisted(hash) {
  const query = allowedOperations.get(hash);
  if (!query) throw new Error("UNKNOWN_OPERATION");
  return query;
}
export function requestContext(tenant, batched = true) {
  if (!["A", "B"].includes(tenant)) throw new Error("FORBIDDEN");
  const stats = { calls: 0, keys: [] };
  const fetchPeople = async (keys) => {
    stats.calls++;
    stats.keys.push([...keys]);
    // Upstream may return records in any order; loader must restore key order.
    return [...keys]
      .reverse()
      .map((id) => ({ id, name: tenant + "-person-" + id }));
  };
  const loader = new DataLoader(async (keys) => {
    const rows = await fetchPeople(keys);
    return keys.map((id) => rows.find((row) => row.id === id) ?? null);
  });
  return {
    tenant,
    stats,
    person: (id) =>
      batched ? loader.load(id) : fetchPeople([id]).then((rows) => rows[0]),
  };
}
export async function execute(context, hash = operationHash) {
  return graphql({
    schema,
    source: persisted(hash),
    contextValue: context,
    rootValue: {
      posts: () =>
        ["1", "2", "1"].map((authorId, i) => ({
          id: String(i),
          author: (_args, ctx) => ctx.person(authorId),
        })),
    },
  });
}
export const viewerQuery = gql`
  query Viewer {
    viewer {
      __typename
      id
      tenant
      name
    }
  }
`;
export function newCache() {
  return new InMemoryCache({
    typePolicies: { Person: { keyFields: ["tenant", "id"] } },
  });
}
export function writeViewer(cache, tenant) {
  cache.writeQuery({
    query: viewerQuery,
    data: {
      viewer: {
        __typename: "Person",
        id: "1",
        tenant,
        name: tenant + "-private",
      },
    },
  });
}
// Deterministic single-process model ONLY. A production Redis counter needs one atomic
// server operation/script; separate INCR/EXPIRE may strand a non-expiring key on failure.
export class ExpiringStoreModel {
  constructor() {
    this.rows = new Map();
  }
  get(key, now) {
    const row = this.rows.get(key);
    if (!row || row.expires <= now) {
      this.rows.delete(key);
      return undefined;
    }
    return row.value;
  }
  set(key, value, ttl, now) {
    if (!(ttl > 0)) throw new Error("INVALID_TTL");
    this.rows.set(key, { value, expires: now + ttl });
  }
  delete(key) {
    this.rows.delete(key);
  }
  allow(key, limit, ttl, now) {
    const row = this.rows.get(key);
    if (!row || row.expires <= now) {
      this.set(key, 1, ttl, now);
      return true;
    }
    row.value++;
    return row.value <= limit;
  }
}
export function toViewerDto(row) {
  if (typeof row.displayName !== "string")
    throw new Error("MIGRATION_NOT_BACKFILLED");
  return { id: String(row.id), name: row.displayName };
}
export function backoff(attempt, random = Math.random) {
  if (!Number.isSafeInteger(attempt) || attempt < 0)
    throw new Error("INVALID_ATTEMPT");
  return Math.floor(
    random() * Math.min(30000, 500 * 2 ** Math.min(attempt, 16)),
  );
}
export const events = [
  { id: 1, tenant: "A", text: "A-one" },
  { id: 2, tenant: "B", text: "B-one" },
  { id: 3, tenant: "A", text: "A-two" },
];
export function replay(tenant, lastId) {
  if (!["A", "B"].includes(tenant)) throw new Error("FORBIDDEN");
  if (!Number.isSafeInteger(lastId) || lastId < 0)
    throw new Error("INVALID_CURSOR");
  return events.filter((e) => e.tenant === tenant && e.id > lastId);
}
export function encodeSse(event) {
  return (
    "id: " +
    event.id +
    "\nevent: update\ndata: " +
    JSON.stringify({ text: event.text }) +
    "\n\n"
  );
}
