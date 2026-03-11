import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieNotice from '@/components/CookieNotice';
import TawkToChat from '@/components/TawkToChat';
import AIChatWidget from '@/components/AIChatWidget';
import MagicShareMenu from '@/components/MagicShareMenu';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import MeshBackground from '@/components/MeshBackground';
import AnimatedRoutes from '@/AnimatedRoutes';
import { usePageTracking } from '@/lib/analytics';

const AnalyticsWrapper = ({ children }) => {
  usePageTracking();
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
          </Helmet>

          <AnalyticsWrapper>
            <MeshBackground />

            <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative" style={{ zIndex: 1 }}>
              <Navigation />
              <main className="flex-grow w-full">
                <AnimatedRoutes />
              </main>
              <Footer />
              <div className="cookie-banner">
                <CookieNotice />
              </div>
              <TawkToChat />
              <AIChatWidget />
              <MagicShareMenu />
              <Toaster />
            </div>
          </AnalyticsWrapper>

        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;