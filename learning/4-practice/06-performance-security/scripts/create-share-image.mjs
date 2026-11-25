import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const svg = await readFile('public/images/course-hero.svg', 'utf8')
  await page.setContent(
    `<html><body style="margin:0"><div id="cover" style="width:1200px;height:630px;display:grid;place-items:center;background:#dce7ff">${svg}</div></body></html>`,
  )
  await page.locator('#cover').screenshot({ path: 'public/images/og-cover.png' })
} finally {
  await browser.close()
}
