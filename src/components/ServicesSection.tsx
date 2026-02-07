import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: '💧',
    title: 'Hydro Strategy',
    tagline: 'Clarity before execution',
    description: 'We build data-backed strategies that guide content, ads, and engagement — so every action has purpose.',
    includes: [
      'Brand & market analysis',
      'Audience & competitor research',
      'Content & platform strategy',
      'Funnel & lead journey planning',
      'Monthly performance review & optimisation',
    ],
    outcome: 'A clear roadmap aligned with your business goals.',
  },
  {
    icon: '🔥',
    title: 'Blaze Creative',
    tagline: 'Content designed to perform',
    description: 'We create scroll-stopping creatives built specifically for social platforms and paid distribution.',
    includes: [
      'Social media posts (static & reels)',
      'Short-form video editing',
      'Ad creatives & thumbnails',
      'Brand-aligned visual consistency',
      'Performance-focused content formats',
    ],
    outcome: 'Higher engagement, stronger brand recall, and content that converts.',
  },
  {
    icon: '📸',
    title: 'Content Production',
    tagline: 'Shoot with intent. Create at scale.',
    description: 'We handle on-ground shoots designed for reels, ads, and high-performing content.',
    includes: [
      'On-location photo & video shoots',
      'Reel-first shooting approach',
      'Product & service shoots',
      'Content shortlisting & editing',
      'Multi-format outputs for social platforms',
    ],
    outcome: 'High-quality raw content ready for consistent posting and ads.',
  },
  {
    icon: '📈',
    title: 'Performance Marketing',
    tagline: 'Paid growth with structure & accountability',
    description: 'We manage paid campaigns with strict control to ensure sustainable scaling.',
    includes: [
      'Meta ads strategy & setup',
      'Audience testing & optimisation',
      'Creative iteration & scaling',
      'Performance tracking & reporting',
      'Lead quality & funnel alignment',
    ],
    outcome: 'Predictable lead flow with controlled ad spend.',
  },
];

const howWeWork = [
  'Clear scopes & timelines',
  'Structured execution',
  'Data-driven decisions',
  'Long-term partnerships',
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
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Focused execution. Scalable growth. No distractions.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At HydroBlaze Media, we deliberately focus on services we can execute at the highest level today — ensuring consistent quality, speed, and measurable results.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>

        {/* How We Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 text-center mb-12"
        >
          <span className="text-3xl mb-4 block">🤝</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
            How We Work
          </h3>
          <p className="text-muted-foreground mb-8">We believe in:</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {howWeWork.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-5 py-3 rounded-full border border-foreground/20 bg-foreground/5"
              >
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-muted-foreground italic">
            We take on limited clients to maintain quality — not volume.
          </p>
        </motion.div>

        {/* What's Coming Next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-hydro/5 to-blaze/5"
        >
          <span className="text-3xl mb-4 block">🚀</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
            What's Coming Next
          </h3>
          <p className="text-muted-foreground mb-2">
            We're currently focused on content, performance, and growth systems.
          </p>
          <p className="text-foreground font-medium">
            Advanced website and conversion-focused builds will be introduced soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
