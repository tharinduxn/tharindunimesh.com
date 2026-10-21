import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.QA_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || 'chrome' });
const findings = [];
const failures = [];
await mkdir('.qa', { recursive: true });

try {
  const discovery = await browser.newPage();
  await discovery.goto(baseURL);
  const routes = ['/', ...await discovery.locator('a[href^="/work/"]').evaluateAll(links => [...new Set(links.map(a => a.getAttribute('href')))])];
  await discovery.close();
  for (const route of routes) {
    for (const width of route === '/' ? [320, 360, 390, 768, 1024, 1440] : [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => failures.push(`${route} ${width}: ${error.message}`));
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
      if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 45));
        }
      });
      await page.waitForTimeout(200);
      await page.evaluate(() => window.scrollTo(0, 0));
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')),
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
        headings: document.querySelectorAll('h1').length,
      }));
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      const result = { route, width, ...layout, violations: accessibility.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(n => n.target) })) };
      findings.push(result);
      if (layout.overflow || layout.brokenImages.length || layout.brokenAnchors.length || layout.headings !== 1 || result.violations.length) failures.push(JSON.stringify(result));
      if ([390, 1440].includes(width)) await page.screenshot({ path: `.qa/${route.replaceAll('/', '-') || 'home'}-${width}.png`, fullPage: true });
      await context.close();
    }
  }
  await writeFile('.qa/browser-results.json', JSON.stringify(findings, null, 2));
  console.log(`${findings.length} responsive/accessibility checks across ${routes.length} route(s).`);
  if (failures.length) throw new Error(failures.join('\n'));
  console.log('PASS: no overflow, broken anchors/images, page errors, or axe WCAG violations.');
} finally {
  await browser.close();
}
