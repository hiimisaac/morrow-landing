import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrow — Make a little room for outside',
  description: 'A weather app for whatever you make of the day. Hourly forecasts, the days ahead, and the places you love. iPhone beta first, Android to follow.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
