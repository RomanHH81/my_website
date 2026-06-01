import type { Metadata } from 'next';
import '../../styles/globals.scss';
import MainLayout from '@/components/layout/MainLayout/MainLayout';

export const metadata: Metadata = {
  title: 'Roman — Workflow-Automatisierung & Web-Entwicklung aus Norddeutschland',
  description:
    'Freelancer aus Norddeutschland: Workflow-Automatisierung mit n8n, DSGVO-konforme Websites, Self-hosted Infrastruktur und Content-Design. Jetzt Projekt anfragen.',
  metadataBase: new URL('https://roman.dev'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Roman — Automatisierung & digitale Lösungen',
    description:
      'Workflow-Automatisierung, Web-Entwicklung und Self-hosted Infrastruktur — DSGVO-konform, made in Norddeutschland.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://roman.dev',
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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
