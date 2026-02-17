import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Camera, TrendingUp, Palette, Target, ClipboardList, Zap, Sprout, Handshake, Rocket } from 'lucide-react';
import { useRef } from 'react';
import { useContactDialog } from '@/components/ContactFormDialog';
import ServiceCard from './ServiceCard';
import hydroLogo from '@/assets/hydro-logo.png';
import blazeLogo from '@/assets/blaze-logo.png';

const DiscoveryCallButton = () => {
  const { open } = useContactDialog();
  return (
    <button onClick={open} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105">
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
    lucideIcon: Camera,
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
    lucideIcon: TrendingUp,
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
    lucideIcon: Palette,
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
  { label: 'Strategy-led execution', icon: Target },
  { label: 'Clear scopes & timelines', icon: ClipboardList },
  { label: 'Performance-focused creatives', icon: Zap },
  { label: 'Sustainable growth systems', icon: Sprout },
];

const hydroItems = ['Brand & market analysis', 'Audience & competitor research', 'Platform-specific growth planning', 'Funnel & lead journey mapping', 'Performance benchmarks & KPIs'];
const blazeItems = ['Scroll-stopping visual concepts', 'Platform-native content formats', 'Performance-driven ad creatives', 'Brand-consistent visual systems', 'Continuous creative optimisation'];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={sectionRef} id="services" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Ambient background glows */}
      <motion.div
        style={{ y: backgroundY, background: 'radial-gradient(circle, hsl(var(--hydro)), transparent 70%)' }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--blaze)), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Services
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 tracking-tight leading-[1.1]">
            Powered by Strategy.
            <br />
            <span className="text-gradient">Executed with Creative Precision.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Every service follows a clear internal system — Hydro Strategy and Blaze Creative — ensuring consistency, performance, and scalable results.
          </p>
        </motion.div>

        {/* How We Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium bg-foreground/5 text-foreground/80 border border-foreground/10">
             How We Work
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {/* Hydro Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative group overflow-hidden rounded-2xl border border-hydro/20 bg-gradient-to-b from-hydro/[0.03] to-transparent hover:border-hydro/40 transition-all duration-500"
          >
            <div className="h-1 w-full bg-gradient-to-r from-hydro via-hydro-glow to-hydro/20" />
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-hydro/10 blur-3xl" />
            </div>
            <div className="relative p-7 md:p-9">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-hydro/10 border border-hydro/20 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={hydroLogo} alt="Hydro Strategy" className="w-12 h-12 object-contain" />
                </motion.div>
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Hydro Strategy</h4>
                  <p className="text-hydro text-sm font-medium mt-0.5">The thinking layer behind everything</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                Before execution, we define what to do, where to focus, and why it matters.
              </p>
              <div className="space-y-3 mb-7">
                {hydroItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-lg bg-hydro/10 border border-hydro/15 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-hydro" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl bg-hydro/5 border border-hydro/15 p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-hydro mb-1.5 font-bold">Why it matters</p>
                <p className="text-sm text-foreground/70 leading-relaxed">Strategy prevents wasted effort and ensures every action drives a business outcome.</p>
              </div>
            </div>
          </motion.div>

          {/* Blaze Creative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative group overflow-hidden rounded-2xl border border-blaze/20 bg-gradient-to-b from-blaze/[0.03] to-transparent hover:border-blaze/40 transition-all duration-500"
          >
            <div className="h-1 w-full bg-gradient-to-r from-blaze via-blaze-glow to-blaze/20" />
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-blaze/10 blur-3xl" />
            </div>
            <div className="relative p-7 md:p-9">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-blaze/10 border border-blaze/20 flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={blazeLogo} alt="Blaze Creative" className="w-12 h-12 object-contain" />
                </motion.div>
                <div>
                  <h4 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Blaze Creative</h4>
                  <p className="text-blaze text-sm font-medium mt-0.5">The execution engine</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                Once strategy is clear, we turn insights into content that performs.
              </p>
              <div className="space-y-3 mb-7">
                {blazeItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-lg bg-blaze/10 border border-blaze/15 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-blaze" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl bg-blaze/5 border border-blaze/15 p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blaze mb-1.5 font-bold">Why it matters</p>
                <p className="text-sm text-foreground/70 leading-relaxed">Great creative is what captures attention and converts it into action.</p>
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
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-5">
             What We Do
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Our core service offerings
          </h3>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {coreServices.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* Why Clients Choose — redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-hydro/10 via-transparent to-blaze/10 rounded-3xl" />
          <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-hydro/15 to-blaze/10 border border-white/10 flex items-center justify-center mx-auto mb-4"
              >
                <Handshake className="w-7 h-7 text-hydro" />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Why Clients Choose <span className="text-gradient">HydroBlaze</span>
              </h3>
              <p className="text-muted-foreground">Built on trust, delivered with precision.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {whyClients.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group text-center p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-hydro/20 hover:shadow-[0_8px_30px_hsl(var(--hydro)/0.15)] transition-all duration-500 cursor-default"
                >
                  <motion.div 
                    className="w-10 h-10 mx-auto mb-3 rounded-xl bg-hydro/10 border border-hydro/20 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon className="w-5 h-5 text-hydro" />
                  </motion.div>
                  <span className="text-foreground/90 font-medium text-sm leading-tight block group-hover:text-foreground transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground italic text-sm">
              "We don't overpromise. We execute with intent."
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-hydro/20 via-transparent to-blaze/20" />
          <div className="relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-white/10 flex items-center justify-center mx-auto mb-6"
            >
              <Rocket className="w-8 h-8 text-blaze" />
            </motion.div>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-muted-foreground mb-2 text-base">
              Start with a discovery call.
            </p>
            <p className="text-foreground/80 font-medium mb-8 max-w-xl mx-auto">
              We'll audit your brand, content, and growth gaps — then recommend the right mix of services.
            </p>
            <DiscoveryCallButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
