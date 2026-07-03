import Image from 'next/image';
import styles from './ImmobilienPreview.module.scss';
import preview from '../../../../public/portfolio/immobilien-portfolio.jpg';

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
      <div className={styles.imageWrapper}>
        <Image
          src={preview}
          alt="Immobilien-Portfolio Vorschau"
          className={styles.image}
          placeholder="blur"
          fill
          sizes="(max-width: 900px) 100vw, 900px"
        />
      </div>
    </div>
  );
}
