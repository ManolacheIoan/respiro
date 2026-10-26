import Link from "next/link";
import { BUSINESS_NAME } from "@/config/site";

/**
 * Semnul studioului: trei pietre echilibrate din care crește o frunză.
 * Fiecare linie are pathLength=1, ca animația de desenare (CSS) să fie simplă.
 */
export function LogoMark({ size = 40, draw = false }: { size?: number; draw?: boolean }) {
  return (
    <svg
      className={draw ? "logo-mark logo-mark--draw" : "logo-mark"}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="logo-mark__ring" cx="32" cy="32" r="30" pathLength={1} />
      <g className="logo-mark__stones">
        <path pathLength={1} d="M14.5 47.5c0-3.2 7.8-5.3 17.5-5.3s17.5 2.1 17.5 5.3-7.8 4.8-17.5 4.8-17.5-1.6-17.5-4.8Z" />
        <path pathLength={1} d="M19.8 37c0-2.6 5.5-4.3 12.2-4.3s12.2 1.7 12.2 4.3-5.5 4-12.2 4-12.2-1.4-12.2-4Z" />
        <path pathLength={1} d="M24.6 27.9c0-2 3.3-3.3 7.4-3.3s7.4 1.3 7.4 3.3-3.3 3.1-7.4 3.1-7.4-1.1-7.4-3.1Z" />
      </g>
      <g className="logo-mark__leaf">
        <path pathLength={1} d="M32 24.6C31 17 35.5 11.5 44 10.5c.8 8.2-4.2 13.6-12 14.1Z" />
        <path pathLength={1} d="M32.3 24.2c2.6-3.8 5.4-6.8 9-9.6" />
      </g>
    </svg>
  );
}

/** Logo complet (semn + nume), ca link spre pagina principală. */
export function Logo({ draw = true }: { draw?: boolean }) {
  const [first, ...rest] = BUSINESS_NAME.split(" ");
  return (
    <Link href="/" className="logo">
      <LogoMark draw={draw} />
      {/* Numele vizibil este și numele accesibil al linkului (WCAG 2.5.3). */}
      <span className="logo__text">
        <span className="logo__name">{first}</span>
        {rest.length ? <span className="logo__sub"> {rest.join(" ")}</span> : null}
        <span className="visually-hidden"> — pagina principală</span>
      </span>
    </Link>
  );
}
