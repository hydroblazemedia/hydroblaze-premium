import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroInteractive from './HeroInteractive';

const Hero = () => {
  const [mode, setMode] = useState<'hydro' | 'blaze'>('hydro');
  const containerRef = useRef<HTMLElement>(null);

  const toggleMode = () => {
    setMode((prev) => (prev === 'hydro' ? 'blaze' : 'hydro'));
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Interactive background elements */}
      <HeroInteractive mode={mode} containerRef={containerRef} />

      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Radial backdrop for readability */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, transparent 70%)',
          }}
        />
        
        {/* Interactive Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <motion.button
            onClick={toggleMode}
            className={`badge-glow cursor-pointer transition-all duration-300 ${
              mode === 'hydro' ? 'badge-hydro' : 'badge-blaze'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <motion.span
                animate={{ rotate: mode === 'hydro' ? 0 : 180 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                ✦
              </motion.span>
              Digital Alchemy
              <motion.span
                animate={{ rotate: mode === 'hydro' ? 0 : -180 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                ✦
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-8"
        >
          Where Fluid Design
          <br />
          <motion.span 
            className={mode === 'hydro' ? 'text-gradient-hydro' : 'text-gradient-blaze'}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Ignites Growth
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto leading-relaxed mb-12"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          We fuse cool, data-driven strategy with fiery creative execution.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="btn-primary group">
            <span className="flex items-center gap-3">
              Ignite Your Brand
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Mode indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-xs text-foreground/40 uppercase tracking-widest"
        >
          <span className="opacity-60">Click badge to toggle:</span>{' '}
          <motion.span
            key={mode}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={mode === 'hydro' ? 'text-hydro' : 'text-blaze'}
          >
            {mode} mode
          </motion.span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-foreground/20 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-foreground/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
