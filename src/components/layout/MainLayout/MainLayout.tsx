'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

const Portfolio = dynamic(() => import('@/components/sections/Portfolio/Portfolio'), {
  ssr: false, // Prevents server-side rendering for heavy preview components
});

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
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
