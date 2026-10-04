'use client';

import React, { useState, useEffect } from 'react';
import { HARMONY_WORDS, HARMONY_RULES_SUMMARY } from '@/data/harmony';
import { WordHarmonyItem } from '@/types/grammar';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import ConfettiEffect from '@/components/ConfettiEffect';
import { Sparkles, Check, X, RefreshCw, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

function shuffleList<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HangrendPage() {
  const [activeTab, setActiveTab] = useState<'csoportosito' | 'toldalek' | 'kivetelek'>('csoportosito');

  // Kevert szólisták a két játékhoz
  const [wordList, setWordList] = useState<WordHarmonyItem[]>(HARMONY_WORDS);
  const [suffixList, setSuffixList] = useState<WordHarmonyItem[]>(HARMONY_WORDS);

  useEffect(() => {
    setWordList(shuffleList(HARMONY_WORDS));
    setSuffixList(shuffleList(HARMONY_WORDS));
  }, []);

  // Hangrend csoportosító játék állapota
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [wordScore, setWordScore] = useState<number>(0);
  const [wordAnswered, setWordAnswered] = useState<boolean>(false);
  const [wordIsCorrect, setWordIsCorrect] = useState<boolean | null>(null);
  const [wordFinished, setWordFinished] = useState<boolean>(false);

  // Toldalék ragasztó játék állapota
  const [suffixIndex, setSuffixIndex] = useState<number>(0);
  const [suffixScore, setSuffixScore] = useState<number>(0);
  const [suffixAnswered, setSuffixAnswered] = useState<boolean>(false);
  const [suffixIsCorrect, setSuffixIsCorrect] = useState<boolean | null>(null);
  const [suffixFinished, setSuffixFinished] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const currentWordItem = wordList[wordIndex] || HARMONY_WORDS[0];

  // Hangrend csoportosítás logika
  const handleHarmonyChoice = (cat: 'mély' | 'magas' | 'vegyes') => {
    if (wordAnswered) return;
    const correct = currentWordItem.category === cat;

    setWordAnswered(true);
    setWordIsCorrect(correct);

    if (correct) {
      setWordScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextWord = () => {
    SoundEngine.playClick();
    if (wordIndex < wordList.length - 1) {
      setWordIndex(prev => prev + 1);
      setWordAnswered(false);
      setWordIsCorrect(null);
    } else {
      setWordFinished(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
      StorageService.completeModule('hangrend', 100, 3);
      window.dispatchEvent(new Event('progress_updated'));
    }
  };

  const resetWordGame = () => {
    setWordList(shuffleList(HARMONY_WORDS));
    setWordIndex(0);
    setWordScore(0);
    setWordAnswered(false);
    setWordIsCorrect(null);
    setWordFinished(false);
  };

  // Toldalék logika
  const currentSuffixItem = suffixList[suffixIndex] || HARMONY_WORDS[0];
  const suffixExercise = currentSuffixItem?.suffixExercise;

  const handleSuffixChoice = (selectedSuffix: string) => {
    if (suffixAnswered || !suffixExercise) return;
    const correct = selectedSuffix === suffixExercise.correctSuffix;

    setSuffixAnswered(true);
    setSuffixIsCorrect(correct);

    if (correct) {
      setSuffixScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextSuffix = () => {
    SoundEngine.playClick();
    if (suffixIndex < suffixList.length - 1) {
      setSuffixIndex(prev => prev + 1);
      setSuffixAnswered(false);
      setSuffixIsCorrect(null);
    } else {
      setSuffixFinished(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
    }
  };

  const resetSuffixGame = () => {
    setSuffixList(shuffleList(HARMONY_WORDS));
    setSuffixIndex(0);
    setSuffixScore(0);
    setSuffixAnswered(false);
    setSuffixIsCorrect(null);
    setSuffixFinished(false);
  };

  return (
    <div>
      <ConfettiEffect trigger={showConfetti} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">4. Témakör</div>
        <h1 className="page-title">A hangrend és az illeszkedés törvénye</h1>
        <p className="page-subtitle">
          A szavaink magánhangzóik alapján lehetnek <strong>mély</strong>, <strong>magas</strong> vagy <strong>vegyes</strong> hangrendűek. A toldalékok pedig pontosan igazodnak a szó hangrendjéhez!
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('csoportosito'); }}
          className={`tab-btn ${activeTab === 'csoportosito' ? 'tab-btn-active' : ''}`}
        >
          🎵 Hangrendi csoportosító
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('toldalek'); }}
          className={`tab-btn ${activeTab === 'toldalek' ? 'tab-btn-active' : ''}`}
        >
          🧩 Toldalék-ragasztó
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('kivetelek'); }}
          className={`tab-btn ${activeTab === 'kivetelek' ? 'tab-btn-active' : ''}`}
        >
          💡 Kivételek & Szabályok
        </button>
      </div>

      {/* TAB 1: Hangrend Csoportosító Játék */}
      {activeTab === 'csoportosito' && (
        <div className="card-white" style={{ maxWidth: '750px', margin: '0 auto' }}>
          {!wordFinished ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {wordIndex + 1} / {wordList.length} szó | Pontszám: {wordScore}
              </div>

              {/* Szó kártya */}
              <div style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 900,
                display: 'inline-block',
                margin: '0 auto 1rem',
                boxShadow: 'var(--shadow-lg)',
                minWidth: '240px'
              }}>
                {currentWordItem.word}
              </div>

              {/* Benne található magánhangzók kiemelése */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Magánhangzók a szóban:</span>
                {currentWordItem.vowels.map((v, idx) => (
                  <span key={idx} style={{ background: '#f1f5f9', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid #cbd5e1' }}>
                    {v}
                  </span>
                ))}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Milyen hangrendű ez a szó?
              </h3>

              {/* 3 Választási lehetőség */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: '580px', margin: '0 auto 1.5rem' }}>
                <button
                  onClick={() => handleHarmonyChoice('mély')}
                  disabled={wordAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1.1rem 0.5rem', fontSize: '1rem', borderColor: '#fdba74', background: '#fff7ed', color: '#c2410c' }}
                >
                  🚗 Mély
                </button>
                <button
                  onClick={() => handleHarmonyChoice('magas')}
                  disabled={wordAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1.1rem 0.5rem', fontSize: '1rem', borderColor: '#86efac', background: '#f0fdf4', color: '#15803d' }}
                >
                  🎾 Magas
                </button>
                <button
                  onClick={() => handleHarmonyChoice('vegyes')}
                  disabled={wordAnswered}
                  className="btn btn-secondary"
                  style={{ padding: '1.1rem 0.5rem', fontSize: '1rem', borderColor: '#c4b5fd', background: '#f5f3ff', color: '#6d28d9' }}
                >
                  🌈 Vegyes
                </button>
              </div>

              {/* Visszajelzés */}
              {wordAnswered && (
                <div style={{
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  background: wordIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                  color: wordIsCorrect ? 'var(--success-dark)' : '#991b1b',
                  fontWeight: 700,
                  maxWidth: '580px',
                  margin: '0 auto 1.5rem',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span>{wordIsCorrect ? '✅ Helyes válasz!' : '❌ Nem jó!'}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {currentWordItem.note}
                  </div>
                </div>
              )}

              {wordAnswered && (
                <button onClick={handleNextWord} className="btn btn-primary">
                  <span>Következő szó</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎵🎉</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Gratulálunk, végigmentél a szavak hangrendjén!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{wordScore}</strong> / {wordList.length} pont
              </p>
              <button onClick={resetWordGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Újrakezdés</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Toldalék Ragasztó Játék */}
      {activeTab === 'toldalek' && suffixExercise && (
        <div className="card-white" style={{ maxWidth: '750px', margin: '0 auto' }}>
          {!suffixFinished ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {suffixIndex + 1} / {suffixList.length} feladat | Pontszám: {suffixScore}
              </div>

              <div style={{ background: '#f8fafc', border: '2px dashed var(--primary)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Illeszd hozzá a megfelelő toldalékot:
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                  {currentSuffixItem.suffixExercise?.baseWord || currentSuffixItem.word} + <span style={{ color: 'var(--primary)' }}>?</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: 600, marginTop: '0.25rem' }}>
                  ({suffixExercise.suffixGroup})
                </div>
              </div>

              {/* Toldalék opciók */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {suffixExercise.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSuffixChoice(opt)}
                    disabled={suffixAnswered}
                    className="btn btn-secondary"
                    style={{ padding: '0.85rem 1.75rem', fontSize: '1.2rem', fontWeight: 800 }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Visszajelzés */}
              {suffixAnswered && (
                <div style={{
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  background: suffixIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                  color: suffixIsCorrect ? 'var(--success-dark)' : '#991b1b',
                  fontWeight: 700,
                  maxWidth: '500px',
                  margin: '0 auto 1.5rem',
                  textAlign: 'center'
                }}>
                  {suffixIsCorrect ? (
                    <div>
                      🎉 Pontos illeszkedés! A helyes alak: <strong>{suffixExercise.resultWord}</strong>
                    </div>
                  ) : (
                    <div>
                      Nem jó toldalék! A helyes alak: <strong>{suffixExercise.resultWord}</strong>
                    </div>
                  )}
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, marginTop: '0.4rem' }}>
                    {currentSuffixItem.note}
                  </div>
                </div>
              )}

              {suffixAnswered && (
                <button onClick={handleNextSuffix} className="btn btn-primary">
                  <span>Következő szó</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🧩🏆</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Sikeresen összeragasztottad az összes toldalékot!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{suffixScore}</strong> / {suffixList.length} pont
              </p>
              <button onClick={resetSuffixGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Újrakezdés</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Kivételek & Szabályok */}
      {activeTab === 'kivetelek' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
          {HARMONY_RULES_SUMMARY.map((rule, idx) => (
            <div key={idx} className="card-white" style={{ marginBottom: 0, borderLeft: '5px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                {rule.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                {rule.description}
              </p>
              <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <strong>Példák:</strong> {rule.examples}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600 }}>
                💡 <strong>Toldalékolás:</strong> {rule.suffixRule}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
