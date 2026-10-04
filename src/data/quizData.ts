import { QuizQuestion } from '@/types/grammar';

export const GRAND_QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Beszélőszervek (1-5. kérdés)
  {
    id: 1,
    category: 'beszeloszervek',
    question: "Mi a beszélőszervek helyes sorrendje a levegő útja szerint (alulról felfelé haladva)?",
    options: [
      "1. Tüdő → 2. Légcső → 3. Gégefő → 4. Garatüregben az ínycsap → 5. Orrüreg → 6. Szájüreg",
      "1. Szájüreg → 2. Tüdő → 3. Légcső → 4. Orrüreg → 5. Garat → 6. Gégefő",
      "1. Tüdő → 2. Orrüreg → 3. Légcső → 4. Gégefő → 5. Garat → 6. Szájüreg",
      "1. Gégefő → 2. Tüdő → 3. Légcső → 4. Garat → 5. Szájüreg → 6. Orrüreg"
    ],
    correctIndex: 0,
    explanation: "A levegő a tüdőből indul (1), átmegy a légcsövön (2), a gégefőn (3), a garatüregben az ínycsapnál (4), az orrüregnél (5), majd a szájüregbe érkezik (6)."
  },
  {
    id: 2,
    category: 'beszeloszervek',
    question: "Hogyan keletkeznek az orrhangok (m, n, ny) a beszélőszervek segítségével?",
    options: [
      "Az ínycsap felemelkedik, és teljesen elzárja az orrüreget",
      "A garatban az ínycsap leereszkedik, így a levegő az orrüregen át is távozik",
      "A tüdő nem fúj ki levegőt",
      "A fogainkat szorosan összezárjuk"
    ],
    correctIndex: 1,
    explanation: "Amikor a garatban az ínycsap (ínyvitorla) leereszkedik, megnyílik az út az orrüreg felé, és az orrüreg rezonátorként felerősíti a nazális hangokat (m, n, ny)."
  },
  {
    id: 3,
    category: 'beszeloszervek',
    question: "A 6. állomáson, a szájüregen belül mely szervek vesznek részt közvetlenül a hangképzésben?",
    options: [
      "A szív és a tüdő",
      "A nyelv, a fogak, a szájpadlás és az ajkak",
      "Csak a nyelv",
      "A légcső és a garat"
    ],
    correctIndex: 1,
    explanation: "A szájüregben a nyelv, a fogak, a szájpadlás és az ajkak formálják és alakítják a beszédhangokat."
  },
  {
    id: 4,
    category: 'beszeloszervek',
    question: "Hol keletkezik a tiszta hang az emberi testben a hangképzés során?",
    options: [
      "A tüdőben",
      "A gégefőben található 2 hangszalagnál",
      "Az orrüregben",
      "A fogak között"
    ],
    correctIndex: 1,
    explanation: "A tiszta hang a gégefőben a 2 hangszalag rezgése által jön létre."
  },
  {
    id: 5,
    category: 'beszeloszervek',
    question: "Melyik szerv működik rezonátorként (hangfelerősítő üregként) az 5. állomáson az 'm', 'n', 'ny' hangoknál?",
    options: ["Fogak", "Orrüreg", "Légcső", "Garatfal"],
    correctIndex: 1,
    explanation: "Az orrüreg rezonátorként felerősíti és színezi a nazális orrhangokat (m, n, ny)."
  },

  // 2. Magánhangzók (6-10. kérdés)
  {
    id: 6,
    category: 'maganhangzok',
    question: "Miben különbözik a magánhangzók képzése a mássalhangzókétól?",
    options: [
      "A magánhangzók képzésekor a levegő NEM ütközik akadályba a szájüregben",
      "A magánhangzóknál nincs szükség tüdőre",
      "A magánhangzókat csak suttogva lehet kiejteni",
      "A magánhangzók mind kétjegyűek"
    ],
    correctIndex: 0,
    explanation: "A magánhangzók lényege, hogy a kiáramló levegő szabadon, akadály nélkül távozik a szájüregből."
  },
  {
    id: 7,
    category: 'maganhangzok',
    question: "Melyik szó segít megjegyezni a magyar nyelv MÉLY magánhangzóit?",
    options: ["teniszütő", "autó", "fésű", "szemüveg"],
    correctIndex: 1,
    explanation: "Az 'autó' (és a 'háború') szavak magánhangzói mind mélyek: a, u, ó!"
  },
  {
    id: 8,
    category: 'maganhangzok',
    question: "Melyik szó segít megjegyezni a MAGAS magánhangzókat?",
    options: ["autó", "háború", "teniszütő", "asztal"],
    correctIndex: 2,
    explanation: "A 'teniszütő' szó minden magánhangzója magas (e, i, ü, ő)!"
  },
  {
    id: 9,
    category: 'maganhangzok',
    question: "Melyik magánhangzó AJAKRÉSES az alábbiak közül?",
    options: ["o", "ó", "é", "u"],
    correctIndex: 2,
    explanation: "Az 'é' ejtésekor az ajkak mosolyszerű rést alkotnak (ajakréses). Az o, ó, u ajakkerekítésesek!"
  },
  {
    id: 10,
    category: 'maganhangzok',
    question: "Melyik sor tartalmaz KIZÁRÓLAG hosszú magánhangzókat?",
    options: [
      "a, e, i, o",
      "á, é, í, ó, ő, ú, ű",
      "á, e, ó, u",
      "ö, ő, ü, ű"
    ],
    correctIndex: 1,
    explanation: "Az á, é, í, ó, ő, ú, ű mind ékezettel ellátott hosszú magánhangzók."
  },

  // 3. Mássalhangzók (11-15. kérdés)
  {
    id: 11,
    category: 'massalhangzok',
    question: "Mi történik a levegővel a mássalhangzók képzésekor?",
    options: [
      "Akadályba ütközik (ajak, fog, nyelv vagy szájpadlás)",
      "Akadály nélkül kiáramlik",
      "Visszafordul a tüdőbe",
      "Csak a fülünkön át távozik"
    ],
    correctIndex: 0,
    explanation: "A mássalhangzók képzésekor a kiáramló levegő valamilyen akadályba ütközik a szájüregben."
  },
  {
    id: 12,
    category: 'massalhangzok',
    question: "Mi a magyarázata a ZÖNGÉS mássalhangzók képzésének?",
    options: [
      "A hangszalagok záródnak és rezegnek",
      "A hangszalagok nyitva maradnak és pihennek",
      "Az ajkak mozdulatlanok",
      "A levegő a fülünkön jön ki"
    ],
    correctIndex: 0,
    explanation: "Zöngés hangoknál a két hangszalag rezgése hozza létre a zöngetónust."
  },
  {
    id: 13,
    category: 'massalhangzok',
    question: "Melyik híres mondat segít felidézni az ÖSSZES zöngétlen mássalhangzót?",
    options: [
      "„Tyűha, pici, úszó kacsa, futás!”",
      "„Esik eső, fúj a szél.”",
      "„Gyors barna róka ugrik a lusta kutyán.”",
      "„Autó, háború és teniszütő.”"
    ],
    correctIndex: 0,
    explanation: "A „Tyűha, pici, úszó kacsa, futás!” mássalhangzói (ty, h, p, c, sz, k, cs, f, t, s) pontosan az összes zöngétlen hangot tartalmazzák!"
  },
  {
    id: 14,
    category: 'massalhangzok',
    question: "Hány jegyű mássalhangzó a 'dzs' a magyar ábécében?",
    options: ["Egyjegyű", "Kétjegyű", "Háromjegyű", "Négyjegyű"],
    correctIndex: 2,
    explanation: "A 'dzs' a magyar ábécé egyetlen három különálló betűből álló (háromjegyű) mássalhangzója."
  },
  {
    id: 15,
    category: 'massalhangzok',
    question: "Hogyan jelöljük a magyar helyesírásban a HOSSZÚ mássalhangzókat?",
    options: [
      "Ékezettel a betű tetején",
      "Megkettőzött betűvel (pl. tt, kk, ssz)",
      "Nagybetűvel a szó közepén",
      "Kötőjellel"
    ],
    correctIndex: 1,
    explanation: "A hosszú mássalhangzókat írásban megkettőzött betűvel jelöljük (pl. hal vs. hall, kasza vs. kassza)."
  },

  // 4. Hangrend és Illeszkedés (16-20. kérdés)
  {
    id: 16,
    category: 'hangrend',
    question: "Milyen hangrendű a 'virág' és a 'kávé' szó?",
    options: ["Mély hangrendű", "Magas hangrendű", "Vegyes hangrendű", "Egyik sem"],
    correctIndex: 2,
    explanation: "Mindkét szóban mély (á) és magas (i, é) magánhangzó is van, ezért vegyes hangrendűek!"
  },
  {
    id: 17,
    category: 'hangrend',
    question: "Melyik szó MAGAS hangrendű az alábbiak közül?",
    options: ["asztal", "madár", "szekrény", "csónak"],
    correctIndex: 2,
    explanation: "A 'szekrény' szóban csak magas magánhangzók vannak (e, é), ezért magas hangrendű."
  },
  {
    id: 18,
    category: 'hangrend',
    question: "Melyik szó MÉLY hangrendű az alábbiak közül?",
    options: ["autó", "cipő", "teniszütő", "kert"],
    correctIndex: 0,
    explanation: "Az 'autó' magánhangzói (a, u, ó) mind mélyek, ezért mély hangrendű."
  },
  {
    id: 19,
    category: 'hangrend',
    question: "Mi a szabály az összetett szavak (pl. Budapest, golyóstoll) toldalékolásakor?",
    options: [
      "Mindig a legelső szótag hangrendje dönt",
      "Mindig a legutolsó összetételi tag hangrendje dönt (pl. Budapest-en)",
      "Mindig csak mély toldalékot kaphatnak",
      "Tetszőlegesen választható a toldalék"
    ],
    correctIndex: 1,
    explanation: "Összetett szavaknál mindig a legutolsó összetételi tag (Budapest -> Pest = magas) hangrendje határozza meg a toldalékot."
  },
  {
    id: 20,
    category: 'hangrend',
    question: "Hogyan toldalékoljuk helyesen az 'asztal' és a 'szekrény' szavakat a -ban/-ben toldalékkal az illeszkedés törvénye szerint?",
    options: [
      "asztalben, szekrényban",
      "asztalban, szekrényben",
      "asztalban, szekrényban",
      "asztalben, szekrényben"
    ],
    correctIndex: 1,
    explanation: "Az illeszkedés törvénye alapján mély szóhoz mély toldalék (asztal-ban), magas szóhoz magas toldalék (szekrény-ben) jár."
  }
];
