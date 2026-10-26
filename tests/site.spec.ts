import { expect, test } from "@playwright/test";
import { BUSINESS_NAME, nav } from "../config/site";
import { pages } from "./helpers";

test("fiecare pagină are titlu, un singur h1, noindex și limba română", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(new RegExp(BUSINESS_NAME));
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ro");
  }
});

test("meniul principal duce la toate paginile", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const item of nav) {
    if (isMobile) await page.getByRole("button", { name: "Meniu" }).click();
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${item.href}$`));
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("meniul de pe telefon se închide cu Escape și focusul revine", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Meniu" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("bara „Sună acum / Programează-te” apare doar pe telefon", async ({ page, isMobile }) => {
  await page.goto("/servicii/");
  const bar = page.locator(".callbar");
  if (isMobile) {
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link", { name: "Sună acum" })).toHaveAttribute("href", /^tel:\+40/);
    await expect(bar.getByRole("link", { name: "Programează-te" })).toHaveAttribute("href", "/programare/");
  } else {
    await expect(bar).toBeHidden();
  }
});

test("legătura „Sari la conținut” e prima oprire de tastatură", async ({ page, isMobile }) => {
  test.skip(isMobile, "tastatură fizică doar pe desktop");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Sari la conținut" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("cardul cadou: suma și dedicația apar în previzualizare", async ({ page }) => {
  await page.goto("/card-cadou/");
  const card = page.locator(".print-area .voucher");
  await expect(card).toContainText("250 lei");
  await page.getByRole("radio", { name: "400 lei" }).check();
  await expect(card).toContainText("400 lei");
  await page.getByRole("radio", { name: "Altă sumă" }).check();
  await page.getByLabel("Suma dorită (lei)").fill("255");
  await expect(page.getByText("Alege o sumă rotundă, multiplu de 10 lei.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Tipărește previzualizarea" })).toBeDisabled();
  await page.getByLabel("Suma dorită (lei)").fill("350");
  await expect(card).toContainText("350 lei");
  await page.getByLabel(/^Pentru/).fill("Maria");
  await page.getByLabel(/^De la/).fill("Andrei");
  await page.getByLabel(/^Dedicație/).fill("La mulți ani!");
  await expect(card).toContainText("Maria");
  await expect(card).toContainText("„La mulți ani!”");
  const wa = await page.getByRole("link", { name: "Rezervă cardul pe WhatsApp" }).getAttribute("href");
  expect(decodeURIComponent(wa!)).toContain("350 lei");
});

test("cardul cadou se tipărește singur, fără restul paginii", async ({ page }) => {
  await page.goto("/card-cadou/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".print-area .voucher")).toBeVisible();
  await expect(page.locator(".site-header")).toBeHidden();
  await expect(page.locator(".builder__form")).toHaveCSS("visibility", "hidden");
});

test("404: pagină prietenoasă cu legături", async ({ page }) => {
  const res = await page.goto("/nu-exista/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pagina s-a pierdut printre frunze");
  await page.getByRole("link", { name: "Înapoi acasă" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("fără salt de layout la încărcarea paginii principale", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const cls = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[])
            if (!e.hadRecentInput) total += e.value;
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(total), 500);
      }),
  );
  expect(cls).toBeLessThan(0.02);
});

test("fără derulare orizontală pe ecrane înguste (320 px)", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const path of [...pages, "/pagina-inexistenta/"]) {
    await page.goto(path);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, path).toBeLessThanOrEqual(320);
  }
});
