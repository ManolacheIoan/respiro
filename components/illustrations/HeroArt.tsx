import { Leaves, ROUND_LEAF_D, type Placed } from "./shapes";

/**
 * Ilustrația principală: pietre echilibrate pe apă, ramură de eucalipt,
 * ferigă, ceașcă de ceai cu abur și lumânare. Grupurile .breathe „respiră”
 * lent (CSS), iar animațiile se opresc la prefers-reduced-motion.
 */
/** Punct pe o curbă Bézier cubică, plus direcția tangentei (în grade). */
function bezier(p: number[][], t: number) {
  const m = 1 - t;
  const x = m ** 3 * p[0][0] + 3 * m * m * t * p[1][0] + 3 * m * t * t * p[2][0] + t ** 3 * p[3][0];
  const y = m ** 3 * p[0][1] + 3 * m * m * t * p[1][1] + 3 * m * t * t * p[2][1] + t ** 3 * p[3][1];
  const dx = 3 * m * m * (p[1][0] - p[0][0]) + 6 * m * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const dy = 3 * m * m * (p[1][1] - p[0][1]) + 6 * m * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

// Tulpina de eucalipt (două segmente) și frunzele rotunde prinse de ea, alternativ stânga/dreapta.
const STEM_A = [[80, 500], [70, 420], [84, 340], [134, 272]];
const STEM_B = [[134, 272], [184, 204], [226, 160], [232, 104]];
const round = (n: number) => Math.round(n * 10) / 10;
const eucalyptus: Placed[] = [0.12, 0.27, 0.42, 0.57, 0.72, 0.87, 1.02, 1.17, 1.32, 1.47, 1.62, 1.8].map((u, i) => {
  const { x, y, angle } = u <= 1 ? bezier(STEM_A, u) : bezier(STEM_B, Math.min(u - 1, 0.98));
  const side = i % 2 ? 1 : -1;
  const s = 1.15 - u * 0.25;
  const off = 8 * s;
  const rad = ((angle + 90 * side) * Math.PI) / 180;
  return { x: round(x + Math.cos(rad) * off), y: round(y + Math.sin(rad) * off), rot: round(angle), s: round(s) };
});

const fern: Placed[] = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  const x = 404 - 70 * t * t - 6 * t;
  const y = 470 - 200 * t;
  const s = 1.25 - 0.7 * t;
  return [
    { x, y, rot: -150 - 15 * t, s },
    { x, y, rot: -20 - 25 * t, s },
  ];
}).flat();

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `hero-art ${className}` : "hero-art"}
      viewBox="0 0 480 520"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Arcadă de fundal */}
      <path className="ha-arch" d="M48 520V236a192 192 0 0 1 384 0v284Z" />
      <path className="ha-arch-line" d="M64 520V238a176 176 0 0 1 352 0v282" />

      {/* Soare / lună */}
      <g className="breathe breathe--glow">
        <circle className="ha-sun-glow" cx="330" cy="150" r="70" />
        <circle className="ha-sun" cx="330" cy="150" r="44" />
      </g>

      {/* Eucalipt */}
      <g className="breathe breathe--a">
        <path className="ha-stem" d="M80 500C70 420 84 340 134 272S226 160 232 104" />
        <Leaves className="ha-round-leaves" items={eucalyptus} d={ROUND_LEAF_D} />
      </g>

      {/* Ferigă */}
      <g className="breathe breathe--b">
        <path className="ha-stem" d="M404 500C404 430 396 340 330 268" />
        <Leaves className="ha-fern" items={fern} />
      </g>

      {/* Apă */}
      <path className="ha-water" d="M48 470c40-8 76 8 116 0s76-8 116 0 76 8 116 0 32-4 36-4" />
      <path className="ha-water ha-water--2" d="M78 492c34-6 64 6 98 0s64-6 98 0 64 6 98 0" />

      {/* Pietre */}
      <g className="ha-stones">
        <ellipse className="ha-stone ha-stone--1" cx="240" cy="446" rx="104" ry="25" />
        <ellipse className="ha-stone ha-stone--2" cx="234" cy="405" rx="76" ry="20" />
        <ellipse className="ha-stone ha-stone--3" cx="244" cy="370" rx="52" ry="15.5" />
        <ellipse className="ha-stone ha-stone--4" cx="238" cy="342" rx="30" ry="11" />
        <path className="ha-shine" d="M176 436c18-8 50-11 74-10M190 397c14-6 34-8 52-7M214 363c10-4 22-5 32-4M224 337c6-2 12-3 18-2" />
      </g>

      {/* Ceașcă de ceai cu abur */}
      <g className="ha-cup">
        <path className="ha-object" d="M118 430h52v14a22 22 0 0 1-22 22h-8a22 22 0 0 1-22-22v-14Z" />
        <path className="ha-object-line" d="M170 436h5a9 9 0 0 1 0 18h-6M108 474h72" />
        <g className="steam">
          <path d="M134 418c-6-6 6-10 0-18s4-12 0-18" />
          <path d="M152 418c-6-6 6-10 0-18s4-12 0-18" />
        </g>
      </g>

      {/* Lumânare */}
      <g className="ha-candle">
        <circle className="ha-flame-glow breathe breathe--glow" cx="352" cy="362" r="24" />
        <rect className="ha-object" x="334" y="384" width="36" height="76" rx="5" />
        <path className="ha-object-line" d="M352 384v-8M334 396c4 4 8 4 12 0 4 4 8 4 12 0" />
        <path className="ha-flame flame" d="M352 344c7 9 10 14 10 19a10 10 0 0 1-20 0c0-5 3-10 10-19Z" />
      </g>
    </svg>
  );
}
