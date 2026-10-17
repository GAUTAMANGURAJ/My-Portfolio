import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Newsreader, Syne } from 'next/font/google';

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

export const metadata: Metadata = {
  title: 'Gautam M A — Software Engineer',
  description:
    'Gautam M A — Software Engineer focused on frontend systems. Enterprise platforms, ownership, and craft with React, Next.js, and TypeScript.',
  themeColor: '#060910',
  openGraph: {
    title: 'Gautam M A — Software Engineer',
    description: 'Software Engineer · Frontend Systems · React · Next.js. Enterprise platforms, ownership, and craft.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="interface" className={`${dmSans.variable} ${syne.variable} ${newsreader.variable}`}>
      <body className="bg-ink font-sans text-bone antialiased">{children}</body>
    </html>
  );
}
