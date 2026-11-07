import { useReducedMotion } from "framer-motion";
import { ArrowUp, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container.jsx";
import { Logo } from "@/components/ui/Logo.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { Parallax } from "@/components/ui/Parallax.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { company, nav, footer, management, FOUNDED, YEARS } from "@/data/content.js";

const MANAGEMENT_HREF = nav.find((item) => item.href.includes("vadybos"))?.href ?? "#vadybos-sistema";

/** Column title: small caps, slate-900 (Salient footer rhythm). */
function ColumnHeading({ children }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{children}</h3>;
}

/** Text link with a 1px underline that grows from the left on hover. */
function FooterLink({ href, className, children, ...rest }) {
  return (
    <a
      href={href}
      className={cn(
        "group/link relative inline-block text-sm text-slate-600 transition-colors duration-300 hover:text-blue-600",
        className
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-blue-600 transition-transform duration-500 ease-out-expo group-hover/link:scale-x-100"
      />
    </a>
  );
}

/** Contact row: round icon chip + text. Becomes a link (with lifted, filled chip on hover) when `href` is given. */
function ContactRow({ icon: Icon, href, children, className }) {
  const chip = cn(
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-slate-200",
    href &&
      "transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-600/25 group-hover:ring-blue-600"
  );
  const inner = (
    <>
      <span className={chip}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="min-w-0 pt-1.5 text-sm leading-5 text-slate-600 transition-colors duration-300 group-hover:text-blue-600">
        {children}
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cn("group flex items-start gap-3", className)}>
        {inner}
      </a>
    );
  }
  return <div className={cn("flex items-start gap-3", className)}>{inner}</div>;
}

export function Footer() {
  const reduce = useReducedMotion();

  const scrollToTop = (event) => {
    event?.preventDefault?.();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50">
      <h2 className="sr-only">Informacija apie įmonę ir kontaktai</h2>

      {/* ---------- Depth layers (all decorative, clipped by overflow-hidden) ---------- */}
      <Glow className="opacity-30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid-slate mask-fade-b opacity-70" />
      {/* „1997“ watermark drifting slower than the page – the long-experience accent */}
      <Parallax
        speed={0.2}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-0 select-none sm:-bottom-10 lg:right-6"
      >
        <span className="block font-display text-[8.5rem] font-semibold leading-none tracking-tighter text-slate-900/[0.03] [-webkit-text-stroke:1px_rgb(15_23_42_/_0.07)] sm:text-[12rem] lg:text-[16rem]">
          {FOUNDED}
        </span>
      </Parallax>

      <Container className="relative">
        {/* ---------- Top area ---------- */}
        <Stagger stagger={0.1} className="grid grid-cols-1 gap-10 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <StaggerItem className="lg:col-span-4">
            <a href="#" onClick={scrollToTop} aria-label="Statovita – į pradžią" className="group inline-flex rounded-lg">
              <Logo markClassName="transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">{company.tagline}</p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Nuo {FOUNDED} m. · {YEARS} metai patirties
            </p>

            <ul aria-label="Sertifikatai" className="mt-4 flex flex-wrap items-center gap-2">
              {management.certificates.map((cert) => (
                <li key={cert.id}>
                  <a
                    href={MANAGEMENT_HREF}
                    title={`${cert.title} – ${cert.subtitle}`}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-blue-600 hover:shadow-sm hover:ring-blue-300"
                  >
                    <ShieldCheck className="h-3 w-3 text-blue-600" aria-hidden="true" />
                    ISO {cert.id}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Navigation */}
          <StaggerItem as="nav" aria-label="Poraštės navigacija" className="lg:col-span-2">
            <ColumnHeading>Navigacija</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contacts */}
          <StaggerItem className="lg:col-span-3">
            <ColumnHeading>Kontaktai</ColumnHeading>
            <address className="mt-4 not-italic">
              <ul className="space-y-3">
                <li>
                  <ContactRow icon={MapPin}>{company.address}</ContactRow>
                </li>
                <li>
                  <ContactRow icon={Phone} href={company.phoneHref} className="tabular-nums">
                    {company.phone}
                  </ContactRow>
                </li>
                <li>
                  <ContactRow icon={Mail} href={`mailto:${company.email}`}>
                    {company.email}
                  </ContactRow>
                </li>
                <li>
                  <ContactRow icon={Clock}>{company.hours}</ContactRow>
                </li>
              </ul>
            </address>
          </StaggerItem>

          {/* Company details */}
          <StaggerItem className="lg:col-span-3">
            <ColumnHeading>Rekvizitai</ColumnHeading>
            <p className="mt-4 font-display text-sm font-medium tracking-tight text-slate-900">{company.name}</p>
            <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 text-sm text-slate-600">
              <dt className="text-slate-500">Direktorius</dt>
              <dd className="text-slate-700">{company.director}</dd>

              <dt className="text-slate-500">Įmonės kodas</dt>
              <dd className="tabular-nums text-slate-700">{company.code}</dd>

              <dt className="text-slate-500">PVM kodas</dt>
              <dd className="tabular-nums text-slate-700">{company.vat}</dd>

              <dt className="text-slate-500">Tiekimo skyrius</dt>
              <dd className="flex flex-col items-start gap-1">
                <FooterLink href={company.supply.phoneHref} className="tabular-nums">
                  {company.supply.phone}
                </FooterLink>
                <FooterLink href={`mailto:${company.supply.email}`}>{company.supply.email}</FooterLink>
              </dd>
            </dl>
          </StaggerItem>
        </Stagger>

        {/* ---------- Bottom bar ---------- */}
        <Reveal
          y={12}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 sm:flex-row"
        >
          <p className="text-xs text-slate-500">{footer.copyright}</p>

          <p className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Nuotraukos: {company.name}, Pexels</span>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-600/10">
              Demo versija
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Į viršų"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 hover:ring-blue-600 active:translate-y-0 active:scale-95"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </Reveal>
      </Container>
    </footer>
  );
}
