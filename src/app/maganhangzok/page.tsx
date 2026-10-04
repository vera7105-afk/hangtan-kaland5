'use client';

import React, { useState, useEffect } from 'react';
import { ALL_VOWELS, VOWEL_ODD_ONE_OUT_GAMES, VOWEL_MNEMONICS } from '@/data/vowels';
import { VowelItem } from '@/types/grammar';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import ConfettiEffect from '@/components/ConfettiEffect';
import { Check, X, Sparkles, RefreshCw, ArrowRight, HelpCircle, Lightbulb } from 'lucide-react';

export default function MaganhangzokPage() {
  const [activeTab, setActiveTab] = useState<'felfedezo' | 'szortirozo' | 'kakukktojas'>('felfedezo');
  const [selectedVowel, setSelectedVowel] = useState<VowelItem>(ALL_VOWELS[0]);

  // Szortírozó játék állapota
  const [sortCriterion, setSortCriterion] = useState<'idotartam' | 'hangrend' | 'ajak'>('hangrend');
  const [currentVowelIndex, setCurrentVowelIndex] = useState<number>(0);
  const [sortScore, setSortScore] = useState<number>(0);
  const [sortAnswered, setSortAnswered] = useState<boolean>(false);
  const [sortIsCorrect, setSortIsCorrect] = useState<boolean | null>(null);
  const [sortFinished, setSortFinished] = useState<boolean>(false);

  // Kakukktojás játék állapota
  const [gameIndex, setGameIndex] = useState<number>(0);
  const [selectedOddOption, setSelectedOddOption] = useState<string | null>(null);
  const [isOddAnswered, setIsOddAnswered] = useState<boolean>(false);
  const [oddScore, setOddScore] = useState<number>(0);
  const [oddFinished, setOddFinished] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Kevert magánhangzók a szortírozóhoz
  const [shuffledVowels, setShuffledVowels] = useState<VowelItem[]>([]);

  useEffect(() => {
    setShuffledVowels([...ALL_VOWELS].sort(() => Math.random() - 0.5));
  }, [sortCriterion]);

  const handleSelectVowelCard = (v: VowelItem) => {
    SoundEngine.playClick();
    setSelectedVowel(v);
  };

  // Szortírozó ellenőrzés
  const handleSortChoice = (bucket: string) => {
    if (sortAnswered || !shuffledVowels[currentVowelIndex]) return;

    const cur = shuffledVowels[currentVowelIndex];
    let correct = false;

    if (sortCriterion === 'idotartam') {
      correct = (bucket === 'rövid' && !cur.isLong) || (bucket === 'hosszú' && cur.isLong);
    } else if (sortCriterion === 'hangrend') {
      correct = (bucket === 'mély' && cur.horizontal === 'mély') || (bucket === 'magas' && cur.horizontal === 'magas');
    } else if (sortCriterion === 'ajak') {
      correct = (bucket === 'ajakkerekítéses' && cur.lip === 'ajakkerekítéses') || (bucket === 'ajakréses' && cur.lip === 'ajakréses');
    }

    setSortAnswered(true);
    setSortIsCorrect(correct);

    if (correct) {
      setSortScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextSort = () => {
    SoundEngine.playClick();
    if (currentVowelIndex < shuffledVowels.length - 1) {
      setCurrentVowelIndex(prev => prev + 1);
      setSortAnswered(false);
      setSortIsCorrect(null);
    } else {
      setSortFinished(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
      StorageService.completeModule('maganhangzok', 100, 3);
      window.dispatchEvent(new Event('progress_updated'));
    }
  };

  const resetSortGame = () => {
    setShuffledVowels([...ALL_VOWELS].sort(() => Math.random() - 0.5));
    setCurrentVowelIndex(0);
    setSortScore(0);
    setSortAnswered(false);
    setSortIsCorrect(null);
    setSortFinished(false);
  };

  // Kakukktojás logika
  const handleSelectOddOption = (letter: string) => {
    if (isOddAnswered) return;
    setSelectedOddOption(letter);
    setIsOddAnswered(true);

    const currentG = VOWEL_ODD_ONE_OUT_GAMES[gameIndex];
    if (letter === currentG.correctAnswer) {
      setOddScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextOddGame = () => {
    SoundEngine.playClick();
    if (gameIndex < VOWEL_ODD_ONE_OUT_GAMES.length - 1) {
      setGameIndex(prev => prev + 1);
      setSelectedOddOption(null);
      setIsOddAnswered(false);
    } else {
      setOddFinished(true);
      if (oddScore >= 4) {
        SoundEngine.playFanfare();
        setShowConfetti(true);
        StorageService.completeModule('maganhangzok', Math.round((oddScore / VOWEL_ODD_ONE_OUT_GAMES.length) * 100), 2);
        window.dispatchEvent(new Event('progress_updated'));
      }
    }
  };

  const resetOddGame = () => {
    setGameIndex(0);
    setSelectedOddOption(null);
    setIsOddAnswered(false);
    setOddScore(0);
    setOddFinished(false);
  };

  return (
    <div>
      <ConfettiEffect trigger={showConfetti} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">2. Témakör</div>
        <h1 className="page-title">A magánhangzók csoportosítása</h1>
        <p className="page-subtitle">
          A magánhangzók ejtésekor a levegő <strong>nem ütközik akadályba</strong>! Három szempont szerint csoportosítjuk őket: időtartam, a nyelv vízszintes mozgása és az ajkak állása szerint.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('felfedezo'); }}
          className={`tab-btn ${activeTab === 'felfedezo' ? 'tab-btn-active' : ''}`}
        >
          🔠 Mgh felfedező
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('szortirozo'); }}
          className={`tab-btn ${activeTab === 'szortirozo' ? 'tab-btn-active' : ''}`}
        >
          🧺 Kosarazó játék
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('kakukktojas'); }}
          className={`tab-btn ${activeTab === 'kakukktojas' ? 'tab-btn-active' : ''}`}
        >
          🥚 Kakukktojás - kvíz
        </button>
      </div>

      {/* TAB 1: MGH Felfedező & 3 Tulajdonság */}
      {activeTab === 'felfedezo' && (
        <div>
          {/* Emlékeztető doboz (Autó vs Teniszütő) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: '#fff7ed', border: '2px solid #fdba74', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🚗</span>
                <h3 style={{ fontSize: '1.15rem', color: '#c2410c' }}>Mély magánhangzók (a, á, o, ó, u, ú)</h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#9a3412', marginBottom: '0.4rem' }}>
                Emlékeztető szavak: <strong>autó, háború</strong>
              </p>
              <p style={{ fontSize: '0.85rem', color: '#7c2d12' }}>
                A nyelv a szájüreg hátsó részébe húzódik a kiejtéskor.
              </p>
            </div>

            <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎾</span>
                <h3 style={{ fontSize: '1.15rem', color: '#15803d' }}>Magas magánhangzók (e, é, i, í, ö, ő, ü, ű)</h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#166534', marginBottom: '0.4rem' }}>
                Emlékeztető szó: <strong>teniszütő</strong>
              </p>
              <p style={{ fontSize: '0.85rem', color: '#14532d' }}>
                A nyelv a szájüreg elülső része felé tolódik a képzéskor.
              </p>
            </div>
          </div>

          {/* 14 betű rácsa */}
          <div className="card-white">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>
              Válassz egy magánhangzót a 14 közül!
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {ALL_VOWELS.map((v) => {
                const isSelected = selectedVowel.letter === v.letter;
                return (
                  <button
                    key={v.letter}
                    onClick={() => handleSelectVowelCard(v)}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'var(--primary)' : '#f8fafc',
                      color: isSelected ? 'white' : 'var(--text-main)',
                      border: isSelected ? '2px solid var(--primary-dark)' : '1px solid var(--border)',
                      boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.4)' : 'none',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {v.letter}
                  </button>
                );
              })}
            </div>

            {/* Kiválasztott betű 3 dimenziója */}
            <div style={{ background: '#f8fafc', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '2px solid var(--primary-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                  color: 'white',
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  {selectedVowel.letter}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>A(z) „{selectedVowel.letter}” magánhangzó 3 tulajdonsága:</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nézd meg a 3 szempont szerinti besorolását:</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* 1. Időtartam */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    1. Időtartam szerint
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedVowel.isLong ? '#be185d' : '#047857', marginTop: '0.25rem' }}>
                    {selectedVowel.isLong ? 'Hosszú' : 'Rövid'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {selectedVowel.isLong ? 'Írásban ékezettel jelöljük!' : 'Rövid ideig ejtjük.'}
                  </div>
                </div>

                {/* 2. Nyelv vízszintes mozgása */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    2. Nyelv mozgása szerint
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedVowel.horizontal === 'mély' ? '#c2410c' : '#15803d', marginTop: '0.25rem' }}>
                    {selectedVowel.horizontal === 'mély' ? 'Mély' : 'Magas'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {selectedVowel.horizontal === 'mély' ? 'A nyelv hátrahúzódik.' : 'A nyelv előretolódik.'}
                  </div>
                </div>

                {/* 3. Ajkak állása */}
                <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    3. Ajkak állása szerint
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedVowel.lip === 'ajakkerekítéses' ? '#7c3aed' : '#0284c7', marginTop: '0.25rem' }}>
                    {selectedVowel.lip === 'ajakkerekítéses' ? 'Ajakkerekítéses' : 'Ajakréses'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {selectedVowel.lip === 'ajakkerekítéses' ? 'Kerek formát vesz fel a szánk.' : 'Vízszintes rést képez a szánk.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Szortírozó Játék */}
      {activeTab === 'szortirozo' && (
        <div className="card-white" style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Szempont választó */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setSortCriterion('hangrend'); resetSortGame(); }}
              className={`btn ${sortCriterion === 'hangrend' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              Nyelv mozgása (Mély / Magas)
            </button>
            <button
              onClick={() => { setSortCriterion('idotartam'); resetSortGame(); }}
              className={`btn ${sortCriterion === 'idotartam' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              Időtartam (Rövid / Hosszú)
            </button>
            <button
              onClick={() => { setSortCriterion('ajak'); resetSortGame(); }}
              className={`btn ${sortCriterion === 'ajak' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              Ajakállás (Kerekítéses / Réses)
            </button>
          </div>

          {!sortFinished ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {currentVowelIndex + 1} / {shuffledVowels.length} betű | Pontszám: {sortScore}
              </div>

              {/* A feladvány betű */}
              {shuffledVowels[currentVowelIndex] && (
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                  color: 'white',
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  {shuffledVowels[currentVowelIndex].letter}
                </div>
              )}

              <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Melyik dobozba tartozik a fenti betű?
              </p>

              {/* Kosarak */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                {sortCriterion === 'hangrend' && (
                  <>
                    <button
                      onClick={() => handleSortChoice('mély')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#fdba74', background: '#fff7ed', color: '#c2410c' }}
                    >
                      🚗 Mély
                    </button>
                    <button
                      onClick={() => handleSortChoice('magas')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#86efac', background: '#f0fdf4', color: '#15803d' }}
                    >
                      🎾 Magas
                    </button>
                  </>
                )}

                {sortCriterion === 'idotartam' && (
                  <>
                    <button
                      onClick={() => handleSortChoice('rövid')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem' }}
                    >
                      ⏱️ Rövid
                    </button>
                    <button
                      onClick={() => handleSortChoice('hosszú')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem' }}
                    >
                      ⏳ Hosszú
                    </button>
                  </>
                )}

                {sortCriterion === 'ajak' && (
                  <>
                    <button
                      onClick={() => handleSortChoice('ajakkerekítéses')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#c4b5fd', background: '#f5f3ff', color: '#6d28d9' }}
                    >
                      ⭕ Ajakkerekítéses
                    </button>
                    <button
                      onClick={() => handleSortChoice('ajakréses')}
                      disabled={sortAnswered}
                      className="btn btn-secondary"
                      style={{ padding: '1.25rem', fontSize: '1.15rem', borderColor: '#bae6fd', background: '#f0f9ff', color: '#0369a1' }}
                    >
                      👄 Ajakréses
                    </button>
                  </>
                )}
              </div>

              {/* Visszajelzés */}
              {sortAnswered && (
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: sortIsCorrect ? 'var(--success-light)' : 'var(--danger-light)',
                  color: sortIsCorrect ? 'var(--success-dark)' : '#991b1b',
                  fontWeight: 700,
                  maxWidth: '500px',
                  margin: '0 auto 1.5rem'
                }}>
                  {sortIsCorrect ? '🎉 Eltaláltad, szuper!' : 'Nem talált! Figyeld meg újra a kiejtést!'}
                </div>
              )}

              {sortAnswered && (
                <button onClick={handleNextSort} className="btn btn-primary">
                  <span>Következő betű</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Végére értél a szortírozásnak!
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{sortScore}</strong> / {shuffledVowels.length} pont
              </p>
              <button onClick={resetSortGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Új kör indítása</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Kakukktojás Kvíz */}
      {activeTab === 'kakukktojas' && (
        <div className="quiz-box">
          {!oddFinished ? (
            <div>
              <div className="quiz-header">
                <span className="quiz-step-tag">
                  {gameIndex + 1} / {VOWEL_ODD_ONE_OUT_GAMES.length} Feladvány
                </span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  Pontszám: {oddScore}
                </span>
              </div>

              <h4 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                {VOWEL_ODD_ONE_OUT_GAMES[gameIndex].title}
              </h4>
              <h3 className="quiz-question-text">
                {VOWEL_ODD_ONE_OUT_GAMES[gameIndex].prompt}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
                {VOWEL_ODD_ONE_OUT_GAMES[gameIndex].options.map((letter) => {
                  let btnBg = '#f8fafc';
                  let btnColor = 'var(--text-main)';
                  let btnBorder = '2px solid var(--border)';

                  if (isOddAnswered) {
                    if (letter === VOWEL_ODD_ONE_OUT_GAMES[gameIndex].correctAnswer) {
                      btnBg = 'var(--success-light)';
                      btnColor = 'var(--success-dark)';
                      btnBorder = '2px solid var(--success)';
                    } else if (letter === selectedOddOption) {
                      btnBg = 'var(--danger-light)';
                      btnColor = '#991b1b';
                      btnBorder = '2px solid var(--danger)';
                    }
                  } else if (selectedOddOption === letter) {
                    btnBorder = '2px solid var(--primary)';
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => handleSelectOddOption(letter)}
                      disabled={isOddAnswered}
                      style={{
                        padding: '1.5rem 0.5rem',
                        fontSize: '2rem',
                        fontWeight: 900,
                        borderRadius: 'var(--radius-md)',
                        background: btnBg,
                        color: btnColor,
                        border: btnBorder,
                        cursor: isOddAnswered ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {isOddAnswered && (
                <div className={`quiz-feedback ${selectedOddOption === VOWEL_ODD_ONE_OUT_GAMES[gameIndex].correctAnswer ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>
                    {selectedOddOption === VOWEL_ODD_ONE_OUT_GAMES[gameIndex].correctAnswer ? '✅ Bravó, megtaláltad a kakukktojást!' : '❌ Sajnos nem ez a kakukktojás!'}
                  </strong>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.92rem' }}>
                    {VOWEL_ODD_ONE_OUT_GAMES[gameIndex].explanation}
                  </p>
                </div>
              )}

              {isOddAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleNextOddGame} className="btn btn-primary">
                    <span>{gameIndex < VOWEL_ODD_ONE_OUT_GAMES.length - 1 ? 'Következő feladvány' : 'Eredmény megtekintése'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {oddScore >= 4 ? '🥚✨' : '🐣'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Kakukktojás kihívás befejezve!
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{oddScore}</strong> / {VOWEL_ODD_ONE_OUT_GAMES.length} pont ({Math.round((oddScore / VOWEL_ODD_ONE_OUT_GAMES.length) * 100)}%)
              </p>
              <button onClick={resetOddGame} className="btn btn-primary">
                <RefreshCw size={18} />
                <span>Újrakezdés</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
