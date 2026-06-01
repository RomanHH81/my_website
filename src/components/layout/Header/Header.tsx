'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.scss';

const navLinks = [
  { anchor: 'services', label: 'Leistungen' },
  { anchor: 'about',    label: 'Über mich' },
  { label: 'Portfolio', action: 'portfolio' },
  { anchor: 'contact',  label: 'Kontakt' },
];

export default function Header({ onViewChange }: { onViewChange: (view: 'home' | 'portfolio') => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleLinkClick = (action?: string) => {
    setIsOpen(false);
    if (action === 'portfolio') {
      onViewChange('portfolio');
    } else {
      onViewChange('home');
    }
  };

  const getLinkProps = (link: { anchor?: string; href?: string; label: string; action?: string }) => {
    if (link.action) {
      return { href: '#', onClick: () => handleLinkClick(link.action) };
    }
    return { href: isHome ? `#${link.anchor}` : `/#${link.anchor}`, onClick: () => handleLinkClick() };
  };

  return (
    <nav className={styles.nav} aria-label="Hauptnavigation">
      <Link href="/" className={styles.logo} onClick={() => handleLinkClick()}>
        Roman_.<span className={styles.logoDev}>dev</span>
      </Link>

      <ul
        className={`${styles.navList} ${isOpen ? styles.open : ''}`}
        id="nav-menu"
        role="list"
      >
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              {...getLinkProps(link)}
              className={styles.navLink}
            >
              {link.label}
            </Link>
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
