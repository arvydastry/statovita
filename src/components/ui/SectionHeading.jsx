import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal.jsx";

const tones = {
  light: { eyebrow: "text-blue-600", title: "text-slate-900", text: "text-slate-600", line: "bg-blue-600" },
  dark: { eyebrow: "text-blue-300", title: "text-white", text: "text-slate-300", line: "bg-blue-400" },
  blue: { eyebrow: "text-blue-100", title: "text-white", text: "text-blue-100", line: "bg-white" },
};

/**
 * eyebrow (small caps label), title (Lexend display), text (lead paragraph).
 * align: center | left; tone: light | dark | blue
 */
export function SectionHeading({ eyebrow, title, text, align = "center", tone = "light", className, titleClassName, children }) {
  const t = tones[tone] ?? tones.light;
  const centered = align === "center";
  return (
    <Reveal className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]", t.eyebrow, centered && "justify-center")}>
          <span className={cn("h-px w-8", t.line)} aria-hidden="true" />
          {eyebrow}
          {centered && <span className={cn("h-px w-8", t.line)} aria-hidden="true" />}
        </p>
      )}
      <h2 className={cn("mt-4 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl md:text-5xl", t.title, titleClassName)}>
        {title}
      </h2>
      {text && <p className={cn("mt-5 text-lg leading-relaxed tracking-tight text-pretty", t.text)}>{text}</p>}
      {children}
    </Reveal>
  );
}
