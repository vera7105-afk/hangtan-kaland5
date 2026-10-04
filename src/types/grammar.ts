export interface SpeechOrganStation {
  id: number;
  name: string;
  shortRole: string;
  description: string;
  iconName: string;
  airFlowOrder: number; // 1 to 6
  subParts?: {
    name: string;
    description: string;
    example: string;
  }[];
}

export interface VowelItem {
  letter: string;
  isLong: boolean;
  horizontal: 'mély' | 'magas';
  lip: 'ajakkerekítéses' | 'ajakréses';
  mnemonic?: string;
}

export interface ConsonantItem {
  letter: string;
  letterCount: 'egyjegyű' | 'kétjegyű' | 'háromjegyű';
  isVoiced: boolean; // true = zöngés, false = zöngétlen
  isLong: boolean;
  pairLetter?: string; // Informative pair for Kisokos theory
}

export interface WordHarmonyItem {
  word: string;
  vowels: string[];
  category: 'mély' | 'magas' | 'vegyes';
  isCompound?: boolean;
  isForeign?: boolean;
  note?: string;
  suffixExercise?: {
    baseWord?: string;
    suffixGroup: string; // e.g. "-ban / -ben"
    correctSuffix: string;
    options: string[];
    resultWord: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: 'beszeloszervek' | 'maganhangzok' | 'massalhangzok' | 'hangrend';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface StudentProgress {
  stars: number;
  completedModules: {
    beszeloszervek: boolean;
    maganhangzok: boolean;
    massalhangzok: boolean;
    hangrend: boolean;
    nagyteszt: boolean;
  };
  moduleScores: {
    beszeloszervek: number;
    maganhangzok: number;
    massalhangzok: number;
    hangrend: number;
    nagyteszt: number;
  };
  studentName?: string;
  studentClass?: string;
  lastSyncTimestamp?: string;
}
