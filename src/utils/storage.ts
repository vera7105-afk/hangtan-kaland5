import { StudentProgress } from '@/types/grammar';

const STORAGE_KEY = 'hangok_nyelvtan_haladas_v1';

const defaultProgress: StudentProgress = {
  stars: 0,
  completedModules: {
    beszeloszervek: false,
    maganhangzok: false,
    massalhangzok: false,
    hangrend: false,
    nagyteszt: false,
  },
  moduleScores: {
    beszeloszervek: 0,
    maganhangzok: 0,
    massalhangzok: 0,
    hangrend: 0,
    nagyteszt: 0,
  },
  studentName: '',
  studentClass: '',
};

const MODULE_TITLES: Record<keyof StudentProgress['completedModules'], string> = {
  beszeloszervek: '1. Beszélőszervek',
  maganhangzok: '2. Magánhangzók',
  massalhangzok: '3. Mássalhangzók',
  hangrend: '4. Hangrend',
  nagyteszt: '5. Mindentudó Nagyteszt',
};

export const StorageService = {
  getProgress(): StudentProgress {
    if (typeof window === 'undefined') return defaultProgress;
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  },

  saveProgress(progress: StudentProgress): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Nem sikerült elmenteni a haladást:", e);
    }
  },

  completeModule(moduleKey: keyof StudentProgress['completedModules'], score: number, starsEarned: number): StudentProgress {
    const current = this.getProgress();
    const wasCompleted = current.completedModules[moduleKey];

    const updated: StudentProgress = {
      ...current,
      completedModules: {
        ...current.completedModules,
        [moduleKey]: true,
      },
      moduleScores: {
        ...current.moduleScores,
        [moduleKey]: Math.max(current.moduleScores[moduleKey], score),
      },
      stars: wasCompleted ? current.stars : current.stars + starsEarned,
      lastSyncTimestamp: new Date().toISOString(),
    };

    this.saveProgress(updated);

    return updated;
  },

  setStudentName(name: string): void {
    const current = this.getProgress();
    current.studentName = name.trim();
    this.saveProgress(current);
  },

  setStudentClass(className: string): void {
    const current = this.getProgress();
    current.studentClass = className.trim();
    this.saveProgress(current);
  },

  setStudentInfo(name: string, className?: string): StudentProgress {
    const current = this.getProgress();
    current.studentName = name.trim();
    if (className !== undefined) {
      current.studentClass = className.trim();
    }
    this.saveProgress(current);

    return current;
  },

  resetProgress(): StudentProgress {
    this.saveProgress(defaultProgress);
    return defaultProgress;
  }
};
