import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D tilt-on-hover card with a moving light sheen. Children are rendered inside; use `className` for the surface.
 * max: tilt degrees. Use sparingly – one or two per section.
 */
export function TiltCard({ children, className, max = 8, glare = true, as = "div", ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const Comp = motion[as] ?? motion.div;

  function onMove(e) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="perspective-1000">
      <Comp
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn("relative will-change-transform", className)}
        {...rest}
      >
        {children}
        {glare && !reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "radial-gradient(400px circle at var(--gx) var(--gy), rgb(255 255 255 / 0.28), transparent 45%)",
              "--gx": glareX,
              "--gy": glareY,
            }}
          />
        )}
      </Comp>
    </div>
  );
}
