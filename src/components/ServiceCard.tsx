import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const ServiceCard = ({ number, title, description, tags, index }: ServiceCardProps) => {
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
      className="glass-card h-[400px] md:h-[420px] relative group"
      style={{
        ['--mouse-x' as string]: `${mousePosition.x}px`,
        ['--mouse-y' as string]: `${mousePosition.y}px`,
      }}
    >
      {/* Gradient hover effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), 
            hsl(var(--hydro) / 0.12), 
            hsl(var(--blaze) / 0.06), 
            transparent 50%)`
        }}
      />

      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
        {/* Top row */}
        <div className="flex items-center justify-between mb-auto">
          <span className="text-sm text-muted-foreground font-display">{number}</span>
          <span className="text-muted-foreground group-hover:text-hydro transition-colors duration-300">↗</span>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">{title}</h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
