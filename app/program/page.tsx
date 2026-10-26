import type { Metadata } from "next";
import Link from "next/link";
import { HoursTable } from "@/components/HoursTable";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { cancellationPolicy, holidays, lastBookingNote, site } from "@/config/site";
import { services } from "@/data/services";
import { lei, minutes } from "@/lib/format";

export const metadata: Metadata = {
  title: "Program și tarife",
  description: "Programul studioului pe zile, sărbători legale, politica de anulare și tarifele pe scurt.",
};

const fmt = new Intl.DateTimeFormat("ro-RO", { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return fmt.format(new Date(Date.UTC(y, m - 1, d)));
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Program și tarife"
        title="Când ne găsești"
        lead="Lucrăm doar pe bază de programare, ca fiecare client să aibă timpul și liniștea lui."
        icon="clock"
      />

      <section className="section" aria-labelledby="program-titlu">
        <div className="container split">
          <Reveal>
            <h2 id="program-titlu">Program săptămânal</h2>
            <HoursTable />
            <p className="small muted">{lastBookingNote}</p>
          </Reveal>
          <Reveal className="card" delay={120}>
            <h2 id="sarbatori-titlu" className="h3-like">
              Sărbători legale
            </h2>
            <p className="muted small">În zilele de mai jos programul diferă. Lista se actualizează în fiecare an.</p>
            <div className="table-scroll table-scroll--plain" tabIndex={0} role="region" aria-labelledby="sarbatori-titlu">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Sărbătoarea</th>
                    <th scope="col">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((h) => (
                    <tr key={h.date}>
                      <td>
                        <time dateTime={h.date}>{formatDate(h.date)}</time>
                      </td>
                      <th scope="row">{h.name}</th>
                      <td>
                        <span className={h.status === "închis" ? "status status--closed" : "status"}>
                          {h.status === "închis" ? "Închis" : h.hours}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream bg-leaves" aria-labelledby="anulare-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Politica de anulare</p>
            <h2 id="anulare-titlu">Simplu și corect pentru toată lumea</h2>
            <p className="lead">
              Fiecare oră din programul nostru e rezervată doar pentru tine. Dacă nu mai poți ajunge, anunță-ne și o
              putem oferi altcuiva.
            </p>
          </Reveal>
          <ol className="policy-list">
            {cancellationPolicy.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 90} className="card policy">
                <span className="policy__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{p.title}</h3>
                <p className="muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
          <p className="policy-contact">
            Pentru anulare: <a href={`tel:${site.phoneHref}`}>{site.phone}</a> (apel, SMS sau WhatsApp).
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="tarife-titlu">
        <div className="container container--narrow">
          <Reveal className="section-head">
            <p className="eyebrow">Tarife pe scurt</p>
            <h2 id="tarife-titlu">Prețuri pe durate</h2>
            <p className="lead">
              {site.priceNote} {site.payment}
            </p>
          </Reveal>
          <div className="table-scroll" tabIndex={0} role="region" aria-labelledby="tarife-titlu">
            <table className="rates-table">
              <thead>
                <tr>
                  <th scope="col">Serviciu</th>
                  <th scope="col">Durată și preț</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">
                      <Link href={`/servicii/#${s.id}`}>{s.name}</Link>
                    </th>
                    <td>
                      <ul className="rates">
                        {s.options.map((o) => (
                          <li key={o.minutes}>
                            <span className="muted">{minutes(o.minutes)}</span> <strong>{lei(o.price)}</strong>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop: "1.8rem" }}>
            <Link href="/servicii/#abonamente" className="btn">
              Abonamente <Icon name="arrow" size={20} />
            </Link>
            <Link href="/programare/" className="btn btn--primary">
              <Icon name="calendar" /> Programează-te
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
