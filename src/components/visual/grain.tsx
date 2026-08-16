/**
 * A fine film of noise over the whole page. Its real job is to break up
 * banding in the large dark gradients, which is what otherwise gives a dark
 * site away as flat.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="ocs-grain pointer-events-none fixed inset-0 z-50"
    >
      <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="ocs-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ocs-grain)" />
      </svg>
    </div>
  );
}
