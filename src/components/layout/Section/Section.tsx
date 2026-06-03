import Container from "../Container/Container";
import styles from "./Section.module.scss";

interface SectionProps {
  id: string;
  label?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  label,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            {label && (
              <div className={styles.sectionLabel} aria-hidden="true">
                {label}
              </div>
            )}
            <h2 className={styles.sectionTitle} id={`${id}-heading`}>
              {title}
            </h2>
          </div>
        </div>
        <div className={styles.sectionBody}>{children}</div>
      </Container>
    </section>
  );
}
