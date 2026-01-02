import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 md:py-8"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="HydroBlaze" className="h-10 md:h-12 w-auto" />
          <span className="font-display font-bold text-lg md:text-xl tracking-wider uppercase text-gradient">
            HYDROBLAZE
          </span>
        </a>

        {/* Navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          <a
            href="#work"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--hydro))]"
          >
            Work
          </a>
          <a
            href="#services"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--hydro))]"
          >
            Services
          </a>
          <a
            href="#contact"
            className="group relative px-5 py-2.5 rounded-full text-sm border border-foreground/20 text-foreground transition-all duration-300 hover:border-blaze hover:shadow-[0_0_20px_hsl(var(--blaze)/0.4)]"
          >
            Start Project
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
