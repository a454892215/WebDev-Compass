export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
  const encode = new TextEncoder()
  let timer: ReturnType<typeof setTimeout> | undefined
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encode.encode(
          '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>HTTP流式响应演示</title></head><body><main><h1>先发送的静态HTML</h1><p>这是独立HTTP响应，不是Nuxt组件Streaming SSR。</p>',
        ),
      )
      timer = setTimeout(() => {
        controller.enqueue(
          encode.encode(
            '<p id="late">稍后发送的内容</p><a href="/">返回目录</a></main></body></html>',
          ),
        )
        controller.close()
      }, 40)
    },
    cancel() {
      if (timer) clearTimeout(timer)
    },
  })
  return sendStream(event, stream)
})
