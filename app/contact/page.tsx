import type { Metadata } from "next";
import Link from "next/link";
import { HoursTable } from "@/components/HoursTable";
import { Icon } from "@/components/icons";
import { MapArt } from "@/components/illustrations/MapArt";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { BUSINESS_NAME, lastBookingNote, site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Telefon, WhatsApp, e-mail, adresă și program.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ne găsești aproape"
        lead="Sună-ne, scrie-ne sau treci pe la noi. Lucrăm doar pe bază de programare, ca să te putem primi fără grabă."
        icon="pin"
      />
      <section className="section" aria-label="Date de contact">
        <div className="container contact-grid">
          <Reveal className="card contact-card">
            <h2 className="h3-like">{BUSINESS_NAME}</h2>
            <ul className="contact-lines">
              <li>
                <Icon name="phone" />
                <div>
                  <span className="contact-lines__label">Telefon</span>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </div>
              </li>
              <li>
                <Icon name="chat" />
                <div>
                  <span className="contact-lines__label">WhatsApp</span>
                  <a href={whatsappLink("Bună ziua!")}>Scrie-ne un mesaj</a>
                </div>
              </li>
              <li>
                <Icon name="mail" />
                <div>
                  <span className="contact-lines__label">E-mail</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </li>
              <li>
                <Icon name="pin" />
                <div>
                  <span className="contact-lines__label">Adresă</span>
                  <address>
                    {site.address.street}
                    <br />
                    {site.area}
                  </address>
                </div>
              </li>
            </ul>
            <p className="muted small">{site.address.directions}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                <Icon name="phone" /> Sună acum
              </a>
              <Link className="btn" href="/programare/">
                <Icon name="calendar" /> Formular de programare
              </Link>
            </div>
          </Reveal>
          <Reveal className="contact-side" delay={120}>
            <figure className="map-figure">
              <MapArt />
              <figcaption className="small muted">Schiță orientativă. Adresa exactă o confirmăm la programare.</figcaption>
            </figure>
            <h2 className="h3-like">Program</h2>
            <HoursTable />
            <p className="small muted">
              {lastBookingNote} <Link href="/program/">Sărbători și politica de anulare</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
