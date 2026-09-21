import { cn } from "@/lib/utils";

/**
 * The home-screen poster.
 *
 * Bespoke rather than a library motif: portrait, denser, and carrying the
 * mark. Same rules as every other plate — one colour, `currentColor` strokes,
 * the SketchDefs tonal ramp for shading, the pencil filters for the line.
 * Unlike <Sketch />, the passes are written out here so the figure can carry
 * heavier modelling than the 400×300 plates.
 */

/** Precomputed and rounded: raw trig serialises differently server vs client. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const IRIS = Array.from({ length: 5 }).map((_, i) => 120 + i * 30);

export function HeroPoster({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 660"
      role="img"
      aria-label="브레이킹 배드 흑백 연필 드로잉 포스터"
      className={cn("block w-full text-foreground", className)}
    >
      <rect width="480" height="660" fill="hsl(var(--paper))" />
      <rect
        width="480"
        height="660"
        filter="url(#bb-paper)"
        opacity="0.4"
        className="dark:hidden"
      />
      <rect
        width="480"
        height="660"
        filter="url(#bb-fibre)"
        opacity="0.28"
        className="dark:hidden"
      />
      <rect
        width="480"
        height="660"
        filter="url(#bb-paper-light)"
        opacity="0.17"
        className="hidden dark:block"
      />
      <rect
        width="480"
        height="660"
        filter="url(#bb-fibre-light)"
        opacity="0.12"
        className="hidden dark:block"
      />

      {/* ── background: sky, mesas, road, the RV parked on it ─────────── */}
      <g
        filter="url(#bb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.62"
      >
        <circle cx="366" cy="128" r="30" opacity="0.7" />
        <path d="M336 128 h60" opacity="0.3" />
        <path d="M16 214 L64 176 L96 184 L132 152 L182 172 L226 148 L282 176 L332 162 L400 180 L464 168" opacity="0.5" />
        <path
          d="M16 252 L58 224 L92 228 L120 240 L166 210 L214 206 L240 228 L292 220 L330 200 L372 214 L414 206 L464 220"
        />
        <path
          d="M16 252 L58 224 L92 228 L120 240 L166 210 L214 206 L240 228 L292 220 L330 200 L372 214 L414 206 L464 220 V290 H16 Z"
          fill="url(#bb-t1)"
          stroke="none"
        />
        <path d="M16 290 C 140 282, 330 296, 464 286" />
        <path
          d="M16 290 C 140 282, 330 296, 464 286 V330 H16 Z"
          fill="url(#bb-grit)"
          stroke="none"
        />
        {/* road, running away to the right */}
        <path d="M120 660 C 178 470, 214 370, 244 292" opacity="0.45" />
        <path d="M408 660 C 344 480, 292 374, 258 292" opacity="0.45" />
        <path d="M252 340 v18 m6 26 v26 m8 36 v34 m10 44 v42" opacity="0.35" />
      </g>

      {/* the RV, small, on the shoulder */}
      <g
        filter="url(#bb-pencil-fine)"
        stroke="currentColor"
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        transform="translate(36 214) scale(0.26)"
      >
        <path d="M96 104 h196 a10 10 0 0 1 10 10 v82 a6 6 0 0 1 -6 6 h-200 Z" />
        <path d="M96 202 V128 L74 132 L52 160 L46 186 v16 Z" />
        <path d="M78 138 L94 134 v34 H60 Z" />
        <rect x="112" y="118" width="46" height="30" />
        <rect x="168" y="118" width="38" height="30" />
        <path d="M96 168 h206" />
        <circle cx="112" cy="204" r="19" />
        <circle cx="264" cy="204" r="19" />
      </g>

      {/* ── figure ────────────────────────────────────────────────────── */}
      <g
        filter="url(#bb-pencil)"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* jacket and shoulders */}
        <path d="M74 660 C 80 556, 128 498, 198 476 L240 462 L282 476 C 352 498, 400 556, 406 660" />
        <path
          d="M74 660 C 80 556, 128 498, 198 476 L240 528 L214 660 Z"
          fill="url(#bb-t1)"
          stroke="none"
        />
        <path
          d="M406 660 C 400 556, 352 498, 282 476 L240 528 L266 660 Z"
          fill="url(#bb-t2)"
          stroke="none"
        />
        <path d="M198 476 L240 528 L282 476" />
        <path d="M240 528 L216 660 M240 528 L264 660" opacity="0.5" />
        <path d="M198 476 C 186 528, 176 586, 172 660" opacity="0.4" />
        <path d="M282 476 C 294 528, 304 586, 308 660" opacity="0.4" />
        <path d="M156 540 c -18 16, -28 40, -32 70" opacity="0.3" />
        <path d="M324 540 c 18 16, 28 40, 32 70" opacity="0.3" />
        {/* collar */}
        <path d="M204 478 c 10 14, 24 22, 36 24 c 12 -2, 26 -10, 36 -24" opacity="0.6" />

        {/* neck */}
        <path d="M212 430 c 0 18, -2 30, -8 44 M268 430 c 0 18, 2 30, 8 44" />
        <path d="M208 452 c 16 14, 48 14, 64 0" fill="url(#bb-t2)" stroke="none" />

        {/* jaw and skull */}
        <path d="M172 322 c -6 46, 6 84, 30 106 c 12 12, 24 18, 38 18 c 14 0, 26 -6, 38 -18 c 24 -22, 36 -60, 30 -106" />
        <path d="M176 330 c 8 44, 30 76, 64 76 c 34 0, 56 -32, 64 -76" opacity="0.35" />

        {/* goatee */}
        <path d="M204 366 c 8 -6, 20 -9, 36 -9 c 16 0, 28 3, 36 9 c 6 34, -12 62, -36 62 c -24 0, -42 -28, -36 -62 Z" />
        <path
          d="M204 366 c 8 -6, 20 -9, 36 -9 c 16 0, 28 3, 36 9 c 6 34, -12 62, -36 62 c -24 0, -42 -28, -36 -62 Z"
          fill="url(#bb-t3)"
          stroke="none"
        />
        <path d="M214 368 c 16 -5, 36 -5, 52 0" opacity="0.6" />
        <path d="M222 388 h36" opacity="0.5" />
        <path d="M228 414 c 8 6, 16 6, 24 0" opacity="0.4" />

        {/* nose + philtrum */}
        <path d="M240 300 c -4 28, -10 44, -18 52 c 6 6, 22 6, 28 0" />
        <path d="M222 352 c 6 4, 16 5, 24 2" opacity="0.5" />

        {/* glasses: two rounded rectangles, low bridge */}
        <path d="M148 290 h76 a9 9 0 0 1 9 9 v26 a12 12 0 0 1 -12 12 h-70 a12 12 0 0 1 -12 -12 v-26 a9 9 0 0 1 9 -9 Z" />
        <path d="M256 290 h76 a9 9 0 0 1 9 9 v26 a12 12 0 0 1 -12 12 h-70 a12 12 0 0 1 -12 -12 v-26 a9 9 0 0 1 9 -9 Z" />
        <path d="M233 300 c 4 -8, 10 -8, 14 0" />
        <path d="M139 296 l-24 -8 M341 296 l24 -8" />
        <path d="M148 292 h78 v12 h-78 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M256 292 h78 v12 h-78 Z" fill="url(#bb-t1)" stroke="none" />

        {/* eyes */}
        <path d="M168 316 c 8 -9, 26 -9, 34 0 c -8 9, -26 9, -34 0 Z" />
        <circle cx="185" cy="316" r="6" fill="currentColor" stroke="none" />
        <circle cx="183" cy="314" r="1.8" fill="hsl(var(--paper))" stroke="none" />
        <path d="M280 316 c 8 -9, 26 -9, 34 0 c -8 9, -26 9, -34 0 Z" />
        <circle cx="297" cy="316" r="6" fill="currentColor" stroke="none" />
        <circle cx="295" cy="314" r="1.8" fill="hsl(var(--paper))" stroke="none" />
        {IRIS.map((d) => (
          <path key={d} d={`M${d} 340 h0`} />
        ))}

        {/* brow ridge + modelling on the shaded cheek */}
        <path d="M156 276 c 22 -12, 52 -12, 70 -2" opacity="0.45" />
        <path d="M254 274 c 18 -10, 48 -10, 70 2" opacity="0.45" />
        <path
          d="M300 344 c 14 26, 10 58, -10 82 c -6 8, -14 14, -20 16 c 16 -26, 26 -60, 24 -90 Z"
          fill="url(#bb-t2)"
          stroke="none"
        />
        <path d="M300 344 c 12 26, 8 58, -12 82" opacity="0.35" />
        <path d="M178 346 c -10 22, -8 48, 4 66" opacity="0.28" />

        {/* pork pie hat, sitting low on the brow */}
        <ellipse cx="240" cy="262" rx="134" ry="30" />
        <path d="M106 256 a134 28 0 0 0 268 0" />
        <path
          d="M106 256 a134 28 0 0 0 268 0 a134 30 0 0 0 -268 0 Z"
          fill="url(#bb-t1)"
          stroke="none"
        />
        <path d="M140 258 v-52 a100 26 0 0 1 200 0 v52" />
        <ellipse cx="240" cy="206" rx="100" ry="26" />
        <ellipse cx="240" cy="204" rx="80" ry="19" opacity="0.55" />
        <path d="M160 200 a80 18 0 0 0 160 0" opacity="0.35" />
        <path
          d="M140 234 a100 26 0 0 0 200 0 v12 a100 26 0 0 1 -200 0 Z"
          fill="url(#bb-t3)"
          stroke="none"
        />
        <path d="M140 234 a100 26 0 0 0 200 0" />
        <path d="M322 240 l16 -8 -2 14 Z" />
        <path
          d="M290 192 c 32 8, 50 22, 50 38 v22 c 0 -20, -18 -36, -50 -46 Z"
          fill="url(#bb-t2)"
          stroke="none"
        />
        <path d="M112 254 l-22 10 M368 254 l22 10" opacity="0.4" />
      </g>

      {/* ── plate furniture ───────────────────────────────────────────── */}
      <g
        filter="url(#bb-pencil-fine)"
        stroke="currentColor"
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <rect x="16" y="16" width="448" height="628" opacity="0.32" />
        <rect x="25" y="25" width="430" height="610" opacity="0.18" />

        <g transform="translate(36 38)">
          <rect x="0" y="0" width="72" height="84" rx="3" opacity="0.85" />
          <text
            x="7"
            y="18"
            fontSize="12"
            fill="currentColor"
            stroke="none"
            fontFamily="ui-monospace, monospace"
          >
            35
          </text>
          <text
            x="36"
            y="57"
            fontSize="34"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="Georgia, serif"
          >
            Br
          </text>
          <text
            x="36"
            y="74"
            fontSize="9"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="Georgia, serif"
          >
            79.904
          </text>
        </g>

        <g transform="translate(372 38)">
          <rect x="0" y="0" width="72" height="84" rx="3" opacity="0.85" />
          <text
            x="7"
            y="18"
            fontSize="12"
            fill="currentColor"
            stroke="none"
            fontFamily="ui-monospace, monospace"
          >
            56
          </text>
          <text
            x="36"
            y="57"
            fontSize="34"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="Georgia, serif"
          >
            Ba
          </text>
          <text
            x="36"
            y="74"
            fontSize="9"
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontFamily="Georgia, serif"
          >
            137.33
          </text>
        </g>

        <text
          x="240"
          y="614"
          fontSize="40"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="Georgia, serif"
          letterSpacing="14"
          opacity="0.9"
        >
          BBB
        </text>
        <path d="M150 628 h180" opacity="0.3" />
      </g>
    </svg>
  );
}
