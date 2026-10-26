import { expect, test } from "@playwright/test";
import { expectOnlyLocalRequests, fillValid, freezeClock, submit } from "./helpers";

test.beforeEach(async ({ page }) => {
  await freezeClock(page);
});

test("trimis gol: rezumat de erori cu focus și mesaje lângă câmpuri", async ({ page }) => {
  await page.goto("/programare/");
  await submit(page);
  const summary = page.locator(".alert--error");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Mai sunt 6 câmpuri de corectat");
  await expect(page.getByLabel(/^Nume și prenume/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel(/^Telefon/)).toHaveAccessibleDescription(/Avem nevoie de un număr/);
  // Linkul din rezumat duce la câmp.
  await summary.getByRole("link", { name: /^Telefon/ }).click();
  await expect(page).toHaveURL(/#.+phone$/);
  await expect(page.getByLabel(/^E-mail/)).not.toHaveAttribute("aria-invalid", "true");
});

test("erorile dispar pe măsură ce sunt corectate", async ({ page }) => {
  await page.goto("/programare/");
  await submit(page);
  await page.getByLabel(/^Nume și prenume/).fill("Ana Popescu");
  await expect(page.getByLabel(/^Nume și prenume/)).not.toHaveAttribute("aria-invalid", "true");
  await expect(page.locator(".alert--error")).toContainText("Mai sunt 5 câmpuri");
});

test("validări specifice: telefon, e-mail, zi închisă, interval după închidere", async ({ page }) => {
  await page.goto("/programare/");
  await fillValid(page);
  await page.getByLabel(/^Telefon/).fill("12345");
  await page.getByLabel(/^E-mail/).fill("ana@");
  await page.getByLabel(/^Ziua preferată/).fill("2026-11-08");
  await submit(page);
  await expect(page.getByText("Numărul nu pare corect. Exemplu: 0712 345 678.").last()).toBeVisible();
  await expect(page.getByText(/Adresa de e-mail nu pare corectă/).last()).toBeVisible();
  await expect(page.getByText("Duminică studioul este închis.").last()).toBeVisible();

  await page.getByLabel(/^Telefon/).fill("0712345678");
  await page.getByLabel(/^E-mail/).fill("");
  await page.getByLabel(/^Ziua preferată/).fill("2026-11-07");
  await expect(page.getByText("Program în ziua aleasă: 10:00–18:00.")).toBeVisible();
  await page.getByLabel(/^Interval orar/).selectOption("seara");
  await submit(page);
  await expect(page.getByText(/închidem la 18:00/).last()).toBeVisible();
});

test("serviciul vine preselectat din pagina de servicii", async ({ page }) => {
  await page.goto("/servicii/");
  await page.getByRole("link", { name: "Programează-te: Masaj cu pietre calde" }).click();
  await expect(page).toHaveURL(/\/programare\/\?serviciu=pietre-calde/);
  await expect(page.getByLabel(/^Serviciu/)).toHaveValue("pietre-calde");
});

test("succes onest în demo: nimic trimis, rezervă cu WhatsApp, apel, SMS și e-mail", async ({ page }) => {
  const requests: { url: string; method: string }[] = [];
  await page.goto("/programare/");
  page.on("request", (r) => requests.push({ url: r.url(), method: r.method() }));
  await fillValid(page);
  await page.getByLabel(/^Mesaj/).fill("Prima vizită");
  await submit(page);

  const heading = page.getByRole("heading", { name: "Cererea ta e pregătită. Mai e un pas" });
  await expect(heading).toBeFocused();
  await expect(page.getByText("nu a trimis")).toBeVisible();
  await expect(page.locator(".done")).toHaveAttribute("data-result", "local");
  await expect(page.locator(".done__summary")).toContainText("+40712345678");
  await expect(page.locator(".done__summary")).toContainText("miercuri, 4 noiembrie");

  const wa = await page.getByRole("link", { name: "Trimite pe WhatsApp" }).getAttribute("href");
  expect(wa).toMatch(/^https:\/\/wa\.me\/40712345678\?text=/);
  expect(decodeURIComponent(wa!.split("text=")[1])).toContain("Mesaj: Prima vizită");
  await expect(page.getByRole("link", { name: /^Sună/ }).first()).toHaveAttribute("href", "tel:+40712345678");
  await expect(page.getByRole("link", { name: "SMS" })).toHaveAttribute("href", /^sms:\+40712345678\?body=/);
  await expect(page.getByRole("link", { name: "E-mail" })).toHaveAttribute("href", /^mailto:/);

  // Nimic trimis: nicio cerere POST și nicio cerere spre alt domeniu
  // (Next poate preîncărca local paginile din linkuri, prin GET sau HEAD).
  await expectOnlyLocalRequests(requests.map((r) => r.url));
  expect(requests.filter((r) => !["GET", "HEAD"].includes(r.method))).toEqual([]);

  // „Modifică cererea” readuce formularul cu datele păstrate.
  await page.getByRole("button", { name: "Modifică cererea" }).click();
  await expect(page.getByLabel(/^Nume și prenume/)).toHaveValue("Ana Popescu");
});

test("formularul se poate completa doar din tastatură", async ({ page, isMobile }) => {
  test.skip(isMobile, "tastatură fizică doar pe desktop");
  await page.goto("/programare/");
  await page.getByLabel(/^Nume și prenume/).focus();
  await page.keyboard.type("Ion Pop");
  await page.keyboard.press("Tab");
  await page.keyboard.type("0722123456");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/^Serviciu/)).toBeFocused();
  await page.getByLabel(/^Serviciu/).selectOption("sportiv");
  await page.keyboard.press("Tab");
  await expect(page.getByLabel(/^Ziua preferată/)).toBeFocused();
  await page.getByLabel(/^Ziua preferată/).fill("2026-11-05");
  await page.getByLabel(/^Interval orar/).focus();
  await page.getByLabel(/^Interval orar/).selectOption("oricand");
  await page.getByRole("checkbox", { name: /Sunt de acord/ }).focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Trimite cererea" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /Cererea ta e pregătită/ })).toBeFocused();
});

test("câmpul-capcană e ascuns și nu primește focus", async ({ page }) => {
  await page.goto("/programare/");
  const hp = page.locator('input[name="website"]');
  await expect(hp).toHaveAttribute("tabindex", "-1");
  await expect(hp).not.toBeInViewport();
});
