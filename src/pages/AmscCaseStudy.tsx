import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, X, ChevronLeft, ChevronRight,
  Briefcase, Layers, Package, CalendarClock, Flag, Type as TypeIcon,
  LayoutGrid, Megaphone, Target, ShieldCheck, MessageSquare,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';
import { useContactDialog } from '@/components/ContactFormDialog';

import heroCover from '@/assets/amsc/hero-cover.webp';
import s01 from '@/assets/amsc/01-cover.webp';
import s02 from '@/assets/amsc/02-about.webp';
import s03 from '@/assets/amsc/03-mission-vision.webp';
import s04 from '@/assets/amsc/04-legacy-timeline.webp';
import s05 from '@/assets/amsc/05-track-action.webp';
import s06 from '@/assets/amsc/06-core-committee.webp';
import s07 from '@/assets/amsc/07-flagship-events.webp';
import s08 from '@/assets/amsc/08-training-academy.webp';
import s09 from '@/assets/amsc/09-why-sponsor.webp';
import s10 from '@/assets/amsc/10-premium-promoters.webp';
import s11 from '@/assets/amsc/11-partner-network.webp';
import s12 from '@/assets/amsc/12-thank-you.webp';

const slides = [
  { src: s01, label: 'Cover' },
  { src: s02, label: 'About the Club' },
  { src: s03, label: 'Mission & Vision' },
  { src: s04, label: '15 Years Timeline' },
  { src: s05, label: 'Track Action' },
  { src: s06, label: 'Core Committee' },
  { src: s07, label: 'Flagship Events' },
  { src: s08, label: 'Training Academy' },
  { src: s09, label: 'Why Sponsor' },
  { src: s10, label: 'Premium Promoters' },
  { src: s11, label: 'Partner Network' },
  { src: s12, label: 'Thank You' },
];

const infoCards = [
  { icon: Briefcase, title: 'Industry', items: ['Motorsport & Events'] },
  { icon: Layers, title: 'Services', items: ['Sponsorship Pitch Deck', 'Presentation Design', 'Brand Strategy', 'Visual Direction'] },
  { icon: Package, title: 'Deliverables', items: ['10+ Page Presentation', 'Brand Storytelling', 'Information Architecture', 'Visual System'] },
  { icon: CalendarClock, title: 'Timeline', items: ['3 Weeks', 'Concept to Sponsor-Ready'] },
];

const solutionPoints = [
  'Information hierarchy',
  'Motorsport visual language',
  'Strong typography',
  'Sponsor-focused storytelling',
  'High-end presentation design',
  'Consistent branding',
];

const processSteps = [
  'Discovery',
  'Content Structuring',
  'Information Architecture',
  'Visual Direction',
  'Presentation Design',
  'Sponsor Ready Delivery',
];

const deliverables = [
  { icon: Flag, label: 'Sponsorship Pitch Deck' },
  { icon: Target, label: 'Brand Strategy' },
  { icon: LayoutGrid, label: 'Presentation Design' },
  { icon: Layers, label: 'Visual Direction' },
  { icon: ShieldCheck, label: 'Information Hierarchy' },
  { icon: TypeIcon, label: 'Typography System' },
  { icon: LayoutGrid, label: 'Layout Design' },
  { icon: Megaphone, label: 'Sponsor Communication' },
];

const highlights = [
  { title: 'Motorsport Inspired Visual Language', body: 'Dynamic angular layouts inspired by racing.' },
  { title: 'Bold Typography', body: 'Designed for readability during presentations.' },
  { title: 'Premium Presentation System', body: 'Consistent layouts across every page.' },
  { title: 'Sponsor-Oriented Storytelling', body: 'Focused on increasing sponsor confidence.' },
];

const outcomes = [
  { title: 'Sponsor Ready Presentation', body: 'Created a presentation suitable for investor meetings and sponsorship discussions.', icon: Flag },
  { title: 'Professional Brand Positioning', body: "Strengthened AMSC's professional image through premium presentation design.", icon: ShieldCheck },
  { title: 'Structured Communication', body: 'Converted scattered information into a clear, engaging story.', icon: MessageSquare },
];

const stats = [
  { value: 10, suffix: '+', label: 'Presentation Pages' },
  { value: 15, suffix: '+', label: 'Years of Motorsport Legacy Presented' },
  { value: 100, suffix: '%', label: 'Custom Designed Layouts' },
  { value: 1, suffix: '', label: 'Premium Sponsorship Deck' },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const SectionLabel = ({ children }: { children: string }) => (
  <span className="inline-block text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold mb-4">
    {children}
  </span>
);

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{n}{suffix}</span>;
};

const Lightbox = ({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const slide = slides[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Slide ${index + 1}: ${slide.label}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col"
    >
      <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-foreground/10">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">{slide.label}</span>
          <span className="mx-2 opacity-40">/</span>{index + 1} of {slides.length}
        </p>
        <button onClick={onClose} aria-label="Close gallery" className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:border-blaze hover:text-blaze transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center gap-3 md:gap-6 px-3 md:px-8 py-6 min-h-0">
        <button onClick={onPrev} aria-label="Previous slide" className="shrink-0 w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          src={slide.src}
          alt={`AMSC sponsorship deck slide — ${slide.label}`}
          className="max-h-full max-w-full object-contain rounded-xl border border-foreground/10 shadow-[0_30px_80px_-20px_hsl(var(--hydro)/0.35)]"
        />
        <button onClick={onNext} aria-label="Next slide" className="shrink-0 w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const AmscCaseStudy = () => {
  const { open: openContact } = useContactDialog();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + slides.length) % slides.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % slides.length)), []);

  return (
    <PageTransition>
      <Seo
        title="AMSC Motorsport Club — Premium Sponsorship Deck Case Study"
        description="How HydroBlaze Media designed a premium sponsorship pitch deck for AMSC Motorsport Club — brand strategy, information architecture, and presentation design that wins sponsors."
        path="/portfolio/amsc-motorsport"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: 'AMSC Motorsport Club', path: '/portfolio/amsc-motorsport' },
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
                alt="AMSC Ablaze Motorsports Club rally car on track"
                fetchPriority="high"
                style={{ y: parallaxY, scale: heroScale }}
                className="absolute inset-0 w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--blaze)/0.22),transparent_60%)]" />
            </div>

            <motion.div {...reveal} className="mt-10 md:mt-12 max-w-4xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.24em] font-semibold bg-hydro/12 text-hydro border border-hydro/25 mb-6">
                Design & Branding
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.03]">
                AMSC <span className="text-gradient">Motorsport Club</span>
              </h1>
              <p className="mt-5 font-display text-lg md:text-2xl text-foreground/80">
                Premium Sponsorship Pitch Deck & Brand Presentation
              </p>
              <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
                HydroBlaze Media partnered with AMSC Motorsport Club to design a premium sponsorship
                presentation that communicates the club's legacy, flagship events, community impact, and
                sponsorship opportunities. The objective was to transform years of achievements into a
                structured presentation capable of attracting sponsors, partners, and investors.
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
                  <card.icon className="w-5 h-5 text-hydro mb-4" />
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
                AMSC had over a decade of achievements, multiple flagship events, sponsorship
                opportunities, and club history that needed to be presented professionally. The challenge
                was organizing large amounts of information into a presentation that sponsors could
                quickly understand while maintaining the excitement and energy of motorsports.
              </p>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--blaze)/0.18),transparent_70%)] pointer-events-none" />
              <img
                src={s04}
                alt="AMSC deck slide showing 15 years of motorsport milestones"
                loading="lazy"
                className="relative w-full rounded-2xl border border-foreground/10 shadow-[0_30px_70px_-30px_hsl(var(--foreground)/0.35)]"
              />
            </motion.div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...reveal} className="lg:order-2">
              <SectionLabel>The Approach</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">Our Solution</h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                HydroBlaze designed a structured sponsorship deck that turns a decade of racing history
                into a persuasive, sponsor-first narrative — built on six design principles.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {solutionPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 p-3.5 rounded-xl bg-card/50 backdrop-blur-md border border-foreground/10">
                    <span className="w-6 h-6 rounded-full bg-hydro/15 border border-hydro/30 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-hydro" />
                    </span>
                    <span className="text-sm font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="relative lg:order-1">
              <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--hydro)/0.2),transparent_70%)] pointer-events-none" />
              <img
                src={s09}
                alt="AMSC deck slide presenting sponsorship value propositions"
                loading="lazy"
                className="relative w-full rounded-2xl border border-foreground/10 shadow-[0_30px_70px_-30px_hsl(var(--foreground)/0.35)]"
              />
            </motion.div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>How We Built It</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Design Process</h2>
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
                    <div className="md:mt-1">
                      <p className="font-display text-sm md:text-base font-semibold leading-snug">{step}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute -right-3 top-3.5 w-4 h-4 text-blaze/60" />
                    )}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SLIDE SHOWCASE */}
        <section className="mt-24 md:mt-36 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12 max-w-2xl">
              <SectionLabel>The Work</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Inside the <span className="text-gradient">Deck</span>
              </h2>
              <p className="text-muted-foreground">
                Every page designed from scratch. Click any slide to open it fullscreen — use arrow keys to browse.
              </p>
            </motion.div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {slides.map((slide, i) => (
                <motion.button
                  key={slide.label}
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Open slide: ${slide.label}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  className="group relative block w-full mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-foreground/10 hover:border-hydro/45 bg-card/40 transition-all duration-500 hover:shadow-[0_24px_60px_-24px_hsl(var(--hydro)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hydro"
                >
                  <img
                    src={slide.src}
                    alt={`AMSC sponsorship deck slide — ${slide.label}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-display text-sm font-semibold text-foreground">{slide.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-hydro">View</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Scope</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Deliverables</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
                  className="group p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-foreground/10 hover:border-blaze/35 transition-colors duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-hydro/18 to-blaze/18 border border-foreground/10 flex items-center justify-center">
                      <d.icon className="w-4 h-4 text-hydro" />
                    </span>
                    <Check className="w-4 h-4 text-blaze opacity-70" />
                  </div>
                  <p className="font-display font-semibold text-sm leading-snug">{d.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN HIGHLIGHTS */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Craft</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Design Highlights</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                  className="relative p-8 md:p-10 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground/10 overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[radial-gradient(circle,hsl(var(--hydro)/0.16),transparent_70%)] pointer-events-none" />
                  <p className="font-display text-4xl font-bold text-gradient mb-5 opacity-60">0{i + 1}</p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">{h.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="mb-12">
              <SectionLabel>Results</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Project Outcome</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {outcomes.map((o, i) => (
                <motion.div
                  key={o.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground/10 hover:border-hydro/30 transition-colors duration-500"
                >
                  <span className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-hydro/20 to-blaze/20 border border-foreground/10 items-center justify-center mb-6">
                    <o.icon className="w-5 h-5 text-hydro" />
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-3">{o.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{o.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-24 md:mt-32 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto p-8 md:p-14 rounded-[32px] bg-card/50 backdrop-blur-xl border border-foreground/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--hydro)/0.12),transparent_55%),radial-gradient(circle_at_85%_100%,hsl(var(--blaze)/0.12),transparent_55%)] pointer-events-none" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl md:text-6xl font-bold text-gradient mb-3">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 md:mt-32 mb-24 px-4 md:px-8 lg:px-12">
          <motion.div {...reveal} className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Need a Presentation That Wins <span className="text-gradient">Clients, Investors or Sponsors?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10">
              We create premium presentations that communicate value, build credibility, and help
              businesses secure opportunities.
            </p>
            <button
              onClick={() => openContact('AMSC Case Study CTA')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.45)] transition-all duration-300"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </button>
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

export default AmscCaseStudy;