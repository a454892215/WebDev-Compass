export const DB_NAME = "compass-stage8-state-lab-v1";
export function openDB() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore("drafts", { keyPath: "scope" });
      r.result.createObjectStore("outbox", { keyPath: ["scope", "id"] });
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error("数据库升级被其他页面阻塞"));
  });
}
function transact(db, store, mode, work) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    let result;
    tx.oncomplete = () => resolve(result);
    tx.onabort = () => reject(tx.error || new Error("事务取消"));
    tx.onerror = () => reject(tx.error);
    work(tx.objectStore(store), (value) => (result = value), tx);
  });
}
export function saveDraft(db, scope, text) {
  return transact(db, "drafts", "readwrite", (s) => s.put({ scope, text }));
}
export function loadDraft(db, scope) {
  return transact(db, "drafts", "readonly", (s, done) => {
    s.get(scope).onsuccess = (e) => done(e.target.result?.text || "");
  });
}
export function enqueue(db, entry) {
  return transact(db, "outbox", "readwrite", (s, done, tx) => {
    const request = s.get([entry.scope, entry.id]);
    request.onsuccess = () => {
      const old = request.result;
      if (old && old.text !== entry.text) {
        tx.abort();
        return;
      }
      s.put(entry);
      done(entry.id);
    };
  });
}
export function listQueue(db, scope) {
  return transact(db, "outbox", "readonly", (s, done) => {
    s.getAll().onsuccess = (e) =>
      done(e.target.result.filter((row) => row.scope === scope));
  });
}
export function removeQueued(db, scope, id) {
  return transact(db, "outbox", "readwrite", (s) => s.delete([scope, id]));
}
