'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="gridBg" aria-hidden="true" />
      <a href="#main" className="skipLink">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
