import { VowelItem } from '@/types/grammar';

export const ALL_VOWELS: VowelItem[] = [
  { letter: 'a', isLong: false, horizontal: 'mély', lip: 'ajakkerekítéses' },
  { letter: 'á', isLong: true,  horizontal: 'mély', lip: 'ajakréses' },
  { letter: 'e', isLong: false, horizontal: 'magas', lip: 'ajakréses' },
  { letter: 'é', isLong: true,  horizontal: 'magas', lip: 'ajakréses' },
  { letter: 'i', isLong: false, horizontal: 'magas', lip: 'ajakréses' },
  { letter: 'í', isLong: true,  horizontal: 'magas', lip: 'ajakréses' },
  { letter: 'o', isLong: false, horizontal: 'mély', lip: 'ajakkerekítéses' },
  { letter: 'ó', isLong: true,  horizontal: 'mély', lip: 'ajakkerekítéses' },
  { letter: 'ö', isLong: false, horizontal: 'magas', lip: 'ajakkerekítéses' },
  { letter: 'ő', isLong: true,  horizontal: 'magas', lip: 'ajakkerekítéses' },
  { letter: 'u', isLong: false, horizontal: 'mély', lip: 'ajakkerekítéses' },
  { letter: 'ú', isLong: true,  horizontal: 'mély', lip: 'ajakkerekítéses' },
  { letter: 'ü', isLong: false, horizontal: 'magas', lip: 'ajakkerekítéses' },
  { letter: 'ű', isLong: true,  horizontal: 'magas', lip: 'ajakkerekítéses' },
];

export const VOWEL_ODD_ONE_OUT_GAMES = [
  {
    id: 1,
    title: "1. Kakukktojás: Időtartam",
    prompt: "Melyik magánhangzó lóg ki időtartam szerint?",
    options: ["a", "e", "í", "o"],
    correctAnswer: "í",
    explanation: "Az 'í' hosszú magánhangzó, míg az 'a', 'e', 'o' mind rövidek!"
  },
  {
    id: 2,
    title: "2. Kakukktojás: A nyelv mozgása (Hangrend)",
    prompt: "Melyik magánhangzó lóg ki a nyelv vízszintes mozgása szerint?",
    options: ["ö", "ü", "e", "á"],
    correctAnswer: "á",
    explanation: "Az 'á' mély magánhangzó (autó), míg az 'ö', 'ü', 'e' mind magasak (teniszütő)!"
  },
  {
    id: 3,
    title: "3. Kakukktojás: Ajkak állása",
    prompt: "Melyik magánhangzó kakukktojás az ajkak állása szerint?",
    options: ["o", "u", "é", "ö"],
    correctAnswer: "é",
    explanation: "Az 'é' ajakréses hang (mosoly), míg az 'o', 'u', 'ö' ajakkerekítésesek!"
  },
  {
    id: 4,
    title: "4. Kakukktojás: Ajakállás a mély hangoknál",
    prompt: "A mély hangok közül melyik az egyetlen ajakréses?",
    options: ["a", "á", "o", "u"],
    correctAnswer: "á",
    explanation: "Bravó! Az 'á' mély, de ajakréses! Az 'a', 'o', 'ó', 'u', 'ú' mind kerekítésesek."
  },
  {
    id: 5,
    title: "5. Kakukktojás: Magas és kerekítéses",
    prompt: "Melyik magánhangzó NEM ajakkerekítéses a magasak közül?",
    options: ["ö", "ü", "ő", "i"],
    correctAnswer: "i",
    explanation: "Az 'i' ajakréses, míg az 'ö', 'ü', 'ő' magas és kerekítéses!"
  },
  {
    id: 6,
    title: "6. Kakukktojás: Hosszú magánhangzók",
    prompt: "Melyik magánhangzó rövid az alábbiak közül?",
    options: ["á", "é", "ó", "u"],
    correctAnswer: "u",
    explanation: "Az 'u' rövid magánhangzó, míg az 'á', 'é', 'ó' mind hosszúak!"
  },
  {
    id: 7,
    title: "7. Kakukktojás: Mély magánhangzók",
    prompt: "Melyik magánhangzó NEM mély (nem illik az autó/háború sorba)?",
    options: ["a", "o", "u", "i"],
    correctAnswer: "i",
    explanation: "Az 'i' magas magánhangzó, az 'a', 'o', 'u' mind mélyek!"
  },
  {
    id: 8,
    title: "8. Kakukktojás: Magas magánhangzók",
    prompt: "Melyik magánhangzó lóg ki a magasak közül?",
    options: ["e", "é", "ö", "ó"],
    correctAnswer: "ó",
    explanation: "Az 'ó' mély magánhangzó, míg az 'e', 'é', 'ö' magasak!"
  },
  {
    id: 9,
    title: "9. Kakukktojás: Ajakréses hangok",
    prompt: "Melyik magánhangzó ajakkerekítéses a felsoroltak közül?",
    options: ["e", "é", "i", "o"],
    correctAnswer: "o",
    explanation: "Az 'o' kiejtésekor kerekítjük az ajkunkat, a többi (e, é, i) mind ajakréses!"
  },
  {
    id: 10,
    title: "10. Kakukktojás: Rövid magánhangzók",
    prompt: "Melyik magánhangzó hosszú az alábbiak közül?",
    options: ["e", "o", "ö", "ú"],
    correctAnswer: "ú",
    explanation: "Az 'ú' hosszú magánhangzó (ékezettel írjuk), a többi (e, o, ö) mind rövid!"
  }
];

export const VOWEL_MNEMONICS = {
  mely: {
    title: "Mély magánhangzók",
    letters: ["a", "á", "o", "ó", "u", "ú"],
    words: "autó, háború",
    tip: "A nyelv hátrahúzódik a képzéskor. Mondd ki: a-á-o-ó-u-ú, és érezni fogod!"
  },
  magas: {
    title: "Magas magánhangzók",
    letters: ["e", "é", "i", "í", "ö", "ő", "ü", "ű"],
    words: "teniszütő",
    tip: "A nyelv előretolódik a szájüregben. A 'teniszütő' minden magánhangzója magas!"
  }
};
