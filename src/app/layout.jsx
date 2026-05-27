import './globals.css';
import { Inter } from 'next/font/google';
import { getPersonalInfo } from '@/lib/config';
import ConditionalLayout from './conditional-layout';

const inter = Inter({ subsets: ['latin'] });

const personalInfo = getPersonalInfo();

export const metadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: personalInfo.bio,
  keywords: ['portfolio', 'web developer', 'UI/UX designer', 'Ahmed Khan', 'full-stack developer', 'Mumbai developer'],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
    type: 'website',
    locale: 'en_US',
    siteName: `${personalInfo.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} overflow-x-hidden`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to content
        </a>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
