import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Building2, CalendarClock, Check, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { Parallax, ParallaxImage } from "@/components/ui/Parallax.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { cn } from "@/lib/utils";
import { company, cta, ctaImage, FOUNDED, YEARS } from "@/data/content.js";

const EASE = [0.16, 1, 0.3, 1];

/** „1 metai“, „29 metai“, „30 metų“, „11–19 metų“ (kaip Projects.jsx). */
function metai(n) {
  const last = n % 10;
  const tens = n % 100;
  return last === 0 || (tens >= 11 && tens <= 19) ? "metų" : "metai";
}

/* ------------------------------------------------------------------ */
/*  CTA (tarp Management ir Careers)                                   */
/* ------------------------------------------------------------------ */

function GlassChip({ icon: Icon, title, text, className }) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/10 py-3 pl-3 pr-5 text-left text-white shadow-2xl shadow-blue-900/40 ring-1 ring-inset ring-white/25 backdrop-blur-md transition duration-500 ease-out-expo hover:scale-[1.04] hover:bg-white/15",
        className
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg shadow-blue-900/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap font-display text-sm font-semibold tracking-tight">{title}</span>
        <span className="block whitespace-nowrap text-xs text-blue-100">{text}</span>
      </span>
    </div>
  );
}

export function CallToAction() {
  const experience = `${YEARS} ${metai(YEARS)} patirties`;
  const since = `Nuo ${FOUNDED} m.`;

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-blue-600 py-24 sm:py-32">
      {/* Fonas: paralakso nuotrauka + gradientas + tinklelis */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ParallaxImage
          src={ctaImage}
          alt=""
          strength={0.08}
          className="absolute inset-0 h-full w-full opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 via-blue-600/10 to-blue-700/80" />
        <div className="absolute inset-0 bg-grid-white mask-fade-b opacity-70" />
      </div>
      <Glow tone="white" />

      {/* Plūduriuojantys stikliniai „badge“ (tik plačiuose ekranuose) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <Parallax speed={0.35} className="absolute left-[4%] top-[22%] 2xl:left-[9%]">
          <Reveal delay={0.25} y={20}>
            <div className="rotate-[-4deg]">
              <div className="animate-float">
                <GlassChip icon={CalendarClock} title={since} text={experience} />
              </div>
            </div>
          </Reveal>
        </Parallax>
        <Parallax speed={-0.2} className="absolute bottom-[20%] right-[4%] 2xl:right-[9%]">
          <Reveal delay={0.4} y={20}>
            <div className="rotate-[3deg]">
              <div className="animate-float [animation-delay:-3s]">
                <GlassChip icon={ShieldCheck} title="ISO 9001 · 14001 · 45001" text="Integruota vadybos sistema" />
              </div>
            </div>
          </Reveal>
        </Parallax>
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-800/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/20 backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-200" />
              </span>
              Užklausa
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              id="cta-title"
              className="mt-6 font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-5xl"
            >
              {cta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed tracking-tight text-white text-pretty">{cta.text}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button color="white" size="lg" href="#kontaktai">
                {cta.button}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
              <Button variant="outline" color="white" size="lg" href={company.phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phone}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 text-sm text-blue-50">
              {company.hours}
              <span className="mx-2 text-blue-300/70" aria-hidden="true">
                ·
              </span>
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-white underline-offset-4 transition duration-300 hover:text-sky-200 hover:underline"
              >
                {company.email}
              </a>
            </p>
          </Reveal>

          {/* Mobiliems / siauresniems ekranams – tie patys akcentai eilute */}
          <Reveal delay={0.45}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-3 xl:hidden">
              {[
                { icon: CalendarClock, label: `${since} · ${experience}` },
                { icon: ShieldCheck, label: "ISO 9001 · 14001 · 45001" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-800/40 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/20 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 text-sky-200" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Kontaktai                                                           */
/* ------------------------------------------------------------------ */

const OBJECT_TYPES = [
  "Vandentiekio ir nuotekų tinklai",
  "Nuotekų valykla",
  "Vandens gerinimo įrenginiai",
  "Lietaus ar pramoninės nuotekos",
  "Kita",
];

const FIELD_BASE =
  "mt-2 block w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-blue-500";
const FIELD_ERROR = "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-red-500";

function fieldClass(kind, hasError) {
  return cn(kind, FIELD_BASE, hasError && FIELD_ERROR);
}

const EMPTY = { name: "", email: "", phone: "", type: "", message: "", consent: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Įrašykite vardą ir pavardę.";
  if (!v.email.trim()) e.email = "Įrašykite el. pašto adresą.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Patikrinkite el. pašto adresą.";
  if (!v.consent) e.consent = "Be sutikimo negalėsime atsakyti į užklausą.";
  return e;
}

function InfoCard({ icon: Icon, title, children, className }) {
  return (
    <StaggerItem
      as="li"
      className={cn(
        "group relative flex gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card-hover",
        className
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 transition duration-300 ease-out-expo group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/30">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-medium tracking-tight text-slate-900">{title}</h3>
        <div className="mt-1.5 space-y-1 text-sm text-slate-600">{children}</div>
      </div>
    </StaggerItem>
  );
}

function ContactLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      className="group/link inline-flex max-w-full items-center gap-2 font-medium text-slate-900 transition duration-300 hover:text-blue-600"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400 transition duration-300 group-hover/link:text-blue-600" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </a>
  );
}

function Field({ id, label, required, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <>
            <span className="ml-0.5 text-blue-600" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (privaloma)</span>
          </>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const reduce = useReducedMotion();
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    type: `${uid}-type`,
    message: `${uid}-message`,
    consent: `${uid}-consent`,
  };

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const fieldRefs = useRef({});
  // Callback ref: suveikia tik kai antraštė realiai sumontuojama (po formos exit animacijos, mode="wait").
  const focusSuccess = useCallback((el) => {
    if (el) el.focus({ preventScroll: true });
  }, []);

  function update(field) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setValues((v) => ({ ...v, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs).find((k) => errs[k]);
    if (first) {
      fieldRefs.current[first]?.focus();
      return;
    }
    // Demo: jokio tinklo – tik sėkmės būsena.
    setSent(true);
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setSent(false);
  }

  const describedBy = (field) => (errors[field] ? `${ids[field]}-error` : undefined);

  const swap = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12 },
    transition: { duration: reduce ? 0.2 : 0.5, ease: EASE },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          {...swap}
          aria-live="polite"
          className="flex min-h-[28rem] flex-col items-center justify-center text-center"
        >
          <div className="relative">
            {!reduce && (
              <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-blue-400/40" />
            )}
            <motion.span
              initial={reduce ? false : { scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-600/30 ring-8 ring-blue-50"
            >
              <Check className="h-9 w-9" strokeWidth={2.5} aria-hidden="true" />
            </motion.span>
          </div>
          <h3
            ref={focusSuccess}
            tabIndex={-1}
            className="mt-8 font-display text-2xl font-medium tracking-tight text-slate-900 outline-none sm:text-3xl"
          >
            Ačiū! Užklausa gauta.
          </h3>
          <p className="mt-3 max-w-sm text-lg tracking-tight text-slate-600">Susisieksime per vieną darbo dieną.</p>
          <Button variant="ghost" color="slate" className="mt-8" onClick={reset}>
            Siųsti dar vieną
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" aria-hidden="true" />
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          {...swap}
          noValidate
          onSubmit={onSubmit}
          // Po „Siųsti dar vieną“ fokusas grįžta į pirmą lauką (opacity === 1 – tik „animate“, ne „exit“;
          // pirmo užkrovimo metu AnimatePresence initial={false} animacijos nevykdo, tad callback nesuveikia).
          onAnimationComplete={(def) => {
            if (def?.opacity === 1) fieldRefs.current.name?.focus();
          }}
          className="grid gap-5 sm:grid-cols-2"
        >
          <Field id={ids.name} label="Vardas, pavardė" required error={errors.name}>
            <input
              ref={(el) => (fieldRefs.current.name = el)}
              id={ids.name}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={fieldClass("form-input", errors.name)}
              placeholder="Vardenis Pavardenis"
            />
          </Field>

          <Field id={ids.email} label="El. paštas" required error={errors.email}>
            <input
              ref={(el) => (fieldRefs.current.email = el)}
              id={ids.email}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={fieldClass("form-input", errors.email)}
              placeholder="vardas@imone.lt"
            />
          </Field>

          <Field id={ids.phone} label="Telefonas">
            <input
              id={ids.phone}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={update("phone")}
              className={fieldClass("form-input", false)}
              placeholder="+370"
            />
          </Field>

          <Field id={ids.type} label="Objekto tipas">
            <select
              id={ids.type}
              name="type"
              value={values.type}
              onChange={update("type")}
              className={cn(fieldClass("form-select", false), !values.type && "text-slate-400")}
            >
              <option value="">Pasirinkite</option>
              {OBJECT_TYPES.map((t) => (
                <option key={t} value={t} className="text-slate-900">
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field id={ids.message} label="Žinutė" className="sm:col-span-2">
            <textarea
              id={ids.message}
              name="message"
              rows={5}
              value={values.message}
              onChange={update("message")}
              className={cn(fieldClass("form-textarea", false), "resize-y")}
              placeholder="Objekto vieta, apimtis, planuojami terminai…"
            />
          </Field>

          <div className="sm:col-span-2">
            <label htmlFor={ids.consent} className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
              <input
                ref={(el) => (fieldRefs.current.consent = el)}
                id={ids.consent}
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={update("consent")}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy("consent")}
                className={cn(
                  "form-checkbox mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-blue-600 shadow-sm transition duration-300 focus:ring-blue-500",
                  errors.consent && "border-red-400"
                )}
              />
              <span>
                Sutinku, kad mano duomenys būtų naudojami užklausai atsakyti
                <span className="ml-0.5 text-blue-600" aria-hidden="true">
                  *
                </span>
                <span className="sr-only"> (privaloma)</span>
              </span>
            </label>
            {errors.consent && (
              <p id={`${ids.consent}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                {errors.consent}
              </p>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <Button color="blue" size="lg" type="submit">
              Siųsti užklausą
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" aria-hidden="true" />
            </Button>
            <p className="text-xs leading-relaxed text-slate-500">
              <span className="text-blue-600" aria-hidden="true">
                *
              </span>{" "}
              privalomi laukai. Arba skambinkite{" "}
              <a
                href={company.phoneHref}
                className="whitespace-nowrap font-semibold text-slate-700 underline-offset-4 transition duration-300 hover:text-blue-600 hover:underline"
              >
                {company.phone}
              </a>
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  return (
    <Section id="kontaktai" className="bg-white">
      <Glow className="opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-grid-slate [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative">
        <SectionHeading
          align="left"
          eyebrow="Kontaktai"
          title="Susisiekime"
          text="Parašykite apie planuojamą objektą – atsakysime per vieną darbo dieną."
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:items-start">
          {/* Kairė: kontaktų kortelės + rekvizitai */}
          <div className="lg:col-span-5">
            <Stagger as="ul" stagger={0.09} className="space-y-4">
              <InfoCard icon={MapPin} title="Adresas">
                <p className="text-slate-900">{company.address}</p>
              </InfoCard>

              <InfoCard icon={Building2} title="Administracija">
                <p>
                  <ContactLink href={company.phoneHref} icon={Phone}>
                    {company.phone}
                  </ContactLink>
                </p>
                <p>
                  <ContactLink href={`mailto:${company.email}`} icon={Mail}>
                    {company.email}
                  </ContactLink>
                </p>
              </InfoCard>

              <InfoCard icon={Phone} title="Tiekimo skyrius">
                <p>
                  <ContactLink href={company.supply.phoneHref} icon={Phone}>
                    {company.supply.phone}
                  </ContactLink>
                </p>
                <p>
                  <ContactLink href={`mailto:${company.supply.email}`} icon={Mail}>
                    {company.supply.email}
                  </ContactLink>
                </p>
              </InfoCard>

              <InfoCard icon={Clock} title="Darbo laikas">
                <p className="text-slate-900">{company.hours}</p>
              </InfoCard>

              {/* Rekvizitai – tamsi kortelė ritmui paįvairinti */}
              <StaggerItem
                as="li"
                className="group relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/20 ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-900/30"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-white opacity-40 mask-fade-b" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/30 blur-2xl transition duration-700 ease-out-expo group-hover:scale-150"
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Rekvizitai</p>
                      <h3 className="mt-2 font-display text-base font-medium tracking-tight text-white">{company.name}</h3>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-sky-200 ring-1 ring-inset ring-white/15">
                      <CalendarClock className="h-3 w-3" aria-hidden="true" />
                      nuo {FOUNDED} m.
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
                    <dt className="text-slate-400">Direktorius</dt>
                    <dd className="font-medium text-white">{company.director}</dd>
                    <dt className="text-slate-400">Įmonės kodas</dt>
                    <dd className="font-medium tabular-nums text-white">{company.code}</dd>
                    <dt className="text-slate-400">PVM kodas</dt>
                    <dd className="font-medium tabular-nums text-white">{company.vat}</dd>
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-inset ring-white/10">
                      <Award className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                      {company.licence}
                    </li>
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-inset ring-white/10">
                      <ShieldCheck className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                      {company.membership}
                    </li>
                  </ul>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Dešinė: forma */}
          <Reveal delay={0.15} className="relative lg:col-span-7">
            {/* Pasvirusi plokštė už kortelės – gylis */}
            <Parallax speed={-0.06} aria-hidden="true" className="pointer-events-none absolute -inset-1 hidden sm:block">
              <div className="h-full w-full rotate-[1.5deg] rounded-[1.75rem] bg-gradient-to-br from-blue-100 via-sky-50 to-blue-50 ring-1 ring-blue-100/80" />
            </Parallax>

            <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 sm:p-10">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />
              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight text-slate-900">Užklausa dėl objekto</h3>
                    <p className="mt-1 text-sm text-slate-500">Trumpai aprašykite objektą – pasiūlysime sprendimą.</p>
                  </div>
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100 sm:flex">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
