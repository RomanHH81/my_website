"use client";

import { useEffect, useCallback } from "react";
import styles from "./LegalModal.module.scss";

interface Section {
  title: string;
  content: React.ReactNode;
}

interface LegalModalProps {
  type: "impressum" | "datenschutz";
  onClose: () => void;
}

const impressumSections: Section[] = [
  {
    title: "Angaben gemäß § 5 TMG",
    content: (
      <p>
        <strong>[Dein Name]</strong>
        <br />
        Freelancer — Webentwicklung & Automatisierung
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] [Ort]
        <br />
        Deutschland
      </p>
    ),
  },
  {
    title: "Kontakt",
    content: (
      <p>
        E-Mail: <a href="mailto:kontakt@beispiel.de">[Deine E-Mail]</a>
      </p>
    ),
  },
  {
    title: "Umsatzsteuer-ID",
    content: (
      <>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          [USt-IdNr.]
        </p>
        <p>
          <strong>Hinweis:</strong> Als Kleinunternehmer im Sinne von § 19 UStG
          wird keine Umsatzsteuer berechnet — sofern zutreffend, bitte
          entsprechend anpassen.
        </p>
      </>
    ),
  },
  {
    title: "Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)",
    content: (
      <p>
        [Dein Name]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ Ort]
      </p>
    ),
  },
  {
    title: "Haftung für Inhalte",
    content: (
      <>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: "Haftung für Links",
    content: (
      <>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt
          der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
          der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
          Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </>
    ),
  },
  {
    title: "Urheberrecht",
    content: (
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    ),
  },
];

const datenschutzSections: Section[] = [
  {
    title: "1. Verantwortlicher",
    content: (
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        <br />
        <strong>[Dein Name]</strong>
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        E-Mail: <a href="mailto:kontakt@beispiel.de">[Deine E-Mail]</a>
      </p>
    ),
  },
  {
    title: "2. Hosting & Server-Log-Dateien",
    content: (
      <>
        <p>
          Diese Website wird auf einem{" "}
          <strong>selbst betriebenen Server</strong> (Self-hosted) gehostet. Der
          Serverbetreiber erhebt und speichert automatisch Informationen in
          sogenannten Server-Log-Dateien, die dein Browser automatisch
          übermittelt.
        </p>
        <p>
          Dies sind: Browsertyp und -version · verwendetes Betriebssystem ·
          Referrer-URL · Hostname des zugreifenden Rechners · Uhrzeit der
          Serveranfrage · IP-Adresse
        </p>
        <p>
          Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die
          Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f
          DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb
          der Website).
        </p>
      </>
    ),
  },
  {
    title: "3. Kontaktformular",
    content: (
      <>
        <p>
          Wenn du das Kontaktformular auf dieser Website nutzt, werden die von
          dir eingegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) zur
          Bearbeitung deiner Anfrage und für den Fall von Anschlussfragen bei
          uns gespeichert.
        </p>
        <p>
          Diese Daten geben wir nicht ohne deine Einwilligung weiter. Die
          Verarbeitung der im Kontaktformular eingegebenen Daten erfolgt
          ausschließlich auf Basis deiner Einwilligung (Art. 6 Abs. 1 lit. a
          DSGVO). Du kannst diese Einwilligung jederzeit widerrufen.
        </p>
        <p>
          Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns,
          bis du uns zur Löschung aufforderst, deine Einwilligung zur
          Speicherung widerrufst oder der Zweck für die Datenspeicherung
          entfällt. Zwingende gesetzliche Bestimmungen — insbesondere
          Aufbewahrungsfristen — bleiben unberührt.
        </p>
      </>
    ),
  },
  {
    title: "4. Keine Cookies & kein Tracking",
    content: (
      <>
        <p>
          Diese Website setzt <strong>keine Tracking-Cookies</strong> ein und
          verwendet <strong>keine Analyse- oder Werbedienste</strong> Dritter
          (kein Google Analytics, kein Facebook Pixel o. ä.). Es werden keine
          Daten an externe Anbieter übertragen.
        </p>
        <p>
          Sämtliche eingesetzten Schriften und Ressourcen werden{" "}
          <strong>lokal ausgeliefert</strong> — es erfolgen keine Anfragen an
          externe CDNs oder Font-Dienste.
        </p>
      </>
    ),
  },
  {
    title: "5. Deine Rechte",
    content: (
      <>
        <p>
          Du hast gegenüber uns folgende Rechte bezüglich deiner
          personenbezogenen Daten:
        </p>
        <p>
          <strong>Auskunft</strong> (Art. 15 DSGVO) ·{" "}
          <strong>Berichtigung</strong> (Art. 16 DSGVO) ·{" "}
          <strong>Löschung</strong> (Art. 17 DSGVO) ·{" "}
          <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) ·{" "}
          <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) ·{" "}
          <strong>Widerspruch</strong> (Art. 21 DSGVO)
        </p>
        <p>
          Du hast außerdem das Recht, dich bei einer
          Datenschutz-Aufsichtsbehörde über die Verarbeitung deiner
          personenbezogenen Daten durch uns zu beschweren. Zuständig ist die
          Aufsichtsbehörde des Bundeslandes, in dem du deinen Wohnsitz hast.
        </p>
      </>
    ),
  },
  {
    title: "6. Aktualität",
    content: (
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
        <strong>März 2026</strong>. Durch die Weiterentwicklung der Website oder
        aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es
        notwendig werden, diese Datenschutzerklärung anzupassen.
      </p>
    ),
  },
];

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const sections =
    type === "impressum" ? impressumSections : datenschutzSections;
  const label = "Rechtliches";
  const title = type === "impressum" ? "Impressum" : "Datenschutzerklärung";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.modal}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Schließen"
        >
          ✕
        </button>
        <div className={styles.label}>{label}</div>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>
          {sections.map((section) => (
            <div key={section.title} className={styles.sectionBlock}>
              <div className={styles.sectionTitle}>{section.title}</div>
              <div className={styles.block}>{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
