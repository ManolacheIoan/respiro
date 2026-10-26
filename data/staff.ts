/**
 * Echipa (persoane fictive). Portretele sunt ilustrații desenate din parametrii
 * de mai jos; pentru fotografii reale vezi README („Înlocuirea ilustrațiilor”).
 */
export interface AvatarStyle {
  hair: "coc" | "scurt" | "lung" | "cret" | "barba";
  skin: string;
  hairColor: string;
  top: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  /** Id-uri din data/services.ts */
  specialties: string[];
  years: number;
  bio: string;
  /** O frază personală, între ghilimele. */
  quote: string;
  languages: string[];
  avatar: AvatarStyle;
  /** Cale opțională spre o fotografie din /public (ex.: "/echipa/irina.jpg"). */
  photo?: string;
}

export const staff: StaffMember[] = [
  {
    id: "irina",
    name: "Irina Matei",
    role: "Fondatoare, terapeut principal",
    specialties: ["terapeutic", "relaxare", "pietre-calde"],
    years: 12,
    bio: "A deschis studioul cu o idee simplă: un loc liniștit, fără grabă, unde fiecare ședință începe cu o discuție. Lucrează mai ales cu tensiunea din spate și umeri.",
    quote: "Corpul spune mult, dacă îi lași timp.",
    languages: ["română", "engleză"],
    avatar: { hair: "coc", skin: "#E8C4A6", hairColor: "#4A3328", top: "#3F5B4E" },
  },
  {
    id: "andrei",
    name: "Andrei Stan",
    role: "Terapeut masaj sportiv",
    specialties: ["sportiv", "terapeutic"],
    years: 8,
    bio: "Fost atlet de semifond, înțelege oboseala de după antrenament. Lucrează cu alergători, sportivi amatori și cu oricine petrece multe ore în picioare.",
    quote: "Recuperarea face parte din antrenament.",
    languages: ["română", "engleză", "italiană"],
    avatar: { hair: "barba", skin: "#D9A982", hairColor: "#5A4030", top: "#B8693F" },
  },
  {
    id: "maria",
    name: "Maria Dobre",
    role: "Terapeut aromaterapie și ritualuri",
    specialties: ["aromaterapie", "pietre-calde", "cuplu"],
    years: 9,
    bio: "Pregătește singură amestecurile de uleiuri ale studioului și are grijă de ritualurile pentru cupluri. Ritmul ei e lent și atent.",
    quote: "Un miros bun poate schimba o zi întreagă.",
    languages: ["română", "franceză"],
    avatar: { hair: "cret", skin: "#C68E6A", hairColor: "#3A2A22", top: "#B89A5A" },
  },
  {
    id: "elena",
    name: "Elena Pavel",
    role: "Terapeut masaj facial și anticelulitic",
    specialties: ["facial", "anticelulitic", "relaxare"],
    years: 6,
    bio: "Are o atenție deosebită la detalii și la confortul fiecărui client. Recomandă serii scurte și obiective realiste, explicate pe înțeles.",
    quote: "Rezultatele frumoase vin din pași mici, făcuți constant.",
    languages: ["română", "engleză"],
    avatar: { hair: "lung", skin: "#F0D2B8", hairColor: "#8A5A3B", top: "#6E8476" },
  },
];
