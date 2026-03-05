import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Camera, TrendingUp, Palette, Rocket } from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';
import ServiceCard from './ServiceCard';
import serviceSocialMedia from '@/assets/service-social-media.jpg';
import serviceContent from '@/assets/service-content.jpg';
import servicePerformance from '@/assets/service-performance.jpg';
import serviceBranding from '@/assets/service-branding.jpg';

const DiscoveryCallButton = () => {
  const { open } = useContactDialog();
  return (
    <button onClick={() => open("Book a Discovery Call")} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105">
      Book a Discovery Call
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
    </button>
  );
};

const coreServices = [
  {
    icon: '📱',
    lucideIcon: Smartphone,
    title: 'Social Media Management',
    tagline: 'Consistent presence. Structured execution.',
    description: 'End-to-end management of your social platforms — from planning to publishing.',
    includes: ['Content planning & monthly calendars', 'Scheduling & posting', 'Caption writing & hashtag strategy', 'Community management', 'Monthly performance reporting'],
    image: serviceSocialMedia,
  },
  {
    icon: '📸',
    lucideIcon: Camera,
    title: 'Content Production',
    tagline: 'High-quality shoots built for digital performance',
    description: 'We produce on-ground content designed specifically for reels, ads, and scalable content libraries.',
    includes: ['Photo & video shoots', 'Reel-first shooting approach', 'Product, service & brand shoots', 'Content shortlisting & editing', 'Multi-format outputs'],
    image: serviceContent,
  },
  {
    icon: '📈',
    lucideIcon: TrendingUp,
    title: 'Performance Marketing',
    tagline: 'Paid growth with control & accountability',
    description: 'We manage ad campaigns with structured testing and optimisation.',
    includes: ['Meta ads strategy & setup', 'Audience & creative testing', 'Daily optimisation & scaling', 'Performance tracking & reporting', 'Lead quality alignment'],
    image: servicePerformance,
  },
  {
    icon: '🎨',
    lucideIcon: Palette,
    title: 'Branding & Creatives',
    tagline: 'Build a brand that looks professional and credible',
    description: 'We design brand assets that create consistency and trust across all touchpoints.',
    includes: ['Logo design', 'Brand kits & visual guidelines', 'Posters & banners', 'Social media creatives', 'Portfolio & brand collateral'],
    image: serviceBranding,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-5">
            Powered by Strategy.
            <br />
            <span className="text-gradient">Executed with Precision.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            Every service follows our internal Hydro + Blaze system — ensuring consistency, performance, and results.
          </p>
        </motion.div>

        {/* Core Services */}
        <div className="mb-20">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-6">What We Do</h3>
          <div className="space-y-4">
            {coreServices.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="relative bg-card/50 backdrop-blur-sm border border-foreground/10 rounded-2xl p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-hydro/5 via-transparent to-blaze/5 rounded-2xl pointer-events-none" />
            <div className="relative">
              <Rocket className="w-8 h-8 text-blaze mx-auto mb-5" />
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                Not Sure Where to Start?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We'll audit your brand, content, and growth gaps — then recommend the right mix.
              </p>
              <DiscoveryCallButton />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
