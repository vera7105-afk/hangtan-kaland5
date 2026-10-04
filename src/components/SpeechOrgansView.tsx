'use client';

import React, { useState } from 'react';
import { SPEECH_ORGANS_DATA } from '@/data/speechOrgans';
import { SoundEngine } from '@/utils/audio';
import { Wind, Volume2, Info, ChevronRight, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function SpeechOrgansView() {
  const [selectedStationId, setSelectedStationId] = useState<number>(1);
  const [isAirFlowing, setIsAirFlowing] = useState<boolean>(false);
  const [flowStep, setFlowStep] = useState<number>(0);

  const selectedStation = SPEECH_ORGANS_DATA.find(s => s.id === selectedStationId) || SPEECH_ORGANS_DATA[0];

  const handleSelectStation = (id: number) => {
    SoundEngine.playClick();
    setSelectedStationId(id);
  };

  const handleStartAirflow = () => {
    if (isAirFlowing) return;
    SoundEngine.playClick();
    setIsAirFlowing(true);
    setFlowStep(1);
    setSelectedStationId(1);

    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      if (step <= 6) {
        setFlowStep(step);
        setSelectedStationId(step);
        if (step === 3) {
          SoundEngine.playVocalCordVibration();
        } else {
          SoundEngine.playClick();
        }
      } else {
        clearInterval(interval);
        setIsAirFlowing(false);
        setFlowStep(0);
        SoundEngine.playSuccess();
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', alignItems: 'start' }}>
      {/* Bal oldal: Interaktív SVG Anatómia és Levegő Áramlás */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Hangképző szervek modellje</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Kattints a szervekre a részletekért!</p>
          </div>
          <button
            onClick={handleStartAirflow}
            disabled={isAirFlowing}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
          >
            {isAirFlowing ? (
              <>
                <RefreshCw size={16} className="vibrate-active" />
                <span>{flowStep}. állomás...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Levegő útja</span>
              </>
            )}
          </button>
        </div>

        {/* SVG Diagram */}
        <div style={{ position: 'relative', width: '100%', height: '380px', background: 'linear-gradient(180deg, #f0fdf4 0%, #eff6ff 100%)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid #bfdbfe' }}>
          <svg viewBox="0 0 400 450" style={{ width: '100%', height: '100%' }}>
            {/* Fej és nyak körvonala */}
            <path
              d="M 120 40 C 220 20, 310 70, 310 160 C 310 185, 300 210, 270 230 C 265 240, 260 270, 260 310 L 260 420 L 140 420 L 140 310 C 130 250, 110 210, 95 190 C 85 170, 85 140, 95 120 C 100 80, 110 50, 120 40 Z"
              fill="#fed7aa"
              stroke="#fb923c"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* 1. Tüdő (Lungs) */}
            <g
              onClick={() => handleSelectStation(1)}
              style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              filter={selectedStationId === 1 ? 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.6))' : 'none'}
            >
              <ellipse cx="165" cy="385" rx="35" ry="30" fill={selectedStationId === 1 ? '#4f46e5' : '#fda4af'} opacity={selectedStationId === 1 ? 0.9 : 0.7} />
              <ellipse cx="235" cy="385" rx="35" ry="30" fill={selectedStationId === 1 ? '#4f46e5' : '#fda4af'} opacity={selectedStationId === 1 ? 0.9 : 0.7} />
              <text x="200" y="390" textAnchor="middle" fill={selectedStationId === 1 ? '#ffffff' : '#881337'} fontSize="13" fontWeight="bold">1. Tüdő</text>
            </g>

            {/* 2. Légcső (Trachea) */}
            <g
              onClick={() => handleSelectStation(2)}
              style={{ cursor: 'pointer' }}
              filter={selectedStationId === 2 ? 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.6))' : 'none'}
            >
              <rect x="188" y="295" width="24" height="60" rx="6" fill={selectedStationId === 2 ? '#4f46e5' : '#bae6fd'} stroke="#0284c7" strokeWidth="2" />
              {/* Gyűrűk a légcsövön */}
              <line x1="188" y1="310" x2="212" y2="310" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="188" y1="325" x2="212" y2="325" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="188" y1="340" x2="212" y2="340" stroke="#0284c7" strokeWidth="1.5" />
              <text x="145" y="330" textAnchor="end" fill={selectedStationId === 2 ? '#4f46e5' : '#0369a1'} fontSize="12" fontWeight="bold">2. Légcső</text>
            </g>

            {/* 3. Gégefő és hangszalagok */}
            <g
              onClick={() => handleSelectStation(3)}
              style={{ cursor: 'pointer' }}
              filter={selectedStationId === 3 ? 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))' : 'none'}
            >
              <polygon points="182,292 218,292 212,260 188,260" fill={selectedStationId === 3 ? '#f59e0b' : '#fed7aa'} stroke="#d97706" strokeWidth="2" />
              {/* 2 hangszalag vonala */}
              <line x1="192" y1="276" x2="208" y2="276" stroke="#b45309" strokeWidth="3" strokeLinecap="round" className={selectedStationId === 3 || flowStep === 3 ? 'vibrate-active' : ''} />
              <text x="145" y="278" textAnchor="end" fill={selectedStationId === 3 ? '#b45309' : '#475569'} fontSize="12" fontWeight="bold">3. Gégefő (2 hangszalag)</text>
            </g>

            {/* 4. Garatüregben az ínycsap (ínyvitorla) */}
            <g
              onClick={() => handleSelectStation(4)}
              style={{ cursor: 'pointer' }}
              filter={selectedStationId === 4 ? 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))' : 'none'}
            >
              {/* Garat csatorna */}
              <path d="M 190 260 C 190 220, 225 210, 225 180 L 210 180 C 205 210, 185 220, 185 260 Z" fill={selectedStationId === 4 ? '#8b5cf6' : '#e9d5ff'} stroke="#7c3aed" strokeWidth="2" />
              {/* Ínycsap szelep */}
              <ellipse cx="205" cy="155" rx="8" ry="12" fill={selectedStationId === 4 ? '#ec4899' : '#fbcfe8'} stroke="#db2777" strokeWidth="2" />
              <text x="245" y="185" textAnchor="start" fill={selectedStationId === 4 ? '#be185d' : '#475569'} fontSize="11" fontWeight="bold">4. Garat és ínycsap</text>
            </g>

            {/* 5. Orrüreg */}
            <g
              onClick={() => handleSelectStation(5)}
              style={{ cursor: 'pointer' }}
              filter={selectedStationId === 5 ? 'drop-shadow(0 0 10px rgba(14, 165, 233, 0.8))' : 'none'}
            >
              <path d="M 120 125 C 150 100, 200 115, 205 145 C 170 135, 140 145, 120 145 Z" fill={selectedStationId === 5 ? '#7dd3fc' : '#e0f2fe'} stroke="#0284c7" strokeWidth="2" />
              <text x="65" y="130" textAnchor="end" fill={selectedStationId === 5 ? '#0369a1' : '#334155'} fontSize="12" fontWeight="bold">5. Orrüreg</text>
            </g>

            {/* 6. Szájüreg (benne a 4 szerv: nyelv, fogak, szájpadlás, ajkak) */}
            <g
              onClick={() => handleSelectStation(6)}
              style={{ cursor: 'pointer' }}
              filter={selectedStationId === 6 ? 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))' : 'none'}
            >
              {/* Szájüreg */}
              <path d="M 115 160 C 130 155, 195 155, 200 175 C 190 190, 140 190, 115 175 Z" fill={selectedStationId === 6 ? '#6ee7b7' : '#f1f5f9'} stroke="#059669" strokeWidth="2" />
              
              {/* Belső szervek: Nyelv */}
              <path d="M 130 185 C 150 170, 175 170, 190 180 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="2" />
              {/* Fogak */}
              <rect x="116" y="156" width="6" height="6" fill="#ffffff" stroke="#94a3b8" rx="1" />
              <rect x="116" y="172" width="6" height="6" fill="#ffffff" stroke="#94a3b8" rx="1" />
              {/* Ajkak */}
              <path d="M 106 156 C 114 158, 114 163, 106 165 C 114 167, 114 174, 106 176" stroke="#e11d48" strokeWidth="3" fill="none" />

              <text x="65" y="175" textAnchor="end" fill={selectedStationId === 6 ? '#047857' : '#334155'} fontSize="12" fontWeight="bold">6. Szájüreg (4 szerv)</text>
            </g>

            {/* Levegő áramlás animált nyilai */}
            {isAirFlowing && (
              <g>
                <circle cx="200" cy={390 - (flowStep * 42)} r="8" fill="#3b82f6" opacity="0.85">
                  <animate attributeName="r" values="6;10;6" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>
        </div>

        {/* Gyors navigáció a 6 állomás között */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
          {SPEECH_ORGANS_DATA.map((station) => (
            <button
              key={station.id}
              onClick={() => handleSelectStation(station.id)}
              style={{
                padding: '0.5rem 0.3rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                border: selectedStationId === station.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selectedStationId === station.id ? 'var(--primary-light)' : '#f8fafc',
                color: selectedStationId === station.id ? 'var(--primary-dark)' : 'var(--text-main)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              {station.airFlowOrder}. {station.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Jobb oldal: Részletes Információs Kártya és a 6. állomás szájüregi elemei */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800
            }}>
              {selectedStation.airFlowOrder}
            </span>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                A levegő útja szerint {selectedStation.airFlowOrder}. állomás
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {selectedStation.name}
              </h2>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
              Fő feladata: {selectedStation.shortRole}
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
              {selectedStation.description}
            </p>
          </div>

          {/* Ha a 4. állomás (Garatüregben az ínycsap) van kiválasztva */}
          {selectedStation.id === 4 && (
            <div style={{ marginTop: '1.25rem', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#be185d', marginBottom: '0.5rem' }}>
                Hogyan dönt a garatban az ínycsap (ínyvitorla) a hangokról?
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: '#be185d' }}>⬆️ Felemelkedik:</strong>
                  <p>Elzárja az orrüreg felé vezető utat. Így keletkeznek a <em>szájhangok</em> (szinte az összes magánhangzó és a legtöbb mássalhangzó).</p>
                </div>
                <div style={{ background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <strong style={{ color: '#be185d' }}>⬇️ Leereszkedik:</strong>
                  <p>Megnyitja a levegő útját az orrüreg felé. Így keletkeznek az <em>orrhangok</em>: <strong>m, n, ny</strong>.</p>
                </div>
              </div>
            </div>
          )}

          {/* Ha az 5. állomás (Orrüreg) van kiválasztva */}
          {selectedStation.id === 5 && (
            <div style={{ marginTop: '1.25rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0369a1', marginBottom: '0.5rem' }}>
                Az orrüreg rezonátor szerepe:
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#0c4a6e', lineHeight: '1.5' }}>
                Amikor az ínycsap leereszkedik a garatban, a levegő az orrüregen át is áramlik. Az orrüreg rezonátorként (hangfelerősítőként) működik az <strong>m, n, ny</strong> orrhangok képzésekor!
              </p>
            </div>
          )}

          {/* Ha a 6. állomás (Szájüreg) van kiválasztva: Nyelv, Fogak, Szájpadlás, Ajkak bemutatása */}
          {selectedStation.id === 6 && selectedStation.subParts && (
            <div style={{ marginTop: '1.5rem', borderTop: '2px dashed var(--border)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Info size={18} color="#059669" />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                  A szájüreg 4 belső képző szerve:
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {selectedStation.subParts.map((sub, idx) => (
                  <div key={idx} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
                    <div style={{ fontWeight: 800, color: '#065f46', fontSize: '1rem', marginBottom: '0.35rem' }}>
                      {sub.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#047857', lineHeight: '1.4', marginBottom: '0.35rem' }}>
                      {sub.description}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontStyle: 'italic' }}>
                      💡 {sub.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
