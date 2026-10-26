import { LEAF_D } from "./shapes";

/**
 * Câteva frunze care plutesc foarte lent prin fundal. Doar decorative;
 * ascunse complet la prefers-reduced-motion (vezi .leaf-drift în CSS).
 */
const LEAVES = [
  { top: "12%", dur: 34, delay: -4, size: 26 },
  { top: "38%", dur: 42, delay: -18, size: 20 },
  { top: "64%", dur: 38, delay: -9, size: 30 },
  { top: "82%", dur: 46, delay: -30, size: 18 },
];

export function LeafDrift() {
  return (
    <div className="leaf-drift" aria-hidden="true">
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="leaf-drift__leaf"
          style={{ top: l.top, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` } as React.CSSProperties}
        >
          <svg width={l.size} height={l.size} viewBox="-2 -12 34 24" fill="none" focusable="false">
            <path d={LEAF_D} />
            <path d="M2 0H26" className="vein" />
          </svg>
        </span>
      ))}
    </div>
  );
}
