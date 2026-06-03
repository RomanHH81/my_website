'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.scss';

const stackItems = [
  'n8n Automatisierung',
  'Nextcloud / CalDAV',
  'Proxmox / Linux',
  'NocoDB / REST APIs',
  'HTML · CSS · JS',
  'Tailscale VPN',
  'Home Assistant',
  'Lokale KI-Modelle',
  'Canva Design',
  'DaVinci Resolve',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12 },
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-heading"
      ref={sectionRef}
    >
      <div className={`${styles.sectionHeader} reveal`}>
        <div>
          <div className={styles.sectionLabel} aria-hidden="true">Wer ich bin</div>
          <h2 className={styles.sectionTitle} id="about-heading">
            Hinter den<br />Kulissen
          </h2>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={`${styles.text} reveal`}>
            <p>
              Ich bin Roman — Freelancer aus Norddeutschland, der sich auf die{' '}
              <strong>
                Schnittstelle zwischen Automatisierung, Web und digitaler Infrastruktur
              </strong>{' '}
              spezialisiert hat.
            </p>
            <p>
              Was mich antreibt: Lösungen bauen, die tatsächlich funktionieren. Nicht nur
              technisch sauber, sondern auch{' '}
              <strong>DSGVO-konform, wartbar und zukunftssicher</strong>. Daten bleiben auf
              deinen Servern — nicht bei irgendwelchen Drittanbietern.
            </p>
            <p>
              Neben der Technik bringe ich auch ein Gespür für Gestaltung mit: von
              ansprechenden Grafiken bis zu geschnittenen Videos für deine digitale Präsenz.
            </p>

            <ul className={styles.stackList} aria-label="Technologie-Stack">
              {stackItems.map((item) => (
                <li key={item} className={styles.stackItem}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className={`${styles.visual} reveal`}
            style={{ transitionDelay: '0.15s' }}
            aria-hidden="true"
          >
            <div className={styles.terminal}>
              <div className={styles.terminalBar}>
                <div className={`${styles.dot} ${styles.dotRed}`} />
                <div className={`${styles.dot} ${styles.dotYellow}`} />
                <div className={`${styles.dot} ${styles.dotGreen}`} />
                <div className={styles.terminalTitle}>roman@workstation:~</div>
              </div>
              <div className={styles.terminalBody}>
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{' '}
                  <span className={styles.tCmd}>whoami</span>
                </div>
                <div className={styles.tOutput}>
                  Freelancer · Automatisierer · Webentwickler
                </div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{' '}
                  <span className={styles.tCmd}>cat skills.txt</span>
                </div>
                <div className={styles.tHighlight}>→ Workflow Automation (n8n, Webhooks)</div>
                <div className={styles.tHighlight}>→ Web Development (HTML, CSS, JS)</div>
                <div className={styles.tHighlight}>→ Self-hosted Infrastructure</div>
                <div className={styles.tHighlight}>→ KI-Integration &amp; Smart Home</div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{' '}
                  <span className={styles.tCmd}>cat values.txt</span>
                </div>
                <div className={styles.tSuccess}>✓ DSGVO-konform by design</div>
                <div className={styles.tSuccess}>✓ Daten auf deinen Servern</div>
                <div className={styles.tSuccess}>✓ Lösungen, die tatsächlich laufen</div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{' '}
                  <span className={styles.tCmd}>status</span>
                </div>
                <div className={styles.tSuccess}>● Verfügbar für neue Projekte</div>
                <div><span className={styles.cursorBlink} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
