'use client';

import styles from './ImmobilienPreview.module.scss';

export default function ImmobilienPreview() {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>immobilien-portfolio.vercel.app</div>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          src="https://immobilien-portfolio.vercel.app/de"
          title="Immobilien-Portfolio Preview"
          className={styles.iframe}
          loading="lazy"
        />
      </div>
    </div>
  );
}
