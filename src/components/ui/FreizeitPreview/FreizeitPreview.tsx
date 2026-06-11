'use client';

import styles from './FreizeitPreview.module.scss';

export default function FreizeitPreview() {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>freizeit-app.roman.dev</div>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe 
          src="https://freizeit-app-sigma.vercel.app/en" 
          title="Freizeit-Portal Preview"
          className={styles.iframe}
          loading="lazy"
        />
      </div>
    </div>
  );
}
