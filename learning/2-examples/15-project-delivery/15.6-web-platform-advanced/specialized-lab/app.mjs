import { title } from 'catalog-utils'
const $ = (id) => document.getElementById(id)
$('module-result').textContent = title('目录')
const forced = new URLSearchParams(location.search).has('fallback')
let credentialId
const decode = (bytes) => JSON.parse(new TextDecoder().decode(bytes))
const b64 = (bytes) =>
  btoa(String.fromCharCode(...bytes))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
$('capabilities').textContent = JSON.stringify({
  secureContext: isSecureContext,
  webauthn: !forced && 'PublicKeyCredential' in window,
  paymentRequest: typeof PaymentRequest === 'function',
})
async function ceremony(kind) {
  if (forced || !('PublicKeyCredential' in window)) {
    $('auth-result').textContent = '不可用：保留其他登录方式（本实验未提供登录）'
    return
  }
  const challenge = crypto.getRandomValues(new Uint8Array(32))
  try {
    const credential =
      kind === 'create'
        ? await navigator.credentials.create({
            publicKey: {
              challenge,
              rp: { name: 'Local fixture', id: 'localhost' },
              user: {
                id: new Uint8Array([1, 2, 3]),
                name: 'synthetic-user',
                displayName: 'Synthetic',
              },
              pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
              authenticatorSelection: {
                residentKey: 'preferred',
                userVerification: 'required',
              },
              attestation: 'none',
              timeout: 5000,
            },
          })
        : await navigator.credentials.get({
            publicKey: {
              challenge,
              rpId: 'localhost',
              allowCredentials: credentialId
                ? [{ type: 'public-key', id: credentialId }]
                : [],
              userVerification: 'required',
              timeout: 5000,
            },
          })
    if (!credential) throw new Error('empty credential')
    credentialId = credential.rawId
    const client = decode(credential.response.clientDataJSON)
    $('auth-result').textContent = JSON.stringify({
      type: client.type,
      origin: client.origin,
      challengeMatches: client.challenge === b64(challenge),
      hasCredential: !!credential.rawId.byteLength,
      signatureBytes: credential.response.signature?.byteLength ?? 0,
      serverVerified: false,
    })
  } catch (error) {
    $('auth-result').textContent = '已取消或失败：' + error.name
  }
}
$('register').onclick = () => ceremony('create')
$('assert').onclick = () => ceremony('get')
export async function wasmExperiment() {
  if (forced || !('WebAssembly' in window))
    return {
      fallback: true,
      sum: [3, 4].reduce((a, b) => a + b, 0),
      reason: '使用有界JS计算',
    }
  const scalar = Uint8Array.from([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 7, 1, 96, 2, 127, 127, 1, 127, 3, 2, 1, 0, 7, 7, 1, 3,
    97, 100, 100, 0, 0, 10, 9, 1, 7, 0, 32, 0, 32, 1, 106, 11,
  ])
  const { instance } = await WebAssembly.instantiate(scalar)
  const memory = new WebAssembly.Memory({ initial: 1, maximum: 2 })
  const old = memory.buffer
  memory.grow(1)
  const simd = Uint8Array.from([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 127, 3, 2, 1, 0, 7, 7, 1, 3, 115, 105,
    109, 0, 0, 10, 25, 1, 23, 0, 253, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    253, 27, 0, 11,
  ])
  let simdResult = null
  if (WebAssembly.validate(simd))
    simdResult = (await WebAssembly.instantiate(simd)).instance.exports.sim()
  let sharedWorker = null
  if (crossOriginIsolated && typeof SharedArrayBuffer === 'function') {
    const shared = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true })
    sharedWorker = await new Promise((resolve, reject) => {
      const worker = new Worker('./worker.mjs', { type: 'module' })
      const timer = setTimeout(() => {
        worker.terminate()
        reject(new Error('worker deadline'))
      }, 2000)
      worker.onmessage = (e) => {
        clearTimeout(timer)
        worker.terminate()
        resolve(e.data)
      }
      worker.onerror = (e) => {
        clearTimeout(timer)
        worker.terminate()
        reject(new Error(e.message))
      }
      worker.postMessage({ memory: shared })
    })
  }
  return {
    sum: instance.exports.add(3, 4),
    oldBufferDetached: old.byteLength === 0,
    newBytes: memory.buffer.byteLength,
    simdResult,
    crossOriginIsolated,
    sharedWorker,
  }
}
$('wasm').onclick = async () => {
  try {
    $('wasm-result').textContent = JSON.stringify(await wasmExperiment())
  } catch (e) {
    $('wasm-result').textContent = '失败：' + e.message
  }
}
let gl = null,
  buffer = null,
  program = null,
  shaders = []
function release() {
  if (gl) {
    gl.useProgram(null)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }
  if (gl && buffer) {
    gl.deleteBuffer(buffer)
    buffer = null
  }
  if (gl && program) {
    gl.deleteProgram(program)
    program = null
  }
  if (gl) for (const shader of shaders) gl.deleteShader(shader)
  shaders = []
  $('scene-text').textContent = 'GPU缓冲/程序/着色器已释放；文本内容仍可读。'
}
$('release').onclick = release
$('render').onclick = () => {
  if (forced) {
    $('scene-text').textContent = '无WebGL：蓝底橙色三角形的文字替代。'
    return
  }
  gl ??= $('scene').getContext('webgl', { preserveDrawingBuffer: true })
  if (!gl) {
    $('scene-text').textContent = '无WebGL：蓝底橙色三角形的文字替代。'
    return
  }
  release()
  buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-0.8, -0.8, 0, 0.8, -0.8, 0, 0, 0.8, 0]),
    gl.STATIC_DRAW,
  )
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0, 0.25, 0.75, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  const compile = (kind, source) => {
    const shader = gl.createShader(kind)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error('shader compile')
    shaders.push(shader)
    return shader
  }
  const vertex = compile(
    gl.VERTEX_SHADER,
    'attribute vec3 position; uniform float aspect; void main(){float angle=0.5;vec3 p=vec3(cos(angle)*position.x,position.y,-sin(angle)*position.x);gl_Position=vec4(p.x/aspect,p.y,p.z,1.5-p.z);}',
  )
  const fragment = compile(
    gl.FRAGMENT_SHADER,
    'precision mediump float; void main(){gl_FragColor=vec4(1.0,0.5,0.0,1.0);}',
  )
  program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('program link')
  gl.useProgram(program)
  const position = gl.getAttribLocation(program, 'position')
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(position)
  gl.uniform1f(
    gl.getUniformLocation(program, 'aspect'),
    gl.drawingBufferWidth / gl.drawingBufferHeight,
  )
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  const center = new Uint8Array(4)
  gl.readPixels(128, 64, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, center)
  const pixel = new Uint8Array(4)
  gl.readPixels(1, 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel)
  $('scene-text').textContent = JSON.stringify({
    description: '蓝底上倾斜的橙色三角形；原生WebGL着色器和透视投影',
    pixel: [...pixel],
    center: [...center],
    bufferAlive: gl.isBuffer(buffer),
    error: gl.getError(),
  })
}
window.lab = {
  wasmExperiment,
  getBufferAlive: () => (gl && buffer ? gl.isBuffer(buffer) : false),
}
addEventListener('pagehide', release)
