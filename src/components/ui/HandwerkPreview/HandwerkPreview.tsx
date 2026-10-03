import Image from 'next/image';
import styles from './HandwerkPreview.module.scss';
import preview from '../../../../public/portfolio/handwerker-showcase.jpg';

export default function HandwerkPreview() {
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
        <Image
          src={preview}
          alt="Handwerker-Website Vorschau"
          className={styles.image}
          placeholder="blur"
          fill
          sizes="(max-width: 900px) 100vw, 900px"
        />
      </div>
    </div>
  );
}
