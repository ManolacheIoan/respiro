/** Forme reutilizate în ilustrații (frunză, rămurică). Toate sunt decorative. */

/** Frunză îngustă, orizontală, cu baza în (0,0) și vârful la (30,0). */
export const LEAF_D = "M0 0C6-9 20-11 30 0 20 11 6 9 0 0Z";
/** Frunză rotundă de eucalipt, centrată în (0,0). */
export const ROUND_LEAF_D = "M-10 0C-10-6.5-5-10 0-10S10-6.5 10 0 5 10 0 10-10 6.5-10 0Z";

export interface Placed {
  x: number;
  y: number;
  rot: number;
  s?: number;
}

export function Leaves({ items, d = LEAF_D, className }: { items: Placed[]; d?: string; className?: string }) {
  return (
    <g className={className}>
      {items.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s ?? 1})`}>
          <path d={d} />
          {d === LEAF_D ? <path className="vein" d="M2 0H26" /> : null}
        </g>
      ))}
    </g>
  );
}

/** Rămurică simplă de frunze, desenată cu linie (pentru colțuri și fundaluri). */
export function Sprig({ className, flip = false }: { className?: string; flip?: boolean }) {
  const leaves: Placed[] = [
    { x: 40, y: 150, rot: -150, s: 1.1 },
    { x: 44, y: 128, rot: -20, s: 1.15 },
    { x: 52, y: 106, rot: -160, s: 1.05 },
    { x: 60, y: 86, rot: -30, s: 1 },
    { x: 72, y: 66, rot: -165, s: 0.9 },
    { x: 84, y: 48, rot: -40, s: 0.85 },
    { x: 98, y: 32, rot: -120, s: 0.75 },
  ];
  return (
    <svg
      className={className}
      viewBox="0 0 140 190"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path className="sprig__stem" d="M30 188C34 140 52 86 104 22" />
      <Leaves className="sprig__leaves" items={leaves} />
    </svg>
  );
}
