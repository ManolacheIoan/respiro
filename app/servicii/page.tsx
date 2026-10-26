import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Divider } from "@/components/illustrations/Divider";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { extras, packages, serviceGroups, services } from "@/data/services";
import { lei, minutes } from "@/lib/format";

export const metadata: Metadata = {
  title: "Servicii și prețuri",
  description: "Tipuri de masaj, durate și prețuri în lei, abonamente și ritualuri.",
};

const intensityLabel = { blândă: 1, medie: 2, fermă: 3 } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicii și prețuri"
        title="Masaje, ritualuri și abonamente"
        lead="Toate prețurile sunt în lei și includ ceaiul de plante de la final. Dacă nu știi ce să alegi, sună-ne și îți recomandăm noi."
        icon="lotus"
      >
        <nav className="chip-nav" aria-label="Categorii de servicii">
          <ul>
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <a href={`#grup-${g.id}`}>{g.title}</a>
              </li>
            ))}
            <li>
              <a href="#abonamente">Abonamente și ritualuri</a>
            </li>
            <li>
              <a href="#suplimente">Suplimente</a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {serviceGroups.map((g, gi) => (
        <section
          key={g.id}
          id={`grup-${g.id}`}
          className={gi % 2 ? "section section--cream bg-leaves" : "section"}
          aria-labelledby={`grup-${g.id}-titlu`}
        >
          <div className="container">
            <Reveal className="section-head">
              <h2 id={`grup-${g.id}-titlu`}>{g.title}</h2>
              <p className="lead">{g.intro}</p>
            </Reveal>
            <div className="service-list">
              {services
                .filter((s) => s.group === g.id)
                .map((s) => (
                  <Reveal as="article" key={s.id} className="card service-detail">
                    <span id={s.id} className="anchor" />
                    <div className="service-detail__head">
                      <span className="icon-badge icon-badge--sand">
                        <Icon name={s.icon} size={34} />
                      </span>
                      <div>
                        <h3>{s.name}</h3>
                        <p className="service-detail__intensity">
                          <span className="intensity" aria-hidden="true">
                            {[1, 2, 3].map((n) => (
                              <span key={n} data-on={n <= intensityLabel[s.intensity]} />
                            ))}
                          </span>
                          Presiune {s.intensity}
                        </p>
                      </div>
                    </div>
                    <p>{s.description}</p>
                    <p className="small muted service-detail__for">Potrivit pentru:</p>
                    <ul className="tag-list">
                      {s.goodFor.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <table className="price-table">
                      <caption className="visually-hidden">Durate și prețuri pentru {s.name}</caption>
                      <thead>
                        <tr>
                          <th scope="col">Durată</th>
                          <th scope="col">Preț</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.options.map((o) => (
                          <tr key={o.minutes}>
                            <th scope="row">{minutes(o.minutes)}</th>
                            <td>
                              <span className="price">{lei(o.price)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {s.note ? <p className="small muted">{s.note}</p> : null}
                    <Link
                      href={`/programare/?serviciu=${s.id}`}
                      className="btn btn--sm service-detail__cta"
                      aria-label={`Programează-te: ${s.name}`}
                    >
                      <Icon name="calendar" size={20} /> Programează-te
                    </Link>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      ))}

      <section id="abonamente" className="section section--sage" aria-labelledby="abonamente-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Abonamente și ritualuri</p>
            <h2 id="abonamente-titlu">Mai multe ședințe, un preț mai bun</h2>
            <p className="lead">
              Abonamentele se plătesc la prima vizită și se folosesc în perioada de valabilitate. Ședințele se
              programează pe rând, când îți convine.
            </p>
          </Reveal>
          <div className="grid grid--4 package-list">
            {packages.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90} className={p.highlight ? "package package--highlight" : "package"}>
                {p.highlight ? <p className="package__badge">Cel mai ales</p> : null}
                <Icon name={p.icon} size={36} />
                <h3>{p.name}</h3>
                <p className="package__desc">{p.description}</p>
                <ul className="package__includes">
                  {p.includes.map((x) => (
                    <li key={x}>
                      <Icon name="check" size={18} /> {x}
                    </li>
                  ))}
                </ul>
                <p className="package__price">
                  <span className="price">{lei(p.price)}</span>
                  {p.regularPrice ? (
                    <span className="package__regular">
                      <span className="visually-hidden">în loc de </span>
                      <s>{lei(p.regularPrice)}</s>
                    </span>
                  ) : null}
                </p>
                <p className="package__validity">{p.validity}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="suplimente" className="section" aria-labelledby="suplimente-titlu">
        <div className="container container--narrow">
          <Reveal className="section-head section-head--center">
            <h2 id="suplimente-titlu">Suplimente</h2>
            <Divider />
            <p className="lead">Se pot adăuga la orice masaj; spune-ne la programare sau la sosire.</p>
          </Reveal>
          <table className="price-table price-table--wide">
            <caption className="visually-hidden">Suplimente și prețuri</caption>
            <thead>
              <tr>
                <th scope="col">Supliment</th>
                <th scope="col">Preț</th>
              </tr>
            </thead>
            <tbody>
              {extras.map((e) => (
                <tr key={e.name}>
                  <th scope="row">{e.name}</th>
                  <td>
                    <span className="price">{lei(e.price)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small muted center-text">
            {site.priceNote} {site.payment}
          </p>
          <div className="btn-row btn-row--center">
            <Link href="/programare/" className="btn btn--primary">
              <Icon name="calendar" /> Programează-te
            </Link>
            <Link href="/card-cadou/" className="btn">
              <Icon name="gift" /> Oferă ca un card cadou
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
