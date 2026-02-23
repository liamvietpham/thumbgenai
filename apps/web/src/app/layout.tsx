import { Poppins } from 'next/font/google';
import './global.css';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import type { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'ThumbgenAI',
  description: 'AI thumbnail generator for creators',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="app-bg min-h-screen">
        <Header />
        <main className="pb-8 pt-8 md:pt-24 md:pb-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
