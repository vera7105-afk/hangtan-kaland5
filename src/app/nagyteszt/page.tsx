'use client';

import React, { useState, useEffect } from 'react';
import { GRAND_QUIZ_QUESTIONS } from '@/data/quizData';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import { GoogleSheetsService } from '@/utils/googleSheets';
import ConfettiEffect from '@/components/ConfettiEffect';
import { Award, CheckCircle, RefreshCw, Printer, ArrowRight, Star, Sparkles, UserCheck, Send } from 'lucide-react';

export default function NagytesztPage() {
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('');
  const [nameSubmitted, setNameSubmitted] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; chosenIndex: number; isCorrect: boolean }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const p = StorageService.getProgress();
    if (p.studentName) {
      setStudentName(p.studentName);
      setNameSubmitted(true);
    }
    if (p.studentClass) {
      setStudentClass(p.studentClass);
    }
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    SoundEngine.playClick();
    StorageService.setStudentInfo(studentName.trim(), studentClass.trim());
    setNameSubmitted(true);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const currentQ = GRAND_QUIZ_QUESTIONS[currentIndex];
    const correct = idx === currentQ.correctIndex;

    if (correct) {
      setScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }

    setUserAnswers(prev => [...prev, { questionId: currentQ.id, chosenIndex: idx, isCorrect: correct }]);
  };

  const handleNext = () => {
    SoundEngine.playClick();
    if (currentIndex < GRAND_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === GRAND_QUIZ_QUESTIONS[currentIndex].correctIndex ? 1 : 0);
      const percent = Math.round((finalScore / GRAND_QUIZ_QUESTIONS.length) * 100);
      
      SoundEngine.playFanfare();
      setShowConfetti(true);
      const updated = StorageService.completeModule('nagyteszt', percent, 5);

      let calculatedGrade = "5 (Jeles)";
      if (percent < 40) calculatedGrade = "Gyakorolj még!";
      else if (percent < 60) calculatedGrade = "3 (Közepes)";
      else if (percent < 85) calculatedGrade = "4 (Jó)";

      GoogleSheetsService.syncProgress(
        updated,
        "Végső eredmény (Mindentudó Nagyteszt)",
        `${finalScore}/${GRAND_QUIZ_QUESTIONS.length} (${calculatedGrade})`,
        percent
      ).then(success => {
        setSyncStatus(success);
      });

      window.dispatchEvent(new Event('progress_updated'));
    }
  };

  const resetTest = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setScore(0);
    setIsFinished(false);
    setShowConfetti(false);
  };

  const percentage = Math.round((score / GRAND_QUIZ_QUESTIONS.length) * 100);

  // Grade calculation
  let gradeText = "5 (Jeles)";
  if (percentage < 40) gradeText = "Gyakorolj még!";
  else if (percentage < 60) gradeText = "3 (Közepes)";
  else if (percentage < 85) gradeText = "4 (Jó)";

  return (
    <div>
      <ConfettiEffect trigger={showConfetti} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">5. Modul & Értékelés</div>
        <h1 className="page-title">Mindentudó nagyteszt</h1>
        <p className="page-subtitle">
          20 átfogó kérdés mind a 4 témakörből. Érd el a legjobb eredményt, és szerezd meg a névre szóló digitális oklevelet!
        </p>
      </div>

      {/* Név megadása, ha még nincs */}
      {!nameSubmitted ? (
        <div className="card-white" style={{ maxWidth: '500px', margin: '0 auto 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Hogy hívnak?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Add meg a nevedet és osztályodat, hogy az okleveledre pontosan rá tudjuk írni!
          </p>

          <form onSubmit={handleSaveName}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Neved (pl. Kovács Emma)"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  fontSize: '1.05rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-strong)',
                  outline: 'none',
                  textAlign: 'center',
                  fontWeight: 600,
                  marginBottom: '0.75rem'
                }}
                required
              />
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Osztályod (pl. 5.a) — opcionális"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  textAlign: 'center',
                  fontWeight: 500
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <UserCheck size={18} />
              <span>Teszt indítása</span>
            </button>
          </form>
        </div>
      ) : !isFinished ? (
        /* Kvízkérdések folyamata */
        <div className="quiz-box">
          <div className="quiz-header">
            <div>
              <span className="quiz-step-tag">
                {currentIndex + 1} / {GRAND_QUIZ_QUESTIONS.length} Kérdés
              </span>
              <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Tanuló: <strong>{studentName}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#f59e0b' }}>
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
              <span>{score} pont</span>
            </div>
          </div>

          {/* Haladási sáv */}
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '1.75rem' }}>
            <div style={{
              height: '100%',
              width: `${((currentIndex + 1) / GRAND_QUIZ_QUESTIONS.length) * 100}%`,
              background: 'linear-gradient(90deg, #4f46e5, #0ea5e9)',
              transition: 'width 0.3s'
            }} />
          </div>

          <h3 className="quiz-question-text">
            {GRAND_QUIZ_QUESTIONS[currentIndex].question}
          </h3>

          <div className="quiz-options-list">
            {GRAND_QUIZ_QUESTIONS[currentIndex].options.map((opt, idx) => {
              let statusClass = '';
              if (isAnswered) {
                if (idx === GRAND_QUIZ_QUESTIONS[currentIndex].correctIndex) {
                  statusClass = 'correct';
                } else if (idx === selectedOption) {
                  statusClass = 'wrong';
                }
              } else if (selectedOption === idx) {
                statusClass = 'selected';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`quiz-option-btn ${statusClass}`}
                >
                  <span className="option-badge">{String.fromCharCode(65 + idx)}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`quiz-feedback ${selectedOption === GRAND_QUIZ_QUESTIONS[currentIndex].correctIndex ? 'feedback-correct' : 'feedback-wrong'}`}>
              <strong>
                {selectedOption === GRAND_QUIZ_QUESTIONS[currentIndex].correctIndex ? '✅ Kiváló válasz!' : '❌ Sajnos nem helyes!'}
              </strong>
              <p style={{ marginTop: '0.4rem', fontSize: '0.92rem' }}>
                {GRAND_QUIZ_QUESTIONS[currentIndex].explanation}
              </p>
            </div>
          )}

          {isAnswered && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleNext} className="btn btn-primary">
                <span>{currentIndex < GRAND_QUIZ_QUESTIONS.length - 1 ? 'Következő kérdés' : 'Eredmény & Oklevél'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Oklevél és Eredményértékelés */
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Nyomtatható Oklevél Keret */}
          <div
            id="certificate-print"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
              border: '10px double #d97706',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)',
              marginBottom: '2rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', marginBottom: '1rem', boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)' }}>
              <Award size={48} />
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#b45309', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Hivatalos Tanulói Elismerés
            </div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.4rem', fontWeight: 900, color: '#78350f', margin: '0.5rem 0' }}>
              DICSÉRŐ OKLEVÉL
            </h2>
            <p style={{ fontSize: '1rem', color: '#92400e', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              Ezen oklevél tanúsítja, hogy
            </p>

            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1e293b', borderBottom: '3px solid #f59e0b', display: 'inline-block', padding: '0 2rem 0.4rem', marginBottom: '1.5rem' }}>
              {studentName || 'Bátor Tanuló'}{studentClass ? ` (${studentClass})` : ''}
            </div>

            <p style={{ fontSize: '1.1rem', color: '#334155', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
              sikeresen teljesítette a <strong>Mindentudó nagytesztet</strong>, kimagasló tudást szerezve a <strong>beszélőszervek</strong>, a <strong>magánhangzók</strong>, a <strong>mássalhangzók</strong> és a <strong>hangrend</strong> témakörökben!
            </p>

            <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid #fde68a', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Elért pontszám</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#b45309' }}>{score} / {GRAND_QUIZ_QUESTIONS.length} ({percentage}%)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Értékelés</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#047857' }}>{gradeText}</div>
              </div>
            </div>

            {/* Google Sheets visszajelzés */}
            {GoogleSheetsService.isConfigured() && (
              <div style={{ marginBottom: '1.5rem' }}>
                {syncStatus === true ? (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#ecfdf5',
                    color: '#047857',
                    border: '1px solid #a7f3d0',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}>
                    <CheckCircle size={16} />
                    Végső eredményed rögzítve a tanári Google Táblázatban!
                  </span>
                ) : syncStatus === false ? (
                  <button
                    onClick={() => {
                      const updated = StorageService.getProgress();
                      GoogleSheetsService.syncProgress(
                        updated,
                        "Végső eredmény (Mindentudó Nagyteszt)",
                        `${score}/${GRAND_QUIZ_QUESTIONS.length} (${gradeText})`,
                        percentage
                      ).then(s => setSyncStatus(s));
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: '#fff1f2',
                      color: '#be123c',
                      border: '1px solid #fecdd3',
                      padding: '0.4rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ⚠️ Beküldés sikertelen. Kattints ide az újrapróbálkozáshoz!
                  </button>
                ) : (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#e0e7ff',
                    color: '#3730a3',
                    border: '1px solid #c7d2fe',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.88rem',
                    fontWeight: 700
                  }}>
                    ⏳ Végső eredmény mentése a táblázatba folyamatban...
                  </span>
                )}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '500px', margin: '0 auto', paddingTop: '1.5rem', borderTop: '1px solid #fde68a', fontSize: '0.88rem', color: '#78350f' }}>
              <div>
                <strong>Dátum:</strong> {new Date().toLocaleDateString('hu-HU')}
              </div>
              <div>
                <strong>Pecsét:</strong> ★ Hangtan Mester ★
              </div>
            </div>
          </div>

          {/* Gombok az oklevél alatt */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.print()} className="btn btn-primary">
              <Printer size={18} />
              <span>Oklevél nyomtatása / Mentés PDF-ként</span>
            </button>
            <button onClick={resetTest} className="btn btn-secondary">
              <RefreshCw size={18} />
              <span>Teszt újrakezdése</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
