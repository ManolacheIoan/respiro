import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Divider } from "@/components/illustrations/Divider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import type { IconName } from "@/lib/icon-names";

export const metadata: Metadata = {
  title: "Despre masaj",
  description: "Beneficii, pentru cine este potrivit, contraindicații generale și cum te pregătești pentru o ședință.",
};

const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "breath",
    title: "Relaxare",
    text: "Atingerea lentă și ritmul constant îi dau corpului un semnal de odihnă. Respirația devine mai liniștită, gândurile încetinesc.",
  },
  {
    icon: "hands",
    title: "Senzație de ușurare musculară",
    text: "Masajul poate reduce senzația de încordare din umeri, gât sau spate, mai ales când tensiunea vine din postură sau stres.",
  },
  {
    icon: "candle",
    title: "Stare de bine",
    text: "Mulți oameni descriu după ședință o stare de calm, de ușurință și o odihnă mai bună în noaptea care urmează.",
  },
  {
    icon: "towel",
    title: "Recuperare după efort",
    text: "Pentru cei care fac sport, masajul poate face parte din rutina de după antrenament, alături de somn, hidratare și întinderi.",
  },
];

const forWhom = [
  { title: "Cei care stau mult la birou", text: "Umeri ridicați, gât încordat, spate obosit: aici începem de cele mai multe ori." },
  { title: "Sportivi amatori", text: "Alergători, cicliști, pasionați de sală sau de munte, înainte sau după efort." },
  { title: "Oricine are nevoie de o pauză", text: "Nu trebuie să ai o problemă ca să meriți o oră de liniște." },
  { title: "Cupluri și prieteni", text: "Un moment de relaxare împreună, în aceeași cameră." },
];

const contraindications = [
  "febră, răceală, gripă sau orice infecție în desfășurare",
  "răni deschise, arsuri, vânătăi recente sau afecțiuni ale pielii în zona masată",
  "inflamații acute, umflături sau dureri apărute brusc, neinvestigate de un medic",
  "tromboză sau suspiciune de tromboză, varice inflamate",
  "intervenții chirurgicale sau fracturi recente",
  "afecțiuni cardiace, tensiune arterială necontrolată, diabet necontrolat",
  "boli oncologice în tratament, doar cu acordul medicului curant",
  "sarcină: nu în primul trimestru; ulterior, doar cu acordul medicului și cu tehnici adaptate",
  "consum de alcool în aceeași zi",
];

const before = [
  "Mănâncă ușor, cu cel puțin o oră înainte.",
  "Vino cu 10 minute mai devreme, ca să nu începi pe fugă.",
  "Spune-ne despre orice afecțiune, operație sau medicament.",
  "Lasă bijuteriile acasă sau scoate-le înainte de masaj.",
  "Dacă ai pielea sensibilă sau alergii, spune-ne înainte de alegerea uleiului.",
];

const after = [
  "Bea apă sau ceai în orele următoare.",
  "Ridică-te încet; corpul are nevoie de un minut să revină.",
  "Evită efortul intens și dușul foarte fierbinte în aceeași seară.",
  "O ușoară sensibilitate după un masaj ferm e normală și trece în 1–2 zile. Dacă nu trece, spune-ne.",
];

export default function AboutMassagePage() {
  return (
    <>
      <PageHero
        eyebrow="Despre masaj"
        title="Ce poate face o oră de masaj"
        lead="Informații simple, fără promisiuni exagerate: ce poți aștepta, cui i se potrivește, când e mai bine să amâni și cum te pregătești."
        icon="hands"
      >
        <nav className="chip-nav" aria-label="Pe această pagină">
          <ul>
            <li>
              <a href="#beneficii">Beneficii</a>
            </li>
            <li>
              <a href="#pentru-cine">Pentru cine</a>
            </li>
            <li>
              <a href="#contraindicatii">Contraindicații</a>
            </li>
            <li>
              <a href="#pregatire">Cum te pregătești</a>
            </li>
          </ul>
        </nav>
      </PageHero>

      <section id="beneficii" className="section" aria-labelledby="beneficii-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Beneficii</p>
            <h2 id="beneficii-titlu">Ce simt, de obicei, clienții noștri</h2>
            <p className="lead">
              Efectele diferă de la o persoană la alta. Masajul de relaxare nu este un tratament și nu înlocuiește
              sfatul unui medic sau al unui kinetoterapeut.
            </p>
          </Reveal>
          <div className="grid grid--2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 100} className="card info-card">
                <span className="icon-badge icon-badge--sand">
                  <Icon name={b.icon} size={32} />
                </span>
                <div>
                  <h3>{b.title}</h3>
                  <p className="muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pentru-cine" className="section section--cream bg-leaves" aria-labelledby="pentru-cine-titlu">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Pentru cine</p>
            <h2 id="pentru-cine-titlu">Pentru aproape oricine are nevoie de o pauză</h2>
            <Divider />
          </Reveal>
          <ul className="grid grid--4 plain-list">
            {forWhom.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="for-item">
                <h3>{f.title}</h3>
                <p className="muted">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="contraindicatii" className="section" aria-labelledby="contra-titlu">
        <div className="container split">
          <Reveal className="section-head">
            <p className="eyebrow">Contraindicații generale</p>
            <h2 id="contra-titlu">Când e mai bine să amâni</h2>
            <p className="lead">
              Lista de mai jos este orientativă, nu completă. Dacă te regăsești într-una dintre situații sau nu ești
              sigur, întreabă-ți medicul înainte de programare și spune-ne la telefon.
            </p>
            <p className="muted">
              Terapeuții noștri pot refuza sau adapta o ședință dacă au motive să creadă că masajul nu ți-ar face
              bine în acel moment. O facem din grijă, nu din formalitate.
            </p>
          </Reveal>
          <Reveal className="card contra-card" delay={120}>
            <h3>Amână masajul sau cere avizul medicului în caz de:</h3>
            <ul className="dot-list">
              {contraindications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="pregatire" className="section section--sage" aria-labelledby="pregatire-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cum te pregătești</p>
            <h2 id="pregatire-titlu">Înainte și după ședință</h2>
          </Reveal>
          <div className="grid grid--2">
            <Reveal className="prep">
              <h3>
                <Icon name="cup" size={30} /> Înainte
              </h3>
              <ul className="check-list">
                {before.map((x) => (
                  <li key={x}>
                    <Icon name="check" size={20} /> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="prep" delay={120}>
              <h3>
                <Icon name="leaf" size={30} /> După
              </h3>
              <ul className="check-list">
                {after.map((x) => (
                  <li key={x}>
                    <Icon name="check" size={20} /> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="intrebari-titlu">
        <div className="container container--narrow center-text">
          <h2 id="intrebari-titlu">Ai o întrebare înainte să te programezi?</h2>
          <p className="lead" style={{ marginInline: "auto" }}>
            Sună-ne la <a href={`tel:${site.phoneHref}`}>{site.phone}</a> sau citește{" "}
            <Link href="/intrebari-frecvente/">întrebările frecvente</Link>.
          </p>
          <div className="btn-row btn-row--center">
            <Link href="/programare/" className="btn btn--primary">
              <Icon name="calendar" /> Programează-te
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
