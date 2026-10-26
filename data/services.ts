/**
 * Servicii, durate, prețuri (lei) și abonamente.
 * Pentru a schimba un preț, modifică „price” la durata respectivă.
 */
import type { IconName } from "@/lib/icon-names";

export interface DurationOption {
  minutes: number;
  /** Preț în lei, cu TVA inclus. */
  price: number;
}

export type ServiceGroup = "relaxare" | "terapie" | "ritualuri";

export interface Service {
  /** Folosit în URL (#ancoră) și în formular. */
  id: string;
  name: string;
  group: ServiceGroup;
  icon: IconName;
  /** O frază pentru carduri. */
  short: string;
  description: string;
  /** Pentru cine e potrivit, pe scurt. */
  goodFor: string[];
  intensity: "blândă" | "medie" | "fermă";
  options: DurationOption[];
  /** Detalii suplimentare (ex.: „preț pentru două persoane”). */
  note?: string;
}

export const serviceGroups: { id: ServiceGroup; title: string; intro: string }[] = [
  {
    id: "relaxare",
    title: "Relaxare",
    intro: "Ritm lent, presiune blândă și timp doar pentru tine.",
  },
  {
    id: "terapie",
    title: "Masaj terapeutic și sportiv",
    intro: "Lucru atent pe zonele încordate, adaptat corpului și activității tale.",
  },
  {
    id: "ritualuri",
    title: "Ritualuri și îngrijire",
    intro: "Pietre calde, uleiuri aromatice, îngrijirea feței și momente în doi.",
  },
];

export const services: Service[] = [
  {
    id: "relaxare",
    name: "Masaj de relaxare",
    group: "relaxare",
    icon: "leaf",
    short: "Mișcări lungi și lente, pentru o minte mai liniștită.",
    description:
      "Un masaj de corp complet, cu mișcări ample și ritm constant, care ajută la destindere. Potrivit dacă vii prima dată sau ai nevoie, pur și simplu, de o pauză.",
    goodFor: ["prima vizită", "zile încărcate", "somn mai odihnitor"],
    intensity: "blândă",
    options: [
      { minutes: 50, price: 180 },
      { minutes: 80, price: 260 },
    ],
  },
  {
    id: "terapeutic",
    name: "Masaj terapeutic",
    group: "terapie",
    icon: "hands",
    short: "Atenție pe spate, umeri și gât, acolo unde se adună tensiunea.",
    description:
      "Combinăm tehnici de presiune profundă și întinderi ușoare pentru zonele încordate. Discutăm la început ce te deranjează și ajustăm presiunea pe parcurs.",
    goodFor: ["muncă la birou", "tensiune în umeri", "postură"],
    intensity: "fermă",
    options: [
      { minutes: 50, price: 210 },
      { minutes: 80, price: 300 },
    ],
  },
  {
    id: "sportiv",
    name: "Masaj sportiv",
    group: "terapie",
    icon: "towel",
    short: "Înainte de efort sau după antrenament, pentru recuperare.",
    description:
      "Tehnici dinamice și lucru pe grupele de mușchi folosite cel mai des. Te întrebăm despre sportul practicat și despre programul de antrenament.",
    goodFor: ["alergare", "sală", "sporturi de echipă"],
    intensity: "fermă",
    options: [
      { minutes: 50, price: 220 },
      { minutes: 80, price: 310 },
    ],
  },
  {
    id: "anticelulitic",
    name: "Masaj anticelulitic",
    group: "terapie",
    icon: "oil",
    short: "Tehnici active pe coapse, abdomen și brațe.",
    description:
      "Mișcări energice de frământare și rulare, cu uleiuri potrivite. Efectul vizibil depinde de regularitate, alimentație și mișcare; recomandăm o serie de ședințe.",
    goodFor: ["serie de ședințe", "tonifiere", "completare la sport"],
    intensity: "fermă",
    options: [
      { minutes: 45, price: 170 },
      { minutes: 60, price: 210 },
    ],
  },
  {
    id: "pietre-calde",
    name: "Masaj cu pietre calde",
    group: "ritualuri",
    icon: "stones",
    short: "Căldura pietrelor de bazalt, așezată blând pe corp.",
    description:
      "Pietre netede, încălzite la o temperatură plăcută, folosite în mișcări lente și așezate pe puncte de sprijin. Căldura ajută musculatura să se relaxeze mai ușor.",
    goodFor: ["zile reci", "relaxare profundă", "cadou"],
    intensity: "medie",
    options: [
      { minutes: 75, price: 290 },
      { minutes: 90, price: 340 },
    ],
  },
  {
    id: "aromaterapie",
    name: "Masaj cu aromaterapie",
    group: "ritualuri",
    icon: "candle",
    short: "Uleiuri esențiale alese împreună, după starea ta.",
    description:
      "Alegi la început unul dintre amestecurile noastre: lavandă și portocală, eucalipt și mentă sau lemn de santal. Urmează un masaj de relaxare cu uleiul ales.",
    goodFor: ["stres", "seri liniștite", "iubitorii de arome"],
    intensity: "blândă",
    options: [
      { minutes: 60, price: 230 },
      { minutes: 90, price: 320 },
    ],
  },
  {
    id: "facial",
    name: "Masaj facial",
    group: "ritualuri",
    icon: "steam",
    short: "Față, scalp și decolteu, cu atingeri fine.",
    description:
      "Comprese calde, masaj blând al feței și al scalpului, încheiat cu o cremă hidratantă. Se poate adăuga la orice alt masaj sau poate fi o pauză scurtă, de sine stătătoare.",
    goodFor: ["pauză scurtă", "tensiune în maxilar", "înainte de un eveniment"],
    intensity: "blândă",
    options: [
      { minutes: 30, price: 120 },
      { minutes: 45, price: 160 },
    ],
  },
  {
    id: "cuplu",
    name: "Masaj pentru cupluri",
    group: "ritualuri",
    icon: "cups",
    short: "Doi terapeuți, aceeași cameră, același moment de liniște.",
    description:
      "Fiecare alege tipul de masaj preferat: relaxare, aromaterapie sau terapeutic. La final vă așteaptă un ceai de plante în camera de relaxare.",
    goodFor: ["aniversări", "cadou în doi", "prieteni sau familie"],
    intensity: "blândă",
    note: "Prețul este pentru două persoane.",
    options: [
      { minutes: 60, price: 420 },
      { minutes: 90, price: 580 },
    ],
  },
];

export interface Package {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  includes: string[];
  /** Preț total în lei. */
  price: number;
  /** Prețul dacă ședințele ar fi plătite separat. */
  regularPrice?: number;
  validity: string;
  highlight?: boolean;
}

export const packages: Package[] = [
  {
    id: "abonament-relaxare",
    name: "Abonament Relaxare",
    icon: "leaf",
    description: "Patru pauze de liniște, o dată pe săptămână sau când ai nevoie.",
    includes: ["4 masaje de relaxare de 50 de minute", "ceai de plante după fiecare ședință"],
    price: 640,
    regularPrice: 720,
    validity: "valabil 2 luni",
  },
  {
    id: "abonament-terapeutic",
    name: "Abonament Spate liber",
    icon: "hands",
    description: "Pentru tensiunea care revine: lucru constant, cu același terapeut.",
    includes: ["6 masaje terapeutice de 50 de minute", "recomandări simple de mișcare pentru acasă"],
    price: 1140,
    regularPrice: 1260,
    validity: "valabil 3 luni",
    highlight: true,
  },
  {
    id: "abonament-anticelulitic",
    name: "Abonament Tonic",
    icon: "oil",
    description: "O serie completă de masaj anticelulitic, cu ritm de 2 ședințe pe săptămână.",
    includes: ["10 masaje anticelulitice de 45 de minute", "ulei de masaj pentru acasă"],
    price: 1450,
    regularPrice: 1700,
    validity: "valabil 3 luni",
  },
  {
    id: "ritual-seara",
    name: "Ritual O seară liniștită",
    icon: "cup",
    description: "Pietre calde, masaj facial și ceai: aproape două ore numai pentru tine.",
    includes: ["masaj cu pietre calde, 75 de minute", "masaj facial, 30 de minute", "ceai și fructe uscate"],
    price: 380,
    regularPrice: 410,
    validity: "o singură vizită",
  },
];

export const extras: { name: string; price: number }[] = [
  { name: "Prelungire cu 15 minute (orice masaj)", price: 50 },
  { name: "Ulei esențial la alegere, adăugat la orice masaj", price: 20 },
  { name: "Compresă caldă pentru ceafă și umeri", price: 15 },
];

/** Prețul minim al unui serviciu („de la …”). */
export const fromPrice = (s: Service) => Math.min(...s.options.map((o) => o.price));

export const serviceById = (id: string) => services.find((s) => s.id === id);
