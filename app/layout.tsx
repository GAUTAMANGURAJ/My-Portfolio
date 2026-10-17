import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Newsreader, Syne } from 'next/font/google';
import Analytics from '@/components/studio/Analytics';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const SITE_URL = 'https://gautamanguraj.github.io/gautam-m-a-portfolio';
const OG_IMAGE = `${SITE_URL}/assets/portrait-hero.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gautam M A — Software Engineer',
    template: '%s · Gautam M A',
  },
  description:
    'Gautam M A — Software Engineer focused on frontend systems. Enterprise platforms, ownership, and craft with React, Next.js, and TypeScript.',
  applicationName: 'Gautam M A Portfolio',
  authors: [{ name: 'Gautam M A', url: SITE_URL }],
  creator: 'Gautam M A',
  keywords: [
    'Gautam M A',
    'Software Engineer',
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Pirai Infotech',
    'Portfolio',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Gautam M A — Software Engineer',
    description: 'Software Engineer · Frontend Systems · React · Next.js. Enterprise platforms, ownership, and craft.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Gautam M A',
    locale: 'en_IN',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Portrait of Gautam M A, software engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gautam M A — Software Engineer',
    description: 'Software Engineer · Frontend Systems · React · Next.js.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#060910',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="interface" className={`${dmSans.variable} ${syne.variable} ${newsreader.variable}`}>
      <body className="bg-ink font-sans text-bone antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
