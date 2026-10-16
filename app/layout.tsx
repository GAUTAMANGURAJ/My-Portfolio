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
  title: 'Gautam — Interface Originals',
  description:
    'Gautam M A — Frontend Engineer. Interface Originals: enterprise platforms, ownership, and craft.',
  themeColor: '#060910',
  openGraph: {
    title: 'Gautam — Interface Originals',
    description: 'Frontend Engineer · React · Next.js. Enterprise platforms, ownership, and craft.',
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
