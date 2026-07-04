"use client";

import { useState, useCallback } from "react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import LegalModal from "@/components/ui/LegalModal/LegalModal";
import CookieBanner from "@/components/ui/CookieBanner/CookieBanner";
import CookieSettings from "@/components/ui/CookieSettings/CookieSettings";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [legalType, setLegalType] = useState<
    "impressum" | "datenschutz" | null
  >(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleCookieSave = useCallback((consent: "all" | "necessary") => {
    localStorage.setItem("cookie-consent", consent);
    setShowSettings(false);
    window.location.reload();
  }, []);

  return (
    <>
      <div className="gridBg" aria-hidden="true" />
      <a href="#main" className="skipLink">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main">{children}</main>
      <ScrollToTop />
      <Footer onOpenLegal={setLegalType} />
      <CookieBanner
        onOpenLegal={setLegalType}
        onOpenSettings={() => setShowSettings(true)}
      />
      {showSettings && (
        <CookieSettings
          onSave={handleCookieSave}
          onClose={() => setShowSettings(false)}
        />
      )}
      {legalType && (
        <LegalModal type={legalType} onClose={() => setLegalType(null)} />
      )}
    </>
  );
}
