import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Dot grid background drawn with a single SVG <pattern> (cheap: one rect, not thousands of circles).
 * Color via text-* utilities (currentColor); mask with [mask-image:...] on className.
 * Props kept compatible with the Magic UI DotPattern API; `glow` adds a slow pulse.
 */
export function DotPattern({ width = 16, height = 16, x = 0, y = 0, cx = 1, cy = 1, cr = 1, className, glow = false, ...props }) {
  const id = useId();
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full text-slate-300", className)} {...props}>
      <defs>
        <pattern id={id} x={x} y={y} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} className={glow ? "animate-pulse" : undefined} />
    </svg>
  );
}
