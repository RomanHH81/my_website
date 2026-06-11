"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/layout/Section/Section";
import { Card, Text, Flex, Grid, Box, TextField, TextArea, Select, Button } from "@radix-ui/themes";
import styles from "./Contact.module.scss";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section
      id="contact"
      label="Jetzt starten"
      title="Lass uns reden."
      className={styles.contact}
    >
      <div ref={sectionRef}>
        <Card size="4" variant="surface" className={styles.contactCard}>
          <p className={`${styles.sub} reveal`}>
            Du hast ein Projekt, ein Problem oder eine Idee? Schreib mir — ich
            melde mich in der Regel innerhalb von 24 Stunden.
          </p>

          {!submitted ? (
            <form className={`${styles.form} reveal`} onSubmit={handleSubmit}>
              <Grid columns={{ initial: "1", md: "2" }} gap="4" mb="4">
                <Flex direction="column" gap="1">
                  <Text size="1" weight="bold" color="gray" className={styles.label}>NAME</Text>
                  <TextField.Root placeholder="Max Mustermann" required size="3" />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text size="1" weight="bold" color="gray" className={styles.label}>E-MAIL</Text>
                  <TextField.Root type="email" placeholder="max@beispiel.de" required size="3" />
                </Flex>
              </Grid>

              <Flex direction="column" gap="1" mb="4">
                <Text size="1" weight="bold" color="gray" className={styles.label}>ICH INTERESSIERE MICH FÜR …</Text>
                <Select.Root size="3">
                  <Select.Trigger placeholder="Bitte wählen" />
                  <Select.Content>
                    <Select.Item value="automation">Workflow-Automatisierung</Select.Item>
                    <Select.Item value="web">Web-Entwicklung</Select.Item>
                    <Select.Item value="design">Content & Design</Select.Item>
                    <Select.Item value="infra">Infrastruktur & Hosting</Select.Item>
                    <Select.Item value="other">Mehreres / Noch unklar</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>

              <Flex direction="column" gap="1" mb="6">
                <Text size="1" weight="bold" color="gray" className={styles.label}>NACHRICHT</Text>
                <TextArea placeholder="Kurze Beschreibung deines Projekts oder deiner Anfrage …" size="3" />
              </Flex>

              <Flex justify="end">
                <button type="submit" className={styles.btnPrimary}>
                  Nachricht senden →
                </button>
              </Flex>
            </form>
          ) : (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <p>Nachricht gesendet — ich melde mich bald!</p>
            </div>
          )}
        </Card>
      </div>
    </Section>
  );
}
