import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { VittorisLogo } from '../common/VittorisLogo';

interface NavbarProps {
  onOpenConsultation: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  theme,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solar Panels', path: '/projects' },
    { name: 'Founder & Vision', path: '/owners' },
    { name: 'Contact Desk', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#08090A]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group select-none">
            <VittorisLogo size="md" subtitleText="AI Systems • Solar & Clean Energy" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Official Email Link */}
            <a
              href="mailto:info@vittoris.com?subject=Solar%20Panel%20%26%20Clean%20Energy%20Inquiry%20-%20Vittoris"
              className="flex items-center gap-2 text-xs text-white/90 hover:text-[#D4AF37] px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[#D4AF37]/40 transition-colors"
              title="Email info@vittoris.com"
            >
              <Mail size={13} className="text-[#D4AF37]" />
              <span className="font-mono">info@vittoris.com</span>
            </a>

            {/* Direct Phone Link */}
            <a
              href="tel:+919015920523"
              className="flex items-center gap-2 text-xs text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/10 bg-white/5 transition-colors font-mono"
              title="Call the Team of Udayveer Singh"
            >
              <Phone size={12} className="text-white/60" />
              <span>+91 90159 20523</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="w-9 h-9 rounded-full border border-white/10 hover:border-[#D4AF37]/50 flex items-center justify-center text-white/70 hover:text-[#D4AF37] bg-white/5 transition-all"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Direct Meeting Consultation Button */}
            <Button
              variant="gold"
              size="sm"
              onClick={onOpenConsultation}
              icon={<Calendar size={13} />}
            >
              Consult Desk
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <a
              href="mailto:info@vittoris.com"
              className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]"
              title="Email info@vittoris.com"
            >
              <Mail size={14} />
            </a>
            <a
              href="tel:+919015920523"
              className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white"
              title="Call 9015920523"
            >
              <Phone size={13} />
            </a>
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1 hover:text-[#D4AF37] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090A]/95 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-serif tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#D4AF37]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href="mailto:info@vittoris.com?subject=Solar%20Panel%20%26%20Clean%20Energy%20Inquiry%20-%20Vittoris"
                className="py-2.5 px-4 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center gap-2 font-mono text-sm font-semibold"
              >
                <Mail size={15} />
                <span>info@vittoris.com</span>
              </a>
              <a
                href="tel:+919015920523"
                className="py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 font-mono text-sm"
              >
                <Phone size={14} className="text-[#D4AF37]" />
                <span>+91 90159 20523</span>
              </a>
              <Button
                variant="gold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                icon={<Calendar size={15} />}
              >
                Consult the Team of Udayveer
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
