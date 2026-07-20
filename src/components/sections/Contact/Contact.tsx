"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Section from "@/components/layout/Section/Section";
import { Card, Text, Flex, Grid, Box, TextField, TextArea, Select, Button } from "@radix-ui/themes";
import styles from "./Contact.module.scss";

// Felder, die wir an /api/contact (und damit an n8n) senden.
// Reihenfolge & Namen müssen mit dem n8n-Workflow (n8n/workflows/lead-handling.json)
// übereinstimmen — sonst greift die "Set"-Node ins Leere.
type ContactPayload = {
  name: string;
  email: string;
  interest: string; // automation | web | design | infra | other
  message: string;
};

const initialState: ContactPayload = {
  name: "",
  email: "",
  interest: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactPayload>(initialState);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "ok" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
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

  const update = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "submitting") return; // Doppel-Submit verhindern

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `Server-Fehler ${res.status}`);
      }
      setStatus({ kind: "ok" });
      setForm(initialState);
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Unbekannter Fehler",
      });
    }
  };

  const submitting = status.kind === "submitting";
  const submitted = status.kind === "ok";

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

          {submitted ? (
            <div className={`${styles.success} reveal`}>
              <div className={styles.successIcon}>✓</div>
              <p>Nachricht gesendet — ich melde mich bald!</p>
              <p className={styles.successHint}>
                Du bekommst gleich eine Bestätigung per E-Mail.
              </p>
            </div>
          ) : (
            <form className={`${styles.form} reveal`} onSubmit={handleSubmit} noValidate>
              <Grid columns={{ initial: "1", md: "2" }} gap="4" mb="4">
                <Flex direction="column" gap="1">
                  <Text size="1" weight="bold" color="gray" className={styles.label}>NAME</Text>
                  <TextField.Root
                    placeholder="Max Mustermann"
                    required
                    size="3"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    disabled={submitting}
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text size="1" weight="bold" color="gray" className={styles.label}>E-MAIL</Text>
                  <TextField.Root
                    type="email"
                    placeholder="max@beispiel.de"
                    required
                    size="3"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    disabled={submitting}
                  />
                </Flex>
              </Grid>

              <Flex direction="column" gap="1" mb="4">
                <Text size="1" weight="bold" color="gray" className={styles.label}>ICH INTERESSIERE MICH FÜR …</Text>
                <Select.Root
                  size="3"
                  value={form.interest}
                  onValueChange={(v) => update("interest", v)}
                  disabled={submitting}
                >
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
                <TextArea
                  placeholder="Kurze Beschreibung deines Projekts oder deiner Anfrage …"
                  size="3"
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  disabled={submitting}
                />
              </Flex>

              {status.kind === "error" && (
                <Box mb="4" className={styles.errorBox} role="alert">
                  <Text size="2" color="red">
                    Konnte nicht senden: {status.message}. Bitte direkt an{" "}
                    <a href="mailto:info@primaflow.de">info@primaflow.de</a> schreiben.
                  </Text>
                </Box>
              )}

              <Flex justify="end">
                <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                  {submitting ? "Wird gesendet …" : "Nachricht senden →"}
                </button>
              </Flex>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
