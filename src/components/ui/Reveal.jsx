import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];

/** Fade + rise into view once. `as` picks the motion element (div, section, li, ...). */
export function Reveal({ children, delay = 0, y = 28, duration = 0.8, once = true, as = "div", className, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const container = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const item = (y) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
});

/** Staggered reveal: wrap children in <StaggerItem>. */
export function Stagger({ children, stagger = 0.08, delay = 0, once = true, as = "div", className, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      variants={container(stagger, delay)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "-60px 0px" }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, y = 24, as = "div", className, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp variants={item(y)} className={className} {...rest}>
      {children}
    </Comp>
  );
}
