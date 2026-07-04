import Link from 'next/link';
import styles from '../legal.module.scss';

export const metadata = {
  title: 'Datenschutz — Roman',
  robots: { index: false, follow: false },
};

export default function Datenschutz() {
  return (
    <div className={styles.page}>
      <div className={styles.label}>Rechtliches</div>
      <h1 className={styles.title}>Datenschutzerklärung</h1>

      <div className={styles.content}>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>1. Verantwortlicher</div>
          <div className={styles.block}>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br />
              <strong><span className={styles.placeholder}>[Dein Name]</span></strong><br />
              <span className={styles.placeholder}>[Straße und Hausnummer]</span><br />
              <span className={styles.placeholder}>[PLZ Ort]</span><br />
              E-Mail: <a href="mailto:kontakt@beispiel.de"><span className={styles.placeholder}>[Deine E-Mail]</span></a>
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>2. Hosting &amp; Server-Log-Dateien</div>
          <div className={styles.block}>
            <p>
              Diese Website wird auf einem <strong>selbst betriebenen Server</strong> (Self-hosted) gehostet.
              Der Serverbetreiber erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien,
              die dein Browser automatisch übermittelt.
            </p>
            <p>Dies sind:</p>
            <p>
              Browsertyp und -version · verwendetes Betriebssystem · Referrer-URL ·
              Hostname des zugreifenden Rechners · Uhrzeit der Serveranfrage · IP-Adresse
            </p>
            <p>
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Rechtsgrundlage für die
              Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren
              und stabilen Betrieb der Website).
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>3. Kontaktformular</div>
          <div className={styles.block}>
            <p>
              Wenn du das Kontaktformular auf dieser Website nutzt, werden die von dir eingegebenen Daten
              (Name, E-Mail-Adresse, Betreff, Nachricht) zur Bearbeitung deiner Anfrage und für den Fall
              von Anschlussfragen bei uns gespeichert.
            </p>
            <p>
              Diese Daten geben wir nicht ohne deine Einwilligung weiter. Die Verarbeitung der im Kontaktformular
              eingegebenen Daten erfolgt ausschließlich auf Basis deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              Du kannst diese Einwilligung jederzeit widerrufen.
            </p>
            <p>
              Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns, bis du uns zur Löschung
              aufforderst, deine Einwilligung zur Speicherung widerrufst oder der Zweck für die Datenspeicherung
              entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>4. Lokale Datenspeicherung (localStorage)</div>
          <div className={styles.block}>
            <p>
              Diese Website verwendet <strong>localStorage</strong> für Einstellungen, die auf deinem Gerät
              verbleiben und nicht an externe Server übertragen werden:
            </p>
            <p>
              <strong>Theme:</strong> Deine Auswahl zwischen Hell/Dunkel-Modus.<br />
              <strong>cookie-consent:</strong> Deine getroffene Auswahl im Cookie-Banner.
            </p>
            <p>
              Es werden <strong>keine Tracking-Cookies</strong> gesetzt und{' '}
              <strong>keine Analyse- oder Werbedienste</strong> Dritter verwendet (kein Google Analytics,
              kein Facebook Pixel o. ä.). Es werden keine Daten an externe Anbieter übertragen.
            </p>
            <p>
              Sämtliche eingesetzten Schriften und Ressourcen werden <strong>lokal ausgeliefert</strong> — es
              erfolgen keine Anfragen an externe CDNs oder Font-Dienste.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>5. Deine Rechte</div>
          <div className={styles.block}>
            <p>Du hast gegenüber uns folgende Rechte bezüglich deiner personenbezogenen Daten:</p>
            <p>
              <strong>Auskunft</strong> (Art. 15 DSGVO) ·{' '}
              <strong>Berichtigung</strong> (Art. 16 DSGVO) ·{' '}
              <strong>Löschung</strong> (Art. 17 DSGVO) ·{' '}
              <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) ·{' '}
              <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) ·{' '}
              <strong>Widerspruch</strong> (Art. 21 DSGVO)
            </p>
            <p>
              Du hast außerdem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
              deiner personenbezogenen Daten durch uns zu beschweren. Zuständig ist die Aufsichtsbehörde des
              Bundeslandes, in dem du deinen Wohnsitz hast.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>6. Aktualität</div>
          <div className={styles.block}>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>März 2026</strong>.
              Durch die Weiterentwicklung der Website oder aufgrund geänderter gesetzlicher bzw. behördlicher
              Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen.
            </p>
          </div>
        </div>

      </div>

      <Link href="/" className={styles.back}>
        Zurück zur Startseite
      </Link>
    </div>
  );
}
