"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container/Container";
import { Flex, Text, Box, Grid } from "@radix-ui/themes";
import styles from "./Hero.module.scss";

const stats = [
  { number: "100%", label: "DSGVO-konform", delay: 0 },
  { number: "Self-hosted", label: "Deine Daten, dein Server", delay: 0.1 },
  { number: "n8n + mehr", label: "Moderne Tech-Stack", delay: 0.2 },
  { number: "Nord DE", label: "Ansässig in Norddeutschland", delay: 0.3 },
];

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    const reveals = wrapperRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
        <Container>
          <div className={styles.tag} aria-hidden="true">
            Freelance · Automatisierung · KI · Web
          </div>
          <h1 className={styles.headline} id="hero-heading">
            <div className={styles.brand}>
              <span className={styles.brandBold}>Prima</span>
              <span className={styles.brandRegular}>flow</span>
            </div>
            Komplexe Systeme,
            <br />
            <span className={styles.accentWord}>einfach gelöst.</span>
          </h1>
          <p className={styles.sub}>
            Automatisierte Workflows, professionelle Websites und smarte
            Infrastruktur — DSGVO-konform, self-hosted und auf dein Business
            zugeschnitten.
          </p>
          <div className={styles.cta}>
            <a href="#contact" className={styles.btnPrimary}>
              Projekt anfragen →
            </a>
            <a href="#services" className={styles.btnSecondary}>
              Leistungen ansehen
            </a>
          </div>
        </Container>
      </section>

      <div className={styles.statsBarWrapper}>
        <Grid columns={{ initial: "1", md: "4" }} className={styles.statsBar}>
          {stats.map(({ number, label, delay }) => (
            <Box
              key={label}
              className={`${styles.statItem} reveal`}
              style={{ transitionDelay: `${delay}s` }}
            >
              <Text size="8" weight="bold" className={styles.statNumber}>
                {number}
              </Text>
              <Text size="1" className={styles.statLabel}>
                {label}
              </Text>
            </Box>
          ))}
        </Grid>
      </div>
    </div>
  );
}
