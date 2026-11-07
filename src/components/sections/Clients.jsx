import { useReducedMotion } from "framer-motion";
import { Award, ShieldCheck, CalendarClock } from "lucide-react";
import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { Marquee } from "@/components/ui/marquee.jsx";
import { ClientLogo } from "@/components/ui/ClientLogo.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { Parallax } from "@/components/ui/Parallax.jsx";
import { TiltCard } from "@/components/ui/TiltCard.jsx";
import { cn } from "@/lib/utils";
import { clients, company, stats, FOUNDED, YEARS } from "@/data/content.js";

/* ------------------------------------------------------------------ */
/* Pagalbinės                                                          */
/* ------------------------------------------------------------------ */

/** Neleidžia laužyti skaičių grupių ir vienetų („280 000 m³/d“, „41,4 km“, „2017 m.“). */
function tight(text) {
  return text
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1 ")
    .replace(/(\d) (m³|m²|km|l\/s|m\.)/g, "$1 $2");
}

const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Logotipų plytelė (marquee)                                          */
/* ------------------------------------------------------------------ */

function LogoTile({ client, decorative = false }) {
  return (
    <div className="group/tile flex h-24 w-64 items-center justify-center rounded-2xl bg-white px-6 shadow-sm ring-1 ring-slate-200 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card hover:ring-slate-300 sm:h-28 sm:w-72">
      <ClientLogo
        client={client}
        alt={decorative ? "" : `${client.name} logotipas`}
        area={7000}
        maxHeight={72}
        className="opacity-90 grayscale brightness-75 transition duration-500 ease-out-expo group-hover/tile:opacity-100 group-hover/tile:grayscale-0 group-hover/tile:brightness-100"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kliento kortelė                                                     */
/* ------------------------------------------------------------------ */

function ClientCard({ client, index, wide = false, featured = false }) {
  const reduce = useReducedMotion();
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15 sm:p-7",
        wide && "xl:flex-row xl:items-start xl:gap-10"
      )}
    >
      {/* Mėlyna akcento juosta – auga užvedus */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-0 top-6 w-1 origin-top scale-y-[0.3] rounded-r-full bg-blue-600 transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
      />

      {featured && (
        <>
          {/* Švelnus mėlynas švytėjimas kampe */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl transition-colors duration-700 group-hover:bg-blue-200/80"
          />
          {/* Šviesos blyksnis, perbėgantis per kortelę užvedus */}
          {!reduce && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-1000 ease-out-expo group-hover:translate-x-[400%]"
            />
          )}
          {/* Plona gradientinė linija viršuje */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          />
        </>
      )}

      {/* Eilės numeris */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 font-display text-xs font-medium tabular-nums tracking-[0.2em] text-slate-300 transition-colors duration-300 group-hover:text-blue-600"
      >
        {pad(index + 1)}
      </span>

      <div className={cn("relative", wide && "xl:w-56 xl:shrink-0")}>
        <div className="flex h-20 items-center">
          <ClientLogo
            client={client}
            area={wide ? 6400 : 5600}
            maxHeight={wide ? 76 : 68}
            className="object-left grayscale brightness-75 transition duration-500 ease-out-expo group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
            style={{ transformOrigin: "left center" }}
          />
        </div>
        <h3 className="mt-5 font-display text-base font-medium tracking-tight text-slate-900">{client.name}</h3>
      </div>

      <p className={cn("relative mt-2 text-sm leading-relaxed text-pretty text-slate-600", wide && "xl:mt-0 xl:pr-10 xl:pt-1.5")}>
        {tight(client.work)}
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Pasitikėjimo ženklelis                                              */
/* ------------------------------------------------------------------ */

function TrustBadge({ icon: Icon, label, value }) {
  return (
    <div className="group relative flex items-center gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-card hover:ring-slate-900/10">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-blue-600/40"
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">{label}</p>
        <p className="mt-1 font-display text-base font-medium tracking-tight text-slate-900 text-pretty">{value}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sekcija                                                             */
/* ------------------------------------------------------------------ */

const spans = [
  "sm:col-span-2 lg:col-span-3 [&>div]:h-full", // Vilniaus vandenys – plati, su 3D tilt
  "lg:col-span-3", // Ukmergės vandenys – plati
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function Clients() {
  const years = stats[0];

  return (
    <Section id="klientai" className="bg-white">
      {/* Gylis: švytėjimas (lėtas paralaksas) + inžinerinis tinklelis viršuje */}
      <Parallax speed={0.25} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Glow className="opacity-60" />
      </Parallax>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-grid-slate opacity-70 mask-fade-b" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Klientai"
          title="Partneriai, su kuriais dirbame metų metus"
          text="Vandentvarkos įmonės, kurioms projektavome, statėme ir rekonstravome tinklus, valyklas ir įrenginius."
        />
      </Container>

      {/* Logotipų juosta – per visą plotį, viena slenkanti eilė (dekoratyvi: tie patys logotipai ir pavadinimai yra kortelėse žemiau) */}
      <div className="relative mt-12 sm:mt-16">
        <Reveal aria-hidden="true">
          <Parallax speed={0.1}>
            <Marquee pauseOnHover className="[--duration:35s] [--gap:1.5rem] mask-fade-x">
              {clients.map((client) => (
                <LogoTile key={client.name} client={client} decorative />
              ))}
            </Marquee>
          </Parallax>
        </Reveal>

      </div>

      <Container className="relative">
        {/* Klientų kortelės – bento: dvi plačios viršuje, trys apačioje */}
        <div className="relative mt-14 sm:mt-20">
          <Stagger as="ul" stagger={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
            {clients.map((client, i) => (
              <StaggerItem key={client.name} as="li" className={spans[i] ?? "lg:col-span-2"}>
                {i === 0 ? (
                  <TiltCard max={5} className="group h-full rounded-2xl">
                    <ClientCard client={client} index={i} wide featured />
                  </TiltCard>
                ) : (
                  <ClientCard client={client} index={i} wide={i === 1} />
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Pasitikėjimo juosta */}
        <Reveal className="relative mt-14 sm:mt-20">
          <Parallax speed={0.2} className="pointer-events-none absolute -top-20 right-0 select-none sm:-top-28" aria-hidden="true">
            <span className="font-display text-[7rem] font-semibold leading-none tracking-tighter text-slate-900/[0.035] sm:text-[11rem]">
              {FOUNDED}
            </span>
          </Parallax>

          <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TrustBadge icon={Award} label="Narystė" value={company.membership} />
            <TrustBadge icon={ShieldCheck} label="Kvalifikacija" value={company.licence} />
          </div>

          <p className="relative mt-8 flex items-center justify-center gap-4 text-center text-sm text-slate-500">
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-r from-transparent to-slate-300 sm:block" />
            <span className="inline-flex items-center gap-2">
              <CalendarClock className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
              <span>
                Dirbame nuo <span className="font-display font-medium text-slate-900">{FOUNDED} m.</span>
                <span className="text-slate-400"> · </span>
                <span className="whitespace-nowrap">
                  <span className="font-display font-medium text-slate-900">{YEARS}</span> {years.label}
                </span>
              </span>
            </span>
            <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-l from-transparent to-slate-300 sm:block" />
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
