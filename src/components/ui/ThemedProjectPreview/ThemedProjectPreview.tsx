'use client';

import Image, { type StaticImageData } from 'next/image';
import { useTheme } from '@/components/layout/ThemeWrapper';
import styles from './ThemedProjectPreview.module.scss';

type Props = {
  title: string;
  domain: string;
  light: StaticImageData;
  dark: StaticImageData;
};

export default function ThemedProjectPreview({ title, domain, light, dark }: Props) {
  const { appearance } = useTheme();
  const previews = [{ src: light, mode: 'light' }, { src: dark, mode: 'dark' }];

  return (
    <div className={styles.previewContainer}>
      <div className={styles.browserHeader}>
        <div className={styles.dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.addressBar}>{domain}</div>
      </div>
      <div className={styles.imageWrapper}>
        {previews.map(({ src, mode }) => (
          <Image
            key={mode}
            src={src}
            alt={`${title} Vorschau (${mode === 'dark' ? 'Dark' : 'Light'} Mode)`}
            className={`${styles.image} ${appearance === mode ? styles.visible : ''}`}
            aria-hidden={appearance !== mode}
            placeholder="blur"
            fill
            sizes="(max-width: 900px) 100vw, 900px"
          />
        ))}
      </div>
    </div>
  );
}
