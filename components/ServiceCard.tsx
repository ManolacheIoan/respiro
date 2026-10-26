import Link from "next/link";
import { Icon } from "@/components/icons";
import { fromPrice, type Service } from "@/data/services";
import { lei } from "@/lib/format";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card card--hover service-card">
      <span className="icon-badge icon-badge--sand">
        <Icon name={service.icon} size={32} />
      </span>
      <h3>
        <Link href={`/servicii/#${service.id}`} className="service-card__link">
          {service.name}
        </Link>
      </h3>
      <p className="muted">{service.short}</p>
      <p className="service-card__meta">
        <span>{service.options.map((o) => `${o.minutes}`).join(" / ")} min</span>
        <span className="price">
          <small>de la</small> {lei(fromPrice(service))}
        </span>
      </p>
    </article>
  );
}
