import React, { useState, useEffect } from 'react';
import { Heart, Edit3, Share2, Sparkles, Music, Menu, X } from 'lucide-react';
import { ThemeConfig } from '../types';

interface NavbarProps {
  creatorName: string;
  partnerName: string;
  theme: ThemeConfig;
  activeView: 'presentation' | 'builder';
  onToggleView: () => void;
  onOpenShare: () => void;
  isSharedRecipient?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  creatorName,
  partnerName,
  theme,
  activeView,
  onToggleView,
  onOpenShare,
  isSharedRecipient = false,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('cover');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = ['cover', 'counter', 'letter', 'gallery', 'videos', 'quotes', 'vouchers', 'timeline', 'reasons'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'cover', label: 'Inicio' },
    { id: 'counter', label: 'Tiempo Juntos' },
    { id: 'letter', label: 'La Carta' },
    { id: 'gallery', label: 'Galería' },
    { id: 'vouchers', label: 'Vales' },
    { id: 'timeline', label: 'Línea del Tiempo' },
    { id: 'reasons', label: 'Razones' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-rose-500/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand logo & couple names */}
        <div
          onClick={() => scrollToSection('cover')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-rose-500/40 text-rose-400 animate-pulse" />
          </div>
          <div>
            <span className="font-serif-elegant font-bold text-lg text-white tracking-wide">
              {partnerName ? `${partnerName} & ${creatorName}` : 'Love Letter'}
            </span>
            <span className="block text-[10px] text-rose-300/70 tracking-widest uppercase font-medium">
              Carta Digital
            </span>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`transition-colors relative py-1 ${
                activeSection === link.id
                  ? 'text-rose-300 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {!isSharedRecipient && (
            <button
              onClick={onToggleView}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all shadow-sm"
              title={activeView === 'presentation' ? 'Editar carta' : 'Ver presentación'}
            >
              {activeView === 'presentation' ? (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-rose-300" />
                  <span className="hidden sm:inline">Modo Edición</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  <span>Ver Carta</span>
                </>
              )}
            </button>
          )}

          {!isSharedRecipient && (
            <button
              onClick={onOpenShare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-md shadow-rose-500/25"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compartir</span>
            </button>
          )}

          {isSharedRecipient && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
              <span>Para Ti</span>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 border border-slate-700/50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-rose-500/20 px-6 py-4 mt-2 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                  activeSection === link.id
                    ? 'bg-rose-500/20 text-rose-300 font-medium'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
