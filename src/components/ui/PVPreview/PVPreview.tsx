'use client';

import Image from 'next/image';
import { useTheme } from '@/components/layout/ThemeWrapper';
import styles from './PVPreview.module.scss';
import light from '../../../../public/portfolio/pv-rechner-light.jpg';
import dark from '../../../../public/portfolio/pv-rechner-dark.jpg';

export default function PVPreview() {
  const { appearance } = useTheme();

  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>pv-rechner.primaflow.de</div>
      </div>
      <div className={styles.imageWrapper}>
        {[
          { src: light, mode: 'light' },
          { src: dark, mode: 'dark' },
        ].map(({ src, mode }) => (
          <Image
            key={mode}
            src={src}
            alt={`PV Rechner Vorschau (${mode === 'dark' ? 'Dark' : 'Light'} Mode)`}
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
