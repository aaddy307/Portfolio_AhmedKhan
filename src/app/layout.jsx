import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/Components/navbar';
import { ParticlesBackground } from '@/Components/particles-background';
import { Footer } from '@/Components/footer';
import { getPersonalInfo } from '@/lib/config';
import { Toaster } from '@/Components/ui/toaster';
import { CustomCursor } from '@/Components/custom-cursor';

const inter = Inter({ subsets: ['latin'] });

const personalInfo = getPersonalInfo();

export const metadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: personalInfo.bio,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <CustomCursor />
        <ParticlesBackground />
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
