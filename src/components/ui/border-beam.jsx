import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils"

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#60a5fa",
  colorTo = "#2563eb",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1
}) => {
  const ref = useRef(null);
  // Only animate while the host card is near the viewport; skip entirely under reduced motion.
  const inView = useInView(ref, { margin: "200px 0px" });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
      style={{
        borderWidth: `${borderWidth}px`,
        WebkitMaskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        maskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
        WebkitMaskClip: "padding-box, border-box",
        maskClip: "padding-box, border-box",
      }}
    >
      {inView && !reduce && (
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style
          }
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
      )}
    </div>
  );
}
