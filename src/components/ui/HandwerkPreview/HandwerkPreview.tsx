'use client';

import styles from './HandwerkPreview.module.scss';

export default function HandwerkPreview() {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>handwerk.primaflow.de</div>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe 
          src="https://handwerk.primaflow.de"
          title="Handwerker-Website Preview"
          className={styles.iframe}
          loading="lazy"
        />
      </div>
    </div>
  );
}
