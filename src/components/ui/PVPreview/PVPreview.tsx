'use client';

import styles from './PVPreview.module.scss';

export default function PVPreview() {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>pv-rechner.roman.dev</div>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe 
          src="https://pv-rechner-h6s3.vercel.app/dashboard" 
          title="PV Rechner Preview"
          className={styles.iframe}
          loading="lazy"
        />
      </div>
    </div>
  );
}
