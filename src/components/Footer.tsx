import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer id="contact" className="relative z-10 py-20 md:py-24 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-gradient">ignite</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Let's create something extraordinary together. Your brand deserves to make waves and set fires.
            </p>
            <a
              href="mailto:hello@hydroblaze.media"
              className="text-lg text-hydro hover:text-hydro-glow transition-colors duration-300"
            >
              hello@hydroblaze.media
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:items-end justify-end"
          >
            <div className="flex gap-6 mb-8">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 HydroBlaze Media. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
