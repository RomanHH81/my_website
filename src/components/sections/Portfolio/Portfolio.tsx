"use client";

import { useEffect, useRef } from "react";
import Section from "@/components/layout/Section/Section";
import { Card, Text, Flex, Inset, Box } from "@radix-ui/themes";
import styles from "./Portfolio.module.scss";
import PVPreview from "@/components/ui/PVPreview/PVPreview";

const projects = [
  {
    id: "01",
    title: "PV Rechner",
    desc: "Komplexer Rechner für PV-Anlagen: Visualisierung von Amortisation, Eigenverbrauch und CO2-Ersparnis.",
    url: "https://pv-rechner-h6s3.vercel.app/dashboard",
    component: <PVPreview />,
  },
  {
    id: "02",
    title: "Freizeit-Portal",
    desc: "Plattform zur Planung und Organisation von Freizeitaktivitäten.",
    url: "https://freizeit-app-sigma.vercel.app/en",
    component: <div className={styles.previewPlaceholder}>Vorschau nicht verfügbar</div>,
  },
  {
    id: "03",
    title: "Dein Projekt hier?",
    desc: "Ich freue mich darauf, gemeinsam mit dir die nächste digitale Lösung zu entwickeln. Lass uns sprechen!",
    url: "#",
    isPlaceholder: true,
  },
];

export default function Portfolio() {
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
      id="portfolio"
      label="Projekte"
      title="Portfolio"
      className={styles.portfolio}
    >
      <div className={styles.grid} ref={sectionRef}>
        {projects.map(({ id, title, desc, url, isPlaceholder, component }) => (
          <article
            key={id}
            className={`${styles.cardWrapper} reveal`}
          >
            <Card 
              size="3" 
              variant="surface" 
              className={styles.card}
              onClick={() =>
                url !== "#" && window.open(url, "_blank", "noopener,noreferrer")
              }
            >
              <Flex direction="column" gap="4" height="100%">
                <Box>
                  <Text size="5" weight="bold" as="div" className={styles.title}>
                    {title}
                  </Text>
                  <Text size="2" color="gray" className={styles.subtitle}>
                    {desc}
                  </Text>
                </Box>

                <Inset clip="padding-box" side="bottom" pb="current">
                  <div
                    className={isPlaceholder ? styles.placeholderContainer : styles.previewContainer}
                    role="button"
                    aria-label={isPlaceholder ? "Kontakt aufnehmen" : `Projekt ${title} öffnen`}
                  >
                    {isPlaceholder ? (
                      <div className={styles.placeholderContent}>
                        <Text size="3" weight="medium">Bereit für eine Zusammenarbeit?</Text>
                        <Text size="2" color="gray">Klicke hier, um mich zu kontaktieren.</Text>
                      </div>
                    ) : (
                      <>
                        <div className={styles.previewOverlay}>
                          <span>Vollversion öffnen</span>
                        </div>
                        {component}
                      </>
                    )}
                  </div>
                </Inset>
              </Flex>
            </Card>
          </article>
        ))}
      </div>
    </Section>
  );
}
