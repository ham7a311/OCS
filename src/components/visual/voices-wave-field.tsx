const FAMILY_A = [
  {
    d: "M -140 -20 C 180 90, 430 40, 640 250 S 980 430, 1180 620 S 1360 780, 1600 910",
    tone: "mid",
  },
  {
    d: "M -160 70 C 160 180, 410 110, 620 330 S 960 520, 1160 710 S 1380 850, 1620 990",
    tone: "dim",
  },
  {
    d: "M -110 150 C 210 240, 460 190, 680 400 S 1000 560, 1220 740 S 1420 880, 1640 1040",
    tone: "accent",
  },
  {
    d: "M -180 230 C 140 310, 390 280, 600 490 S 940 650, 1140 820 S 1360 940, 1580 1100",
    tone: "dim",
    extra: true,
  },
  {
    d: "M -90 -90 C 240 20, 490 -40, 700 170 S 1040 360, 1240 540 S 1460 700, 1660 830",
    tone: "mid",
    extra: true,
  },
] as const;

const FAMILY_B = [
  {
    d: "M 1580 -40 C 1240 80, 1020 30, 800 240 S 460 430, 260 620 S 80 790, -160 920",
    tone: "mid",
  },
  {
    d: "M 1600 50 C 1260 170, 1000 120, 780 330 S 440 520, 240 710 S 40 860, -180 1000",
    tone: "dim",
  },
  {
    d: "M 1560 140 C 1220 250, 980 210, 760 410 S 420 570, 220 750 S 20 900, -200 1050",
    tone: "accent",
  },
  {
    d: "M 1620 220 C 1280 320, 960 300, 740 500 S 400 660, 200 830 S 0 960, -220 1120",
    tone: "dim",
    extra: true,
  },
  {
    d: "M 1540 -110 C 1200 10, 1040 -50, 820 160 S 500 350, 300 540 S 120 720, -140 850",
    tone: "mid",
    extra: true,
  },
] as const;

function WaveFamily({
  paths,
  className,
}: {
  paths: typeof FAMILY_A | typeof FAMILY_B;
  className: string;
}) {
  return (
    <g className={className}>
      {paths.map((path) => (
        <path
          key={path.d}
          className={`voices-wave voices-wave--${path.tone}${"extra" in path && path.extra ? " voices-wave--extra" : ""}`}
          d={path.d}
        />
      ))}
    </g>
  );
}

/**
 * Atmospheric crossing field for the Voices page.
 * Two families of organic paths, animated only through CSS transforms.
 */
export function VoicesWaveField() {
  return (
    <div className="voices-wave-field" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <WaveFamily paths={FAMILY_A} className="voices-waves--a" />
        <WaveFamily paths={FAMILY_B} className="voices-waves--b" />

        <g className="voices-signal" transform="translate(1040 248)">
          <circle className="voices-signal-pulse" r="12" />
          <circle className="voices-signal-ring" r="7" />
          <circle className="voices-signal-core" r="1.6" />
        </g>
      </svg>
    </div>
  );
}
