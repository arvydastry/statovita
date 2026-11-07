# Statovita – svetainės atnaujinimo demo

Vieno puslapio demo UAB „Statovita“ (vandentvarka: tinklai, nuotekų valyklos, vandens gerinimas; įkurta 1997 m.) svetainei
www.statovita.lt. Dizainas – pagal Tailwind UI **Salient** šabloną, papildytas gyliu, hover efektais ir paralaksu.
Visas turinys paimtas iš esamos svetainės (LT/EN), nuotraukos – originalios iš statovita.lt ir Pexels.

**Live:** https://arvydastry.github.io/statovita/ (GitHub Pages, diegiama automatiškai po kiekvieno `push` į `main`).

## Paleidimas

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/`.

## Stekas

Vite 5 · React 18 · Tailwind CSS 3.4 (+ @tailwindcss/forms) · framer-motion 11 · lucide-react · Magic UI komponentai
(`number-ticker`, `marquee`, `dot-pattern`, `border-beam`, pritaikyti Tailwind v3 ir framer-motion).

## Struktūra

```
src/
├── App.jsx                 sekcijų tvarka
├── data/content.js         visas turinys (įmonė, paslaugos, 24 projektai, klientai, sertifikatai, karjera)
├── components/ui/          primityvai: Button, Container, Section, SectionHeading, Reveal, Parallax, TiltCard, Glow, Logo, Highlight + Magic UI
└── components/sections/    Header, Hero, Services, Experience, Projects, Clients, Management, Contact (CTA + forma), Careers, Footer
public/img/
├── projects/  originalios objektų nuotraukos (600×400) iš statovita.lt
├── clients/   klientų logotipai
├── certs/     ISO sertifikatai ir apdovanojimai
├── brand/     įmonės pastatas, originalus logotipas
├── pexels/    papildomos nuotraukos (credits.json)
└── original/  neapdoroti originalai iš svetainės
```

Dizaino taisyklės agentams ir žmonėms – `DESIGN.md`.

## Pexels nuotraukos (autoriai)

- `plant-aerial-trees.jpg` – Amine KM (https://www.pexels.com/photo/aerial-shot-of-sewage-treatment-plant-5712211/)
- `plant-aerial-poznan.jpg` – Marcin Jozwiak (https://www.pexels.com/photo/aerial-view-of-wastewater-treatment-plant-3808769/)
- `plant-aerial-bochum.jpg` – Jakob Schlothane (https://www.pexels.com/photo/aerial-view-of-sewage-industrial-facility-12634302/)
- `plant-pforzheim.jpg` – Joerg Hartmann (https://www.pexels.com/photo/view-of-a-pond-at-a-sewage-treatment-19888251/)
- `filtration-blue-tanks.jpg` – Peter Dyllong (https://www.pexels.com/photo/industrial-water-filtration-system-outdoors-36926327/)
- `tanks-blue-piping.jpg` – Alexey Demidov (https://www.pexels.com/photo/purifiers-at-a-water-treatment-plant-12726229/)
- `aeration-tanks-aerial.jpg` – Tom Fisk (https://www.pexels.com/photo/brown-and-blue-wooden-board-5131195/)
- `plant-circular-winter.jpg` – Stan Versluis (https://www.pexels.com/photo/round-tank-of-wastewater-treatment-20309517/)
- `drainage-pipe-trench.jpg` – D Goug (https://www.pexels.com/photo/drainage-pipe-installation-in-elk-grove-trench-37627673/)
- `urban-pipe-installation.jpg` – Sergei Starostin (https://www.pexels.com/photo/urban-pipework-construction-site-close-up-29274530/)
- `welder-trench.jpg` – Sergei Starostin (https://www.pexels.com/photo/welder-s-job-27354191/)
- `bore-team.jpg` – Miguel Castillo (https://www.pexels.com/photo/construction-workers-performing-underground-boring-29122401/)
- `concrete-pipes-stacked.jpg` – David Brown (https://www.pexels.com/photo/close-up-of-circular-pipes-17375718/)
- `yellow-pipes-install.jpg` – Jan  Zakelj (https://www.pexels.com/photo/a-person-holding-yellow-pipes-9389356/)
- `engineers-plans.jpg` – Anamul Rezwan (https://www.pexels.com/photo/two-man-holding-white-paper-1216589/)
- `engineer-blueprint.jpg` – Mikael Blomkvist (https://www.pexels.com/photo/man-in-blue-polo-shirt-and-blue-jumper-wearing-a-yellow-hardhat-8961006/)
- `trench-site-wide.jpg` – D Goug (https://www.pexels.com/photo/construction-site-with-trenches-and-pipes-in-suburban-area-37627672/)
- `circular-tank-drone.jpg` – abdo alshreef (https://www.pexels.com/photo/aerial-view-of-a-water-purification-facility-24802113/)
- `modern-wwtp-aerial.jpg` – Giant Asparagus (https://www.pexels.com/photo/aerial-view-of-a-wastewater-treatment-plant-35425762/)

## Pastabos

- Formos (užklausa, kandidato anketa) – demo, duomenys niekur nesiunčiami.
- Kėdainių tinklų projektui originalios nuotraukos svetainėje nėra – naudojama iliustracinė (pažymėta kortelėje).
- Klientų logotipai apkarpyti ir permatomi (`public/img/clients/*-trim.png`), dydis skaičiuojamas pagal vienodą vizualinį plotą (`src/components/ui/ClientLogo.jsx`). Originalai – `*.jpg` tame pačiame aplanke.
- Metų skaičius („nuo 1997 m.“) skaičiuojamas automatiškai pagal dabartinę datą.
