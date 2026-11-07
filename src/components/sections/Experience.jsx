import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Building2, Users, ShieldCheck, Wrench, MapPin, ArrowRight, Download } from "lucide-react";

import { Section } from "@/components/ui/Section.jsx";
import { Container } from "@/components/ui/Container.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { SectionHeading } from "@/components/ui/SectionHeading.jsx";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal.jsx";
import { Parallax, ParallaxImage } from "@/components/ui/Parallax.jsx";
import { TiltCard } from "@/components/ui/TiltCard.jsx";
import { Glow } from "@/components/ui/Glow.jsx";
import { NumberTicker } from "@/components/ui/number-ticker.jsx";
import { cn } from "@/lib/utils";
import { about, stats, timeline, company, projects, FOUNDED } from "@/data/content.js";

const PILLAR_ICONS = [Building2, Users, ShieldCheck, Wrench];

const backPhoto = projects.find((p) => p.id === "vilnius-aeracija") ?? {
  image: "img/projects/vilnius-aeracija.jpg",
  title: "Vilniaus m. nuotekų valyklos aeracinių sistemų remonto darbai",
};

const street = company.address.split(",")[0].trim();

/* ------------------------------------------------------------------ */
/* Part 1 – Apie mus                                                   */
/* ------------------------------------------------------------------ */

function PillarCard({ title, text, icon: Icon }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-900/5 transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-card">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition duration-300 ease-out-expo group-hover:scale-110 group-hover:shadow-blue-600/40">
        <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 font-display text-base font-medium tracking-tight text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function AboutColumn() {
  return (
    <div className="lg:col-span-6">
      <SectionHeading align="left" eyebrow="Apie mus" title={about.title} />

      <div className="mt-6">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.08 + i * 0.08} y={18}>
            <p
              className={cn(
                "mt-4 text-pretty",
                i === 0 ? "text-lg leading-relaxed tracking-tight text-slate-700" : "text-base leading-7 text-slate-600"
              )}
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.1}>
        {about.pillars.map((pillar, i) => (
          <StaggerItem key={pillar.title} className="h-full">
            <PillarCard title={pillar.title} text={pillar.text} icon={PILLAR_ICONS[i % PILLAR_ICONS.length]} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2} y={16} className="mt-10 flex flex-wrap items-center gap-3">
        <Button href={company.brochure} variant="outline" target="_blank" rel="noopener">
          <Download className="h-4 w-4 text-blue-600" aria-hidden="true" />
          Atsisiųsti brošiūrą (PDF)
        </Button>
        <Button href="#projektai" variant="ghost">
          Žiūrėti projektus
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" aria-hidden="true" />
        </Button>
      </Reveal>
    </div>
  );
}

function PhotoComposition() {
  return (
    <div className="relative mx-auto mt-14 w-full max-w-lg sm:mt-16 lg:col-span-6 lg:mt-0 lg:max-w-none lg:self-center">
      {/* Decorative blue halo behind the whole composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-100/70 via-sky-50/40 to-transparent blur-2xl"
      />

      {/* Back photo – slower parallax, tilted */}
      <Parallax speed={0.3} className="absolute -left-3 -top-8 z-0 w-[58%] sm:-left-6 sm:-top-10 lg:-left-10 lg:-top-12">
        <img
          src={backPhoto.image}
          alt={backPhoto.title}
          loading="lazy"
          width={600}
          height={400}
          className="aspect-[4/3] w-full -rotate-3 rounded-3xl object-cover shadow-xl shadow-slate-900/15 ring-1 ring-slate-900/10 transition duration-700 ease-out-expo hover:rotate-0 hover:scale-[1.03]"
        />
      </Parallax>

      {/* Main photo – tilt + inner parallax */}
      <div className="relative z-10 pl-6 pt-10 sm:pl-10 sm:pt-12 lg:pl-12 lg:pt-14">
        <TiltCard max={6} className="group rounded-3xl">
          <ParallaxImage
            src={about.image}
            alt="UAB „Statovita“ būstinė Vilniuje"
            className="aspect-[5/4] rounded-3xl shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10"
            strength={0.1}
            overlay="bg-gradient-to-t from-slate-900/35 via-slate-900/0 to-slate-900/0"
          />
        </TiltCard>
      </div>

      {/* Floating glass chip – address */}
      <div className="absolute right-2 top-1 z-20 animate-float sm:-right-3 sm:top-2 lg:-right-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-2 text-xs font-semibold tracking-tight text-slate-800 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/10 backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" strokeWidth={2} />
          Vilnius · {street}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Part 2 – Statistika                                                 */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <Reveal className="mt-24 sm:mt-32" y={36}>
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 sm:p-12">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-white mask-fade-b opacity-70" />
        <Glow tone="white" className="opacity-60" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-4 select-none font-display text-[9rem] font-semibold leading-none tracking-tighter text-white/[0.04] sm:-bottom-16 sm:text-[13rem]"
        >
          {FOUNDED}
        </span>

        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-6">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            <span className="h-px w-8 bg-blue-400" aria-hidden="true" />
            Patirtis skaičiais
          </p>
          <p className="text-xs text-slate-400">{company.licence}</p>
        </div>

        <ul className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-white/10">
          {stats.map((s, i) => (
            <li key={s.label} className={cn("sm:px-8", i === 0 && "sm:pl-0", i === stats.length - 1 && "sm:pr-0")}>
              <p className="flex flex-wrap items-baseline font-display font-medium tracking-tight">
                <NumberTicker value={s.value} decimalPlaces={s.decimals ?? 0} className="font-display text-4xl sm:text-5xl" />
                {s.suffix ? (
                  <span className={cn("text-xl text-blue-300 sm:text-2xl", s.suffix.startsWith(" ") && "ml-1.5")}>{s.suffix.trim()}</span>
                ) : null}
              </p>
              <p className="mt-2 text-sm text-slate-300">{s.label}</p>
              <p className="mt-1 text-xs text-slate-400">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Part 3 – Kelias (timeline)                                          */
/* ------------------------------------------------------------------ */

function TimelineDot({ progress, at, reduce, last }) {
  const scale = useTransform(progress, [at - 0.1, at], [0.4, 1]);
  const opacity = useTransform(progress, [at - 0.1, at], [0, 1]);
  return (
    <span className="relative block h-4 w-4 rounded-full bg-slate-200 ring-4 ring-slate-100">
      {last && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-blue-400/60 animate-pulse-ring" />}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-blue-600 ring-4 ring-blue-100"
        style={{ scale: reduce ? 1 : scale, opacity: reduce ? 1 : opacity }}
      />
    </span>
  );
}

function TimelineText({ item, className }) {
  return (
    <div className={className}>
      <p className="font-display text-lg font-semibold tracking-tight text-blue-600">{item.year}</p>
      <h3 className="mt-1 text-[15px] font-medium leading-snug text-slate-900 xl:text-base">{item.title}</h3>
      <p className="mt-2 text-[13px] leading-5 text-slate-600 xl:text-sm xl:leading-6">{item.text}</p>
    </div>
  );
}

function Timeline() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6, restDelta: 0.001 });
  const n = timeline.length;

  return (
    <div className="mt-24 sm:mt-32">
      <SectionHeading eyebrow="Kelias" title="Nuo pirmųjų objektų Vilniuje iki didžiausios šalies valyklos" />

      <div ref={ref} className="mt-16 sm:mt-20">
        {/* lg+ : horizontal track, items alternate above/below the line */}
        <div className="relative hidden lg:grid lg:grid-cols-6 lg:grid-rows-[auto_1rem_auto] lg:gap-x-6 xl:gap-x-8">
          {timeline.map((item, i) => {
            const above = i % 2 === 0;
            return (
              <Reveal
                key={item.year}
                delay={0.08 * i}
                y={above ? 20 : -20}
                className={cn("flex flex-col", above ? "row-start-1 justify-end" : "row-start-3 justify-start")}
                style={{ gridColumnStart: i + 1 }}
              >
                {above ? (
                  <>
                    <TimelineText item={item} />
                    <span aria-hidden="true" className="ml-[7px] mt-4 block h-8 w-0.5 rounded-full bg-slate-200" />
                  </>
                ) : (
                  <>
                    <span aria-hidden="true" className="mb-4 ml-[7px] block h-8 w-0.5 rounded-full bg-slate-200" />
                    <TimelineText item={item} />
                  </>
                )}
              </Reveal>
            );
          })}

          {/* the track */}
          <div
            aria-hidden="true"
            className="relative col-start-1 col-end-7 row-start-2 [mask-image:linear-gradient(to_right,black_88%,transparent)]"
          >
            <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-slate-200" />
            <motion.div
              className="absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-1/2 rounded-full bg-blue-600"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>

          {timeline.map((item, i) => (
            <div key={`dot-${item.year}`} className="relative z-10 row-start-2 flex items-center" style={{ gridColumnStart: i + 1 }}>
              <TimelineDot progress={progress} at={(i + 0.35) / n} reduce={reduce} last={i === n - 1} />
            </div>
          ))}
        </div>

        {/* < lg : vertical track on the left */}
        <div className="relative pl-9 sm:pl-12 lg:hidden">
          <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 rounded-full bg-slate-200" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-3 left-[7px] top-3 w-0.5 origin-top rounded-full bg-blue-600"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          <Stagger as="ol" className="space-y-10 sm:space-y-12" stagger={0.1}>
            {timeline.map((item, i) => (
              <StaggerItem as="li" key={item.year} className="relative">
                <div className="absolute -left-9 top-1 sm:-left-12">
                  <TimelineDot progress={progress} at={(i + 0.35) / n} reduce={reduce} last={i === n - 1} />
                </div>
                <TimelineText item={item} className="max-w-md" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Experience() {
  return (
    <Section id="patirtis" className="bg-white" aria-label="Apie mus ir patirtis">
      <div id="apie-mus" className="scroll-mt-24" />

      {/* background depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-grid-slate mask-fade-b opacity-60" />
      <Glow className="opacity-40" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <AboutColumn />
          <PhotoComposition />
        </div>

        <StatsBand />
        <Timeline />
      </Container>
    </Section>
  );
}
