'use client';

import React, { useState, useEffect } from 'react';
import SpeechOrgansView from '@/components/SpeechOrgansView';
import { SPEECH_ORGAN_QUIZ, SPEECH_ORGN_ORDER_PRACTICE } from '@/data/speechOrgans';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import ConfettiEffect from '@/components/ConfettiEffect';
import { ArrowUp, CheckCircle, RefreshCw, Star, Trophy, ArrowRight, HelpCircle } from 'lucide-react';

export default function BeszeloszervekPage() {
  const [activeTab, setActiveTab] = useState<'modell' | 'sorrend' | 'kviz'>('modell');
  
  // Sorbarendező játék állapota
  const [availableItems, setAvailableItems] = useState<{ id: number; name: string; correctPos: number }[]>([]);
  const [orderedItems, setOrderedItems] = useState<{ id: number; name: string; correctPos: number }[]>([]);
  const [orderChecked, setOrderChecked] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Kvíz állapota
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Sorbarendező inicializálása véletlen sorrendben
  useEffect(() => {
    resetOrderGame();
  }, []);

  const resetOrderGame = () => {
    const shuffled = [...SPEECH_ORGN_ORDER_PRACTICE].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
    setOrderedItems([]);
    setOrderChecked(false);
    setOrderSuccess(false);
  };

  const handleSelectItemForOrder = (item: { id: number; name: string; correctPos: number }) => {
    SoundEngine.playClick();
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    setOrderedItems(prev => [...prev, item]);
    setOrderChecked(false);
  };

  const handleRemoveItemFromOrder = (item: { id: number; name: string; correctPos: number }) => {
    SoundEngine.playClick();
    setOrderedItems(prev => prev.filter(i => i.id !== item.id));
    setAvailableItems(prev => [...prev, item]);
    setOrderChecked(false);
  };

  const checkOrder = () => {
    if (orderedItems.length < 6) return;
    const isAllCorrect = orderedItems.every((item, idx) => item.correctPos === idx + 1);
    setOrderChecked(true);

    if (isAllCorrect) {
      setOrderSuccess(true);
      SoundEngine.playFanfare();
      setShowConfetti(true);
      StorageService.completeModule('beszeloszervek', 100, 3);
      window.dispatchEvent(new Event('progress_updated'));
    } else {
      setOrderSuccess(false);
      SoundEngine.playWrong();
    }
  };

  // Kvíz logika
  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const currentQ = SPEECH_ORGAN_QUIZ[quizIndex];
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
      SoundEngine.playCorrect();
    } else {
      SoundEngine.playWrong();
    }
  };

  const handleNextQuestion = () => {
    SoundEngine.playClick();
    if (quizIndex < SPEECH_ORGAN_QUIZ.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (score >= 4) {
        SoundEngine.playFanfare();
        setShowConfetti(true);
        StorageService.completeModule('beszeloszervek', Math.round((score / SPEECH_ORGAN_QUIZ.length) * 100), 2);
        window.dispatchEvent(new Event('progress_updated'));
      }
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div>
      <ConfettiEffect trigger={showConfetti} />

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">1. Témakör</div>
        <h1 className="page-title">A beszélőszervek és a levegő útja</h1>
        <p className="page-subtitle">
          Fedezd fel a 6 fő beszélőszervet alulról felfelé haladva a levegő útja szerint, és tanuld meg a hangok keletkezésének titkát!
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('modell'); }}
          className={`tab-btn ${activeTab === 'modell' ? 'tab-btn-active' : ''}`}
        >
          🔍 Interaktív Modell
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('sorrend'); }}
          className={`tab-btn ${activeTab === 'sorrend' ? 'tab-btn-active' : ''}`}
        >
          🎯 Levegő útja játék
        </button>
        <button
          onClick={() => { SoundEngine.playClick(); setActiveTab('kviz'); }}
          className={`tab-btn ${activeTab === 'kviz' ? 'tab-btn-active' : ''}`}
        >
          🧠 Beszélőszerv -kvíz
        </button>
      </div>

      {/* TAB 1: Interaktív Modell */}
      {activeTab === 'modell' && (
        <div>
          <SpeechOrgansView />
        </div>
      )}

      {/* TAB 2: Sorbarendező Játék */}
      {activeTab === 'sorrend' && (
        <div className="card-white" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Állítsd sorba a beszélőszerveket a levegő útja szerint!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Alulról felfelé haladj: a tüdőtől a szájüregig (összesen 6 állomás)! Kattints a kártyákra a sorba illesztéshez.
            </p>
          </div>

          {/* Célterület: 1-től 6-ig lévő állomások */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map((pos) => {
              const placed = orderedItems[pos - 1];
              const isWrong = orderChecked && placed && placed.correctPos !== pos;
              const isRight = orderChecked && placed && placed.correctPos === pos;

              return (
                <div
                  key={pos}
                  style={{
                    border: isRight ? '2px solid var(--success)' : isWrong ? '2px solid var(--danger)' : '2px dashed var(--border-strong)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    minHeight: '75px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: isRight ? 'var(--success-light)' : isWrong ? 'var(--danger-light)' : '#f8fafc',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    background: isRight ? 'var(--success)' : 'var(--primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    flexShrink: 0
                  }}>
                    {pos}.
                  </span>

                  {placed ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isRight ? 'var(--success-dark)' : 'var(--text-main)' }}>
                        {placed.name}
                      </span>
                      <button
                        onClick={() => handleRemoveItemFromOrder(placed)}
                        style={{ color: '#ef4444', fontSize: '0.8rem', padding: '0.2rem 0.5rem', fontWeight: 700, cursor: 'pointer' }}
                        title="Visszavonás"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-light)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                      Kattints egy szervre...
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Választható szervek bankja */}
          {availableItems.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Választható szervek (kattints a beillesztéshez):
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {availableItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItemForOrder(item)}
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1rem', fontSize: '0.92rem', borderRadius: 'var(--radius-full)' }}
                  >
                    + {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Visszajelzés */}
          {orderChecked && (
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              background: orderSuccess ? 'var(--success-light)' : 'var(--danger-light)',
              color: orderSuccess ? 'var(--success-dark)' : '#991b1b',
              fontWeight: 700,
              textAlign: 'center'
            }}>
              {orderSuccess ? (
                <span>🎉 Tökéletes! Hibátlanul kiraktad a levegő útjának 6 állomását! (+3 ⭐)</span>
              ) : (
                <span>Nem teljesen jó a sorrend! Ellenőrizd a pirossal jelölt dobozokat, és próbáld újra!</span>
              )}
            </div>
          )}

          {/* Gombok */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={checkOrder}
              disabled={orderedItems.length < 6}
              className="btn btn-primary"
              style={{ opacity: orderedItems.length < 6 ? 0.5 : 1 }}
            >
              <CheckCircle size={18} />
              <span>Sorrend ellenőrzése</span>
            </button>
            <button onClick={resetOrderGame} className="btn btn-secondary">
              <RefreshCw size={18} />
              <span>Újrakezdés</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Kvíz */}
      {activeTab === 'kviz' && (
        <div className="quiz-box">
          {!quizFinished ? (
            <div>
              <div className="quiz-header">
                <span className="quiz-step-tag">
                  {quizIndex + 1} / {SPEECH_ORGAN_QUIZ.length} Kérdés
                </span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  Pontszám: {score}
                </span>
              </div>

              <h3 className="quiz-question-text">
                {SPEECH_ORGAN_QUIZ[quizIndex].question}
              </h3>

              <div className="quiz-options-list">
                {SPEECH_ORGAN_QUIZ[quizIndex].options.map((opt, idx) => {
                  let statusClass = '';
                  if (isAnswered) {
                    if (idx === SPEECH_ORGAN_QUIZ[quizIndex].correctIndex) {
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
                      <span className="option-badge">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={`quiz-feedback ${selectedOption === SPEECH_ORGAN_QUIZ[quizIndex].correctIndex ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>
                    {selectedOption === SPEECH_ORGAN_QUIZ[quizIndex].correctIndex ? '✅ Helyes válasz!' : '❌ Sajnos nem jó!'}
                  </strong>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.92rem' }}>
                    {SPEECH_ORGAN_QUIZ[quizIndex].explanation}
                  </p>
                </div>
              )}

              {isAnswered && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleNextQuestion} className="btn btn-primary">
                    <span>{quizIndex < SPEECH_ORGAN_QUIZ.length - 1 ? 'Következő kérdés' : 'Eredmény megtekintése'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {score >= 4 ? '🏆' : '👏'}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Kvíz befejezve!
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Eredményed: <strong>{score}</strong> / {SPEECH_ORGAN_QUIZ.length} pont ({Math.round((score / SPEECH_ORGAN_QUIZ.length) * 100)}%)
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
