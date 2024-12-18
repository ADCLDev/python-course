import { inter } from './fonts';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100 Days of Python',
  description: 'Learn Python programming from beginner to professional in 100 days',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
} 