import { SpeechOrganStation } from '@/types/grammar';

export const SPEECH_ORGANS_DATA: SpeechOrganStation[] = [
  {
    id: 1,
    name: "Tüdő",
    airFlowOrder: 1,
    shortRole: "A levegő forrása",
    description: "Kilégzéssel biztosítja a hangképzéshez szükséges levegőoszlopot. A magyar beszédhangok szinte kivétel nélkül kilégzés közben keletkeznek.",
    iconName: "Wind",
  },
  {
    id: 2,
    name: "Légcső",
    airFlowOrder: 2,
    shortRole: "A levegő továbbítója",
    description: "Egy rugalmas porcos cső, amely a tüdőből kiáramló levegőt egyenesen a gégefő felé vezeti.",
    iconName: "Activity",
  },
  {
    id: 3,
    name: "Gégefőben a 2 hangszalag",
    airFlowOrder: 3,
    shortRole: "A tiszta hang szülőhelye",
    description: "Itt található a 2 hangszalag. Amikor a hangszalagok záródnak és a kiáramló levegő megrezegteti őket, zöngés hangok jönnek létre. Ha nyitva maradnak és nem rezegnek, zöngétlen hangok képződnek.",
    iconName: "Music",
  },
  {
    id: 4,
    name: "Garatüregben az ínycsap (ínyvitorla)",
    airFlowOrder: 4,
    shortRole: "A hangképzés szelepe és erősítője",
    description: "A garat felerősíti és továbbítja a hangot. Itt található az ínycsap (ínyvitorla), amely szelepként működik: ha felemelkedik, elzárja az utat az orrüreg felé (szájhangok keletkeznek), ha leereszkedik, a levegő az orrüregen át is távozik (orrhangok keletkeznek: m, n, ny).",
    iconName: "Sliders",
  },
  {
    id: 5,
    name: "Orrüreg",
    airFlowOrder: 5,
    shortRole: "Rezonátor és hangfelerősítő",
    description: "Rezonátorként (hangfelerősítő üregként) működik a nazális hangoknál (m, n, ny), amikor az ínycsap leereszkedik.",
    iconName: "Radio",
  },
  {
    id: 6,
    name: "Szájüreg",
    airFlowOrder: 6,
    shortRole: "A hangok végső formálója (4 belső szervvel)",
    description: "A szájüregen belül található a 4 fontos szerv, amely a hangok végső alakját adja: a nyelv, a fogak, a szájpadlás és az ajkak.",
    iconName: "Smile",
    subParts: [
      {
        name: "Nyelv",
        description: "Rendkívül fürge, rugalmas szerv. Mozgásával és helyzetével alapvetően formálja a magánhangzókat és mássalhangzókat.",
        example: "Például elöl vagy hátul képzett hangok (e vs. o), vagy zárat képez (t, d, k)."
      },
      {
        name: "Fogak",
        description: "Szilárd akadályt képeznek a kiáramló levegő előtt, ami elengedhetetlen a mássalhangzók egy csoportjának képzéséhez.",
        example: "A fogaknál képzett hangok pl.: t, d, sz, z, f, v."
      },
      {
        name: "Szájpadlás",
        description: "A szájüreg mennyezete (elöl a kemény, hátul a lágy szájpadlás), amelyhez a nyelv hozzásimul vagy megérinti.",
        example: "Itt képződnek például: k, g, ty, gy, j, s, zs."
      },
      {
        name: "Ajkak",
        description: "Kerekítéssel vagy réshúzással módosítják a magánhangzókat, illetve teljes zárat alkotva mássalhangzókat hoznak létre.",
        example: "Kerekített (o, u) vs. réses (e, i), illetve zárhangok (p, b, m)."
      }
    ]
  }
];

export const SPEECH_ORGN_ORDER_PRACTICE = [
  { id: 1, name: "Tüdő", correctPos: 1 },
  { id: 2, name: "Légcső", correctPos: 2 },
  { id: 3, name: "Gégefőben a 2 hangszalag", correctPos: 3 },
  { id: 4, name: "Garatüregben az ínycsap (ínyvitorla)", correctPos: 4 },
  { id: 5, name: "Orrüreg", correctPos: 5 },
  { id: 6, name: "Szájüreg (nyelv, fogak, szájpadlás, ajkak)", correctPos: 6 },
];

export const SPEECH_ORGAN_QUIZ = [
  {
    id: 1,
    question: "Melyik szerv biztosítja a hangképzéshez szükséges levegőoszlopot a kilégzéssel?",
    options: ["Garatüreg", "Tüdő", "Légcső", "Orrüreg"],
    correctIndex: 1,
    explanation: "A hangképzés a tüdőből kiáramló levegőoszlop segítségével valósul meg."
  },
  {
    id: 2,
    question: "Hány hangszalag található az emberi gégefőben?",
    options: ["1", "2", "4", "10"],
    correctIndex: 1,
    explanation: "A gégefőben 2 hangszalag található, amelyek rezgése vagy nyugalma adja a zöngét."
  },
  {
    id: 3,
    question: "Mi történik a garatüregben, ha az ínycsap (ínyvitorla) felemelkedik?",
    options: [
      "Elzárja az orrüreget, így tiszta szájhangok keletkeznek",
      "Leáll a légzés",
      "Kizárólag orrhangok (m, n, ny) jönnek létre",
      "A hangszalagok rezgése megszűnik"
    ],
    correctIndex: 0,
    explanation: "Felemelkedve elzárja az utat az orrüreg felé, a levegő csak a szájüregen át tud távozni: szájhangok keletkeznek."
  },
  {
    id: 4,
    question: "Melyik szerv (5. állomás) működik rezonátorként az 'm', 'n' és 'ny' hangok kiejtésekor?",
    options: ["Fogak", "Orrüreg", "Légcső", "Tüdő"],
    correctIndex: 1,
    explanation: "Az orrüreg felerősíti, rezonátorként kíséri az orrhangokat (m, n, ny)."
  },
  {
    id: 5,
    question: "A 6. állomáson a szájüregen belül mely szervek vesznek részt a hangképzésben?",
    options: [
      "Csak a fogak",
      "Nyelv, fogak, szájpadlás és ajkak",
      "Tüdő és légcső",
      "Garatüreg és orrüreg"
    ],
    correctIndex: 1,
    explanation: "A 6. állomáson a szájüreg 4 belső képző szerve: nyelv, fogak, szájpadlás és ajkak."
  },
  {
    id: 6,
    question: "Mi a beszélőszervek helyes sorrendje a levegő útja szerint (alulról felfelé)?",
    options: [
      "1. Tüdő → 2. Légcső → 3. Gégefő → 4. Garatüregben ínycsap → 5. Orrüreg → 6. Szájüreg",
      "1. Szájüreg → 2. Tüdő → 3. Légcső → 4. Orrüreg → 5. Garat → 6. Gégefő",
      "1. Tüdő → 2. Orrüreg → 3. Légcső → 4. Gégefő → 5. Garat → 6. Szájüreg",
      "1. Gégefő → 2. Tüdő → 3. Légcső → 4. Garat → 5. Szájüreg → 6. Orrüreg"
    ],
    correctIndex: 0,
    explanation: "A helyes sorrend: 1. Tüdő, 2. Légcső, 3. Gégefő a hangszalagokkal, 4. Garatüregben az ínycsap, 5. Orrüreg, 6. Szájüreg."
  },
  {
    id: 7,
    question: "Melyik szerv vezeti a levegőt a tüdőtől közvetlenül a gégefő felé?",
    options: ["Légcső", "Orrüreg", "Szájüreg", "Nyelv"],
    correctIndex: 0,
    explanation: "A légcső rugalmas porcos csőként vezeti a kiáramló levegőt a gégefő felé."
  },
  {
    id: 8,
    question: "Mi történik a gégefőben a hangszalagokkal, amikor ZÖNGÉS hangot ejtünk?",
    options: [
      "Záródnak és rezegnek",
      "Nyitva maradnak és egyáltalán nem rezegnek",
      "Kiesnek a helyükről",
      "Teljesen elzárják a légzést"
    ],
    correctIndex: 0,
    explanation: "Zöngés hangok képzésekor a két hangszalag záródik és a levegő rezgésbe hozza őket."
  },
  {
    id: 9,
    question: "Melyik belső szájüregi szerv a legfürgébb és legmozgékonyabb a hangok formálásában?",
    options: ["Fogak", "Szájpadlás", "Nyelv", "Légcső"],
    correctIndex: 2,
    explanation: "A nyelv rendkívül fürge izomszerv, amelynek mozgása nélkülözhetetlen a magán- és mássalhangzók formálásához."
  },
  {
    id: 10,
    question: "Milyen hangok keletkeznek, amikor a garatban az ínycsap leereszkedik, megnyitva az utat az orrüreg felé?",
    options: [
      "Orrhangok (m, n, ny)",
      "Tiszta szájhangok",
      "Semmilyen hang nem tud keletkezni",
      "Csak mély magánhangzók"
    ],
    correctIndex: 0,
    explanation: "Leereszkedett ínycsapnál a levegő az orrüregbe jutva rezonál, így keletkeznek a nazális orrhangok (m, n, ny)."
  }
];
