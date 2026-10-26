import { describe, expect, it } from "vitest";
import {
  dayInfo,
  isValidEmail,
  normalizePhone,
  toIsoDate,
  UNDECIDED,
  validateContact,
  validateVoucherAmount,
  type ContactInput,
} from "./validation";

/** Luni, 2 noiembrie 2026. */
const TODAY = new Date(2026, 10, 2, 9, 0);

const valid: ContactInput = {
  name: "Ana Popescu",
  phone: "0712 345 678",
  email: "",
  service: "relaxare",
  day: "2026-11-04",
  time: "pranz",
  message: "",
  consent: true,
};
const check = (patch: Partial<ContactInput>) => validateContact({ ...valid, ...patch }, TODAY);
const errorsOf = (patch: Partial<ContactInput>) => {
  const r = check(patch);
  return r.ok ? {} : r.errors;
};

describe("normalizePhone", () => {
  it.each([
    ["0712 345 678", "+40712345678"],
    ["0712.345.678", "+40712345678"],
    ["+40 712 345 678", "+40712345678"],
    ["0040712345678", "+40712345678"],
    ["(021) 312 34 56", "+40213123456"],
    ["0341-123-456", "+40341123456"],
  ])("acceptă %s", (raw, out) => expect(normalizePhone(raw)).toBe(out));

  it.each(["", "12345", "0812345678", "071234567", "07123456789", "+4412345678", "07l2345678"])(
    "respinge %s",
    (raw) => expect(normalizePhone(raw)).toBeNull(),
  );
});

describe("isValidEmail", () => {
  it("acceptă adrese obișnuite", () => {
    expect(isValidEmail("ana@exemplu.ro")).toBe(true);
    expect(isValidEmail(" ana.pop+spa@mail.example.com ")).toBe(true);
  });
  it("respinge adrese greșite", () => {
    for (const e of ["ana", "ana@", "ana@ro", "ana @x.ro", "ana@x..ro", `${"a".repeat(120)}@x.ro`])
      expect(isValidEmail(e)).toBe(false);
  });
});

describe("dayInfo", () => {
  it("zile lucrătoare, sâmbătă și duminică", () => {
    expect(dayInfo("2026-11-04")).toMatchObject({ open: true, close: "21:00" });
    expect(dayInfo("2026-11-07")).toMatchObject({ open: true, close: "18:00" });
    expect(dayInfo("2026-11-08").open).toBe(false);
  });
  it("sărbători închise și cu program redus", () => {
    expect(dayInfo("2026-12-01")).toMatchObject({ open: false });
    expect(dayInfo("2026-12-01").reason).toContain("Ziua Națională");
    expect(dayInfo("2026-12-24")).toMatchObject({ open: true, close: "15:00" });
  });
  it("date invalide", () => {
    expect(dayInfo("2026-02-30").open).toBe(false);
    expect(dayInfo("mâine").open).toBe(false);
  });
});

describe("validateContact", () => {
  it("acceptă un formular complet și normalizează datele", () => {
    const r = check({ name: "  Ana   Popescu ", email: " ana@exemplu.ro ", message: "  Prima vizită " });
    expect(r).toEqual({
      ok: true,
      spam: false,
      data: {
        name: "Ana Popescu",
        phone: "+40712345678",
        email: "ana@exemplu.ro",
        service: "relaxare",
        day: "2026-11-04",
        time: "pranz",
        message: "Prima vizită",
      },
    });
  });

  it("e-mailul și mesajul sunt opționale (nu apar în date dacă lipsesc)", () => {
    const r = check({});
    expect(r.ok && r.data).not.toHaveProperty("email");
    expect(r.ok && r.data).not.toHaveProperty("message");
  });

  it("raportează toate câmpurile obligatorii goale", () => {
    const e = errorsOf({ name: "", phone: "", service: "", day: "", time: "", consent: false });
    expect(Object.keys(e).sort()).toEqual(["consent", "day", "name", "phone", "service", "time"]);
  });

  it("nume", () => {
    expect(errorsOf({ name: "A" }).name).toMatch(/scurt/);
    expect(errorsOf({ name: "x".repeat(61) }).name).toMatch(/60/);
    expect(errorsOf({ name: "Ana123" }).name).toMatch(/litere/);
    expect(errorsOf({ name: "Ștefania Țurcanu-Ionescu" }).name).toBeUndefined();
    expect(errorsOf({ name: "D'Angelo Ioan" }).name).toBeUndefined();
  });

  it("telefon și e-mail", () => {
    expect(errorsOf({ phone: "123" }).phone).toMatch(/Exemplu/);
    expect(errorsOf({ email: "ana@" }).email).toMatch(/e-mail/);
  });

  it("serviciu: din listă sau „încă nu știu”", () => {
    expect(errorsOf({ service: UNDECIDED }).service).toBeUndefined();
    expect(errorsOf({ service: "masaj-inventat" }).service).toMatch(/listă/);
  });

  it("zi: nu în trecut, nu prea departe, nu în zilele închise", () => {
    expect(errorsOf({ day: toIsoDate(TODAY) }).day).toBeUndefined();
    expect(errorsOf({ day: "2026-11-01" }).day).toMatch(/trecut/);
    expect(errorsOf({ day: "2027-02-05" }).day).toMatch(/90/);
    expect(errorsOf({ day: "2026-11-08" }).day).toMatch(/Duminică/);
    expect(errorsOf({ day: "2026-11-30" }).day).toMatch(/Sfântul Andrei/);
    expect(errorsOf({ day: "2026-02-30" }).day).toMatch(/validă/);
  });

  it("interval: trebuie să încapă în programul zilei", () => {
    expect(errorsOf({ day: "2026-11-07", time: "seara" }).time).toMatch(/18:00/);
    expect(errorsOf({ day: "2026-12-24", time: "dupa-amiaza" }).time).toMatch(/15:00/);
    expect(errorsOf({ day: "2026-12-24", time: "pranz" }).time).toBeUndefined();
    expect(errorsOf({ day: "2026-11-07", time: "oricand" }).time).toBeUndefined();
    expect(errorsOf({ time: "noaptea" }).time).toMatch(/listă/);
  });

  it("mesaj de cel mult 1000 de caractere", () => {
    expect(errorsOf({ message: "a".repeat(1000) }).message).toBeUndefined();
    expect(errorsOf({ message: "a".repeat(1001) }).message).toMatch(/1001/);
  });

  it("acordul este obligatoriu", () => {
    expect(errorsOf({ consent: false }).consent).toBeDefined();
  });

  it("câmpul-capcană completat marchează cererea ca spam, fără a afișa erori", () => {
    const r = check({ website: "http://spam.example" });
    expect(r).toMatchObject({ ok: true, spam: true });
  });
});

describe("validateVoucherAmount", () => {
  it("acceptă sume rotunde între 100 și 2000 lei", () => {
    expect(validateVoucherAmount(250)).toEqual({ ok: true, value: 250 });
    expect(validateVoucherAmount(" 1 200 lei ")).toEqual({ ok: true, value: 1200 });
  });
  it.each([
    ["", /Scrie/],
    ["abc", /cifre/],
    ["99,5", /cifre/],
    ["90", /minimă/],
    ["2010", /maximă/],
    ["255", /multiplu/],
  ])("respinge %s", (raw, msg) => {
    const r = validateVoucherAmount(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(msg);
  });
});
