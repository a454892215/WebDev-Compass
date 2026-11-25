export class TaskPool {
  constructor() {
    this.active = null;
    this.queue = [];
    this.worker = null;
    this.nextId = 0;
  }
  ensureWorker() {
    if (this.worker) return;
    this.worker = new Worker(new URL("./worker.mjs", import.meta.url), {
      type: "module",
    });
    const worker = this.worker;
    this.worker.onmessage = (event) => {
      if (this.worker !== worker) return;
      if (!this.active || event.data.id !== this.active.id) return;
      this.active.resolve(event.data.sum);
      this.active = null;
      this.pump();
    };
    this.worker.onerror = () => {
      if (this.worker === worker) this.cancelAll("Worker failed");
    };
  }
  submit(buffer) {
    if (
      !(buffer instanceof ArrayBuffer) ||
      buffer.byteLength === 0 ||
      buffer.byteLength % 4 !== 0 ||
      buffer.byteLength > 4_000_000
    )
      return Promise.reject(new TypeError("Invalid buffer"));
    if (this.queue.length >= 2) return Promise.reject(new Error("Queue full"));
    return new Promise((resolve, reject) => {
      this.queue.push({ id: ++this.nextId, buffer, resolve, reject });
      this.pump();
    });
  }
  pump() {
    if (this.active || !this.queue.length) return;
    this.ensureWorker();
    this.active = this.queue.shift();
    try {
      this.worker.postMessage(
        { id: this.active.id, buffer: this.active.buffer },
        [this.active.buffer],
      );
    } catch (error) {
      this.active.reject(error);
      this.active = null;
      this.pump();
    }
  }
  cancelAll(reason = "Cancelled") {
    this.worker?.terminate();
    this.worker = null;
    this.active?.reject(new Error(reason));
    this.active = null;
    for (const item of this.queue) item.reject(new Error(reason));
    this.queue = [];
  }
  dispose() {
    this.cancelAll("Disposed");
  }
}
