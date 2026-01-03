import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HydroBlazeDuality = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const hydroX = useMotionValue(0);
  const hydroY = useMotionValue(0);
  const blazeX = useMotionValue(0);
  const blazeY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const hydroSpringX = useSpring(hydroX, springConfig);
  const hydroSpringY = useSpring(hydroY, springConfig);
  const blazeSpringX = useSpring(blazeX, springConfig);
  const blazeSpringY = useSpring(blazeY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position to -1 to 1
      const normalizedX = (clientX / innerWidth - 0.5) * 2;
      const normalizedY = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x: normalizedX, y: normalizedY });
      
      // Hydro orb moves toward cursor (subtle attraction)
      hydroX.set(normalizedX * 30);
      hydroY.set(normalizedY * 20);
      
      // Blaze orb moves opposite (creates tension)
      blazeX.set(-normalizedX * 25);
      blazeY.set(-normalizedY * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hydroX, hydroY, blazeX, blazeY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hydro Orb - Upper Left */}
      <motion.div
        className="absolute -left-20 md:left-10 top-20 md:top-32"
        style={{ x: hydroSpringX, y: hydroSpringY }}
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
          whileHover={{ scale: 1.15 }}
          className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-auto cursor-pointer"
        >
          {/* Outer glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, hsl(var(--hydro)) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Main orb */}
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 60px 20px hsl(var(--hydro) / 0.3)',
                '0 0 80px 30px hsl(var(--hydro) / 0.5)',
                '0 0 60px 20px hsl(var(--hydro) / 0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-8 md:inset-12 lg:inset-16 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsl(var(--hydro) / 0.8), hsl(var(--hydro) / 0.4) 50%, hsl(var(--hydro) / 0.1))',
              backdropFilter: 'blur(8px)',
            }}
          />
          {/* Inner highlight */}
          <div 
            className="absolute inset-12 md:inset-16 lg:inset-20 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 40%, hsl(var(--hydro) / 0.6), transparent 60%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Blaze Orb - Lower Right */}
      <motion.div
        className="absolute -right-20 md:right-10 bottom-32 md:bottom-40"
        style={{ x: blazeSpringX, y: blazeSpringY }}
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: 'easeInOut',
            delay: 0.5 
          }}
          whileHover={{ scale: 1.15 }}
          className="relative w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 pointer-events-auto cursor-pointer"
        >
          {/* Outer glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, hsl(var(--blaze)) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Main orb */}
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 60px 20px hsl(var(--blaze) / 0.3)',
                '0 0 80px 30px hsl(var(--blaze) / 0.5)',
                '0 0 60px 20px hsl(var(--blaze) / 0.3)',
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute inset-6 md:inset-10 lg:inset-14 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsl(var(--blaze) / 0.8), hsl(var(--blaze) / 0.4) 50%, hsl(var(--blaze) / 0.1))',
              backdropFilter: 'blur(8px)',
            }}
          />
          {/* Inner highlight */}
          <div 
            className="absolute inset-10 md:inset-14 lg:inset-18 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 40%, hsl(var(--blaze) / 0.6), transparent 60%)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Connection line / energy field between orbs (subtle) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ filter: 'blur(2px)' }}
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--hydro))" />
            <stop offset="100%" stopColor="hsl(var(--blaze))" />
          </linearGradient>
        </defs>
        <motion.line
          x1="15%"
          y1="30%"
          x2="85%"
          y2="70%"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          strokeDasharray="8 12"
          animate={{ 
            strokeDashoffset: [0, -40],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      </svg>
    </div>
  );
};

export default HydroBlazeDuality;
