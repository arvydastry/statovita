import { cn } from "@/lib/utils";

/**
 * Statovita wordmark: slanted blue mark (two parallelograms, after the original logo) + Lexend caps.
 * tone: dark (slate text, for light backgrounds) | light (white text, for dark/blue backgrounds)
 */
export function LogoMark({ className, tone = "dark" }) {
  const id = tone === "light" ? "sv-mark-light" : "sv-mark-dark";
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone === "light" ? "#93c5fd" : "#3b82f6"} />
          <stop offset="1" stopColor={tone === "light" ? "#60a5fa" : "#1d4ed8"} />
        </linearGradient>
      </defs>
      <path d="M6 4h12l10 17H16z" fill={`url(#${id})`} />
      <path d="M12 19h12l10 17H22z" fill={`url(#${id})`} opacity="0.85" />
    </svg>
  );
}

export function Logo({ className, tone = "dark", markClassName, textClassName }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className={markClassName} />
      <span
        className={cn(
          "font-display text-lg font-semibold uppercase tracking-[0.22em]",
          tone === "light" ? "text-white" : "text-slate-900",
          textClassName
        )}
      >
        Statovita
      </span>
    </span>
  );
}
