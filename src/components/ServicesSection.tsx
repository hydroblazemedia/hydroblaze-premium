import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: '💧',
    title: 'Hydro Strategy',
    tagline: 'Data-first marketing that flows where your customers are',
    description: [
      'We design adaptive marketing strategies rooted in data, not guesswork.',
      'Every move is intentional, measurable, and built to evolve with your brand.',
    ],
    whatWeDo: [
      'Marketing & content strategy',
      'Funnel & customer journey mapping',
      'Platform-specific growth planning',
      'Audience & competitor research',
    ],
    whatYouGet: [
      'Clear monthly content roadmap',
      'Platform-wise growth plan (Instagram, Meta, Google)',
      'Defined KPIs & performance benchmarks',
      'Strategy aligned with your business goals',
    ],
    bestFor: 'Brands that want clarity, consistency, and predictable growth.',
    keywords: ['SEO', 'Funnel Architecture', 'Analytics', 'Growth Strategy'],
  },
  {
    icon: '🔥',
    title: 'Blaze Creative',
    tagline: 'Scroll-stopping visuals that burn into memory',
    description: [
      'Attention is currency — and we help you earn it.',
      'Our creative is designed to stop the scroll, build brand recall, and drive action.',
    ],
    whatWeDo: [
      'Brand identity & visual systems',
      'Social media content (static, reels, short-form video)',
      'Ad creatives & thumbnails',
      'Motion graphics & reel editing',
    ],
    whatYouGet: [
      'High-impact content designed for reach & engagement',
      'Trend-aware reels that don\'t look generic',
      'Consistent brand look across platforms',
      'Creatives optimized for ads & organic growth',
    ],
    bestFor: 'Brands that want to stand out, not blend in.',
    keywords: ['Brand Design', 'Reels', 'Motion', 'Viral Content'],
  },
  {
    icon: '⚙️',
    title: 'Fusion Tech',
    tagline: 'Where performance meets experience',
    description: [
      'Design without performance is art.',
      'Performance without design is boring.',
      'We build fast, beautiful, conversion-focused digital experiences.',
    ],
    whatWeDo: [
      'Website & landing page design',
      'Conversion-focused UI/UX',
      'Performance optimization',
      'Tracking, pixels & integrations',
    ],
    whatYouGet: [
      'Websites that load fast and look premium',
      'Landing pages built to convert traffic into leads',
      'Clean code + scalable structure',
      'Analytics & pixel setup for ads',
    ],
    bestFor: 'Brands that want their website to work like a sales machine.',
    keywords: ['Web Design', 'Performance', 'React', 'Conversion'],
  },
];

const combinations = [
  { combo: 'Strategy + Creative', purpose: 'for organic growth' },
  { combo: 'Creative + Ads', purpose: 'for performance marketing' },
  { combo: 'All three', purpose: 'for full-stack brand scaling' },
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
          <span className="text-4xl mb-4 block">🚀</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Three elements. One growth engine.
          </p>
          <div className="max-w-xl mx-auto space-y-2">
            <p className="text-muted-foreground">We don't sell random services.</p>
            <p className="text-foreground font-medium">
              We build systems that attract attention, convert interest, and scale revenue.
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
            />
          ))}
        </div>

        {/* How It Comes Together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 text-center mb-12"
        >
          <span className="text-3xl mb-4 block">⚡</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
            How It Comes Together
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Most brands don't need one service — they need alignment.
            <br />
            That's why our clients often combine:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {combinations.map((item, i) => (
              <motion.div
                key={item.combo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-5 py-3 rounded-full border border-foreground/20 bg-foreground/5"
              >
                <span className="text-foreground font-medium">{item.combo}</span>
                <span className="text-muted-foreground"> {item.purpose}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-lg">
            👉 That's where <span className="text-hydro font-medium">Hydro</span><span className="text-blaze font-medium">Blaze</span> truly ignites.
          </p>
        </motion.div>

        {/* Discovery Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-hydro/5 to-blaze/5"
        >
          <span className="text-3xl mb-4 block">🔥</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
            Not sure what you need?
          </h3>
          <p className="text-lg text-foreground mb-2">We'll help you figure it out.</p>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Start with a free discovery call — we'll audit your brand, content, and growth gaps before recommending anything.
          </p>
          <p className="text-muted-foreground italic">
            👉 No pressure. No fluff. Just clarity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
