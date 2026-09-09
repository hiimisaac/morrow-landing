import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrow — Your day, in a better light',
  description: 'A thoughtfully designed weather app for local forecasts, the hours ahead, and the places you love. Coming to iPhone, with Android to follow.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
