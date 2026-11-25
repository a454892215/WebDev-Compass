import { test, expect } from "@playwright/test";
test("semantic field and native modal across configured engines", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("合成名称", { exact: true }).fill("matrix fixture");
  await page.getByRole("button", { name: "保存样本", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("样本已保存");
  await page.getByRole("button", { name: "打开说明" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "打开说明" })).toBeFocused();
});
