/**
 * Configurarea studioului: nume, date de contact, program, sărbători, politici.
 * Numele apare DOAR aici; restul site-ului îl citește din BUSINESS_NAME.
 */
export const BUSINESS_NAME = "Liniște Studio";

/** Zilele săptămânii, în ordinea din calendarul românesc (luni = 1, duminică = 0, ca Date.getDay()). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DayHours {
  day: Weekday;
  label: string;
  /** „HH:MM”; lipsă = închis. */
  open?: string;
  close?: string;
  note?: string;
}

export interface Holiday {
  /** Data în format ISO „AAAA-LL-ZZ”. */
  date: string;
  name: string;
  status: "închis" | "program redus";
  /** Doar pentru „program redus”. */
  hours?: string;
}

export const site = {
  tagline: "Masaj și stare de bine, în ritmul tău",
  shortDescription:
    "studio de masaj și relaxare: masaj de relaxare, terapeutic, sportiv, cu pietre calde, aromaterapie și ritualuri pentru cupluri.",
  /** Afișat pe site. */
  phone: "0712 345 678",
  /** Folosit în linkurile tel: (format internațional, fără spații). */
  phoneHref: "+40712345678",
  /** Număr pentru linkul WhatsApp (wa.me), fără „+” și fără spații. */
  whatsapp: "40712345678",
  email: "programari@liniste-studio.ro",
  area: "România",
  address: {
    street: "Strada Teilor nr. 7, parter",
    country: "România",
    directions: "Intrarea este din curtea interioară, a doua ușă pe dreapta. Avem un loc de parcare rezervat clienților.",
  },
  /**
   * Adresa unui serviciu de formulare (Formspree, Getform sau propriul API).
   * Se setează la build prin variabila de mediu NEXT_PUBLIC_FORM_ENDPOINT.
   * Fără ea, formularul rămâne în modul local: nu trimite nimic.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  payment: "Plata se face la studio, numerar sau card.",
  priceNote: "Prețurile sunt în lei, cu TVA inclus, și pot fi actualizate fără notificare prealabilă.",
} as const;

export const hours: DayHours[] = [
  { day: 1, label: "Luni", open: "10:00", close: "21:00" },
  { day: 2, label: "Marți", open: "10:00", close: "21:00" },
  { day: 3, label: "Miercuri", open: "10:00", close: "21:00" },
  { day: 4, label: "Joi", open: "10:00", close: "21:00" },
  { day: 5, label: "Vineri", open: "10:00", close: "21:00" },
  { day: 6, label: "Sâmbătă", open: "10:00", close: "18:00" },
  { day: 0, label: "Duminică", note: "Închis — zi de odihnă pentru echipă" },
];

/** Ultima programare începe cu cel puțin o oră înainte de închidere. */
export const lastBookingNote = "Ultima ședință începe cu cel puțin 60 de minute înainte de închidere.";

export const holidays: Holiday[] = [
  { date: "2026-11-30", name: "Sfântul Andrei", status: "închis" },
  { date: "2026-12-01", name: "Ziua Națională", status: "închis" },
  { date: "2026-12-24", name: "Ajunul Crăciunului", status: "program redus", hours: "10:00–15:00" },
  { date: "2026-12-25", name: "Crăciunul", status: "închis" },
  { date: "2026-12-26", name: "A doua zi de Crăciun", status: "închis" },
  { date: "2026-12-31", name: "Revelion", status: "program redus", hours: "10:00–15:00" },
  { date: "2027-01-01", name: "Anul Nou", status: "închis" },
  { date: "2027-01-02", name: "A doua zi de Anul Nou", status: "închis" },
  { date: "2027-01-06", name: "Boboteaza", status: "închis" },
  { date: "2027-01-07", name: "Sfântul Ioan", status: "închis" },
  { date: "2027-01-24", name: "Unirea Principatelor", status: "închis" },
  { date: "2027-04-30", name: "Vinerea Mare", status: "program redus", hours: "10:00–15:00" },
  { date: "2027-05-01", name: "Ziua Muncii", status: "închis" },
  { date: "2027-05-02", name: "Paștele", status: "închis" },
  { date: "2027-05-03", name: "A doua zi de Paște", status: "închis" },
  { date: "2027-06-01", name: "Ziua Copilului", status: "închis" },
  { date: "2027-06-20", name: "Rusaliile", status: "închis" },
  { date: "2027-06-21", name: "A doua zi de Rusalii", status: "închis" },
  { date: "2027-08-15", name: "Adormirea Maicii Domnului", status: "închis" },
];

export const cancellationPolicy: { title: string; text: string }[] = [
  {
    title: "Anulare gratuită",
    text: "Poți anula sau muta programarea fără niciun cost, dacă ne anunți cu cel puțin 12 ore înainte, telefonic sau prin mesaj.",
  },
  {
    title: "Sub 12 ore",
    text: "Înțelegem că apar neprevăzute. Te rugăm să ne anunți cât mai repede, ca alt client să poată folosi intervalul.",
  },
  {
    title: "Neprezentare",
    text: "După două neprezentări neanunțate, pentru următoarea programare vom cere un avans de 50% din valoarea ședinței.",
  },
  {
    title: "Întârzieri",
    text: "Ședința se încheie la ora planificată, ca următorul client să nu aștepte. Dacă întârzii peste 15 minute, putem propune o reprogramare.",
  },
  {
    title: "Abonamente și carduri cadou",
    text: "O ședință dintr-un abonament anulată cu mai puțin de 12 ore înainte se consideră efectuată. Cardurile cadou pot fi folosite pentru orice serviciu, în perioada de valabilitate.",
  },
];

export interface NavItem {
  href: string;
  label: string;
}

/** Meniul principal (antet). */
export const nav: NavItem[] = [
  { href: "/servicii/", label: "Servicii și prețuri" },
  { href: "/despre-masaj/", label: "Despre masaj" },
  { href: "/echipa/", label: "Echipa" },
  { href: "/program/", label: "Program" },
  { href: "/card-cadou/", label: "Card cadou" },
  { href: "/relaxare/", label: "Relaxare" },
  { href: "/contact/", label: "Contact" },
];

/** Linkuri suplimentare (subsol). */
export const footerNav: NavItem[] = [
  { href: "/programare/", label: "Programare" },
  { href: "/intrebari-frecvente/", label: "Întrebări frecvente" },
  { href: "/confidentialitate/", label: "Confidențialitate și cookie-uri" },
];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
