import { expect, test } from "@playwright/test";
test("SFC, model, store, cache, focus, watch, route and navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByTestId("summary")).toHaveText("已完成 0；显示 2");
  await page.getByRole("button", { name: "切换完成 1", exact: true }).click();
  await expect(page.getByTestId("summary")).toHaveText("已完成 1；显示 2");
  await page.getByLabel("草稿 1").fill("<b>draft</b>");
  await expect(page.locator("article").first()).toContainText(
    "草稿：<b>draft</b>",
  );
  await expect(page.locator("article b")).toHaveCount(0);
  await page.getByRole("button", { name: "注入主题：light" }).click();
  await expect(page.locator("[data-theme]")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page.getByRole("button", { name: "缓存计数 0" }).click();
  await page.getByRole("button", { name: "笔记面板", exact: true }).click();
  await page.getByLabel("缓存笔记").fill("preserved");
  await page.getByRole("button", { name: "计数面板", exact: true }).click();
  await expect(page.getByRole("button", { name: "缓存计数 1" })).toBeVisible();
  await expect(page.getByTestId("lifecycle")).toContainText("deactivated");
  await page.getByRole("button", { name: "显示并聚焦输入" }).click();
  await expect(page.getByLabel("聚焦目标")).toBeFocused();
  await page.getByLabel("模拟查询（error/empty/slow）").fill("error");
  await expect(page.getByTestId("search-status")).toContainText("error");
  await page.getByLabel("模拟查询（error/empty/slow）").fill("empty");
  await expect(page.getByTestId("search-status")).toContainText("empty");
  await page.getByLabel("模拟查询（error/empty/slow）").fill("recovered");
  await expect(page.getByTestId("search-status")).toContainText(
    "success：结果：recovered",
  );
  await page.getByRole("link", { name: "详情1", exact: true }).click();
  await expect(page.getByTestId("detail")).toContainText("已完成");
  await page.getByRole("link", { name: "详情2", exact: true }).click();
  await expect(page.getByRole("heading", { name: "动态详情 2" })).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("detail")).toContainText("路由与状态");
  await page.getByRole("link", { name: "受限演示" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "客户端守卫" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false);
  expect(errors).toEqual([]);
});
