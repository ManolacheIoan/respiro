/**
 * Iconițe originale, desenate cu linie subțire (1,4 px pe o grilă de 32)
 * și accente aurii. Linia principală folosește culoarea textului (currentColor),
 * accentele folosesc --gold (vezi .icon__accent în globals.css).
 */
import type { IconName } from "@/lib/icon-names";

type Paths = { base: React.ReactNode; accent?: React.ReactNode };

const P: Record<IconName, Paths> = {
  leaf: {
    base: <path d="M6 26C6 14 14 6 26 6c0 12-8 20-20 20Z" />,
    accent: <path d="M6 26 21 11M13 19h5M16 16v-5" />,
  },
  lotus: {
    base: (
      <>
        <path d="M16 7c3.2 4.2 3.2 11 0 17-3.2-6-3.2-12.8 0-17Z" />
        <path d="M16 24c-5.5 0-9.5-3.4-10.5-9.5 5.5.2 9.4 3.6 10.5 9.5ZM16 24c5.5 0 9.5-3.4 10.5-9.5-5.5.2-9.4 3.6-10.5 9.5Z" />
      </>
    ),
    accent: <path d="M5 27.5h22" />,
  },
  stones: {
    base: (
      <>
        <path d="M5 24.8c0-2.3 4.9-3.8 11-3.8s11 1.5 11 3.8-4.9 3.4-11 3.4S5 27.1 5 24.8Z" />
        <path d="M8.5 17.6c0-1.9 3.4-3.1 7.5-3.1s7.5 1.2 7.5 3.1-3.4 3-7.5 3-7.5-1.1-7.5-3Z" />
        <path d="M11.4 11.6c0-1.4 2-2.3 4.6-2.3s4.6.9 4.6 2.3-2 2.2-4.6 2.2-4.6-.8-4.6-2.2Z" />
      </>
    ),
    accent: <path d="M16 9.3c0-3 2-5 5-5 0 3-2 5-5 5Z" />,
  },
  hands: {
    base: (
      <>
        <path d="M4 15c2 0 3 1 4 3l2 4c1 2 3 3 6 3s5-1 6-3l2-4c1-2 2-3 4-3" />
        <path d="M8.5 18.5v-7a1.5 1.5 0 0 1 3 0V18M23.5 18.5v-7a1.5 1.5 0 0 0-3 0V18" />
      </>
    ),
    accent: <path d="M16 5.5c2 2.8 3 4.4 3 5.8a3 3 0 0 1-6 0c0-1.4 1-3 3-5.8Z" />,
  },
  towel: {
    base: (
      <>
        <path d="M7.5 11h15a5.5 5.5 0 0 1 0 11h-15" />
        <circle cx="7.5" cy="16.5" r="5.5" />
        <path d="M5 24.5h22" />
      </>
    ),
    accent: <path d="M7.5 14.3a2.2 2.2 0 1 1-2.2 2.2M14 11v11" />,
  },
  oil: {
    base: (
      <>
        <path d="M10.5 14h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V14Z" />
        <path d="M13.5 14v-3h4v3M14 11V8a1.5 1.5 0 0 1 3 0v3" />
      </>
    ),
    accent: <path d="M10.5 19h10M25.5 7.5c1 1.5 1.6 2.4 1.6 3.1a1.6 1.6 0 0 1-3.2 0c0-.7.6-1.6 1.6-3.1Z" />,
  },
  candle: {
    base: (
      <>
        <path d="M10.5 15h11v11a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V15Z" />
        <path d="M16 15v-2.5M10.5 18.5c1.2 1.2 2.4 1.2 3.6 0 1 1 2 1 3 0" />
      </>
    ),
    accent: <path d="M16 3.8c2 2.8 3 4.4 3 5.8a3 3 0 0 1-6 0c0-1.4 1-3 3-5.8Z" />,
  },
  steam: {
    base: (
      <>
        <path d="M5 18h22c0 5-5 8.5-11 8.5S5 23 5 18Z" />
        <path d="M12.5 28.5h7" />
      </>
    ),
    accent: <path d="M11.5 14.5c-2-2 2-3.5 0-6.5M16 14.5c-2-2 2-3.5 0-6.5M20.5 14.5c-2-2 2-3.5 0-6.5" />,
  },
  cup: {
    base: (
      <>
        <path d="M6 13h16v6a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-6Z" />
        <path d="M22 15h1.5a3 3 0 0 1 0 6H21.3M4 28.5h20" />
      </>
    ),
    accent: <path d="M11 10c-1.6-1.6 1.6-2.6 0-5M16.5 10c-1.6-1.6 1.6-2.6 0-5" />,
  },
  cups: {
    base: (
      <>
        <path d="M3 16h11v3.5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V16ZM18 16h11v3.5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V16Z" />
        <path d="M2 27.5h28" />
      </>
    ),
    accent: <path d="M16 13.5 12.9 10.4c-1.4-1.6.6-3.6 2.2-2.4l.9.8.9-.8c1.6-1.2 3.6.8 2.2 2.4L16 13.5Z" />,
  },
  gift: {
    base: (
      <>
        <path d="M6.5 14.5h19v12.5h-19zM5 10.5h22v4H5z" />
      </>
    ),
    accent: <path d="M16 10.5V27M16 10.5c-2.5-4-7.5-3.6-6.2-.4M16 10.5c2.5-4 7.5-3.6 6.2-.4" />,
  },
  breath: {
    base: (
      <>
        <path d="M4 12.5h13a3.2 3.2 0 1 0-3.2-3.2M4 17.5h19a3.2 3.2 0 1 1-3.2 3.2" />
      </>
    ),
    accent: <path d="M4 23h8M24.5 12.5h3.5" />,
  },
  phone: {
    base: <path d="M9.2 4.5h3.6l2 5.8-2.7 1.8a13.5 13.5 0 0 0 7.8 7.8l1.8-2.7 5.8 2v3.6a2.3 2.3 0 0 1-2.3 2.3C13.8 25.1 6.9 18.2 6.9 6.8a2.3 2.3 0 0 1 2.3-2.3Z" />,
    accent: <path d="M19 5a8 8 0 0 1 8 8M19 9a4 4 0 0 1 4 4" />,
  },
  chat: {
    base: <path d="M16 5c6.6 0 11.5 4.4 11.5 10s-4.9 10-11.5 10c-1.6 0-3.1-.3-4.5-.7L5.5 27l1.8-5.2C5.5 20 4.5 17.6 4.5 15 4.5 9.4 9.4 5 16 5Z" />,
    accent: <path d="M11 13.5h10M11 17.5h6" />,
  },
  mail: {
    base: <rect x="4" y="7.5" width="24" height="17" rx="3" />,
    accent: <path d="m5 10 11 8 11-8" />,
  },
  pin: {
    base: <path d="M16 28.5s9-8.2 9-15.3a9 9 0 0 0-18 0c0 7.1 9 15.3 9 15.3Z" />,
    accent: <circle cx="16" cy="13.2" r="3.2" />,
  },
  clock: {
    base: <circle cx="16" cy="16" r="11" />,
    accent: <path d="M16 9.5V16l4.2 3" />,
  },
  calendar: {
    base: <path d="M8 7h16a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3ZM5 13h22M11 4v5M21 4v5" />,
    accent: <circle cx="16" cy="20" r="2" />,
  },
  check: {
    base: <path d="m7 16.5 6 6L25 10" />,
  },
  arrow: {
    base: <path d="M6 16h19" />,
    accent: <path d="m18.5 9.5 6.5 6.5-6.5 6.5" />,
  },
  menu: {
    base: <path d="M5 10h22M5 16h22" />,
    accent: <path d="M5 22h14" />,
  },
  close: {
    base: <path d="m8.5 8.5 15 15M23.5 8.5l-15 15" />,
  },
  print: {
    base: (
      <>
        <path d="M9.5 12V5h13v7M9.5 22.5H6.5a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-3" />
        <path d="M9.5 18h13v9.5h-13z" />
      </>
    ),
    accent: <path d="M12.5 21.5h7M12.5 24.5h5" />,
  },
};

export function Icon({
  name,
  size = 24,
  className,
  title,
}: {
  name: IconName;
  size?: number;
  className?: string;
  /** Text pentru cititoarele de ecran; fără el iconița e decorativă. */
  title?: string;
}) {
  const { base, accent } = P[name];
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {base}
      {accent ? <g className="icon__accent">{accent}</g> : null}
    </svg>
  );
}
