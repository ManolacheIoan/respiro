import { Icon } from "@/components/icons";
import { Sprig } from "@/components/illustrations/shapes";
import type { IconName } from "@/lib/icon-names";

/** Antetul paginilor interioare: titlu, introducere, iconiță și o rămurică discretă. */
export function PageHero({
  eyebrow,
  title,
  lead,
  icon,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  icon?: IconName;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero bg-waves">
      <Sprig className="page-hero__sprig" />
      <div className="container page-hero__inner">
        {icon ? (
          <span className="page-hero__icon icon-badge">
            <Icon name={icon} size={34} />
          </span>
        ) : null}
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
