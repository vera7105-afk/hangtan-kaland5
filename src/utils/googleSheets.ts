import { StudentProgress } from '@/types/grammar';

const STORAGE_KEY_SHEET_URL = 'hangok_google_sheet_url';

export const APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Ha üres a munkalap, fejléc és formázás létrehozása
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Időpont",
        "Tanuló neve",
        "Osztály",
        "Esemény",
        "Végső eredmény (Jegy)",
        "Százalék",
        "Csillagok",
        "1. Beszélőszervek %",
        "2. Magánhangzók %",
        "3. Mássalhangzók %",
        "4. Hangrend %",
        "5. Nagyteszt %"
      ]);
      // Fejléc kiemelése
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#e0e7ff");
      headerRange.setFontColor("#3730a3");
    }
    
    var studentName = (data.studentName || "Névtelen tanuló").toString().trim();
    var studentClass = (data.studentClass || "-").toString().trim();
    
    var rowData = [
      new Date().toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }),
      studentName,
      studentClass,
      data.event || "Végső eredmény",
      data.scoreText || "-",
      data.percentage !== undefined ? data.percentage + "%" : "-",
      data.stars || 0,
      data.moduleScores && data.moduleScores.beszeloszervek !== undefined ? data.moduleScores.beszeloszervek + "%" : "0%",
      data.moduleScores && data.moduleScores.maganhangzok !== undefined ? data.moduleScores.maganhangzok + "%" : "0%",
      data.moduleScores && data.moduleScores.massalhangzok !== undefined ? data.moduleScores.massalhangzok + "%" : "0%",
      data.moduleScores && data.moduleScores.hangrend !== undefined ? data.moduleScores.hangrend + "%" : "0%",
      data.moduleScores && data.moduleScores.nagyteszt !== undefined ? data.moduleScores.nagyteszt + "%" : "0%"
    ];
    
    // Meglévő tanuló megkeresése: ha már szerepel, frissítjük a sorát a legvégső eredménnyel
    var lastRow = sheet.getLastRow();
    var targetRow = -1;
    
    if (lastRow > 1) {
      var values = sheet.getRange(2, 2, lastRow - 1, 2).getValues();
      for (var i = 0; i < values.length; i++) {
        var existingName = String(values[i][0]).trim().toLowerCase();
        var existingClass = String(values[i][1]).trim().toLowerCase();
        if (existingName === studentName.toLowerCase() && 
            (studentClass === "-" || existingClass === "-" || existingClass === studentClass.toLowerCase())) {
          targetRow = i + 2;
          break;
        }
      }
    }
    
    if (targetRow > 0) {
      // Meglévő tanuló végső eredményének frissítése egyetlen sorban
      sheet.getRange(targetRow, 1, 1, 12).setValues([rowData]);
    } else {
      // Új tanuló végső eredményének mentése
      sheet.appendRow(rowData);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export interface SheetPayload {
  studentName: string;
  studentClass?: string;
  event: string;
  scoreText?: string;
  percentage?: number;
  stars?: number;
  moduleScores?: {
    beszeloszervek: number;
    maganhangzok: number;
    massalhangzok: number;
    hangrend: number;
    nagyteszt: number;
  };
}

export const GoogleSheetsService = {
  getScriptUrl(): string {
    if (typeof window === 'undefined') return '';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SHEET_URL);
      if (saved && saved.trim()) return saved.trim();
    } catch {}
    return process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || '';
  },

  setScriptUrl(url: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_SHEET_URL, url.trim());
    } catch (e) {
      console.error("Nem sikerült elmenteni a Google Sheet URL-t:", e);
    }
  },

  isConfigured(): boolean {
    return Boolean(this.getScriptUrl());
  },

  async sendPayload(payload: SheetPayload, customUrl?: string): Promise<boolean> {
    const url = (customUrl || this.getScriptUrl()).trim();
    if (!url) return false;

    try {
      // mode: 'no-cors' szükséges a Google Apps Script 302 átirányítása és CORS szabályai miatt
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (error) {
      console.warn("Google Sheet szinkronizálási hiba:", error);
      return false;
    }
  },

  async syncProgress(
    progress: StudentProgress,
    eventName: string = "Haladás frissítés",
    scoreText?: string,
    percentage?: number
  ): Promise<boolean> {
    if (!this.isConfigured()) return false;
    if (!progress.studentName) return false;

    const payload: SheetPayload = {
      studentName: progress.studentName,
      studentClass: progress.studentClass || '',
      event: eventName,
      scoreText: scoreText || `${progress.stars} csillag`,
      percentage: percentage,
      stars: progress.stars,
      moduleScores: progress.moduleScores,
    };

    return this.sendPayload(payload);
  },

  async sendTestRow(urlToTest?: string): Promise<boolean> {
    const payload: SheetPayload = {
      studentName: "Minta Tanuló (Teszt)",
      studentClass: "5.a",
      event: "Végső eredmény (Teszt kapcsolat)",
      scoreText: "20/20 (5 - Jeles)",
      percentage: 100,
      stars: 10,
      moduleScores: {
        beszeloszervek: 100,
        maganhangzok: 100,
        massalhangzok: 100,
        hangrend: 100,
        nagyteszt: 100,
      },
    };

    return this.sendPayload(payload, urlToTest);
  }
};
