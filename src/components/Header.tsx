'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Star, BookOpen, Award, Sparkles, Menu, X, GraduationCap } from 'lucide-react';
import { SoundEngine } from '@/utils/audio';
import { StorageService } from '@/utils/storage';
import TeacherModal from '@/components/TeacherModal';

export default function Header() {
  const pathname = usePathname();
  const [muted, setMuted] = useState(false);
  const [stars, setStars] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(SoundEngine.isMuted());
    const progress = StorageService.getProgress();
    setStars(progress.stars);

    const handleStorage = () => {
      const p = StorageService.getProgress();
      setStars(p.stars);
    };
    window.addEventListener('storage', handleStorage);
    // Custom event for same-tab updates
    const handleProgressUpdate = () => handleStorage();
    window.addEventListener('progress_updated', handleProgressUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('progress_updated', handleProgressUpdate);
    };
  }, []);

  const handleToggleSound = () => {
    const newMuteState = SoundEngine.toggleMute();
    setMuted(newMuteState);
    if (!newMuteState) {
      SoundEngine.playClick();
    }
  };

  const navItems = [
    { href: '/', label: 'Főoldal', icon: '🏠' },
    { href: '/kisokos', label: 'Kisokos', icon: '📖' },
    { href: '/beszeloszervek', label: '1. Beszélőszervek', icon: '🗣️' },
    { href: '/maganhangzok', label: '2. Magánhangzók', icon: '🅰️' },
    { href: '/massalhangzok', label: '3. Mássalhangzók', icon: '🧩' },
    { href: '/hangrend', label: '4. Hangrend', icon: '🎵' },
    { href: '/nagyteszt', label: '5. Nagyteszt', icon: '🏆' },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo-group" onClick={() => SoundEngine.playClick()}>
          <div className="logo-icon">
            <Sparkles className="icon-sparkle" size={22} />
          </div>
          <div className="logo-text">
            <span className="logo-title">Hangtan kaland</span>
            <span className="logo-badge">5. osztály</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={() => SoundEngine.playClick()}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <div className="star-counter" title="Összegyűjtött csillagok">
            <Star className="star-icon" size={18} fill="#f59e0b" color="#f59e0b" />
            <span className="star-count">{mounted ? stars : 0}</span>
          </div>

          <button
            onClick={() => {
              SoundEngine.playClick();
              setTeacherModalOpen(true);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
              transition: 'transform 0.15s ease',
              whiteSpace: 'nowrap'
            }}
            title="Tanári szoba — Google Táblázat összekötése"
            aria-label="Tanári beállítások és Google Táblázat"
          >
            <GraduationCap size={18} color="#ffffff" />
            <span>Tanári szoba</span>
          </button>

          <button
            onClick={handleToggleSound}
            className="sound-toggle-btn"
            title={muted ? "Hang bekapcsolása" : "Hang némítása"}
            aria-label="Hang némítás / bekapcsolás"
          >
            {muted ? <VolumeX size={20} color="#ef4444" /> : <Volume2 size={20} color="#10b981" />}
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü megnyitása"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="mobile-nav-menu">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                onClick={() => {
                  SoundEngine.playClick();
                  setMenuOpen(false);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            className="mobile-nav-link"
            style={{ width: '100%', textAlign: 'left', background: '#eef2ff', color: '#4f46e5', fontWeight: 700 }}
            onClick={() => {
              SoundEngine.playClick();
              setMenuOpen(false);
              setTeacherModalOpen(true);
            }}
          >
            <span className="nav-icon">🎓</span>
            <span>Tanári szoba (Google Táblázat)</span>
          </button>
        </div>
      )}

      {/* Tanári szoba felugró ablak */}
      <TeacherModal
        isOpen={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
      />
    </header>
  );
}
