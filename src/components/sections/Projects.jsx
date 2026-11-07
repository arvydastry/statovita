import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, ChevronDown, ChevronLeft, ChevronRight, Droplets, FileText, Gauge, MapPin, X } from "lucide-react";
import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal } from "@/components/ui/Reveal.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { Parallax } from "@/components/ui/Parallax.jsx";
import { BorderBeam } from "@/components/ui/border-beam.jsx";
import { projects, projectGroups, company, FOUNDED, YEARS } from "@/data/content.js";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];
const TOTAL = projects.length;
const STOCK_LABEL = "Iliustracinė nuotrauka";

/** „1 metai“, „29 metai“, „30 metų“, „11–19 metų“. */
function metai(n) {
  const last = n % 10;
  const tens = n % 100;
  return last === 0 || (tens >= 11 && tens <= 19) ? "metų" : "metai";
}

/* ---------------------------------------------------------------------------------------------- */
/* Section                                                                                        */
/* ---------------------------------------------------------------------------------------------- */

export function Projects() {
  const [active, setActive] = useState("visi");
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 8;
  const openerRef = useRef(null);
  const tablistRef = useRef(null);
  const reduce = useReducedMotion();
  const baseId = useId();
  const gridId = `${baseId}-grid`;

  const counts = useMemo(() => {
    const c = { visi: TOTAL };
    for (const p of projects) c[p.group] = (c[p.group] ?? 0) + 1;
    return c;
  }, []);

  const isAll = active === "visi";
  const visible = useMemo(() => (isAll ? projects : projects.filter((p) => p.group === active)), [active, isAll]);
  const activeGroup = projectGroups.find((g) => g.id === active) ?? projectGroups[0];
  const hasMore = isAll && visible.length > LIMIT;
  const shown = hasMore && !expanded ? visible.slice(0, LIMIT) : visible;

  const openProject = useCallback((project, opener) => {
    openerRef.current = opener ?? null;
    setSelected(project);
  }, []);

  const closeProject = useCallback((opts) => {
    setSelected(null);
    // The CTA link hands focus to the browser's #kontaktai fragment navigation.
    if (opts?.restoreFocus === false) return;
    const el = openerRef.current;
    if (el && typeof el.focus === "function") {
      requestAnimationFrame(() => el.focus({ preventScroll: true }));
    }
  }, []);

  function onTablistKeyDown(e) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const idx = projectGroups.findIndex((g) => g.id === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % projectGroups.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + projectGroups.length) % projectGroups.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = projectGroups.length - 1;
    setActive(projectGroups[next].id);
    tablistRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  }

  return (
    <>
      <Section id="projektai" className="bg-slate-50">
        {/* Background depth: engineering grid + glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-slate mask-fade-b" />
        <Glow className="opacity-60" />

        {/* Decorative parallax layers (different speeds) */}
        <Parallax speed={0.3} aria-hidden="true" className="pointer-events-none absolute -right-24 -top-16 hidden md:block">
          <Ripples />
        </Parallax>
        <Parallax speed={0.15} aria-hidden="true" className="pointer-events-none absolute left-[2%] top-4 hidden select-none xl:block">
          <span className="font-display text-[11rem] font-semibold leading-none tracking-tighter text-slate-900/[0.04]">{FOUNDED}</span>
        </Parallax>
        <Parallax speed={-0.2} className="absolute right-[4%] top-14 hidden xl:block">
          <div className="animate-float flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-medium tracking-tight text-slate-900">
                {YEARS} {metai(YEARS)} patirties
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">Vandentvarka nuo {FOUNDED} m.</span>
            </span>
          </div>
        </Parallax>

        <Container className="relative">
          <SectionHeading
            eyebrow="Įgyvendinti projektai"
            title="Objektai, kurie veikia dešimtmečius"
            text="Nuo 50 m³/d Kernavės valyklos iki 280 000 m³/d Vilniaus nuotekų valyklos modernizavimo – svarbiausi įgyvendinti objektai."
          />

          {/* Filter bar */}
          <Reveal delay={0.1} className="mt-12">
            <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              <div
                ref={tablistRef}
                role="tablist"
                aria-label="Projektų grupės"
                onKeyDown={onTablistKeyDown}
                className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center"
              >
                {projectGroups.map((g) => {
                  const isActive = g.id === active;
                  return (
                    <button
                      key={g.id}
                      id={`${baseId}-tab-${g.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={gridId}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(g.id)}
                      className={cn(
                        "relative isolate inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
                        isActive
                          ? "text-white"
                          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:text-slate-900 hover:shadow-md hover:shadow-slate-900/5 hover:ring-slate-300"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="projectsPill"
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full bg-slate-900 shadow-lg shadow-slate-900/20"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span>{g.label}</span>
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums transition-colors duration-300",
                          isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {counts[g.id] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p aria-live="polite" className="mt-4 text-center text-sm text-slate-500">
              Rodoma <span className="font-semibold tabular-nums text-slate-900">{shown.length}</span> iš {TOTAL}
              {!isAll && <span className="text-slate-400"> · {activeGroup.label}</span>}
            </p>
          </Reveal>

          {/* Grid */}
          <div
            id={gridId}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => {
                const featured = isAll && i === 0;
                return (
                  <motion.div
                    key={p.id}
                    layout="position"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px 0px" }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: EASE } }}
                    transition={{
                      layout: { duration: 0.45, ease: EASE },
                      opacity: { duration: 0.35, ease: EASE, delay: (i % 3) * 0.06 },
                      scale: { duration: 0.35, ease: EASE, delay: (i % 3) * 0.06 },
                      y: { duration: 0.35, ease: EASE, delay: (i % 3) * 0.06 },
                    }}
                    className={cn("h-full", featured && "lg:col-span-2")}
                  >
                    <ProjectCard project={p} featured={featured} beam={featured && i === 0} onOpen={openProject} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {hasMore && (
            <Reveal className="mt-10 flex justify-center">
              <Button
                variant="outline"
                color="slate"
                size="lg"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls={gridId}
              >
                {expanded ? "Rodyti mažiau" : `Rodyti visus projektus (${TOTAL})`}
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} aria-hidden="true" />
              </Button>
            </Reveal>
          )}

          {/* Brochure note */}
          <Reveal delay={0.1} className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
            <p className="max-w-xl text-sm text-slate-500">Išsamus objektų sąrašas ir techniniai rodikliai – įmonės brošiūroje.</p>
            <Button variant="outline" color="slate" href={company.brochure} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4 text-blue-600" aria-hidden="true" />
              Atsisiųsti brošiūrą (PDF)
            </Button>
          </Reveal>
        </Container>
      </Section>

      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={closeProject} />}</AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Card                                                                                           */
/* ---------------------------------------------------------------------------------------------- */

function ProjectCard({ project, featured = false, beam = false, onOpen }) {
  const { title, category, location, metric, image, stock } = project;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 transition duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-slate-50"
      )}
    >
      {/* Image */}
      <div className={cn("relative aspect-[3/2] w-full overflow-hidden bg-slate-100", featured && "lg:aspect-[2/1]")}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
        {/* Light sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out-expo group-hover:translate-x-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
          {metric}
        </span>
        {stock && (
          <span className="absolute bottom-3 right-3 rounded-md bg-slate-900/55 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur">
            {STOCK_LABEL}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{category}</p>
        <h3 className="mt-2 line-clamp-2 font-display text-lg font-medium leading-snug tracking-tight text-slate-900">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="inline text-left focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {title}
          </button>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          {location}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          Plačiau
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>

      {beam && <BorderBeam size={140} duration={10} />}
    </article>
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Modal                                                                                          */
/* ---------------------------------------------------------------------------------------------- */

function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef(null);
  const releaseRef = useRef(() => {});
  const images = project.gallery?.length ? project.gallery : [project.image];
  const hasGallery = images.length > 1;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const group = projectGroups.find((g) => g.id === project.group);

  const go = useCallback(
    (delta) => {
      setDir(delta);
      setIdx((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  // Lock body scroll (with scrollbar compensation) and move focus into the dialog.
  useEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
    releaseRef.current = release;
    const raf = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(raf);
      release();
    };
  }, []);

  // Esc closes, arrows browse the gallery, Tab stays inside the dialog.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (hasGallery && e.key === "ArrowRight") {
        go(1);
        return;
      }
      if (hasGallery && e.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement;
        if (e.shiftKey && (current === first || current === panelRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, go, hasGallery]);

  function onCtaClick() {
    releaseRef.current();
    onClose({ restoreFocus: false });
  }

  const navButton =
    "absolute top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg shadow-slate-900/20 backdrop-blur transition duration-300 ease-out-expo hover:scale-105 hover:bg-white active:scale-95";

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto overscroll-contain rounded-t-3xl bg-white shadow-2xl shadow-slate-900/30 outline-none sm:max-h-[88vh] sm:rounded-3xl lg:flex-row lg:overflow-hidden"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Uždaryti"
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur transition duration-300 ease-out-expo hover:scale-105 hover:bg-white hover:text-slate-900 active:scale-95"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Image / gallery */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 lg:aspect-auto lg:min-h-[30rem] lg:w-[55%]">
          <AnimatePresence initial={false}>
            <motion.img
              key={images[idx]}
              src={images[idx]}
              alt={hasGallery ? `${project.title} – nuotrauka ${idx + 1} iš ${images.length}` : project.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </AnimatePresence>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10" />

          {hasGallery && (
            <span className="absolute left-4 top-4 rounded-full bg-slate-900/60 px-2.5 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur">
              {idx + 1} / {images.length}
            </span>
          )}
          {project.stock && (
            <span className="absolute bottom-4 right-4 rounded-md bg-slate-900/55 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur">
              {STOCK_LABEL}
            </span>
          )}

          {hasGallery && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Ankstesnė nuotrauka" className={cn(navButton, "left-3")}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Kita nuotrauka" className={cn(navButton, "right-3")}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2" role="group" aria-label="Nuotraukų galerija">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setDir(i > idx ? 1 : -1);
                      setIdx(i);
                    }}
                    aria-label={`Nuotrauka ${i + 1} iš ${images.length}`}
                    aria-current={i === idx ? "true" : undefined}
                    className={cn(
                      "h-11 w-16 overflow-hidden rounded-lg ring-2 transition duration-300 ease-out-expo",
                      i === idx ? "opacity-100 ring-white" : "opacity-70 ring-white/40 hover:opacity-100 hover:ring-white/80"
                    )}
                  >
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 sm:p-8 lg:min-h-0 lg:overflow-y-auto lg:p-10">
          <p className="pr-10 text-xs font-semibold uppercase tracking-wider text-blue-600">{project.category}</p>
          <h2 id={titleId} className="mt-3 font-display text-2xl font-medium tracking-tight text-balance text-slate-900 sm:text-3xl">
            {project.title}
          </h2>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Projekto duomenys">
            <Chip icon={MapPin}>{project.location}</Chip>
            <Chip icon={Gauge} tone="blue">
              {project.metric}
            </Chip>
            {group && <Chip icon={Droplets}>{group.label}</Chip>}
          </ul>

          <p className="mt-6 text-base leading-relaxed text-pretty text-slate-600">{project.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-100 pt-6 lg:mt-auto">
            <Button color="blue" href="#kontaktai" onClick={onCtaClick}>
              Aptarti panašų projektą
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </Button>
            <p className="text-xs text-slate-500">{company.tagline}</p>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ---------------------------------------------------------------------------------------------- */
/* Small helpers                                                                                  */
/* ---------------------------------------------------------------------------------------------- */

function Chip({ icon: Icon, tone = "slate", children }) {
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        tone === "blue" ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-slate-50 text-slate-700 ring-slate-200"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {children}
    </li>
  );
}

/** Concentric „water ripple“ rings used as a background depth element. */
function Ripples() {
  return (
    <div className="relative h-[26rem] w-[26rem]">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="absolute rounded-full border border-blue-600/10" style={{ inset: `${i * 2.75}rem` }} />
      ))}
      <span className="absolute inset-[11rem] rounded-full bg-blue-600/[0.06] blur-xl" />
    </div>
  );
}
