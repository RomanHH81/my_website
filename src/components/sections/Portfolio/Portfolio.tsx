'use client';

import styles from './Portfolio.module.scss';
import PVPreview from '@/components/ui/PVPreview/PVPreview';

export default function Portfolio() {
  const openProject = () => {
    window.open('https://pv-rechner-h6s3.vercel.app/dashboard', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <div className={styles.projectTile}>
          <div className={styles.header}>
            <h2 className={styles.title}>PV Rechner</h2>
            <p className={styles.subtitle}>
              Ein komplexer Rechner für Photovoltaik-Anlagen, der Amortisation, 
              Eigenverbrauchsanteil und CO2-Ersparnis in Echtzeit visualisiert.
            </p>
          </div>
          
          <div className={styles.previewContainer} onClick={openProject} role="button" aria-label="Projekt öffnen">
            <div className={styles.previewOverlay}>
              <span>Vollversion öffnen</span>
            </div>
            <PVPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
