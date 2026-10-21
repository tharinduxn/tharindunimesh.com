import { chromium, expect } from "@playwright/test";

const baseURL = process.env.QA_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "chrome" });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector("#work").scrollIntoView();
  });
  await expect
    .poll(() =>
      page
        .locator("#work [data-reveal]")
        .first()
        .evaluate((el) => el.getAnimations().length),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          [...document.querySelectorAll("[data-reveal]")]
            .flatMap((el) => el.getAnimations())
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact h2")).toBeVisible();
  await context.close();
  const noJS = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const plain = await noJS.newPage();
  await plain.goto(baseURL);
  await expect(plain.locator("h1")).toBeVisible();
  await expect(plain.locator(".project")).toHaveCount(3);
  await plain.locator("summary").click();
  await expect(plain.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await plain.locator("summary").click();
  await plain.goto(`${baseURL}/work/everlife-weddings`);
  await expect(plain.locator(".case-chapter")).toHaveCount(5);
  await expect(plain.locator(".case-chapter").last()).toBeVisible();
  await noJS.close();
  console.log(
    "PASS: reveal runs, live reduced-motion change cancels it, no-JS content/menu/case study remain usable.",
  );
} finally {
  await browser.close();
}
