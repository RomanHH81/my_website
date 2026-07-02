"use client";

import { useEffect, useRef } from "react";
import { Card, Text, Flex, Inset, Box } from "@radix-ui/themes";
import styles from "./Portfolio.module.scss";
import PVPreview from "@/components/ui/PVPreview/PVPreview";
import FreizeitPreview from "@/components/ui/FreizeitPreview/FreizeitPreview";

type Project = {
  id: string;
  title: string;
  desc: string;
  url: string;
  isPlaceholder?: boolean;
};

const componentMap: Record<string, React.ReactNode> = {
  "01": <PVPreview />,
  "02": <FreizeitPreview />,
};

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    const reveals = gridRef.current?.querySelectorAll(".reveal") ?? [];
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.grid} ref={gridRef}>
      {projects.map(({ id, title, desc, url, isPlaceholder }) => (
        <article key={id} className={`${styles.cardWrapper} reveal`}>
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
                      {componentMap[id]}
                    </>
                  )}
                </div>
              </Inset>
            </Flex>
          </Card>
        </article>
      ))}
    </div>
  );
}
