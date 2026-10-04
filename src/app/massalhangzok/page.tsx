'use client';

import React, { useState } from 'react';
import { CONSONANT_ITEMS, UNVOICED_MNEMONIC, CONSONANT_QUIZ_DATA } from '@/data/consonants';
import { ConsonantItem } from '@/types/grammar';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import ConfettiEffect from '@/components/ConfettiEffect';
import { Activity, Check, X, RefreshCw, ArrowRight, Sparkles, Volume2 } from 'lucide-react';

export default function MassalhangzokPage() {
  const [activeTab, setActiveTab] = useState<'felfedezo' | 'zongesseg' | 'betujegy' | 'kviz'>('felfedezo');

  // Zöngésség játék állapota
  const [voiceIndex, setVoiceIndex] = useState<number>(0);
  const [voiceScore, setVoiceScore] = useState<number>(0);
  const [voiceAnswered, setVoiceAnswered] = useState<boolean>(false);
  const [voiceIsCorrect, setVoiceIsCorrect] = useState<boolean | null>(null);
  const [voiceFinished, setVoiceFinished] = useState<boolean>(false);
  const [shuffledVoiceItems, setShuffledVoiceItems] = useState<ConsonantItem[]>([]);

  // Betűjegy játék állapota
  const [countIndex, setCountIndex] = useState<number>(0);
  const [countScore, setCountScore] = useState<number>(0);
  const [countAnswered, setCountAnswered] = useState<boolean>(false);
  const [countIsCorrect, setCountIsCorrect] = useState<boolean | null>(null);
  const [countFinished, setCountFinished] = useState<boolean>(false);
  const [shuffledCountItems, setShuffledCountItems] = useState<ConsonantItem[]>([]);

  // Keverés betöltéskor
  React.useEffect(() => {
    setShuffledVoiceItems([...CONSONANT_ITEMS].sort(() => Math.random() - 0.5));
    setShuffledCountItems([...CONSONANT_ITEMS].sort(() => Math.random() - 0.5));
  }, []);

  // Kvíz állapota
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Aktuális elemek
  const activeVoiceList = shuffledVoiceItems.length > 0 ? shuffledVoiceItems : CONSONANT_ITEMS;
  const activeCountList = shuffledCountItems.length > 0 ? shuffledCountItems : CONSONANT_ITEMS;

  // Zöngésség döntő logika
  const handleVoiceChoice = (choice: 'zöngés' | 'zöngétlen') => {
    if (voiceAnswered) return;
    const current = activeVoiceList[voiceIndex];
    const isVoiced = choice === 'zöngés';
    const correct = current.isVoiced === isVoiced;

    setVoiceAnswered(true);
    setVoiceIsCorrect(correct);

    if (correct) {
      setVoiceScore(prev => prev + 1);
      if (isVoiced) {
        SoundEngine.playVocalCordVibration();
      } else {
        SoundEngine.playCorrect();
      }
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextVoice = () => {
    SoundEngine.playClick();
    if (voiceIndex < activeVoiceList.length - 1) {
      setVoiceIndex(prev => prev + 1);
      setVoiceAnswered(false);
      setVoiceIsCorrect(null);
    } else {
      setVoiceFinished(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
      StorageService.completeModule('massalhangzok', 100, 3);
      window.dispatchEvent(new Event('progress_updated'));
    }
  };

  const resetVoiceGame = () => {
    setShuffledVoiceItems([...CONSONANT_ITEMS].sort(() => Math.random() - 0.5));
    setVoiceIndex(0);
    setVoiceScore(0);
    setVoiceAnswered(false);
    setVoiceIsCorrect(null);
    setVoiceFinished(false);
  };

  // Betűjegy döntő logika (keverve)
  const handleCountChoice = (choice: 'egyjegyű' | 'kétjegyű' | 'háromjegyű') => {
    if (countAnswered) return;
    const current = activeCountList[countIndex];
    const correct = current.letterCount === choice;

    setCountAnswered(true);
    setCountIsCorrect(correct);

    if (correct) {
      setCountScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextCount = () => {
    SoundEngine.playClick();
    if (countIndex < activeCountList.length - 1) {
      setCountIndex(prev => prev + 1);
      setCountAnswered(false);
      setCountIsCorrect(null);
    } else {
      setCountFinished(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
    }
  };

  const resetCountGame = () => {
    setShuffledCountItems([...CONSONANT_ITEMS].sort(() => Math.random() - 0.5));
    setCountIndex(0);
    setCountScore(0);
    setCountAnswered(false);
    setCountIsCorrect(null);
    setCountFinished(false);
  };

  // Kvíz logika
  const handleSelectQuizOption = (idx: number) => {
    if (isQuizAnswered) return;
    setSelectedOption(idx);
    setIsQuizAnswered(true);

    if (idx === CONSONANT_QUIZ_DATA[quizIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextQuiz = () => {
    SoundEngine.playClick();
    if (quizIndex < CONSONANT_QUIZ_DATA.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsQuizAnswered(false);
    } else {
      setQuizFinished(true);
      if (quizScore >= 3) {
        SoundEngine.playFanfare();
        setShowConfetti(true);
        StorageService.completeModule('massalhangzok', Math.round((quizScore / CONSONANT_QUIZ_DATA.length) * 100), 2);
        window.dispatchEvent(new Event('progress_updated'));
      }
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsQuizAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div>
      <ConfettiEffect trigger={showConfetti} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">3. Témakör</div>
        <h1 className="page-title">A mássalhangzók csoportosítása</h1>
        <p className="page-subtitle">
          A mássalhangzók képzésekor a kiáramló levegő <strong>akadályba ütközik</strong> (ajkak, fogak, nyelv vagy szájpadlás). Gyakorold a zöngésséget, a betűjegyek számát és az időtartamot!
        </p>
      </div>

      {/* Tabs - szélesebb, jól elkülönülő fülekkel */}
      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.75rem',
          background: '#e2e8f0',
          padding: '0.5rem',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('felfedezo'); }}
          className={`tab-btn ${activeTab === 'felfedezo' ? 'tab-btn-active' : ''}`}
          style={{ padding: '0.85rem 0.75rem', fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'normal', lineHeight: '1.3' }}
        >
          🦆 1. Zöngétlen "kacsa-mondat"
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('zongesseg'); }}
          className={`tab-btn ${activeTab === 'zongesseg' ? 'tab-btn-active' : ''}`}
          style={{ padding: '0.85rem 0.75rem', fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'normal', lineHeight: '1.3' }}
        >
          🐝 2. Zöngés vagy zöngétlen
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('betujegy'); }}
          className={`tab-btn ${activeTab === 'betujegy' ? 'tab-btn-active' : ''}`}
          style={{ padding: '0.85rem 0.75rem', fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'normal', lineHeight: '1.3' }}
        >
          ✍️ 3. Betűjegyek száma
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('kviz'); }}
          className={`tab-btn ${activeTab === 'kviz' ? 'tab-btn-active' : ''}`}
          style={{ padding: '0.85rem 0.75rem', fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'normal', lineHeight: '1.3' }}
        >
          🧠 4. Msh kvíz
        </button>
      </div>

      {/* TAB 1: Zöngétlen csodamondat Felfedező */}
      {activeTab === 'felfedezo' && (
        <div>
          <div className="card-white" style={{ maxWidth: '850px', margin: '0 auto 2rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>🦆</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              A zöngétlen mássalhangzók aranykulcsa
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b', margin: '0.5rem 0 1rem' }}>
              „{UNVOICED_MNEMONIC.sentence}”
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto 1.5rem' }}>
              {UNVOICED_MNEMONIC.explanation}
            </p>

            {/* Szavak kibontása */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {UNVOICED_MNEMONIC.breakdown.map((item, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    {item.word}
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                    {item.highlighted.map((char, cIdx) => (
                      <span key={cIdx} style={{ background: '#dcfce7', color: '#166534', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}>
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 10 Zöngétlen hang listája */}
            <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left' }}>
              <h4 style={{ fontWeight: 800, color: '#15803d', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                A 10 zöngétlen mássalhangzó:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {UNVOICED_MNEMONIC.consonants.map((c) => (
                  <span key={c} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: '1.2rem', color: '#166534', border: '1px solid #86efac' }}>
                    {c}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#166534', marginTop: '0.75rem' }}>
                💡 <strong>Kipróbálhatod magadon:</strong> Tedd a tenyered a gégédre (ádámcsutkádra)! Amikor a <em>p, t, k, sz</em> hangokat mondod, nem rezeg a torkod. De ha a <em>b, d, g, z</em> hangokat ejted, határozott rezgést fogsz érezni: ezek a zöngések!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Zöngés vagy Zöngétlen játék */}
      {activeTab === 'zongesseg' && (
        <div className="card-white" style={{ maxWidth: '750px', margin: '0 auto' }}>
          {!voiceFinished ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {voiceIndex + 1} / {activeVoiceList.length} betű | Pontszám: {voiceScore}
              </div>

              {/* Msh kártya */}
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: 'white',
                fontSize: '3.6rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}>
                {activeVoiceList[voiceIndex]?.letter}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Rezegnek a hangszalagok a(z) „{activeVoiceList[voiceIndex]?.letter}” kiejtésekor?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                (Emlékezz: „Tyűha, pici, úszó kacsa, futás!”)
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                <button
                  onClick={() => handleVoiceChoice('zöngés')}
                  disabled={voiceAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#c4b5fd', background: '#f5f3ff', color: '#6d28d9' }}
                >
                  🐝 ZÖNGÉS (Rezeg)
                </button>
                <button
                  onClick={() => handleVoiceChoice('zöngétlen')}
                  disabled={voiceAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#86efac', background: '#f0fdf4', color: '#15803d' }}
                >
                  🍃 ZÖNGÉTLEN (Nem rezeg)
                </button>
              </div>

              {/* Visszajelzés */}
              {voiceAnswered && (
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: voiceIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                  color: voiceIsCorrect ? 'var(--success-dark)' : '#991b1b',
                  fontWeight: 700,
                  maxWidth: '480px',
                  margin: '0 auto 1.5rem'
                }}>
                  {voiceIsCorrect ? (
                    <div>
                      🎉 Helyes! A(z) „{activeVoiceList[voiceIndex]?.letter}” egy{' '}
                      <strong>{activeVoiceList[voiceIndex]?.isVoiced ? 'zöngés' : 'zöngétlen'}</strong> mássalhangzó!
                    </div>
                  ) : (
                    <div>
                      Nem talált! A(z) „{activeVoiceList[voiceIndex]?.letter}” valójában{' '}
                      <strong>{activeVoiceList[voiceIndex]?.isVoiced ? 'ZÖNGÉS' : 'ZÖNGÉTLEN'}</strong>!
                    </div>
                  )}
                </div>
              )}

              {voiceAnswered && (
                <button onClick={handleNextVoice} className="btn btn-primary">
                  <span>Következő mássalhangzó</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🏆</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Gratulálunk, végigértél az összes mássalhangzón!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{voiceScore}</strong> / {CONSONANT_ITEMS.length} pont
              </p>
              <button onClick={resetVoiceGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Újrakezdés</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Betűjegyek száma játék */}
      {activeTab === 'betujegy' && (
        <div className="card-white" style={{ maxWidth: '750px', margin: '0 auto' }}>
          {!countFinished ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {countIndex + 1} / {activeCountList.length} betű | Pontszám: {countScore}
              </div>

              {/* Msh kártya */}
              <div style={{
                width: '120px',
                height: '110px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, #0ea5e9, #4f46e5)',
                color: 'white',
                fontSize: '3.5rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}>
                {activeCountList[countIndex]?.letter}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Hány írásjegyből áll a(z) „{activeCountList[countIndex]?.letter}” betű?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                Egyetlen hangot jelöl, de hány karakterből írjuk le?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
                <button
                  onClick={() => handleCountChoice('egyjegyű')}
                  disabled={countAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1rem 0.5rem', fontSize: '1rem', fontWeight: 800 }}
                >
                  1️⃣ Egyjegyű
                </button>
                <button
                  onClick={() => handleCountChoice('kétjegyű')}
                  disabled={countAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1rem 0.5rem', fontSize: '1rem', fontWeight: 800 }}
                >
                  2️⃣ Kétjegyű
                </button>
                <button
                  onClick={() => handleCountChoice('háromjegyű')}
                  disabled={countAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1rem 0.5rem', fontSize: '1rem', fontWeight: 800 }}
                >
                  3️⃣ Háromjegyű
                </button>
              </div>

              {/* Visszajelzés */}
              {countAnswered && (
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: countIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                  color: countIsCorrect ? 'var(--success-dark)' : '#991b1b',
                  fontWeight: 700,
                  maxWidth: '520px',
                  margin: '0 auto 1.5rem'
                }}>
                  {countIsCorrect ? (
                    <div>🎉 Pontosan! A(z) „{activeCountList[countIndex]?.letter}” {activeCountList[countIndex]?.letterCount}!</div>
                  ) : (
                    <div>Nem jó! A(z) „{activeCountList[countIndex]?.letter}” valójában {activeCountList[countIndex]?.letterCount}.</div>
                  )}
                </div>
              )}

              {countAnswered && (
                <button onClick={handleNextCount} className="btn btn-primary">
                  <span>Következő</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>✍️🎉</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Befejezted a betűjegy-gyakorlást!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{countScore}</strong> / {CONSONANT_ITEMS.length} pont
              </p>
              <button onClick={resetCountGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Újrakezdés</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Kvíz */}
      {activeTab === 'kviz' && (
        <div className="quiz-box">
          {!quizFinished ? (
            <div>
              <div className="quiz-header">
                <span className="quiz-step-tag">
                  {quizIndex + 1} / {CONSONANT_QUIZ_DATA.length} Kérdés
                </span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  Pontszám: {quizScore}
                </span>
              </div>

              <h3 className="quiz-question-text">
                {CONSONANT_QUIZ_DATA[quizIndex].question}
              </h3>

              <div className="quiz-options-list">
                {CONSONANT_QUIZ_DATA[quizIndex].options.map((opt, idx) => {
                  let statusClass = '';
                  if (isQuizAnswered) {
                    if (idx === CONSONANT_QUIZ_DATA[quizIndex].correctIndex) {
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
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isQuizAnswered}
                      className={`quiz-option-btn ${statusClass}`}
                    >
                      <span className="option-badge">{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isQuizAnswered && (
                <div className={`quiz-feedback ${selectedOption === CONSONANT_QUIZ_DATA[quizIndex].correctIndex ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>
                    {selectedOption === CONSONANT_QUIZ_DATA[quizIndex].correctIndex ? '✅ Helyes válasz!' : '❌ Nem jó!'}
                  </strong>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.92rem' }}>
                    {CONSONANT_QUIZ_DATA[quizIndex].explanation}
                  </p>
                </div>
              )}

              {isQuizAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleNextQuiz} className="btn btn-primary">
                    <span>{quizIndex < CONSONANT_QUIZ_DATA.length - 1 ? 'Következő kérdés' : 'Eredmény megtekintése'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {quizScore >= 3 ? '🏆' : '👍'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Kvíz befejezve!
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{quizScore}</strong> / {CONSONANT_QUIZ_DATA.length} pont ({Math.round((quizScore / CONSONANT_QUIZ_DATA.length) * 100)}%)
              </p>
              <button onClick={resetQuiz} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Kvíz újrakezdése</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
