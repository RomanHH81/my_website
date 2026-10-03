'use client';

import Image from 'next/image';
import { useTheme } from '@/components/layout/ThemeWrapper';
import styles from './HandwerkPreview.module.scss';
import light from '../../../../public/portfolio/handwerker-showcase-light.jpg';
import dark from '../../../../public/portfolio/handwerker-showcase-dark.jpg';

export default function HandwerkPreview() {
  const { appearance } = useTheme();

  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>handwerk.primaflow.de/showcase</div>
      </div>
      <div className={styles.imageWrapper}>
        {[
          { src: light, mode: 'light' },
          { src: dark, mode: 'dark' },
        ].map(({ src, mode }) => (
          <Image
            key={mode}
            src={src}
            alt={`Handwerker-Website Vorschau (${mode === 'dark' ? 'Dark' : 'Light'} Mode)`}
            className={`${styles.image} ${appearance === mode ? styles.visible : ''}`}
            placeholder="blur"
            fill
            sizes="(max-width: 900px) 100vw, 900px"
          />
        ))}
      </div>
    </div>
  );
}
