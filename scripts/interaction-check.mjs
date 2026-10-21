import { chromium, expect } from '@playwright/test';

const baseURL = process.env.QA_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Email copied to clipboard.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('tharinduxn@gmail.com');
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('Denied')), configurable: true }); });
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toContainText('Couldn’t copy.');
  await expect(page.locator('.contact-email > a')).toHaveAttribute('href', 'mailto:tharinduxn@gmail.com');
  await context.close();
  console.log('PASS: keyboard skip link, copy success, denied clipboard fallback, email destination.');
} finally { await browser.close(); }
