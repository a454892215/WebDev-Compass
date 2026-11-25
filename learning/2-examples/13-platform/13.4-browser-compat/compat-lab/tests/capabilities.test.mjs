import { test } from "node:test";
import assert from "node:assert/strict";
import browserslist from "browserslist";
import { selectCapabilities, createFormatter } from "../capabilities.mjs";
import { formatList } from "../list-fallback.mjs";
test("native capability does not load optional fallback", async () => {
  let loads = 0;
  const f = await createFormatter(
    selectCapabilities({ listFormat: Intl.ListFormat }),
    async () => {
      loads++;
      return { formatList };
    },
  );
  assert.equal(f.mode, "native");
  assert.equal(loads, 0);
  assert.ok(f.format(["a", "b"]).includes("a"));
});
test("injected absent capability loads local fallback once and has bounded contract", async () => {
  let loads = 0;
  const f = await createFormatter(selectCapabilities({}), async () => {
    loads++;
    return { formatList };
  });
  assert.equal(loads, 1);
  assert.equal(f.format(["a", "b"]), "a、b");
  assert.throws(() => f.format(["a", 3]), TypeError);
});
test("Browserslist resolves explicit support policy, not a browser execution proof", () => {
  const list = browserslist(["chrome >= 111", "safari >= 16.4"]);
  assert.ok(list.includes("chrome 111") && list.includes("safari 16.4"));
  assert.throws(() => browserslist("definitely-invalid-browser-query"));
});
