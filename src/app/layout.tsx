import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

const serifFont = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b1a30',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Future Minds',
    default: 'Future Minds | Helping young minds explore the world of technology',
  },
  description:
    'Future Minds is a student-led nonprofit making coding and AI education more accessible to young learners around the world. Free weekly classes across Beginner, Intermediate, and Advanced levels. LEARN / BUILD / BELONG.',
  keywords: [
    'Future Minds',
    'student-led nonprofit',
    'youth coding education',
    'AI education for kids',
    'free coding classes',
    'LEARN BUILD BELONG',
    'computer science for young learners',
  ],
  authors: [{ name: 'Future Minds Initiative' }],
  metadataBase: new URL('https://futureminds.org'),
  openGraph: {
    title: 'Future Minds | Helping young minds explore the world of technology',
    description:
      'Student-led nonprofit making coding and AI education more accessible to young learners around the world. One class per week. 100% free community program.',
    url: 'https://futureminds.org',
    siteName: 'Future Minds',
    images: [
      {
        url: '/logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'Future Minds - LEARN / BUILD / BELONG',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Minds | Student-Led Coding & AI Education',
    description: 'Helping young minds explore the world of technology. LEARN / BUILD / BELONG.',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0b1a30] selection:bg-[#0066FF] selection:text-white">
        <Navbar />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
