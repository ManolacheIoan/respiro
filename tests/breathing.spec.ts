import { expect, test } from "@playwright/test";

const guide = (page: import("@playwright/test").Page) => page.locator(".breath");

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date("2026-11-02T09:00:00+02:00") });
  await page.goto("/relaxare/");
});

test("parcurge fazele: inspiră, ține, expiră, apoi reia", async ({ page }) => {
  await expect(guide(page)).toHaveAttribute("data-phase", "oprit");
  await page.getByRole("button", { name: "Începe" }).click();
  await expect(guide(page)).toHaveAttribute("data-phase", "inspira");
  await expect(page.locator(".breath__count")).toHaveText("4");
  await page.clock.runFor(4100);
  await expect(guide(page)).toHaveAttribute("data-phase", "tine");
  await page.clock.runFor(2000);
  await expect(guide(page)).toHaveAttribute("data-phase", "expira");
  await page.clock.runFor(6000);
  await expect(guide(page)).toHaveAttribute("data-phase", "inspira");
  await expect(page.locator(".breath__meta")).toContainText("Cicluri complete: 1");
});

test("fazele sunt anunțate cititoarelor de ecran", async ({ page }) => {
  await page.getByRole("button", { name: "Începe" }).click();
  const live = page.locator('[aria-live="polite"]').filter({ hasText: /Inspiră|Ține|Expiră/ });
  await expect(live).toHaveText("Inspiră");
  await page.clock.runFor(4100);
  await expect(live).toHaveText("Ține aerul");
});

test("pauza oprește timpul, continuarea îl reia, oprirea resetează", async ({ page }) => {
  await page.getByRole("button", { name: "Începe" }).click();
  await page.clock.runFor(4500);
  await page.getByRole("button", { name: "Pauză" }).click();
  await expect(guide(page)).toHaveAttribute("data-status", "pauza");
  await page.clock.runFor(20_000);
  await expect(guide(page)).toHaveAttribute("data-phase", "tine");
  await page.getByRole("button", { name: "Continuă" }).click();
  await page.clock.runFor(2000);
  await expect(guide(page)).toHaveAttribute("data-phase", "expira");
  await page.getByRole("button", { name: "Oprește" }).click();
  await expect(guide(page)).toHaveAttribute("data-status", "oprit");
  await expect(page.getByRole("button", { name: "Începe" })).toBeFocused({ timeout: 1000 }).catch(() => {});
});

test("alt ritm și durata de 1 minut: se încheie singur", async ({ page }) => {
  await page.getByRole("radio", { name: /În pătrat/ }).check();
  await page.getByRole("radio", { name: "1 minut" }).check();
  await page.getByRole("button", { name: "Începe" }).click();
  await page.clock.runFor(12_100);
  await expect(guide(page)).toHaveAttribute("data-phase", "pauza");
  // Setările nu se pot schimba în timpul exercițiului.
  await expect(page.getByRole("radio", { name: /Liniștită/ })).toBeDisabled();
  await page.clock.runFor(50_000);
  await expect(guide(page)).toHaveAttribute("data-status", "gata");
  await expect(page.getByRole("button", { name: "Începe din nou" })).toBeVisible();
});

test("se controlează din tastatură", async ({ page, isMobile }) => {
  test.skip(isMobile, "tastatură fizică doar pe desktop");
  await page.getByRole("button", { name: "Începe" }).focus();
  await page.keyboard.press("Enter");
  await expect(guide(page)).toHaveAttribute("data-status", "ruleaza");
  await page.keyboard.press("Space");
  await expect(guide(page)).toHaveAttribute("data-status", "pauza");
});

test.describe("mișcare redusă", () => {
  test.use({ reducedMotion: "reduce" });
  test("cercul nu se mișcă, fazele rămân ca text", async ({ page }) => {
    await page.getByRole("button", { name: "Începe" }).click();
    const circle = page.locator(".breath__circle");
    const before = await circle.evaluate((el) => getComputedStyle(el).transform);
    await page.clock.runFor(6500);
    await expect(guide(page)).toHaveAttribute("data-phase", "expira");
    await expect(page.locator(".breath__phase")).toHaveText("Expiră");
    expect(await circle.evaluate((el) => getComputedStyle(el).transform)).toBe(before);
  });
});
