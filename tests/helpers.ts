import { expect, type Page } from "@playwright/test";

export const pages = [
  "/",
  "/servicii/",
  "/despre-masaj/",
  "/echipa/",
  "/program/",
  "/card-cadou/",
  "/relaxare/",
  "/programare/",
  "/contact/",
  "/intrebari-frecvente/",
  "/confidentialitate/",
];

/** Luni, 2 noiembrie 2026, 08:00 ora României: aceleași date la fiecare rulare. */
export const FIXED_NOW = new Date("2026-11-02T08:00:00+02:00");

export const freezeClock = (page: Page) => page.clock.setFixedTime(FIXED_NOW);

export const submit = (page: Page) => page.getByRole("button", { name: "Trimite cererea" }).click();

/** Completează un formular valid (miercuri, 4 noiembrie 2026, la prânz). */
export async function fillValid(page: Page) {
  await page.getByLabel(/^Nume și prenume/).fill("Ana Popescu");
  await page.getByLabel(/^Telefon/).fill("0712 345 678");
  await page.getByLabel(/^Serviciu/).selectOption("relaxare");
  await page.getByLabel(/^Ziua preferată/).fill("2026-11-04");
  await page.getByLabel(/^Interval orar/).selectOption("pranz");
  await page.getByRole("checkbox", { name: /Sunt de acord/ }).check();
}

export async function expectOnlyLocalRequests(urls: string[]) {
  const external = urls.filter((u) => !/^(https?:\/\/localhost:\d+|data:|blob:|about:)/.test(u));
  expect(external).toEqual([]);
}
