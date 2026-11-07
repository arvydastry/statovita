import { cn } from "@/lib/utils";

/**
 * Decorative blurred gradient blobs, replacing Salient's background-*.jpg images.
 * tone: blue (for white sections) | white (for blue/dark sections)
 */
export function Glow({ className, tone = "blue" }) {
  const a = tone === "white" ? "bg-white/20" : "bg-blue-400/30";
  const b = tone === "white" ? "bg-sky-200/20" : "bg-sky-300/30";
  const c = tone === "white" ? "bg-blue-300/20" : "bg-indigo-300/20";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl", a)} />
      <div className={cn("absolute -bottom-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl", b)} />
      <div className={cn("absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full blur-3xl", c)} />
    </div>
  );
}
