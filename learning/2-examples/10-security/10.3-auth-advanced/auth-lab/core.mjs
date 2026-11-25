import { randomBytes, createHash, timingSafeEqual } from "node:crypto";
import { generateKeyPair, SignJWT, jwtVerify } from "jose";
const random = () => randomBytes(32).toString("base64url");
const hash = (value) => createHash("sha256").update(value).digest("base64url");
export function pkceChallenge(verifier) {
  if (
    typeof verifier !== "string" ||
    !/^[A-Za-z0-9._~-]{43,128}$/.test(verifier)
  )
    throw new Error("Invalid verifier");
  return hash(verifier);
}
function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const aa = Buffer.from(a),
    bb = Buffer.from(b);
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}
export function mockAuthorizationFlow() {
  const state = random(),
    verifier = random(),
    challenge = pkceChallenge(verifier),
    code = random();
  let used = false;
  return {
    state,
    verifier,
    challenge,
    code,
    complete({ callbackState, authorizationCode, codeVerifier, redirectUri }) {
      // Client callback checks state; simulated authorization server checks code/redirect/S256.
      if (!same(callbackState, state)) throw new Error("State mismatch");
      if (
        !same(authorizationCode, code) ||
        redirectUri !== "http://127.0.0.1:4523/callback" ||
        !same(pkceChallenge(codeVerifier), challenge) ||
        used
      )
        throw new Error("Invalid grant");
      used = true;
      return { subject: "alice", issuer: "local mock;not real OIDC provider" };
    },
  };
}
export function createRefreshStore({
  now = () => Date.now(),
  maxFamilies = 32,
} = {}) {
  const families = new Map(),
    tokens = new Map();
  function prune() {
    for (const [id, f] of families)
      if (f.expires <= now()) {
        families.delete(id);
        for (const [key, t] of tokens) if (t.family === id) tokens.delete(key);
      }
  }
  function token(family) {
    const raw = random();
    tokens.set(hash(raw), { family, used: false });
    return raw;
  }
  function issue(subject, client = "lab-browser") {
    prune();
    if (families.size >= maxFamilies) throw new Error("Store capacity");
    const family = random();
    families.set(family, {
      subject,
      client,
      revoked: false,
      expires: now() + 3600000,
      generation: 0,
    });
    return { refreshToken: token(family), family };
  }
  function rotate(raw, client = "lab-browser") {
    prune();
    if (typeof raw !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(raw))
      throw new Error("Invalid refresh");
    const entry = tokens.get(hash(raw));
    const family = entry && families.get(entry.family);
    if (!family || family.revoked || family.client !== client)
      throw new Error("Invalid refresh");
    if (entry.used) {
      family.revoked = true;
      throw new Error("Refresh reuse;family revoked");
    }
    if (family.generation >= 16) {
      family.revoked = true;
      throw new Error("Rotation limit");
    }
    // Synchronous compare-and-consume in ONE Node process. A real shared store requires atomic transaction.
    entry.used = true;
    family.generation++;
    return { refreshToken: token(entry.family), subject: family.subject };
  }
  function revoked(id) {
    prune();
    return !families.has(id) || families.get(id).revoked;
  }
  return { issue, rotate, revoked };
}
export function authorize(subject, resource, action) {
  if (
    !subject ||
    !resource ||
    typeof subject.id !== "string" ||
    !subject.id ||
    typeof subject.tenant !== "string" ||
    !subject.tenant ||
    !Array.isArray(subject.roles) ||
    subject.roles.some((role) => !["reader", "admin"].includes(role)) ||
    subject.tenant !== resource.tenant
  )
    return false;
  if (action === "read")
    return subject.roles?.includes("reader") && subject.id === resource.owner;
  if (action === "delete")
    return subject.roles?.includes("admin") && subject.id === resource.owner;
  return false;
}
export async function createJwtFixture() {
  const { privateKey, publicKey } = await generateKeyPair("ES256");
  const revoked = new Set();
  const issuer = "https://issuer.example",
    audience = "stage10-lab";
  async function sign(overrides = {}, header = {}) {
    return new SignJWT({ tenant: "t1", roles: ["reader"], ...overrides })
      .setProtectedHeader({
        alg: "ES256",
        typ: "at+jwt",
        kid: "local-key-1",
        ...header,
      })
      .setSubject(overrides.sub ?? "alice")
      .setIssuer(overrides.iss || issuer)
      .setAudience(overrides.aud || audience)
      .setJti(overrides.jti ?? random())
      .setIssuedAt()
      .setExpirationTime(overrides.exp ?? "2m")
      .sign(privateKey);
  }
  async function verify(token) {
    const result = await jwtVerify(token, publicKey, {
      algorithms: ["ES256"],
      issuer,
      audience,
      requiredClaims: ["exp", "iat", "sub", "jti"],
      typ: "at+jwt",
      maxTokenAge: "2m",
    });
    if (
      result.protectedHeader.kid !== "local-key-1" ||
      typeof result.payload.tenant !== "string" ||
      !Array.isArray(result.payload.roles) ||
      result.payload.roles.some(
        (role) => !["reader", "admin"].includes(role),
      ) ||
      typeof result.payload.sub !== "string" ||
      !result.payload.sub ||
      !result.payload.tenant ||
      typeof result.payload.jti !== "string" ||
      !result.payload.jti ||
      revoked.has(result.payload.jti)
    )
      throw new Error("Revoked or invalid subject");
    return result.payload;
  }
  return { sign, verify, revoke: (jti) => revoked.add(jti) };
}
