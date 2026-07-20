import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Sparkles, MessageCircle, Check, TrendingUp, Target, LineChart,
  Users, Shield, Zap, Star, Compass, PenTool, Rocket, Gauge, BarChart3,
  ChevronLeft, ChevronRight, Eye, Handshake,
} from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';

import serviceAds from '@/assets/service-meta-google-ads.jpg';
import serviceSocial from '@/assets/service-social-mgmt.jpg';
import serviceContent from '@/assets/service-content-creation.jpg';
import serviceFunnels from '@/assets/service-lead-funnels.jpg';
import serviceWebsite from '@/assets/service-website-design.jpg';
import serviceStrategy from '@/assets/service-strategy.jpg';
import portfolioBlr from '@/assets/portfolio-blrkabab.jpg';
import portfolioCultfit from '@/assets/portfolio-cultfit.png';
import portfolioAayara from '@/assets/portfolio-aayara.jpg';

const services = [
  {
    title: 'Meta & Google Ads That Actually Convert',
    tagline: 'Paid Media',
    description: 'High-intent campaigns engineered to lower cost per lead and scale ROAS. Every rupee tracked, every click accountable.',
    deliverables: ['Campaign Setup', 'Audience Research', 'Ad Creative', 'Weekly Optimization', 'Conversion Tracking', 'Monthly Reporting'],
    image: serviceAds,
    proof: { metric: '−42%', label: 'Avg. Cost Per Lead' },
    icon: Target,
  },
  {
    title: 'Social Media That Builds A Brand',
    tagline: 'Organic Growth',
    description: 'Strategic content systems that turn casual scrollers into an engaged community and paying customers.',
    deliverables: ['Monthly Content Calendar', 'Reels', 'Static Posts', 'Captions', 'Community Management', 'Analytics Report'],
    image: serviceSocial,
    proof: { metric: '3.2×', label: 'Higher Engagement Rate' },
    icon: Users,
  },
  {
    title: 'Content That Stops The Scroll',
    tagline: 'Creative Studio',
    description: 'Studio-grade visuals and video crafted for platform algorithms and human attention alike.',
    deliverables: ['Short-form Videos', 'Product Photography', 'Branding Visuals', 'Ad Creatives', 'Motion Graphics'],
    image: serviceContent,
    proof: { metric: '5×', label: 'Content Output vs In-house' },
    icon: PenTool,
  },
  {
    title: 'Lead Funnels Built To Sell',
    tagline: 'Conversion Systems',
    description: 'End-to-end funnels that capture, qualify, and nurture leads on autopilot — from ad click to closed deal.',
    deliverables: ['Funnel Strategy', 'Landing Pages', 'Lead Forms', 'WhatsApp Automation', 'CRM Integration'],
    image: serviceFunnels,
    proof: { metric: '+68%', label: 'Lead-to-Customer Rate' },
    icon: Zap,
  },
  {
    title: 'Websites That Turn Visitors Into Revenue',
    tagline: 'Web Design',
    description: 'Fast, elegant, mobile-first websites and landing pages built on modern stacks with conversion at the core.',
    deliverables: ['Custom Website', 'Landing Pages', 'Mobile Optimization', 'SEO Ready', 'Fast Loading'],
    image: serviceWebsite,
    proof: { metric: '<1.2s', label: 'Median Page Load' },
    icon: Gauge,
  },
  {
    title: 'Marketing Strategy That Compounds',
    tagline: 'Growth Advisory',
    description: 'A board-level growth roadmap tying every channel, campaign, and KPI to real business outcomes.',
    deliverables: ['Marketing Audit', 'Growth Roadmap', 'Channel Planning', 'KPI Tracking', 'Quarterly Strategy'],
    image: serviceStrategy,
    proof: { metric: '4×', label: 'Revenue Growth (12 mo)' },
    icon: LineChart,
  },
];

const processSteps = [
  { title: 'Discovery', desc: 'Deep-dive into your business, market, and audience.', icon: Compass },
  { title: 'Strategy', desc: 'A data-backed roadmap tied to revenue outcomes.', icon: Target },
  { title: 'Content & Design', desc: 'Studio-grade creative built for conversion.', icon: PenTool },
  { title: 'Launch', desc: 'Campaigns go live with tracking dialed in.', icon: Rocket },
  { title: 'Optimization', desc: 'Weekly iteration on what actually moves the needle.', icon: Gauge },
  { title: 'Scale', desc: 'Compound the wins — expand budgets, channels, systems.', icon: TrendingUp },
];

const whyPoints = [
  { number: '01', title: 'Strategy Before Execution', desc: 'We diagnose before we prescribe. Every engagement starts with a growth audit, not a template — because the wrong strategy scales the wrong problem.', icon: Compass },
  { number: '02', title: 'Creative + Performance, One Team', desc: 'Media buyers and creatives sit at the same table. Faster iteration, sharper hooks, better ROAS — no agency ping-pong.', icon: Zap },
  { number: '03', title: 'Transparent Reporting', desc: 'Live dashboards. Weekly reviews. Zero vanity metrics. You always know exactly where every rupee went and what it earned back.', icon: Eye },
  { number: '04', title: 'Dedicated Partner Involvement', desc: 'A senior operator on your account from day one — not a rotating junior team learning your business on your budget.', icon: Handshake },
  { number: '05', title: 'ROI-Focused Marketing', desc: 'We tie every campaign to a pipeline metric that actually matters — CAC, LTV, revenue. Impressions do not pay salaries.', icon: TrendingUp },
  { number: '06', title: 'Long-Term Growth Systems', desc: 'We build engines, not one-off campaigns. The work compounds — creative libraries, funnels, and data that keep paying dividends.', icon: Shield },
];

const caseStudies = [
  {
    name: 'BLR Kabab',
    image: portfolioBlr,
    challenge: 'Low delivery volume despite strong walk-in loyalty in Bengaluru.',
    solution: 'Hyperlocal Meta ads + reels-first content engine + WhatsApp lead capture.',
    results: ['+220% orders in 90 days', '−38% cost per order', '4.8× ROAS'],
  },
  {
    name: 'CultFit Rajajinagar',
    image: portfolioCultfit,
    challenge: 'Rising CAC and inconsistent trial-to-member conversion.',
    solution: 'Full-funnel Meta + Google campaigns, on-brand creative sprints, retention nurtures.',
    results: ['−42% cost per lead', '+68% trial conversions', '2.3× monthly signups'],
  },
  {
    name: 'Aayara Boutique',
    image: portfolioAayara,
    challenge: 'Beautiful product, invisible online presence.',
    solution: 'Brand-led social system, product shoots, and shoppable Instagram funnels.',
    results: ['+340% follower growth', '5.1× store enquiries', 'Sold-out drops'],
  },
];

const testimonials = [
  { name: 'Pavan B K', company: 'BLR Kabab', quote: 'HydroBlaze rebuilt our online ordering pipeline. Orders tripled in a quarter and we finally understand what our marketing spend does.', rating: 5 },
  { name: 'Karan', company: 'CultFit Rajajinagar', quote: 'The team feels like an in-house growth department. Strategy, creative, ads — all under one roof, all measurable.', rating: 5 },
  { name: 'Chethana Reddy', company: 'Aayara', quote: 'They understood our brand instantly. The content and funnels feel premium — exactly like our product.', rating: 5 },
];


const ServiceBlock = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { open } = useContactDialog();
  const isReversed = index % 2 !== 0;
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 md:py-24"
    >
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>
        {/* Image + floating proof card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative group rounded-2xl overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-2xl border border-foreground/10 group-hover:border-hydro/30 transition-colors duration-500" />
          </div>

          {/* Floating proof card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`absolute ${isReversed ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} -bottom-6 md:-bottom-8 bg-card/90 backdrop-blur-xl border border-foreground/10 rounded-2xl p-4 md:p-5 shadow-[0_20px_60px_-15px_hsl(var(--hydro)/0.35)] max-w-[220px]`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-hydro/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-hydro" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gradient leading-none">{service.proof.metric}</div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{service.proof.label}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/10 text-hydro border border-hydro/20 mb-4">
              <Icon className="w-3 h-3" />
              {service.tagline}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{service.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-hydro/10 border border-hydro/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-hydro" />
                </div>
                <span className="text-foreground/80 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => open('Book Free Strategy Call')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105"
            >
              Book Free Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessSection = () => (
  <section className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 border-t border-foreground/5 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 max-w-2xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/10 text-hydro border border-hydro/20 mb-5">
          Our Process
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          From Discovery to <span className="text-gradient">Scale</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-base md:text-lg">A repeatable six-stage journey, not a one-off project.</p>
      </motion.div>

      {/* Desktop horizontal timeline */}
      <div className="hidden lg:block relative">
        {/* Base line */}
        <div className="absolute top-8 left-0 right-0 h-px bg-foreground/10" />
        {/* Animated progress line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-hydro via-hydro to-blaze"
        />
        <div className="grid grid-cols-6 gap-4 relative">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Node */}
                <div className="relative w-16 h-16 rounded-full bg-background border border-hydro/30 flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 group-hover:border-hydro group-hover:shadow-[0_0_30px_hsl(var(--hydro)/0.5)]">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-hydro/15 to-blaze/15" />
                  <Icon className="w-6 h-6 text-hydro relative z-10 transition-transform duration-500 group-hover:scale-110" />
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-full border border-hydro opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                </div>
                <div className="mt-6 space-y-2 px-1 transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-semibold">Step {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-display text-base font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                </div>
                {/* Arrow between */}
                {i < processSteps.length - 1 && (
                  <ChevronRight className="hidden xl:block absolute top-5 -right-3 w-5 h-5 text-hydro/40 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet vertical timeline */}
      <div className="lg:hidden relative pl-10">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-hydro via-hydro to-blaze"
        />
        <div className="space-y-10">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-background border border-hydro/30 flex items-center justify-center transition-all group-hover:border-hydro group-hover:shadow-[0_0_20px_hsl(var(--hydro)/0.4)]">
                  <Icon className="w-4 h-4 text-hydro" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-semibold mb-1">Step {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const WhyHydroBlaze = () => (
  <section className="relative z-10 px-6 md:px-12 lg:px-16 py-24 md:py-36 border-t border-foreground/5 overflow-hidden">
    {/* Ambient */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, hsl(var(--blaze)), transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, hsl(var(--hydro)), transparent 70%)' }} />
    </div>

    <div className="max-w-6xl mx-auto">
      {/* Editorial header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-32"
      >
        <div className="md:col-span-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-blaze/10 text-blaze border border-blaze/20 mb-6">
            Why HydroBlaze
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            Not another<br />
            <span className="text-gradient italic font-light">marketing agency.</span>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex items-end">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Six principles shape every engagement — the difference between renting attention and building a growth engine that compounds.
          </p>
        </div>
      </motion.div>

      {/* Alternating editorial rows */}
      <div className="divide-y divide-foreground/10">
        {whyPoints.map((point, i) => {
          const Icon = point.icon;
          const isReversed = i % 2 !== 0;
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-12 md:py-16"
            >
              <div className={`md:col-span-2 flex md:justify-center ${isReversed ? 'md:order-3' : ''}`}>
                <div className="font-display text-5xl md:text-6xl font-light text-foreground/20 group-hover:text-transparent group-hover:bg-gradient-to-br group-hover:from-hydro group-hover:to-blaze group-hover:bg-clip-text transition-all duration-500">
                  {point.number}
                </div>
              </div>
              <div className={`md:col-span-7 ${isReversed ? 'md:order-2 md:text-right' : ''}`}>
                <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight mb-3 md:mb-4 transition-colors duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-hydro group-hover:to-blaze group-hover:bg-clip-text">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl md:max-w-none md:inline-block">
                  {point.desc}
                </p>
              </div>
              <div className={`md:col-span-3 flex md:justify-center ${isReversed ? 'md:order-1' : ''}`}>
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-hydro/10 to-blaze/10 border border-foreground/10 flex items-center justify-center group-hover:border-hydro/40 group-hover:shadow-[0_20px_50px_-15px_hsl(var(--hydro)/0.4)] transition-all duration-500"
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-hydro" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const CaseStudies = () => (
  <section className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 border-t border-foreground/5">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/10 text-hydro border border-hydro/20 mb-5">
          Recent Success Stories
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          Real Brands. <span className="text-gradient">Real Results.</span>
        </h2>
      </motion.div>

      <div className="space-y-6">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-stretch p-5 md:p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-foreground/10 hover:border-hydro/30 transition-all duration-500"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto">
              <img src={cs.image} alt={cs.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{cs.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-semibold mb-1">Challenge</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-semibold mb-1">Solution</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {cs.results.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-hydro/10 to-blaze/10 border border-hydro/20 text-foreground">
                    <Check className="w-3 h-3 text-hydro" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const touchStart = useRef<number | null>(null);

  const go = (next: number) => {
    const total = testimonials.length;
    const idx = ((next % total) + total) % total;
    setDir(next > i ? 1 : -1);
    setI(idx);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setI((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[i];

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? i + 1 : i - 1);
    touchStart.current = null;
  };

  return (
    <section className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 border-t border-foreground/5">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/10 text-hydro border border-hydro/20 mb-5">
          Client Voices
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12">
          What Founders <span className="text-gradient">Say About Us</span>
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative overflow-hidden rounded-3xl min-h-[340px] md:min-h-[300px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 md:p-12 rounded-3xl bg-card/50 backdrop-blur-xl border border-foreground/10"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-hydro/5 via-transparent to-blaze/5 pointer-events-none" />
                <div className="relative">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-blaze text-blaze" />
                    ))}
                  </div>
                  <p className="text-lg md:text-2xl font-display leading-relaxed text-foreground/90 mb-8">"{t.quote}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hydro to-blaze flex items-center justify-center text-white font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/80 backdrop-blur-xl border border-foreground/10 hover:border-hydro/40 hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] flex items-center justify-center transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/80 backdrop-blur-xl border border-foreground/10 hover:border-hydro/40 hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] flex items-center justify-center transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${idx === i ? 'w-8 bg-gradient-to-r from-hydro to-blaze' : 'w-2 bg-foreground/20 hover:bg-foreground/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const ServicesSection = () => {
  const { open } = useContactDialog();

  return (
    <section className="relative z-10 overflow-hidden">
      {/* Page Hero */}
      <div className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Ambient bg */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, hsl(var(--hydro)), transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, hsl(var(--blaze)), transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Our Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Growth Systems Built for
            <br />
            <span className="text-gradient">Ambitious Brands</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          >
            Marketing that actually moves revenue. We build integrated systems that generate qualified leads, acquire customers, and compound ROI — not just campaigns.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10"
          >
            {[
              { icon: Compass, label: 'Strategy First' },
              { icon: TrendingUp, label: 'Performance Driven' },
              { icon: BarChart3, label: 'Transparent Reporting' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card/60 backdrop-blur-sm border border-foreground/10 text-foreground/80">
                <Icon className="w-3.5 h-3.5 text-hydro" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => open('Book Free Strategy Call')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105"
            >
              Book Free Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-foreground/10 hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              View Case Studies
            </a>
          </motion.div>
        </div>
      </div>

      {/* Service Blocks */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto divide-y divide-foreground/5">
          {services.map((service, index) => (
            <ServiceBlock key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>

      <ProcessSection />
      <WhyHydroBlaze />
      <CaseStudies />
      <Testimonials />

      {/* Final CTA */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card/50 backdrop-blur-sm border border-foreground/10 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-hydro/5 via-transparent to-blaze/5 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Ready to Build a <span className="text-gradient">Scalable Growth System?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
                Let's build a marketing system that consistently generates leads, customers, and measurable business growth.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-muted-foreground">
                {['Response within 24 hours', 'India-based team', 'Dedicated Strategy Partner', 'Transparent Reporting'].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-hydro" /> {f}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => open("Book Free Strategy Call")}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105"
                >
                  Book Free Strategy Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border border-foreground/10 hover:border-foreground/20 text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
