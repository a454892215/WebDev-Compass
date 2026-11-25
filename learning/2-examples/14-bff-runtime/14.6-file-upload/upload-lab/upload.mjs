import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto'

export const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')
const fail = (code) => { throw new Error(code) }
// The caller must derive owner from a trusted server-side session, never request JSON.
export class UploadStore {
  #uploads = new Map()
  create(owner, bytes, chunkSize, checksum) {
    if (!owner || !Number.isInteger(bytes) || bytes < 8 || bytes > 1024 * 1024) fail('size')
    if (!Number.isInteger(chunkSize) || chunkSize < 4 || chunkSize > 65536) fail('chunk-size')
    if (!/^[a-f0-9]{64}$/.test(checksum)) fail('checksum-format')
    const id = randomUUID()
    this.#uploads.set(id, { owner, bytes, chunkSize, checksum, parts: new Map(), state: 'uploading' })
    return id
  }
  #owned(owner, id) {
    const upload = this.#uploads.get(id)
    if (!upload || upload.owner !== owner) fail('not-found')
    return upload
  }
  list(owner, id) { return [...this.#owned(owner, id).parts.keys()].sort((a, b) => a - b) }
  put(owner, id, index, data, checksum) {
    const u = this.#owned(owner, id)
    if (u.state !== 'uploading') fail('state')
    const total = Math.ceil(u.bytes / u.chunkSize)
    if (!Number.isInteger(index) || index < 0 || index >= total) fail('index')
    const expected = Math.min(u.chunkSize, u.bytes - index * u.chunkSize)
    if (!Buffer.isBuffer(data) || data.length !== expected) fail('part-size')
    if (digest(data) !== checksum) fail('part-checksum')
    if (u.parts.has(index) && digest(u.parts.get(index)) !== checksum) fail('part-conflict')
    u.parts.set(index, Buffer.from(data))
  }
  complete(owner, id, declaredMime) {
    const u = this.#owned(owner, id)
    if (u.state !== 'uploading') fail('state')
    if (u.parts.size !== Math.ceil(u.bytes / u.chunkSize)) fail('missing-parts')
    const bytes = Buffer.concat([...u.parts.keys()].sort((a,b) => a-b).map(i => u.parts.get(i)))
    if (bytes.length !== u.bytes || digest(bytes) !== u.checksum) fail('object-checksum')
    // Only a signature gate; production also needs a trusted parser/decoder and resource limits.
    const png = Buffer.from([137,80,78,71,13,10,26,10])
    if (declaredMime !== 'image/png' || !bytes.subarray(0,8).equals(png)) fail('type')
    u.state = 'quarantine'
    u.object = bytes
    return u.state
  }
  scan(owner, id, scannerVerdict) {
    const u = this.#owned(owner, id)
    if (u.state !== 'quarantine') fail('state')
    // This is a trusted scanner adapter RESULT MODEL, not antivirus detection.
    if (scannerVerdict === 'clean') u.state = 'ready'
    else if (scannerVerdict === 'infected') { u.state = 'rejected'; delete u.object }
    // unavailable/unknown/timeout keep quarantine; no fail-open.
    return u.state
  }
  read(owner, id) {
    const u = this.#owned(owner, id)
    if (u.state !== 'ready') fail('not-ready')
    return Buffer.from(u.object)
  }
  abort(owner, id) { this.#owned(owner, id); this.#uploads.delete(id) }
}

export async function uploadMissing(store, owner, id, bytes, chunkSize, concurrency = 2, transfer) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) fail('concurrency')
  const present = new Set(store.list(owner, id))
  const queue = Array.from({length: Math.ceil(bytes.length / chunkSize)}, (_,i)=>i).filter(i=>!present.has(i))
  let cursor = 0
  const results = await Promise.allSettled(Array.from({length: Math.min(concurrency, queue.length)}, async () => {
    while (cursor < queue.length) {
      const index = queue[cursor++]
      const part = bytes.subarray(index * chunkSize, (index + 1) * chunkSize)
      await transfer(index, part, digest(part))
    }
  }))
  const failure = results.find(result => result.status === 'rejected')
  if (failure) throw failure.reason
  // Caller retries later by calling list again; there is no unbounded automatic retry.
}

// Local capability model only. NOT AWS SigV4/OSS, not a deployable signing service.
export class LocalGrants {
  #secret = randomBytes(32)
  issue({ id, part, checksum, size, method = 'PUT', expires }, now = Date.now()) {
    if (!Number.isFinite(expires) || expires <= now || expires > now + 60000) fail('expiry-range')
    const payload = Buffer.from(JSON.stringify({id, part, checksum, size, method, expires})).toString('base64url')
    return payload + '.' + createHmac('sha256', this.#secret).update(payload).digest('hex')
  }
  verify(token, request, now = Date.now()) {
    const [payload, signature, extra] = token.split('.')
    const expected = createHmac('sha256', this.#secret).update(payload || '').digest()
    const received = Buffer.from(signature || '', 'hex')
    if (extra || !/^[a-f0-9]{64}$/.test(signature || '') || received.length !== expected.length || !timingSafeEqual(received, expected)) fail('signature')
    const grant = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (now >= grant.expires) fail('expired')
    for (const key of ['id','part','checksum','size','method']) if (request[key] !== grant[key]) fail('scope')
    return grant
  }
}
