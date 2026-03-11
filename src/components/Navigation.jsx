import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { UHAnalytics } from '@/lib/analytics';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const navLinks = [
    {
      name: 'Solutions',
      path: '/solutions',
      children: [
        { name: 'All Solutions', path: '/solutions' },
        { name: 'Modernization', path: '/solutions/migration' },
        { name: 'DevOps', path: '/solutions/cloud-devops' },
        { name: 'FinOps', path: '/solutions/finops' },
        { name: 'Zero Trust', path: '/solutions/zero-trust-security' },
        { name: 'Graphic Designing', path: '/solutions/graphic-designing' }
      ]
    },
    { name: 'Method', path: '/method' },
    { name: 'Outcomes', path: '/outcomes' },
    { name: 'Resources', path: '/resources' },
    { name: 'Trust', path: '/trust-center' },
    { name: 'About', path: '/about' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        scrolled || !isHomePage
          ? "bg-white/80 dark:bg-[#050A14]/80 backdrop-blur-xl border-b border-[#001F3F]/[0.06] dark:border-white/[0.04] py-2 md:py-3"
          : "bg-transparent py-4 md:py-5"
      )}
      style={{ minHeight: 'var(--header-h)' }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-50">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold rounded-lg p-1 tap-target"
            aria-label="Unifiedhive Home"
            onClick={() => { setIsOpen(false); UHAnalytics.trackClick('logo', 'navigation'); }}
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src="https://horizons-cdn.hostinger.com/3d5f6b13-c880-47b3-8cfb-48f3d18da893/65a7b1a51649e52a56ad0d3c553b286e.png"
                alt="Unifiedhive Logo"
                className="w-full h-full object-contain"
                width="40" height="40"
              />
            </motion.div>
            <span className="text-lg md:text-xl font-bold font-heading text-[#001F3F] dark:text-white tracking-tight">
              Unifiedhive
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.children ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#001F3F]/70 dark:text-white/70 hover:text-[#001F3F] dark:hover:text-white transition-colors duration-300 focus:outline-none tap-target">
                    {link.name} <ChevronDown size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#0A1228]/95 backdrop-blur-xl border border-white/[0.06] p-2 min-w-[200px] z-[60] shadow-2xl shadow-black/40">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.name} className="focus:bg-white/[0.04] cursor-pointer rounded-lg">
                        <Link
                          to={child.path}
                          className="w-full text-gray-300 hover:text-[#FFD700] text-sm py-1.5 px-2 block transition-colors duration-200"
                          onClick={() => UHAnalytics.trackClick(child.name, 'navigation_dropdown')}
                        >
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group px-3 py-2 tap-target"
                  onClick={() => UHAnalytics.trackClick(link.name, 'navigation')}
                >
                  <span className="text-sm font-medium text-[#001F3F]/70 dark:text-white/70 group-hover:text-[#001F3F] dark:group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#FFD700] to-[#06B6D4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              )
            ))}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full text-[#001F3F]/60 dark:text-white/60 hover:text-[#FFD700] transition-all duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] tap-target overflow-hidden"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <Link to="/contact" className="tap-target">
              <Button variant="ghost" className="text-sm text-[#001F3F]/70 dark:text-white/70 hover:text-[#001F3F] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] font-medium">
                Contact
              </Button>
            </Link>

            <Link to="/book-demo">
              <Button className="btn-premium text-sm font-semibold px-6">
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-[#001F3F]/60 dark:text-white/60 hover:text-[#FFD700] transition-all duration-300 tap-target relative z-50"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-[#001F3F] dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors tap-target relative z-50"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#050A14]/98 backdrop-blur-2xl z-40 lg:hidden pt-24 px-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col space-y-2 pb-24"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="flex flex-col space-y-1 mb-2">
                      <span className="text-xs font-semibold text-white/30 uppercase tracking-[0.15em] px-3 py-2 font-heading">{link.name}</span>
                      <div className="pl-3 border-l border-[#FFD700]/20 flex flex-col">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className="text-base text-white/70 hover:text-[#FFD700] font-medium py-2.5 px-3 tap-target transition-colors"
                            onClick={() => { setIsOpen(false); }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link
                        to={link.path}
                        className="text-2xl font-bold text-white/90 hover:text-[#FFD700] font-heading block py-3 px-3 tap-target transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="h-px bg-white/[0.06] my-4" />
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white/70 hover:text-white justify-start text-lg px-3 font-medium">Contact</Button>
              </Link>
              <Link to="/book-demo" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-premium text-lg py-6 justify-center">Book Demo</Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;