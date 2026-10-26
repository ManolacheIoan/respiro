import Link from "next/link";
import { Icon } from "@/components/icons";
import { Avatar } from "@/components/illustrations/Avatar";
import { Divider } from "@/components/illustrations/Divider";
import { HeroArt } from "@/components/illustrations/HeroArt";
import { LeafDrift } from "@/components/illustrations/LeafDrift";
import { Sprig } from "@/components/illustrations/shapes";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { TodayHours } from "@/components/TodayHours";
import { Voucher } from "@/components/Voucher";
import { BUSINESS_NAME, site, whatsappLink } from "@/config/site";
import { services } from "@/data/services";
import { staff } from "@/data/staff";
import type { IconName } from "@/lib/icon-names";

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "breath", title: "Respirație mai lentă", text: "Ritmul calm al masajului te ajută să încetinești și să lași grijile la ușă." },
  { icon: "hands", title: "Mușchi mai relaxați", text: "Lucrăm cu răbdare pe zonele încordate de stat la birou, de condus sau de sport." },
  { icon: "candle", title: "Seri mai liniștite", text: "Mulți clienți ne spun că după o ședință dorm mai bine și se simt mai odihniți." },
  { icon: "leaf", title: "Timp doar pentru tine", text: "Fără telefon, fără grabă: o oră în care singura ta treabă este să respiri." },
];

const steps = [
  { title: "Sosire și ceai", text: "Te așteptăm cu un ceai cald de plante și câteva minute în care să te așezi." },
  { title: "Discuție scurtă", text: "Ne spui ce simți, unde te doare sau ce îți dorești. Alegem împreună presiunea și uleiul." },
  { title: "Masajul", text: "Într-o cameră caldă, cu lumină slabă și muzică discretă. Poți vorbi sau poți tăcea." },
  { title: "Revenire lină", text: "Rămâi câteva minute în liniște, apoi un pahar cu apă și, dacă vrei, recomandări pentru acasă." },
];

export default function Home() {
  return (
    <>
      <section className="hero bg-leaves">
        <LeafDrift />
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1>
              Un loc pentru <em>liniște</em>, atingere și respirație
            </h1>
            <p className="lead">
              {site.tagline}. La {BUSINESS_NAME}, fiecare ședință începe cu o discuție și se termină fără grabă.
            </p>
            <div className="btn-row">
              <Link href="/programare/" className="btn btn--primary">
                <Icon name="calendar" /> Programează-te
              </Link>
              <Link href="/servicii/" className="btn">
                Servicii și prețuri
              </Link>
            </div>
            <ul className="hero__facts">
              <li>
                <Icon name="clock" size={22} /> <TodayHours />
              </li>
              <li>
                <Icon name="phone" size={22} /> <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
            </ul>
          </div>
          <div className="hero__art">
            <HeroArt />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="servicii-titlu">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Servicii</p>
            <h2 id="servicii-titlu">Alege ritmul care ți se potrivește</h2>
            <Divider />
            <p className="lead">
              De la masaj de relaxare până la ritualuri cu pietre calde. Dacă nu știi ce să alegi, te ajutăm noi la
              telefon.
            </p>
          </Reveal>
          <div className="grid grid--4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <p className="center-link">
            <Link href="/servicii/" className="link-arrow">
              Toate duratele, abonamentele și prețurile <Icon name="arrow" size={20} />
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--sage benefits" aria-labelledby="beneficii-titlu">
        <Sprig className="benefits__sprig" />
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">De ce masaj</p>
            <h2 id="beneficii-titlu">O pauză pe care corpul o simte</h2>
            <p className="lead">
              Nu promitem minuni. Promitem o oră de atenție, mâini pricepute și un spațiu în care chiar te poți
              relaxa.
            </p>
          </Reveal>
          <ul className="grid grid--4 benefit-list">
            {benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 90} className="benefit">
                <Icon name={b.icon} size={40} />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </ul>
          <Link href="/despre-masaj/" className="link-arrow">
            Beneficii, contraindicații și cum te pregătești <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>

      <section className="section bg-stones" aria-labelledby="sedinta-titlu">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <p className="eyebrow">Cum decurge o ședință</p>
            <h2 id="sedinta-titlu">Patru pași, fără grabă</h2>
            <Divider />
          </Reveal>
          <ol className="steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 120} className="step">
                <span className="step__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream bg-leaves" aria-labelledby="echipa-titlu">
        <div className="container team-teaser">
          <Reveal className="section-head">
            <p className="eyebrow">Echipa</p>
            <h2 id="echipa-titlu">Oameni calmi, mâini sigure</h2>
            <p className="lead">
              Patru terapeuți cu experiență, fiecare cu specialitatea lui. Îți recomandăm persoana potrivită pentru
              ce ai nevoie.
            </p>
            <Link href="/echipa/" className="btn">
              Cunoaște echipa <Icon name="arrow" size={20} />
            </Link>
          </Reveal>
          <ul className="team-teaser__list">
            {staff.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 100}>
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="avatar" src={p.photo} alt="" width={400} height={440} loading="lazy" />
                ) : (
                  <Avatar style={p.avatar} />
                )}
                <p className="team-teaser__name">{p.name}</p>
                <p className="small muted">{p.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="cadou-titlu">
        <div className="container gift-teaser">
          <Reveal className="gift-teaser__art">
            <Voucher amount={250} />
          </Reveal>
          <Reveal className="gift-teaser__copy" delay={120}>
            <p className="eyebrow">Card cadou</p>
            <h2 id="cadou-titlu">Dăruiește o oră de liniște</h2>
            <p className="lead">
              Alegi suma, scrii o dedicație și tipărești cardul acasă. Se poate folosi pentru orice masaj, timp de
              șase luni.
            </p>
            <Link href="/card-cadou/" className="btn btn--primary">
              <Icon name="gift" /> Creează un card cadou
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="contact-strip" aria-labelledby="contact-titlu">
        <div className="container contact-strip__inner">
          <div>
            <h2 id="contact-titlu">Hai să găsim o oră pentru tine</h2>
            <p>
              <TodayHours /> · {site.address.street}, {site.area}
            </p>
          </div>
          <div className="btn-row">
            <a href={`tel:${site.phoneHref}`} className="btn btn--light">
              <Icon name="phone" /> {site.phone}
            </a>
            <a href={whatsappLink("Bună ziua! Aș dori o programare.")} className="btn btn--ghost-light">
              <Icon name="chat" /> Scrie pe WhatsApp
            </a>
            <Link href="/programare/" className="btn btn--ghost-light">
              <Icon name="calendar" /> Formular de programare
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
