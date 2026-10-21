import { chromium, expect } from "@playwright/test";

const baseURL = process.env.QA_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: process.env.QA_BROWSER || "chrome" });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  // Record real Web Animations calls so short transitions cannot finish between assertions.
  await page.addInitScript(() => {
    window.pageEntrances = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args) {
      if (this.hasAttribute("data-page-enter")) window.pageEntrances.push(this.textContent);
      return animate.apply(this, args);
    };
  });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.mouse.wheel(0, 120);
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(120);
  await expect(page.locator("html")).not.toHaveClass(/lenis-smooth/);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelectorAll(".project-visual")[1].scrollIntoView();
  });
  await expect
    .poll(() =>
      page
        .locator(".project[data-reveal]")
        .nth(1)
        .evaluate((el) => el.getAnimations().length),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      page
        .locator(".project-visual img")
        .nth(2)
        .evaluate((image) => image.style.transform),
    )
    .not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator(".project-visual img").nth(2)).not.toHaveAttribute(
    "style",
    /transform/,
  );
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
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".project h3 a").first().click();
  await expect
    .poll(() => page.evaluate(() => window.pageEntrances.join(" ")))
    .toContain("Everlife Weddings");
  await page.locator(".case-next > a").first().click();
  await expect(page).toHaveURL(/go-surf-sri-lanka/);
  await expect
    .poll(() => page.evaluate(() => window.pageEntrances.join(" ")))
    .toContain("Go Surf Sri Lanka");
  await page.goBack();
  await expect(page).toHaveURL(/everlife-weddings/);
  await expect(page.locator("h1")).toContainText("Everlife Weddings");
  await context.close();
  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const mobile = await touch.newPage();
  await mobile.goto(baseURL, { waitUntil: "networkidle" });
  await mobile.mouse.wheel(0, 300);
  await expect(mobile.locator("html")).not.toHaveClass(/lenis/);
  await touch.close();
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
    "PASS: Framer reveals and route entrances, GSAP imagery, Lenis wheel scrolling, live reduced-motion cleanup, touch fallback, history navigation, and no-JS content/menu/case study.",
  );
} finally {
  await browser.close();
}
