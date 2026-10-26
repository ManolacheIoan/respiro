/**
 * Validarea formularului de programare și a sumei pentru cardul cadou.
 * Funcții pure (fără DOM), testate cu Vitest în validation.test.ts.
 */
import { holidays, hours, type Weekday } from "@/config/site";
import { services } from "@/data/services";

export const timeSlots = [
  { id: "dimineata", label: "Dimineața (10–12)", from: "10:00", to: "12:00" },
  { id: "pranz", label: "La prânz (12–15)", from: "12:00", to: "15:00" },
  { id: "dupa-amiaza", label: "După-amiaza (15–18)", from: "15:00", to: "18:00" },
  { id: "seara", label: "Seara (18–21)", from: "18:00", to: "21:00" },
  { id: "oricand", label: "Oricând în ziua aleasă", from: "", to: "" },
] as const;

export type TimeSlotId = (typeof timeSlots)[number]["id"];

/** Valoarea pentru „încă nu știu ce serviciu”. */
export const UNDECIDED = "nehotarat";

/** Cât de departe în viitor se poate cere o programare. */
export const MAX_DAYS_AHEAD = 90;

export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  day: string;
  time: string;
  message: string;
  consent: boolean;
  /** Câmp-capcană ascuns pentru roboți; oamenii îl lasă gol. */
  website?: string;
}

export interface ContactData {
  name: string;
  /** Format internațional: +40XXXXXXXXX */
  phone: string;
  email?: string;
  service: string;
  day: string;
  time: TimeSlotId;
  message?: string;
}

export type ContactField = keyof Omit<ContactInput, "website">;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactData; spam: boolean }
  | { ok: false; errors: ContactErrors };

const pad = (n: number) => String(n).padStart(2, "0");

/** Data locală de azi ca „AAAA-LL-ZZ”. */
export const toIsoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Transformă „AAAA-LL-ZZ” în zi UTC; întoarce null pentru date invalide (ex.: 31 februarie). */
function parseIso(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCMonth() === mo - 1 && date.getUTCDate() === d ? date : null;
}

const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000);

export interface DayInfo {
  open: boolean;
  /** Ora de închidere „HH:MM” (dacă e deschis). */
  close?: string;
  openAt?: string;
  reason?: string;
}

/** Programul unei zile calendaristice, ținând cont de sărbători. */
export function dayInfo(iso: string): DayInfo {
  const date = parseIso(iso);
  if (!date) return { open: false, reason: "Data nu este validă." };
  const holiday = holidays.find((h) => h.date === iso);
  if (holiday?.status === "închis") return { open: false, reason: `Pe ${iso.split("-").reverse().join(".")} (${holiday.name}) studioul este închis.` };
  const day = hours.find((h) => h.day === (date.getUTCDay() as Weekday));
  if (!day?.open || !day.close) return { open: false, reason: `${day?.label ?? "În această zi"} studioul este închis.` };
  if (holiday?.status === "program redus" && holiday.hours) {
    const [from, to] = holiday.hours.split("–");
    return { open: true, openAt: from, close: to, reason: `${holiday.name}: program redus, ${holiday.hours}.` };
  }
  return { open: true, openAt: day.open, close: day.close };
}

/** Normalizează un număr românesc la +40XXXXXXXXX; null dacă nu e valid. */
export function normalizePhone(raw: string): string | null {
  const digits = raw.trim().replace(/[\s.\-()/]/g, "");
  let national: string;
  if (/^\+40\d{9}$/.test(digits)) national = digits.slice(3);
  else if (/^0040\d{9}$/.test(digits)) national = digits.slice(4);
  else if (/^0\d{9}$/.test(digits)) national = digits.slice(1);
  else return null;
  // Mobil (7x) sau fix (2x, 3x).
  return /^[237]\d{8}$/.test(national) ? `+40${national}` : null;
}

export function isValidEmail(raw: string): boolean {
  const v = raw.trim();
  return v.length <= 120 && /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(v);
}

const NAME_RE = /^[\p{L}][\p{L}\p{M}' .\-]*$/u;

export function validateContact(input: ContactInput, today: Date = new Date()): ValidationResult {
  const errors: ContactErrors = {};

  const name = input.name.trim().replace(/\s+/g, " ");
  if (!name) errors.name = "Scrie-ne numele tău.";
  else if (name.length < 2) errors.name = "Numele pare prea scurt.";
  else if (name.length > 60) errors.name = "Numele poate avea cel mult 60 de caractere.";
  else if (!NAME_RE.test(name)) errors.name = "Folosește doar litere, spații și cratimă.";

  const phone = normalizePhone(input.phone);
  if (!input.phone.trim()) errors.phone = "Avem nevoie de un număr de telefon ca să confirmăm ora.";
  else if (!phone) errors.phone = "Numărul nu pare corect. Exemplu: 0712 345 678.";

  const email = input.email.trim();
  if (email && !isValidEmail(email)) errors.email = "Adresa de e-mail nu pare corectă (sau lasă câmpul gol).";

  if (!input.service) errors.service = "Alege un serviciu sau „Încă nu știu”.";
  else if (input.service !== UNDECIDED && !services.some((s) => s.id === input.service))
    errors.service = "Alege un serviciu din listă.";

  const date = parseIso(input.day);
  if (!input.day) errors.day = "Alege ziua preferată.";
  else if (!date) errors.day = "Data nu este validă.";
  else {
    const todayUtc = parseIso(toIsoDate(today))!;
    const diff = daysBetween(todayUtc, date);
    const info = dayInfo(input.day);
    if (diff < 0) errors.day = "Ziua aleasă a trecut deja.";
    else if (diff > MAX_DAYS_AHEAD) errors.day = `Primim cereri cu cel mult ${MAX_DAYS_AHEAD} de zile înainte.`;
    else if (!info.open) errors.day = info.reason;
  }

  const slot = timeSlots.find((t) => t.id === input.time);
  if (!input.time) errors.time = "Alege intervalul orar preferat.";
  else if (!slot) errors.time = "Alege un interval din listă.";
  else if (!errors.day && date && slot.from) {
    const info = dayInfo(input.day);
    if (info.close && slot.from >= info.close) errors.time = `În ziua aleasă închidem la ${info.close}. Alege un interval mai devreme.`;
    else if (info.openAt && slot.to <= info.openAt) errors.time = "Intervalul este înainte de deschidere.";
  }

  const message = input.message.trim();
  if (message.length > 1000) errors.message = `Mesajul poate avea cel mult 1000 de caractere (acum: ${message.length}).`;

  if (!input.consent) errors.consent = "Bifează acordul, ca să te putem contacta.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    spam: Boolean(input.website?.trim()),
    data: {
      name,
      phone: phone!,
      ...(email ? { email } : {}),
      service: input.service,
      day: input.day,
      time: slot!.id,
      ...(message ? { message } : {}),
    },
  };
}

/** Sume pentru cardul cadou. */
export const VOUCHER_PRESETS = [150, 250, 400, 600] as const;
export const VOUCHER_MIN = 100;
export const VOUCHER_MAX = 2000;

export function validateVoucherAmount(raw: string | number): { ok: true; value: number } | { ok: false; error: string } {
  const text = String(raw).trim().replace(/\s|lei/gi, "");
  if (!text) return { ok: false, error: "Scrie o sumă." };
  if (!/^\d+$/.test(text)) return { ok: false, error: "Folosește doar cifre, fără zecimale." };
  const value = Number(text);
  if (value < VOUCHER_MIN) return { ok: false, error: `Suma minimă este ${VOUCHER_MIN} lei.` };
  if (value > VOUCHER_MAX) return { ok: false, error: `Suma maximă este ${VOUCHER_MAX} lei.` };
  if (value % 10 !== 0) return { ok: false, error: "Alege o sumă rotundă, multiplu de 10 lei." };
  return { ok: true, value };
}
