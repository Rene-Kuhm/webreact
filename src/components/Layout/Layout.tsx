import { ThemeProvider } from '@/components/ThemeProvider/theme-provider';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import SkipToContent from '@/components/SkipToContent/SkipToContent';
import { type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <SkipToContent />
        <Navigation />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;