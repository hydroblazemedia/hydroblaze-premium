import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Instagram,
  Briefcase, Layers, Package, Target, Users, Eye, MousePointerClick,
  IndianRupee, TrendingUp, Sparkles, Search, Megaphone, Palette, LineChart,
  BadgeCheck, HeartHandshake, Gauge, Crown,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';
import { useContactDialog } from '@/components/ContactFormDialog';

import heroCover from '@/assets/cultfit/hero-cover.jpg';

const infoCards = [
  { icon: Briefcase, title: 'Industry', items: ['Fitness & Wellness'] },
  { icon: Layers, title: 'Services', items: ['Meta Advertising', 'Lead Generation', 'Performance Creatives', 'Content Strategy'] },
  { icon: Package, title: 'Deliverables', items: ['Lead Funnel', 'Meta Campaigns', 'Social Content', 'Creative Design'] },
  { icon: Target, title: 'Objective', items: ['Generate qualified memberships while building a stronger local fitness community.'] },
];

const strategy = [
  { icon: Search, title: 'Audience Research', body: 'Local competitor analysis and demand mapping across the Rajajinagar catchment.' },
  { icon: Megaphone, title: 'Meta Campaigns', body: 'Location-targeted lead generation campaigns built around high-intent radiuses.' },
  { icon: Sparkles, title: 'Content Strategy', body: 'Transformation stories, trainers, member experience and social proof.' },
  { icon: Palette, title: 'Performance Creatives', body: 'Designed specifically for high CTR and a lower cost per lead.' },
  { icon: LineChart, title: 'Optimization', body: 'Continuous testing of creatives, audiences and campaign performance.' },
];

const processSteps = ['Market Research', 'Audience Targeting', 'Creative Production', 'Campaign Launch', 'Optimization', 'Lead Generation'];

const kpis = [
  { icon: Users, value: 924, suffix: '+', prefix: '', label: 'Qualified Leads Generated' },
  { icon: Eye, value: 392, suffix: 'K+', prefix: '', label: 'Accounts Reached (Ads)' },
  { icon: MousePointerClick, value: 1.83, suffix: 'M+', prefix: '', decimals: 2, label: 'Ad Impressions Delivered' },
  { icon: TrendingUp, value: 2.56, suffix: 'M+', prefix: '', decimals: 2, label: 'Content Views' },
  { icon: IndianRupee, value: 138, suffix: '', prefix: '₹', label: 'Average Cost Per Lead' },
  { icon: BadgeCheck, value: 4623, suffix: '', prefix: '+', label: 'Net New Followers (90 days)' },
];

const highlights = [
  { icon: Target, title: 'Local Lead Generation', body: 'Hyperlocal targeting around Rajajinagar.' },
  { icon: Gauge, title: 'Performance Marketing', body: 'High-converting Meta campaigns optimized continuously.' },
  { icon: Sparkles, title: 'Content Marketing', body: 'Transformation stories and community-focused content.' },
  { icon: Palette, title: 'Creative Direction', body: 'Performance-driven ad creatives built for conversions.' },
];

const impact = [
  { icon: Users, title: 'Higher Quality Leads', body: 'Generated consistent membership enquiries from nearby audiences.' },
  { icon: IndianRupee, title: 'Lower Acquisition Costs', body: 'Optimized campaigns improved lead efficiency over time.' },
  { icon: Eye, title: 'Stronger Digital Presence', body: 'Built a recognizable local fitness brand through strategic content.' },
];

const philosophy = [
  { icon: Target, title: 'Conversion First', body: 'Every creative designed to increase enquiries.' },
  { icon: HeartHandshake, title: 'Community Driven', body: 'Content focused on real people and transformations.' },
  { icon: LineChart, title: 'Performance Focused', body: 'Data-backed optimization at every stage.' },
  { icon: Crown, title: 'Premium Branding', body: "Maintained Cult.fit's premium visual identity." },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const SectionLabel = ({ children }: { children: string }) => (
  <span className="inline-block text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold mb-4">{children}</span>
);

const Counter = ({ target, suffix, prefix = '', decimals = 0 }: { target: number; suffix: string; prefix?: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const formatted = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-IN');
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
};

const CultfitCaseStudy = () => {
  const { open: openContact } = useContactDialog();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <PageTransition>
      <Seo
        title="Cult.fit Rajajinagar — Fitness Lead Generation Case Study"
        description="How HydroBlaze Media generated 924+ qualified membership leads for Cult.fit Rajajinagar at ₹138 CPL through hyperlocal Meta advertising, performance creatives and content strategy."
        path="/portfolio/cultfit-rajajinagar"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: 'Cult.fit Rajajinagar', path: '/portfolio/cultfit-rajajinagar' },
        ]}
      />
      <div className="noise-overlay" />
      <Navbar />

      <main>
        {/* HERO */}
        <section className="pt-24 md:pt-28 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-hydro transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>

            <div ref={heroRef} className="relative h-[46vh] min-h-[300px] md:h-[62vh] rounded-[28px] overflow-hidden border border-foreground/10 shadow-[0_40px_100px_-40px_hsl(var(--hydro)/0.4)]">
              <motion.img
                src={heroCover}
                alt="Premium gym training floor lit in cyan and orange light"
                fetchPriority="high"
                width={1920}
                height={1088}
                style={{ y: parallaxY, scale: heroScale }}
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <motion.div
                aria-hidden
                animate={{ opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--hydro)/0.25),transparent_55%),radial-gradient(circle_at_80%_70%,hsl(var(--blaze)/0.22),transparent_55%)]"
              />
            </div>

            <motion.div {...reveal} className="mt-10 md:mt-12 max-w-4xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.24em] font-semibold bg-hydro/12 text-hydro border border-hydro/25 mb-6">
                Lead Generation & Performance Marketing
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
                  Cult.fit – <span className="text-gradient">Rajajinagar</span>
                </h1>
                <a
                  href="https://www.instagram.com/cultfitrajajinagar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-foreground/10 hover:border-hydro/40 bg-card/60 backdrop-blur-md transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-hydro" aria-hidden="true" /> Instagram
                </a>
              </div>
              <p className="mt-5 font-display text-lg md:text-2xl text-foreground/80">
                Performance Marketing, Lead Generation & Content Strategy
              </p>
              <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
                HydroBlaze Media partnered with Cult.fit Rajajinagar to generate qualified local leads,
                improve community engagement, and strengthen the gym's digital presence through
                high-converting Meta advertising, strategic content, and performance-focused creative assets.
              </p>
            </motion.div>

            {/* INFO GRID */}
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.08 }}
                  className="group relative p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-foreground/10 hover:border-hydro/35 transition-colors duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-hydro/6 to-transparent pointer-events-none" />
                  <card.icon className="w-5 h-5 text-hydro mb-4" aria-hidden="true" />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">{card.title}</p>
                  <ul className="space-y-1.5">
                    {card.items.map((it) => (
                      <li key={it} className="text-sm font-medium text-foreground/90">{it}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...reveal}>
              <SectionLabel>The Brief</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">The Challenge</h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Cult.fit Rajajinagar needed a predictable system for generating qualified membership
                enquiries while competing in a crowded fitness market. The challenge was increasing local
                visibility, attracting high-intent prospects, and converting them through optimized Meta
                advertising supported by engaging content.
              </p>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--blaze)/0.18),transparent_70%)] pointer-events-none" />
              <div className="relative p-8 rounded-2xl border border-foreground/10 bg-card/50 shadow-[0_30px_70px_-30px_hsl(var(--foreground)/0.35)]">
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-hydro shrink-0" />
                    <div>
                      <p className="text-foreground font-semibold">Hyperlocal targeting</p>
                      <p className="text-sm text-muted-foreground">Radius and interest-layered audience builds around Rajajinagar.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-blaze shrink-0" />
                    <div>
                      <p className="text-foreground font-semibold">High-intent lead flow</p>
                      <p className="text-sm text-muted-foreground">Form and call-based campaigns optimized for membership enquiries.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-hydro shrink-0" />
                    <div>
                      <p className="text-foreground font-semibold">Scalable creative system</p>
                      <p className="text-sm text-muted-foreground">Offer-led performance creatives and organic social content.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STRATEGY */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12 max-w-2xl">
              <SectionLabel>The Approach</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Our Strategy</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {strategy.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.09 }}
                  className="group relative p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground/10 hover:border-hydro/35 transition-all duration-500 overflow-hidden hover:-translate-y-1"
                >
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[radial-gradient(circle,hsl(var(--hydro)/0.16),transparent_70%)] pointer-events-none" />
                  <span className="inline-flex w-11 h-11 rounded-2xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-foreground/10 items-center justify-center mb-5">
                    <s.icon className="w-5 h-5 text-hydro" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>How We Ran It</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Campaign Process</h2>
            </motion.div>
            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-hydro/40 to-transparent" />
              <ol className="grid md:grid-cols-6 gap-8 md:gap-4">
                {processSteps.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-5 md:text-center"
                  >
                    <span className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-card border border-hydro/35 flex items-center justify-center font-display font-bold text-hydro shadow-[0_0_24px_hsl(var(--hydro)/0.25)]">
                      {i + 1}
                    </span>
                    <p className="font-display text-sm md:text-base font-semibold leading-snug md:mt-1">{step}</p>
                    {i < processSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-3 top-3.5 w-4 h-4 text-blaze/60" aria-hidden="true" />
                    )}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* PERFORMANCE DASHBOARD GALLERY */}
        <section className="mt-24 md:mt-36 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12 max-w-2xl">
              <SectionLabel>The Work</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Performance <span className="text-gradient">Dashboard</span>
              </h2>
              <p className="text-muted-foreground">
                Real campaign dashboards, audience builds and creative assets. Click any panel to open it
                fullscreen — arrow keys navigate, click again to zoom.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {gallery.map((item, i) => (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open ${item.label} fullscreen`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  className="group relative flex w-full flex-col rounded-2xl overflow-hidden border border-foreground/10 hover:border-hydro/45 bg-card/40 backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_60px_-24px_hsl(var(--hydro)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hydro"
                >
                  <span className="relative block w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={`Cult.fit Rajajinagar campaign — ${item.label}`}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: item.focus }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    <span className="absolute top-3 right-3 rounded-full border border-foreground/15 bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View full
                    </span>
                  </span>
                  <span className="block px-5 py-4 text-left border-t border-foreground/10">
                    <span className="block font-display text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="block text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.note}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Measured Outcomes</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Results</h2>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {kpis.map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  className="relative p-6 md:p-8 rounded-3xl bg-card/55 backdrop-blur-xl border border-foreground/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,hsl(var(--hydro)/0.12),transparent_55%),radial-gradient(circle_at_90%_100%,hsl(var(--blaze)/0.12),transparent_55%)] pointer-events-none" />
                  <k.icon className="relative w-5 h-5 text-blaze mb-4" aria-hidden="true" />
                  <p className="relative font-display text-3xl md:text-5xl font-bold text-gradient mb-2">
                    <Counter target={k.value} suffix={k.suffix} prefix={k.prefix} decimals={k.decimals ?? 0} />
                  </p>
                  <p className="relative text-muted-foreground text-xs md:text-sm leading-snug">{k.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKETING HIGHLIGHTS */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Focus Areas</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Marketing Highlights</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                  className="relative p-8 md:p-10 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground/10 overflow-hidden hover:border-blaze/35 transition-colors duration-500"
                >
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[radial-gradient(circle,hsl(var(--blaze)/0.14),transparent_70%)] pointer-events-none" />
                  <h.icon className="w-6 h-6 text-hydro mb-5" aria-hidden="true" />
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">{h.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* BUSINESS IMPACT */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Outcome</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Business Impact</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {impact.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground/10 hover:border-hydro/30 transition-colors duration-500"
                >
                  <span className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-foreground/10 items-center justify-center mb-6">
                    <o.icon className="w-5 h-5 text-hydro" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-3">{o.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{o.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN PHILOSOPHY */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Principles</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Design Philosophy</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {philosophy.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
                  className="group p-6 rounded-2xl bg-card/55 backdrop-blur-xl border border-foreground/10 hover:border-blaze/35 transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-hydro/18 to-blaze/18 border border-foreground/10 flex items-center justify-center">
                      <p.icon className="w-4 h-4 text-hydro" aria-hidden="true" />
                    </span>
                    <Check className="w-4 h-4 text-blaze opacity-70" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 md:mt-32 mb-24 md:mb-32 px-4 md:px-8 lg:px-12">
          <motion.div
            {...reveal}
            className="max-w-7xl mx-auto relative p-10 md:p-16 rounded-[32px] bg-card/50 backdrop-blur-xl border border-foreground/10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,hsl(var(--hydro)/0.16),transparent_55%),radial-gradient(circle_at_80%_100%,hsl(var(--blaze)/0.16),transparent_55%)] pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-5">
                Ready to Generate More <span className="text-gradient">Qualified Leads?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-9">
                HydroBlaze Media helps fitness businesses grow through performance marketing, premium
                creatives, and conversion-focused campaigns.
              </p>
              <button
                onClick={() => openContact()}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-hydro to-blaze text-background hover:shadow-[0_20px_50px_-15px_hsl(var(--hydro)/0.6)] transition-all duration-500 hover:scale-[1.03]"
              >
                Start Your Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={() => setLightbox(null)} onPrev={prev} onNext={next} />
      )}
    </PageTransition>
  );
};

export default CultfitCaseStudy;
