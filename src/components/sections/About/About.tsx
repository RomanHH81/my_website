"use client";

import { useEffect, useRef } from "react";
import Section from "@/components/layout/Section/Section";
import { Card, Text, Flex, Grid, Box } from "@radix-ui/themes";
import styles from "./About.module.scss";

const stackItems = [
  "n8n Automatisierung",
  "Nextcloud / CalDAV",
  "Proxmox / Linux",
  "NocoDB / REST APIs",
  "HTML · CSS · JS",
  "Tailscale VPN",
  "Home Assistant",
  "Lokale KI-Modelle",
  "Canva Design",
  "DaVinci Resolve",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="about"
      label="Wer ich bin"
      title="Hinter den Kulissen"
      className={styles.about}
    >
      <Card size="4" variant="surface" className={styles.aboutCard}>
        <Grid columns={{ initial: "1", md: "2" }} gap="6" ref={sectionRef}>
          <div className={`${styles.text} reveal`}>
            <Text as="p" size="3" mb="4" color="gray" className={styles.p}>
              Ich bin Roman — Freelancer aus Norddeutschland, der sich auf die{" "}
              <strong>
                Schnittstelle zwischen Automatisierung, Web und digitaler
                Infrastruktur
              </strong>{" "}
              spezialisiert hat.
            </Text>
            <Text as="p" size="3" mb="4" color="gray" className={styles.p}>
              Was mich antreibt: Lösungen bauen, die tatsächlich funktionieren.
              Nicht nur technisch sauber, sondern auch{" "}
              <strong>DSGVO-konform, wartbar und zukunftssicher</strong>. Daten
              bleiben auf deinen Servern — nicht bei irgendwelchen Drittanbietern.
            </Text>
            <Text as="p" size="3" mb="4" color="gray" className={styles.p}>
              Neben der Technik bringe ich auch ein Gespür für Gestaltung mit: von
              ansprechenden Grafiken bis zu geschnittenen Videos für deine
              digitale Präsenz.
            </Text>

            <ul className={styles.stackList} aria-label="Technologie-Stack">
              {stackItems.map((item) => (
                <li key={item} className={styles.stackItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${styles.visual} reveal`}
            style={{ transitionDelay: "0.15s" }}
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
                  <span className={styles.tPrompt}>roman@ws:~$</span>{" "}
                  <span className={styles.tCmd}>whoami</span>
                </div>
                <div className={styles.tOutput}>
                  Freelancer · Automatisierer · Webentwickler
                </div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{" "}
                  <span className={styles.tCmd}>cat skills.txt</span>
                </div>
                <div className={styles.tHighlight}>
                  → Workflow Automation (n8n, Webhooks)
                </div>
                <div className={styles.tHighlight}>
                  → Web Development (HTML, CSS, JS)
                </div>
                <div className={styles.tHighlight}>
                  → Self-hosted Infrastructure
                </div>
                <div className={styles.tHighlight}>
                  → KI-Integration &amp; Smart Home
                </div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{" "}
                  <span className={styles.tCmd}>cat values.txt</span>
                </div>
                <div className={styles.tSuccess}>✓ DSGVO-konform by design</div>
                <div className={styles.tSuccess}>✓ Daten auf deinen Servern</div>
                <div className={styles.tSuccess}>
                  ✓ Lösungen, die tatsächlich laufen
                </div>
                <br />
                <div>
                  <span className={styles.tPrompt}>roman@ws:~$</span>{" "}
                  <span className={styles.tCmd}>status</span>
                </div>
                <div className={styles.tSuccess}>
                  ● Verfügbar für neue Projekte
                </div>
                <div>
                  <span className={styles.cursorBlink} />
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Card>
    </Section>
  );
}
