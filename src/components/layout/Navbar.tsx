import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { VittorisLogo } from '../common/VittorisLogo';
import { VITTORIS_SERVICES } from '../../data/vittorisData';

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
    { name: 'AI Labs & Demos', path: '/demos' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06080F]/90 backdrop-blur-xl border-b border-blue-900/30 py-3 shadow-xl shadow-black/40'
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
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/"
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>

              {/* Services Mega Dropdown trigger */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  to="/services"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    location.pathname.startsWith('/services')
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </Link>

                {/* Dropdown Menu */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[540px] mt-2 p-4 bg-[#0B0F1E] border border-blue-900/40 rounded-2xl shadow-2xl shadow-black/80 grid grid-cols-2 gap-2 z-50 backdrop-blur-2xl">
                    <div className="col-span-2 pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400" /> Complete 10-Service AI Ecosystem
                      </span>
                      <Link
                        to="/services"
                        className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        All Services Directory <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {VITTORIS_SERVICES.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-blue-900/40 transition-all group"
                      >
                        <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-cyan-500">{srv.number}.</span>
                          <span className="truncate">{srv.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
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
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
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
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                aria-label="Toggle visual theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              {/* Book Discovery Call Button */}
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Book a Discovery Call</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-40 lg:hidden bg-[#06080F]/95 backdrop-blur-2xl pt-24 px-6 pb-8 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-bold text-white border-b border-slate-800"
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-bold text-blue-400 border-b border-slate-800 flex items-center justify-between"
              >
                <span>Services (All 10 Categories)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">10</span>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-medium text-slate-300 hover:text-white border-b border-slate-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Quick Service Links for Mobile */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-semibold uppercase text-slate-400">Featured AI Services:</div>
              <div className="grid grid-cols-1 gap-1 text-xs">
                {VITTORIS_SERVICES.slice(0, 5).map(s => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 text-slate-300 hover:text-blue-400 truncate"
                  >
                    • {s.number}. {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </button>
            <div className="text-center text-[11px] text-slate-500">
              Direct Contact: info@vittoris.com • +91 90159 20523
            </div>
          </div>
        </div>
      )}
    </>
  );
};
