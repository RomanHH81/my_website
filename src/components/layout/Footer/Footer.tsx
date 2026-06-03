"use client";

import styles from "./Footer.module.scss";

interface FooterProps {
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        © 2026 Roman · Freelancer · Norddeutschland
      </div>
      <div className={styles.right}>
        <button
          className={styles.link}
          onClick={() => onOpenLegal("impressum")}
        >
          Impressum
        </button>
        <span className={styles.sep}>&nbsp;·&nbsp;</span>
        <button
          className={styles.link}
          onClick={() => onOpenLegal("datenschutz")}
        >
          Datenschutz
        </button>
      </div>
    </footer>
  );
}
