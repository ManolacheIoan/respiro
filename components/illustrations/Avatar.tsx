import type { AvatarStyle } from "@/data/staff";

/**
 * Portret ilustrat al unui terapeut (personaj fictiv), în același stil cu
 * restul ilustrațiilor: linie subțire, tonuri calde, accent auriu.
 */
export function Avatar({ style, className }: { style: AvatarStyle; className?: string }) {
  const { hair, skin, hairColor, top } = style;
  const hairFill = { fill: hairColor };
  return (
    <svg
      className={className ? `avatar ${className}` : "avatar"}
      viewBox="0 0 200 220"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path className="avatar__arch" d="M16 220V100a84 84 0 0 1 168 0v120Z" />
      <path className="avatar__sprig" d="M156 220c-4-40 2-80 20-112M168 150c8-6 14-8 22-8M162 178c-10-4-16-10-20-18M170 124c-8-2-14-6-18-14" />

      {/* Păr lung, în spate */}
      {hair === "lung" ? <path style={hairFill} d="M60 168C54 120 62 62 100 62s46 58 40 106c-14 8-66 8-80 0Z" /> : null}

      {/* Umeri */}
      <path style={{ fill: top }} className="avatar__line" d="M34 220c4-38 30-56 66-56s62 18 66 56Z" />
      <path className="avatar__accent" d="M80 172q20 14 40 0" />

      {/* Gât */}
      <path style={{ fill: skin }} className="avatar__line" d="M88 136h24v28a12 12 0 0 1-24 0Z" />

      {/* Cap */}
      <ellipse style={{ fill: skin }} className="avatar__line" cx="100" cy="112" rx="30" ry="35" />

      {/* Păr */}
      {hair === "coc" ? (
        <>
          <circle style={hairFill} cx="100" cy="66" r="14" />
          <path style={hairFill} d="M70 110c-2-28 12-42 30-42s32 14 30 42c-6-14-16-22-30-22s-24 8-30 22Z" />
        </>
      ) : null}
      {hair === "scurt" || hair === "barba" ? (
        <path style={hairFill} d="M70 106c-2-26 12-40 30-40s33 13 30 40c-5-11-13-18-30-20-15 1-25 8-30 20Z" />
      ) : null}
      {hair === "barba" ? <path style={hairFill} d="M72 118c1 20 13 29 28 29s27-9 28-29c-4 4-9 6-14 6-3-3-8-4-14-4s-11 1-14 4c-5 0-10-2-14-6Z" /> : null}
      {hair === "lung" ? <path style={hairFill} d="M70 106c4-22 16-32 30-32s27 10 30 32c-9-10-19-15-30-15s-21 5-30 15Z" /> : null}
      {hair === "cret" ? (
        <g style={hairFill}>
          {[
            [72, 100, 10],
            [76, 84, 11],
            [88, 72, 11],
            [104, 68, 12],
            [119, 74, 11],
            [128, 88, 10],
            [130, 102, 9],
            [100, 82, 12],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      ) : null}

      {/* Față: ochi închiși, zâmbet calm */}
      <g className="avatar__face">
        <path d="M84 113q5 4 10 0M106 113q5 4 10 0" />
        <path d="M100 117v8" />
        {hair === "barba" ? <path className="avatar__mouth-light" d="M94 133q6 3 12 0" /> : <path d="M93 131q7 5 14 0" />}
      </g>
      <path className="avatar__accent" d="M138 52c0-8 6-14 14-14 0 8-6 14-14 14Z" />
    </svg>
  );
}
