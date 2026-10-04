import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DiscoveryCallModal } from './components/modals/DiscoveryCallModal';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Solutions } from './pages/Solutions';
import { Industries } from './pages/Industries';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | undefined>(undefined);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark');
    }
  };

  const handleOpenDiscovery = (serviceSlug?: string) => {
    setSelectedServiceSlug(serviceSlug);
    setIsDiscoveryOpen(true);
  };

  const handleCloseDiscovery = () => {
    setIsDiscoveryOpen(false);
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#F5F2EB] transition-colors duration-500 font-sans selection:bg-[#C7A86D] selection:text-black">
        <Navbar
          onOpenConsultation={() => handleOpenDiscovery()}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Home onOpenConsultation={() => handleOpenDiscovery()} />}
            />
            <Route
              path="/services"
              element={<Services onOpenConsultation={handleOpenDiscovery} />}
            />
            <Route
              path="/services/:slug"
              element={<ServiceDetail onOpenConsultation={handleOpenDiscovery} />}
            />
            <Route
              path="/solutions"
              element={<Solutions onOpenConsultation={() => handleOpenDiscovery()} />}
            />
            <Route
              path="/industries"
              element={<Industries onOpenConsultation={() => handleOpenDiscovery()} />}
            />
            <Route
              path="/how-it-works"
              element={<HowItWorks onOpenConsultation={() => handleOpenDiscovery()} />}
            />
            <Route
              path="/about"
              element={<About onOpenConsultation={() => handleOpenDiscovery()} />}
            />
            <Route
              path="/contact"
              element={<Contact onOpenConsultation={() => handleOpenDiscovery()} />}
            />

            {/* Seamless backward compatibility redirects */}
            <Route path="/projects" element={<Navigate to="/services" replace />} />
            <Route path="/projects/*" element={<Navigate to="/services" replace />} />
            <Route path="/owners" element={<Navigate to="/about" replace />} />
            <Route path="/impact" element={<Navigate to="/how-it-works" replace />} />
            <Route path="/demos" element={<Navigate to="/services" replace />} />

            {/* Fallback route */}
            <Route
              path="*"
              element={<Home onOpenConsultation={() => handleOpenDiscovery()} />}
            />
          </Routes>
        </main>

        <Footer onOpenConsultation={() => handleOpenDiscovery()} />

        {/* Global Discovery Call Modal */}
        <DiscoveryCallModal
          isOpen={isDiscoveryOpen}
          onClose={handleCloseDiscovery}
          initialServiceSlug={selectedServiceSlug}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
