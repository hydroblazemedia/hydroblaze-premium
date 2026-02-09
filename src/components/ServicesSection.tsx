import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';

const coreServices = [
  {
    icon: '📱',
    title: 'Social Media Management',
    tagline: 'Consistent presence. Structured execution.',
    description: 'End-to-end management of your social platforms — from planning to publishing.',
    includes: [
      'Content planning & monthly calendars',
      'Scheduling & posting',
      'Caption writing & hashtag strategy',
      'Community management (comments & DMs as per scope)',
      'Monthly performance reporting',
    ],
  },
  {
    icon: '📸',
    title: 'Content Production',
    tagline: 'High-quality shoots built for digital performance',
    description: 'We produce on-ground content designed specifically for reels, ads, and scalable content libraries.',
    includes: [
      'Photo & video shoots',
      'Reel-first shooting approach',
      'Product, service & brand shoots',
      'Content shortlisting & editing',
      'Multi-format outputs',
    ],
  },
  {
    icon: '📈',
    title: 'Performance Marketing',
    tagline: 'Paid growth with control & accountability',
    description: 'We manage ad campaigns with structured testing and optimisation.',
    includes: [
      'Meta ads strategy & setup',
      'Audience & creative testing',
      'Daily optimisation & scaling',
      'Performance tracking & reporting',
      'Lead quality alignment',
    ],
  },
  {
    icon: '🎨',
    title: 'Branding & Creatives',
    tagline: 'Build a brand that looks professional and credible',
    description: 'We design brand assets that create consistency and trust across all touchpoints.',
    includes: [
      'Logo design',
      'Brand kits & visual guidelines',
      'Posters & banners',
      'Social media creatives',
      'Portfolio & brand collateral',
    ],
  },
];

const whyClients = [
  'Strategy-led execution',
  'Clear scopes & timelines',
  'Performance-focused creatives',
  'Sustainable growth systems',
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
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-4">
            🚀 Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Powered by Strategy. <span className="text-gradient">Executed with Creative Precision.</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            At HydroBlaze Media, every service we deliver follows a clear internal system — Hydro Strategy and Blaze Creative. This ensures consistency, performance, and scalable results across all client engagements.
          </p>
        </motion.div>

        {/* How We Work */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground border border-foreground/20 mb-4">
            ⚙️ How We Work
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {/* Hydro Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-hydro/20"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-hydro to-hydro/40" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-hydro/10 border border-hydro/20 flex items-center justify-center text-2xl">
                  💧
                </div>
                <div>
                  <h4 className="font-display text-xl md:text-2xl font-medium">Hydro Strategy</h4>
                  <p className="text-hydro text-sm font-medium">The thinking layer behind everything</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Before execution, we define what to do, where to focus, and why it matters.
              </p>

              <div className="space-y-3 mb-6">
                {['Brand & market analysis', 'Audience & competitor research', 'Platform-specific growth planning', 'Funnel & lead journey mapping', 'Performance benchmarks & KPIs'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-hydro flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-hydro/5 border border-hydro/10 p-4">
                <p className="text-xs uppercase tracking-wider text-hydro mb-1 font-semibold">Why it matters</p>
                <p className="text-sm text-foreground/80">Strategy prevents wasted effort and ensures every action drives a business outcome.</p>
              </div>
            </div>
          </motion.div>

          {/* Blaze Creative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-blaze/20"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-blaze to-blaze/40" />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-blaze/10 border border-blaze/20 flex items-center justify-center text-2xl">
                  🔥
                </div>
                <div>
                  <h4 className="font-display text-xl md:text-2xl font-medium">Blaze Creative</h4>
                  <p className="text-blaze text-sm font-medium">The execution engine</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Once strategy is clear, we turn insights into content that performs.
              </p>

              <div className="space-y-3 mb-6">
                {['Scroll-stopping visual concepts', 'Platform-native content formats', 'Performance-driven ad creatives', 'Brand-consistent visual systems', 'Continuous creative optimisation'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blaze flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-blaze/5 border border-blaze/10 p-4">
                <p className="text-xs uppercase tracking-wider text-blaze mb-1 font-semibold">Why it matters</p>
                <p className="text-sm text-foreground/80">Great creative is what captures attention and converts it into action.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Services header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
            🧩 What We Do
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-medium">
            Our core service offerings
          </h3>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {coreServices.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Why Clients Choose */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 text-center mb-12"
        >
          <span className="text-3xl mb-4 block">🤝</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-6">
            Why Clients Choose HydroBlaze
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {whyClients.map((item, i) => (
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
            We don't overpromise. We execute with intent.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-hydro/5 to-blaze/5"
        >
          <span className="text-3xl mb-4 block">🚀</span>
          <h3 className="font-display text-2xl md:text-3xl font-medium mb-4">
            Not Sure Where to Start?
          </h3>
          <p className="text-muted-foreground mb-2">
            Start with a discovery call.
          </p>
          <p className="text-foreground font-medium mb-6">
            We'll audit your brand, content, and growth gaps — then recommend the right mix of services.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300"
          >
            Book a Discovery Call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
