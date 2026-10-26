import type { Metadata } from "next";
import Link from "next/link";
import { BreathingGuide } from "@/components/BreathingGuide";
import { Icon } from "@/components/icons";
import { Divider } from "@/components/illustrations/Divider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import type { IconName } from "@/lib/icon-names";

export const metadata: Metadata = {
  title: "Relaxare",
  description: "Ghid de respirație animat (inspiră, ține, expiră) și câteva sfaturi simple pentru liniște.",
};

const tips: { icon: IconName; title: string; text: string }[] = [
  { icon: "cup", title: "O ceașcă, fără ecran", text: "Bea un ceai cald fără telefon în mână. Doar ceaiul, aburul și cinci minute." },
  { icon: "breath", title: "Expiră mai lung", text: "Când simți că te grăbești, lasă expirația să dureze puțin mai mult decât inspirația." },
  { icon: "hands", title: "Lasă umerii jos", text: "Verifică de câteva ori pe zi: umerii sunt la urechi? Coboară-i și relaxează maxilarul." },
  { icon: "leaf", title: "Zece minute afară", text: "O plimbare scurtă, în ritmul tău, ajută mintea să se așeze." },
  { icon: "candle", title: "Seara, lumină caldă", text: "Cu o oră înainte de somn, folosește lumini mai slabe și mai calde." },
  { icon: "steam", title: "Un duș cald, nu fierbinte", text: "Apa caldă relaxează; cea foarte fierbinte poate obosi în loc să liniștească." },
];

export default function RelaxPage() {
  return (
    <>
      <PageHero
        eyebrow="Relaxare"
        title="Un minut pentru respirație"
        lead="Urmează cercul: crește când inspiri, se oprește când ții aerul, scade când expiri. Oriunde ai fi, chiar acum."
        icon="breath"
      />
      <section className="section" aria-labelledby="ghid-titlu">
        <div className="container">
          <h2 id="ghid-titlu" className="visually-hidden">
            Ghid de respirație
          </h2>
          <BreathingGuide />
          <p className="breath-note small muted">
            Respiră confortabil, fără să forțezi. Dacă simți amețeală sau disconfort, oprește-te și revino la
            respirația obișnuită. Exercițiul nu înlocuiește sfatul medical.
          </p>
        </div>
      </section>
      <section className="section section--cream bg-leaves" aria-labelledby="sfaturi-titlu">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Sfaturi</p>
            <h2 id="sfaturi-titlu">Liniște în pași mici</h2>
            <Divider />
          </Reveal>
          <ul className="grid grid--3 plain-list">
            {tips.map((t, i) => (
              <Reveal as="li" key={t.title} delay={(i % 3) * 90} className="card tip">
                <Icon name={t.icon} size={34} />
                <h3>{t.title}</h3>
                <p className="muted">{t.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="center-link">
            <Link href="/programare/" className="link-arrow">
              Pentru o pauză mai lungă, programează un masaj <Icon name="arrow" size={20} />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
