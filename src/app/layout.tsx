import type { Metadata } from 'next';
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import AppProvider from '@/components/AppProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CompareTray, Modal, Toast } from '@/components/Overlays';
import Splash, { splashScript } from '@/components/Splash';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'schoolnearyou — Find a preschool near you in Pune', template: '%s · schoolnearyou' },
  description: 'Discover trusted preschools around you. Explore classrooms, compare fees, understand facilities, and find the perfect first school for your little one.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body>
        <Splash />
        <AppProvider>
          <div style={{ minHeight: '100vh', background: '#FFFCF7', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
          <CompareTray />
          <Toast />
          <Modal />
        </AppProvider>
      </body>
    </html>
  );
}
