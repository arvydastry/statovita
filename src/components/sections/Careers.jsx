import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HardHat, ClipboardList, Truck, Users, Check, X, Mail, ArrowRight, MapPin, CalendarClock, Upload, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { Parallax, ParallaxImage } from "@/components/ui/Parallax.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { BorderBeam } from "@/components/ui/border-beam.jsx";
import { cn } from "@/lib/utils";
import { careers, company, FOUNDED, YEARS } from "@/data/content.js";

const EASE = [0.16, 1, 0.3, 1];
const POSITION_ICONS = [HardHat, ClipboardList, Truck, Users];
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const FILE_RE = /\.(doc|docx|odt|pdf|txt)$/i;
const INPUT =
  "form-input mt-2 block w-full rounded-xl border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Careers() {
  const [modal, setModal] = useState({ open: false, position: "" });
  const triggerRef = useRef(null);

  const openModal = useCallback((position = "", trigger) => {
    triggerRef.current = trigger ?? (typeof document !== "undefined" ? document.activeElement : null);
    setModal({ open: true, position });
  }, []);

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
    const el = triggerRef.current;
    if (el && typeof el.focus === "function") requestAnimationFrame(() => el.focus());
  }, []);

  return (
    <Section id="karjera" className="bg-slate-900 text-white">
      {/* Background depth layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-white mask-fade-b" />
      <Glow tone="white" className="opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <Parallax
        speed={0.4}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-0 hidden select-none md:block lg:right-10"
      >
        <span className="font-display text-[14rem] font-semibold leading-none tracking-tighter text-white/[0.04] lg:text-[18rem]">
          {FOUNDED}
        </span>
      </Parallax>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left: heading, positions, offer, actions */}
          <div className="lg:col-span-7">
            <SectionHeading align="left" tone="dark" eyebrow="Karjera" title={careers.title} text={careers.intro} />

            <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Siūlomos pareigos">
              {careers.positions.map((p, i) => (
                <PositionCard
                  key={p.title}
                  position={p}
                  icon={POSITION_ICONS[i % POSITION_ICONS.length]}
                  beam={i === 0}
                  onApply={openModal}
                />
              ))}
            </Stagger>

            <Reveal className="mt-12 border-t border-white/10 pt-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">Jums siūlome:</p>
              <Stagger as="ul" className="mt-5 space-y-3" stagger={0.06}>
                {careers.offer.map((item) => (
                  <StaggerItem key={item} as="li" y={12} className="flex items-start gap-3 text-base text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-inset ring-blue-400/30">
                      <Check className="h-3 w-3 text-blue-400" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
              <Button color="white" size="lg" onClick={(e) => openModal("", e.currentTarget)}>
                {careers.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="ghost"
                color="white"
                size="lg"
                href={`mailto:${company.email}?subject=${encodeURIComponent("CV – UAB Statovita")}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Siųsti CV el. paštu
              </Button>
            </Reveal>
          </div>

          {/* Right: layered photo column */}
          <div className="relative mt-16 lg:col-span-5 lg:mt-0 lg:pl-4 lg:pt-6">
            <Reveal delay={0.1} className="relative">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-blue-500/20 blur-3xl" />

              {/* Back photo – slower parallax, peeks behind the top-right corner */}
              <Parallax speed={0.4} className="absolute -right-3 -top-6 z-0 w-[42%] sm:-right-6 sm:-top-8 lg:-right-8">
                <div className="rotate-[5deg] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40">
                  <img
                    src="img/pexels/engineers-plans.jpg"
                    alt="Inžinieriai objekte aptaria projekto brėžinius"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover opacity-80"
                  />
                </div>
              </Parallax>

              {/* Main photo */}
              <Parallax speed={0.25} className="relative z-10">
                <ParallaxImage
                  src={careers.image}
                  alt="Darbuotojai prie gręžimo įrangos statybos aikštelėje"
                  className="aspect-[4/5] rounded-3xl ring-1 ring-white/10 shadow-2xl shadow-black/40 lg:aspect-[3/4]"
                  strength={0.12}
                  overlay="bg-gradient-to-t from-slate-900/70 via-transparent"
                >
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="inline-flex max-w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-md">
                      <MapPin className="h-5 w-5 shrink-0 text-blue-300" aria-hidden="true" />
                      <p className="text-sm leading-tight">
                        <span className="font-semibold text-white">Darbas visoje Lietuvoje</span>
                        <span className="hidden text-white/50 sm:inline"> · </span>
                        <span className="block text-slate-200 sm:inline">pagal gyvenamą vietą</span>
                      </p>
                    </div>
                  </div>
                </ParallaxImage>
              </Parallax>

              {/* Floating glass badge – moves against scroll */}
              <Parallax speed={-0.15} className="absolute -left-3 top-10 z-20 sm:-left-6 lg:-left-10">
                <div className="flex animate-float items-center gap-3 rounded-2xl bg-white/10 p-4 pr-5 shadow-2xl shadow-black/40 ring-1 ring-white/20 backdrop-blur-md">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/25 text-blue-200 ring-1 ring-inset ring-blue-400/30">
                    <CalendarClock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">Nuo {FOUNDED} m.</p>
                    <p className="font-display text-base font-medium tracking-tight text-white">
                      {YEARS} metų · profesionalų komanda
                    </p>
                  </div>
                </div>
              </Parallax>
            </Reveal>
          </div>
        </div>
      </Container>

      <ApplicationModal open={modal.open} initialPosition={modal.position} onClose={closeModal} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Position card                                                       */
/* ------------------------------------------------------------------ */

function PositionCard({ position, icon: Icon, beam, onApply }) {
  return (
    <StaggerItem as="li" className="relative">
      <div className="group relative h-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/30 hover:ring-white/20 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-900">
        {beam && <BorderBeam size={90} duration={8} colorFrom="#60a5fa" colorTo="#2563eb" />}
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 ring-1 ring-inset ring-blue-400/20 transition duration-300 ease-out-expo group-hover:scale-105 group-hover:bg-blue-500/30 group-hover:text-blue-200">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-medium tracking-tight text-white">{position.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{position.text}</p>
            <button
              type="button"
              onClick={(e) => onApply(position.title, e.currentTarget)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300/80 transition duration-300 after:absolute after:inset-0 after:rounded-2xl group-hover:text-blue-200 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Kandidatuoti
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

function ApplicationModal({ open, initialPosition, onClose }) {
  const reduce = useReducedMotion();
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open && <ModalPanel key="kandidato-anketa" initialPosition={initialPosition} onClose={onClose} reduce={reduce} />}
    </AnimatePresence>,
    document.body
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function ModalPanel({ initialPosition, onClose, reduce }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const fileId = `${uid}-cv`;
  const panelRef = useRef(null);
  const firstInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const successRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const [position, setPosition] = useState(initialPosition || "");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [sentName, setSentName] = useState("");

  // Body scroll lock, Esc, focus trap, initial focus
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const raf = requestAnimationFrame(() => firstInputRef.current?.focus());

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const list = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (!panelRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
          return;
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function resetFileInput() {
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function acceptFile(f) {
    if (!f) {
      setFile(null);
      setFileError("");
      return;
    }
    if (!FILE_RE.test(f.name)) {
      setFile(null);
      setFileError("Netinkamas formatas – galimi doc, docx, odt, pdf, txt.");
      resetFileInput();
      return;
    }
    if (f.size > MAX_FILE_BYTES) {
      setFile(null);
      setFileError("Failas per didelis – leidžiama iki 5 MB.");
      resetFileInput();
      return;
    }
    setFileError("");
    setFile(f);
  }

  function onFileChange(e) {
    acceptFile(e.target.files?.[0] ?? null);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (!dropped) return;
    if (fileInputRef.current) {
      try {
        fileInputRef.current.files = e.dataTransfer.files;
      } catch {
        /* older browsers: keep state-only file */
      }
    }
    acceptFile(dropped);
  }

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!file) {
      setFileError("Pridėkite CV failą.");
      fileInputRef.current?.focus();
      return;
    }
    if (fileError) {
      fileInputRef.current?.focus();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSentName(String(new FormData(form).get("name") || "").trim());
    setStatus("sending");
    timerRef.current = setTimeout(() => setStatus("sent"), 900);
  }

  const swap = { duration: reduce ? 0 : 0.35, ease: EASE };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.3 }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 text-slate-900 shadow-2xl shadow-slate-900/40 ring-1 ring-slate-900/5 sm:p-8"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Uždaryti"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition duration-300 hover:bg-slate-100 hover:text-slate-900 sm:right-5 sm:top-5"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={swap}
              onAnimationComplete={() => successRef.current?.focus()}
              className="py-6 text-center sm:py-10"
            >
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                {!reduce && <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-blue-600/25" />}
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
                  <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
                </span>
              </div>
              <h2
                id={titleId}
                ref={successRef}
                tabIndex={-1}
                className="mt-6 font-display text-2xl font-medium tracking-tight text-slate-900 outline-none sm:text-3xl"
              >
                Anketa išsiųsta
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Ačiū{sentName ? `, ${sentName}` : ""}! Jūsų anketą{position ? ` (${position})` : ""} gavome – susisieksime
                artimiausiu metu.
              </p>
              <p className="mt-6 text-xs text-slate-400">Demonstracinė versija – duomenys niekur nesiunčiami.</p>
              <Button color="blue" size="lg" onClick={onClose} className="mt-6">
                Uždaryti
              </Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={swap}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Karjera</p>
              <h2 id={titleId} className="mt-2 pr-10 font-display text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
                Kandidato anketa
              </h2>
              <p className="mt-2 text-sm text-slate-600">{careers.intro}</p>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <Field id={`${uid}-name`} label="Vardas ir pavardė" required>
                  <input
                    ref={firstInputRef}
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={INPUT}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id={`${uid}-email`} label="El. paštas" required>
                    <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className={INPUT} />
                  </Field>
                  <Field id={`${uid}-phone`} label="Telefonas" required>
                    <input id={`${uid}-phone`} name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={INPUT} />
                  </Field>
                </div>

                <Field id={`${uid}-position`} label="Pareigos">
                  <select
                    id={`${uid}-position`}
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className={cn(INPUT, "form-select pr-10")}
                  >
                    <option value="">Pasirinkite pareigas</option>
                    {careers.positions.map((p) => (
                      <option key={p.title} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <div>
                  <label htmlFor={fileId} className="block text-sm font-medium text-slate-700">
                    CV failas
                    <span className="ml-0.5 text-blue-600" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <div
                    className="relative mt-2"
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                  >
                    <input
                      ref={fileInputRef}
                      id={fileId}
                      name="cv"
                      type="file"
                      required={!file}
                      accept=".doc,.docx,.odt,.pdf,.txt"
                      onChange={onFileChange}
                      onInvalid={() => setFileError("Pridėkite CV failą.")}
                      aria-describedby={`${fileId}-hint`}
                      aria-invalid={fileError ? true : undefined}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={fileId}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed px-4 py-4 transition duration-300 ease-out-expo peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2",
                        dragging
                          ? "border-blue-500 bg-blue-50"
                          : file
                            ? "border-blue-300 bg-blue-50/60"
                            : fileError
                              ? "border-rose-300 bg-rose-50/50"
                              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
                      )}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-900/5">
                        {file ? <FileText className="h-5 w-5" aria-hidden="true" /> : <Upload className="h-5 w-5" aria-hidden="true" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        {file ? (
                          <>
                            <span className="block truncate text-sm font-semibold text-slate-900">{file.name}</span>
                            <span id={`${fileId}-hint`} className="mt-0.5 block text-xs text-slate-500">
                              {formatSize(file.size)} · spauskite, jei norite pakeisti
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="block text-sm font-semibold text-slate-900">
                              Pasirinkite failą <span className="font-normal text-slate-500">arba nutempkite čia</span>
                            </span>
                            <span id={`${fileId}-hint`} className="mt-0.5 block text-xs text-slate-500">
                              doc, docx, odt, pdf, txt iki 5 MB
                            </span>
                          </>
                        )}
                      </span>
                    </label>
                  </div>
                  {fileError && (
                    <p role="alert" className="mt-2 text-xs font-medium text-rose-600">
                      {fileError}
                    </p>
                  )}
                </div>

                <Field id={`${uid}-comment`} label="Komentaras">
                  <textarea id={`${uid}-comment`} name="comment" rows={3} className={cn(INPUT, "form-textarea resize-y")} />
                </Field>

                <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">
                    Laukai pažymėti <span className="text-blue-600">*</span> privalomi.
                  </p>
                  <Button type="submit" color="blue" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                    {status === "sending" ? "Siunčiama…" : "Siųsti anketą"}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-0.5 text-blue-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function formatSize(bytes) {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1).replace(".", ",")} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
