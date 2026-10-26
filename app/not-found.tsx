import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { LEAF_D } from "@/components/illustrations/shapes";

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită",
};

export default function NotFound() {
  return (
    <section className="section lost bg-leaves">
      <div className="container container--narrow lost__inner">
        <svg className="lost__art" viewBox="0 0 320 220" fill="none" strokeLinecap="round" aria-hidden="true" focusable="false">
          <g className="lost__ripples">
            <ellipse cx="160" cy="180" rx="40" ry="8" />
            <ellipse cx="160" cy="180" rx="80" ry="16" />
            <ellipse cx="160" cy="180" rx="130" ry="24" />
          </g>
          <g className="lost__leaf">
            <g transform="translate(145 40) rotate(20) scale(1.4)">
              <path d={LEAF_D} />
              <path className="vein" d="M2 0H26" />
            </g>
          </g>
        </svg>
        <p className="eyebrow">Eroare 404</p>
        <h1>Pagina s-a pierdut printre frunze</h1>
        <p className="lead">
          Poate a fost mutată sau adresa are o mică greșeală. Respiră adânc; te ducem înapoi pe drumul cel bun.
        </p>
        <div className="btn-row btn-row--center">
          <Link href="/" className="btn btn--primary">
            Înapoi acasă
          </Link>
          <Link href="/servicii/" className="btn">
            Servicii și prețuri
          </Link>
          <Link href="/relaxare/" className="btn">
            <Icon name="breath" /> Un minut de respirație
          </Link>
        </div>
      </div>
    </section>
  );
}
