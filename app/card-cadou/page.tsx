import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { VoucherBuilder } from "@/components/VoucherBuilder";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Card cadou",
  description: "Creează un card cadou: alege suma, scrie o dedicație și tipărește previzualizarea.",
};

const steps = [
  { title: "Creezi cardul", text: "Alegi suma și scrii dedicația. Previzualizarea se actualizează pe loc." },
  { title: "Ne contactezi", text: `Ne scrii pe WhatsApp sau ne suni la ${site.phone}.` },
  { title: "Achiți la studio", text: "Primești cardul tipărit, cu un cod unic, sau varianta digitală pe e-mail." },
  { title: "Se programează", text: "Cel care primește cardul ne sună și alege orice masaj, timp de șase luni." },
];

export default function GiftCardPage() {
  return (
    <>
      <PageHero
        eyebrow="Card cadou"
        title="Un cadou care se simte"
        lead="Potrivit pentru aniversări, sărbători sau doar pentru că cineva drag are nevoie de o pauză."
        icon="gift"
      />
      <section className="section" aria-label="Creează cardul">
        <div className="container">
          <VoucherBuilder />
        </div>
      </section>
      <section className="section section--cream bg-leaves" aria-labelledby="cum-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cum funcționează</p>
            <h2 id="cum-titlu">Patru pași simpli</h2>
          </Reveal>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="step">
                <span className="step__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="gift-terms">
            <Icon name="check" size={20} /> Valabil 6 luni, pentru orice serviciu. Dacă ședința aleasă costă mai mult,
            se achită diferența; restul nu se returnează în bani.
          </p>
        </div>
      </section>
    </>
  );
}
