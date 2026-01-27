import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  tagline: string;
  description: string[];
  whatWeDo: string[];
  whatYouGet: string[];
  bestFor: string;
  keywords: string[];
  index: number;
}

const ServiceCard = ({ 
  icon, 
  title, 
  tagline, 
  description, 
  whatWeDo, 
  whatYouGet, 
  bestFor, 
  keywords, 
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

      <div className="relative z-10 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{icon}</span>
          <h3 className="font-display text-xl md:text-2xl font-medium">{title}</h3>
        </div>

        {/* Tagline */}
        <p className="text-hydro font-medium text-sm md:text-base mb-4">{tagline}</p>

        {/* Description */}
        <div className="space-y-2 mb-6">
          {description.map((para, i) => (
            <p key={i} className="text-muted-foreground text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* What we do */}
        <div className="mb-5">
          <h4 className="text-xs uppercase tracking-wider text-foreground/70 mb-3 font-medium">What we do</h4>
          <ul className="space-y-1.5">
            {whatWeDo.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-hydro mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What you get */}
        <div className="mb-5">
          <h4 className="text-xs uppercase tracking-wider text-foreground/70 mb-3 font-medium">What you get</h4>
          <ul className="space-y-1.5">
            {whatYouGet.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-blaze mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Best for */}
        <div className="mb-6 p-3 rounded-lg bg-foreground/5 border border-foreground/10">
          <p className="text-xs uppercase tracking-wider text-foreground/70 mb-1 font-medium">Best for</p>
          <p className="text-sm text-foreground/90">{bestFor}</p>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2">
          {keywords.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-foreground/10 text-muted-foreground uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
