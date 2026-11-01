'use client';

import Image from 'next/image';
import { useTheme } from '@/components/layout/ThemeWrapper';
import styles from './MietfuchsPreview.module.scss';
import light from '../../../../public/portfolio/mietfuchs-light.jpg';
import dark from '../../../../public/portfolio/mietfuchs-dark.jpg';

export default function MietfuchsPreview() {
  const { appearance } = useTheme();

  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>mietfuchs.primaflow.de</div>
      </div>
      <div className={styles.imageWrapper}>
        {[
          { src: light, mode: 'light' },
          { src: dark, mode: 'dark' },
        ].map(({ src, mode }) => (
          <Image
            key={mode}
            src={src}
            alt={`MietFuchs Vorschau (${mode === 'dark' ? 'Dark' : 'Light'} Mode)`}
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
