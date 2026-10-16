import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Gautam M A — Frontend Engineer',
  description: 'Portfolio of Gautam M A, a frontend engineer building scalable web applications.',
  openGraph: { title: 'Gautam M A — Frontend Engineer', description: 'Building scalable web applications.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body></html>;
}
