import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { Award, ShieldCheck, Leaf, X, ZoomIn, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { Parallax } from "@/components/ui/Parallax.jsx";
import { TiltCard } from "@/components/ui/TiltCard.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { DotPattern } from "@/components/ui/dot-pattern.jsx";
import { BorderBeam } from "@/components/ui/border-beam.jsx";
import { cn } from "@/lib/utils";
import { management } from "@/data/content.js";

/* ------------------------------------------------------------------ */
/* Pagalbinės                                                          */
/* ------------------------------------------------------------------ */

const pad = (n) => String(n).padStart(2, "0");

/** Ikona pagal sertifikato id: 9001 – Award, 14001 – Leaf, 45001 – ShieldCheck. */
const CERT_ICONS = { 9001: Award, 14001: Leaf, 45001: ShieldCheck };

/** Integruotos vadybos sistemos sritys. */
const SYSTEM_PILLARS = ["kokybė", "aplinkosauga", "darbo sauga"];

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (typeof window !== "undefined" ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* ------------------------------------------------------------------ */
/* Lightbox – skenas per visą ekraną                                   */
/* ------------------------------------------------------------------ */

function Lightbox({ items, index, onClose, onStep }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];
  const many = items.length > 1;

  // Body scroll užraktas + pradinis fokusas (vieną kartą atidarius)
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  // Esc, rodyklės, fokuso spąstai
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (many && e.key === "ArrowRight") {
        onStep(1);
        return;
      }
      if (many && e.key === "ArrowLeft") {
        onStep(-1);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep, many]);

  const navBtn =
    "absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-black/30 ring-1 ring-slate-900/10 backdrop-blur transition duration-300 ease-out-expo hover:scale-105 hover:bg-white focus-visible:ring-offset-slate-900";

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Fonas – uždaro paspaudus */}
      <div aria-hidden="true" className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mgmt-lightbox-title"
        className="relative"
        initial={reduce ? false : { scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { scale: 0.96, y: 12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <figure className="flex max-h-[85vh] flex-col items-center">
          <motion.img
            key={item.image}
            src={item.image}
            alt={item.subtitle ? `${item.title} – ${item.subtitle}` : item.title}
            draggable="false"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-0 w-auto max-w-[calc(100vw-2rem)] flex-1 self-center rounded-lg bg-white object-contain shadow-2xl shadow-black/50 ring-1 ring-white/20 max-h-[85vh] sm:max-w-[min(80vw,56rem)]"
          />
          <figcaption className="mt-4 shrink-0 px-12 text-center text-white">
            <p id="mgmt-lightbox-title" className="font-display text-base font-medium tracking-tight sm:text-lg">
              {item.title}
            </p>
            {item.subtitle && <p className="mt-1 text-sm text-slate-300">{item.subtitle}</p>}
            {many && (
              <p className="mt-2 text-xs tabular-nums tracking-[0.2em] text-slate-400">
                {index + 1} / {items.length}
              </p>
            )}
          </figcaption>
        </figure>

        {many && (
          <>
            <button type="button" onClick={() => onStep(-1)} aria-label="Ankstesnis" className={cn(navBtn, "left-2 sm:-left-14")}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Kitas" className={cn(navBtn, "right-2 sm:-right-14")}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Uždaryti"
          className="absolute -right-2 -top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg shadow-black/30 ring-1 ring-slate-900/10 transition duration-300 ease-out-expo hover:rotate-90 hover:scale-105 hover:bg-blue-50 focus-visible:ring-offset-slate-900 sm:-right-3 sm:-top-3"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Išskleistas sertifikatas (popieriaus skenas)                        */
/* ------------------------------------------------------------------ */

function FannedCert({ cert, index, spread, offsetPct, active, onOpen, onHover }) {
  const dir = index - 1; // -1 kairė, 0 vidurys, 1 dešinė
  // Vėduoklė atsidaro pagal scroll: x poslinkis (% nuo savo pločio), rotacija ±6°, kraštiniai šiek tiek žemiau.
  const x = useTransform(spread, (s) => `${-50 + s * dir * offsetPct}%`);
  const y = useTransform(spread, (s) => `${-50 + s * Math.abs(dir) * 4}%`);
  const rotate = useTransform(spread, (s) => s * dir * 6);

  return (
    <motion.div
      className={cn("absolute left-1/2 top-1/2", dir === 0 ? "z-20" : "z-10", active && "z-30", "hover:z-30")}
      style={{ x, y, rotate, transformOrigin: "50% 100%" }}
      onMouseEnter={() => onHover(cert.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={cn(
          "group transition-transform duration-500 ease-out-expo hover:-translate-y-2 hover:scale-105",
          active && "-translate-y-2 scale-105"
        )}
      >
        <TiltCard max={6} className="rounded-xl">
          <button
            type="button"
            onClick={onOpen}
            onFocus={() => onHover(cert.id)}
            onBlur={() => onHover(null)}
            className="relative block rounded-xl bg-white p-2 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10"
          >
            <img
              src={cert.image}
              alt={`${cert.title} sertifikatas – ${cert.subtitle}`}
              width={776}
              height={1108}
              loading="lazy"
              draggable="false"
              className="w-48 rounded-md object-contain sm:w-56"
            />
            <span className="sr-only">Padidinti</span>
            {/* Popieriaus blizgesys */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-md bg-gradient-to-br from-white/50 via-transparent to-slate-900/[0.06]"
            />
            {/* Užuomina padidinti */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-900/85 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur transition duration-300 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
            >
              <ZoomIn className="h-3.5 w-3.5" />
              Peržiūrėti
            </span>
          </button>
        </TiltCard>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Smulkūs elementai                                                   */
/* ------------------------------------------------------------------ */

function AwardCard({ award, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full items-center gap-5 rounded-2xl bg-white p-4 pr-6 text-left shadow-card ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover hover:ring-slate-900/10"
    >
      <span className="relative shrink-0 rounded-lg bg-slate-50 p-1.5 shadow-md shadow-slate-900/10 ring-1 ring-slate-900/10 transition duration-500 ease-out-expo group-hover:-rotate-2 group-hover:scale-105 group-hover:shadow-lg">
        <img
          src={award.image}
          alt=""
          width={150}
          height={210}
          loading="lazy"
          draggable="false"
          className="h-28 w-auto rounded object-contain"
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium tracking-tight text-slate-900 text-pretty">{award.title}</span>
        <span className="mt-2 inline-flex translate-y-1 items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition duration-300 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
          Peržiūrėti
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Sekcija                                                             */
/* ------------------------------------------------------------------ */

export function Management() {
  const certs = management.certificates;
  const awards = management.awards;
  const reduce = useReducedMotion();
  const isSm = useMediaQuery("(min-width: 640px)");
  const offsetPct = isSm ? 46 : 30;

  const [lightbox, setLightbox] = useState(null); // { items, index } | null
  const [active, setActive] = useState(null); // sertifikato id, kurį kelia chip'as / fokusas
  const triggerRef = useRef(null);

  // Vėduoklė atsiskleidžia slenkant: 0 – scena įeina į ekraną, 1 – scena ekrano centre
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const one = useMotionValue(1);
  const spread = reduce ? one : spring;

  const open = useCallback((items, index, trigger) => {
    triggerRef.current = trigger ?? document.activeElement;
    setLightbox({ items, index });
  }, []);
  const close = useCallback(() => {
    setLightbox(null);
    const el = triggerRef.current;
    if (el && typeof el.focus === "function") requestAnimationFrame(() => el.focus());
  }, []);
  const step = useCallback((d) => {
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + d + lb.items.length) % lb.items.length } : lb));
  }, []);

  return (
    <Section id="vadybos-sistema" className="bg-slate-50">
      <DotPattern className="text-slate-300 [mask-image:radial-gradient(ellipse_at_top,white,transparent_75%)]" />
      <Parallax speed={0.25} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Glow className="opacity-50" />
      </Parallax>

      <Container className="relative">
        <SectionHeading eyebrow="Vadybos sistema" title={management.title} text={management.intro} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* ------------------------------------------------------ */}
          {/* Kairė: vadovybės įsipareigojimai                        */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6">
            <Reveal>
              <Parallax speed={0.06}>
                <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-10">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                  />

                  <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Vadovybės įsipareigojimai</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-600 ring-1 ring-slate-900/5">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                      ISO 9001 · 14001 · 45001
                    </span>
                  </div>

                  <Stagger as="ol" stagger={0.08} className="relative -mx-4 mt-6 divide-y divide-slate-100">
                    {management.commitments.map((c, i) => (
                      <StaggerItem
                        as="li"
                        key={i}
                        className="group/row flex gap-5 rounded-xl px-4 py-4 transition duration-300 ease-out-expo hover:bg-slate-50"
                      >
                        <span
                          aria-hidden="true"
                          className="w-10 shrink-0 pt-0.5 font-display text-2xl font-medium leading-none tabular-nums text-blue-600 transition duration-300 ease-out-expo group-hover/row:-translate-y-0.5 group-hover/row:text-blue-700"
                        >
                          {pad(i + 1)}
                        </span>
                        <p className="text-[15px] leading-relaxed text-pretty text-slate-700">{c}</p>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Parallax>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ */}
          {/* Dešinė: ISO sertifikatų vėduoklė                        */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div ref={stageRef} className="relative h-[28rem] sm:h-[32rem]">
                {/* Prožektorius už vėduoklės */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14),transparent_62%)]"
                />
                {/* Žemės šešėlis */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-14 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-[100%] bg-slate-900/10 blur-2xl"
                />

                {/* Plūduriuojantis ženklelis – sertifikuota */}
                <Parallax speed={-0.2} className="pointer-events-none absolute left-0 top-2 z-30 sm:left-2" aria-hidden="true">
                  <div className="animate-float inline-flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-blue-500" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                    </span>
                    Sertifikuota vadybos sistema
                  </div>
                </Parallax>

                {/* Vėduoklė */}
                <Parallax speed={-0.06} className="absolute inset-0">
                  {certs.map((cert, i) => (
                    <FannedCert
                      key={cert.id}
                      cert={cert}
                      index={i}
                      spread={spread}
                      offsetPct={offsetPct}
                      active={active === cert.id}
                      onOpen={(e) => open(certs, i, e.currentTarget)}
                      onHover={setActive}
                    />
                  ))}
                </Parallax>
              </div>
            </Reveal>

            {/* Etiketės – sulygiuotos su trimis sertifikatais */}
            <Stagger as="ul" stagger={0.1} delay={0.2} className="mt-4 grid grid-cols-3 gap-3 sm:gap-4" aria-label="ISO sertifikatai">
              {certs.map((cert, i) => {
                const Icon = CERT_ICONS[cert.id] ?? Award;
                const isActive = active === cert.id;
                return (
                  <StaggerItem as="li" key={cert.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={(e) => open(certs, i, e.currentTarget)}
                      onMouseEnter={() => setActive(cert.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(cert.id)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "flex h-full w-full flex-col items-center gap-2 rounded-2xl bg-white/80 p-3 text-center shadow-sm ring-1 ring-slate-900/5 backdrop-blur transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-card hover:ring-blue-200 sm:flex-row sm:items-start sm:gap-3 sm:p-4 sm:text-left",
                        isActive && "-translate-y-0.5 bg-white shadow-card ring-blue-300"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 ease-out-expo",
                          isActive && "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-blue-600"
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold tracking-tight text-slate-900 sm:text-sm">{cert.title}</span>
                        <span className="mt-0.5 hidden text-[11px] leading-snug text-slate-500 sm:block">{cert.subtitle}</span>
                      </span>
                    </button>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Apdovanojimai ir pažymėjimai                              */}
        {/* -------------------------------------------------------- */}
        <div className="mt-16 sm:mt-20">
          <Reveal className="flex items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Apdovanojimai ir pažymėjimai</p>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
          </Reveal>

          <Stagger stagger={0.1} className="mt-6 flex flex-wrap items-stretch gap-6">
            {/* Išskirtinė kortelė – integruota vadybos sistema */}
            <StaggerItem className="w-full xl:w-[26rem]">
              <div className="relative h-full overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 sm:p-8">
                <BorderBeam size={100} duration={7} />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-white opacity-40 mask-fade-b" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />

                <div className="relative flex h-full flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Integruota vadybos sistema</p>
                  <p className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                    ISO 9001 <span className="text-slate-500">·</span> 14001 <span className="text-slate-500">·</span> 45001
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Vadybos sistemos sritys">
                    {SYSTEM_PILLARS.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 ring-1 ring-white/10 transition duration-300 hover:bg-white/10"
                      >
                        <Check className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" strokeWidth={2.5} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>

            {awards.map((award, i) => (
              <StaggerItem key={award.title} className="min-w-[14rem] flex-1">
                <AwardCard award={award} onOpen={(e) => open(awards, i, e.currentTarget)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>

      {/* Lightbox – per portalą į body, kad fixed nepriklausytų nuo transform/overflow tėvų */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={close} onStep={step} />}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
