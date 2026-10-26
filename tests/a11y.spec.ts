import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { freezeClock, pages, submit, fillValid } from "./helpers";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const audit = async (page: Page) =>
  (await new AxeBuilder({ page }).withTags(tags).analyze()).violations.map(
    (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
  );

test.use({ reducedMotion: "reduce" });

for (const path of [...pages, "/pagina-inexistenta/"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await audit(page)).toEqual([]);
  });
}

test("axe: formularul cu erori și starea de succes", async ({ page }) => {
  await freezeClock(page);
  await page.goto("/programare/");
  await submit(page);
  await expect(page.locator(".alert--error")).toBeVisible();
  expect(await audit(page)).toEqual([]);
  await fillValid(page);
  await submit(page);
  await expect(page.getByRole("heading", { name: /Cererea ta e pregătită/ })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: card cadou cu sumă greșită", async ({ page }) => {
  await page.goto("/card-cadou/");
  await page.getByRole("radio", { name: "Altă sumă" }).check();
  await page.getByLabel("Suma dorită (lei)").fill("55");
  await expect(page.getByText("Suma minimă este 100 lei.")).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: ghidul de respirație pornit", async ({ page }) => {
  await page.goto("/relaxare/");
  await page.getByRole("button", { name: "Începe" }).click();
  await expect(page.getByRole("button", { name: "Pauză" })).toBeVisible();
  expect(await audit(page)).toEqual([]);
});

test("axe: meniul deschis pe telefon", async ({ page, isMobile }) => {
  test.skip(!isMobile, "doar pe telefon");
  await page.goto("/");
  await page.getByRole("button", { name: "Meniu" }).click();
  expect(await audit(page)).toEqual([]);
});
