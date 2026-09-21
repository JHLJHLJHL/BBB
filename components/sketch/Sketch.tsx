import { cn } from "@/lib/utils";
import { MOTIFS, type MotifId } from "@/components/sketch/motifs";

/**
 * Renders one motif from the library as a finished plate.
 *
 * The motif supplies geometry only. Everything that makes it look drawn is
 * added here, in three passes, the way a pencil drawing is actually built:
 *
 *   1. an under-drawing — the same geometry, thin, offset and faint, standing
 *      in for the construction lines that never get fully erased;
 *   2. the committed line, wobbled and grained by the pencil filter;
 *   3. a smudged copy behind everything, which reads as the graphite dust
 *      that collects along a heavily worked contour.
 *
 * All colour comes from `currentColor` and the --paper tokens, so a plate is
 * automatically correct in both themes and can never drift off the monochrome
 * identity.
 */

/** Motifs carrying lettering: full wobble would smear the glyphs. */
const FINE_LINE: ReadonlySet<MotifId> = new Set<MotifId>([
  "element-tiles",
  "motel-door",
  "chicken-sign",
]);

export interface SketchProps {
  motif: MotifId;
  /** Overrides the motif's own Korean caption. Pass `null` to hide it. */
  caption?: string | null;
  /** `plate` is the default figure; `bare` drops frame and caption. */
  variant?: "plate" | "bare";
  className?: string;
  /** Small ordinal printed in the plate corner, e.g. "도판 2". */
  index?: number;
}

export function Sketch({
  motif,
  caption,
  variant = "plate",
  className,
  index,
}: SketchProps) {
  const entry = MOTIFS[motif];
  const fine = FINE_LINE.has(motif);
  const filter = fine ? "url(#bb-pencil-fine)" : "url(#bb-pencil)";
  const text = caption === undefined ? entry.label : caption;

  const drawing = (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={text ?? entry.label}
      className="block w-full text-foreground"
    >
      <rect width="400" height="300" fill="hsl(var(--paper))" />
      <rect
        width="400"
        height="300"
        filter="url(#bb-paper)"
        opacity="0.38"
        className="dark:hidden"
      />
      <rect
        width="400"
        height="300"
        filter="url(#bb-fibre)"
        opacity="0.26"
        className="dark:hidden"
      />
      <rect
        width="400"
        height="300"
        filter="url(#bb-paper-light)"
        opacity="0.16"
        className="hidden dark:block"
      />
      <rect
        width="400"
        height="300"
        filter="url(#bb-fibre-light)"
        opacity="0.12"
        className="hidden dark:block"
      />

      {/* 3. graphite dust, sitting under the line */}
      <g
        filter="url(#bb-smudge)"
        stroke="currentColor"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.13"
      >
        {entry.node}
      </g>

      {/* 1. under-drawing */}
      <g
        transform="translate(1.1 0.8)"
        filter="url(#bb-pencil-loose)"
        stroke="currentColor"
        fill="none"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      >
        {entry.node}
      </g>

      {/* 2. committed line */}
      <g
        filter={filter}
        stroke="currentColor"
        fill="none"
        strokeWidth={fine ? 1.3 : 1.55}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {entry.node}
      </g>

      {variant === "plate" ? (
        <g
          filter="url(#bb-pencil-fine)"
          stroke="currentColor"
          fill="none"
          strokeWidth="0.9"
          opacity="0.22"
        >
          <rect x="9" y="9" width="382" height="282" />
        </g>
      ) : null}
    </svg>
  );

  if (variant === "bare") {
    return <div className={cn("relative", className)}>{drawing}</div>;
  }

  return (
    <figure className={cn("group/plate my-5", className)}>
      <div className="sketch-frame relative overflow-hidden rounded-sm bg-paper transition-transform duration-500 ease-out group-hover/plate:-translate-y-0.5">
        {drawing}
      </div>
      {text ? (
        <figcaption className="mt-2 flex items-baseline gap-2 text-xs leading-[1.45] text-muted-foreground">
          {typeof index === "number" ? (
            <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.18em]">
              도판 {index}
            </span>
          ) : null}
          <span className="italic">{text}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
