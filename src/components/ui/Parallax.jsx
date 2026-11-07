import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked parallax. `speed` in [-1, 1]: positive moves FASTER than the page (foreground feel),
 * negative moves slower / drifts against the scroll (background feel). Travel in px = speed * 240 over the viewport.
 */
export function Parallax({ children, speed = 0.3, className, style, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y, ...style }} className={cn("will-change-transform", className)} {...rest}>
      {children}
    </motion.div>
  );
}

/**
 * Image that drifts inside a clipped frame while scrolling (classic parallax photo).
 * Wrap in a container with fixed aspect / height and overflow-hidden (done here).
 */
export function ParallaxImage({ src, alt = "", className, imgClassName, strength = 0.18, overlay, children, loading = "lazy", fetchPriority }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength * 100}%`, `${strength * 100}%`]);
  const scale = 1 + strength * 2;
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchPriority}
        style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale }}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", imgClassName)}
      />
      {overlay && <div className={cn("absolute inset-0", overlay)} aria-hidden="true" />}
      {children}
    </div>
  );
}

/** Progress of an element through the viewport (0..1) for custom scroll effects. */
export function useSectionProgress(ref) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return scrollYProgress;
}
