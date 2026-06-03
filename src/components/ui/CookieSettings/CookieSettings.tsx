"use client";

import { useState } from "react";
import styles from "./CookieSettings.module.scss";

interface CookieSettingsProps {
  onSave: (consent: "all" | "necessary") => void;
  onClose: () => void;
}

export default function CookieSettings({
  onSave,
  onClose,
}: CookieSettingsProps) {
  const [marketing, setMarketing] = useState(false);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
    >
      <div className={styles.modal}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Schließen"
        >
          ✕
        </button>
        <div className={styles.title}>Cookie-Einstellungen</div>
        <p className={styles.sub}>
          Lege fest, welche Cookies du zulassen möchtest.
        </p>

        <div className={styles.options}>
          <div className={`${styles.option} ${styles.optionChecked}`}>
            <input
              className={styles.optionInput}
              type="checkbox"
              checked
              disabled
              id="cookie-necessary"
            />
            <div>
              <div className={styles.optionLabel}>
                Technisch notwendig
                <span className={styles.badgeRequired}>Immer aktiv</span>
              </div>
              <div className={styles.optionDesc}>
                Diese Cookies sind für den Betrieb der Website erforderlich und
                können nicht deaktiviert werden.
              </div>
            </div>
          </div>

          <div
            className={`${styles.option} ${marketing ? styles.optionChecked : ""}`}
            onClick={() => setMarketing(!marketing)}
          >
            <input
              className={styles.optionInput}
              type="checkbox"
              checked={marketing}
              id="cookie-marketing"
              readOnly
            />
            <div>
              <div className={styles.optionLabel}>Marketing & Analyse</div>
              <div className={styles.optionDesc}>
                Ermöglicht die Verbesserung der Website durch
                Besucherstatistiken und personalisierte Inhalte.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.btnSecondary}
            onClick={() => onSave("necessary")}
          >
            Nur notwendige
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => onSave(marketing ? "all" : "necessary")}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
