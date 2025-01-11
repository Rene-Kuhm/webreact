import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import SkipToContent from '@/components/SkipToContent/SkipToContent';
import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <SkipToContent />
        <Navigation />
        <main id="main-content" className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;