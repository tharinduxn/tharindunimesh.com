import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { chromium } from '@playwright/test';
import { createServer } from 'node:net';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.QA_URL || 'http://127.0.0.1:3001';
await mkdir('.qa', { recursive: true });
const summary = [];
// Run profiles serially: simultaneous browser audits distort CPU measurements.
for (const profile of ['mobile', 'desktop']) {
  const socket = createServer();
  await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const browser = await chromium.launch({
    channel: process.env.QA_BROWSER || 'chrome',
    args: [`--remote-debugging-port=${port}`, '--remote-debugging-address=127.0.0.1'],
  });
  try {
    const result = await lighthouse(url, {
      port, output: ['json', 'html'], logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }, profile === 'desktop' ? desktopConfig : undefined);
    if (!result) throw new Error(`Lighthouse returned no ${profile} report`);
    await writeFile(`.qa/lighthouse-${profile}.json`, result.report[0]);
    await writeFile(`.qa/lighthouse-${profile}.html`, result.report[1]);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    const metrics = Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift'].map(key => [key, result.lhr.audits[key].displayValue]));
    summary.push({ profile, scores, metrics });
    console.log(JSON.stringify({ profile, scores, metrics }, null, 2));
    if (scores.performance < 95 || scores.accessibility < 100) process.exitCode = 1;
  } finally { await browser.close(); }
}
await writeFile('.qa/lighthouse-summary.json', JSON.stringify(summary, null, 2));
