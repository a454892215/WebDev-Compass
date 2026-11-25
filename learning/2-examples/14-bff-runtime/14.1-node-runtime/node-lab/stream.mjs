import { Writable, Readable } from 'node:stream'
import { finished, pipeline } from 'node:stream/promises'
import { once } from 'node:events'
export async function copy(respectBackpressure = true) {
  let bytes = 0, peak = 0, waits = 0
  const sink = new Writable({ highWaterMark: 2048,
    write(chunk, _encoding, callback) {
      setImmediate(() => { bytes += chunk.length; callback() })
    },
  })
  const complete = finished(sink)
  for (let n = 0; n < 32; n++) {
    const ready = sink.write(Buffer.alloc(1024))
    peak = Math.max(peak, sink.writableLength)
    if (!ready && respectBackpressure) { waits++; await once(sink, 'drain') }
  }
  sink.end()
  await complete
  return { bytes, peak, waits }
}
export async function brokenPipeline() {
  const source = Readable.from([Buffer.from('a'), Buffer.from('b')])
  const sink = new Writable({ write(_chunk, _encoding, callback) {
    callback(new Error('fixture-write-failed'))
  } })
  try { await pipeline(source, sink) }
  catch (error) { return { message: error.message, sourceDestroyed: source.destroyed, sinkDestroyed: sink.destroyed } }
  throw new Error('expected pipeline rejection')
}
