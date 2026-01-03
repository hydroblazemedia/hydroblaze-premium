import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="HydroBlaze" className="h-14 md:h-16 w-auto" />
          
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          <a href="#work" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--hydro))]">
            Work
          </a>
          <a href="#services" className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--hydro))]">
            Services
          </a>
          <a href="#contact" className="group relative px-5 py-2.5 rounded-full text-sm border border-foreground/20 text-foreground transition-all duration-300 hover:border-blaze hover:shadow-[0_0_20px_hsl(var(--blaze)/0.4)]">
            Start Project
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
export default Navbar;