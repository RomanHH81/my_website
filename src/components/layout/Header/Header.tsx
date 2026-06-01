'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.scss';

const navLinks = [
  { anchor: 'services', label: 'Leistungen' },
  { anchor: 'about',    label: 'Über mich' },
  { anchor: 'portfolio', label: 'Portfolio' },
  { anchor: 'contact',  label: 'Kontakt' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleLinkClick = () => setIsOpen(false);

  const getHref = (anchor: string) =>
    isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <Link href="/" className={styles.logo}>
        Roman_.<span className={styles.logoDev}>dev</span>
      </Link>

      <ul
        className={`${styles.navList} ${isOpen ? styles.open : ''}`}
        id="nav-menu"
        role="list"
      >
        {navLinks.map(({ anchor, label }) => (
          <li key={anchor}>
            <a
              href={getHref(anchor)}
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={styles.hamburger}
        aria-controls="nav-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
