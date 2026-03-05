import { motion, useScroll, useTransform } from 'framer-motion';
import { useContactDialog } from '@/components/ContactFormDialog';
import { useRef } from 'react';
import logo3d from '@/assets/hydroblaze-logo-3d.png';

const Hero = () => {
  const { open } = useContactDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const headingWords = ['Where', 'Fluid', 'Design', 'Ignites', 'Growth'];

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 left-1/6 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(var(--hydro)), transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, hsl(var(--blaze)), transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)' }}
        />
      </div>

      <motion.div style={{ y: textY, opacity }} className="text-center max-w-6xl mx-auto relative z-10">
        {/* Floating logo */}
        <motion.div
          style={{ y: logoY }}
          className="mb-10"
        >
          <motion.img
            src={logo3d}
            alt="HydroBlaze"
            className="w-20 h-20 md:w-28 md:h-28 mx-auto object-contain"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] border border-hydro/30 bg-hydro/5 text-hydro backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-hydro animate-pulse" />
            Digital Alchemy
          </span>
        </motion.div>

        {/* Heading — staggered word reveal */}
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight mb-8">
          {headingWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.25em] ${
                word === 'Ignites' || word === 'Growth' ? 'text-gradient' : ''
              }`}
            >
              {word}
              {(word === 'Design') && <br className="hidden md:block" />}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12"
        >
          We fuse cool, data-driven strategy with fiery creative execution.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={() => open("Ignite Your Brand")} className="btn-primary group">
            <span className="flex items-center gap-3">
              Ignite Your Brand
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <a href="/services" className="px-8 py-4 rounded-full font-display font-semibold text-sm text-muted-foreground hover:text-foreground border border-foreground/10 hover:border-foreground/20 transition-all duration-300">
            Explore Services
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
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
      </motion.div>
    </section>
  );
};

export default Hero;
