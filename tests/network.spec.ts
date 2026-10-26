import { expect, test } from "@playwright/test";
import { expectOnlyLocalRequests, fillValid, freezeClock, pages, submit } from "./helpers";

test("nicio cerere externă pe nicio pagină și niciun cookie", async ({ page, context }) => {
  const urls: string[] = [];
  page.on("request", (r) => urls.push(r.url()));
  for (const path of [...pages, "/pagina-inexistenta/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    // Derulare până jos, ca să se încarce tot ce apare la derulare.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(150);
  }
  expect(urls.length).toBeGreaterThan(pages.length);
  await expectOnlyLocalRequests(urls);
  expect(await context.cookies()).toEqual([]);
});

test("formularul, cardul cadou și ghidul nu fac cereri externe", async ({ page }) => {
  await freezeClock(page);
  const urls: string[] = [];
  page.on("request", (r) => urls.push(r.url()));
  await page.goto("/programare/");
  await fillValid(page);
  await submit(page);
  await expect(page.locator(".done")).toBeVisible();

  await page.goto("/card-cadou/");
  await page.getByRole("radio", { name: "600 lei" }).check();
  await page.getByLabel(/^Pentru/).fill("Maria");

  await page.goto("/relaxare/");
  await page.getByRole("button", { name: "Începe" }).click();
  await expectOnlyLocalRequests(urls);
});

test("niciun script sau stil de pe alt domeniu în HTML", async ({ request }) => {
  for (const path of pages) {
    const html = await (await request.get(path)).text();
    const srcs = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
    const external = srcs.filter((u) => !u.startsWith("https://wa.me/"));
    expect(external, path).toEqual([]);
  }
});
