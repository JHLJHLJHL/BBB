import { cn } from "@/lib/utils";

/**
 * The BBB mark — two periodic-table cells, [Br] and [Ba], offset like a dealt
 * pair of cards and drawn with the same pencil wobble as the illustrations.
 * Mirrors app/icon.svg so the in-app mark and the favicon read as one object.
 */
export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="BBB"
      className={cn("text-foreground", className)}
    >
      <g
        filter="url(#bb-pencil-fine)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6.5" y="7.5" width="31" height="33" rx="3" strokeWidth="2.2" />
        <rect
          x="27.5"
          y="24.5"
          width="31"
          height="33"
          rx="3"
          strokeWidth="2.2"
          fill="hsl(var(--background))"
        />
        <path d="M12 36.5h20M33 53.5h20" strokeWidth="1.1" opacity="0.5" />
      </g>
      <g
        filter="url(#bb-pencil-fine)"
        fill="currentColor"
        stroke="none"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="17"
        textAnchor="middle"
      >
        <text x="22" y="30">
          Br
        </text>
        <text x="43" y="47">
          Ba
        </text>
      </g>
      <g
        filter="url(#bb-pencil-fine)"
        fill="currentColor"
        stroke="none"
        fontFamily="ui-monospace, monospace"
        fontSize="6.5"
        opacity="0.8"
      >
        <text x="9.5" y="16">
          35
        </text>
        <text x="30.5" y="33">
          56
        </text>
      </g>
    </svg>
  );
}
