"use client";

import { useEffect, useRef } from "react";
import Section from "@/components/layout/Section/Section";
import { Card, Text, Flex, Badge, Grid } from "@radix-ui/themes";
import styles from "./Services.module.scss";

const services = [
  {
    id: "01",
    icon: "⚙️",
    title: "Workflow-Automatisierung",
    desc: "Manuelle, wiederholende Prozesse kosten Zeit und Nerven. Ich automatisiere sie — von Lead-Management über E-Mail-Parsing bis zur Terminbuchung. Alles auf deiner eigenen Infrastruktur.",
    tags: [
      "n8n",
      "Webhooks",
      "NocoDB",
      "CalDAV",
      "Telegram",
      "API-Integration",
    ],
    wide: false,
    delay: 0,
  },
  {
    id: "02",
    icon: "🌐",
    title: "Web-Entwicklung",
    desc: "Professionelle Websites für kleine und mittlere Unternehmen. Schnell, sauber, DSGVO-ready — mit integrierten Kontaktformularen und direkter Anbindung an deine Workflows.",
    tags: ["HTML/CSS/JS", "Responsive", "DSGVO", "Self-hosted", "Formulare"],
    wide: false,
    delay: 0.1,
  },
  {
    id: "03",
    icon: "🎨",
    title: "Content & Design",
    desc: "Vom Social-Media-Beitrag bis zum kurzen Promo-Video: Ich erstelle visuell ansprechende Inhalte, die zu deiner Marke passen — mit Canva für Grafiken und DaVinci Resolve für Video-Schnitt.",
    tags: [
      "Canva",
      "DaVinci Resolve",
      "Social Media",
      "Video-Editing",
      "Grafik",
    ],
    wide: false,
    delay: 0.15,
  },
  {
    id: "04",
    icon: "🖥️",
    title: "Infrastruktur & Hosting",
    desc: "Kein Cloudabhängigkeit, keine unnötigen Datenwege. Ich betreibe und konfiguriere selbst-gehostete Server-Umgebungen für Unternehmen, die volle Kontrolle über ihre Daten wollen.",
    tags: ["Proxmox", "Nextcloud", "Tailscale", "Linux", "Backup"],
    wide: false,
    delay: 0.2,
  },
  {
    id: "05",
    icon: "🤖",
    title: "KI-Integration & Smart Home",
    desc: "Von lokalen KI-Modellen bis zur Heimautomatisierung: Ich integriere intelligente Assistenten in bestehende Systeme — ob als smarter Workflow-Baustein oder als vollwertiges Home-Assistant-Setup, das ohne Cloud auskommt.",
    tags: [
      "Home Assistant",
      "Lokale KI",
      "Automatisierung",
      "Self-hosted",
      "Integrationen",
    ],
    wide: false,
    delay: 0.25,
  },
  {
    id: "06",
    icon: "💡",
    title: "Beratung",
    desc: "Du weißt, dass in deinem Business Zeit und Ressourcen verschwendet werden – aber nicht genau wo und wie du es änderst. Ich analysiere deine Prozesse und zeige dir konkret, welche digitalen Lösungen dir echten Mehrwert bringen.",
    tags: [
      "Prozessanalyse",
      "Automatisierungspotenzial",
      "Budgetplanung",
      "Klare Empfehlung",
    ],
    wide: false,
    delay: 0.3,
  },
];

export default function Services() {
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
      id="services"
      label="Was ich mache"
      title="Leistungen"
      className={styles.services}
    >
      <div className={styles.grid} ref={sectionRef}>
        {services.map(({ id, icon, title, desc, tags, wide, delay }) => (
          <article
            key={id}
            className={`${styles.cardWrapper} ${wide ? styles.cardWide : ""} reveal`}
            style={{ transitionDelay: `${delay}s` }}
          >
            <Card size="3" variant="surface" className={styles.card}>
              <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                  <Text size="1" color="gray" className={styles.cardNumber}>
                    {id} /
                  </Text>
                  <Text size="6" className={styles.cardIcon}>
                    {icon}
                  </Text>
                </Flex>
                
                <Flex direction="column" gap="2">
                  <Text size="5" weight="bold" as="div" className={styles.cardTitle}>
                    {title}
                  </Text>
                  <Text size="2" color="gray" className={styles.cardDesc}>
                    {desc}
                  </Text>
                </Flex>

                <Flex gap="2" wrap="wrap" className={styles.tags}>
                  {tags.map((tag) => (
                    <Badge key={tag} variant="soft" color="blue" size="1">
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </article>
        ))}
      </div>
    </Section>
  );
}
