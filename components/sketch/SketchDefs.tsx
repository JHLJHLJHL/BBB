/**
 * One shared <defs> sprite for every pencil illustration in the app.
 *
 * Mounted once from the root layout so that all <Sketch /> instances can point
 * at the same filters and patterns instead of duplicating (and colliding on)
 * them. Nothing here carries colour — strokes inherit `currentColor` from the
 * consuming component, which is what keeps the set monochrome.
 *
 * The filters are deliberately restrained. A heavy displacement reads as
 * "wobbly cartoon"; what a real pencil does is wander by a fraction of a
 * millimetre and leave a grainy edge, so the wobble is small and the grain
 * does the work.
 */
export function SketchDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        {/* Main line pass: a small wander plus a rough edge. */}
        <filter id="bb-pencil" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            seed="7"
            result="grain"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="1.15"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="2"
            seed="23"
            result="drift"
          />
          <feDisplacementMap
            in="rough"
            in2="drift"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* For lettering and small mechanisms, where 1.6px of drift would
            close up the counters of the glyphs. */}
        <filter id="bb-pencil-fine" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves="2"
            seed="19"
            result="grain"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="0.75"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* The under-drawing: looser, softer, the lines you lay down first and
            never quite erase. */}
        <filter id="bb-pencil-loose" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            seed="41"
            result="drift"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="drift"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="moved"
          />
          <feGaussianBlur in="moved" stdDeviation="0.35" />
        </filter>

        {/* Smudged graphite, for cast shadow and the darkest masses. */}
        <filter id="bb-smudge" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>

        {/* Paper tooth. Rendered as a low-opacity overlay rect inside Sketch. */}
        <filter id="bb-paper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            seed="3"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0.42 0.42 0.42 0 0"
          />
        </filter>

        {/* Broader fibre pass so the grain does not read as uniform static. */}
        <filter id="bb-fibre" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.42"
            numOctaves="2"
            seed="11"
            result="fibre"
          />
          <feColorMatrix
            in="fibre"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0.2 0.2 0.2 0 0"
          />
        </filter>

        {/* Dark-theme counterparts: same noise, inverted to white. */}
        <filter id="bb-paper-light" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            seed="3"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0.42 0.42 0.42 0 0"
          />
        </filter>

        <filter id="bb-fibre-light" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.42"
            numOctaves="2"
            seed="11"
            result="fibre"
          />
          <feColorMatrix
            in="fibre"
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0.2 0.2 0.2 0 0"
          />
        </filter>

        {/* ── tonal ramp ───────────────────────────────────────────────
            Four steps of hatching, from a barely-there tint to a near-solid
            mass. Using a ramp rather than one hatch is what lets a drawing
            read as lit rather than outlined. */}
        <pattern
          id="bb-t1"
          width="7"
          height="7"
          patternTransform="rotate(40)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
        </pattern>

        <pattern
          id="bb-t2"
          width="4.2"
          height="4.2"
          patternTransform="rotate(40)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="4.2" stroke="currentColor" strokeWidth="0.75" opacity="0.42" />
        </pattern>

        <pattern
          id="bb-t3"
          width="3.4"
          height="3.4"
          patternTransform="rotate(40)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="3.4" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
          <line x1="0" y1="0" x2="3.4" y2="0" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
        </pattern>

        <pattern
          id="bb-t4"
          width="2.4"
          height="2.4"
          patternTransform="rotate(40)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="2.4" stroke="currentColor" strokeWidth="1.1" opacity="0.72" />
          <line x1="0" y1="0" x2="2.4" y2="0" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
        </pattern>

        {/* Counter-hatch, for planes that turn the other way. */}
        <pattern
          id="bb-t2x"
          width="4.2"
          height="4.2"
          patternTransform="rotate(-38)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="4.2" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        </pattern>

        {/* Broken tone, for sand, rust, fur and water. */}
        <pattern id="bb-grit" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2.5" r="0.7" fill="currentColor" opacity="0.4" />
          <circle cx="6.5" cy="6" r="0.55" fill="currentColor" opacity="0.32" />
          <circle cx="7.5" cy="1.5" r="0.4" fill="currentColor" opacity="0.26" />
          <circle cx="3.6" cy="7.4" r="0.38" fill="currentColor" opacity="0.22" />
        </pattern>
      </defs>
    </svg>
  );
}
