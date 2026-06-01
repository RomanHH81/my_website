'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CustomCursor from '@/components/ui/CustomCursor/CustomCursor';
import Portfolio from '@/app/portfolio/PortfolioComponent'; // Need to create this

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<'home' | 'portfolio'>('home');

  return (
    <>
      <CustomCursor />
      <div className="gridBg" aria-hidden="true" />
      <a href="#main" className="skipLink">
        Zum Inhalt springen
      </a>
      <Header onViewChange={(newView) => setView(newView)} />
      <main id="main">
        {view === 'home' ? children : <Portfolio />}
      </main>
      <Footer />
    </>
  );
}
