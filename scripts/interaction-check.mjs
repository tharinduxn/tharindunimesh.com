import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const baseURL = process.env.QA_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "chrome" });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    permissions: ["clipboard-read", "clipboard-write"],
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("tharinduxn@gmail.com");
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Denied")),
      configurable: true,
    });
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Couldn’t copy.");
  await expect(page.locator(".contact-email > a")).toHaveAttribute(
    "href",
    "mailto:tharinduxn@gmail.com",
  );
  const menu = page.locator(".mobile-menu");
  const toggle = menu.locator("summary");
  await toggle.click();
  await expect(menu).toHaveAttribute("open", "");
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(mobileAxe.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(toggle).toBeFocused();
  await toggle.press("Enter");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "02 About" })
    .click();
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about")).toBeFocused();
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Work" })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await context.close();
  console.log(
    "PASS: skip link, clipboard success/failure, email destination, mobile menu accessibility, Escape/focus, section navigation, desktop resize.",
  );
} finally {
  await browser.close();
}
