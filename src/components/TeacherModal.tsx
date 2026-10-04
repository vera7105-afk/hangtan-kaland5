'use client';

import React, { useState, useEffect } from 'react';
import { GoogleSheetsService, APPS_SCRIPT_TEMPLATE } from '@/utils/googleSheets';
import { SoundEngine } from '@/utils/audio';
import { X, Copy, Check, ExternalLink, Save, Send, Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherModal({ isOpen, onClose }: TeacherModalProps) {
  const [scriptUrl, setScriptUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setScriptUrl(GoogleSheetsService.getScriptUrl());
      setSaveStatus(null);
      setTestStatus('idle');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
      setCopied(true);
      SoundEngine.playClick();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Vágólap hiba:", err);
    }
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    GoogleSheetsService.setScriptUrl(scriptUrl);
    SoundEngine.playCorrect();
    setSaveStatus('Mentve! A tanulók eredményei automatikusan ebbe a táblázatba fognak érkezni.');
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleTestConnection = async () => {
    if (!scriptUrl.trim()) {
      setTestStatus('error');
      return;
    }
    setTestStatus('sending');
    SoundEngine.playClick();

    const success = await GoogleSheetsService.sendTestRow(scriptUrl.trim());
    if (success) {
      setTestStatus('success');
      SoundEngine.playFanfare();
    } else {
      setTestStatus('error');
      SoundEngine.playWrong();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '780px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Bezárás gomb */}
        <button
          onClick={() => { SoundEngine.playClick(); onClose(); }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b'
          }}
          title="Bezárás"
        >
          <X size={20} />
        </button>

        {/* Cím és leírás */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eef2ff', color: '#4f46e5', padding: '0.35rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🎓 Tanári szoba & Értékelés
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)', margin: '0.2rem 0' }}>
            Google Táblázat összekapcsolása
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
            Kapcsolj össze egy ingyenes Google Táblázatot a játékkal, így egyetlen áttekinthető táblázatban látod a diákjaid neveit, osztályát, pontjait és a nagyteszt érdemjegyeit! A rendszer <strong>csak a legvégső eredményt menti el</strong> (a Mindentudó nagyteszt befejezésekor), így minden diákhoz egyetlen átlátható összesítő sor tartozik.
          </p>
        </div>

        {/* Lépések útmutató */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          
          {/* 1. Lépés */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
            <div style={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ background: 'var(--primary)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</span>
              Hozz létre egy új Google Táblázatot
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>
              Nyisd meg a <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>sheets.new</a> címet, és adj neki egy tetszőleges nevet (pl. <em>„Hangtan Kaland — 5. osztály”</em>). A fejlécet a program automatikusan elkészíti!
            </p>
          </div>

          {/* 2. Lépés */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
            <div style={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ background: 'var(--primary)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
              Nyisd meg a Bővítmények &gt; Apps Script menüt
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '0.75rem' }}>
              A táblázatban menj a <strong>Bővítmények &gt; Apps Script</strong> menüpontra, töröld a szerkesztőben látható szöveget, és másold be az alábbi kódot:
            </p>

            <button
              onClick={handleCopyCode}
              className="btn btn-secondary"
              style={{
                fontSize: '0.88rem',
                padding: '0.5rem 1rem',
                borderColor: copied ? '#10b981' : '#cbd5e1',
                background: copied ? '#ecfdf5' : '#ffffff',
                color: copied ? '#059669' : '#334155'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? '✅ Kód kimásolva a vágólapra!' : '📋 Apps Script kód másolása'}</span>
            </button>
          </div>

          {/* 3. Lépés */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
            <div style={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ background: 'var(--primary)', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>3</span>
              Közzététel Webalkalmazásként (Deploy as Web App)
            </div>
            <ol style={{ fontSize: '0.88rem', color: '#475569', margin: '0.5rem 0 0 1.25rem', padding: 0, lineHeight: 1.6 }}>
              <li>Kattints a kék <strong>Telepítés &gt; Új telepítés</strong> (Deploy &gt; New deployment) gombra.</li>
              <li>A bal oldali fogaskeréknél válaszd: <strong>Webalkalmazás</strong> (Web app).</li>
              <li>Végrehajtás mint: <strong>Én</strong> (Me).</li>
              <li>Ki férhet hozzá: <strong>Bárki</strong> (Anyone) — <em>ez azért fontos, hogy a diákoknak ne kelljen Google fiókba bejelentkezniük!</em></li>
              <li>Kattints a <strong>Telepítés</strong> gombra, és másold ki a kapott <strong>Webalkalmazás URL-jét</strong>!</li>
            </ol>
          </div>

        </div>

        {/* 4. Lépés: URL beírás és tesztelés */}
        <div style={{ background: '#eef2ff', border: '2px solid #c7d2fe', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#312e81', marginTop: 0, marginBottom: '0.5rem' }}>
            4. Lépés: Illeszd be ide a Webalkalmazás URL-t
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#4338ca', marginBottom: '1rem' }}>
            Ide illeszd be a kapott <code>https://script.google.com/macros/s/.../exec</code> hivatkozást:
          </p>

          <form onSubmit={handleSaveUrl}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                required
                style={{
                  flex: 1,
                  minWidth: '280px',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #a5b4fc',
                  fontSize: '0.95rem',
                  background: '#ffffff'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
                <Save size={18} />
                <span>Mentés</span>
              </button>
            </div>
          </form>

          {saveStatus && (
            <div style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 700, marginBottom: '0.75rem' }}>
              ✅ {saveStatus}
            </div>
          )}

          {/* Teszt sor küldése */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #c7d2fe', flexWrap: 'wrap' }}>
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'sending'}
              className="btn btn-secondary"
              style={{ padding: '0.6rem 1.1rem', fontSize: '0.9rem', background: '#ffffff', borderColor: '#818cf8', color: '#3730a3' }}
            >
              <Send size={16} />
              <span>{testStatus === 'sending' ? 'Teszt sor küldése...' : '🧪 Teszt sor beküldése a táblázatba'}</span>
            </button>

            {testStatus === 'success' && (
              <span style={{ fontSize: '0.88rem', color: '#047857', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                Sikeres beküldés! Nyisd meg a Google Táblázatodat, a minta sor már ott van!
              </span>
            )}

            {testStatus === 'error' && (
              <span style={{ fontSize: '0.88rem', color: '#b91c1c', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <AlertCircle size={18} color="#ef4444" />
                Nem sikerült elküldeni. Kérlek ellenőrizd az URL-t!
              </span>
            )}
          </div>
        </div>

        {/* Alsó bezárás gomb */}
        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <button onClick={() => { SoundEngine.playClick(); onClose(); }} className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem' }}>
            Rendben, kész
          </button>
        </div>

      </div>
    </div>
  );
}
