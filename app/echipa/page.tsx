import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Avatar } from "@/components/illustrations/Avatar";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { serviceById, services } from "@/data/services";
import { staff } from "@/data/staff";

export const metadata: Metadata = {
  title: "Echipa",
  description: "Terapeuții studioului, specialitățile și experiența lor.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Echipa"
        title="Mâinile care te îngrijesc"
        lead="Fiecare terapeut are pregătire de specialitate și ani de practică. Dacă ai o preferință, spune-ne la programare."
        icon="hands"
      />

      <section className="section" aria-label="Terapeuți">
        <div className="container">
          <ul className="team-list">
            {staff.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 2) * 120} className="card person">
                <div className="person__portrait">
                  {p.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photo} alt={`Fotografie: ${p.name}`} width={400} height={440} loading="lazy" />
                  ) : (
                    <Avatar style={p.avatar} />
                  )}
                </div>
                <div className="person__body">
                  <h2 className="person__name">{p.name}</h2>
                  <p className="person__role">{p.role}</p>
                  <p className="person__quote">„{p.quote}”</p>
                  <p>{p.bio}</p>
                  <dl className="person__facts">
                    <div>
                      <dt>Experiență</dt>
                      <dd>{p.years} ani</dd>
                    </div>
                    <div>
                      <dt>Limbi</dt>
                      <dd>{p.languages.join(", ")}</dd>
                    </div>
                  </dl>
                  <h3 className="person__spec-title">Specialități</h3>
                  <ul className="tag-list">
                    {p.specialties.map((id) => (
                      <li key={id}>
                        <Link className="tag tag--link" href={`/servicii/#${id}`}>
                          {serviceById(id)?.name ?? id}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--cream bg-leaves" aria-labelledby="cine-titlu">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Pe scurt</p>
            <h2 id="cine-titlu">Cine ce face</h2>
            <p className="lead">Toți terapeuții fac masaj de relaxare. Mai jos, specialitățile fiecăruia.</p>
          </Reveal>
          <div className="table-scroll" tabIndex={0} role="region" aria-labelledby="cine-titlu">
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">Serviciu</th>
                  {staff.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.name.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <th scope="row">{s.name}</th>
                    {staff.map((p) => {
                      const yes = p.specialties.includes(s.id) || s.id === "relaxare";
                      return (
                        <td key={p.id}>
                          {yes ? (
                            <Icon name="check" size={20} title="da" />
                          ) : (
                            <span className="matrix__no">
                              <span aria-hidden="true">·</span>
                              <span className="visually-hidden">nu</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop: "2rem" }}>
            <Link href="/programare/" className="btn btn--primary">
              <Icon name="calendar" /> Programează-te
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
