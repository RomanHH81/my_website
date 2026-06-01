'use client';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import CustomCursor from '@/components/ui/CustomCursor/CustomCursor';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
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
