'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageService } from '@/utils/storage';
import { GoogleSheetsService } from '@/utils/googleSheets';
import { SoundEngine } from '@/utils/audio';
import { StudentProgress } from '@/types/grammar';
import { Sparkles, Star, Award, BookOpen, ArrowRight, CheckCircle2, RotateCcw, Send, Check } from 'lucide-react';

export default function HomePage() {
  const [progress, setProgress] = useState<StudentProgress>(StorageService.getProgress());
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const current = StorageService.getProgress();
    setProgress(current);
    if (current.studentName) {
      setStudentName(current.studentName);
    }
    if (current.studentClass) {
      setStudentClass(current.studentClass);
    }

    const handleUpdate = () => {
      const p = StorageService.getProgress();
      setProgress(p);
      if (p.studentName) setStudentName(p.studentName);
      if (p.studentClass) setStudentClass(p.studentClass);
    };
    window.addEventListener('progress_updated', handleUpdate);
    return () => window.removeEventListener('progress_updated', handleUpdate);
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    SoundEngine.playClick();
    const updated = StorageService.setStudentInfo(studentName.trim(), studentClass.trim());
    setProgress(updated);
    setIsEditingName(false);
  };

  const handleManualSync = async () => {
    if (!studentName.trim()) {
      alert("Kérlek, add meg a neved a beküldés előtt!");
      setIsEditingName(true);
      return;
    }

    if (!progress.completedModules.nagyteszt) {
      const confirmSend = window.confirm(
        "A tanári táblázatba a legvégső eredmény (5. Mindentudó Nagyteszt) kerül rögzítésre automatikusan a teszt végén.\n\nA nagytesztet még nem fejezted be. Biztosan elküldöd most a jelenlegi pontjaidat?"
      );
      if (!confirmSend) return;
    }

    setIsSyncing(true);
    SoundEngine.playClick();

    const nagytesztScore = progress.moduleScores.nagyteszt;
    let grade = "5 (Jeles)";
    if (nagytesztScore < 40) grade = "Gyakorolj még!";
    else if (nagytesztScore < 60) grade = "3 (Közepes)";
    else if (nagytesztScore < 85) grade = "4 (Jó)";

    const scoreSummary = progress.completedModules.nagyteszt
      ? `Nagyteszt: ${nagytesztScore}% (${grade})`
      : `${progress.stars} csillag`;

    const success = await GoogleSheetsService.syncProgress(
      progress,
      progress.completedModules.nagyteszt ? "Végső eredmény beküldve (Főoldal)" : "Részeredmény beküldve (Főoldal)",
      scoreSummary,
      progress.completedModules.nagyteszt ? nagytesztScore : undefined
    );
    setIsSyncing(false);
    if (success) {
      SoundEngine.playCorrect();
      setSyncMessage("✅ Eredményeid sikeresen elküldve a tanári táblázatba!");
      setTimeout(() => setSyncMessage(null), 4000);
    } else {
      SoundEngine.playWrong();
      setSyncMessage("⚠️ A tanári táblázat nincs beállítva vagy nem elérhető.");
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Biztosan törölni szeretnéd a megszerzett pontokat és csillagokat?")) {
      SoundEngine.playWrong();
      const fresh = StorageService.resetProgress();
      setProgress(fresh);
      setStudentName('');
      setStudentClass('');
      window.dispatchEvent(new Event('progress_updated'));
    }
  };

  const modules = [
    {
      id: 'kisokos',
      href: '/kisokos',
      icon: '📖',
      title: 'Hangtani kisokos',
      desc: 'Színes összefoglaló kártyák a szabályokról, az emlékeztető szavakról és a zöngés-zöngétlen párok hivatalos táblázatáról.',
      badge: 'Elméleti háttér & táblázatok',
      isCompleted: true,
      score: 100,
      accentColor: '#6366f1',
      bgColor: '#eef2ff'
    },
    {
      id: 'beszeloszervek',
      href: '/beszeloszervek',
      icon: '🗣️',
      title: '1. Beszélőszervek és a hangképzés',
      desc: 'A levegő útja (6 állomás): 1. Tüdő, 2. Légcső, 3. gégefőben a 2 hangszalag, 4. Garatüregben az ínycsap, 5. Orrüreg, 6. Szájüreg (a 4 belső szervvel).',
      badge: '6 állomásos modell & sorrendező',
      isCompleted: progress.completedModules.beszeloszervek,
      score: progress.moduleScores.beszeloszervek,
      accentColor: '#0ea5e9',
      bgColor: '#f0f9ff'
    },
    {
      id: 'maganhangzok',
      href: '/maganhangzok',
      icon: '🅰️',
      title: '2. Magánhangzók csoportosítása',
      desc: 'A levegő nem ütközik akadályba! Időtartam, nyelv mozgása és ajkak állása (kerekítéses vs réses).',
      badge: 'Kosarazó játék & kakukktojás',
      isCompleted: progress.completedModules.maganhangzok,
      score: progress.moduleScores.maganhangzok,
      accentColor: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      id: 'massalhangzok',
      href: '/massalhangzok',
      icon: '🧩',
      title: '3. Mássalhangzók csoportosítása',
      desc: 'Akadályba ütköző levegő: zöngés és zöngétlen hangok, a zöngétlenek varázsmondata („Tyűha, pici...”), betűjegyek száma és időtartam.',
      badge: 'Zönge-detektor & betűszámláló',
      isCompleted: progress.completedModules.massalhangzok,
      score: progress.moduleScores.massalhangzok,
      accentColor: '#8b5cf6',
      bgColor: '#f5f3ff'
    },
    {
      id: 'hangrend',
      href: '/hangrend',
      icon: '🎵',
      title: '4. Hangrend és illeszkedés',
      desc: 'Mély, magas és vegyes szavak hangrendi csoportosítása, toldalék-ragasztó kihívás egyszerű és toldalékos szavakkal.',
      badge: 'Szóválogató & toldalék-ragasztó',
      isCompleted: progress.completedModules.hangrend,
      score: progress.moduleScores.hangrend,
      accentColor: '#ec4899',
      bgColor: '#fdf2f8'
    },
    {
      id: 'nagyteszt',
      href: '/nagyteszt',
      icon: '🏆',
      title: '5. Mindentudó nagyteszt & Oklevél',
      desc: 'Átfogó kérdések az 5. osztályos tananyagból. Érj el szép eredményt, és töltsd le vagy nyomtasd ki a névre szóló dicsérő oklevelet!',
      badge: '20 kérdés + Dicsérő Oklevél',
      isCompleted: progress.completedModules.nagyteszt,
      score: progress.moduleScores.nagyteszt,
      accentColor: '#10b981',
      bgColor: '#ecfdf5'
    }
  ];

  return (
    <div>
      {/* Hero szekció */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', paddingTop: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: '#e0e7ff', color: '#4338ca', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem' }}>
          <Sparkles size={16} />
          <span>Interaktív 5. osztályos magyar nyelvtan</span>
        </div>

        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '0.75rem', color: '#0f172a' }}>
          Hangtan kaland
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 1.75rem', lineHeight: '1.5' }}>
          Tanuld meg és gyakorold játékosan a <strong>beszélőszerveket</strong>, a <strong>magánhangzókat</strong>, a <strong>mássalhangzókat</strong> és a <strong>hangrendet</strong>!
        </p>

        {/* Tanuló köszöntő & Név beállítása */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--border)', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {studentName && !isEditingName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                👋 Üdvözlünk, <strong>{studentName}</strong>{studentClass ? <span style={{ color: 'var(--primary)', marginLeft: '0.3rem' }}>({studentClass})</span> : ''}!
              </span>
              <button
                onClick={() => setIsEditingName(true)}
                style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              >
                Módosítás
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Neved:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Pl. Kovács Anna"
                style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.6rem', fontSize: '0.9rem', fontWeight: 600, outline: 'none', minWidth: '130px' }}
                required
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>Osztály:</span>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Pl. 5.a"
                style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '0.35rem 0.5rem', fontSize: '0.9rem', fontWeight: 600, outline: 'none', width: '65px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                Mentés
              </button>
            </form>
          )}

          <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800, color: '#d97706' }}>
            <Star size={18} fill="#f59e0b" color="#f59e0b" />
            <span>{mounted ? progress.stars : 0} csillag</span>
          </div>

          {/* Beküldés a tanárnak gomb */}
          <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            style={{
              background: '#eef2ff',
              border: '1px solid #c7d2fe',
              color: '#4338ca',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
            title="Végső eredmény beküldése a tanár Google Táblázatába"
          >
            <Send size={14} />
            <span>{isSyncing ? 'Küldés...' : 'Eredmény beküldése'}</span>
          </button>
        </div>

        {/* Visszajelzés beküldésről */}
        {syncMessage && (
          <div style={{
            marginTop: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: syncMessage.startsWith('✅') ? '#059669' : '#b45309'
          }}>
            {syncMessage}
          </div>
        )}
      </div>

      {/* Modul kártyák rácsa */}
      <div className="grid-modules">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="module-card"
            style={{ borderColor: mod.isCompleted ? '#a7f3d0' : undefined }}
            onClick={() => SoundEngine.playClick()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div
                className="module-card-icon"
                style={{ background: mod.bgColor, color: mod.accentColor }}
              >
                {mod.icon}
              </div>

              {mod.isCompleted && mod.id !== 'kisokos' && (
                <span className="module-status-badge status-completed">
                  <CheckCircle2 size={14} />
                  <span>Kész ({mod.score}%)</span>
                </span>
              )}
            </div>

            <h3 className="module-card-title">{mod.title}</h3>
            <p className="module-card-desc">{mod.desc}</p>

            <div className="module-card-footer">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: mod.accentColor }}>
                {mod.badge}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                <span>Indítás</span>
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Tanulói motivációs sáv */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem 2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Szeretnéd újra elölről kezdeni a kihívásokat?
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            A haladásod automatikusan mentődik ebben a böngészőben.
          </p>
        </div>

        <button
          onClick={handleResetProgress}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
        >
          <RotateCcw size={14} />
          <span>Haladás visszaállítása</span>
        </button>
      </div>
    </div>
  );
}
