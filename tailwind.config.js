import forms from "@tailwindcss/forms";

/** Salient-inspired design tokens: Inter body, Lexend display, slate + blue-600. */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Lexend", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 10px 30px -10px rgb(15 23 42 / 0.12)",
        "card-hover": "0 1px 2px 0 rgb(15 23 42 / 0.06), 0 30px 60px -20px rgb(15 23 42 / 0.25)",
        glow: "0 0 0 1px rgb(37 99 235 / 0.12), 0 24px 60px -24px rgb(37 99 235 / 0.45)",
        "inner-light": "inset 0 1px 0 0 rgb(255 255 255 / 0.6)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        gradient: {
          to: { backgroundPosition: "var(--bg-size, 300%) 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        gradient: "gradient 8s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.2, 0.6, 0.2, 1) infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [forms({ strategy: "class" })],
};
