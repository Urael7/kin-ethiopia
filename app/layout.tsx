import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | KIN ETHIOPIA',
    default: 'KIN ETHIOPIA — Ethiopian Cultural Performance, Circus & Arts',
  },
  description: 'KIN ETHIOPIA is a premier cultural performance organization weaving traditional Ethiopian music, circus acrobatics, dance, and community heritage into world-class art.',
  openGraph: {
    title: 'KIN ETHIOPIA — Culture in Motion',
    description: 'Premier Ethiopian cultural troupe bringing traditional music, circus theatre, and arts to the world.',
    siteName: 'KIN ETHIOPIA',
    type: 'website',
  },
};

import { ThemeProvider } from '@/components/providers/ThemeContext';
import { LanguageProvider } from '@/components/providers/LanguageContext';
import { GeezThemeBackground } from '@/components/ui/GeezThemeBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-kin-parchment text-kin-coffee dark:bg-kin-coffee-dark dark:text-kin-parchment antialiased flex flex-col min-h-screen transition-colors duration-300 relative">
        <ThemeProvider>
          <LanguageProvider>
            <GeezThemeBackground />
            <Header />
            <main id="main-content" className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}