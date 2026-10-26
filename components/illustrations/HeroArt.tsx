import { Leaves, ROUND_LEAF_D, type Placed } from "./shapes";

/**
 * Ilustrația principală: pietre echilibrate pe apă, ramură de eucalipt,
 * ferigă, ceașcă de ceai cu abur și lumânare. Grupurile .breathe „respiră”
 * lent (CSS), iar animațiile se opresc la prefers-reduced-motion.
 */
const eucalyptus: Placed[] = [
  { x: 118, y: 430, rot: -20, s: 1 },
  { x: 96, y: 396, rot: 30, s: 1.1 },
  { x: 120, y: 360, rot: -10, s: 1.15 },
  { x: 108, y: 320, rot: 40, s: 1.2 },
  { x: 140, y: 292, rot: -30, s: 1.1 },
  { x: 140, y: 252, rot: 25, s: 1.15 },
  { x: 176, y: 232, rot: -40, s: 1 },
  { x: 176, y: 196, rot: 10, s: 1.05 },
  { x: 208, y: 180, rot: -50, s: 0.9 },
  { x: 208, y: 146, rot: 0, s: 0.85 },
  { x: 228, y: 118, rot: -30, s: 0.7 },
];

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
        <path className="ha-stem" d="M112 500C98 420 108 340 150 270S232 150 236 104" />
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
