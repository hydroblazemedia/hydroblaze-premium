import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    number: '01',
    title: 'Hydro Strategy',
    description: 'Fluid, adaptive marketing ecosystems that flow where your customers are. We create data-driven campaigns that evolve.',
    tags: ['SEO', 'Funnel Architecture', 'Analytics'],
  },
  {
    number: '02',
    title: 'Blaze Creative',
    description: 'High-energy visual content designed to stop the scroll and burn into memory. Bold visuals that demand attention.',
    tags: ['3D Motion', 'Viral Video', 'Brand Design'],
  },
  {
    number: '03',
    title: 'Fusion Tech',
    description: 'The perfect blend of code and design. Websites that load fast, look incredible, and convert visitors into customers.',
    tags: ['React', 'WebGL', 'Performance'],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="font-display text-2xl md:text-3xl font-normal">
            Our Elements
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
