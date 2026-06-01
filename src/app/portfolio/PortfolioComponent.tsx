import styles from './page.module.scss';
import PVPreview from '@/components/ui/PVPreview/PVPreview';

export default function PortfolioComponent() {
  return (
    <section className={styles.portfolio}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Portfolio</h1>
          <p className={styles.subtitle}>
            Ein Einblick in meine Projekte und technischen Lösungen.
          </p>
        </header>

        <div className={styles.projectSection}>
          <div className={styles.projectInfo}>
            <span className={styles.tag}>Interaktives Tool</span>
            <h2 className={styles.projectTitle}>PV Rechner</h2>
            <p className={styles.projectDescription}>
              Ein komplexer Rechner für Photovoltaik-Anlagen, der Amortisation, 
              Eigenverbrauchsanteil und CO2-Ersparnis in Echtzeit visualisiert.
            </p>
            <div className={styles.actions}>
              <a 
                href="https://pv-rechner-h6s3.vercel.app/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryAction}
              >
                Vollversion öffnen
              </a>
            </div>
          </div>

          <div className={styles.previewWrapper}>
            <PVPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
