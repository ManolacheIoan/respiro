import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { TodayHours } from "@/components/TodayHours";
import { site, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Programare",
  description: "Trimite-ne un mesaj sau cere o programare: serviciu, zi și interval preferat.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Mesaj și programare"
        title="Spune-ne când ți-ar plăcea să vii"
        lead="Completează formularul și te contactăm pentru confirmare. Dacă preferi, ne poți suna sau scrie direct."
        icon="calendar"
      />
      <section className="section">
        <div className="container booking">
          <ContactForm />
          <aside className="booking__aside" aria-labelledby="direct-titlu">
            <div className="card">
              <h2 id="direct-titlu" className="h3-like">
                Mai rapid, direct
              </h2>
              <ul className="direct-list">
                <li>
                  <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
                    <Icon name="phone" /> Sună: {site.phone}
                  </a>
                </li>
                <li>
                  <a className="btn" href={whatsappLink("Bună ziua! Aș dori o programare.")}>
                    <Icon name="chat" /> Scrie pe WhatsApp
                  </a>
                </li>
                <li>
                  <a className="btn" href={`mailto:${site.email}`}>
                    <Icon name="mail" /> {site.email}
                  </a>
                </li>
              </ul>
              <p className="booking__hours">
                <Icon name="clock" size={22} /> <TodayHours />
              </p>
              <p className="small muted">
                În timpul ședințelor nu răspundem la telefon, ca să nu deranjăm clienții. Te sunăm noi înapoi.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
