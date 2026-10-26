import Link from "next/link";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { BUSINESS_NAME, footerNav, hours, nav, site, whatsappLink } from "@/config/site";

/** Rezumă programul: zilele consecutive cu același orar apar pe un singur rând. */
function hoursSummary() {
  const rows: { label: string; value: string }[] = [];
  for (const h of hours) {
    const value = h.open ? `${h.open}–${h.close}` : "închis";
    const last = rows.at(-1);
    if (last && last.value === value) {
      last.label = `${last.label.split("–")[0]}–${h.label}`;
    } else rows.push({ label: h.label, value });
  }
  return rows;
}

export function Footer() {
  return (
    <footer className="site-footer bg-leaves">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <LogoMark size={52} />
          <p className="site-footer__name">{BUSINESS_NAME}</p>
          <p className="muted">{site.tagline}.</p>
        </div>

        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__list">
            <li>
              <a href={`tel:${site.phoneHref}`}>
                <Icon name="phone" size={20} /> {site.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink()}>
                <Icon name="chat" size={20} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={20} /> {site.email}
              </a>
            </li>
            <li>
              <Icon name="pin" size={20} /> {site.address.street}, {site.area}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Program</h2>
          <dl className="site-footer__hours">
            {hoursSummary().map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/program/" className="link-arrow small">
            Sărbători și politica de anulare <Icon name="arrow" size={18} />
          </Link>
        </div>

        <nav aria-label="Subsol">
          <h2 className="site-footer__title">Pagini</h2>
          <ul className="site-footer__list site-footer__list--cols">
            {[{ href: "/", label: "Acasă" }, ...nav, ...footerNav].map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {BUSINESS_NAME}. Ilustrații și texte originale.
        </p>
        <p>Masajul de relaxare nu înlocuiește consultul sau tratamentul medical.</p>
      </div>
    </footer>
  );
}
