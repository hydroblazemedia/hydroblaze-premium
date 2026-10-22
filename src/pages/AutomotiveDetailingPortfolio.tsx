import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Expand,
  Car, Target, Package, Tag, Megaphone, Sparkles, BadgeCheck, Droplets, Wrench,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';
import { useContactDialog } from '@/components/ContactFormDialog';

import fomaxxHero from '@/assets/as-detailing/fomaxx-hero.webp';
import fomaxxDetail from '@/assets/as-detailing/fomaxx-label-detail.webp';
import servicesOffer from '@/assets/as-detailing/aquasplash-services-offer.webp';
import premiumOffers from '@/assets/as-detailing/aquasplash-premium-offers.webp';
import headlight from '@/assets/as-detailing/aquasplash-headlight.webp';

type Art = { src: string; label: string; alt: string; w: number; h: number };

const labelArt: Art = { src: fomaxxHero, label: 'FOMAXX Product Label', alt: 'FOMAXX car care product bottle with a bold blue and red performance label design', w: 1024, h: 1536 };
const labelDetailArt: Art = { src: fomaxxDetail, label: 'FOMAXX Label Detail', alt: 'Close-up of the FOMAXX car care label showing product name, icons and finish details', w: 1024, h: 1536 };
const promo: Art[] = [
  { src: servicesOffer, label: 'Services & Offers Creative', alt: 'Aqua Splash Auto Detailing Studio offer creative listing polishing, graphene coating, water spot treatment and interior cleaning services', w: 1677, h: 779 },
  { src: premiumOffers, label: 'Premium Offers Creative', alt: 'Aqua Splash promotional creative advertising 25% off full car polishing and 20% off graphene coating', w: 1772, h: 780 },
  { src: headlight, label: 'Headlight Restoration Creative', alt: 'Aqua Splash before-and-after headlight restoration creative with a ₹50 off offer card', w: 1594, h: 779 },
];

const all: Art[] = [labelArt, labelDetailArt, ...promo];

const overview = [
  { icon: Car, title: 'Industry', body: 'Automotive Care & Detailing — Products and Services' },
  { icon: Target, title: 'Creative Focus', body: 'Product label design and offer-led promotional campaign creatives.' },
  { icon: Package, title: 'Deliverables', body: 'FOMAXX label artwork and Aqua Splash promotional campaign designs.' },
];

const services = [
  { icon: Tag, title: 'Product Label Design', body: 'Bold, performance-oriented label artwork for FOMAXX car care products, designed for instant shelf recognition.' },
  { icon: Megaphone, title: 'Promotional Creative Design', body: 'Offer-led promotional creatives for Aqua Splash detailing services, built to communicate value clearly and quickly.' },
  { icon: Wrench, title: 'Service Campaign Design', body: 'Service-specific campaign designs — from polishing and coating offers to before-and-after restoration proof.' },
  { icon: Droplets, title: 'Brand Communication', body: 'A consistent visual language across product labels and studio promotions, so every touchpoint feels unmistakably premium.' },
];

const principles = [
  { title: 'Clarity Before Decoration', body: 'Offers, pricing and product function must be readable at a glance. Every creative leads with the message, then earns attention with finish.' },
  { title: 'Premium Feel, Street-Level Reach', body: 'High-gloss gradients, performance cues and confident typography reflect the quality of the work — whether on a shelf or in a local feed.' },
  { title: 'Design That Sells Services', body: 'Before-and-after proof, honest offer framing and strong focal points turn a passing glance into a booked appointment.' },
];

const impact = [
  { icon: Package, title: 'Shelf-Ready Label Artwork', body: 'Product labels designed to stand out on shelves and instantly communicate what FOMAXX does and who it is for.' },
  { icon: Megaphone, title: 'Offer-Led Campaign Creatives', body: 'A cohesive set of promotional designs for Aqua Splash services, offers and seasonal campaigns.' },
  { icon: BadgeCheck, title: 'Proof-Driven Design', body: 'Before-and-after visuals that show real results, building trust for the detailing studio without a single word of exaggeration.' },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const SectionLabel = ({ children }: { children: string }) => (
  <span className="inline-block text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold mb-4">{children}</span>
);

const Lightbox = ({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);
  const item = all[index];
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`${item.label} — ${index + 1} of ${all.length}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
      }}>
      <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 border-b border-foreground/10">
        <p className="text-sm text-muted-foreground truncate">
          <span className="text-foreground font-semibold">{item.label}</span>
          <span className="mx-2 opacity-40">/</span>{index + 1} of {all.length}
        </p>
        <button autoFocus onClick={onClose} aria-label="Close viewer" className="shrink-0 w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:border-blaze hover:text-blaze transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
        <img src={item.src} alt={item.alt} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous artwork" className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next artwork" className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/70 border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const ArtButton = ({ art, index, onOpen, className = '' }: { art: Art; index: number; onOpen: (i: number) => void; className?: string }) => (
  <button type="button" onClick={() => onOpen(index)} aria-label={`View ${art.label} full size`}
    className={`group relative block w-full overflow-hidden rounded-2xl border border-foreground/10 bg-card/40 transition-all duration-500 hover:-translate-y-1 hover:border-hydro/40 hover:shadow-[0_30px_60px_-30px_hsl(var(--hydro)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hydro ${className}`}>
    <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" decoding="async"
      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" />
    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/75 backdrop-blur border border-foreground/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
      <Expand className="w-4 h-4" aria-hidden="true" />
    </span>
  </button>
);

const AutomotiveDetailingPortfolio = () => {
  const { open: openContact } = useContactDialog();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + all.length) % all.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % all.length)), []);

  return (
    <PageTransition>
      <Seo
        title="Automotive Branding & Campaign Design — AS Detailing Supplies × Aqua Splash"
        description="HydroBlaze Media designed FOMAXX product labels for AS Detailing Supplies and offer-led promotional campaign creatives for Aqua Splash Auto Detailing Studio."
        path="/portfolio/as-detailing-aqua-splash"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: 'Automotive Detailing', path: '/portfolio/as-detailing-aqua-splash' },
        ]}
      />
      <div className="noise-overlay" />
      <Navbar />

      <main className="overflow-x-hidden">
        {/* HERO */}
        <section className="pt-24 md:pt-28 pb-16 md:pb-24 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-hydro transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold">Featured Work</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full border border-blaze/40 text-blaze bg-blaze/10">Automotive Care &amp; Detailing</span>
                </div>
                <h1 className="font-display font-bold tracking-tight">
                  <span className="block text-5xl md:text-7xl text-foreground">Automotive Branding</span>
                  <span className="block mt-4 text-2xl md:text-4xl leading-tight text-gradient">&amp; Campaign Design.</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Product label design for AS Detailing Supplies (FOMAXX) and offer-led promotional creatives for Aqua Splash Auto Detailing Studio — one visual language, from the shelf to the local feed.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#showcase" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-foreground/15 hover:border-hydro hover:text-hydro transition-colors">
                    See the Work <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-blaze/25 via-transparent to-hydro/20 blur-3xl" aria-hidden="true" />
                <div className="relative grid grid-cols-5 gap-3 items-end">
                  <img src={labelArt.src} alt={labelArt.alt} width={1024} height={1536} fetchPriority="high"
                    className="col-span-2 w-full h-auto rounded-2xl border border-foreground/10 shadow-2xl -rotate-3 translate-y-6" />
                  <img src={promo[1].src} alt={promo[1].alt} width={1772} height={780}
                    className="col-span-3 w-full h-auto rounded-2xl border border-foreground/10 shadow-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div {...reveal}>
              <SectionLabel>Project Overview</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Creative Design for Automotive Care Brands</h2>
            </motion.div>
            <motion.div {...reveal}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                AS Detailing Supplies manufactures FOMAXX car care products; Aqua Splash Auto Detailing Studio delivers polishing, coating and restoration services. The creative brief covered both sides of the business — bold, performance-led product labels for the FOMAXX range, and clear, offer-driven promotional campaigns for the studio's services.
              </p>
            </motion.div>
          </div>
          <div className="max-w-7xl mx-auto mt-10 grid sm:grid-cols-3 gap-4">
            {overview.map((c) => (
              <motion.div key={c.title} {...reveal} className="glass-card rounded-2xl p-6 border border-foreground/10">
                <c.icon className="w-5 h-5 text-hydro mb-4" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">{c.title}</h3>
                <p className="text-foreground font-medium">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="max-w-2xl mb-10">
              <SectionLabel>What We Designed</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">From Product Labels to Campaign Creatives</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <motion.div key={s.title} {...reveal}
                  className="h-full glass-card rounded-2xl p-6 border border-foreground/10 transition-all duration-500 hover:-translate-y-1 hover:border-hydro/40">
                  <div className="w-11 h-11 rounded-xl bg-hydro/10 border border-hydro/20 flex items-center justify-center mb-5">
                    <s.icon className="w-5 h-5 text-hydro" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGN PRINCIPLES */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...reveal}>
              <SectionLabel>Design Approach</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">Designing for Clarity and Impact</h2>
              <ol className="space-y-6">
                {principles.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="shrink-0 font-display text-2xl font-bold text-gradient w-10">{String(i + 1).padStart(2, '0')}</span>
                    <div className="border-b border-foreground/10 pb-6 flex-1">
                      <h3 className="font-display text-lg font-semibold mb-1.5">{p.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
            <motion.div {...reveal} className="grid grid-cols-1 gap-4 max-w-md lg:max-w-none mx-auto w-full">
              <ArtButton art={labelDetailArt} index={1} onOpen={setLightbox} />
              <p className="text-sm text-muted-foreground text-center">FOMAXX label — iconography and finish detail. Tap to enlarge.</p>
            </motion.div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="showcase" className="py-16 md:py-28 px-4 md:px-8 lg:px-12 border-t border-foreground/5 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-14">
              <SectionLabel>Creative Showcase</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Product Labels &amp; Promotional Creatives</h2>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                Every piece below is the original artwork as delivered — designed to inform fast, look premium, and drive action.
              </p>
            </motion.div>

            {/* Product labels */}
            <h3 className="flex items-center gap-3 font-display text-xl md:text-2xl font-semibold mb-6">
              <Sparkles className="w-5 h-5 text-blaze" aria-hidden="true" /> Product Label Design — FOMAXX
            </h3>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <ArtButton art={labelArt} index={0} onOpen={setLightbox} />
                <p className="mt-3 text-sm font-medium text-center">{labelArt.label}</p>
              </div>
              <div className="md:pt-6">
                <ArtButton art={labelDetailArt} index={1} onOpen={setLightbox} />
                <p className="mt-3 text-sm font-medium text-center">{labelDetailArt.label}</p>
              </div>
            </div>

            {/* Promotional creatives */}
            <h3 className="flex items-center gap-3 font-display text-xl md:text-2xl font-semibold mb-6 mt-16 md:mt-20">
              <Sparkles className="w-5 h-5 text-blaze" aria-hidden="true" /> Promotional &amp; Offer Creatives — Aqua Splash
            </h3>
            <div className="space-y-6">
              {promo.map((art, i) => (
                <div key={art.label}>
                  <ArtButton art={art} index={i + 2} onOpen={setLightbox} />
                  <p className="mt-3 text-sm font-medium text-center">{art.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="max-w-2xl mb-10">
              <SectionLabel>Deliverables &amp; Approach</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Creative Assets Built to Sell</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4">
              {impact.map((c) => (
                <motion.div key={c.title} {...reveal} className="glass-card rounded-2xl p-7 border border-foreground/10">
                  <c.icon className="w-6 h-6 text-blaze mb-5" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-4 md:px-8 lg:px-12">
          <motion.div {...reveal} className="max-w-4xl mx-auto text-center glass-card rounded-[28px] border border-foreground/10 px-6 py-14 md:py-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Have a Product or Service Worth Showcasing?</h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's design labels, campaigns and creatives that make your brand impossible to scroll past.
            </p>
            <button onClick={() => openContact()}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-hydro to-blaze text-background hover:scale-[1.03] transition-transform">
              Start a Project <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        </section>
      </main>

      <Footer />
      {lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} onPrev={prev} onNext={next} />}
    </PageTransition>
  );
};

export default AutomotiveDetailingPortfolio;
