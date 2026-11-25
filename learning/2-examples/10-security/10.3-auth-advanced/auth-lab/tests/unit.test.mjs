import test from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import {
  mockAuthorizationFlow,
  pkceChallenge,
  createRefreshStore,
  createJwtFixture,
  authorize,
} from "../core.mjs";
test("mock code callback checks state,redirect,PKCE and single use", () => {
  const f = mockAuthorizationFlow();
  const input = {
    callbackState: f.state,
    authorizationCode: f.code,
    codeVerifier: f.verifier,
    redirectUri: "http://127.0.0.1:4523/callback",
  };
  assert.throws(
    () => f.complete({ ...input, callbackState: "wrong" }),
    /State/,
  );
  assert.throws(
    () => f.complete({ ...input, codeVerifier: "x".repeat(43) }),
    /grant/,
  );
  assert.throws(
    () => f.complete({ ...input, redirectUri: "https://evil.example" }),
    /grant/,
  );
  assert.equal(f.complete(input).subject, "alice");
  assert.throws(() => f.complete(input), /grant/);
  assert.throws(() => pkceChallenge("short"), /verifier/);
});
test("refresh rotation,reuse revokes family,strict concurrent reuse and expiry", async () => {
  let clock = 100;
  const store = createRefreshStore({ now: () => clock });
  const first = store.issue("alice");
  const second = store.rotate(first.refreshToken);
  assert.ok(second.refreshToken !== first.refreshToken);
  assert.throws(() => store.rotate(first.refreshToken), /reuse/);
  assert.equal(store.revoked(first.family), true);
  assert.throws(() => store.rotate(second.refreshToken), /Invalid/);
  const next = store.issue("bob");
  const results = await Promise.allSettled(
    [0, 1].map(() =>
      Promise.resolve().then(() => store.rotate(next.refreshToken)),
    ),
  );
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(store.revoked(next.family), true);
  const winner = results.find((r) => r.status === "fulfilled");
  assert.throws(() => store.rotate(winner.value.refreshToken), /Invalid/);
  const expires = store.issue("alice");
  clock += 3600001;
  assert.throws(() => store.rotate(expires.refreshToken), /Invalid/);
});
test("jose verifies signature,algorithm,issuer,audience,expiry,type and revocation", async () => {
  const jwt = await createJwtFixture(),
    valid = await jwt.sign();
  const payload = await jwt.verify(valid);
  assert.equal(payload.sub, "alice");
  for (const token of [
    await jwt.sign({ iss: "https://other.example" }),
    await jwt.sign({ aud: "other" }),
    await jwt.sign({ exp: Math.floor(Date.now() / 1000) - 10 }),
    await jwt.sign({}, { typ: "id+jwt" }),
    await jwt.sign({ roles: "reader" }),
    await jwt.sign({ sub: "" }),
    await jwt.sign({ jti: "" }),
    await jwt.sign({ tenant: "" }),
    await jwt.sign({}, { kid: "unknown" }),
  ])
    await assert.rejects(() => jwt.verify(token));
  const other = await createJwtFixture();
  const otherToken = await other.sign();
  await assert.rejects(() => jwt.verify(otherToken));
  const hs = await new SignJWT({ sub: "alice" })
    .setProtectedHeader({ alg: "HS256", typ: "at+jwt" })
    .setIssuer("https://issuer.example")
    .setAudience("stage10-lab")
    .setIssuedAt()
    .setExpirationTime("2m")
    .sign(new Uint8Array(32).fill(7));
  await assert.rejects(() => jwt.verify(hs));
  const [head, body, sig] = valid.split(".");
  const badSig = (sig[0] === "A" ? "B" : "A") + sig.slice(1);
  await assert.rejects(() => jwt.verify([head, body, badSig].join(".")));
  jwt.revoke(payload.jti);
  await assert.rejects(() => jwt.verify(valid), /Revoked/);
});
test("role alone does not bypass object or tenant policy", () => {
  const alice = { id: "alice", tenant: "t1", roles: ["reader"] },
    resource = { owner: "alice", tenant: "t1" };
  assert.equal(authorize(alice, resource, "read"), true);
  assert.equal(authorize(alice, { ...resource, owner: "bob" }, "read"), false);
  assert.equal(
    authorize(
      { ...alice, roles: ["admin"] },
      { ...resource, tenant: "t2" },
      "delete",
    ),
    false,
  );
  assert.equal(authorize(alice, resource, "delete"), false);
  assert.equal(
    authorize({ ...alice, roles: ["admin"] }, resource, "delete"),
    true,
  );
  assert.equal(authorize(alice, resource, "unknown"), false);
  assert.equal(
    authorize({ id: "alice", roles: ["reader"] }, { owner: "alice" }, "read"),
    false,
  );
  assert.equal(
    authorize({ ...alice, id: "" }, { ...resource, owner: "" }, "read"),
    false,
  );
  assert.equal(
    authorize({ ...alice, roles: "reader" }, resource, "read"),
    false,
  );
});
