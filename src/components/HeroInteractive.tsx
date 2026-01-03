import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroInteractiveProps {
  mode: 'hydro' | 'blaze';
  containerRef: React.RefObject<HTMLElement>;
}

const HeroInteractive = ({ mode, containerRef }: HeroInteractiveProps) => {
  const [isHoveringHydro, setIsHoveringHydro] = useState(false);
  const [isHoveringBlaze, setIsHoveringBlaze] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for cursor following
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position to orb movement (subtle parallax)
  const hydroX = useTransform(smoothX, [0, 1], [-20, 20]);
  const hydroY = useTransform(smoothY, [0, 1], [-15, 15]);
  const blazeX = useTransform(smoothX, [0, 1], [20, -20]);
  const blazeY = useTransform(smoothY, [0, 1], [15, -15]);

  // Spotlight position
  const spotlightX = useTransform(smoothX, [0, 1], [0, 100]);
  const spotlightY = useTransform(smoothY, [0, 1], [0, 100]);

  // Color blend based on horizontal position
  const hydroOpacity = useTransform(smoothX, [0, 0.5, 1], [0.6, 0.4, 0.2]);
  const blazeOpacity = useTransform(smoothX, [0, 0.5, 1], [0.2, 0.4, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef, mouseX, mouseY]);

  return (
    <>
      {/* Mouse-following gradient spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-5"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}% ${y}%, 
                hsl(var(--hydro) / 0.15), 
                hsl(var(--blaze) / 0.1), 
                transparent 60%)`
          ),
        }}
      />

      {/* Hydro Orb - Upper Left */}
      <motion.div
        className="absolute -top-20 -left-20 md:top-10 md:left-10 w-64 h-64 md:w-80 md:h-80 pointer-events-auto cursor-pointer"
        style={{ x: hydroX, y: hydroY }}
        onHoverStart={() => setIsHoveringHydro(true)}
        onHoverEnd={() => setIsHoveringHydro(false)}
        animate={{
          scale: isHoveringHydro ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--hydro) / 0.4) 0%, transparent 70%)',
              filter: isHoveringHydro ? 'blur(40px)' : 'blur(30px)',
            }}
            animate={{
              opacity: isHoveringHydro ? 0.9 : 0.6,
              scale: isHoveringHydro ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Core orb */}
          <motion.div
            className="absolute inset-8 md:inset-12 rounded-full orb-hydro"
            animate={{
              boxShadow: isHoveringHydro
                ? '0 0 60px 20px hsl(var(--hydro) / 0.5), inset 0 0 30px hsl(var(--hydro) / 0.3)'
                : '0 0 40px 10px hsl(var(--hydro) / 0.3), inset 0 0 20px hsl(var(--hydro) / 0.2)',
            }}
          />
          {/* Inner highlight */}
          <div className="absolute inset-12 md:inset-16 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Blaze Orb - Lower Right */}
      <motion.div
        className="absolute -bottom-20 -right-20 md:bottom-20 md:right-10 w-64 h-64 md:w-72 md:h-72 pointer-events-auto cursor-pointer"
        style={{ x: blazeX, y: blazeY }}
        onHoverStart={() => setIsHoveringBlaze(true)}
        onHoverEnd={() => setIsHoveringBlaze(false)}
        animate={{
          scale: isHoveringBlaze ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--blaze) / 0.4) 0%, transparent 70%)',
              filter: isHoveringBlaze ? 'blur(40px)' : 'blur(30px)',
            }}
            animate={{
              opacity: isHoveringBlaze ? 0.9 : 0.6,
              scale: isHoveringBlaze ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Core orb */}
          <motion.div
            className="absolute inset-8 md:inset-10 rounded-full orb-blaze"
            animate={{
              boxShadow: isHoveringBlaze
                ? '0 0 60px 20px hsl(var(--blaze) / 0.5), inset 0 0 30px hsl(var(--blaze) / 0.3)'
                : '0 0 40px 10px hsl(var(--blaze) / 0.3), inset 0 0 20px hsl(var(--blaze) / 0.2)',
            }}
          />
          {/* Inner highlight */}
          <div className="absolute inset-12 md:inset-14 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Ambient particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-hydro/40' : 'bg-blaze/40'}`}
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default HeroInteractive;
