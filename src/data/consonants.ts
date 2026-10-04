import { ConsonantItem } from '@/types/grammar';

export const CONSONANT_ITEMS: ConsonantItem[] = [
  // Egyjegyű zöngések
  { letter: 'b', letterCount: 'egyjegyű', isVoiced: true, isLong: false, pairLetter: 'p' },
  { letter: 'd', letterCount: 'egyjegyű', isVoiced: true, isLong: false, pairLetter: 't' },
  { letter: 'g', letterCount: 'egyjegyű', isVoiced: true, isLong: false, pairLetter: 'k' },
  { letter: 'v', letterCount: 'egyjegyű', isVoiced: true, isLong: false, pairLetter: 'f' },
  { letter: 'z', letterCount: 'egyjegyű', isVoiced: true, isLong: false, pairLetter: 'sz' },
  { letter: 'j', letterCount: 'egyjegyű', isVoiced: true, isLong: false },
  { letter: 'l', letterCount: 'egyjegyű', isVoiced: true, isLong: false },
  { letter: 'm', letterCount: 'egyjegyű', isVoiced: true, isLong: false },
  { letter: 'n', letterCount: 'egyjegyű', isVoiced: true, isLong: false },
  { letter: 'r', letterCount: 'egyjegyű', isVoiced: true, isLong: false },

  // Egyjegyű zöngétlenek
  { letter: 'p', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'b' },
  { letter: 't', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'd' },
  { letter: 'k', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'g' },
  { letter: 'f', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'v' },
  { letter: 's', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'zs' },
  { letter: 'c', letterCount: 'egyjegyű', isVoiced: false, isLong: false, pairLetter: 'dz' },
  { letter: 'h', letterCount: 'egyjegyű', isVoiced: false, isLong: false },

  // Kétjegyű zöngések
  { letter: 'zs', letterCount: 'kétjegyű', isVoiced: true, isLong: false, pairLetter: 's' },
  { letter: 'dz', letterCount: 'kétjegyű', isVoiced: true, isLong: false, pairLetter: 'c' },
  { letter: 'gy', letterCount: 'kétjegyű', isVoiced: true, isLong: false, pairLetter: 'ty' },
  { letter: 'ly', letterCount: 'kétjegyű', isVoiced: true, isLong: false },
  { letter: 'ny', letterCount: 'kétjegyű', isVoiced: true, isLong: false },

  // Kétjegyű zöngétlenek
  { letter: 'sz', letterCount: 'kétjegyű', isVoiced: false, isLong: false, pairLetter: 'z' },
  { letter: 'cs', letterCount: 'kétjegyű', isVoiced: false, isLong: false, pairLetter: 'dzs' },
  { letter: 'ty', letterCount: 'kétjegyű', isVoiced: false, isLong: false, pairLetter: 'gy' },

  // Háromjegyű zöngés
  { letter: 'dzs', letterCount: 'háromjegyű', isVoiced: true, isLong: false, pairLetter: 'cs' },
];

export const CONSONANT_THEORY_PAIRS = [
  { voiced: 'b', unvoiced: 'p' },
  { voiced: 'd', unvoiced: 't' },
  { voiced: 'g', unvoiced: 'k' },
  { voiced: 'v', unvoiced: 'f' },
  { voiced: 'z', unvoiced: 'sz' },
  { voiced: 'zs', unvoiced: 's' },
  { voiced: 'gy', unvoiced: 'ty' },
  { voiced: 'dz', unvoiced: 'c' },
  { voiced: 'dzs', unvoiced: 'cs' },
];

export const UNVOICED_MNEMONIC = {
  sentence: "Tyűha, pici, úszó kacsa, futás!",
  consonants: ["ty", "h", "p", "c", "sz", "k", "cs", "f", "t", "s"],
  breakdown: [
    { word: "Tyűha", highlighted: ["ty", "h"] },
    { word: "pici", highlighted: ["p", "c"] },
    { word: "úszó", highlighted: ["sz"] },
    { word: "kacsa", highlighted: ["k", "cs"] },
    { word: "futás", highlighted: ["f", "t", "s"] }
  ],
  explanation: "Ez a mondat tartalmazza a magyar nyelv ÖSSZES zöngétlen mássalhangzóját! Ha egy mássalhangzó nincs benne ebben a mondatban, az biztosan ZÖNGÉS!"
};

export const CONSONANT_QUIZ_DATA = [
  {
    id: 1,
    question: "Mikor beszélünk ZÖNGÉS mássalhangzóról?",
    options: [
      "Amikor a hangszalagok zárva vannak és rezegnek",
      "Amikor a tüdő leáll",
      "Amikor a hangszalagok nyitva vannak és egyáltalán nem rezegnek",
      "Amikor csak a fogunkkal képezzük a hangot"
    ],
    correctIndex: 0,
    explanation: "A zöngés hangok képzésekor a két hangszalag záródik és rezeg (ezt a torkodra téve a kezed érezheted is!)."
  },
  {
    id: 2,
    question: "Hány jegyű mássalhangzó a 'dzs' a magyar ábécében?",
    options: ["Egyjegyű", "Kétjegyű", "Háromjegyű", "Négyjegyű"],
    correctIndex: 2,
    explanation: "A 'dzs' az egyetlen három külön írásjegyből álló, de egyetlen beszédhangot jelölő betűnk."
  },
  {
    id: 3,
    question: "A 'Tyűha, pici, úszó kacsa, futás!' emlékeztető mondat melyik csoport hangjait tartalmazza?",
    options: ["Az összes zöngés mássalhangzót", "Az összes zöngétlen mássalhangzót", "A mély magánhangzókat", "A kétjegyű betűket"],
    correctIndex: 1,
    explanation: "Ez a híres mondat az összes zöngétlen mássalhangzót hiánytalanul összegyűjti!"
  },
  {
    id: 4,
    question: "Melyik állítás igaz a 'gy' mássalhangzóra?",
    options: [
      "Kétjegyű és zöngés",
      "Egyjegyű és zöngétlen",
      "Háromjegyű és zöngés",
      "Kétjegyű és zöngétlen"
    ],
    correctIndex: 0,
    explanation: "A 'gy' két írásjegyből áll (kétjegyű), és zöngés (nincs benne a zöngétlen kacsa mondatban)."
  },
  {
    id: 5,
    question: "Miben különbözik a mássalhangzók képzése alapvetően a magánhangzókétól?",
    options: [
      "A kiáramló levegő valamilyen akadályba (ajak, fog, nyelv, szájpadlás) ütközik",
      "A mássalhangzóknál nem kell levegő",
      "A mássalhangzókat nem lehet kimondani",
      "A mássalhangzók mind ékezetesek"
    ],
    correctIndex: 0,
    explanation: "A mássalhangzók képzésekor a kiáramló levegő valamilyen akadályba (ajak, fog, szájpadlás) ütközik."
  },
  {
    id: 6,
    question: "Melyik mássalhangzó ZÖNGÉTLEN az alábbiak közül (nem rezeg a hangszalag)?",
    options: ["b", "d", "t", "g"],
    correctIndex: 2,
    explanation: "A 't' hang kiejtésekor nem rezegnek a hangszalagok (benne van a zöngétlen 'fuTás' szóban)."
  },
  {
    id: 7,
    question: "Hány jegyű mássalhangzók a 'cs', 'sz', 'zs' és 'ny' betűk?",
    options: ["Egyjegyű", "Kétjegyű", "Háromjegyű", "Négyjegyű"],
    correctIndex: 1,
    explanation: "Két karakterből (írásjegyből) állnak, de egyetlen beszédhangot jelölnek a magyar ábécében."
  },
  {
    id: 8,
    question: "Melyik betű EGYJEGYŰ mássalhangzó az alábbiak közül?",
    options: ["ty", "dzs", "m", "ly"],
    correctIndex: 2,
    explanation: "Az 'm' egyetlen karakterből áll (egyjegyű), míg a ty, ly kétjegyű, a dzs pedig háromjegyű."
  },
  {
    id: 9,
    question: "Zöngés vagy zöngétlen a 'z' és a 'zs' mássalhangzó?",
    options: [
      "Mindkettő zöngés (rezegnek a hangszalagok)",
      "Mindkettő zöngétlen",
      "A 'z' zöngétlen, a 'zs' zöngés",
      "Egyik sem"
    ],
    correctIndex: 0,
    explanation: "A 'z' és a 'zs' ejtésekor erősen rezeg a gégénk: mindkettő zöngés!"
  },
  {
    id: 10,
    question: "Hogyan jelöljük a magyar helyesírásban a HOSSZÚ mássalhangzókat?",
    options: [
      "Ékezettel a betű tetején",
      "Megkettőzött betűvel (pl. tt, kk, ssz)",
      "Nagybetűvel",
      "Felkiáltójellel"
    ],
    correctIndex: 1,
    explanation: "A hosszú mássalhangzókat írásban megkettőzött betűvel jelöljük (egyjegyűnél kettőzéssel: pl. tt; kétjegyűnél egyszerűsített kettőzéssel: pl. ssz)."
  }
];
