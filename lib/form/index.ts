/**
 * Adaptorul formularului de programare.
 *
 * Contract: `send(cerere)` întoarce mereu un rezultat (nu aruncă erori):
 *   - { status: "sent" }   cererea a ajuns la serviciul configurat;
 *   - { status: "local" }  modul demo: nimic nu a plecat din browser;
 *   - { status: "error" }  serviciul a răspuns cu eroare sau nu a răspuns.
 *
 * Alegerea se face după NEXT_PUBLIC_FORM_ENDPOINT (vezi config/site.ts și README).
 * Pentru alt furnizor (ex.: propriul API care trimite e-mail), scrie o funcție
 * nouă care respectă același contract și întoarce-o din getFormAdapter().
 */
import { BUSINESS_NAME, site } from "@/config/site";
import { serviceById } from "@/data/services";
import { timeSlots, UNDECIDED, type ContactData } from "@/lib/validation";

export type SendResult = { status: "sent" } | { status: "local" } | { status: "error"; message: string };

export interface FormAdapter {
  readonly mode: "local" | "http";
  send(data: ContactData): Promise<SendResult>;
}

/** Varianta pentru demo: nu face nicio cerere de rețea. */
export const localAdapter: FormAdapter = {
  mode: "local",
  async send() {
    return { status: "local" };
  },
};

/**
 * Trimite JSON prin POST. Compatibil cu Formspree (https://formspree.io/f/…),
 * Getform, Basin sau un endpoint propriu care acceptă JSON.
 */
export function httpAdapter(endpoint: string, fetchImpl: typeof fetch = (...a) => fetch(...a), timeoutMs = 12_000): FormAdapter {
  return {
    mode: "http",
    async send(data) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetchImpl(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...readable(data), _subject: `Cerere de programare — ${data.name}` }),
          signal: controller.signal,
        });
        if (res.ok) return { status: "sent" };
        return { status: "error", message: `Serverul a răspuns cu eroarea ${res.status}.` };
      } catch {
        return { status: "error", message: "Nu am putut trimite mesajul. Verifică conexiunea la internet." };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}

export function getFormAdapter(endpoint: string = site.formEndpoint): FormAdapter {
  return endpoint ? httpAdapter(endpoint) : localAdapter;
}

const formatDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("ro-RO", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
};

/** Câmpurile cererii, cu etichete pe înțeles (pentru e-mail și WhatsApp). */
export function readable(data: ContactData) {
  return {
    Nume: data.name,
    Telefon: data.phone,
    ...(data.email ? { "E-mail": data.email } : {}),
    Serviciu: data.service === UNDECIDED ? "Încă nu știu, aș vrea o recomandare" : (serviceById(data.service)?.name ?? data.service),
    "Ziua preferată": formatDay(data.day),
    Interval: timeSlots.find((t) => t.id === data.time)?.label ?? data.time,
    ...(data.message ? { Mesaj: data.message } : {}),
  };
}

/** Textul gata de trimis pe WhatsApp sau prin SMS. */
export function composeMessage(data: ContactData): string {
  const lines = Object.entries(readable(data)).map(([k, v]) => `${k}: ${v}`);
  return [`Bună ziua! Aș dori o programare la ${BUSINESS_NAME}.`, ...lines].join("\n");
}
