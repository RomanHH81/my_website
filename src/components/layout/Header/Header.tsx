'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../ThemeWrapper';
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
  const { appearance, toggleTheme } = useTheme();

  const handleLinkClick = () => setIsOpen(false);

  const getHref = (anchor: string) =>
    isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <Link href="/" className={styles.logoLink}>
        <img src="/logo/logo.svg" alt="Primaflow Logo" className={styles.logo} />
      </Link>

      <div className={styles.navRight}>
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
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Farbschema umschalten"
        >
          {appearance === 'dark' ? '☀️' : '🌙'}
        </button>

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
      </div>
    </nav>
  );
}
