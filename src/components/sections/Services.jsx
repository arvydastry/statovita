import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Check, Pause, Play, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal } from "@/components/ui/Reveal.jsx";
import { Parallax, ParallaxImage } from "@/components/ui/Parallax.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { company, hero, services, servicesBackground } from "@/data/content.js";
import { cn } from "@/lib/utils";

const AUTO_MS = 6000;
const EASE = [0.16, 1, 0.3, 1];
const LG_QUERY = "(min-width: 1024px)";
const KEY_STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

const pad2 = (n) => String(n).padStart(2, "0");

/** Small matchMedia hook – used for aria-orientation and the mobile pill scroller. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Floating white badge used over the panel (experience / licence). */
function FloatingBadge({ icon: Icon, className, children }) {
  return (
    <div
      className={cn(
        "animate-float flex items-center gap-3 rounded-2xl bg-white py-3 pl-3 pr-5 shadow-xl shadow-blue-900/30 ring-1 ring-slate-900/5",
        className
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      {children}
    </div>
  );
}

export function Services() {
  const reduce = useReducedMotion();
  const isLg = useMediaQuery(LG_QUERY);
  const baseId = useId();

  const rootRef = useRef(null);
  const listRef = useRef(null);
  const tabRefs = useRef([]);
  const inView = useInView(rootRef, { amount: 0.3 });

  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true); // false after the user picks a tab
  const [paused, setPaused] = useState(false); // hover / focus inside the component

  // Auto-advance clock: a single rAF loop drives both the hairline and the tab switch,
  // so pausing simply stops the clock and resumes where it left off.
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const playing = auto && !paused && !reduce && inView;
  const playingRef = useRef(playing);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useAnimationFrame(
    useCallback(
      (_, delta) => {
        if (!playingRef.current) return;
        elapsed.current += delta;
        if (elapsed.current >= AUTO_MS) {
          elapsed.current = 0;
          setIndex((i) => (i + 1) % services.length);
        }
        progress.set(Math.min(elapsed.current / AUTO_MS, 1));
      },
      [progress]
    )
  );

  const select = useCallback(
    (i) => {
      setIndex(i);
      setAuto(false);
      elapsed.current = 0;
      progress.set(0);
    },
    [progress]
  );

  // Keep the active pill centred in the horizontal scroller (< lg). Scrolls the list only – never the page.
  useEffect(() => {
    if (isLg) return;
    const list = listRef.current;
    const btn = tabRefs.current[index];
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    const left = btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [index, isLg, reduce]);

  function onKeyDown(e) {
    const n = services.length;
    let next;
    if (KEY_STEP[e.key] !== undefined) next = (index + KEY_STEP[e.key] + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  }

  const active = services[index];
  const tabId = (s) => `${baseId}-tab-${s.id}`;
  const panelId = (s) => `${baseId}-panel-${s.id}`;

  const panelFx = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        enter: { opacity: 0, x: 36, scale: 0.98 },
        center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
        exit: { opacity: 0, x: -18, scale: 0.985, transition: { duration: 0.2, ease: "easeIn" } },
      };
  const backFx = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 0.8 }, exit: { opacity: 0 } }
    : {
        enter: { opacity: 0, x: 28, rotate: 0 },
        center: { opacity: 0.8, x: 0, rotate: -4, transition: { duration: 0.65, ease: EASE, delay: 0.05 } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2, ease: "easeIn" } },
      };

  return (
    <Section id="paslaugos" className="isolate bg-blue-600 pb-28 pt-20 sm:py-32">
      {/* Full-bleed background: parallax aerial photo, tonal gradient, engineering grid, glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ParallaxImage
          src={servicesBackground}
          alt=""
          strength={0.08}
          className="absolute inset-0 h-full w-full opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 via-blue-600/10 to-blue-700/80" />
        <div className="absolute inset-0 bg-grid-white [mask-image:radial-gradient(70%_70%_at_50%_25%,black,transparent)]" />
        <Glow tone="white" />
      </div>

      <Container className="relative z-10">
        {/* tone="blue" paints eyebrow + lead text-blue-100 (≈4.2:1 on blue-600) – override both <p> to white for WCAG AA */}
        <SectionHeading
          tone="blue"
          className="[&>p]:text-white"
          eyebrow="Paslaugos"
          title="Viskas, ko reikia vandentvarkos objektui – nuo projekto iki paleidimo"
          text={"Projektuojame, statome ir rekonstruojame vandentiekio bei nuotekų infrastruktūrą visoje Lietuvoje – atviru ir uždaru būdu, nuo 50 iki 280\u00A0000\u00A0m³/d."}
        />

        <div
          ref={rootRef}
          className="mt-16 sm:mt-20 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:gap-x-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          {/* Tab list: horizontal snap row on mobile, vertical Salient list on lg */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div
              ref={listRef}
              role="tablist"
              aria-label="Paslaugų kategorijos"
              aria-orientation={isLg ? "vertical" : "horizontal"}
              onKeyDown={onKeyDown}
              className={cn(
                "relative -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-4 scroll-pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                "sm:-mx-6 sm:px-6 sm:scroll-pl-6",
                "lg:mx-0 lg:snap-none lg:flex-col lg:gap-y-1 lg:overflow-visible lg:px-0 lg:pb-0"
              )}
            >
              {services.map((s, i) => {
                const selected = i === index;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={tabId(s)}
                    aria-selected={selected}
                    aria-controls={panelId(s)}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className={cn(
                      "group relative flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-left transition-colors duration-300",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600",
                      "lg:w-full lg:items-start lg:gap-4 lg:whitespace-normal lg:rounded-l-xl lg:rounded-r-none lg:p-6",
                      selected ? "bg-blue-800/30" : "hover:bg-white/5"
                    )}
                  >
                    {/* decorative inset ring (kept on a child so it never fights the focus ring) */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset transition-colors duration-300",
                        selected
                          ? "ring-white/25 lg:ring-white/10"
                          : "ring-white/10 group-hover:ring-white/20 lg:ring-transparent lg:group-hover:ring-white/10"
                      )}
                    />

                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg p-1 transition-all duration-300 ease-out-expo lg:h-10 lg:w-10 lg:p-1.5",
                        selected ? "bg-white shadow-lg shadow-blue-900/20" : "bg-white/10 group-hover:bg-white/20"
                      )}
                    >
                      <img src={s.icon} alt="" loading="lazy" className="h-full w-full object-contain" />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-display text-base font-medium tracking-tight text-white lg:text-lg">
                        <span className="lg:hidden">{s.short}</span>
                        <span className="hidden lg:inline">{s.title}</span>
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: selected ? "auto" : 0, opacity: selected ? 1 : 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                        className="hidden overflow-hidden lg:block"
                      >
                        <span className="block pt-2 text-sm leading-relaxed text-white">{s.description}</span>
                      </motion.span>
                    </span>

                    {/* 6 s auto-advance hairline (lg) */}
                    {selected && (
                      <motion.span
                        aria-hidden="true"
                        style={{ scaleX: progress }}
                        className={cn(
                          "absolute bottom-0 left-6 right-0 hidden h-px origin-left bg-white/70 transition-opacity duration-300 lg:block",
                          auto ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* WCAG 2.2.2: explicit pause / resume for the 6 s auto-advance (hidden when motion is reduced – no auto-advance then) */}
            {!reduce && (
              <div className="mt-4 flex items-center lg:mt-6 lg:pl-6">
                <button
                  type="button"
                  aria-label={auto ? "Sustabdyti automatinį perjungimą" : "Tęsti automatinį perjungimą"}
                  onClick={() => {
                    setAuto((a) => !a);
                    elapsed.current = 0;
                    progress.set(0);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors duration-300 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
                >
                  {auto ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            )}

            <div className="mt-4 hidden items-center gap-3 pl-6 text-sm text-white lg:flex">
              <Award className="h-4 w-4 shrink-0 text-blue-200" aria-hidden="true" />
              <span>{company.membership}</span>
            </div>
          </Reveal>

          {/* Panel */}
          <Reveal className="relative mt-10 lg:col-span-7 lg:mt-0" delay={0.15} y={40}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                role="tabpanel"
                id={panelId(active)}
                aria-labelledby={tabId(active)}
                variants={panelFx}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                {/* Offset photo card behind the panel – slower parallax layer */}
                <Parallax speed={0.22} className="pointer-events-none absolute left-0 top-0 w-[82%]" aria-hidden="true">
                  <div className="-translate-x-3 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-10 lg:-translate-y-8">
                    <motion.img
                      variants={backFx}
                      src={active.photo}
                      alt=""
                      loading="lazy"
                      className="aspect-[3/2] w-full rounded-2xl object-cover opacity-80 shadow-xl shadow-blue-900/30 ring-1 ring-white/10"
                    />
                  </div>
                </Parallax>

                {/* Front card */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/30 ring-1 ring-white/10">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                    <img
                      src={active.image}
                      alt={active.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">{active.metric.value}</p>
                      <p className="mt-1 max-w-sm text-sm text-blue-100">{active.metric.label}</p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                      <span className="tabular-nums">
                        {pad2(index + 1)}
                        <span className="text-slate-300"> / {pad2(services.length)}</span>
                      </span>
                      <span className="h-px w-6 bg-blue-600/40" aria-hidden="true" />
                      {active.short}
                    </p>

                    {/* On lg the selected tab already shows the description, so it lives here only below lg */}
                    <p className="mt-4 text-base leading-relaxed text-slate-700 lg:hidden">{active.description}</p>

                    <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {active.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/40">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-100 pt-5">
                      <p className="text-sm text-slate-500">{company.tagline}</p>
                      <a
                        href={hero.primary.href}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-700"
                      >
                        {hero.primary.label}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating badge – faster (foreground) parallax layer. The "nuo 1997 m." accent lives in Hero / Experience / timeline / footer. */}
            <Parallax speed={-0.08} className="pointer-events-none absolute -bottom-5 -left-3 z-20 hidden sm:-left-6 sm:block">
              <FloatingBadge icon={ShieldCheck} className="[animation-delay:-3s]">
                <span className="block max-w-[11rem] text-sm font-semibold leading-snug tracking-tight text-slate-900">{company.licence}</span>
              </FloatingBadge>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
