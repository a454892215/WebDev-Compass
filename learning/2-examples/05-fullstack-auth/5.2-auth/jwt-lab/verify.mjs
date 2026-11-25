import { strict as assert } from 'node:assert'
import { mkdir, writeFile } from 'node:fs/promises'
import { generateKeyPair, generateSecret, SignJWT, jwtVerify, decodeJwt } from 'jose'
import {
  bearerFromHeader,
  createRefreshCoordinator,
  mayReadDocument,
} from './contracts.mjs'
const checks = []
async function check(id, action, observed) {
  await action()
  checks.push({ id, result: 'passed', observed })
}
const now = 1_800_000_000
const currentDate = new Date(now * 1000)
const issuer = 'https://issuer.example.test'
const audience = 'compass-teaching-api'
// Fresh WebCrypto keys exist only in this process; nothing is written/exported.
const { privateKey, publicKey } = await generateKeyPair('RS256')
const wrongPair = await generateKeyPair('RS256')
async function sign(overrides = {}, header = { alg: 'RS256', typ: 'at+jwt' }) {
  return new SignJWT({
    sub: 'alice',
    role: 'reader',
    iss: issuer,
    aud: audience,
    iat: now - 20,
    exp: now + 120,
    ...overrides,
  })
    .setProtectedHeader(header)
    .sign(privateKey)
}
async function verify(token, options = {}) {
  return jwtVerify(token, publicKey, {
    algorithms: ['RS256'],
    typ: 'at+jwt',
    issuer,
    audience,
    currentDate,
    requiredClaims: ['exp', 'sub', 'iat'],
    ...options,
  })
}
const valid = await sign()
await check(
  'jwt-valid',
  async () => {
    const { payload } = await verify(valid)
    assert.equal(payload.sub, 'alice')
    assert.equal(payload.role, 'reader')
  },
  'real RS256 signature plus issuer/audience/time/type validation succeeds',
)
const parts = valid.split('.')
parts[1] = Buffer.from(JSON.stringify({ ...decodeJwt(valid), role: 'admin' })).toString(
  'base64url',
)
const forged = parts.join('.')
await check(
  'decode-is-not-verify',
  async () => {
    assert.equal(decodeJwt(forged).role, 'admin')
    await assert.rejects(verify(forged), {
      code: 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
    })
  },
  'payload decoding exposes forged role; actual verification rejects it',
)
await check(
  'jwt-wrong-key',
  async () => {
    await assert.rejects(
      jwtVerify(valid, wrongPair.publicKey, { algorithms: ['RS256'] }),
      { code: 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED' },
    )
  },
  'unrelated public key cannot verify signature',
)
await check(
  'jwt-expired',
  async () => {
    await assert.rejects(verify(await sign({ exp: now - 1 })), {
      code: 'ERR_JWT_EXPIRED',
    })
  },
  'expired claim rejected with fixed verification time',
)
await check(
  'jwt-future-nbf',
  async () => {
    await assert.rejects(verify(await sign({ nbf: now + 60 })), {
      code: 'ERR_JWT_CLAIM_VALIDATION_FAILED',
    })
  },
  'not-before in future rejected',
)
await check(
  'jwt-wrong-issuer',
  async () => {
    await assert.rejects(verify(await sign({ iss: 'https://wrong.example.test' })), {
      code: 'ERR_JWT_CLAIM_VALIDATION_FAILED',
    })
  },
  'correctly signed token with wrong issuer rejected',
)
await check(
  'jwt-wrong-audience',
  async () => {
    await assert.rejects(verify(await sign({ aud: 'other-api' })), {
      code: 'ERR_JWT_CLAIM_VALIDATION_FAILED',
    })
  },
  'correct signature does not make token valid for another API',
)
await check(
  'jwt-missing-exp',
  async () => {
    const token = await new SignJWT({
      sub: 'alice',
      iss: issuer,
      aud: audience,
      iat: now,
    })
      .setProtectedHeader({ alg: 'RS256', typ: 'at+jwt' })
      .sign(privateKey)
    await assert.rejects(verify(token), { code: 'ERR_JWT_CLAIM_VALIDATION_FAILED' })
  },
  'required expiry missing is rejected rather than accepting a timeless token',
)
await check(
  'jwt-wrong-type',
  async () => {
    await assert.rejects(verify(await sign({}, { alg: 'RS256', typ: 'JWT' })), {
      code: 'ERR_JWT_CLAIM_VALIDATION_FAILED',
    })
  },
  'configured access-token type boundary rejects another typ',
)
await check(
  'jwt-disallowed-alg',
  async () => {
    const key = await generateSecret('HS256')
    const token = await new SignJWT({ sub: 'alice' })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(key)
    await assert.rejects(verify(token), { code: 'ERR_JOSE_ALG_NOT_ALLOWED' })
  },
  'server algorithm allowlist rejects different algorithm before trusting header selection',
)
await check(
  'jwt-max-age',
  async () => {
    await assert.rejects(verify(await sign({ iat: now - 600 }), { maxTokenAge: '5m' }), {
      code: 'ERR_JWT_EXPIRED',
    })
  },
  'maximum token age policy can be stricter than exp',
)
await check(
  'bearer-header',
  async () => {
    assert.equal(bearerFromHeader(`Bearer ${valid}`), valid)
    assert.equal(bearerFromHeader('bearer opaque-token'), 'opaque-token')
    assert.throws(() => bearerFromHeader(undefined))
    assert.throws(() => bearerFromHeader('Bearer a, Bearer b'))
    assert.throws(() => bearerFromHeader('Basic xyz'))
    assert.throws(() => bearerFromHeader('Bearer a\r\nX: b'))
  },
  'one header credential parsed; absent/multiple/wrong-scheme/control characters rejected',
)
await check(
  'role-and-owner',
  async () => {
    const doc = { ownerId: 'alice' }
    assert.equal(mayReadDocument({ id: 'alice', role: 'reader' }, doc), true)
    assert.equal(mayReadDocument({ id: 'bob', role: 'reader' }, doc), false)
    assert.equal(mayReadDocument({ id: 'root', role: 'admin' }, doc), true)
  },
  'object owner restriction applies in addition to role, using trusted server-side user',
)
await check(
  'refresh-singleflight',
  async () => {
    const c = createRefreshCoordinator()
    let calls = 0
    let release
    const load = () => {
      calls++
      return new Promise((resolve) => {
        release = resolve
      })
    }
    const values = [c.refresh(load), c.refresh(load), c.refresh(load)]
    await Promise.resolve()
    assert.equal(calls, 1)
    release('new-fixture-token')
    assert.deepEqual(await Promise.all(values), [
      'new-fixture-token',
      'new-fixture-token',
      'new-fixture-token',
    ])
  },
  'three same-session callers share one controlled refresh; no real token endpoint',
)
await check(
  'refresh-logout-fence',
  async () => {
    const c = createRefreshCoordinator()
    let release
    const result = c.refresh(
      () =>
        new Promise((resolve) => {
          release = resolve
        }),
    )
    const rejected = assert.rejects(result, /session changed/)
    await Promise.resolve()
    c.logout()
    release('late')
    await rejected
  },
  'late refresh after logout cannot restore previous session',
)
await check(
  'refresh-instance-isolation',
  async () => {
    const a = createRefreshCoordinator(),
      b = createRefreshCoordinator()
    let calls = 0
    await Promise.all([a.refresh(async () => ++calls), b.refresh(async () => ++calls)])
    assert.equal(calls, 2)
  },
  'separate client-session coordinators do not share pending refresh',
)
const report = {
  date: '2026-11-25',
  environment: { node: process.version, jose: '6.2.18' },
  passed: checks.length,
  checks,
  limits: [
    'no browser token storage or HTTPS test',
    'no real OAuth/OIDC/SSO provider',
    'refresh uses controlled local Promise, not remote token rotation',
    'keys are generated per run and never persisted',
    'Nuxt Cookie/CSRF/SSR checks are performed by the stage capstone separately',
  ],
}
await mkdir('artifacts', { recursive: true })
await writeFile('artifacts/runtime.json', JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
