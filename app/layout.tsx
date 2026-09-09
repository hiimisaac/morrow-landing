import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrow — Your day, at a glance',
  description:
    'The weather now, the hours ahead, and the places you keep close. Explore Morrow with interactive sample forecasts. iPhone beta first, Android to follow.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
