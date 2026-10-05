import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { VittorisLogo } from '../common/VittorisLogo';
import { VITTORIS_SERVICES } from '../../data/vittorisData';

interface NavbarProps {
  onOpenConsultation: () => void;
  theme: 'dark' | 'eye-protection' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  theme,
  onToggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const t = setTimeout(() => {
      setMobileMenuOpen(false);
      setServicesDropdownOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Solutions', path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#C7A86D]/15 py-3.5 shadow-xl shadow-black/60'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center group">
              <VittorisLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
              <Link
                to="/"
                className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  location.pathname === '/'
                    ? 'text-[#C7A86D]'
                    : 'text-slate-300 hover:text-[#C7A86D]'
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    location.pathname.startsWith('/services')
                      ? 'text-[#C7A86D]'
                      : 'text-slate-300 hover:text-[#C7A86D]'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180 text-[#C7A86D]' : ''}`} />
                </Link>

                {/* Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[540px] mt-2 p-4 bg-[#111111] border border-[#C7A86D]/25 rounded-2xl shadow-2xl shadow-black/90 grid grid-cols-2 gap-2 z-50 backdrop-blur-2xl">
                    <div className="col-span-2 pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#C7A86D] uppercase tracking-[0.2em] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#C7A86D]" /> Explore Services
                      </span>
                      <Link
                        to="/services"
                        className="text-[10px] text-[#C7A86D] hover:text-[#E5C788] uppercase tracking-wider font-semibold flex items-center gap-1"
                      >
                        All Services Directory <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {VITTORIS_SERVICES.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#C7A86D]/20 transition-all group"
                      >
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-[#C7A86D] transition-colors flex items-center gap-1.5 font-serif">
                          <span className="text-[10px] font-mono text-[#C7A86D]/80">{srv.number}.</span>
                          <span className="truncate">{srv.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                          {srv.shortDesc}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-[#C7A86D]'
                      : 'text-slate-300 hover:text-[#C7A86D]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                className="px-3 py-1.5 rounded-full border border-[#C7A86D]/20 text-slate-300 hover:text-[#C7A86D] hover:border-[#C7A86D]/50 transition-all flex items-center gap-1.5 text-[10px] uppercase tracking-wider cursor-pointer"
                title={`Current: ${theme === 'dark' ? 'Dark Mode' : theme === 'eye-protection' ? 'Eye Protection Mode' : 'Light Mode'}. Click to toggle.`}
                aria-label="Toggle visual theme"
              >
                {theme === 'dark' && (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#C7A86D]" />
                    <span className="text-slate-400">Dark</span>
                  </>
                )}
                {theme === 'eye-protection' && (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300 font-semibold">Eye Care</span>
                  </>
                )}
                {theme === 'light' && (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-slate-600 font-semibold">Light</span>
                  </>
                )}
              </button>

              {/* Book Discovery Call Button */}
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-[#C7A86D]/20 hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <span>Book Discovery Call</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full border border-[#C7A86D]/20 text-slate-400 hover:text-[#C7A86D] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' && <Moon className="w-4 h-4 text-[#C7A86D]" />}
                {theme === 'eye-protection' && <Eye className="w-4 h-4 text-amber-400" />}
                {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-[#C7A86D] rounded-lg transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0B0B0B]/95 backdrop-blur-2xl pt-24 px-6 pb-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-6">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C7A86D]/40 to-transparent" />
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 border-b border-white/5 text-xs tracking-[0.25em] uppercase text-white hover:text-[#C7A86D]"
              >
                <span>Home</span>
                {location.pathname === '/' && <span className="w-1.5 h-1.5 rounded-full bg-[#C7A86D]" />}
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 border-b border-white/5 text-xs tracking-[0.25em] uppercase text-[#C7A86D]"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C7A86D]" />
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 border-b border-white/5 text-xs tracking-[0.25em] uppercase text-slate-300 hover:text-[#C7A86D]"
                >
                  <span>{link.name}</span>
                  {location.pathname === link.path && <span className="w-1.5 h-1.5 rounded-full bg-[#C7A86D]" />}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C7A86D] via-[#D4AF37] to-[#B39355] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#C7A86D]/25"
            >
              <span>Book Discovery Call</span>
            </button>
            <div className="text-center text-[10px] tracking-widest uppercase text-slate-500">
              Vittoris AI Systems • company@vittoris.com
            </div>
          </div>
        </div>
      )}
    </>
  );
};
