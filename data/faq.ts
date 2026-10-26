/** Întrebări frecvente, grupate pe teme. */
export interface FaqItem {
  q: string;
  a: string;
}

export const faq: { topic: string; items: FaqItem[] }[] = [
  {
    topic: "Programare și sosire",
    items: [
      {
        q: "Cum fac o programare?",
        a: "Ne poți suna, ne poți scrie pe WhatsApp sau poți completa formularul de pe pagina Programare. Îți confirmăm ora telefonic sau prin mesaj.",
      },
      {
        q: "Cu cât timp înainte să ajung?",
        a: "Ideal cu 10 minute înainte. Ai timp să te schimbi, să bei un pahar cu apă și să discutăm pe scurt despre ce îți dorești de la ședință.",
      },
      {
        q: "Pot anula sau muta programarea?",
        a: "Da, gratuit, dacă ne anunți cu cel puțin 12 ore înainte. Detaliile sunt pe pagina Program și tarife.",
      },
    ],
  },
  {
    topic: "În timpul ședinței",
    items: [
      {
        q: "Ce îmbrăcăminte port?",
        a: "Îți oferim lenjerie de unică folosință și un halat. Pe tot parcursul masajului ești acoperit cu un prosop, cu excepția zonei la care lucrăm.",
      },
      {
        q: "Pot cere o presiune mai mică sau mai mare?",
        a: "Oricând. Terapeutul te întreabă la început și pe parcurs, dar poți spune în orice moment dacă vrei să schimbe ceva.",
      },
      {
        q: "Trebuie să vorbesc în timpul masajului?",
        a: "Deloc. Unii clienți preferă liniștea, alții povestesc. Ritmul îl alegi tu.",
      },
    ],
  },
  {
    topic: "Sănătate",
    items: [
      {
        q: "Masajul tratează afecțiuni?",
        a: "Nu. Masajul nostru are rol de relaxare și stare de bine și nu înlocuiește un tratament medical. Pentru dureri persistente sau afecțiuni cunoscute, discută întâi cu medicul tău.",
      },
      {
        q: "Pot veni dacă sunt însărcinată?",
        a: "Te rugăm să ne spui la programare. În primul trimestru nu programăm masaj, iar ulterior doar cu acordul medicului și cu tehnici adaptate.",
      },
      {
        q: "Ce fac dacă am o răceală sau febră?",
        a: "Te rugăm să reprogramezi. Masajul nu este potrivit în timpul unei stări febrile, iar așa îi protejezi și pe ceilalți clienți.",
      },
    ],
  },
  {
    topic: "Plată și cadouri",
    items: [
      {
        q: "Cum pot plăti?",
        a: "La studio, numerar sau card. Abonamentele se plătesc la prima ședință.",
      },
      {
        q: "Cât este valabil un card cadou?",
        a: "Șase luni de la emitere. Se poate folosi pentru orice serviciu; dacă ședința aleasă costă mai mult, se achită diferența.",
      },
      {
        q: "Pot împărți un abonament cu altcineva?",
        a: "Abonamentele sunt nominale, dar dacă nu le mai poți folosi, discutăm o soluție. Scrie-ne.",
      },
    ],
  },
];
