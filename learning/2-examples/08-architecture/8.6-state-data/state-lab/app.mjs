import {
  openDB,
  saveDraft,
  loadDraft,
  enqueue,
  listQueue,
  removeQueued,
} from "./storage.mjs";
import { staleResult } from "./logic.mjs";
const scopeInput = document.querySelector("#scope"),
  draft = document.querySelector("#draft"),
  status = document.querySelector("#status");
let scope = "alice",
  epoch = 0,
  db,
  entryId = null,
  entryText = null,
  busy = false;
const say = (text) => (status.textContent = text);
async function count() {
  const owner = scope;
  const n = (await listQueue(db, owner)).length;
  if (scope === owner)
    document.querySelector("#pending").textContent = `待发送：${n}`;
}
async function selectScope() {
  const selected = scopeInput.value;
  scope = selected;
  const version = ++epoch;
  entryId = null;
  entryText = null;
  draft.value = "";
  const text = await loadDraft(db, selected);
  if (version !== epoch) return;
  draft.value = text;
  await count();
  say(`${selected} 本地草稿已读取`);
}
function report(error) {
  say(`失败：${error.message}；已有草稿保留，可显式重试`);
}
try {
  db = await openDB();
  await selectScope();
} catch (error) {
  report(error);
}
scopeInput.addEventListener("change", () => selectScope().catch(report));
document.querySelector("#save").addEventListener("click", async () => {
  const owner = scope,
    version = epoch;
  try {
    if (!db) throw Error("本地存储不可用");
    await saveDraft(db, owner, draft.value);
    if (version === epoch) say("本地草稿已保存");
  } catch (error) {
    if (version === epoch) report(error);
  }
});
document.querySelector("#queue").addEventListener("click", async () => {
  const owner = scope,
    version = epoch;
  try {
    if (!db) throw Error("本地存储不可用");
    const text = draft.value;
    if (text !== entryText) {
      entryId = crypto.randomUUID();
      entryText = text;
    }
    await enqueue(db, { scope: owner, id: entryId, text });
    if (version === epoch) {
      await count();
      say("已入队；重复加入同一内容不会多一项");
    }
  } catch (error) {
    if (version === epoch) report(error);
  }
});
document.querySelector("#retry").addEventListener("click", async () => {
  if (busy) return;
  busy = true;
  const owner = scope,
    version = epoch;
  try {
    if (!db) throw Error("本地存储不可用");
    const rows = await listQueue(db, owner);
    for (const row of rows) {
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(row),
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.ack !== row.id) throw Error("ack不匹配");
      await removeQueued(db, owner, row.id);
    }
    if (version === epoch) {
      await count();
      say("重试完成；仅移除收到ack的项目");
    }
  } catch (error) {
    if (version === epoch) {
      await count();
      report(error);
    }
  } finally {
    busy = false;
  }
});
let stale = { data: "已缓存课程：Vue 3", stale: false, error: null };
function refresh(result) {
  stale = staleResult(stale, result);
  document.querySelector("#stale-data").textContent = stale.data || "无数据";
  document.querySelector("#stale-status").textContent =
    stale.error || "内容已更新";
}
document
  .querySelector("#refresh-fail")
  .addEventListener("click", () => refresh({ ok: false }));
document
  .querySelector("#refresh-ok")
  .addEventListener("click", () =>
    refresh({ ok: true, data: "已缓存课程：Nuxt" }),
  );
window.stage8State = {
  get db() {
    return db;
  },
  get scope() {
    return scope;
  },
  listQueue: () => listQueue(db, scope),
};
