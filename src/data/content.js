// Visas svetainės turinys vienoje vietoje. Šaltinis: www.statovita.lt (LT ir EN versijos).
// Nuotraukos: /img/projects (originalios iš statovita.lt), /img/pexels (Pexels, credits.json).

export const FOUNDED = 1997;
export const YEARS = new Date().getFullYear() - FOUNDED;

export const company = {
  name: "UAB „Statovita“",
  short: "Statovita",
  tagline: "Patikimas vandentvarkos projektų partneris nuo 1997 m.",
  address: "Savanorių pr. 178B, Vilnius LT-03154",
  director: "Šarūnas Jagminas",
  hours: "Pir–Pen 7:00–16:00",
  code: "123935815",
  vat: "LT239358113",
  email: "info@statovita.lt",
  phone: "+370 610 69 391",
  phoneHref: "tel:+37061069391",
  supply: { phone: "+370 614 21 190", phoneHref: "tel:+37061421190", email: "kestas@statovita.lt" },
  brochure: "https://www.statovita.lt/wp-content/uploads/2018/02/UAB-Statovita-įmonės-brošiūra.pdf",
  membership: "„Lietuvos vandens tiekėjų asociacijos“ narė",
  licence: "Ypatingo statinio statybos rangovas",
};

export const nav = [
  { label: "Paslaugos", href: "#paslaugos" },
  { label: "Patirtis", href: "#patirtis" },
  { label: "Projektai", href: "#projektai" },
  { label: "Vadybos sistema", href: "#vadybos-sistema" },
  { label: "Karjera", href: "#karjera" },
  { label: "Kontaktai", href: "#kontaktai" },
];

export const heroImages = {
  main: "img/pexels/plant-aerial-trees.jpg",
  mainAlt: "Nuotekų valyklos apvalūs rezervuarai iš paukščio skrydžio",
  cardA: "img/projects/vilnius-valykla-modernizavimas.jpg",
  cardB: "img/projects/antaviliai-tinklai.jpg",
};

export const hero = {
  eyebrow: `Vandentvarka · nuo ${FOUNDED} m.`,
  title: ["Vandentvarkos projektai,", "kuriais pasitiki", "miestai."],
  highlight: "pasitiki",
  subtitle:
    "Vandentiekio ir nuotekų tinklai, nuotekų valyklos, vandens gerinimo įrenginiai. Projektuojame, statome ir rekonstruojame – nuo pirmo brėžinio iki paleidimo.",
  primary: { label: "Įgyvendinti projektai", href: "#projektai" },
  secondary: { label: "Pateikti užklausą", href: "#kontaktai" },
  trusted: "Mumis pasitiki Lietuvos vandentvarkos įmonės",
};

export const stats = [
  { value: YEARS, suffix: "", label: "metų patirties", note: `įkurta ${FOUNDED} m.` },
  { value: 280000, suffix: " m³/d", label: "didžiausia modernizuota valykla", note: "Vilniaus m. nuotekų valykla" },
  { value: 41.4, suffix: " km", decimals: 1, label: "renovuotų tinklų Vilniuje", note: "plieno vamzdžių cementavimas" },
  { value: 25, suffix: "+", label: "įgyvendintų objektų", note: "valyklos, tinklai, įrenginiai" },
];

export const services = [
  {
    id: "tinklai",
    title: "Vandentiekio ir nuotekų tinklai",
    short: "Tinklai",
    icon: "img/icons/tinklai.png",
    image: "img/pexels/drainage-pipe-trench.jpg",
    photo: "img/projects/antaviliai-tinklai.jpg",
    description:
      "Atsižvelgdami į projekto reikalavimus ir statybos sąlygų ypatumus, vandentiekio ir nuotekų tinklų statybą vykdome atviros ir uždaros (betranšėjinės) technologijos būdais.",
    bullets: [
      "Tinklų statyba atviru ir uždaru būdu",
      "Elektros ir telekomunikacijų tinklų iškėlimas trasoje",
      "Nuotekų siurblinių statyba",
      "Dangų ardymas ir aplinkos atstatymas",
    ],
    metric: { value: "20,2 km", label: "tinklų Antaviliuose – didžiausias tinklų objektas" },
  },
  {
    id: "valyklos",
    title: "Nuotekų valymo įrenginiai",
    short: "Nuotekų valyklos",
    icon: "img/icons/valyklos.png",
    image: "img/pexels/modern-wwtp-aerial.jpg",
    photo: "img/projects/vilnius-valykla-modernizavimas.jpg",
    description:
      "Vykdome projektavimo, statybos bei rekonstrukcijos darbus įrengiant nuotekų valymo įrenginius. Pagal užsakovo reikalavimus parenkame optimalų technologinį sprendimą ir visada užtikriname projekto rodiklių pasiekimą.",
    bullets: [
      "Naujų valyklų projektavimas ir statyba",
      "Esamų valyklų rekonstrukcija ir modernizavimas",
      "Technologinės įrangos montavimas, paleidimas ir derinimas",
      "Elektros, automatikos, šildymo ir vėdinimo darbai",
    ],
    metric: { value: "280 000 m³/d", label: "Vilniaus m. nuotekų valyklos našumas" },
  },
  {
    id: "vanduo",
    title: "Vandens gerinimo įrenginiai",
    short: "Vandens gerinimas",
    icon: "img/icons/vandens-gerinimas.png",
    image: "img/projects/ukmerge-vandens-ruosimas.jpg",
    photo: "img/projects/trakai-vandens-gerinimas.jpg",
    description:
      "Įvertinę visas galimas alternatyvas, klientams siūlome efektyvius vandens paėmimo ir gerinimo įrenginių sprendimus. Rengiame techninius ir darbo projektus, vykdome statybos ar rekonstrukcijos darbus.",
    bullets: [
      "Vandens gręžinių rekonstrukcija ir naujų įrengimas",
      "Antro kėlimo siurblinių rekonstrukcija",
      "Geležies ir mangano šalinimas, minkštinimas, dezinfekcija",
      "Techninis ir darbo projektai",
    ],
    metric: { value: "6 000 m³/d", label: "Ukmergės vandens ruošimo įrenginių našumas" },
  },
  {
    id: "specialios",
    title: "Lietaus, pramoninės nuotekos ir dumblas",
    short: "Specialūs objektai",
    icon: "img/icons/valyklos.png",
    image: "img/pexels/tanks-blue-piping.jpg",
    photo: "img/projects/elektrenai-pramonines.jpg",
    description:
      "Statome ir rekonstruojame paviršinių (lietaus) nuotekų valymo įrenginius, pramoninių nuotekų valyklas ir nuotekų dumblo apdorojimo įrenginius – nuo monolitinių g/b talpų iki technologinio derinimo.",
    bullets: [
      "Paviršinių nuotekų valymo įrenginiai (65–290 l/s)",
      "Naftos produktais užteršto vandens valyklos",
      "Dumblo apdorojimo aikštelės ir rezervuarai",
      "Monolitinių g/b talpų įrengimas",
    ],
    metric: { value: "350 m³/h", label: "Lietuvos elektrinės pramoninių nuotekų valykla" },
  },
];

export const about = {
  title: "Beveik trys dešimtmečiai vandentvarkoje",
  paragraphs: [
    `UAB „Statovita“ įkurta ${FOUNDED} m. ir nuo tada vykdo vandentvarkos objektų projektavimo, statybos bei modernizavimo darbus. Įmonėje dirba aukštos kvalifikacijos specialistai, kurių kompetencija leidžia darbus atlikti kokybiškai, operatyviai, taikant pažangius darbų vykdymo sprendimus bei metodus.`,
    "Per įmonės gyvavimo metus atlikta daug svarbių objektų: miestų nuotekų valyklų modernizavimas ir statyba, miestų vandentiekio tinklų statyba, įmonių vandens gerinimo įrenginių statyba, gyvenamųjų rajonų vandentiekio ir nuotekų tinklų bei valyklų statyba.",
    "Įmonei suteikta teisė būti ypatingo statinio statybos rangovu, ji yra „Lietuvos vandens tiekėjų asociacijos“ narė, bendrovėje įdiegta kokybės, aplinkosaugos ir darbo saugos integruota vadybos sistema.",
  ],
  pillars: [
    { title: "Ypatingo statinio rangovas", text: "Teisė vykdyti sudėtingiausių inžinerinių statinių statybą." },
    { title: "LVTA narė", text: "Lietuvos vandens tiekėjų asociacijos narė – dirbame kartu su vandentvarkos sektoriumi." },
    { title: "Integruota vadybos sistema", text: "Kokybė, aplinkosauga ir darbo sauga pagal ISO 9001, 14001 ir 45001." },
    { title: "Nuo projekto iki paleidimo", text: "Projektavimas, statyba, technologinis derinimas ir aplinkos atstatymas." },
  ],
  image: "img/brand/statovita-darbai.jpg",
};

export const timeline = [
  { year: `${FOUNDED}`, title: "Įkurta UAB „Statovita“", text: "Pradedame vandentvarkos objektų projektavimo ir statybos veiklą Vilniuje." },
  { year: "2000-ieji", title: "Miestų nuotekų valyklos", text: "Švenčionėlių, Šalčininkų, Kernavės valyklų statyba; Anykščių, Ukmergės, Eišiškių rekonstrukcija." },
  { year: "2012–2017", title: "Vilniaus tinklų avariniai ruožai", text: "12,1 km tinklų, iš jų 8,5 km uždaru būdu – nuolatinė partnerystė su Vilniaus vandenimis." },
  { year: "2014", title: "„Gazelė 2014“", text: "Įmonė pripažinta viena sparčiausiai augančių Lietuvos įmonių." },
  { year: "Vilnius", title: "280 000 m³/d valyklos modernizavimas", text: "Didžiausias šalies nuotekų valyklos objektas – statiniai, technologija, automatika." },
  { year: "Šiandien", title: "ISO 9001 · 14001 · 45001", text: `${YEARS} metai patirties ir integruota kokybės, aplinkosaugos ir darbo saugos sistema.` },
];

export const projectGroups = [
  { id: "visi", label: "Visi projektai" },
  { id: "valyklos", label: "Nuotekų valyklos" },
  { id: "tinklai", label: "Tinklai" },
  { id: "vanduo", label: "Vandens ruošimas" },
  { id: "lietaus", label: "Lietaus ir pramoninės nuotekos" },
  { id: "dumblas", label: "Dumblo apdorojimas" },
];

export const projects = [
  {
    id: "vilnius-valykla",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Vilniaus miesto nuotekų valyklos modernizavimas",
    location: "Vilnius",
    metric: "280 000 m³/d",
    image: "img/projects/vilnius-valykla-modernizavimas.jpg",
    featured: true,
    description:
      "Statinių, g/b talpų statyba ir rekonstrukcija, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "vilnius-renovacija",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų rekonstrukcija ir remontas",
    title: "Vilniaus m. vandentiekio ir nuotekų tinklų renovacija",
    location: "Vilnius",
    metric: "41,4 km",
    image: "img/projects/vilnius-renovacija-cementavimas.jpg",
    featured: true,
    description:
      "Plieno vamzdžių padengimas cemento skiediniu. Projekto parengimo darbai, paruošiamieji darbai cementavimui ir renovacijai (41,4 km), PE vamzdžių įvilkimas į esamus vamzdynus (5,9 km), kalaus ketaus ir PE vamzdžių paklojimas (2,1 km), vandentiekio kamerų rekonstrukcija (311 vnt.), dangų ardymas ir atstatymas.",
  },
  {
    id: "antaviliai",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų projektavimas ir statyba",
    title: "Vandentiekio ir nuotekų tinklai Antaviliuose, S.B. „Šeškinė“, S.B. „Jurginas“ ir Gineitiškėse",
    location: "Vilnius",
    metric: "20,2 km",
    image: "img/projects/antaviliai-tinklai.jpg",
    featured: true,
    description:
      "Vandentiekio ir nuotekų šalinimo tinklų paklojimas, nuotekų siurblinių statyba, dangų ardymo ir atstatymo darbai po inžinerinių tinklų paklojimo. Darbų apimtis 20,2 km tinklų (iš jų 4,1 km uždaru būdu), 4 nuotekų siurblinių statyba.",
  },
  {
    id: "ukmerge-valykla",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Ukmergės miesto nuotekų valymo įrenginių pakeitimas ir rekonstravimas",
    location: "Ukmergė",
    metric: "9 000 m³/d",
    image: "img/projects/ukmerge-valykla.jpg",
    description:
      "Technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "anyksciai",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Anykščių miesto nuotekų valymo įrenginių pakeitimas ir rekonstravimas",
    location: "Anykščiai",
    metric: "3 000 m³/d",
    image: "img/projects/anyksciai-valykla.jpg",
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "eisiskes",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Eišiškių nuotekų valymo įrenginių rekonstrukcija",
    location: "Aklės k., Šalčininkų r.",
    metric: "350 m³/d",
    image: "img/projects/eisiskes-valykla-1.jpg",
    gallery: ["img/projects/eisiskes-valykla-1.jpg", "img/projects/eisiskes-valykla-2.jpg"],
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "vilnius-aeracija",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Vilniaus m. nuotekų valyklos aeracinių sistemų remonto darbai",
    location: "Vilnius",
    metric: "1 125 aeratoriai",
    image: "img/projects/vilnius-aeracija.jpg",
    description:
      "1 125 aeratorių pakeitimas, ištuštinant aerotankų sekcijas ir pakeičiant (remontuojant) aeratorius bei vamzdynus.",
  },
  {
    id: "vidiskes",
    group: "valyklos",
    category: "Nuotekų valyklų rekonstrukcija ir modernizavimas",
    title: "Nuotekų valymo įrenginių rekonstrukcija Vidiškėse ir Didžiasalyje",
    location: "Ignalinos r.",
    metric: "195 + 360 m³/d",
    image: "img/projects/vidiskes-didziasalis.jpg",
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko tinklų paklojimas, aplinkos tvarkymo darbai. Vidiškės – 195 m³/d, Didžiasalis – 360 m³/d.",
  },
  {
    id: "salcininkai",
    group: "valyklos",
    category: "Nuotekų valyklų projektavimas ir statyba",
    title: "Šalčininkų miesto nuotekų valyklos statyba",
    location: "Šalčininkai",
    metric: "1 800 m³/d",
    image: "img/projects/salcininkai-valykla.jpg",
    gallery: ["img/projects/salcininkai-valykla.jpg", "img/projects/salcininkai-statyba.jpg"],
    featured: true,
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "svencioneliai",
    group: "valyklos",
    category: "Nuotekų valyklų projektavimas ir statyba",
    title: "Švenčionėlių miesto nuotekų valyklos statyba",
    location: "Švenčionėliai",
    metric: "1 440 m³/d",
    image: "img/projects/svencioneliai-valykla.jpg",
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "linkmenys",
    group: "valyklos",
    category: "Nuotekų valyklų projektavimas ir statyba",
    title: "Nuotekų valymo įrenginių statyba Linkmenų ir Dūkšto miesteliuose",
    location: "Ignalinos r.",
    metric: "54 + 251 m³/d",
    image: "img/projects/linkmenys-dukstas.jpg",
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos, šildymo ir vėdinimo darbai, lauko tinklų paklojimas, aplinkos tvarkymas. Linkmenys – 54 m³/d, Dūkštas – 251 m³/d.",
  },
  {
    id: "kernave",
    group: "valyklos",
    category: "Nuotekų valyklų projektavimas ir statyba",
    title: "Kernavės nuotekų valymo įrenginių statyba",
    location: "Kernavė, Širvintų r.",
    metric: "50 m³/d",
    image: "img/projects/kernave-valykla.jpg",
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, šildymo vėdinimo darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "daniliskes-tinklai",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų projektavimas ir statyba",
    title: "Vandentiekio ir nuotekų tinklų projektavimas ir statyba Daniliškėse",
    location: "Daniliškės, Vilniaus r.",
    metric: "7,8 km",
    image: "img/projects/daniliskes-tinklai.jpg",
    description:
      "Vandentiekio ir nuotekų šalinimo tinklų paklojimas, nuotekų siurblinės statyba. Kartu su vandens gerinimo įrenginių statyba.",
  },
  {
    id: "mokslininku",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų rekonstrukcija ir remontas",
    title: "Susisiekimo komunikacijų ir inžinerinių tinklų įrengimas Mokslininkų ir Geležinio Vilko g.",
    location: "Vilnius",
    metric: "Gatvės ir tinklai",
    image: "img/projects/vilnius-mokslininku.jpg",
    description:
      "Susisiekimo komunikacijos, gatvės, inžineriniai tinklai, vandentiekio ir nuotekų šalinimo tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "latviu",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų rekonstrukcija ir remontas",
    title: "Slėginio nuotekų tinklo Latvių g. remonto darbai",
    location: "Vilnius",
    metric: "755 m · D710",
    image: "img/projects/vilnius-latviu-sleginis.jpg",
    description:
      "Inžineriniai tinklai, nuotekų šalinimo tinklų klojimas D710 uždaru būdu, dangų ardymo ir atstatymo darbai po inžinerinių tinklų paklojimo. Darbų apimtis 755 m tinklų.",
  },
  {
    id: "avariniai",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų rekonstrukcija ir remontas",
    title: "Vandentiekio ir nuotekų tinklų avarinių ruožų darbai 2012–2017 m.",
    location: "Vilnius",
    metric: "12,1 km",
    image: "img/projects/vilnius-avariniai-ruozai.jpg",
    description:
      "Vandentiekio ir nuotekų šalinimo tinklų paklojimas, rekonstrukcija, remontas; dangų ardymo ir atstatymo darbai. Bendra trumpų ruožų darbų apimtis 12,1 km tinklų (iš jų 8,5 km uždaru būdu).",
  },
  {
    id: "kedainiai",
    group: "tinklai",
    category: "Vandentiekio ir nuotekų tinklų rekonstrukcija ir remontas",
    title: "Vandentiekio ir buitinių nuotekų tinklų rekonstravimas Kėdainių mieste",
    location: "Kėdainiai",
    metric: "4,9 km",
    image: "img/pexels/urban-pipe-installation.jpg",
    stock: true,
    description:
      "Inžineriniai tinklai, vandentiekio ir nuotekų šalinimo tinklų paklojimas, rekonstrukcija; dangų ardymo ir atstatymo darbai. Darbų apimtis 4,9 km tinklų (iš jų 2,2 km uždaru būdu CIPP).",
  },
  {
    id: "savanoriu",
    group: "lietaus",
    category: "Paviršinių (lietaus) nuotekų valymo įrenginiai",
    title: "Paviršinių nuotekų valymo įrenginių rekonstrukcija, Savanorių pr. 197",
    location: "Vilnius",
    metric: "65 + 80 l/s",
    image: "img/projects/vilnius-savanoriu-pavirsines.jpg",
    description:
      "Monolitinių g/b talpų įrengimas, inžineriniai tinklai, lietaus tinklų paklojimas, dangų ardymo ir atstatymo darbai. Našumas 65 l/s ir 80 l/s.",
  },
  {
    id: "ukmerge-lietaus",
    group: "lietaus",
    category: "Paviršinių (lietaus) nuotekų valymo įrenginiai",
    title: "Paviršinių nuotekų tinklų ir lietaus vandens valymo įrenginių statyba",
    location: "Ukmergė",
    metric: "290 l/s",
    image: "img/projects/ukmerge-pavirsines.jpg",
    description: "Paviršinių nuotekų tinklų statyba Ukmergės mieste ir lietaus vandens valymo įrenginių (290 l/s) statyba.",
  },
  {
    id: "elektrenai",
    group: "lietaus",
    category: "Pramoninių nuotekų valymo įrenginiai",
    title: "Lietuvos elektrinės naftos produktais užteršto vandens valyklos projektavimas ir rekonstrukcija",
    location: "Elektrėnai",
    metric: "350 m³/h",
    image: "img/projects/elektrenai-pramonines.jpg",
    featured: true,
    description:
      "Statinių, g/b talpų statyba, technologinės įrangos montavimas, paleidimas ir technologinis derinimas, elektros automatikos darbai, lauko vandentiekio ir nuotekų tinklų paklojimas, aplinkos tvarkymo darbai.",
  },
  {
    id: "ukmerge-vanduo",
    group: "vanduo",
    category: "Vandens ruošimo įrenginiai",
    title: "Ukmergės miesto vandens gręžinių ir vandens ruošimo įrenginių projektavimas ir rekonstrukcija",
    location: "Ukmergė",
    metric: "6 000 m³/d",
    image: "img/projects/ukmerge-vandens-ruosimas.jpg",
    featured: true,
    description:
      "Vandens gręžinių rekonstrukcija ir naujo gręžinio įrengimas, antro kėlimo siurblinės rekonstrukcija, pastato ir vandens gerinimo įrenginių su technologiniais įrenginiais statyba.",
  },
  {
    id: "trakai-vanduo",
    group: "vanduo",
    category: "Vandens ruošimo įrenginiai",
    title: "Vandens gerinimo įrenginių projektavimas ir statyba Trakuose",
    location: "Trakai",
    metric: "5 000 m³/d",
    image: "img/projects/trakai-vandens-gerinimas.jpg",
    description: "Vandens gerinimo įrenginių techninis ir darbo projektai, statybos darbai, technologinių įrenginių montavimas ir derinimas.",
  },
  {
    id: "daniliskes-vanduo",
    group: "vanduo",
    category: "Vandens ruošimo įrenginiai",
    title: "Vandens gerinimo įrenginių projektavimas ir statyba Daniliškėse",
    location: "Daniliškės, Vilniaus r.",
    metric: "300 m³/d",
    image: "img/projects/daniliskes-vandens-gerinimas.jpg",
    description:
      "Technologinių įrenginių montavimas, įrenginių paleidimo ir derinimo darbai, elektros ir automatikos darbai, aplinkos tvarkymo darbai.",
  },
  {
    id: "jonava-dumblas",
    group: "dumblas",
    category: "Nuotekų dumblo apdorojimo įrenginiai",
    title: "Jonavos dumblo apdorojimo įrenginių statyba Gineikių k.",
    location: "Jonavos r.",
    metric: "6 517 m²",
    image: "img/projects/jonava-dumblas.jpg",
    description:
      "Dumblo apdorojimo aikštelių statyba (6 517 m² asfalto danga), pastato virš aikštelių montavimas, vandentiekio, buitinių ir lietaus nuotekų vamzdynų, kaupiamųjų rezervuarų, nuotekų valymo įrenginių statyba, aplinkos tvarkymo darbai.",
  },
];

export const clients = [
  { name: "UAB „Vilniaus vandenys“", logo: "img/clients/vilniaus-vandenys-trim.png", logoW: 141, logoH: 73, work: "Nuotekų valyklos modernizavimas (280 000 m³/d), tinklų renovacija 41,4 km, avariniai ruožai 2012–2017 m." },
  { name: "UAB „Ukmergės vandenys“", logo: "img/clients/ukmerges-vandenys-trim.png", logoW: 95, logoH: 94, work: "Nuotekų valyklos rekonstrukcija (9 000 m³/d), vandens ruošimo įrenginiai (6 000 m³/d), lietaus valykla 290 l/s." },
  { name: "UAB „Jonavos vandenys“", logo: "img/clients/jonavos-vandenys-trim.png", logoW: 188, logoH: 80, work: "Dumblo apdorojimo įrenginių statyba Gineikių k. – 6 517 m² aikštelės." },
  { name: "UAB „Širvintų vandenys“", logo: "img/clients/sirvintu-vandenys-trim.png", logoW: 203, logoH: 25, work: "Kernavės nuotekų valymo įrenginių statyba (50 m³/d)." },
  { name: "UAB „Kėdainių vandenys“", logo: "img/clients/kedainiu-vandenys-trim.png", logoW: 202, logoH: 34, work: "Vandentiekio ir buitinių nuotekų tinklų rekonstravimas – 4,9 km, iš jų 2,2 km CIPP." },
];

export const management = {
  title: "Vadybos sistema ir sertifikatai",
  intro:
    "UAB „Statovita“ vadovybė inžinerinių tinklų statyboje siekia pilnai įvykdyti užsakovo reikalavimus, gerinti aplinkos apsaugos, darbuotojų saugos ir sveikatos veiksmingumą bei įsipareigoja:",
  commitments: [
    "nuolat tobulinti bendrovės vadybos sistemą, atitinkančią LST EN ISO 9001:2015, LST EN ISO 14001:2015 ir ISO 45001:2018 reikalavimus;",
    "laikytis įmonės veiklai taikomų teisinių ir kitų reikalavimų, tame tarpe galiojančių įstatymų dėl darbo valandų ir viršvalandžių nustatymo, bei teisingai atlyginti už darbą;",
    "būti atsakingiems už įmonės veiklą, kuri paveikia žmones, jų bendruomenes ir aplinką;",
    "siekti, kad tiekėjai ir subrangovai, pritardami mūsų socialinio atskaitingumo principų deklaracijai, laikytųsi socialinio atskaitingumo standarto reikalavimų;",
    "skleisti šią politiką visoms suinteresuotoms šalims.",
  ],
  certificates: [
    { id: "9001", title: "ISO 9001:2015", subtitle: "Kokybės vadybos sistema", image: "img/certs/iso-9001.png" },
    { id: "14001", title: "ISO 14001:2015", subtitle: "Aplinkos apsaugos vadybos sistema", image: "img/certs/iso-14001.png" },
    { id: "45001", title: "ISO 45001:2018", subtitle: "Darbuotojų saugos ir sveikatos vadybos sistema", image: "img/certs/iso-45001.png" },
  ],
  awards: [
    { title: "LR aplinkos ministerijos pažymėjimas", image: "img/certs/aplinkos-ministerija.jpg" },
    { title: "JAR pažymėjimas", image: "img/certs/jar.jpg" },
    { title: "„Gazelė 2014“", image: "img/certs/gazele-2014.jpg" },
  ],
};

export const careers = {
  title: "Prisijunkite prie komandos, kuri stato ilgam",
  intro: "Kviečiame prisijungti prie mūsų komandos:",
  positions: [
    { title: "Statybų vadovas", text: "Vandentvarkos objektų statybos organizavimas ir priežiūra." },
    { title: "Darbų vadovas", text: "Tinklų ir įrenginių statybos darbų vadovavimas objekte." },
    { title: "Mechanizatorius", text: "Darbas su statybine technika tinklų ir valyklų objektuose." },
    { title: "Specialistai", text: "Inžinieriai, montuotojai ir kiti vandentvarkos srities specialistai." },
  ],
  offer: [
    "Stabilų ir atsakingą darbą profesionalų komandoje",
    "Apmokymus ir nuolatinį kvalifikacijos kėlimą",
    "Patrauklias darbo sąlygas ir motyvuojantį atlygį",
    "Karjeros galimybes",
    "Darbo vietą pagal Jūsų gyvenamą vietą",
  ],
  cta: "Užpildyti anketą",
  image: "img/pexels/bore-team.jpg",
};

export const ctaImage = "img/pexels/plant-pforzheim.jpg";
export const servicesBackground = "img/pexels/plant-aerial-poznan.jpg";

export const cta = {
  title: "Planuojate vandentvarkos projektą?",
  text: "Aptarkime jūsų objektą – nuo tinklų iki valyklos. Atsakysime per vieną darbo dieną.",
  button: "Pateikti užklausą",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} UAB „Statovita“. Visos teisės saugomos.`,
};
