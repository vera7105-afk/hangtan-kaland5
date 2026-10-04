import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Hangtan kaland | 5. Osztályos Magyar Nyelvtan Gyakorló',
  description: 'Interaktív oktató webalkalmazás 5. osztályosoknak: Beszélőszervek, Magánhangzók, Mássalhangzók, Hangrend és Illeszkedés játékos gyakorlása.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <footer className="site-footer">
          <div className="footer-content">
            <p><strong>Hangtan kaland</strong> — 5. osztályos interaktív nyelvtan gyakorló felület</p>
            <div className="footer-badges">
              <span className="footer-pill">🗣️ 1. Beszélőszervek</span>
              <span className="footer-pill">🅰️ 2. Magánhangzók</span>
              <span className="footer-pill">🧩 3. Mássalhangzók</span>
              <span className="footer-pill">🎵 4. Hangrend és illeszkedés</span>
              <span className="footer-pill">🏆 5. Nagyteszt</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              Készült a hivatalos 5. osztályos magyar nyelvtan tanterv szerint.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
