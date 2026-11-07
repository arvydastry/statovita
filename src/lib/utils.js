import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom tokens in tailwind.config.js so conditional
// overrides (e.g. shadow-sm -> shadow-card) resolve instead of both classes surviving.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["card", "card-hover", "glow", "inner-light"] }],
      animate: [{ animate: ["float", "marquee", "marquee-vertical", "shimmer", "gradient", "pulse-ring"] }],
      ease: [{ ease: ["out-expo"] }],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
