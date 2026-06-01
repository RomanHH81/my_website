import styles from './page.module.scss';

export default function PortfolioComponent() {
  return (
    <div className={styles.portfolio}>
      <h1>Portfolio</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>PV Rechner</h2>
          <p>Interaktive Vorschau</p>
          <a href="/pv-rechner">Zur Vollversion</a>
        </div>
      </div>
    </div>
  );
}
