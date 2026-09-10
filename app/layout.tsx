import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrow — Your day. Beautifully clear.',
  description:
    'Know the hour to head out. See the week taking shape. Meet Morrow, a beautifully clear weather app. iPhone beta first, Android follows.',
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
