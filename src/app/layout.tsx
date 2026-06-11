import type { Metadata } from 'next';
import '../../styles/globals.scss';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import ThemeWrapper from '@/components/layout/ThemeWrapper';

export const metadata: Metadata = {
  title: 'Primaflow — Komplexe Systeme, einfach gelöst.',
  description:
    'Freelancer aus Norddeutschland: Workflow-Automatisierung mit n8n, DSGVO-konforme Websites, Self-hosted Infrastruktur und Content-Design. Jetzt Projekt anfragen.',
  metadataBase: new URL('https://primaflow.de'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Primaflow — Automatisierung & digitale Lösungen',
    description:
      'Workflow-Automatisierung, Web-Entwicklung und Self-hosted Infrastruktur — DSGVO-konform, made in Norddeutschland.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://primaflow.de',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ThemeWrapper>
          <MainLayout>{children}</MainLayout>
        </ThemeWrapper>
      </body>
    </html>
  );
}
