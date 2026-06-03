"use client";

import { useState, useEffect } from "react";
import styles from "./CookieBanner.module.scss";

interface CookieBannerProps {
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
  onOpenSettings: () => void;
}

type Consent = "all" | "necessary" | null;

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner({
  onOpenLegal,
  onOpenSettings,
}: CookieBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === "all" || stored === "necessary") {
      setConsent(stored);
    }
  }, []);

  const handleConsent = (value: "all" | "necessary") => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  if (!isMounted || consent !== null) return null;

  return (
    <div className={styles.banner} role="alert">
      <div className={styles.inner}>
        <p className={styles.text}>
          Diese Website verwendet Cookies und ähnliche Technologien, um die
          Nutzererfahrung zu verbessern. Technisch notwendige Cookies sind immer
          aktiv. Marketing- und Analyse-Cookies werden nur mit deiner Zustimmung
          gesetzt. Mehr erfährst du in der{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal("datenschutz");
            }}
          >
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className={styles.buttons}>
          <button className={styles.btnMore} onClick={onOpenSettings}>
            Einstellungen
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => handleConsent("necessary")}
          >
            Nur notwendige
          </button>
          <button
            className={styles.btnAccept}
            onClick={() => handleConsent("all")}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
