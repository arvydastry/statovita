# Statovita demo – dizaino kontraktas

Vienos ilgos (one-page) svetainės demo UAB „Statovita“ (vandentvarka: tinklai, nuotekų valyklos, vandens gerinimas; įkurta 1997 m.).
Dizaino kalba: **Salient** (Tailwind UI šablonas) – balta drobė, `slate` tekstas, `blue-600` akcentas, Lexend antraštės, Inter tekstas,
pilnai apvalūs (`rounded-full`) mygtukai, kortelės su `rounded-2xl` + `shadow-xl shadow-slate-900/10` + `ring-1 ring-slate-900/5`.
Prie Salient pridedame **gylį** (sluoksniuoti šešėliai, 3D tilt, sklandūs hover), **paralaksą** (scroll-linked) ir **ilgos patirties akcentą** („nuo 1997 m.“).

## Stekas (griežtai)
- Vite + React 18 + **Tailwind CSS v3.4** (NE v4!). framer-motion v11, lucide-react. JSX, ne TSX.
- Tailwind v3 sintaksė: `bg-gradient-to-r` (ne `bg-linear-to-r`), `gap-[var(--x)]` (ne `gap-(--x)`), `shadow-sm` = mažas šešėlis, `ring-1` = 1px,
  `outline-none` (ne `outline-hidden`), `bg-blue-600/50` (opacity per slash), `[mask-image:...]` arbitrary properties. Jokių `@theme`, `size-*` yra OK (v3.4).
- Alias `@/` → `src/`. Pvz. `import { Button } from "@/components/ui/Button.jsx"`.
- Kiekviena sekcija – vienas failas `src/components/sections/<Name>.jsx`, eksportuojantis nurodytą named komponentą. Jokių kitų failų nekurti ir nekeisti
  (išskyrus savo sekcijos failą). Turinys – TIK iš `@/data/content.js`; nieko neišgalvoti (jokių atsiliepimų, skaičių, datų, kurių ten nėra).

## Turinys ir nuotraukos
- `src/data/content.js`: `company, nav, hero, heroImages, stats, services, about, timeline, projectGroups, projects, clients, management, careers, cta, ctaImage, servicesBackground, footer, YEARS, FOUNDED`.
- Originalios nuotraukos (600×400) `/img/projects/*.jpg`, klientų logotipai `/img/clients/*.jpg` (220×116, balti fonai – rodyti ant balto arba `mix-blend-multiply`),
  sertifikatai `/img/certs/iso-*.png` (776×1108 – vertikalūs skenai), apdovanojimai `/img/certs/*.jpg` (150×210), įmonės pastatas `/img/brand/statovita-darbai.jpg` (555×440).
- Pexels (1880px) `/img/pexels/*.jpg` – didelėms foninėms / hero nuotraukoms. Visada `alt` lietuviškai; dekoratyviniams – `alt=""`.
- Projekto kortelėse su `stock: true` rodyti mažą etiketę „Iliustracinė nuotrauka“.

## Primityvai (`src/components/ui/`)
- `Container` – `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- `Section({id, className})` – `relative overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-20`.
- `Button({variant: solid|outline|ghost, color: slate|blue|white, size: sm|md|lg, href})` – pill mygtukas, hover kyla 2px + šešėlis.
- `SectionHeading({eyebrow, title, text, align: center|left, tone: light|dark|blue})` – antraštė su mažu „eyebrow“ ir linijomis.
- `Reveal({delay, y, as})`, `Stagger({stagger})` + `StaggerItem` – pasirodymas scrollinant (vieną kartą). Naudoti visur, kur pasirodo turinys.
- `Parallax({speed})` – scroll'inant slenka elementą: teigiamas speed = greičiau už puslapį (priekinis planas), neigiamas = lėčiau / prieš scroll (fonas); 0.1–0.3 pakanka. `ParallaxImage({src, alt, className, strength, overlay})` – nuotrauka „plaukia“ kadre.
- `TiltCard({max, glare, className})` – 3D pakrypimas nuo pelės; naudoti 1–3 kortelėms sekcijoje, ne visoms.
- `Glow({tone: blue|white})` – išblurinti gradientų rutuliai fonui (vietoj Salient background-*.jpg). `Logo({tone: dark|light})`, `LogoMark`.
- `Highlight` – Salient ranka pieštas pabraukimas po žodžiu (hero).
- Magic UI (JSX, jau pritaikyti v3): `NumberTicker({value, decimalPlaces, className})` iš `@/components/ui/number-ticker.jsx`,
  `Marquee({pauseOnHover, reverse, className})` iš `marquee.jsx`, `DotPattern({className, glow})` iš `dot-pattern.jsx` (vienas SVG `<pattern>`, ne tūkstančiai apskritimų), `BorderBeam({size, duration, colorFrom, colorTo})` iš `border-beam.jsx`.
- Ikonos: `lucide-react` (`Droplets, Waves, Factory, Recycle, ShieldCheck, Award, Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown, X, Menu, Check, Building2, HardHat, Wrench, Users, CalendarClock`).

## Vizualinės taisyklės
- **Ritmas**: sekcijos `py-20 sm:py-28 lg:py-32`; vidiniai tarpai `mt-16 sm:mt-20` iki turinio po antrašte; grid `gap-6 lg:gap-8`.
- **Tipografika**: h1 `font-display text-5xl sm:text-7xl font-medium tracking-tight text-slate-900`; h2 per `SectionHeading`; h3 `font-display text-xl font-medium`;
  tekstas `text-lg tracking-tight text-slate-700` (lead) / `text-sm text-slate-600`. Lietuviškos kabutės „…“.
- **Fonų seka** (App.jsx): Hero balta → Services `bg-blue-600` → Experience balta → Projects `bg-slate-50` → Clients balta → Management `bg-slate-50`/balta su DotPattern → CTA `bg-blue-600` → Careers `bg-slate-900` → Contact balta → Footer `bg-slate-50`.
- **Kortelės**: `rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5` + hover `hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/15 transition duration-300`.
  Tamsiose sekcijose: `bg-white/5 ring-1 ring-white/10 backdrop-blur` + hover `hover:bg-white/10`.
- **Nuotraukos**: `rounded-2xl` arba `rounded-3xl`, `shadow-2xl shadow-blue-900/20 ring-1 ring-slate-900/10`; hover `group-hover:scale-105` su `duration-700 ease-out-expo`; sluoksniuoti 2–3 nuotraukas su `rotate-[-3deg]`/`translate`.
- **Gylis**: fonui – `Glow` + `bg-grid-slate`/`bg-grid-white` (maskuotas su `mask-fade-b`), priekiui – plūduriuojantys „badge“ (`animate-float`) ir `Parallax` skirtingais greičiais.
- **Akcentas „nuo 1997 m.“**: hero eyebrow, didelis `NumberTicker` su `YEARS` Experience sekcijoje, timeline, footer.
- **Mobile first**: tikrinti 375px – jokio horizontalaus overflow (absoliutūs dekorai – tik `Section` viduje su `overflow-hidden`), grid'ai `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- **Prieinamumas**: semantika (`nav`, `main`, `section` su `aria-labelledby` arba h2), fokusas matomas (globaliai jau yra), mygtukai – `button`/`a`, modalai uždaromi `Esc`, `aria-label` ikoniniams mygtukams. `useReducedMotion` jau integruotas primityvuose; savo animacijoms – gerbti.
- **Hover** visur, kur spaudžiama: nuorodos `hover:text-blue-600`, kortelės kyla, nuotraukos zoom, mygtukai kyla. Perėjimai `transition duration-300`.
- Nenaudoti: emoji, Lorem ipsum, išgalvotų atsiliepimų, `alert()`, išorinių skriptų, inline `<style>`.

## Būsena
Visos sekcijos įgyvendintos ir peržiūrėtos (a11y, Tailwind v3, LT kalba, dizaino koherencija). Projektų sekcija rodo 8 korteles su „Rodyti visus“ mygtuku; „nuo 1997 m.“ akcentas – hero, statistikos juosta, kelias (timeline), CTA ir footer.

## Patikra prieš baigiant
`npx esbuild src/components/sections/<Name>.jsx --loader:.jsx=jsx --log-level=error >/dev/null` (sintaksė). Visi importai turi egzistuoti (`ls src/components/ui`).
