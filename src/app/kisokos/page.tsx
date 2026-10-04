'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CONSONANT_THEORY_PAIRS, UNVOICED_MNEMONIC } from '@/data/consonants';
import { VOWEL_MNEMONICS } from '@/data/vowels';
import { HARMONY_RULES_SUMMARY } from '@/data/harmony';
import { SPEECH_ORGANS_DATA } from '@/data/speechOrgans';
import { SoundEngine } from '@/utils/audio';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function KisokosPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    SoundEngine.playClick();
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-badge">Elméleti összefoglaló</div>
        <h1 className="page-title">Hangtani kisokos</h1>
        <p className="page-subtitle">
          Egy helyen a 4 legfontosabb hangtani témakör: definíciók, szabályok, emlékeztető szavak és a zöngés-zöngétlen párok táblázata.
        </p>
      </div>

      {/* 1. Téma: Beszélőszervek */}
      <div className="card-white" style={{ marginBottom: '1.5rem', borderLeft: '6px solid #0ea5e9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection(1)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🗣️</span>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                1. A beszélőszervek és a levegő útja
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                6 állomás: 1. Tüdő → 2. Légcső → 3. gégefőben a 2 hangszalag → 4. Garatüregben az ínycsap → 5. Orrüreg → 6. Szájüreg
              </span>
            </div>
          </div>
          <button style={{ color: 'var(--primary)', padding: '0.5rem' }}>
            {openSection === 1 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {(openSection === 1 || openSection === null) && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              A beszédhangok képzése a tüdőből kiáramló levegőoszlop segítségével történik. A beszélőszervek sorrendje a levegő útja szerint (alulról felfelé haladva):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
              {SPEECH_ORGANS_DATA.map((s) => (
                <div key={s.id} style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: 'var(--radius-full)', background: '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                      {s.airFlowOrder}
                    </span>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{s.name}</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {s.shortRole}: {s.description}
                  </p>
                  {s.subParts && (
                    <div style={{ marginTop: '0.5rem', padding: '0.4rem', background: '#ecfdf5', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#047857' }}>
                      <strong>Szájüregi szervek:</strong> Nyelv, Fogak, Szájpadlás, Ajkak.
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: '#eff6ff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', fontSize: '0.88rem', color: '#1e40af' }}>
              💡 <strong>Az ínycsap szelepe:</strong> Felemelkedve elzárja az orrüreget (szájhangok képződnek). Leereszkedve a levegő az orrüregbe áramlik, ahol rezonátorként felerősödik: így születnek az <em>orrhangok (m, n, ny)</em>!
            </div>
          </div>
        )}
      </div>

      {/* 2. Téma: Magánhangzók */}
      <div className="card-white" style={{ marginBottom: '1.5rem', borderLeft: '6px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection(2)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🅰️</span>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                2. A magánhangzók csoportosítása (3 szempont)
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                A kiáramló levegő NEM ütközik akadályba
              </span>
            </div>
          </div>
          <button style={{ color: 'var(--primary)', padding: '0.5rem' }}>
            {openSection === 2 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {(openSection === 2 || openSection === null) && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Időtartam */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '0.4rem' }}>1. Időtartam szerint</h4>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.3rem' }}><strong>Rövid:</strong> a, e, i, o, ö, u, ü</p>
                <p style={{ fontSize: '0.88rem' }}><strong>Hosszú:</strong> á, é, í, ó, ő, ú, ű</p>
              </div>

              {/* Nyelv mozgása */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ color: '#c2410c', fontWeight: 800, marginBottom: '0.4rem' }}>2. Nyelv mozgása szerint</h4>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.3rem' }}><strong>Mély:</strong> a, á, o, ó, u, ú <br/><em style={{ color: '#9a3412' }}>(autó, háború)</em></p>
                <p style={{ fontSize: '0.88rem' }}><strong>Magas:</strong> e, é, i, í, ö, ő, ü, ű <br/><em style={{ color: '#166534' }}>(teniszütő)</em></p>
              </div>

              {/* Ajkak állása */}
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ color: '#7c3aed', fontWeight: 800, marginBottom: '0.4rem' }}>3. Ajkak állása szerint</h4>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.3rem' }}><strong>Ajakkerekítéses:</strong> a, o, ó, ö, ő, u, ú, ü, ű</p>
                <p style={{ fontSize: '0.88rem' }}><strong>Ajakréses:</strong> á, e, é, i, í</p>
              </div>
            </div>

            <div style={{ background: '#fffbeb', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #fde68a', fontSize: '0.88rem', color: '#92400e' }}>
              💡 <strong>Fontos megfigyelés:</strong> A mély hangok közül egyetlen kivétel van, amely ajakréses: az <strong>á</strong>! A magasak között pedig az <strong>ö, ő, ü, ű</strong> a kerekítéses, a többi (e, é, i, í) réses.
            </div>
          </div>
        )}
      </div>

      {/* 3. Téma: Mássalhangzók és a Zöngés-Zöngétlen párok */}
      <div className="card-white" style={{ marginBottom: '1.5rem', borderLeft: '6px solid #8b5cf6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection(3)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🧩</span>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                3. A mássalhangzók csoportosítása & Párok
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                A kiáramló levegő akadályba ütközik (ajak, fog, nyelv, szájpadlás)
              </span>
            </div>
          </div>
          <button style={{ color: 'var(--primary)', padding: '0.5rem' }}>
            {openSection === 3 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {(openSection === 3 || openSection === null) && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            {/* 3 szempont */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <strong>Időtartam szerint:</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Rövid (p, t, k, m...) vs Hosszú (pp, tt, kk, ssz...).
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <strong>Betűk száma szerint:</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Egyjegyű (b, d, f...), Kétjegyű (cs, gy, sz, ty, zs, ly...), Háromjegyű (dzs).
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <strong>Zöngésség szerint:</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Zöngés (hangszalagok rezegnek) vs Zöngétlen (nem rezegnek).
                </p>
              </div>
            </div>

            {/* Zöngétlen Kacsa-mondat */}
            <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid #86efac', marginBottom: '1.5rem' }}>
              <strong style={{ color: '#15803d', fontSize: '1rem' }}>🦆 A zöngétlen mássalhangzók varázsmondata:</strong>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#14532d', margin: '0.35rem 0' }}>
                „Tyűha, pici, úszó kacsa, futás!”
              </div>
              <p style={{ fontSize: '0.85rem', color: '#166534' }}>
                Ebben a mondatban szerepel mind a 10 zöngétlen mássalhangzó: <strong>ty, h, p, c, sz, k, cs, f, t, s</strong>.
              </p>
            </div>

            {/* Zöngés-Zöngétlen Párok Elméleti Táblázata */}
            <h4 style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem', fontSize: '1.05rem' }}>
              A zöngés és zöngétlen mássalhangzók párjai:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
              {CONSONANT_THEORY_PAIRS.map((pair, idx) => (
                <div key={idx} style={{ background: 'white', border: '2px solid var(--primary-light)', borderRadius: 'var(--radius-sm)', padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#6d28d9', fontSize: '1.1rem' }}>{pair.voiced}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>↕️</div>
                  <div style={{ fontWeight: 800, color: '#15803d', fontSize: '1.1rem' }}>{pair.unvoiced}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              <strong>Pártlan hangok:</strong> Pártlan zöngések: <em>m, n, ny, l, r, j, ly</em> | Pártlan zöngétlen: <em>h</em>.
            </p>
          </div>
        )}
      </div>

      {/* 4. Téma: Hangrend és Illeszkedés */}
      <div className="card-white" style={{ marginBottom: '2.5rem', borderLeft: '6px solid #ec4899' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection(4)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎵</span>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                4. A hangrend és az illeszkedés törvénye
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Mély, magas, vegyes szavak és kivételeik (összetett és idegen szavak)
              </span>
            </div>
          </div>
          <button style={{ color: 'var(--primary)', padding: '0.5rem' }}>
            {openSection === 4 ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>

        {(openSection === 4 || openSection === null) && (
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
              {HARMONY_RULES_SUMMARY.map((rule, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{rule.title}</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                    {rule.description}
                  </p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Példa: {rule.examples}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fdf2f8', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #fbcfe8', fontSize: '0.88rem', color: '#9d174d' }}>
              ⚠️ <strong>Összetett szavak kivétele:</strong> Például a <em>Budapest</em> összetett szóban (Buda = mély, Pest = magas) toldalékoláskor mindig az utolsó összetételi tag (Pest) hangrendje dönt: <strong>Budapest-en</strong>!
            </div>
          </div>
        )}
      </div>

      {/* Gyors navigáció a játékokhoz */}
      <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #e0e7ff, #fce7f3)', borderRadius: 'var(--radius-lg)', padding: '2.5rem 1.5rem', border: '1px solid #c7d2fe' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1e1b4b' }}>
          Átnézted az elméletet? Tedd próbára a tudásod!
        </h3>
        <p style={{ color: '#4338ca', marginBottom: '1.5rem', fontSize: '1rem' }}>
          Kezdd a modulok játékos feladataival, vagy ugorj egyből a 15 kérdéses Nagytesztre az oklevélért!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/beszeloszervek" className="btn btn-primary" onClick={() => SoundEngine.playClick()}>
            <span>1. Beszélőszervek indítása</span>
            <ArrowRight size={18} />
          </Link>
          <Link href="/nagyteszt" className="btn btn-secondary" onClick={() => SoundEngine.playClick()}>
            <span>🏆 Nagyteszt kitöltése</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
