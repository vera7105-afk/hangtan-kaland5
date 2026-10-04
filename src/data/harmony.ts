import { WordHarmonyItem } from '@/types/grammar';

// A szavak vegyesen, keverve vannak felsorolva (mély, magas és vegyes váltakozva)
export const HARMONY_WORDS: WordHarmonyItem[] = [
  {
    word: "vonalzóval",
    vowels: ["o", "a", "ó", "a"],
    category: "mély",
    note: "Csak mély magánhangzókat tartalmaz (o, a, ó, a), így a toldalék (-val) is mély!",
    suffixExercise: {
      baseWord: "vonalzó",
      suffixGroup: "-val / -vel",
      correctSuffix: "-val",
      options: ["-val", "-vel"],
      resultWord: "vonalzóval"
    }
  },
  {
    word: "tündérekkel",
    vowels: ["ü", "é", "e", "e"],
    category: "magas",
    note: "Csak magas magánhangzókat tartalmaz (ü, é, e), a toldalék (-kel) is magas hangrendű!",
    suffixExercise: {
      baseWord: "tündérek",
      suffixGroup: "-kel / -kal",
      correctSuffix: "-kel",
      options: ["-kel", "-kal"],
      resultWord: "tündérekkel"
    }
  },
  {
    word: "virág",
    vowels: ["i", "á"],
    category: "vegyes",
    note: "Az 'i' magas, az 'á' mély magánhangzó. Ezért vegyes hangrendű!",
    suffixExercise: {
      baseWord: "virág",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ban",
      options: ["-ban", "-ben"],
      resultWord: "virágban"
    }
  },
  {
    word: "autó",
    vowels: ["a", "u", "ó"],
    category: "mély",
    note: "Az 'a', 'u', 'ó' mind mély magánhangzók.",
    suffixExercise: {
      baseWord: "autó",
      suffixGroup: "-on / -en / -ön",
      correctSuffix: "-n",
      options: ["-n", "-en", "-ön"],
      resultWord: "autón"
    }
  },
  {
    word: "őzikét",
    vowels: ["ő", "i", "é"],
    category: "magas",
    note: "Kizárólag magas magánhangzók találhatók benne (ő, i, é).",
    suffixExercise: {
      baseWord: "őzike",
      suffixGroup: "-t / -at",
      correctSuffix: "-t",
      options: ["-t", "-at"],
      resultWord: "őzikét"
    }
  },
  {
    word: "óriásokat",
    vowels: ["ó", "i", "á", "o", "a"],
    category: "vegyes",
    note: "Mély (ó, á, o, a) és magas (i) hang is van benne. Vegyes hangrendű szó, mély toldalékkal (-okat)!",
    suffixExercise: {
      baseWord: "óriás",
      suffixGroup: "-okat / -eket",
      correctSuffix: "-okat",
      options: ["-okat", "-eket"],
      resultWord: "óriásokat"
    }
  },
  {
    word: "madár",
    vowels: ["a", "á"],
    category: "mély",
    note: "Az 'a' és 'á' egyaránt mély magánhangzó.",
    suffixExercise: {
      baseWord: "madár",
      suffixGroup: "-nak / -nek",
      correctSuffix: "-nak",
      options: ["-nak", "-nek"],
      resultWord: "madárnak"
    }
  },
  {
    word: "cipő",
    vowels: ["i", "ő"],
    category: "magas",
    note: "Az 'i' és az 'ő' magas magánhangzó.",
    suffixExercise: {
      baseWord: "cipő",
      suffixGroup: "-vel / -val",
      correctSuffix: "-vel",
      options: ["-val", "-vel"],
      resultWord: "cipővel"
    }
  },
  {
    word: "kávé",
    vowels: ["á", "é"],
    category: "vegyes",
    note: "Az 'á' mély, az 'é' magas hang – vegyes hangrend.",
    suffixExercise: {
      baseWord: "kávé",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ban",
      options: ["-ban", "-ben"],
      resultWord: "kávéban"
    }
  },
  {
    word: "asztal",
    vowels: ["a", "a"],
    category: "mély",
    note: "Csak mély magánhangzókat tartalmaz (a, a).",
    suffixExercise: {
      baseWord: "asztal",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ban",
      options: ["-ban", "-ben"],
      resultWord: "asztalban"
    }
  },
  {
    word: "szekrényben",
    vowels: ["e", "é", "e"],
    category: "magas",
    note: "Csak magas magánhangzókat tartalmaz (e, é, e), a toldalék (-ben) is magas.",
    suffixExercise: {
      baseWord: "szekrény",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ben",
      options: ["-ban", "-ben"],
      resultWord: "szekrényben"
    }
  },
  {
    word: "csikó",
    vowels: ["i", "ó"],
    category: "vegyes",
    note: "Az 'i' magas, az 'ó' mély – vegyes hangrend.",
    suffixExercise: {
      baseWord: "csikó",
      suffixGroup: "-nak / -nek",
      correctSuffix: "-nak",
      options: ["-nak", "-nek"],
      resultWord: "csikónak"
    }
  },
  {
    word: "csónakban",
    vowels: ["ó", "a", "a"],
    category: "mély",
    note: "Az 'ó' és 'a' mély magánhangzók, a toldalék (-ban) is mély hangrendű.",
    suffixExercise: {
      baseWord: "csónak",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ban",
      options: ["-ban", "-ben"],
      resultWord: "csónakban"
    }
  },
  {
    word: "kert",
    vowels: ["e"],
    category: "magas",
    note: "Egyetlen magánhangzója van, az 'e', ami magas.",
    suffixExercise: {
      baseWord: "kert",
      suffixGroup: "-be / -ba",
      correctSuffix: "-be",
      options: ["-ba", "-be"],
      resultWord: "kertbe"
    }
  },
  {
    word: "békával",
    vowels: ["é", "a", "a"],
    category: "vegyes",
    note: "Az 'é' magas, az 'a' mély – a vegyes szóhoz mély toldalék (-val) kapcsolódik.",
    suffixExercise: {
      baseWord: "béka",
      suffixGroup: "-val / -vel",
      correctSuffix: "-val",
      options: ["-val", "-vel"],
      resultWord: "békával"
    }
  },
  {
    word: "kapu",
    vowels: ["a", "u"],
    category: "mély",
    note: "Az 'a' és az 'u' mély magánhangzók.",
    suffixExercise: {
      baseWord: "kapu",
      suffixGroup: "-ra / -re",
      correctSuffix: "-ra",
      options: ["-ra", "-re"],
      resultWord: "kapura"
    }
  },
  {
    word: "erdőben",
    vowels: ["e", "ő", "e"],
    category: "magas",
    note: "Minden magánhangzója magas (e, ő, e), a toldalék (-ben) is magas.",
    suffixExercise: {
      baseWord: "erdő",
      suffixGroup: "-ban / -ben",
      correctSuffix: "-ben",
      options: ["-ban", "-ben"],
      resultWord: "erdőben"
    }
  },
  {
    word: "papíron",
    vowels: ["a", "í", "o"],
    category: "vegyes",
    note: "Az 'a' és 'o' mély, az 'í' magas – vegyes hangrendű szó mély toldalékkal (-on)!",
    suffixExercise: {
      baseWord: "papír",
      suffixGroup: "-on / -en / -ön",
      correctSuffix: "-on",
      options: ["-on", "-en", "-ön"],
      resultWord: "papíron"
    }
  }
];

export const HARMONY_RULES_SUMMARY = [
  {
    title: "Mély hangrendű szavak",
    description: "Kizárólag mély magánhangzókat (a, á, o, ó, u, ú) tartalmaznak.",
    examples: "asztal, madár, autó, ház, kanál, vonalzó",
    suffixRule: "Mély toldalék jár hozzájuk: asztal-on, madár-nak, vonalzó-val."
  },
  {
    title: "Magas hangrendű szavak",
    description: "Kizárólag magas magánhangzókat (e, é, i, í, ö, ő, ü, ű) tartalmaznak.",
    examples: "szekrény, cipő, kert, fésű, tündér, őzike",
    suffixRule: "Magas toldalék jár hozzájuk: szekrény-ben, cipő-vel, tündér-ekkel, fésű-höz."
  },
  {
    title: "Vegyes hangrendű szavak",
    description: "Mély és magas magánhangzó is előfordul bennük.",
    examples: "virág, kávé, csikó, béka, óriás, papír",
    suffixRule: "Általában mély toldalékot kapnak: virág-ban, kávé-nak, óriás-okat, papír-on."
  },
  {
    title: "Kivétel 1: Összetett szavak",
    description: "A hangrendi törvény nem köti őket össze! Toldalékoláskor mindig a legutolsó szóösszetételi tag hangrendje dönt.",
    examples: "Budapest (Buda + Pest) -> Budapest-en!",
    suffixRule: "Mindig az utolsó taghoz illeszkedik a toldalék."
  },
  {
    title: "Kivétel 2: Idegen szavak",
    description: "A más nyelvekből átvett szavakban szabadon keveredhetnek a hangok.",
    examples: "sofőr, kosztüm, paróka, oxigén",
    suffixRule: "Toldalékoláskor az utolsó kiejtett magánhangzó hangrendje a döntő: sofőr-höz, kosztüm-ben."
  }
];
