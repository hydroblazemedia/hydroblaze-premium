import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { path: '/services', label: 'Services' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/about', label: 'About' },
  { path: '/careers', label: 'Careers' },
  { path: '/blog', label: 'Blog' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-background/95 backdrop-blur-xl border-b border-hydro/20 shadow-[0_4px_30px_hsl(var(--hydro)/0.15)]'
            : 'py-4 md:py-5 bg-background/80 backdrop-blur-xl border-b border-white/10'
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="HydroBlaze" className="h-18 md:h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hidden md:block text-sm transition-colors duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--hydro))] ${
                  isActive(link.path) ? 'text-foreground drop-shadow-[0_0_8px_hsl(var(--hydro))]' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="#contact" className="hidden md:block group relative px-5 py-2.5 rounded-full text-sm border border-foreground/20 text-foreground transition-all duration-300 hover:border-blaze hover:shadow-[0_0_20px_hsl(var(--blaze)/0.4)]">
              Start Project
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display text-3xl font-semibold transition-colors duration-300 ${
                      isActive(link.path)
                        ? 'text-gradient'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="inline-block px-8 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300"
                >
                  Start Project
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
