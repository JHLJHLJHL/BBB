import type { ReactNode } from "react";

/**
 * The motif library.
 *
 * Each entry is one illustration, drawn on a shared 400×300 canvas as pure
 * geometry: contour, interior detail, and tone laid in with the hatch patterns
 * from SketchDefs (`bb-t1` lightest → `bb-t4` darkest, `bb-grit` for broken
 * surfaces). No colour, no stroke settings, no filters — <Sketch /> supplies
 * all of that, so every plate is rendered the same way and stays on the same
 * pencil-on-paper identity.
 *
 * The subjects are drawn from the scenes themselves rather than traced from
 * frames: observed staging, original line work.
 *
 * Adding an illustration means adding one entry here and referencing its id
 * from data/episodes.ts. `npm run assets` then checks nothing is orphaned.
 */

export type MotifId =
  | "rv-desert"
  | "hazmat-pair"
  | "gas-mask"
  | "crystal-shards"
  | "pork-pie-hat"
  | "money-stack"
  | "lab-glass"
  | "desert-horizon"
  | "tio-bell"
  | "teddy-eye"
  | "plane-debris"
  | "housefly"
  | "axe-boots"
  | "pool-bear"
  | "train-bridge"
  | "machine-gun"
  | "pizza-roof"
  | "cracked-windshield"
  | "element-tiles"
  | "superlab"
  | "skull-sand"
  | "payphone"
  | "motel-door"
  | "watching-eye"
  | "barrel-desert"
  | "ricin-vial"
  | "lily-valley"
  | "wheelchair"
  | "iv-stand"
  | "heisenberg"
  | "duffel-cash"
  | "shovel-hole"
  | "magnet-truck"
  | "chicken-sign"
  | "broken-plate"
  | "burning-page";

interface Motif {
  /** Korean caption shown under the drawing. */
  label: string;
  node: ReactNode;
}

/* ── shared helpers ───────────────────────────────────────────────────── */

/** Rounded so server and client serialise identically (hydration). */
const r2 = (n: number) => Math.round(n * 100) / 100;

const onCircle = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [r2(cx + Math.cos(rad) * r), r2(cy + Math.sin(rad) * r)] as const;
};

/** Distant mesa-and-scrub skyline; the show's default backdrop. */
const mesaLine = (y: number) => (
  <>
    <path
      d={`M0 ${y} L34 ${y - 12} L58 ${y - 13} L74 ${y - 4} L112 ${y - 22} L150 ${y - 24} L168 ${y - 10} L214 ${y - 8} L246 ${y - 26} L286 ${y - 27} L306 ${y - 12} L340 ${y - 16} L400 ${y - 6}`}
      opacity="0.55"
    />
    <path
      d={`M0 ${y} L34 ${y - 12} L58 ${y - 13} L74 ${y - 4} L112 ${y - 22} L150 ${y - 24} L168 ${y - 10} L214 ${y - 8} L246 ${y - 26} L286 ${y - 27} L306 ${y - 12} L340 ${y - 16} L400 ${y - 6} V${y + 4} H0 Z`}
      fill="url(#bb-t1)"
      stroke="none"
    />
  </>
);

/** Flat desert floor with a little broken tone on it. */
const groundPlane = (y: number) => (
  <>
    <path d={`M0 ${y} C 96 ${y - 4}, 208 ${y + 4}, 400 ${y - 2}`} />
    <path
      d={`M0 ${y} C 96 ${y - 4}, 208 ${y + 4}, 400 ${y - 2} V300 H0 Z`}
      fill="url(#bb-grit)"
      stroke="none"
    />
    <path d={`M26 ${y + 18} h34 m22 10 h26 m48 -6 h40 m36 14 h30 m40 -18 h28`} opacity="0.3" />
  </>
);

const saguaro = (x: number, baseY: number, s = 1) => (
  <g transform={`translate(${x} ${baseY}) scale(${s})`}>
    <path d="M-7 0 V-52 a7 7 0 0 1 14 0 V0 Z" />
    <path d="M-7 -20 h-9 a7 7 0 0 0 -7 7 v12 a7 7 0 0 0 14 0 v-6 h2" />
    <path d="M7 -30 h8 a7 7 0 0 1 7 7 v18 a7 7 0 0 1 -14 0 v-10 h-1" />
    <path d="M-3 -46 V-8 M2 -44 V-10" opacity="0.4" />
    <path d="M-9 0 h18" />
  </g>
);

/* ── the library ──────────────────────────────────────────────────────── */

export const MOTIFS: Record<MotifId, Motif> = {
  "rv-desert": {
    label: "사막에 세워진 플리트우드 바운더",
    node: (
      <g>
        {mesaLine(196)}
        {groundPlane(226)}
        {saguaro(360, 224, 0.9)}
        {saguaro(30, 222, 0.6)}

        {/* body shell */}
        <path d="M96 104 h196 a10 10 0 0 1 10 10 v82 a6 6 0 0 1 -6 6 h-200 Z" />
        {/* cab: sloped nose, split windshield, bumper */}
        <path d="M96 202 V128 L74 132 L52 160 L46 186 v16 Z" />
        <path d="M78 138 L94 134 v34 H60 Z" />
        <path d="M86 135 V168" opacity="0.5" />
        <path d="M46 196 h-8 v10 h16" />
        <path d="M52 160 l-10 -2" opacity="0.5" />
        {/* side windows + door */}
        <rect x="112" y="118" width="46" height="30" rx="2" />
        <rect x="168" y="118" width="38" height="30" rx="2" />
        <path d="M112 118 h46 v10 h-46 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M168 118 h38 v10 h-38 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M220 104 v98 M262 104 v98" />
        <rect x="226" y="120" width="30" height="34" rx="2" />
        <path d="M232 160 h6 v6 h-6 Z" />
        {/* belt line, skirt, storage hatches */}
        <path d="M96 168 h206" />
        <path d="M96 182 h206" opacity="0.45" />
        <path d="M96 182 h206 v20 H96 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M120 184 h34 v14 h-34 Z M176 184 h30 v14 h-30 Z" opacity="0.6" />
        {/* awning rail + ladder + vents */}
        <path d="M98 112 h120" opacity="0.5" />
        <path d="M296 108 v82 M306 108 v82 M296 124 h10 m-10 18 h10 m-10 18 h10 m-10 18 h10" opacity="0.6" />
        <path d="M150 104 h26 v-6 h-26 Z M206 104 h18 v-5 h-18 Z" />
        {/* wheels */}
        <circle cx="112" cy="204" r="19" />
        <circle cx="112" cy="204" r="8" />
        <circle cx="112" cy="204" r="19" fill="url(#bb-t3)" stroke="none" opacity="0.5" />
        <circle cx="112" cy="204" r="8" fill="hsl(var(--paper))" stroke="currentColor" />
        <circle cx="264" cy="204" r="19" />
        <circle cx="264" cy="204" r="8" />
        <circle cx="264" cy="204" r="19" fill="url(#bb-t3)" stroke="none" opacity="0.5" />
        <circle cx="264" cy="204" r="8" fill="hsl(var(--paper))" stroke="currentColor" />
        {/* mirror + shadow under the chassis */}
        <path d="M74 132 l-14 -8 v14" />
        <path d="M60 218 h216" opacity="0.35" />
        <path d="M58 214 h220 v8 H58 Z" fill="url(#bb-t2)" stroke="none" opacity="0.7" />
      </g>
    ),
  },

  "hazmat-pair": {
    label: "방호복을 입은 두 사람",
    node: (
      <g>
        {/* left figure, facing us */}
        <g transform="translate(-16 6)">
          <path d="M150 62 a34 34 0 0 1 34 34 v10 a34 40 0 0 1 -68 0 V96 a34 34 0 0 1 34 -34 Z" />
          <path d="M126 82 a26 22 0 0 1 48 0 v12 a26 26 0 0 1 -48 0 Z" fill="url(#bb-t1)" />
          <path d="M132 100 a18 16 0 0 0 36 0 v10 a18 18 0 0 1 -36 0 Z" />
          <circle cx="150" cy="112" r="11" />
          <circle cx="150" cy="112" r="5" />
          <path d="M139 96 h22" opacity="0.5" />
          <path d="M118 140 c -20 8, -28 28, -30 50 l-4 68 h132 l-4 -68 c -2 -22, -10 -42, -30 -50 Z" />
          <path d="M120 140 c 12 10, 48 10, 60 0" opacity="0.6" />
          <path d="M92 198 h116" opacity="0.5" />
          <path d="M96 204 h108 l2 54 h-112 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M96 204 h108 l2 54 h-112 Z" />
          <path d="M150 204 v54" opacity="0.4" />
          <path d="M88 168 l-18 26 8 6 20 -22" />
          <path d="M212 168 l18 26 -8 6 -20 -22" />
        </g>
        {/* right figure, three-quarter, holding a flask */}
        <g transform="translate(172 44) scale(0.78)">
          <path d="M150 62 a34 34 0 0 1 34 34 v10 a34 40 0 0 1 -68 0 V96 a34 34 0 0 1 34 -34 Z" />
          <path d="M126 82 a26 22 0 0 1 48 0 v12 a26 26 0 0 1 -48 0 Z" fill="url(#bb-t1)" />
          <circle cx="150" cy="112" r="11" />
          <circle cx="150" cy="112" r="5" />
          <path d="M118 140 c -20 8, -28 28, -30 50 l-4 68 h132 l-4 -68 c -2 -22, -10 -42, -30 -50 Z" />
          <path d="M92 198 h116" opacity="0.5" />
          <path d="M96 204 h108 l2 54 h-112 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M96 204 h108 l2 54 h-112 Z" />
          <path d="M88 170 l-26 18 6 10 24 -12" />
        </g>
        <path d="M126 262 l-6 -14" opacity="0.4" />
        <path d="M0 268 H400" opacity="0.4" />
        <path d="M0 268 H400 v8 H0 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "gas-mask": {
    label: "필터를 단 전면형 방독면",
    node: (
      <g>
        {/* outer shell */}
        <path d="M200 42 c 54 0, 82 30, 84 74 c 2 46, -14 82, -46 102 c -24 15, -52 15, -76 0 c -32 -20, -48 -56, -46 -102 c 2 -44, 30 -74, 84 -74 Z" />
        <path d="M200 52 c 46 0, 72 26, 74 66 c 2 40, -12 72, -40 90 c -21 13, -47 13, -68 0 c -28 -18, -42 -50, -40 -90 c 2 -40, 28 -66, 74 -66 Z" opacity="0.4" />
        {/* visor */}
        <path d="M130 96 c 6 -24, 32 -34, 70 -34 c 38 0, 64 10, 70 34 c 4 18, -2 32, -14 38 c -34 14, -78 14, -112 0 c -12 -6, -18 -20, -14 -38 Z" />
        <path d="M130 96 c 6 -24, 32 -34, 70 -34 c 38 0, 64 10, 70 34 c 4 18, -2 32, -14 38 c -34 14, -78 14, -112 0 c -12 -6, -18 -20, -14 -38 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M148 78 c 16 -8, 40 -10, 58 -6" opacity="0.7" />
        <path d="M156 118 c 26 8, 62 6, 86 -4" opacity="0.4" />
        {/* cheek panels + straps */}
        <path d="M118 120 c -8 16, -8 34, 0 48" opacity="0.5" />
        <path d="M282 120 c 8 16, 8 34, 0 48" opacity="0.5" />
        <path d="M116 88 l-38 -14 m38 34 l-42 -6 m44 32 l-42 10" />
        <path d="M284 88 l38 -14 m-38 34 l42 -6 m-44 32 l42 10" />
        <path d="M60 66 h20 v96 h-20 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M60 66 h20 v96 h-20 Z" />
        <path d="M320 66 h20 v96 h-20 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M320 66 h20 v96 h-20 Z" />
        {/* filter canister and exhale valve */}
        <path d="M168 170 a32 26 0 0 1 64 0 v20 a32 30 0 0 1 -64 0 Z" />
        <circle cx="200" cy="186" r="20" />
        <circle cx="200" cy="186" r="11" />
        <circle cx="200" cy="186" r="20" fill="url(#bb-t2x)" stroke="none" />
        <path d="M182 206 c 6 14, 30 14, 36 0" opacity="0.5" />
        <path d="M152 148 c 10 6, 20 8, 28 6" opacity="0.4" />
        <path d="M248 148 c -10 6, -20 8, -28 6" opacity="0.4" />
        {/* tone down the right side of the shell */}
        <path d="M240 60 c 30 14, 46 42, 44 82 c -2 36, -14 60, -34 76 c 18 -26, 24 -58, 22 -92 c -2 -28, -14 -50, -32 -66 Z" fill="url(#bb-t2)" stroke="none" />
      </g>
    ),
  },

  "crystal-shards": {
    label: "쟁반 위의 결정",
    node: (
      <g>
        {/* tray */}
        <path d="M54 206 h292 l-20 40 H74 Z" />
        <path d="M54 206 h292 l-20 40 H74 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M74 246 h252" opacity="0.4" />
        {/* large shard */}
        <path d="M160 206 L134 132 L172 72 L232 96 L250 168 L222 206 Z" />
        <path d="M172 72 L190 150 L160 206" />
        <path d="M190 150 L250 168 M190 150 L232 96" />
        <path d="M134 132 L190 150" />
        <path d="M160 206 L134 132 L190 150 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M190 150 L232 96 L250 168 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M178 90 L196 140" opacity="0.4" />
        {/* right shard */}
        <path d="M258 206 L248 158 L286 128 L316 166 L304 206 Z" />
        <path d="M286 128 L274 184 L258 206" />
        <path d="M274 184 L316 166 M274 184 L304 206" />
        <path d="M258 206 L248 158 L274 184 Z" fill="url(#bb-t2)" stroke="none" />
        {/* left shard */}
        <path d="M98 206 L86 164 L118 142 L142 178 L128 206 Z" />
        <path d="M118 142 L112 186 L98 206" />
        <path d="M112 186 L142 178" />
        <path d="M86 164 L112 186 L98 206 Z" fill="url(#bb-t2)" stroke="none" />
        {/* chips */}
        <path d="M212 196 l12 -14 8 16 Z" />
        <path d="M148 198 l-12 -10 -2 16 Z" />
        <path d="M280 200 l10 -8 4 12 Z" />
        {/* highlight ticks */}
        <path d="M204 104 l10 -6 M292 146 l8 -6 M108 158 l8 -5" opacity="0.5" />
      </g>
    ),
  },

  "pork-pie-hat": {
    label: "포크파이 햇",
    node: (
      <g>
        {/* brim */}
        <ellipse cx="200" cy="198" rx="128" ry="36" />
        <path d="M72 192 a128 32 0 0 0 256 0" />
        <path d="M72 192 a128 32 0 0 0 256 0 a128 34 0 0 0 -256 0 Z" fill="url(#bb-t1)" stroke="none" />
        {/* crown, flat top with a pinched rim */}
        <path d="M112 196 v-48 a88 26 0 0 1 176 0 v48" />
        <ellipse cx="200" cy="148" rx="88" ry="26" />
        <ellipse cx="200" cy="146" rx="72" ry="20" />
        <path d="M128 143 a72 18 0 0 0 144 0" opacity="0.5" />
        {/* band */}
        <path d="M112 172 a88 26 0 0 0 176 0 v12 a88 26 0 0 1 -176 0 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M112 172 a88 26 0 0 0 176 0" />
        <path d="M112 184 a88 26 0 0 0 176 0" opacity="0.6" />
        <path d="M276 180 l14 -8 -2 12 Z" />
        {/* form shading on the shaded side */}
        <path d="M248 128 c 28 6, 40 20, 40 34 v20 c 0 -16, -14 -30, -40 -38 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M200 226 a128 22 0 0 0 128 -22" opacity="0.3" />
        {/* cast shadow */}
        <ellipse cx="214" cy="240" rx="120" ry="14" fill="url(#bb-t1)" stroke="none" />
        <path d="M96 240 h236" opacity="0.35" />
      </g>
    ),
  },

  "money-stack": {
    label: "진공 포장된 현금 다발",
    node: (
      <g>
        {/* back row */}
        {[0, 1, 2].map((c) => (
          <g key={`b${c}`} transform={`translate(${96 + c * 72} 78)`}>
            <path d="M0 0 h66 l10 -12 h-66 Z" />
            <path d="M66 0 v30 l10 -12 V-12 Z" fill="url(#bb-t2)" stroke="none" />
            <path d="M66 0 v30 l10 -12 V-12 Z" />
            <rect x="0" y="0" width="66" height="30" />
            <path d="M0 8 h66 M0 22 h66" opacity="0.35" />
            <rect x="24" y="4" width="18" height="22" rx="1" opacity="0.55" />
          </g>
        ))}
        {/* middle row */}
        {[0, 1, 2].map((c) => (
          <g key={`m${c}`} transform={`translate(${82 + c * 74} 122)`}>
            <path d="M0 0 h68 l10 -12 h-68 Z" />
            <path d="M68 0 v32 l10 -12 V-12 Z" fill="url(#bb-t2)" stroke="none" />
            <path d="M68 0 v32 l10 -12 V-12 Z" />
            <rect x="0" y="0" width="68" height="32" />
            <path d="M0 9 h68 M0 23 h68" opacity="0.35" />
            <ellipse cx="34" cy="16" rx="11" ry="9" opacity="0.6" />
            <path d="M34 8 v16" opacity="0.5" />
          </g>
        ))}
        {/* front row, larger */}
        {[0, 1, 2].map((c) => (
          <g key={`f${c}`} transform={`translate(${66 + c * 80} 172)`}>
            <path d="M0 0 h74 l12 -14 h-74 Z" />
            <path d="M74 0 v38 l12 -14 V-14 Z" fill="url(#bb-t3)" stroke="none" />
            <path d="M74 0 v38 l12 -14 V-14 Z" />
            <rect x="0" y="0" width="74" height="38" />
            <path d="M0 11 h74 M0 27 h74" opacity="0.4" />
            <ellipse cx="37" cy="19" rx="13" ry="11" />
            <path d="M37 9 v20" opacity="0.5" />
            <path d="M6 4 h10 M58 4 h10" opacity="0.3" />
          </g>
        ))}
        {/* plastic wrap glare */}
        <path d="M78 178 l18 -6 M158 178 l18 -6 M238 178 l18 -6" opacity="0.45" />
        {/* floor */}
        <path d="M46 224 H364" />
        <path d="M46 224 H364 v20 H46 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "lab-glass": {
    label: "환류 장치",
    node: (
      <g>
        {/* ring stand */}
        <path d="M96 254 h100 l-6 -10 H102 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M96 254 h100 l-6 -10 H102 Z" />
        <path d="M146 244 V60" />
        <path d="M146 96 h44 M146 164 h52" />
        <circle cx="200" cy="96" r="6" />
        <circle cx="206" cy="164" r="6" />
        {/* boiling flask */}
        <path d="M188 150 h30 v34 a44 44 0 1 1 -30 0 Z" />
        <path d="M184 150 h38" />
        <circle cx="203" cy="212" r="42" />
        <path d="M167 232 a42 42 0 0 0 72 0 a42 30 0 0 0 -72 0 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M172 194 a42 42 0 0 1 20 -22" opacity="0.5" />
        <path d="M186 240 c 10 8, 24 6, 30 -4" opacity="0.4" />
        {/* condenser */}
        <path d="M194 150 v-54 h18 v54" />
        <path d="M198 96 v-34 h10 v34" />
        <path d="M186 90 h34 v-6 h-34 Z" />
        <path d="M194 104 c 14 0, 14 12, 0 12 c -14 0, -14 12, 0 12 c 14 0, 14 12, 0 12" opacity="0.55" />
        <path d="M212 104 c -14 0, -14 12, 0 12 c 14 0, 14 12, 0 12 c -14 0, -14 12, 0 12" opacity="0.55" />
        <path d="M212 108 l30 -10 M194 138 l-28 12" />
        {/* tubing */}
        <path d="M242 98 c 40 -6, 56 40, 30 66 c -18 18, -48 12, -56 -6" opacity="0.65" />
        {/* erlenmeyer to the right */}
        <path d="M282 194 h22 v22 l26 46 a8 8 0 0 1 -7 12 h-60 a8 8 0 0 1 -7 -12 l26 -46 Z" />
        <path d="M279 194 h28" />
        <path d="M268 240 h50" />
        <path d="M268 240 l-5 10 a8 8 0 0 0 7 12 h46 a8 8 0 0 0 7 -12 l-5 -10 Z" fill="url(#bb-t2)" stroke="none" />
        {/* beaker to the left */}
        <path d="M58 200 h44 v62 h-44 Z" />
        <path d="M58 200 h44 M58 228 h44" />
        <path d="M58 228 h44 v34 H58 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M64 208 h8 m-8 10 h8" opacity="0.5" />
        <path d="M102 202 l8 -4" />
        {/* bench line */}
        <path d="M32 266 H368" />
        <path d="M32 266 H368 v10 H32 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "desert-horizon": {
    label: "뉴멕시코의 지평선",
    node: (
      <g>
        {/* sun low and pale */}
        <circle cx="308" cy="86" r="26" opacity="0.55" />
        <path d="M282 86 h52" opacity="0.3" />
        {/* layered distance */}
        <path d="M0 146 L54 116 L96 126 L140 100 L188 118 L232 96 L286 120 L336 108 L400 124" opacity="0.4" />
        {mesaLine(178)}
        {groundPlane(212)}
        {/* road running to the vanishing point */}
        <path d="M150 212 L20 300 M250 212 L380 300" />
        <path d="M150 212 L20 300 H380 L250 212 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M200 220 v10 m0 14 v14 m0 18 v18 m0 22 v14" opacity="0.6" />
        {/* poles */}
        <path d="M84 212 v-38 m-9 34 h18" opacity="0.6" />
        <path d="M128 208 v-26 m-7 23 h14" opacity="0.5" />
        <path d="M304 210 v-32 m-8 28 h16" opacity="0.6" />
        {saguaro(52, 240, 1.1)}
        {saguaro(348, 236, 0.85)}
        <path d="M262 238 c 10 -8, 24 -8, 34 0" opacity="0.4" />
        {/* two birds */}
        <path d="M108 66 c 5 -5, 10 -5, 14 0 c 4 -5, 9 -5, 14 0" opacity="0.5" />
        <path d="M138 52 c 4 -4, 8 -4, 11 0 c 3 -4, 7 -4, 11 0" opacity="0.4" />
      </g>
    ),
  },

  "tio-bell": {
    label: "휠체어 팔걸이의 호출 벨",
    node: (
      <g>
        {/* armrest slab */}
        <path d="M40 212 h250 l24 22 H64 Z" />
        <path d="M40 212 h250 l24 22 H64 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M40 212 v22 h24" />
        <path d="M290 212 v22" opacity="0.5" />
        {/* bell dome */}
        <path d="M118 198 a72 66 0 0 1 144 0 Z" />
        <path d="M118 198 a72 66 0 0 1 144 0 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M150 154 c 8 -22, 30 -34, 52 -32" opacity="0.65" />
        <path d="M232 146 c 14 12, 22 30, 22 52" fill="url(#bb-t3)" stroke="none" opacity="0.7" />
        {/* base */}
        <path d="M102 198 h176 a9 9 0 0 1 0 18 H102 a9 9 0 0 1 0 -18 Z" />
        <path d="M102 208 h176" opacity="0.4" />
        {/* plunger */}
        <path d="M190 132 v-20 h20 v20" />
        <circle cx="200" cy="106" r="13" />
        <path d="M192 100 a13 13 0 0 1 10 -4" opacity="0.6" />
        {/* a finger resting on it */}
        <path d="M200 92 c 0 -18, 16 -28, 34 -24 c 22 5, 36 4, 50 -2" />
        <path d="M206 96 c 4 -12, 16 -19, 30 -17" opacity="0.5" />
        <path d="M284 66 c 14 -4, 24 0, 30 8" opacity="0.5" />
        {/* ring lines */}
        <path d="M296 128 c 18 -12, 18 -40, 0 -52" opacity="0.6" />
        <path d="M316 136 c 28 -18, 28 -62, 0 -80" opacity="0.4" />
        <path d="M84 128 c -18 -12, -18 -40, 0 -52" opacity="0.6" />
        <path d="M64 136 c -28 -18, -28 -62, 0 -80" opacity="0.4" />
        {/* wheel hint behind */}
        <path d="M312 234 a46 46 0 0 1 44 -46" opacity="0.35" />
      </g>
    ),
  },

  "teddy-eye": {
    label: "한쪽 눈을 잃고 반쯤 그을린 곰인형",
    node: (
      <g>
        {/* head */}
        <path d="M200 46 c 38 0, 64 26, 64 60 c 0 36, -28 62, -64 62 c -36 0, -64 -26, -64 -62 c 0 -34, 26 -60, 64 -60 Z" />
        {/* ears */}
        <circle cx="152" cy="54" r="24" />
        <circle cx="152" cy="54" r="12" />
        <circle cx="248" cy="54" r="24" />
        <circle cx="248" cy="54" r="12" />
        {/* muzzle */}
        <ellipse cx="200" cy="128" rx="30" ry="24" />
        <path d="M188 118 a12 9 0 0 1 24 0 a12 11 0 0 1 -24 0 Z" fill="url(#bb-t4)" stroke="none" />
        <path d="M188 118 a12 9 0 0 1 24 0 a12 11 0 0 1 -24 0 Z" />
        <path d="M200 129 v10" />
        <path d="M186 142 c 6 8, 22 8, 28 0" />
        {/* the eye that is left */}
        <ellipse cx="172" cy="98" rx="10" ry="11" />
        <circle cx="172" cy="98" r="5" fill="url(#bb-t4)" stroke="none" />
        <circle cx="169" cy="95" r="2" fill="hsl(var(--paper))" stroke="none" />
        {/* the socket that is not */}
        <ellipse cx="230" cy="96" rx="12" ry="13" />
        <path d="M222 88 l16 16 m0 -16 l-16 16" opacity="0.7" />
        <path d="M218 92 a12 13 0 0 0 24 0 a12 13 0 0 0 -24 0 Z" fill="url(#bb-t3)" stroke="none" />
        {/* scorched side */}
        <path d="M246 62 c 20 10, 30 30, 28 54 c -2 24, -16 42, -36 50 c 16 -18, 24 -40, 22 -62 c -2 -18, -8 -32, -14 -42 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M252 72 c 10 12, 14 30, 12 48" opacity="0.5" />
        <path d="M264 118 c 8 -6, 14 -2, 14 8 c 0 10, -10 14, -16 8" opacity="0.6" />
        {/* fur ticks */}
        <path d="M142 86 l-8 -6 m6 22 l-10 -2 m12 18 l-10 6" opacity="0.45" />
        <path d="M200 40 l-4 -10 m14 12 l4 -10 m-28 10 l-6 -9" opacity="0.4" />
        {/* body stub, half submerged */}
        <path d="M148 168 c -16 12, -26 28, -28 44 h160 c -2 -16, -12 -32, -28 -44" />
        <path d="M120 212 h160" opacity="0.5" />
        {/* water line */}
        <path d="M20 214 c 36 -10, 70 6, 108 -2 c 44 -10, 78 8, 122 0 c 40 -8, 82 6, 130 -4" />
        <path d="M20 214 c 36 -10, 70 6, 108 -2 c 44 -10, 78 8, 122 0 c 40 -8, 82 6, 130 -4 V300 H20 Z" fill="url(#bb-grit)" stroke="none" />
        <path d="M46 240 c 30 -8, 60 6, 92 -2" opacity="0.4" />
        <path d="M232 252 c 34 -8, 66 4, 96 -4" opacity="0.35" />
        <path d="M70 268 c 40 -8, 80 6, 120 -2" opacity="0.25" />
      </g>
    ),
  },

  "plane-debris": {
    label: "상공의 충돌과 떨어지는 잔해",
    node: (
      <g>
        {/* airliner, banking */}
        <g transform="rotate(-8 190 92)">
          <path d="M96 92 c 10 -9, 28 -12, 44 -12 h92 c 22 0, 42 4, 58 12 c -16 8, -36 12, -58 12 h-92 c -16 0, -34 -3, -44 -12 Z" />
          <path d="M112 92 h150" opacity="0.35" />
          <path d="M108 86 h18 m14 0 h18 m14 0 h18 m14 0 h18" opacity="0.5" />
          <path d="M162 80 l-30 -40 h14 l44 40 Z" />
          <path d="M176 104 l-24 30 h12 l34 -30 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M176 104 l-24 30 h12 l34 -30 Z" />
          <path d="M238 80 l20 -38 h10 l-8 38 Z" />
          <ellipse cx="146" cy="100" rx="14" ry="8" />
          <ellipse cx="196" cy="102" rx="14" ry="8" />
          <path d="M96 92 c 10 -9, 28 -12, 44 -12 h92 c 22 0, 42 4, 58 12 c -16 8, -36 12, -58 12 h-92 c -16 0, -34 -3, -44 -12 Z" fill="url(#bb-t1)" stroke="none" />
        </g>
        {/* small charter, crossing */}
        <g transform="rotate(18 322 62)">
          <path d="M292 62 h52 l14 6 -14 6 h-52 Z" />
          <path d="M306 56 l-8 -16 h6 l14 16 Z" />
          <path d="M306 68 l-8 14 h6 l14 -14 Z" />
        </g>
        {/* smoke trails */}
        <path d="M88 104 c -28 16, -54 24, -84 26" opacity="0.5" />
        <path d="M100 118 c -26 22, -56 34, -92 40" opacity="0.32" />
        <path d="M284 78 c -18 10, -30 22, -36 34" opacity="0.4" />
        {/* falling debris, smaller as it recedes */}
        <path d="M254 168 l16 24 -24 8 Z" />
        <path d="M318 198 l20 14 -22 14 Z" />
        <path d="M196 204 l22 12 -18 16 Z" />
        <path d="M138 218 l16 18 -24 8 Z" />
        <path d="M96 176 l10 12 -14 6 Z" opacity="0.7" />
        <path d="M352 158 l10 10 -12 8 Z" opacity="0.7" />
        <path d="M168 168 l7 9 -10 4 Z" opacity="0.5" />
        <path d="M232 240 l9 10 -12 6 Z" opacity="0.6" />
        {/* rooftops far below */}
        <path d="M0 266 h64 v-16 h52 v16 h58 v-22 h60 v22 h56 v-14 h60 v14 h50" opacity="0.5" />
        <path d="M0 266 h64 v-16 h52 v16 h58 v-22 h60 v22 h56 v-14 h60 v14 h50 V300 H0 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  housefly: {
    label: "파리",
    node: (
      <g>
        {/* abdomen */}
        <ellipse cx="216" cy="176" rx="58" ry="38" transform="rotate(-8 216 176)" />
        <ellipse cx="216" cy="176" rx="58" ry="38" transform="rotate(-8 216 176)" fill="url(#bb-t2)" stroke="none" />
        <path d="M178 152 c 14 22, 16 42, 8 60 M204 144 c 12 24, 12 46, 2 64 M232 144 c 10 24, 8 46, -2 62" opacity="0.5" />
        {/* thorax */}
        <ellipse cx="150" cy="158" rx="34" ry="30" transform="rotate(-12 150 158)" />
        <path d="M128 136 c 10 14, 12 32, 6 48" opacity="0.45" />
        <path d="M134 130 l-6 -10 m14 6 l-2 -12 m12 12 l6 -10" opacity="0.55" />
        {/* head + compound eye */}
        <circle cx="106" cy="140" r="27" />
        <path d="M86 126 a27 27 0 0 1 40 -2 a24 22 0 0 1 -40 2 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M86 126 a27 27 0 0 1 40 -2" />
        <path d="M90 134 c 12 6, 26 6, 34 0 M88 142 c 12 6, 26 6, 34 0" opacity="0.35" />
        {/* antennae + proboscis */}
        <path d="M92 118 l-12 -18 M104 114 l-2 -20" />
        <path d="M96 160 c -4 10, 2 16, 10 16" opacity="0.6" />
        {/* wings, veined */}
        <path d="M172 118 c 40 -34, 96 -40, 122 -18 c 20 18, -6 40, -48 42 c -34 2, -62 -8, -74 -24 Z" />
        <path d="M188 116 c 32 -14, 68 -16, 88 -6 M196 126 c 30 -10, 62 -12, 82 -4 M204 136 c 26 -8, 54 -10, 72 -4" opacity="0.4" />
        <path d="M188 154 c 44 -12, 92 -2, 106 20 c 12 24, -22 30, -58 18 c -28 -10, -46 -26, -48 -38 Z" opacity="0.75" />
        <path d="M204 162 c 34 0, 64 10, 80 26 M214 174 c 30 0, 56 10, 70 22" opacity="0.32" />
        {/* legs */}
        <path d="M158 188 c -10 18, -22 28, -34 32 l-8 14" />
        <path d="M184 204 c -4 20, -10 32, -18 40 l-2 12" />
        <path d="M212 212 c 4 20, 12 32, 22 38 l4 12" />
        <path d="M248 202 c 16 14, 32 20, 46 22 l12 8" />
        <path d="M130 170 c -18 4, -30 0, -38 -8" />
        {/* surface */}
        <path d="M60 266 H352" opacity="0.5" />
        <ellipse cx="206" cy="266" rx="100" ry="8" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "axe-boots": {
    label: "은빛 코를 댄 부츠와 도끼",
    node: (
      <g>
        {/* axe leaning across the frame */}
        <path d="M262 30 l14 8 l-92 172 l-14 -8 Z" />
        <path d="M262 30 l14 8 l-92 172 l-14 -8 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M256 44 l12 7 M242 70 l12 7 M228 96 l12 7" opacity="0.35" />
        <path d="M170 202 c 26 -22, 56 -18, 68 8 c 12 24, -8 46, -38 44 c -28 -2, -46 -24, -40 -44 Z" />
        <path d="M170 202 c 26 -22, 56 -18, 68 8 c 12 24, -8 46, -38 44 c -28 -2, -46 -24, -40 -44 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M182 210 c 18 -12, 38 -8, 48 8" opacity="0.6" />
        <path d="M158 206 l-18 -6 -8 26 20 8 Z" />
        {/* left boot, three-quarter */}
        <g transform="translate(-6 0)">
          <path d="M56 252 c -2 -30, 4 -66, 8 -86 l32 4 c -2 20, -2 42, 2 54 l38 18 c 10 5, 8 16, -4 16 H62 Z" />
          <path d="M56 252 h78" />
          <path d="M56 252 h78 l2 6 H58 Z" fill="url(#bb-t3)" stroke="none" />
          <path d="M100 230 l34 16" opacity="0.5" />
          <path d="M112 236 c 14 -4, 22 0, 24 10 l-28 -2 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M112 236 c 14 -4, 22 0, 24 10" />
          <path d="M64 176 h32 m-33 12 h33 m-32 14 h30" opacity="0.4" />
          <path d="M68 166 c 8 -8, 20 -8, 28 0" opacity="0.5" />
        </g>
        {/* right boot */}
        <g transform="translate(232 6) scale(0.96)">
          <path d="M56 252 c -2 -30, 4 -66, 8 -86 l32 4 c -2 20, -2 42, 2 54 l38 18 c 10 5, 8 16, -4 16 H62 Z" />
          <path d="M56 252 h78" />
          <path d="M56 252 h78 l2 6 H58 Z" fill="url(#bb-t3)" stroke="none" />
          <path d="M100 230 l34 16" opacity="0.5" />
          <path d="M112 236 c 14 -4, 22 0, 24 10 l-28 -2 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M112 236 c 14 -4, 22 0, 24 10" />
          <path d="M64 176 h32 m-33 12 h33 m-32 14 h30" opacity="0.4" />
        </g>
        <path d="M20 270 H384" opacity="0.45" />
        <path d="M20 270 H384 v10 H20 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "pool-bear": {
    label: "수영장 위에 떠 있는 곰인형",
    node: (
      <g>
        {/* deck + coping */}
        <path d="M24 84 h352 v176 H24 Z" />
        <path d="M24 84 h352 v14 H24 Z M24 246 h352 v14 H24 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M24 98 h352 M24 246 h352" />
        <path d="M40 98 v148 M360 98 v148" opacity="0.3" />
        {/* water, with the tile line showing through */}
        <path d="M40 112 h320 v132 H40 Z" fill="url(#bb-grit)" stroke="none" opacity="0.5" />
        <path d="M56 130 c 34 -10, 62 8, 96 0 c 36 -10, 64 8, 100 0 c 26 -8, 42 2, 54 -2" opacity="0.6" />
        <path d="M52 158 c 34 -10, 62 8, 96 0 c 36 -10, 64 8, 100 0 c 26 -8, 42 2, 54 -2" opacity="0.5" />
        <path d="M56 190 c 34 -10, 62 8, 96 0 c 36 -10, 64 8, 100 0 c 26 -8, 42 2, 54 -2" opacity="0.4" />
        <path d="M52 220 c 34 -10, 62 8, 96 0 c 36 -10, 64 8, 100 0 c 26 -8, 42 2, 54 -2" opacity="0.3" />
        {/* ladder rails */}
        <path d="M300 98 c 0 -14, 26 -14, 26 0 v14" opacity="0.7" />
        <path d="M306 112 v40 m14 -40 v40 m-14 -26 h14" opacity="0.45" />
        {/* the bear, floating, seen from above */}
        <g transform="translate(96 108) scale(0.52)">
          <path d="M200 46 c 38 0, 64 26, 64 60 c 0 36, -28 62, -64 62 c -36 0, -64 -26, -64 -62 c 0 -34, 26 -60, 64 -60 Z" />
          <circle cx="152" cy="54" r="24" />
          <circle cx="152" cy="54" r="12" />
          <circle cx="248" cy="54" r="24" />
          <circle cx="248" cy="54" r="12" />
          <ellipse cx="200" cy="128" rx="30" ry="24" />
          <path d="M188 118 a12 9 0 0 1 24 0 a12 11 0 0 1 -24 0 Z" fill="url(#bb-t4)" stroke="none" />
          <path d="M186 142 c 6 8, 22 8, 28 0" />
          <ellipse cx="172" cy="98" rx="10" ry="11" />
          <circle cx="172" cy="98" r="5" fill="url(#bb-t4)" stroke="none" />
          <ellipse cx="230" cy="96" rx="12" ry="13" />
          <path d="M222 88 l16 16 m0 -16 l-16 16" />
          <path d="M246 62 c 20 10, 30 30, 28 54 c -2 24, -16 42, -36 50" fill="url(#bb-t3)" stroke="none" />
          <path d="M150 168 c -14 10, -22 22, -24 34 h148 c -2 -12, -10 -24, -24 -34" />
        </g>
        {/* the ring of displaced water around it */}
        <ellipse cx="196" cy="168" rx="86" ry="46" opacity="0.4" />
        <ellipse cx="196" cy="168" rx="104" ry="58" opacity="0.22" />
      </g>
    ),
  },

  "train-bridge": {
    label: "협곡 위를 지나는 유조 화차",
    node: (
      <g>
        {/* deck */}
        <path d="M0 128 H400 M0 138 H400" />
        <path d="M0 128 H400 v10 H0 Z" fill="url(#bb-t2)" stroke="none" />
        {/* trestle bents */}
        {[18, 66, 114, 162, 210, 258, 306, 354].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 138 v${52 + (i % 3) * 14}`} />
            <path d={`M${x + 6} 138 v${48 + (i % 3) * 14}`} opacity="0.5" />
            <path d={`M${x} ${160 + (i % 2) * 8} l44 ${18 + (i % 3) * 6}`} opacity="0.5" />
            <path d={`M${x + 44} ${158 + (i % 2) * 8} l-44 ${20 + (i % 3) * 6}`} opacity="0.5" />
          </g>
        ))}
        <path d="M18 176 H354" opacity="0.4" />
        {/* locomotive */}
        <path d="M14 128 v-42 h46 v-14 h30 v56 Z" />
        <path d="M14 128 v-42 h46 v-14 h30 v56 Z" fill="url(#bb-t2)" stroke="none" />
        <rect x="22" y="94" width="18" height="14" />
        <rect x="64" y="80" width="18" height="16" />
        <path d="M52 72 c 6 -14, -4 -18, 2 -30" opacity="0.5" />
        <path d="M60 64 c 6 -16, -4 -22, 4 -36" opacity="0.32" />
        {/* tank cars */}
        {[100, 196, 292].map((x) => (
          <g key={x}>
            <path d={`M${x} 128 v-8 h6 v-6 a34 20 0 0 1 68 0 v6 h6 v8 Z`} />
            <path d={`M${x + 6} 114 a34 20 0 0 1 68 0 v6 h-68 Z`} fill="url(#bb-t1)" stroke="none" />
            <path d={`M${x + 22} 96 h8 v-8 h-8 Z`} />
            <path d={`M${x + 6} 120 h68`} opacity="0.45" />
            <path d={`M${x + 24} 100 a16 14 0 0 1 28 0`} opacity="0.4" />
            <circle cx={x + 16} cy={126} r="4" />
            <circle cx={x + 66} cy={126} r="4" />
          </g>
        ))}
        {/* dry wash below */}
        <path d="M0 246 c 62 -14, 94 12, 156 4 c 72 -10, 114 16, 244 2" />
        <path d="M0 246 c 62 -14, 94 12, 156 4 c 72 -10, 114 16, 244 2 V300 H0 Z" fill="url(#bb-grit)" stroke="none" />
        <path d="M40 264 c 40 -8, 70 6, 104 0 M220 272 c 44 -8, 80 4, 118 -2" opacity="0.4" />
      </g>
    ),
  },

  "machine-gun": {
    label: "트렁크에 올려진 기관총",
    node: (
      <g>
        {/* open trunk lid + well */}
        <path d="M32 194 h336 v66 H32 Z" />
        <path d="M32 194 l34 -52 h268 l34 52" />
        <path d="M66 142 h268" opacity="0.45" />
        <path d="M32 194 l34 -52 h268 l34 52 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M32 246 h336 v14 H32 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M46 152 h56 m24 0 h56 m24 0 h56 m24 0 h40" opacity="0.3" />
        {/* mount plate */}
        <ellipse cx="176" cy="226" rx="66" ry="14" />
        <path d="M144 226 v-10 h64 v10" />
        <ellipse cx="176" cy="226" rx="66" ry="14" fill="url(#bb-t2)" stroke="none" />
        {/* receiver */}
        <path d="M112 190 h124 v26 H112 Z" />
        <path d="M112 190 h124 v10 h-124 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M126 178 h46 v12 h-46 Z" />
        <path d="M132 170 h34" opacity="0.6" />
        {/* barrel + flash hider */}
        <path d="M236 194 h104 v12 H236 Z" />
        <path d="M340 190 h20 v20 h-20 Z" />
        <path d="M344 192 v16 m6 -16 v16 m6 -16 v16" opacity="0.5" />
        <path d="M252 190 v-12 h12 v12" />
        {/* bipod + grip + stock */}
        <path d="M150 216 v26 h16 v-26" />
        <path d="M206 216 l14 26 M214 216 l-14 26" opacity="0.7" />
        <path d="M112 200 l-28 6 -2 14 30 -4" />
        {/* ammo belt spilling from the box */}
        <path d="M84 222 h46 v24 H84 Z" />
        <path d="M84 222 h46 v24 H84 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M130 228 c 18 6, 30 -2, 44 -6 c 16 -4, 30 0, 40 8" />
        <path d="M136 226 v10 m10 -12 v11 m10 -12 v11 m10 -11 v11 m10 -10 v11 m10 -10 v11 m10 -9 v11 m10 -8 v11" opacity="0.6" />
        {/* shadow in the well */}
        <path d="M32 236 h336 v10 H32 Z" fill="url(#bb-t3)" stroke="none" opacity="0.6" />
      </g>
    ),
  },

  "pizza-roof": {
    label: "차고 지붕 위에 얹힌 피자",
    node: (
      <g>
        {/* low-angle view: eave in the foreground, roof plane above */}
        <path d="M0 236 H400" />
        <path d="M0 236 H400 v12 H0 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M0 248 H400" opacity="0.5" />
        <path d="M0 236 L96 122 H400 v-18 H80 L0 214 Z" />
        <path d="M0 236 L96 122 H400" />
        <path d="M80 104 H400" opacity="0.5" />
        {/* shingle courses running with the slope */}
        <path d="M28 214 L118 106 M78 214 L164 106 M128 214 L210 106 M178 214 L256 106 M228 214 L302 106 M278 214 L348 106 M328 214 L394 106" opacity="0.28" />
        <path d="M18 200 H400 M44 176 H400 M70 152 H400" opacity="0.22" />
        {/* stucco wall below the eave */}
        <path d="M0 248 H400 V300 H0 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M60 248 v52 m140 -52 v52 m140 -52 v52" opacity="0.2" />
        {/* the pizza, uncut, sitting in perspective */}
        <ellipse cx="226" cy="150" rx="82" ry="27" />
        <ellipse cx="226" cy="144" rx="82" ry="27" />
        <path d="M144 150 a82 27 0 0 0 164 0 v-6 a82 27 0 0 1 -164 0 Z" fill="url(#bb-t3)" stroke="none" />
        <ellipse cx="226" cy="142" rx="68" ry="21" />
        <ellipse cx="226" cy="142" rx="68" ry="21" fill="url(#bb-t1)" stroke="none" />
        {/* pepperoni */}
        <ellipse cx="196" cy="136" rx="9" ry="4.5" />
        <ellipse cx="236" cy="148" rx="8" ry="4" />
        <ellipse cx="258" cy="134" rx="7" ry="3.5" />
        <ellipse cx="216" cy="152" rx="7" ry="3.5" />
        <ellipse cx="270" cy="148" rx="6" ry="3" />
        <ellipse cx="180" cy="148" rx="6" ry="3" />
        <ellipse cx="240" cy="132" rx="5.5" ry="2.8" />
        {/* a little grease shine and the shadow it throws up-slope */}
        <path d="M172 138 c 14 -6, 32 -8, 46 -6" opacity="0.4" />
        <ellipse cx="232" cy="160" rx="80" ry="16" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "cracked-windshield": {
    label: "금이 간 앞유리",
    node: (
      <g>
        {/* car front, seen straight on */}
        <path d="M28 244 h344 v22 H28 Z" />
        <path d="M28 244 h344 v22 H28 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M44 244 c 6 -44, 30 -74, 64 -84 h184 c 34 10, 58 40, 64 84" />
        <path d="M44 244 c 6 -44, 30 -74, 64 -84 h184 c 34 10, 58 40, 64 84 Z" fill="url(#bb-t1)" stroke="none" />
        {/* glass */}
        <path d="M74 232 c 6 -34, 26 -58, 52 -64 h148 c 26 6, 46 30, 52 64 Z" />
        <path d="M74 232 h252" />
        {/* pillars + roof line + mirrors */}
        <path d="M108 160 l-18 -14 M292 160 l18 -14" opacity="0.5" />
        <path d="M112 146 h176" opacity="0.5" />
        <path d="M60 176 l-26 6 v14 l26 -4" />
        <path d="M340 176 l26 6 v14 l-26 -4" />
        {/* wipers */}
        <path d="M120 230 l58 -40 M196 230 l56 -40" opacity="0.55" />
        {/* impact point and the web around it */}
        <circle cx="196" cy="196" r="11" />
        <circle cx="196" cy="196" r="5" fill="url(#bb-t3)" stroke="none" />
        <path d="M196 196 L126 172 M196 196 L98 202 M196 196 L134 230 M196 196 L196 232 M196 196 L262 228 M196 196 L300 206 M196 196 L262 170 M196 196 L206 164" />
        <path d="M152 180 c 20 8, 44 12, 68 8 M148 214 c 26 -6, 56 -4, 80 6" opacity="0.6" />
        <path d="M124 190 c 6 18, 16 30, 28 38 M264 182 c 16 12, 26 28, 30 44" opacity="0.4" />
        <path d="M170 176 l-8 -10 m52 6 l10 -12 m-90 44 l-14 4 m118 -4 l16 6" opacity="0.5" />
        {/* headlights */}
        <path d="M58 244 c 2 -14, 14 -22, 30 -22 h26 v22 Z" />
        <path d="M342 244 c -2 -14, -14 -22, -30 -22 h-26 v22 Z" />
        <path d="M66 236 h44" opacity="0.4" />
        <path d="M290 236 h44" opacity="0.4" />
        {/* grille */}
        <path d="M150 248 h100 v14 H150 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M150 248 h100 v14 H150 Z" />
        <path d="M162 248 v14 m18 -14 v14 m18 -14 v14 m18 -14 v14 m18 -14 v14" opacity="0.4" />
      </g>
    ),
  },

  "element-tiles": {
    label: "원소 주기율표의 두 칸",
    node: (
      <g>
        <g transform="translate(30 58)">
          <rect x="0" y="0" width="152" height="182" rx="3" />
          <rect x="7" y="7" width="138" height="168" rx="2" opacity="0.4" />
          <text x="16" y="36" fontSize="21" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace">
            35
          </text>
          <text x="76" y="116" fontSize="70" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Georgia, serif">
            Br
          </text>
          <text x="76" y="146" fontSize="15" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Georgia, serif">
            Bromine
          </text>
          <text x="76" y="166" fontSize="12" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace">
            79.904
          </text>
          <path d="M16 156 h120" opacity="0.35" />
        </g>
        <g transform="translate(218 58)">
          <rect x="0" y="0" width="152" height="182" rx="3" />
          <rect x="7" y="7" width="138" height="168" rx="2" opacity="0.4" />
          <text x="16" y="36" fontSize="21" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace">
            56
          </text>
          <text x="76" y="116" fontSize="70" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Georgia, serif">
            Ba
          </text>
          <text x="76" y="146" fontSize="15" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Georgia, serif">
            Barium
          </text>
          <text x="76" y="166" fontSize="12" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace">
            137.33
          </text>
          <path d="M16 156 h120" opacity="0.35" />
        </g>
        <path d="M186 148 h28" opacity="0.5" />
        <path d="M30 252 h340" opacity="0.3" />
      </g>
    ),
  },

  superlab: {
    label: "세탁소 지하의 대형 실험실",
    node: (
      <g>
        {/* room box in one-point perspective */}
        <path d="M14 42 h372 v226 H14 Z" />
        <path d="M14 42 L108 96 v128 L14 268 M386 42 L292 96 v128 l94 44" opacity="0.45" />
        <path d="M108 96 h184 v128 H108 Z" opacity="0.6" />
        <path d="M108 224 h184" />
        {/* floor grate running to the back wall */}
        <path d="M14 268 L108 224 M386 268 L292 224" />
        <path d="M48 254 H352 M84 240 H316 M120 228 H280" opacity="0.28" />
        <path d="M14 268 L108 224 h184 l94 44 Z" fill="url(#bb-t1)" stroke="none" />
        {/* ceiling ducting */}
        <path d="M14 42 h372 v18 H14 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M14 60 h372" opacity="0.5" />
        <path d="M60 60 v16 h30 v-16 M300 60 v16 h30 v-16" opacity="0.5" />
        {/* reaction vessels */}
        <g>
          <rect x="44" y="96" width="60" height="130" rx="6" />
          <path d="M44 130 h60 M44 168 h60" opacity="0.45" />
          <path d="M44 168 h60 v58 H44 Z" fill="url(#bb-t2)" stroke="none" />
          <ellipse cx="74" cy="96" rx="30" ry="9" />
          <path d="M74 87 v-18 h-22" />
          <path d="M52 200 h44 v14 H52 Z" opacity="0.6" />
        </g>
        <g>
          <rect x="128" y="112" width="52" height="112" rx="6" />
          <path d="M128 146 h52" opacity="0.45" />
          <path d="M128 182 h52 v42 h-52 Z" fill="url(#bb-t2)" stroke="none" />
          <ellipse cx="154" cy="112" rx="26" ry="8" />
          <path d="M154 104 v-14 h26" />
        </g>
        <g>
          <rect x="216" y="104" width="56" height="120" rx="6" />
          <path d="M216 140 h56" opacity="0.45" />
          <path d="M216 178 h56 v46 h-56 Z" fill="url(#bb-t2)" stroke="none" />
          <ellipse cx="244" cy="104" rx="28" ry="9" />
          <path d="M244 95 v-16 h-26" />
        </g>
        {/* pipework connecting them */}
        <path d="M52 78 h102 M180 90 c 20 0, 20 -12, 38 -12" opacity="0.6" />
        <path d="M296 90 c 24 0, 24 30, 0 30 c -24 0, -24 34, 0 34" opacity="0.55" />
        {/* wall cabinet + control panel */}
        <rect x="308" y="112" width="52" height="60" rx="3" />
        <path d="M308 142 h52 M334 112 v60" opacity="0.4" />
        <rect x="308" y="186" width="52" height="34" rx="3" />
        <circle cx="320" cy="203" r="5" />
        <circle cx="336" cy="203" r="5" />
        <path d="M346 198 h10 v10 h-10 Z" opacity="0.6" />
        {/* hanging lamp */}
        <path d="M200 60 v20 m-22 0 h44 l-8 12 h-28 Z" />
      </g>
    ),
  },

  "skull-sand": {
    label: "모래에 반쯤 묻힌 두개골",
    node: (
      <g>
        {/* cranium */}
        <path d="M122 196 c -20 -26, -24 -64, -8 -94 c 18 -34, 58 -52, 96 -50 c 44 2, 78 30, 84 70 c 4 30, -8 56, -28 74" />
        <path d="M118 128 c 10 -38, 46 -62, 90 -60 c 36 2, 62 20, 72 46" opacity="0.4" />
        <path d="M168 48 c 4 26, 2 48, -6 62" opacity="0.3" />
        {/* eye sockets */}
        <path d="M144 140 c 0 -18, 12 -30, 28 -30 c 15 0, 24 12, 22 30 c -2 18, -14 28, -28 28 c -14 0, -22 -12, -22 -28 Z" />
        <path d="M144 140 c 0 -18, 12 -30, 28 -30 c 15 0, 24 12, 22 30 c -2 18, -14 28, -28 28 c -14 0, -22 -12, -22 -28 Z" fill="url(#bb-t4)" stroke="none" />
        <path d="M216 138 c 0 -18, 11 -30, 26 -30 c 15 0, 25 12, 24 30 c -1 18, -13 28, -27 28 c -14 0, -23 -12, -23 -28 Z" />
        <path d="M216 138 c 0 -18, 11 -30, 26 -30 c 15 0, 25 12, 24 30 c -1 18, -13 28, -27 28 c -14 0, -23 -12, -23 -28 Z" fill="url(#bb-t4)" stroke="none" />
        <path d="M150 116 c 10 -6, 22 -8, 32 -4" opacity="0.5" />
        {/* nasal aperture + cheekbones */}
        <path d="M204 166 l-14 30 c -2 6, 4 10, 14 10 c 10 0, 16 -4, 14 -10 Z" />
        <path d="M204 166 l-14 30 c -2 6, 4 10, 14 10 c 10 0, 16 -4, 14 -10 Z" fill="url(#bb-t4)" stroke="none" />
        <path d="M138 168 c -10 8, -14 22, -8 32 M270 164 c 10 8, 14 22, 8 32" opacity="0.5" />
        {/* maxilla + teeth */}
        <path d="M148 212 h116 v16 H148 Z" />
        <path d="M160 212 v16 m16 -16 v16 m16 -16 v16 m16 -16 v16 m16 -16 v16 m16 -16 v16" />
        <path d="M148 228 h116" opacity="0.6" />
        {/* form shading on the right */}
        <path d="M276 96 c 18 22, 22 54, 8 82 c -8 16, -18 26, -28 32 c 16 -22, 24 -48, 24 -72 c 0 -16, -2 -30, -4 -42 Z" fill="url(#bb-t2)" stroke="none" />
        {/* sand line cutting across the jaw */}
        <path d="M0 232 c 50 -16, 96 8, 148 0 c 60 -10, 104 14, 152 6 c 42 -8, 74 6, 100 -2" />
        <path d="M0 232 c 50 -16, 96 8, 148 0 c 60 -10, 104 14, 152 6 c 42 -8, 74 6, 100 -2 V300 H0 Z" fill="url(#bb-grit)" stroke="none" />
        <path d="M30 258 c 40 -8, 74 6, 112 -2 M230 268 c 44 -8, 84 4, 120 -4" opacity="0.4" />
        <path d="M96 286 c 36 -6, 70 4, 104 -2" opacity="0.25" />
      </g>
    ),
  },

  payphone: {
    label: "공중전화",
    node: (
      <g>
        {/* backboard */}
        <path d="M128 30 h150 a10 10 0 0 1 10 10 v208 a10 10 0 0 1 -10 10 H128 a10 10 0 0 1 -10 -10 V40 a10 10 0 0 1 10 -10 Z" />
        <path d="M128 30 h150 a10 10 0 0 1 10 10 v208 a10 10 0 0 1 -10 10 H128 a10 10 0 0 1 -10 -10 V40 a10 10 0 0 1 10 -10 Z" fill="url(#bb-t1)" stroke="none" />
        {/* instruction plate + coin slot */}
        <rect x="140" y="44" width="126" height="40" rx="2" />
        <path d="M140 44 h126 v40 H140 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M148 56 h80 m-80 10 h96 m-96 10 h64" opacity="0.5" />
        <path d="M244 94 h22 v8 h-22 Z" />
        {/* keypad */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2].map((c) => (
            <g key={`${r}-${c}`}>
              <circle cx={160 + c * 38} cy={120 + r * 30} r="12" />
              <circle cx={160 + c * 38} cy={120 + r * 30} r="12" fill="url(#bb-t1)" stroke="none" />
            </g>
          )),
        )}
        {/* coin return + directory shelf */}
        <rect x="150" y="242" width="40" height="14" rx="2" />
        <path d="M206 236 h72 v20 h-72 Z" opacity="0.5" />
        {/* hook switch + handset hanging off it */}
        <path d="M118 96 h-26 a12 12 0 0 0 -12 12 v14" />
        <path d="M80 122 l-10 -6 v16 l10 -4" />
        <path d="M58 128 c -16 0, -16 26, 0 26 c 16 0, 16 -26, 0 -26 Z" />
        <path d="M58 128 c -16 0, -16 26, 0 26 c 16 0, 16 -26, 0 -26 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M64 154 c 2 28, -4 48, -18 62" />
        <path d="M46 216 c -14 10, -16 28, -4 38 c 14 12, 32 2, 32 -12" />
        <path d="M74 242 c 14 0, 14 -26, 0 -26 c -14 0, -14 26, 0 26 Z" />
        <path d="M74 242 c 14 0, 14 -26, 0 -26 c -14 0, -14 26, 0 26 Z" fill="url(#bb-t2)" stroke="none" />
        {/* the coiled cord */}
        <path d="M290 132 c 26 0, 26 20, 0 20 c -26 0, -26 20, 0 20 c 26 0, 26 20, 0 20 c -26 0, -26 20, 0 20 c 26 0, 26 18, 0 18" opacity="0.7" />
        <path d="M288 132 v-8" opacity="0.7" />
        {/* wall tone */}
        <path d="M300 30 h84 v232 h-84 Z" fill="url(#bb-t1)" stroke="none" opacity="0.6" />
        <path d="M300 30 v232" opacity="0.3" />
        <path d="M22 262 H384" opacity="0.4" />
      </g>
    ),
  },

  "motel-door": {
    label: "모텔 객실 문",
    node: (
      <g>
        {/* frame + jamb */}
        <path d="M104 22 h192 v256 H104 Z" />
        <path d="M118 36 h164 v242 H118 Z" />
        <path d="M104 22 h192 v14 H104 Z" fill="url(#bb-t2)" stroke="none" />
        {/* panels */}
        <rect x="136" y="54" width="128" height="80" rx="2" />
        <rect x="136" y="54" width="128" height="80" rx="2" fill="url(#bb-t1)" stroke="none" />
        <rect x="146" y="64" width="108" height="60" rx="1" opacity="0.4" />
        <rect x="136" y="156" width="128" height="104" rx="2" />
        <rect x="136" y="156" width="128" height="104" rx="2" fill="url(#bb-t2)" stroke="none" />
        <rect x="146" y="166" width="108" height="84" rx="1" opacity="0.4" />
        {/* number */}
        <text x="200" y="118" fontSize="52" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Georgia, serif">
          6
        </text>
        {/* knob, deadbolt, peephole, kick plate */}
        <circle cx="252" cy="146" r="9" />
        <circle cx="252" cy="146" r="4" fill="url(#bb-t3)" stroke="none" />
        <path d="M244 140 h16 v12 h-16 Z" opacity="0.4" />
        <path d="M248 124 h10 v8 h-10 Z" />
        <circle cx="200" cy="44" r="4" />
        <path d="M126 262 h148 v14 H126 Z" opacity="0.5" />
        {/* wall + walkway + a strip of light under the door */}
        <path d="M0 22 h104 M296 22 h104" opacity="0.4" />
        <path d="M0 22 h104 v256 H0 Z M296 22 h104 v256 h-104 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M0 278 H400" />
        <path d="M0 278 H400 v22 H0 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M124 274 h152" opacity="0.7" />
      </g>
    ),
  },

  "watching-eye": {
    label: "지켜보는 눈",
    node: (
      <g>
        {/* lids */}
        <path d="M28 150 c 50 -68, 110 -98, 172 -98 c 62 0, 122 30, 172 98 c -50 68, -110 98, -172 98 c -62 0, -122 -30, -172 -98 Z" />
        <path d="M46 146 c 48 -58, 102 -84, 154 -84 c 52 0, 106 26, 154 84" opacity="0.4" />
        <path d="M62 168 c 44 46, 94 66, 138 66" opacity="0.35" />
        {/* iris + pupil */}
        <circle cx="200" cy="150" r="56" />
        <circle cx="200" cy="150" r="56" fill="url(#bb-t2)" stroke="none" />
        <circle cx="200" cy="150" r="26" />
        <circle cx="200" cy="150" r="26" fill="url(#bb-t4)" stroke="none" />
        {/* iris fibres */}
        {Array.from({ length: 28 }).map((_, i) => {
          const deg = i * (360 / 28);
          const [x1, y1] = onCircle(200, 150, 27, deg);
          const [x2, y2] = onCircle(200, 150, 55, deg);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.4" />;
        })}
        {/* catch light + lower lid shadow */}
        <circle cx="182" cy="132" r="9" fill="hsl(var(--paper))" stroke="none" />
        <circle cx="182" cy="132" r="9" opacity="0.4" />
        <circle cx="216" cy="168" r="4" fill="hsl(var(--paper))" stroke="none" opacity="0.7" />
        <path d="M144 106 c 34 -14, 78 -14, 112 0" opacity="0.3" />
        {/* lashes */}
        {[196, 210, 224, 238, 252, 266, 280, 294, 308, 322, 336].map((deg, i) => {
          const [x1, y1] = onCircle(200, 150, 98, deg);
          const [x2, y2] = onCircle(200, 150, 118 + (i % 2) * 8, deg);
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.5" />;
        })}
        {/* brow */}
        <path d="M78 74 c 48 -26, 168 -30, 240 -2" opacity="0.45" />
        <path d="M96 70 l-6 -10 m24 4 l-4 -12 m26 6 l-2 -12 m28 6 l0 -12 m30 6 l2 -12 m30 8 l4 -12 m28 10 l6 -11 m26 12 l8 -10" opacity="0.3" />
      </g>
    ),
  },

  "barrel-desert": {
    label: "사막에 놓인 드럼통",
    node: (
      <g>
        {mesaLine(178)}
        {groundPlane(206)}
        {/* barrel */}
        <path d="M146 78 h108 v160 h-108 Z" />
        <ellipse cx="200" cy="78" rx="54" ry="17" />
        <ellipse cx="200" cy="238" rx="54" ry="17" />
        <path d="M146 78 h108 v160 h-108 Z" fill="url(#bb-t1)" stroke="none" />
        {/* rolling hoops */}
        <path d="M146 116 h108" />
        <path d="M146 124 h108" opacity="0.5" />
        <path d="M146 116 h108 v8 h-108 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M146 188 h108" />
        <path d="M146 196 h108" opacity="0.5" />
        <path d="M146 188 h108 v8 h-108 Z" fill="url(#bb-t3)" stroke="none" />
        {/* lid detail */}
        <ellipse cx="200" cy="78" rx="34" ry="10" opacity="0.5" />
        <ellipse cx="176" cy="74" rx="8" ry="3.5" />
        <ellipse cx="222" cy="76" rx="6" ry="2.5" />
        {/* form shading + dents */}
        <path d="M228 84 c 16 6, 22 20, 22 40 v104 c 0 -40, -6 -110, -22 -144 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M164 140 c 8 6, 8 20, 0 28" opacity="0.4" />
        <path d="M212 152 c -6 8, -6 18, 0 24" opacity="0.3" />
        {/* drag marks leading away */}
        <path d="M254 244 c 40 8, 78 2, 128 -6" opacity="0.5" />
        <path d="M250 256 c 44 10, 86 4, 138 -6" opacity="0.35" />
        <path d="M60 252 c 26 -6, 46 2, 62 0" opacity="0.3" />
        {saguaro(348, 206, 0.55)}
      </g>
    ),
  },

  "ricin-vial": {
    label: "유리 바이알과 담배 한 개비",
    node: (
      <g>
        {/* vial, upright */}
        <path d="M168 66 h44 v18 l-8 10 v122 a14 14 0 0 1 -28 0 V94 l-8 -10 Z" />
        <path d="M168 66 h44 v18 h-44 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M168 84 h44" opacity="0.5" />
        <path d="M176 178 h28 v38 a14 14 0 0 1 -28 0 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M176 178 h28" />
        <path d="M164 54 h52 v12 h-52 Z" />
        <path d="M164 54 h52 v12 h-52 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M170 60 h40" opacity="0.4" />
        {/* glass highlight */}
        <path d="M182 104 v70" opacity="0.5" />
        <path d="M200 112 c 4 10, 4 26, 0 38" opacity="0.3" />
        {/* the cigarette lying beside it */}
        <g transform="rotate(-9 290 210)">
          <path d="M232 202 h96 v18 h-96 Z" />
          <path d="M232 202 h96 v18 h-96 Z" fill="url(#bb-t1)" stroke="none" />
          <path d="M328 202 h42 v18 h-42 Z" fill="url(#bb-t3)" stroke="none" />
          <path d="M328 202 h42 v18 h-42 Z" />
          <path d="M328 202 v18" />
          <path d="M336 202 v18 m8 -18 v18 m8 -18 v18 m8 -18 v18" opacity="0.35" />
          <path d="M240 206 c 6 -4, 14 -4, 20 0" opacity="0.4" />
          {/* the seam where it has been opened and re-rolled */}
          <path d="M282 202 v18" opacity="0.6" />
          <path d="M276 200 c 6 -4, 14 -4, 18 2" opacity="0.5" />
        </g>
        {/* table */}
        <path d="M74 246 H326" />
        <path d="M74 246 H326 v12 H74 Z" fill="url(#bb-t1)" stroke="none" />
        <ellipse cx="190" cy="246" rx="34" ry="7" fill="url(#bb-t2)" stroke="none" />
        <ellipse cx="292" cy="238" rx="66" ry="8" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "lily-valley": {
    label: "화분에 심긴 은방울꽃",
    node: (
      <g>
        {/* terracotta pot */}
        <path d="M146 208 h108 l-14 74 h-80 Z" />
        <path d="M146 208 h108 l-14 74 h-80 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M138 192 h124 v18 H138 Z" />
        <path d="M138 192 h124 v18 H138 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M214 214 l-10 66" opacity="0.35" />
        <path d="M232 212 c 10 22, 8 50, 0 68" fill="url(#bb-t2)" stroke="none" />
        <path d="M160 282 h80" opacity="0.5" />
        {/* soil */}
        <path d="M150 196 c 24 -6, 76 -6, 100 0" opacity="0.5" />
        {/* two broad basal leaves */}
        <path d="M192 192 c -46 -10, -74 -54, -62 -104 c 30 6, 58 46, 62 104 Z" />
        <path d="M192 192 c -46 -10, -74 -54, -62 -104 c 30 6, 58 46, 62 104 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M188 186 c -28 -16, -46 -46, -50 -84" opacity="0.5" />
        <path d="M172 154 c -12 -14, -20 -30, -24 -46 M182 172 c -18 -16, -30 -38, -36 -58" opacity="0.3" />
        <path d="M208 190 c 44 -14, 66 -58, 52 -106 c -30 8, -54 50, -52 106 Z" />
        <path d="M208 190 c 44 -14, 66 -58, 52 -106 c -30 8, -54 50, -52 106 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M212 184 c 26 -18, 42 -48, 44 -84" opacity="0.5" />
        <path d="M226 152 c 10 -14, 18 -30, 22 -46" opacity="0.3" />
        {/* arching stem with hanging bells */}
        <path d="M200 194 c -8 -46, -6 -86, 4 -118 c 4 -14, 12 -22, 22 -26" />
        {[
          [186, 104, 1],
          [214, 116, 0.95],
          [178, 138, 0.9],
          [220, 146, 0.85],
          [192, 164, 0.8],
        ].map(([cx, cy, k], i) => (
          <g key={i}>
            <path d={`M${cx} ${cy - 16} c 2 6, 0 10, 0 12`} opacity="0.7" />
            <path
              d={`M${cx - 12 * k} ${cy} a${12 * k} ${13 * k} 0 0 0 ${24 * k} 0 a${12 * k} ${9 * k} 0 0 0 ${-24 * k} 0 Z`}
            />
            <path
              d={`M${cx - 12 * k} ${cy} a${12 * k} ${13 * k} 0 0 0 ${24 * k} 0`}
              fill="url(#bb-t1)"
              stroke="none"
            />
            <path d={`M${cx - 7 * k} ${cy + 8 * k} c ${4 * k} ${5 * k}, ${10 * k} ${5 * k}, ${14 * k} 0`} opacity="0.55" />
            <path d={`M${cx - 3} ${cy + 2} v6`} opacity="0.35" />
          </g>
        ))}
        {/* a couple of berries */}
        <circle cx="238" cy="170" r="6" />
        <circle cx="238" cy="170" r="6" fill="url(#bb-t3)" stroke="none" />
        <circle cx="250" cy="182" r="4.5" />
        <path d="M60 286 H340" opacity="0.35" />
      </g>
    ),
  },

  wheelchair: {
    label: "휠체어",
    node: (
      <g>
        {/* big wheel */}
        <circle cx="166" cy="194" r="66" />
        <circle cx="166" cy="194" r="58" opacity="0.5" />
        <circle cx="166" cy="194" r="13" />
        {Array.from({ length: 12 }).map((_, i) => {
          const deg = i * 15;
          const [x1, y1] = onCircle(166, 194, -58, deg);
          const [x2, y2] = onCircle(166, 194, 58, deg);
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.45" />;
        })}
        {/* castor */}
        <circle cx="284" cy="234" r="24" />
        <circle cx="284" cy="234" r="8" />
        <path d="M284 210 v-16 h-10" />
        {/* seat + frame */}
        <path d="M110 148 h122 l-10 42 h-102 Z" />
        <path d="M110 148 h122 l-10 42 h-102 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M120 190 h102" opacity="0.5" />
        {/* back rest */}
        <path d="M112 148 V66 h14 v82" />
        <path d="M126 66 h78 v82" />
        <path d="M126 66 h78 v76 h-78 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M126 88 h78 M126 112 h78" opacity="0.3" />
        {/* push handles */}
        <path d="M112 66 c -10 -6, -18 0, -18 10" />
        <path d="M204 66 c 10 -6, 18 0, 18 10" opacity="0.6" />
        {/* armrest + pad */}
        <path d="M104 132 h116 v10 H104 Z" />
        <path d="M104 132 h116 v10 H104 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M104 142 v22" />
        {/* footplate strut */}
        <path d="M232 168 l52 60" />
        <path d="M222 190 l44 22 h34 v10 h-38 Z" />
        <path d="M222 190 l44 22 h34 v10 h-38 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M24 262 H376" opacity="0.4" />
        <ellipse cx="200" cy="262" rx="150" ry="10" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "iv-stand": {
    label: "링거 거치대",
    node: (
      <g>
        {/* pole */}
        <path d="M196 256 V56 h8 V256 Z" />
        <path d="M200 56 h-42 m42 0 h42" />
        <path d="M150 60 c 0 -12, 16 -12, 16 0" />
        <path d="M234 60 c 0 -12, 16 -12, 16 0" />
        {/* bag, hanging and half empty */}
        <path d="M120 74 h56 v96 a28 28 0 0 1 -56 0 Z" />
        <path d="M120 74 h56 v10 h-56 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M136 74 v-10 h24 v10" />
        <path d="M120 116 h56 v54 a28 28 0 0 1 -56 0 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M120 116 h56" />
        <path d="M128 88 h8 m-8 12 h8 m-8 12 h8 m-8 12 h8 m-8 12 h8" opacity="0.4" />
        <path d="M166 90 c 4 12, 4 30, 0 42" opacity="0.35" />
        {/* drip chamber */}
        <path d="M148 198 v-10" />
        <path d="M140 198 h16 v26 h-16 Z" />
        <path d="M140 214 h16 v10 h-16 Z" fill="url(#bb-t2)" stroke="none" />
        <circle cx="148" cy="206" r="2.5" fill="currentColor" stroke="none" />
        {/* line, roller clamp, and the coil of slack */}
        <path d="M148 224 c 0 22, 20 30, 20 48 c 0 20, -22 26, -36 16 c -14 -10, -8 -30, 10 -30 c 22 0, 34 14, 50 14" />
        <path d="M160 246 h10 v12 h-10 Z" />
        {/* base */}
        <path d="M200 256 l-46 26 M200 256 l46 26 M200 256 v26 M200 256 l-30 32 M200 256 l30 32" />
        <circle cx="154" cy="284" r="7" />
        <circle cx="246" cy="284" r="7" />
        <circle cx="200" cy="284" r="7" />
        <circle cx="170" cy="290" r="6" opacity="0.6" />
        <circle cx="230" cy="290" r="6" opacity="0.6" />
        {/* the window light it is standing in */}
        <path d="M282 60 h96 v150 h-96 Z" opacity="0.3" />
        <path d="M282 60 h96 v150 h-96 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M330 60 v150 M282 134 h96" opacity="0.3" />
      </g>
    ),
  },

  heisenberg: {
    label: "모자와 안경",
    node: (
      <g>
        {/* skull + jaw */}
        <path d="M134 246 c 0 -22, 8 -42, 20 -56 c -14 -18, -20 -42, -18 -66 h128 c 2 24, -4 48, -18 66 c 12 14, 20 34, 20 56" />
        <path d="M136 124 c 4 40, 28 72, 64 72 c 36 0, 60 -32, 64 -72" />
        {/* hat: brim, then crown, sitting low */}
        <ellipse cx="200" cy="118" rx="126" ry="28" />
        <path d="M74 112 a126 26 0 0 0 252 0" />
        <path d="M74 112 a126 26 0 0 0 252 0 a126 28 0 0 0 -252 0 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M112 116 v-44 a88 24 0 0 1 176 0 v44" />
        <ellipse cx="200" cy="72" rx="88" ry="24" />
        <ellipse cx="200" cy="70" rx="70" ry="18" opacity="0.55" />
        <path d="M112 94 a88 24 0 0 0 176 0 v12 a88 24 0 0 1 -176 0 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M112 94 a88 24 0 0 0 176 0" />
        <path d="M248 64 c 22 6, 34 18, 34 30 v12 c 0 -14, -12 -26, -34 -32 Z" fill="url(#bb-t2)" stroke="none" />
        {/* glasses */}
        <path d="M128 148 h64 a8 8 0 0 1 8 8 v22 a10 10 0 0 1 -10 10 h-58 a10 10 0 0 1 -10 -10 v-22 a8 8 0 0 1 6 -8 Z" />
        <path d="M208 148 h64 a8 8 0 0 1 6 8 v22 a10 10 0 0 1 -10 10 h-58 a10 10 0 0 1 -10 -10 v-22 a8 8 0 0 1 8 -8 Z" />
        <path d="M192 156 c 4 -6, 12 -6, 16 0" />
        <path d="M122 152 l-18 -6 M278 152 l18 -6" />
        <path d="M128 150 h64 v10 h-64 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M208 150 h64 v10 h-64 Z" fill="url(#bb-t1)" stroke="none" />
        {/* eyes behind the lenses */}
        <path d="M148 168 c 6 -6, 18 -6, 24 0 c -6 6, -18 6, -24 0 Z" />
        <circle cx="160" cy="168" r="3.5" fill="currentColor" stroke="none" />
        <path d="M228 168 c 6 -6, 18 -6, 24 0 c -6 6, -18 6, -24 0 Z" />
        <circle cx="240" cy="168" r="3.5" fill="currentColor" stroke="none" />
        {/* nose + goatee */}
        <path d="M200 176 c -4 16, -8 24, -12 28 c 4 4, 14 4, 18 0" />
        <path d="M168 214 c 6 -6, 16 -8, 32 -8 c 16 0, 26 2, 32 8 c 4 22, -10 40, -32 40 c -22 0, -36 -18, -32 -40 Z" />
        <path d="M168 214 c 6 -6, 16 -8, 32 -8 c 16 0, 26 2, 32 8 c 4 22, -10 40, -32 40 c -22 0, -36 -18, -32 -40 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M178 216 c 14 -4, 30 -4, 44 0" opacity="0.6" />
        <path d="M186 230 h28" opacity="0.5" />
        {/* cheek shading + shoulders */}
        <path d="M252 176 c 10 20, 8 44, -6 62" fill="url(#bb-t2)" stroke="none" />
        <path d="M252 176 c 10 20, 8 44, -6 62" opacity="0.45" />
        <path d="M148 178 c -8 18, -8 38, 2 54" opacity="0.35" />
        <path d="M118 300 c 8 -30, 34 -48, 66 -54 M282 300 c -8 -30, -34 -48, -66 -54" />
        <path d="M184 246 c 10 8, 22 8, 32 0" opacity="0.5" />
      </g>
    ),
  },

  "duffel-cash": {
    label: "현금이 든 더플백",
    node: (
      <g>
        {/* bag body, slumped */}
        <path d="M58 138 c 16 -24, 268 -24, 284 0 c 16 30, 16 82, 0 110 c -24 22, -260 22, -284 0 c -16 -28, -16 -80, 0 -110 Z" />
        <path d="M58 138 c 16 -24, 268 -24, 284 0 c 16 30, 16 82, 0 110 c -24 22, -260 22, -284 0 c -16 -28, -16 -80, 0 -110 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M58 160 c 64 18, 220 18, 284 0" opacity="0.5" />
        <path d="M300 156 c 16 26, 16 74, 0 98" fill="url(#bb-t2)" stroke="none" />
        {/* zipper, open, with bills showing */}
        <path d="M96 138 c 44 -16, 164 -16, 208 0" />
        <path d="M96 138 c 44 -16, 164 -16, 208 0 c -44 10, -164 10, -208 0 Z" fill="hsl(var(--paper))" stroke="none" />
        <path d="M96 138 c 44 -16, 164 -16, 208 0" />
        <path d="M104 132 v-8 m14 5 v-8 m14 6 v-9 m14 6 v-9 m14 5 v-9 m14 4 v-9 m14 4 v-9 m14 5 v-9 m14 6 v-8 m14 7 v-8" opacity="0.5" />
        {/* banded bricks poking out */}
        <g transform="translate(120 96)">
          <rect x="0" y="0" width="54" height="30" rx="1" />
          <path d="M0 10 h54 M0 22 h54" opacity="0.4" />
          <ellipse cx="27" cy="16" rx="9" ry="7" opacity="0.7" />
        </g>
        <g transform="translate(184 88)">
          <rect x="0" y="0" width="52" height="30" rx="1" />
          <path d="M0 10 h52 M0 22 h52" opacity="0.4" />
          <ellipse cx="26" cy="16" rx="9" ry="7" opacity="0.7" />
        </g>
        <g transform="translate(244 98)">
          <rect x="0" y="0" width="48" height="28" rx="1" />
          <path d="M0 9 h48 M0 20 h48" opacity="0.4" />
        </g>
        {/* handles */}
        <path d="M148 136 c 2 -34, 104 -34, 106 0" />
        <path d="M156 136 c 2 -26, 90 -26, 90 0" opacity="0.5" />
        <path d="M188 110 h28 v10 h-28 Z" />
        {/* end caps + strap clips */}
        <path d="M78 176 c -8 18, -8 34, 0 50" opacity="0.5" />
        <path d="M322 176 c 8 18, 8 34, 0 50" opacity="0.5" />
        <path d="M66 190 h16 v16 H66 Z" opacity="0.6" />
        <path d="M318 190 h16 v16 h-16 Z" opacity="0.6" />
        {/* floor */}
        <path d="M40 266 H360" />
        <ellipse cx="200" cy="266" rx="152" ry="12" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "shovel-hole": {
    label: "구덩이와 삽",
    node: (
      <g>
        {groundPlane(196)}
        {/* spoil heap */}
        <path d="M46 196 c 18 -34, 48 -44, 76 -28 c 16 10, 26 20, 34 28 Z" />
        <path d="M46 196 c 18 -34, 48 -44, 76 -28 c 16 10, 26 20, 34 28 Z" fill="url(#bb-grit)" stroke="none" />
        <path d="M62 190 c 10 -16, 26 -24, 40 -20" opacity="0.4" />
        {/* the hole, elliptical and dark */}
        <ellipse cx="238" cy="216" rx="106" ry="42" />
        <path d="M132 216 a106 42 0 0 0 212 0 a106 30 0 0 0 -212 0 Z" fill="url(#bb-t4)" stroke="none" />
        <path d="M150 208 a92 32 0 0 1 176 4" opacity="0.5" />
        <path d="M168 232 c 30 12, 92 12, 132 -4" opacity="0.35" />
        {/* shovel standing in the heap */}
        <path d="M108 42 l14 6 -56 128 -14 -6 Z" />
        <path d="M108 42 l14 6 -56 128 -14 -6 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M104 52 c 10 -14, 24 -10, 24 4 c 0 8, -8 12, -14 10" />
        <path d="M110 56 c 6 -6, 14 -4, 14 4" opacity="0.5" />
        <path d="M52 170 c -18 8, -30 26, -28 48 c 22 14, 48 8, 60 -12 c 8 -14, 0 -30, -22 -36 Z" />
        <path d="M52 170 c -18 8, -30 26, -28 48 c 22 14, 48 8, 60 -12 c 8 -14, 0 -30, -22 -36 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M36 184 c 14 6, 24 18, 26 30" opacity="0.4" />
        {/* boot prints */}
        <ellipse cx="348" cy="268" rx="14" ry="7" opacity="0.4" />
        <ellipse cx="318" cy="282" rx="13" ry="6" opacity="0.32" />
        <ellipse cx="366" cy="288" rx="12" ry="6" opacity="0.25" />
      </g>
    ),
  },

  "magnet-truck": {
    label: "전자석을 실은 트럭",
    node: (
      <g>
        {/* box truck, three-quarter */}
        <path d="M40 216 h188 v-92 H40 Z" />
        <path d="M40 216 h188 v-92 H40 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M40 124 h188 M40 138 h188" opacity="0.4" />
        <path d="M56 140 v70 m34 -70 v70 m34 -70 v70 m34 -70 v70 m34 -70 v70" opacity="0.22" />
        {/* cab */}
        <path d="M228 216 v-70 h44 l32 42 v28 Z" />
        <path d="M232 152 h38 l26 34 h-64 Z" />
        <path d="M232 152 h38 l26 34 h-64 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M304 200 h22 v16 h-22 Z" />
        <path d="M228 216 v-70 h44 l32 42 v28 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M296 190 l16 -4" opacity="0.5" />
        {/* wheels */}
        <circle cx="96" cy="230" r="22" />
        <circle cx="96" cy="230" r="9" />
        <circle cx="96" cy="230" r="22" fill="url(#bb-t3)" stroke="none" opacity="0.5" />
        <circle cx="96" cy="230" r="9" fill="hsl(var(--paper))" stroke="currentColor" />
        <circle cx="268" cy="230" r="22" />
        <circle cx="268" cy="230" r="9" />
        <circle cx="268" cy="230" r="22" fill="url(#bb-t3)" stroke="none" opacity="0.5" />
        <circle cx="268" cy="230" r="9" fill="hsl(var(--paper))" stroke="currentColor" />
        {/* the electromagnet on its pallet, cut away in the box */}
        <g transform="translate(78 66)">
          <path d="M0 84 V40 a54 54 0 0 1 108 0 v44 h-30 V40 a24 24 0 0 0 -48 0 v44 Z" />
          <path d="M0 84 V40 a54 54 0 0 1 108 0 v44 h-30 V40 a24 24 0 0 0 -48 0 v44 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M0 84 h30 v20 H0 Z" />
          <path d="M78 84 h30 v20 H78 Z" />
          <path d="M0 84 h30 v20 H0 Z" fill="url(#bb-t4)" stroke="none" />
          <path d="M78 84 h30 v20 H78 Z" fill="url(#bb-t4)" stroke="none" />
          <path d="M14 20 c 26 -18, 64 -18, 84 4" opacity="0.4" />
        </g>
        {/* battery bank + cabling */}
        <path d="M52 194 h34 v20 H52 Z M92 194 h34 v20 H92 Z M132 194 h34 v20 h-34 Z" opacity="0.7" />
        <path d="M60 194 v-6 h8 v6 m24 0 v-6 h8 v6 m24 0 v-6 h8 v6 m24 0 v-6 h8 v6" opacity="0.5" />
        <path d="M166 200 c 22 -8, 22 -30, 0 -34 c -20 -4, -20 -22, -2 -26" opacity="0.6" />
        {/* field lines reaching to the left */}
        <path d="M34 122 c -22 -16, -22 -44, 0 -60" opacity="0.4" />
        <path d="M20 132 c -34 -22, -34 -70, 0 -92" opacity="0.28" />
        <path d="M8 142 c -44 -28, -44 -90, 0 -118" opacity="0.18" />
        <path d="M14 252 H386" opacity="0.4" />
        <path d="M14 252 H386 v10 H14 Z" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "chicken-sign": {
    label: "치킨 가게 간판",
    node: (
      <g>
        {/* pole */}
        <path d="M188 222 h24 v66 h-24 Z" />
        <path d="M188 222 h24 v66 h-24 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M160 288 h80 v10 h-80 Z" />
        {/* sign box */}
        <path d="M58 26 h284 a14 14 0 0 1 14 14 v168 a14 14 0 0 1 -14 14 H58 a14 14 0 0 1 -14 -14 V40 a14 14 0 0 1 14 -14 Z" />
        <path d="M58 26 h284 a14 14 0 0 1 14 14 v168 a14 14 0 0 1 -14 14 H58 a14 14 0 0 1 -14 -14 V40 a14 14 0 0 1 14 -14 Z" fill="url(#bb-t1)" stroke="none" />
        <path d="M56 40 h288 v142 H56 Z" />
        {/* the rooster mark */}
        <g transform="translate(6 0)">
          <path d="M176 76 c -10 -10, -6 -24, 6 -26 c 6 -1, 11 2, 13 7 c 6 -10, 20 -9, 25 2 c 4 10, -2 19, -12 22" />
          <path d="M162 92 c -14 12, -16 38, 2 52 c 22 18, 60 14, 74 -8 c 12 -18, 2 -40, -20 -46 c -22 -6, -44 -8, -56 2 Z" />
          <path d="M162 92 c -14 12, -16 38, 2 52 c 22 18, 60 14, 74 -8 c 12 -18, 2 -40, -20 -46 c -22 -6, -44 -8, -56 2 Z" fill="url(#bb-t2)" stroke="none" />
          <path d="M196 78 c -14 2, -26 8, -34 14" opacity="0.5" />
          <path d="M156 100 l-16 -6 12 14 Z" />
          <circle cx="182" cy="96" r="3.5" fill="currentColor" stroke="none" />
          <path d="M238 128 c 16 2, 26 12, 28 26 c -12 -6, -22 -10, -30 -10" />
          <path d="M180 148 l-8 24 m22 -20 l-2 24 m22 -26 l8 22" />
          <path d="M186 172 l-12 6 m18 -6 l-2 8 m22 -6 l10 6" opacity="0.6" />
        </g>
        {/* base band + lamps */}
        <path d="M56 182 h288 v22 H56 Z" fill="url(#bb-t3)" stroke="none" />
        <path d="M56 182 h288" />
        <circle cx="84" cy="193" r="4" />
        <circle cx="116" cy="193" r="4" />
        <circle cx="284" cy="193" r="4" />
        <circle cx="316" cy="193" r="4" />
        {/* light spill */}
        <path d="M44 214 l-28 34 M356 214 l28 34" opacity="0.3" />
        <path d="M0 296 H400" opacity="0.3" />
      </g>
    ),
  },

  "broken-plate": {
    label: "깨진 접시",
    node: (
      <g>
        {/* rim of the plate, seen at a low angle */}
        <ellipse cx="200" cy="184" rx="130" ry="58" />
        <ellipse cx="200" cy="184" rx="106" ry="44" opacity="0.5" />
        <path d="M70 184 a130 58 0 0 0 260 0 a130 46 0 0 0 -260 0 Z" fill="url(#bb-t1)" stroke="none" />
        {/* the break, radiating from the near edge */}
        <path d="M200 242 L172 164 L96 158" />
        <path d="M200 242 L236 160 L312 156" />
        <path d="M172 164 L236 160" opacity="0.6" />
        <path d="M200 242 L172 164 L236 160 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M160 142 L96 158 M252 140 L312 156" opacity="0.45" />
        <path d="M172 164 L160 142 M236 160 L252 140" opacity="0.5" />
        {/* a wedge lifted out and lying beside it */}
        <path d="M282 218 l52 -16 l14 30 -46 14 Z" />
        <path d="M282 218 l52 -16 l14 30 -46 14 Z" fill="url(#bb-t2)" stroke="none" />
        <path d="M290 222 l48 -14" opacity="0.5" />
        {/* splinters */}
        <path d="M84 232 l22 -8 4 14 Z" />
        <path d="M120 250 l16 -6 2 12 Z" />
        <path d="M346 250 l18 6 -14 8 Z" />
        <path d="M64 206 l-18 4 12 8 Z" opacity="0.7" />
        {/* floor tone */}
        <path d="M20 262 H380" opacity="0.4" />
        <ellipse cx="200" cy="252" rx="160" ry="20" fill="url(#bb-t1)" stroke="none" />
      </g>
    ),
  },

  "burning-page": {
    label: "타들어가는 종이",
    node: (
      <g>
        {/* the sheet, slightly turned */}
        <g transform="rotate(-3 200 150)">
          <path d="M104 34 h192 v226 H104 Z" />
          <path d="M104 34 h192 v226 H104 Z" fill="hsl(var(--paper))" stroke="none" />
          <path d="M104 34 h192 v226 H104 Z" />
          {/* ruled writing */}
          <path d="M126 70 h148 m-148 20 h148 m-148 20 h112 m-112 20 h140 m-140 20 h92 m-92 20 h132" opacity="0.5" />
          <path d="M126 190 h70" opacity="0.4" />
          {/* burn front eating up from the bottom right */}
          <path d="M296 260 c -34 -10, -48 -38, -32 -62 c -30 8, -54 -12, -48 -42 c -26 20, -58 10, -62 -18 c -18 26, -50 24, -50 -2 v124 Z" />
          <path d="M296 260 c -34 -10, -48 -38, -32 -62 c -30 8, -54 -12, -48 -42 c -26 20, -58 10, -62 -18 c -18 26, -50 24, -50 -2 v124 Z" fill="url(#bb-t4)" stroke="none" />
          {/* the glowing edge just above the char */}
          <path d="M292 244 c -28 -10, -40 -32, -28 -50 M244 196 c -24 6, -44 -8, -40 -30 M188 158 c -20 16, -46 10, -52 -12" opacity="0.6" />
          <path d="M162 206 c 6 -14, 18 -18, 24 -6 M224 226 c 6 -14, 18 -18, 24 -6" opacity="0.5" />
        </g>
        {/* smoke */}
        <path d="M118 34 c 10 -16, -8 -22, 2 -38 c 8 -12, -4 -18, 2 -28" opacity="0.5" />
        <path d="M156 28 c 8 -14, -6 -18, 2 -30" opacity="0.32" />
        {/* embers drifting off */}
        <path d="M312 238 l16 8 m-8 -26 l18 4 m-24 -20 l14 -6" opacity="0.45" />
        <circle cx="338" cy="214" r="2" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="350" cy="240" r="1.6" fill="currentColor" stroke="none" opacity="0.5" />
        <circle cx="330" cy="262" r="1.4" fill="currentColor" stroke="none" opacity="0.4" />
        <path d="M40 278 H360" opacity="0.3" />
      </g>
    ),
  },
};

export const MOTIF_IDS = Object.keys(MOTIFS) as MotifId[];
