import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Camera, TrendingUp, Palette, Rocket, Handshake } from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';
import ServiceCard from './ServiceCard';
import hydroLogo from '@/assets/hydro-logo.png';
import blazeLogo from '@/assets/blaze-logo.png';

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
  },
  {
    icon: '📸',
    lucideIcon: Camera,
    title: 'Content Production',
    tagline: 'High-quality shoots built for digital performance',
    description: 'We produce on-ground content designed specifically for reels, ads, and scalable content libraries.',
    includes: ['Photo & video shoots', 'Reel-first shooting approach', 'Product, service & brand shoots', 'Content shortlisting & editing', 'Multi-format outputs'],
  },
  {
    icon: '📈',
    lucideIcon: TrendingUp,
    title: 'Performance Marketing',
    tagline: 'Paid growth with control & accountability',
    description: 'We manage ad campaigns with structured testing and optimisation.',
    includes: ['Meta ads strategy & setup', 'Audience & creative testing', 'Daily optimisation & scaling', 'Performance tracking & reporting', 'Lead quality alignment'],
  },
  {
    icon: '🎨',
    lucideIcon: Palette,
    title: 'Branding & Creatives',
    tagline: 'Build a brand that looks professional and credible',
    description: 'We design brand assets that create consistency and trust across all touchpoints.',
    includes: ['Logo design', 'Brand kits & visual guidelines', 'Posters & banners', 'Social media creatives', 'Portfolio & brand collateral'],
  },
];

const hydroItems = ['Brand & market analysis', 'Audience & competitor research', 'Platform-specific growth planning', 'Funnel & lead journey mapping', 'Performance benchmarks & KPIs'];
const blazeItems = ['Scroll-stopping visual concepts', 'Platform-native content formats', 'Performance-driven ad creatives', 'Brand-consistent visual systems', 'Continuous creative optimisation'];

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
          className="mb-20"
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

        {/* How We Work — Compact side-by-side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-6">How We Work</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Hydro */}
            <div className="group p-6 rounded-2xl border border-hydro/15 bg-hydro/[0.02] hover:border-hydro/30 transition-all duration-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-hydro/10 border border-hydro/15 flex items-center justify-center overflow-hidden">
                  <img src={hydroLogo} alt="Hydro" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold">Hydro Strategy</h4>
                  <p className="text-hydro text-xs font-medium">The thinking layer</p>
                </div>
              </div>
              <div className="space-y-2">
                {hydroItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-hydro shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blaze */}
            <div className="group p-6 rounded-2xl border border-blaze/15 bg-blaze/[0.02] hover:border-blaze/30 transition-all duration-400">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blaze/10 border border-blaze/15 flex items-center justify-center overflow-hidden">
                  <img src={blazeLogo} alt="Blaze" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold">Blaze Creative</h4>
                  <p className="text-blaze text-xs font-medium">The execution engine</p>
                </div>
              </div>
              <div className="space-y-2">
                {blazeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blaze shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Services — Expandable list */}
        <div className="mb-20">
          <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-6">What We Do</h3>
          <div className="space-y-3">
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
