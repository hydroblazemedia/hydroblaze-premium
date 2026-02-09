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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="glass-card relative group"
      style={{
        ['--mouse-x' as string]: `${mousePosition.x}px`,
        ['--mouse-y' as string]: `${mousePosition.y}px`,
      }}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), 
            hsl(var(--hydro) / 0.12), 
            hsl(var(--blaze) / 0.06), 
            transparent 50%)`
        }}
      />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <h3 className="font-display text-xl md:text-2xl font-medium">{title}</h3>
        </div>

        <p className="text-hydro font-medium text-sm md:text-base mb-4 italic">{tagline}</p>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-foreground/70 mb-3 font-medium">Includes</h4>
          <ul className="space-y-1.5">
            {includes.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-hydro mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
