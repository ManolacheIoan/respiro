import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri despre programare, desfășurarea ședinței, sănătate, plată și carduri cadou.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Întrebări frecvente"
        title="Bine de știut înainte de prima vizită"
        lead="Dacă nu găsești răspunsul aici, sună-ne. Ne bucurăm să lămurim orice."
        icon="leaf"
      />
      <section className="section">
        <div className="container container--narrow">
          {faq.map((group, gi) => (
            <Reveal key={group.topic} className="faq-group" delay={gi ? 60 : 0}>
              <h2 className="faq-group__title">{group.topic}</h2>
              {group.items.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>
                    <span>{item.q}</span>
                    <span className="faq-item__mark" aria-hidden="true" />
                  </summary>
                  <div className="faq-item__body">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </Reveal>
          ))}
          <div className="card faq-cta">
            <h2 className="h3-like">Ai altă întrebare?</h2>
            <p className="muted">Răspundem la telefon între ședințe sau te sunăm noi înapoi.</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                <Icon name="phone" /> {site.phone}
              </a>
              <Link className="btn" href="/programare/">
                Scrie-ne un mesaj
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
