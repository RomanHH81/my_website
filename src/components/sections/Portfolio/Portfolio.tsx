import Section from "@/components/layout/Section/Section";
import styles from "./Portfolio.module.scss";
import PortfolioGrid from "./PortfolioGrid";

type Project = {
  id: string;
  title: string;
  desc: string;
  url: string;
  isPlaceholder?: boolean;
};

const allProjects: Project[] = [
  {
    id: "01",
    title: "PV Rechner",
    desc: "Komplexer Rechner für PV-Anlagen: Visualisierung von Amortisation, Eigenverbrauch und CO2-Ersparnis.",
    url: "https://pv-rechner.primaflow.de/dashboard",
  },
  {
    id: "02",
    title: "Freizeit-Portal",
    desc: "Plattform zur Planung und Organisation von Freizeitaktivitäten.",
    url: "https://freizeit-app-sigma.vercel.app/en",
  },
  {
    id: "03",
    title: "Immobilien-Portfolio",
    desc: "Übersichtliche Plattform zur Präsentation und Verwaltung von Immobilienobjekten.",
    url: "https://immobilien-portfolio.vercel.app/de",
  },
  {
    id: "04",
    title: "Dein Projekt hier?",
    desc: "Ich freue mich darauf, gemeinsam mit dir die nächste digitale Lösung zu entwickeln. Lass uns sprechen!",
    url: "#",
    isPlaceholder: true,
  },
];

async function isOnline(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    return res.status !== 404;
  } catch {
    return false;
  }
}

export default async function Portfolio() {
  const checked = await Promise.all(
    allProjects.map(async (project) => {
      if (project.isPlaceholder) return project;
      const online = await isOnline(project.url);
      return online ? project : null;
    }),
  );

  const visibleProjects = checked.filter((p): p is Project => p !== null);

  return (
    <Section
      id="portfolio"
      label="Projekte"
      title="Portfolio"
      className={styles.portfolio}
    >
      <PortfolioGrid projects={visibleProjects} />
    </Section>
  );
}
