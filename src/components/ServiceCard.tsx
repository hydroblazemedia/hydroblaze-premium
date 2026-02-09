import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  index: number;
}

const ServiceCard = ({ 
  icon, 
  title, 
  tagline, 
  description, 
  includes, 
  index 
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group rounded-2xl overflow-hidden"
    >
      {/* Animated border glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-0"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, 
            hsl(var(--hydro) / 0.4), 
            hsl(var(--blaze) / 0.4), 
            hsl(var(--hydro) / 0.4))`,
          padding: '1px',
        }}
      />

      {/* Card inner */}
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl group-hover:border-white/5 transition-all duration-500">
        {/* Mouse-follow radial */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              hsl(var(--hydro) / 0.08), 
              transparent 50%)`
          }}
        />

        {/* Top gradient line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-hydro/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 p-7 md:p-9">
          {/* Header with number badge */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-hydro/15 to-blaze/10 border border-white/10 flex items-center justify-center text-2xl"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                {icon}
              </motion.div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="text-hydro font-medium text-sm mt-0.5">{tagline}</p>
              </div>
            </div>
            <span className="font-display text-3xl font-bold text-foreground/[0.06] select-none leading-none">
              {cardNumber}
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-7">{description}</p>

          {/* Includes with animated reveal */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-4 font-semibold">What's included</h4>
            <div className="space-y-2.5">
              {includes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 text-sm group/item"
                >
                  <div className="w-5 h-5 rounded-md bg-hydro/10 border border-hydro/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-hydro/20 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-hydro" />
                  </div>
                  <span className="text-foreground/70 group-hover/item:text-foreground/90 transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
