"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container/Container";
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
            Systeme,
            <br />
            <span className={styles.line2}>die einfach</span>
            <br />
            <span className={styles.accentWord}>laufen.</span>
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

      <Container>
        <div className={styles.statsBar}>
          {stats.map(({ number, label, delay }) => (
            <div
              key={label}
              className={`${styles.statItem} reveal`}
              style={{ transitionDelay: `${delay}s` }}
            >
              <div className={styles.statNumber}>{number}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
