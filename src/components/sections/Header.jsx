import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Logo } from "@/components/ui/Logo.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { company, nav, hero } from "@/data/content.js";

const EASE = [0.16, 1, 0.3, 1]; // ease-out-expo
const STRIP_HEIGHT = 36; // slim top strip (lg+), collapses to 0 once scrolled
const SCROLL_LOCK_MS = 1200; // ignore observer noise while smooth-scrolling to a clicked link
const LG_QUERY = "(min-width: 1024px)";

/**
 * Which nav section currently sits in the viewport "reading band" (IntersectionObserver).
 * Returns [activeId, select]. `select(id)` jumps the indicator immediately on click.
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const visibleRef = useRef(new Map());
  const lockRef = useRef(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;

    const compute = () => {
      const current = ids.find((id) => visibleRef.current.get(id));
      setActive(current ?? null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibleRef.current.set(entry.target.id, entry.isIntersecting));
        if (Date.now() < lockRef.current) return;
        compute();
      },
      // a 10%-tall band just above the middle of the viewport decides the active section
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((el) => observer.observe(el));

    const onScrollEnd = () => {
      if (!lockRef.current) return;
      lockRef.current = 0;
      compute();
    };
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [ids]);

  const select = (id) => {
    setActive(id);
    lockRef.current = Date.now() + SCROLL_LOCK_MS;
  };

  return [active, select];
}

/** Visual-only language indicator (no handler, so not rendered as controls): LT active, EN placeholder. */
function LangSwitch({ className }) {
  return (
    <div
      role="group"
      aria-label="Kalba"
      className={cn(
        "inline-flex items-center rounded-full bg-slate-100 p-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-slate-900/5",
        className
      )}
    >
      <span
        aria-current="true"
        className="rounded-full bg-white px-2.5 py-1 text-slate-900 shadow-sm ring-1 ring-slate-900/5"
      >
        LT
      </span>
      <span className="rounded-full px-2.5 py-1 text-slate-600">EN</span>
    </div>
  );
}

export function Header() {
  const reduce = useReducedMotion();
  const ids = useMemo(() => nav.map((item) => item.href.replace(/^#/, "")), []);
  const [active, selectSection] = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Scroll state (transparent over the hero → frosted bar) + scroll progress hairline
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 8));
  useEffect(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  const solid = scrolled || open;

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  // Mobile sheet: lock body scroll, close on Esc, keep Tab cycling inside the header
  // (sheet links -> bar logo/phone/X -> back), move focus inside
  useEffect(() => {
    if (!open) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
      ).filter((node) => node.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      const inside = headerRef.current.contains(current);
      if (event.shiftKey && (current === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const frame = window.requestAnimationFrame(() => firstLinkRef.current?.focus({ preventScroll: true }));
    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Close the sheet if the viewport grows past the desktop breakpoint
  useEffect(() => {
    const media = window.matchMedia(LG_QUERY);
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    selectSection(null);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const onNavClick = (id) => {
    selectSection(id);
    if (open) close();
  };

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: reduce ? 0 : 0.1 } },
  };
  const itemVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.1 : 0.5, ease: EASE } },
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* ---------- Mobile sheet (rendered under the bar so the X button stays reachable) ---------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              className="fixed inset-0 z-0 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              role="dialog"
              aria-label="Meniu"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: reduce ? 0.15 : 0.55, ease: EASE }}
              className="fixed inset-x-0 top-0 z-0 pt-20 lg:hidden"
            >
              <div className="relative max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden rounded-b-3xl bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/5">
                <Glow className="opacity-40" />
                <div aria-hidden="true" className="absolute inset-0 bg-grid-slate mask-fade-b opacity-70" />

                <Container className="relative pb-6 pt-3">
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                    {hero.eyebrow}
                  </p>

                  <motion.ul variants={listVariants} initial="hidden" animate="show" className="mt-2 divide-y divide-slate-900/5">
                    {nav.map((item, index) => {
                      const id = item.href.replace(/^#/, "");
                      const isActive = active === id;
                      return (
                        <motion.li key={item.href} variants={itemVariants}>
                          <a
                            ref={index === 0 ? firstLinkRef : undefined}
                            href={item.href}
                            onClick={() => onNavClick(id)}
                            aria-current={isActive ? "true" : undefined}
                            className={cn(
                              "group -mx-2 flex items-center justify-between rounded-xl px-2 py-3.5 font-display text-lg font-medium tracking-tight transition-colors duration-300",
                              isActive ? "text-blue-700" : "text-slate-900 hover:text-blue-600"
                            )}
                          >
                            <span className="flex items-center gap-4">
                              <span
                                className={cn(
                                  "w-6 text-xs font-semibold tabular-nums transition-colors duration-300",
                                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
                                )}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              {item.label}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className={cn(
                                "h-5 w-5 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-blue-600",
                                isActive ? "text-blue-600" : "text-slate-300"
                              )}
                            />
                          </a>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0.1 : 0.5, delay: reduce ? 0 : 0.42, ease: EASE }}
                    className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    <a
                      href={company.phoneHref}
                      className="group flex items-center gap-3 rounded-2xl bg-white/80 p-3 ring-1 ring-slate-900/5 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">Telefonas</span>
                        <span className="block truncate text-sm font-semibold tabular-nums text-slate-900">{company.phone}</span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${company.email}`}
                      className="group flex items-center gap-3 rounded-2xl bg-white/80 p-3 ring-1 ring-slate-900/5 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">El. paštas</span>
                        <span className="block truncate text-sm font-semibold text-slate-900">{company.email}</span>
                      </span>
                    </a>
                  </motion.div>

                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0.1 : 0.5, delay: reduce ? 0 : 0.5, ease: EASE }}
                    className="mt-4 flex items-center gap-3"
                  >
                    <Button color="blue" size="lg" href={hero.secondary.href} onClick={close} className="flex-1">
                      {hero.secondary.label}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                    </Button>
                    <LangSwitch />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduce ? 0.1 : 0.5, delay: reduce ? 0 : 0.58 }}
                    className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      {company.hours}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      {company.address}
                    </span>
                  </motion.p>
                </Container>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Top strip + main bar ---------- */}
      <div className="relative z-10">
        {/* Slim info strip – lg+ only, collapses once scrolled */}
        <motion.div
          initial={false}
          animate={{
            height: scrolled ? 0 : STRIP_HEIGHT,
            opacity: scrolled ? 0 : 1,
            visibility: scrolled ? "hidden" : "visible",
          }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          className="hidden overflow-hidden bg-white/40 shadow-[inset_0_-1px_0_0_rgb(15_23_42_/_0.06)] lg:block"
        >
          <Container className="flex h-9 items-center justify-between text-xs text-slate-500">
            <p className="flex items-center gap-2.5 font-medium text-slate-600">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              {company.tagline}
            </p>
            <ul className="flex items-center divide-x divide-slate-200">
              <li className="flex items-center gap-1.5 pr-4">
                <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                {company.hours}
              </li>
              <li className="px-4">
                <a href={company.phoneHref} className="flex items-center gap-1.5 tabular-nums transition-colors duration-300 hover:text-blue-600">
                  <Phone className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  {company.phone}
                </a>
              </li>
              <li className="px-4">
                <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 transition-colors duration-300 hover:text-blue-600">
                  <Mail className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="hidden items-center gap-1.5 pl-4 xl:flex">
                <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                {company.address}
              </li>
            </ul>
          </Container>
        </motion.div>

        {/* Main bar – always 80px so Section's scroll-mt-20 lines up */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-out-expo",
            solid
              ? "bg-white/80 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur-md"
              : "bg-transparent shadow-sm shadow-transparent ring-1 ring-transparent"
          )}
        >
          <Container className="flex h-20 items-center justify-between gap-x-4 xl:gap-x-6">
            {/* Left: logo */}
            <a
              href="#"
              onClick={scrollToTop}
              aria-label="Statovita – į pradžią"
              className="group inline-flex shrink-0 items-center rounded-lg"
            >
              <Logo markClassName="transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110" />
            </a>

            {/* Center: desktop nav with a sliding active pill */}
            <nav aria-label="Pagrindinė navigacija" className="hidden lg:block">
              <LayoutGroup id="header-nav">
                <ul className="flex items-center gap-x-1">
                  {nav.map((item) => {
                    const id = item.href.replace(/^#/, "");
                    const isActive = active === id;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => onNavClick(id)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "relative inline-block whitespace-nowrap rounded-lg px-2 py-1.5 text-sm transition-colors duration-300",
                            isActive ? "text-blue-700" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="header-nav-pill"
                              aria-hidden="true"
                              style={{ borderRadius: 8 }}
                              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                              className="absolute inset-0 bg-blue-50 ring-1 ring-blue-600/10"
                            />
                          )}
                          <span className="relative z-10">{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </LayoutGroup>
            </nav>

            {/* Right: phone, language, CTA, hamburger */}
            <div className="flex shrink-0 items-center gap-x-3">
              <a
                href={company.phoneHref}
                aria-label={`Skambinti ${company.phone}`}
                className="group inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-slate-700 transition-colors duration-300 hover:text-blue-600"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-900/5 transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:shadow-md group-hover:shadow-blue-600/15">
                  <Phone className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:rotate-12" aria-hidden="true" />
                </span>
                <span className="hidden tabular-nums xl:inline">{company.phone}</span>
              </a>

              <LangSwitch className="hidden xl:inline-flex" />

              <Button color="blue" href={hero.secondary.href} className="hidden whitespace-nowrap lg:inline-flex">
                {hero.secondary.label}
                <ArrowRight className="hidden h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 xl:block" aria-hidden="true" />
              </Button>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 lg:hidden"
              >
                <Menu
                  aria-hidden="true"
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-out-expo",
                    open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                  )}
                />
                <X
                  aria-hidden="true"
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-out-expo",
                    open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                  )}
                />
              </button>
            </div>
          </Container>

          {/* Scroll progress hairline – visible once scrolled */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 transition-opacity duration-500",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </header>
  );
}
