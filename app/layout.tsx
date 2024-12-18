import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-blue-600">
                    Python100
                  </span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="min-h-screen">
          {children}
        </div>
        <footer className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Python100. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
} 