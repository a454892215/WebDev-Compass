import { chromium, expect } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
import { start } from "./server.mjs";
const server = await start();
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const records = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const page = await context.newPage();
    try {
      const violations = [];
      page.on("console", (m) => {
        if (
          m.type() === "error" &&
          /Content Security Policy|script-src/i.test(m.text())
        )
          violations.push(m.text());
      });
      await page.goto("http://127.0.0.1:4503/security.html");
      await expect(page.locator("#result")).toHaveText(
        "Text and sanitized HTML ready",
      );
      await expect(page.locator("#text img")).toHaveCount(0);
      await expect(page.locator("#rich b")).toHaveText("Allowed bold");
      await expect(page.locator("#rich img,#rich script,#rich a")).toHaveCount(
        0,
      );
      expect(await page.evaluate(() => window.xssMarker)).toBeUndefined();
      expect(await page.evaluate(() => window.inlineMarker)).toBeUndefined();
      await expect.poll(() => violations.length).toBeGreaterThan(0);
      records.push({
        width,
        name: "text output, DOMPurify and CSP",
        passed: true,
      });
      const csrf = await page.evaluate(async () => {
        const { csrf } = await (await fetch("/api/session")).json();
        return csrf;
      });
      expect(
        await page.evaluate(
          async (token) =>
            (
              await fetch("/api/change", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRF-Token": token,
                },
                body: "{}",
              })
            ).status,
          csrf,
        ),
      ).toBe(200);
      expect(
        await page.evaluate(
          async () =>
            (
              await fetch("/api/change", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: "{}",
              })
            ).status,
        ),
      ).toBe(403);
      const count = await page.evaluate(
        async () => (await (await fetch("/api/stats")).json()).changes,
      );
      const denied = [];
      page.on("console", (m) => {
        if (/frame-ancestors|X-Frame-Options/i.test(m.text()))
          denied.push(m.text());
      });
      await page.goto("http://127.0.0.1:4504");
      await expect(page.locator("#messages")).toContainText("/allowed-frame");
      await expect.poll(() => denied.length).toBeGreaterThan(0);
      expect(await page.evaluate(() => window.loaded)).not.toContain(
        "/protected",
      );
      const cross = await page.evaluate(async () => {
        let wrong, correct, write;
        try {
          wrong = await (
            await fetch("http://127.0.0.1:4503/cors-wrong", {
              credentials: "include",
            })
          ).json();
        } catch {
          wrong = "blocked";
        }
        try {
          correct = await (
            await fetch("http://127.0.0.1:4503/cors-correct", {
              credentials: "include",
            })
          ).json();
        } catch {
          correct = "blocked";
        }
        try {
          write = (
            await fetch("http://127.0.0.1:4503/api/change", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "text/plain" },
              body: "ignored",
            })
          ).status;
        } catch {
          write = "unreadable";
        }
        return { wrong, correct, write };
      });
      expect(cross.wrong.demoPrivate).toBe("ONLY_LOCAL_FIXTURE");
      expect(cross.correct).toBe("blocked");
      await page.goto("http://127.0.0.1:4503/security.html");
      expect(
        await page.evaluate(
          async () => (await (await fetch("/api/stats")).json()).changes,
        ),
      ).toBe(count);
      records.push({
        width,
        name: "frame-ancestors, CSRF and CORS misconfiguration",
        passed: true,
      });
      await page.goto("http://127.0.0.1:4503/");
      await expect(page.locator("#greeting")).toHaveText("Hello, Ada");
      await page.getByLabel("Language").selectOption("ar");
      await expect(page.locator("html")).toHaveAttribute("lang", "ar");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.locator("#greeting")).toHaveText("مرحبًا، Ada");
      await expect(page.locator("#fallback")).toHaveText("Fallback message");
      const a = await page.locator(".start").boundingBox(),
        z = await page.locator(".end").boundingBox();
      expect(a.x).toBeGreaterThan(z.x);
      await page.getByLabel("Language").selectOption("en");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
      ).toBe(false);
      records.push({
        width,
        name: "vue-i18n, fallback, Intl and RTL logical layout",
        passed: true,
      });
    } finally {
      await context.close();
    }
  }
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/browser.json",
    JSON.stringify(
      {
        date: "2026-11-25",
        passed: records.length,
        checks: records,
        scope:
          "headless Chrome local fixtures; not production security or full SSR",
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ passed: records.length, checks: records }, null, 2),
  );
} finally {
  await browser.close();
  await server.close();
}
