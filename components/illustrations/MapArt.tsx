/** Hartă ilustrată, orientativă (fără servicii externe): străzi, un parc, un râu și studioul. */
export function MapArt() {
  return (
    <svg className="map-art" viewBox="0 0 480 340" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect width="480" height="340" rx="22" className="map-art__bg" />
      <path className="map-art__river" d="M-10 268c60-24 110 12 170-6s96-56 160-48 120 34 170 18" />
      <g className="map-art__streets">
        <path d="M0 120h480M0 200h300M150 0v340M330 0v340M240 120v80M60 0l90 120" />
      </g>
      <g className="map-art__blocks">
        <rect x="170" y="20" width="140" height="80" rx="10" />
        <rect x="350" y="20" width="110" height="80" rx="10" />
        <rect x="20" y="140" width="110" height="44" rx="10" />
        <rect x="350" y="140" width="110" height="44" rx="10" />
        <rect x="260" y="140" width="50" height="44" rx="10" />
      </g>
      <g className="map-art__park">
        <rect x="170" y="140" width="56" height="44" rx="10" />
        <path d="M184 168c0-8 5-13 12-13 0 7-5 12-12 13ZM206 172c-1-9 4-15 12-16 1 8-4 14-12 16Z" />
      </g>
      <g className="map-art__pin">
        <circle className="map-art__pulse" cx="240" cy="96" r="22" />
        <path d="M240 112s16-14 16-27a16 16 0 0 0-32 0c0 13 16 27 16 27Z" />
        <circle cx="240" cy="85" r="5.5" className="map-art__dot" />
      </g>
      <text x="24" y="40" className="map-art__label">
        N
      </text>
      <path className="map-art__north" d="M28 50v-4M28 72V54l-5 8M28 54l5 8" />
    </svg>
  );
}
