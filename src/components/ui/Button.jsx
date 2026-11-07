import { cn } from "@/lib/utils";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out-expo focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants = {
  solid: {
    slate:
      "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-900/30 active:bg-slate-800 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40 active:bg-blue-700 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl active:bg-blue-100 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "bg-white/70 text-slate-700 ring-1 ring-slate-200 backdrop-blur hover:-translate-y-0.5 hover:text-slate-900 hover:ring-slate-300 hover:shadow-card active:bg-slate-100 focus-visible:outline-blue-600",
    white:
      "text-white ring-1 ring-white/40 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-white/70 active:bg-white/20 focus-visible:outline-white",
    blue: "text-blue-700 ring-1 ring-blue-200 bg-blue-50/60 hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-300 active:bg-blue-100 focus-visible:outline-blue-600",
  },
  ghost: {
    slate: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-blue-600",
    white: "text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-white",
  },
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/**
 * Salient-style pill button. Renders <a> when `href` is given, else <button>.
 * variant: solid | outline | ghost; color: slate | blue | white; size: sm | md | lg
 */
export function Button({ variant = "solid", color = "slate", size = "md", className, href, children, ...props }) {
  const cls = cn(base, variants[variant]?.[color] ?? variants.solid.slate, sizes[size], className);
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
