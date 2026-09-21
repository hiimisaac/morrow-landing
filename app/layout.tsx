import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrow — Your day. Beautifully clear.',
  description:
    'Know the hour to head out. See the week taking shape. Morrow is a beautifully clear weather app for iPhone and iPad, with Android coming soon.',
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
