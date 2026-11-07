import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClientLogo } from "@/components/ui/ClientLogo.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Highlight } from "@/components/ui/Highlight.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { Parallax, ParallaxImage } from "@/components/ui/Parallax.jsx";
import { TiltCard } from "@/components/ui/TiltCard.jsx";
import { Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { DotPattern } from "@/components/ui/dot-pattern.jsx";
import { hero, heroImages, clients, stats, projects, management, about, nav, YEARS, FOUNDED } from "@/data/content.js";

const EASE = [0.16, 1, 0.3, 1];

/* Entrance (on mount, not on scroll) */
const group = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } };
const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

const glassCard = "rounded-2xl bg-white/90 backdrop-blur shadow-xl shadow-slate-900/15 ring-1 ring-slate-900/5";

/* Derived copy – everything comes from content.js */
const experience = stats[0];
const plantProject = projects.find((p) => p.image === heroImages.cardA) ?? projects[0];
const plantStat = stats.find((s) => s.suffix.trim() === "m³/d") ?? stats[1];
const isoCodes = management.certificates.map((c) => c.title.replace(/^ISO\s*/, "").split(":")[0]).join(" · ");
const isoLabel = about.pillars.find((p) => /vadybos/i.test(p.title))?.title ?? management.title;
const nextSection = nav[0];

/** One h1 line; the `highlight` word gets the Salient hand-drawn underline. */
function TitleLine({ line, highlight }) {
  const target = highlight.toLowerCase();
  return line.split(" ").map((word, i) => {
    const bare = word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    return (
      <Fragment key={`${word}-${i}`}>
        {i > 0 && " "}
        {bare === target ? <Highlight>{word}</Highlight> : word}
      </Fragment>
    );
  });
}

/**
 * Floating badge over the hero image: scroll parallax (own speed) + slow CSS float
 * (own phase) + a delayed pop-in on mount. Each transform lives on its own element.
 */
function Floating({ speed, phase, delay, className, children }) {
  const reduce = useReducedMotion();
  return (
    <Parallax speed={speed} className={cn("absolute z-20", className)}>
      <div className="animate-float" style={{ animationDelay: phase }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </Parallax>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  /* Headline drifts down and fades only while it is leaving the viewport (0 → 1 as it exits) */
  const headRef = useRef(null);
  const { scrollYProgress: headProgress } = useScroll({ target: headRef, offset: ["start start", "end start"] });
  const headY = useTransform(headProgress, [0, 1], [0, 96]);
  const headOpacity = useTransform(headProgress, [0, 1], [1, 0.2]);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-40 lg:pb-24">
      {/* Background depth: glow blobs, masked engineering grid, radial dot field */}
      <Glow />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[56rem] bg-grid-slate mask-fade-b" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[44rem]">
        <DotPattern
          width={24}
          height={24}
          className="text-slate-200 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
        />
      </div>

      <Container className="relative">
        {/* Headline block – drifts and fades as the page scrolls away */}
        <motion.div ref={headRef} style={reduce ? undefined : { y: headY, opacity: headOpacity }} className="mx-auto max-w-4xl text-center">
          <motion.div variants={group} initial={reduce ? false : "hidden"} animate="show">
            <motion.div variants={rise} className="flex justify-center">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-blue-50 py-1.5 pl-3 pr-4 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-blue-500 animate-pulse-ring" />
                  <span className="relative h-2 w-2 rounded-full bg-blue-600" />
                </span>
                {hero.eyebrow}
              </span>
            </motion.div>

            <h1
              id="hero-title"
              className="mt-8 font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-slate-900 text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {hero.title.map((line, i) => (
                <motion.span key={i} variants={rise} className="block">
                  <TitleLine line={line} highlight={hero.highlight} />
                </motion.span>
              ))}
            </h1>

            <motion.p variants={rise} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed tracking-tight text-slate-700 text-pretty sm:mt-8">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={rise} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href={hero.primary.href} color="slate" size="lg" className="w-full sm:w-auto">
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="outline" color="slate" size="lg" className="w-full sm:w-auto">
                {hero.secondary.label}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-slate-400 transition-all duration-300 ease-out-expo group-hover/btn:translate-x-1 group-hover/btn:text-blue-600"
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Cinematic composition */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          {/* Ambient light under the card */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -bottom-14 top-1/3 rounded-full bg-blue-500/15 blur-3xl" />

          {/* Stacked “paper” plates – slightly different parallax speed than the photo */}
          <Parallax speed={-0.08} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="absolute inset-0 -rotate-2 translate-y-4 rounded-3xl bg-blue-50 ring-1 ring-blue-100" />
            <div className="absolute inset-0 rotate-1 translate-y-2 rounded-3xl bg-slate-50 ring-1 ring-slate-200/70" />
          </Parallax>

          <div className="relative z-10">
            <TiltCard max={3} glare className="group rounded-3xl">
              <ParallaxImage
                src={heroImages.main}
                loading="eager"
                fetchPriority="high"
                alt={heroImages.mainAlt}
                strength={0.12}
                className="aspect-[4/3] rounded-3xl shadow-2xl shadow-blue-900/20 ring-1 ring-slate-900/10 sm:aspect-[16/9]"
                overlay="bg-gradient-to-t from-slate-900/35 via-slate-900/0 to-slate-900/0"
              >
                <div aria-hidden="true" className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20" />
              </ParallaxImage>
            </TiltCard>
          </div>

          {/* (a) Years of experience – foreground, moves fastest (positive speed = faster than scroll) */}
          <Floating speed={0.25} phase="-1.5s" delay={0.95} className="-bottom-6 left-3 sm:-bottom-10 sm:-left-5 xl:-left-14">
            <div
              className={cn(
                glassCard,
                "w-[9.75rem] p-4 transition duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/15 sm:w-48 sm:p-5"
              )}
            >
              <p className="font-display text-5xl font-medium leading-none tracking-tight text-slate-900 sm:text-6xl">{YEARS}</p>
              <p className="mt-2 text-sm font-semibold tracking-tight text-slate-900">{experience.label}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-blue-700">
                <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" />
                nuo {FOUNDED} m.
              </p>
            </div>
          </Floating>

          {/* (b) Project snapshot – lags behind the scroll (background feel), hidden on phones */}
          <Floating speed={-0.2} phase="-3s" delay={1.1} className="hidden sm:block -top-8 -right-4 xl:-top-10 xl:-right-14">
            <figure
              className={cn(
                glassCard,
                "w-44 rotate-3 p-2 pb-3 transition duration-500 ease-out-expo hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl xl:w-56"
              )}
            >
              <img
                src={heroImages.cardA}
                alt={`${plantProject.title}, ${plantProject.location}`}
                width="600"
                height="400"
                loading="lazy"
                className="aspect-[3/2] w-full rounded-xl object-cover ring-1 ring-slate-900/5"
              />
              <figcaption className="mt-2.5 px-1">
                <span className="block truncate text-xs font-semibold tracking-tight text-slate-900">{plantStat.note}</span>
                <span className="mt-0.5 block text-[11px] text-slate-500">{plantProject.metric}</span>
              </figcaption>
            </figure>
          </Floating>

          {/* (c) Integrated management system badge */}
          <Floating speed={0.12} phase="-4.5s" delay={1.25} className="right-3 top-3 sm:-bottom-7 sm:-right-5 sm:top-auto xl:-right-12">
            <div
              className={cn(
                glassCard,
                "flex items-center gap-3 px-3.5 py-2.5 transition duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/15 sm:px-4 sm:py-3"
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-xs font-semibold tracking-tight text-slate-900 sm:text-sm">ISO {isoCodes}</span>
                <span className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">{isoLabel}</span>
              </span>
            </div>
          </Floating>
        </motion.div>

        {/* Trusted by */}
        <Stagger stagger={0.08} className="mt-20 sm:mt-24">
          <StaggerItem as="p" y={16} className="text-center text-sm font-medium tracking-tight text-slate-500">
            {hero.trusted}
          </StaggerItem>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 [--logo-scale:0.78] sm:gap-x-14 sm:[--logo-scale:0.92] lg:gap-x-16 lg:[--logo-scale:1]">
            {clients.map((client) => (
              <StaggerItem as="li" key={client.name} y={16} className="flex items-center">
                <ClientLogo
                  client={client}
                  alt={client.name}
                  area={7200}
                  maxHeight={76}
                  className="opacity-80 grayscale brightness-75 transition duration-500 ease-out-expo hover:scale-105 hover:opacity-100 hover:grayscale-0 hover:brightness-100"
                />
              </StaggerItem>
            ))}
          </ul>
        </Stagger>

        {/* Scroll hint */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14 flex justify-center sm:mt-16"
        >
          <a
            href={nextSection.href}
            aria-label={`Slinkti žemyn: ${nextSection.label}`}
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-slate-400 ring-1 ring-slate-200 backdrop-blur transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-card hover:ring-blue-200"
          >
            <ChevronDown aria-hidden="true" className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
