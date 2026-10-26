# Liniște Studio — site de prezentare pentru un studio de masaj

> **Proiect demonstrativ (portofoliu).** „Liniște Studio” este o afacere **fictivă**. Echipa, adresa,
> numărul de telefon, e-mailul și prețurile sunt inventate. Formularul nu trimite nimic nicăieri până nu
> conectezi un serviciu real (vezi mai jos). Site-ul are `noindex`, deci nu apare în motoarele de căutare.
> Nota de demo există doar aici, în README; site-ul în sine arată ca un produs final.

Site static (Next.js 16, export static) pentru un studio de masaj și relaxare: servicii și prețuri,
informații despre masaj, echipă, program, card cadou tipăribil, ghid de respirație animat, formular de
programare, contact, întrebări frecvente și politică de confidențialitate. Totul în limba română.

- Fără scripturi terțe și fără cereri externe la rulare (fonturi și ilustrații găzduite local).
- Fără cookie-uri. Fără hartă externă (harta e o ilustrație SVG).
- Accesibil (WCAG 2.2 AA, verificat cu axe), utilizabil din tastatură, respectă `prefers-reduced-motion`.
- Mobile first, cu bară fixă „Sună acum / Programează-te” pe telefon. Doar temă deschisă.

## Pornire rapidă

```bash
npm install
npm run dev          # http://localhost:3000
```

| Comandă              | Ce face                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `npm run dev`        | server de dezvoltare                                                |
| `npm run clean`      | șterge `.next/` și `out/`                                           |
| `npm run build`      | export static în `out/`                                             |
| `npm run serve`      | servește `out/` pe http://localhost:4175 (cu compresie, ca în producție) |
| `npm run lint`       | ESLint                                                              |
| `npm run typecheck`  | TypeScript, fără emitere                                            |
| `npm run test:unit`  | Vitest: validarea formularului, adaptorul, ghidul de respirație     |
| `npm run test:e2e`   | Playwright + axe (rulează întâi `npm run build`)                    |
| `npm test`           | ambele                                                              |

Folderul `out/` se poate publica pe orice găzduire statică (Netlify, Vercel, Cloudflare Pages, GitHub
Pages, un server cu nginx etc.).

## Structură

```
app/                     paginile (App Router), câte un folder pe pagină
  page.tsx               Acasă
  servicii/              Servicii și prețuri
  despre-masaj/          Beneficii, pentru cine, contraindicații, pregătire
  echipa/                Echipa
  program/               Program și tarife (zile, sărbători, politica de anulare)
  card-cadou/            Card cadou cu previzualizare tipăribilă
  relaxare/              Ghid de respirație + sfaturi
  programare/            Formularul de mesaj / programare
  contact/               Contact
  intrebari-frecvente/   Întrebări frecvente
  confidentialitate/     Politica de confidențialitate și cookie-uri
  not-found.tsx          Pagina 404
  globals.css            tot stilul (culori, texturi, componente, animații)
  fonts/                 fonturile (woff2) + licențele OFL
config/site.ts           NUMELE afacerii, contact, program, sărbători, politica de anulare, meniu
data/services.ts         servicii, durate, prețuri, abonamente, suplimente
data/staff.ts            echipa
data/faq.ts              întrebări frecvente
components/              antet, subsol, formular, card cadou, ghid de respirație etc.
components/icons.tsx     iconițele (SVG, linie fină cu accente aurii)
components/illustrations ilustrațiile (scena din hero, portrete, separatoare, frunze, hartă)
lib/validation.ts        validarea formularului și a sumei pentru card (funcții pure, testate)
lib/form/                adaptorul formularului (local / HTTP)
lib/breathing.ts         ritmurile ghidului de respirație
tests/                   teste Playwright (formular, respirație, rețea, axe, navigare)
scripts/serve.mjs        server static minimal pentru teste și Lighthouse
```

## Editarea conținutului

Tot conținutul care se schimbă des stă în trei fișiere TypeScript. Editorul (VS Code) te avertizează dacă
lipsește un câmp obligatoriu; `npm run typecheck` verifică totul.

### Prețuri și servicii — `data/services.ts`

Fiecare serviciu are una sau mai multe durate:

```ts
options: [
  { minutes: 50, price: 180 },
  { minutes: 80, price: 260 },
],
```

Schimbi `price` (în lei) și gata: prețul se actualizează peste tot (carduri, tabele, „de la …”,
tarife pe scurt). Tot aici sunt abonamentele (`packages`, cu `regularPrice` pentru prețul tăiat) și
suplimentele (`extras`). Un serviciu nou are nevoie de un `id` unic (folosit în adrese, ex.
`/servicii/#relaxare`) și de o iconiță din `lib/icon-names.ts`.

### Echipa — `data/staff.ts`

Nume, rol, specialități (id-uri de servicii), ani de experiență, limbi, o frază personală și parametrii
portretului ilustrat (păr, ton de piele, culoarea bluzei).

### Program, sărbători, contact — `config/site.ts`

- `hours`: programul pe zile (fără `open`/`close` = închis);
- `holidays`: sărbătorile, cu `status: "închis"` sau `"program redus"` și `hours`. Lista trebuie
  actualizată o dată pe an. Validarea formularului respectă automat programul și sărbătorile;
- `cancellationPolicy`: textele politicii de anulare;
- `site`: telefon, WhatsApp, e-mail, adresă, mențiuni de preț și plată.

### Întrebări frecvente — `data/faq.ts`

## Redenumirea afacerii

Numele apare într-un singur loc:

```ts
// config/site.ts
export const BUSINESS_NAME = "Liniște Studio";
```

Logo-ul afișează primul cuvânt mare și restul ca subtitlu (ex.: „Liniște” + „STUDIO”). Mai verifică:

- `site.email` (adresa conține numele);
- `name` din `package.json` (opțional);
- `public/icon.svg` (favicon; semnul nu conține text, deci de obicei rămâne la fel).

Testele citesc numele tot din `config/site.ts`, deci nu trebuie modificate.

## Înlocuirea ilustrațiilor cu fotografii

Ilustrațiile sunt componente React în `components/illustrations/`; nu sunt fișiere de imagine.

- **Echipa:** pune fotografia în `public/echipa/` (ex.: `public/echipa/irina.jpg`, aprox. 800×880 px,
  format portret) și adaugă `photo: "/echipa/irina.jpg"` la persoana respectivă în `data/staff.ts`.
  Portretul ilustrat este înlocuit automat, cu același cadru în formă de arcadă.
- **Hero (pagina Acasă):** în `app/page.tsx`, înlocuiește `<HeroArt />` cu o imagine:
  `<img src="/hero.jpg" alt="Camera de masaj, lumină caldă" width={960} height={1040} />`.
  Păstrează `width`/`height` (fără salt de layout) și folosește WebP/AVIF sub ~150 KB pentru
  performanță. Clasa `.hero__art` păstrează proporția 480/520.
- **Card cadou, hartă, 404:** `components/Voucher.tsx`, `components/illustrations/MapArt.tsx`,
  `app/not-found.tsx`.

Fotografiile trebuie să-ți aparțină sau să ai licență pentru ele (nu folosi imagini luate de pe internet).

## Conectarea unui serviciu real pentru formular

Implicit formularul rulează în **modul local**: validează datele, dar **nu trimite nimic**. Mesajul de
succes spune clar asta și oferă trimiterea cu un clic pe WhatsApp (text completat automat), apel, SMS
sau e-mail.

Pentru trimitere automată, setează la build variabila de mediu `NEXT_PUBLIC_FORM_ENDPOINT`:

1. Creează un formular la [Formspree](https://formspree.io) (sau Getform, Basin etc.) și copiază adresa,
   de forma `https://formspree.io/f/abcdwxyz`.
2. Setează variabila:
   - local: creează tu fișierul `.env.local` cu `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz`;
   - pe Netlify/Vercel: în setările proiectului, la „Environment variables”.
3. Rulează din nou `npm run build`.

Adaptorul (`lib/form/index.ts`) trimite un `POST` JSON cu câmpuri pe înțeles („Nume”, „Telefon”,
„Serviciu”, „Ziua preferată”…) și afișează „Am primit cererea ta” doar dacă serverul răspunde cu succes;
altfel arată eroarea și varianta de apel.

**Notă:** cu un endpoint extern, site-ul face o cerere către acel serviciu la trimiterea formularului.
Actualizează atunci și secțiunea 5 din politica de confidențialitate.

**Alt furnizor sau propriul API** (ex.: o funcție serverless care trimite e-mail prin SMTP): scrie o
funcție care respectă contractul `FormAdapter` (`send(data) → { status: "sent" | "local" | "error" }`) și
întoarce-o din `getFormAdapter()`. Exemplul HTTP existent este un bun punct de plecare.

Formularul are și un câmp-capcană ascuns pentru roboți (`website`).

## Identitate vizuală

- Culori: nisip `#EADFCB` (fundal), crem `#F5EEDF` (carduri), salvie `#3F5B4E` (accent), teracotă
  `#B8693F` (secundar), maro cărbune `#2B2620` (text), auriu `#B89A5A` (detalii fine). Teracota și auriul
  pure sunt doar decorative; pentru text se folosesc variantele închise `#8E4B27` și `#6B5530`
  (rapoartele de contrast sunt notate la începutul `app/globals.css`).
- Fonturi: Cormorant Garamond (titluri) și Source Sans 3 (text), găzduite local, licență SIL OFL
  (`app/fonts/OFL-*.txt`). Fiecare are fișier „latin” și „latin-ext” pentru ă, â, î, ș, ț. Fonturile de
  rezervă au metrici ajustate, ca textul să nu sară la încărcare.
- Texturi (granulație, frunze, valuri, pietre), logo, iconițe și ilustrații: SVG originale, în cod.
- Animații lente: ilustrația din hero „respiră”, frunze în derivă, logo și separatoare desenate,
  apariție lină la derulare, tranziții între pagini, ghid de respirație, 404 cu o frunză care cade pe apă.
  Cu `prefers-reduced-motion: reduce` toate se opresc; ghidul de respirație rămâne utilizabil ca text.

## Calitate

- **Teste unitare (Vitest):** validarea formularului (telefon românesc, e-mail, zile închise,
  sărbători, intervale după închidere, limite), suma cardului cadou, adaptorul (mod local fără rețea,
  trimitere HTTP, erori), fazele ghidului de respirație.
- **Teste Playwright** (telefon Pixel 7 + desktop Chrome): axe WCAG 2.2 AA pe toate paginile și pe
  stările formularului; fluxul formularului (erori, focus, preselectare serviciu, succes onest,
  tastatură); ghidul de respirație cu ceas controlat (faze, pauză, durată, mișcare redusă);
  nicio cerere externă și niciun cookie; navigare, bară de pe telefon, tipărirea cardului, 404,
  fără salt de layout, fără derulare orizontală la 320 px.
- **Lighthouse:** rulează pe `out/` servit cu `npm run serve`, de exemplu:

  ```bash
  npm run clean && npm run build && npm run serve
  npx lighthouse http://localhost:4175/ --preset=desktop --chrome-flags="--headless"
  ```

  Scorul SEO este intenționat mai mic, din cauza `noindex` (site demonstrativ).
