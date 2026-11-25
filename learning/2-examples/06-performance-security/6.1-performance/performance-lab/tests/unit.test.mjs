import { test } from "node:test";
import assert from "node:assert/strict";
import { computed, ref } from "vue";
import { createLabServer, PAYLOAD } from "../server.mjs";
import { get } from "node:http";
import { gunzipSync, brotliDecompressSync } from "node:zlib";
const raw = (url) =>
  new Promise((resolve, reject) => {
    get(url, (res) => {
      const parts = [];
      res.on("data", (p) => parts.push(p));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(parts),
        }),
      );
    }).on("error", reject);
  });
test("gzip and Brotli encode actual bytes and preserve content; validators and no-store are real HTTP", async () => {
  const server = createLabServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const plain = await raw(base + "/api/compressed"),
      gzip = await raw(base + "/api/compressed?encoding=gzip"),
      br = await raw(base + "/api/compressed?encoding=br");
    assert.equal(plain.body.toString(), PAYLOAD);
    assert.equal(gunzipSync(gzip.body).toString(), PAYLOAD);
    assert.equal(brotliDecompressSync(br.body).toString(), PAYLOAD);
    assert.ok(gzip.body.length < plain.body.length);
    assert.ok(br.body.length < plain.body.length);
    const one = await fetch(base + "/api/cache");
    assert.equal(one.status, 200);
    const two = await fetch(base + "/api/cache", {
      headers: { "If-None-Match": one.headers.get("etag") },
    });
    assert.equal(two.status, 304);
    assert.equal(await two.text(), "");
    assert.match(
      (await fetch(base + "/api/private")).headers.get("cache-control"),
      /no-store/,
    );
    console.log(
      JSON.stringify({
        rawBytes: plain.body.length,
        gzipBytes: gzip.body.length,
        brotliBytes: br.body.length,
        conditional304: true,
      }),
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
test("Vue computed caches unchanged dependencies; avoid treating React memo rules as universal", () => {
  const source = ref(2);
  let calls = 0;
  const doubled = computed(() => {
    calls++;
    return source.value * 2;
  });
  assert.equal(doubled.value, 4);
  assert.equal(doubled.value, 4);
  assert.equal(calls, 1);
  source.value = 3;
  assert.equal(doubled.value, 6);
  assert.equal(calls, 2);
});

function fakeClock() {
  let now = 0,
    id = 0;
  const pending = new Map();
  return {
    now: () => now,
    set: (fn, delay) => {
      pending.set(++id, { fn, at: now + delay });
      return id;
    },
    clear: (id) => pending.delete(id),
    tick: (ms) => {
      const end = now + ms;
      while (true) {
        const next = [...pending]
          .filter(([, v]) => v.at <= end)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        now = next[1].at;
        pending.delete(next[0]);
        next[1].fn();
      }
      now = end;
    },
  };
}
import { debounce, throttle } from "../src/control.mjs";
test("debounce last input and cancellation are controlled, no guessed wall time", () => {
  const c = fakeClock(),
    values = [];
  const d = debounce((x) => values.push(x), 100, c);
  d("a");
  c.tick(50);
  d("ab");
  c.tick(99);
  assert.deepEqual(values, []);
  c.tick(1);
  assert.deepEqual(values, ["ab"]);
  d("late");
  d.cancel();
  c.tick(100);
  assert.deepEqual(values, ["ab"]);
});
test("throttle is bounded with latest trailing input and cancel", () => {
  const c = fakeClock(),
    values = [];
  const t = throttle((x) => values.push(x), 100, c);
  t(1);
  c.tick(20);
  t(2);
  c.tick(20);
  t(3);
  assert.deepEqual(values, [1]);
  c.tick(60);
  assert.deepEqual(values, [1, 3]);
  t(4);
  t.cancel();
  c.tick(200);
  assert.deepEqual(values, [1, 3]);
});
