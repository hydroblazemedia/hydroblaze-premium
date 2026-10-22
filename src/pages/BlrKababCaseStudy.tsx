import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Instagram, Expand,
  UtensilsCrossed, Target, MapPin, Camera, CalendarCheck, Megaphone, Store, Palette,
  Flame, Tag, BadgeCheck, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';
import { useContactDialog } from '@/components/ContactFormDialog';

import blrSpecial from '@/assets/blrkabab/blr-special.webp';
import sholay from '@/assets/blrkabab/sholay-kabab.webp';
import pudina from '@/assets/blrkabab/pudina-kabab.webp';
import lollipop from '@/assets/blrkabab/chicken-lollipop.webp';
import french from '@/assets/blrkabab/french-chicken.webp';
import poster from '@/assets/blrkabab/launch-poster.webp';
import menu from '@/assets/blrkabab/menu.webp';

const INSTAGRAM = 'https://www.instagram.com/blrkabab/';

type Art = { src: string; label: string; alt: string; w: number; h: number };

const social: Art[] = [
  { src: blrSpecial, label: 'BLR Special', alt: 'BLR Special social post with glazed chicken lollipops and Swiggy, Zomato and Ownly ordering badges', w: 1080, h: 1350 },
  { src: sholay, label: 'Sholay Kabab', alt: 'Sholay Kabab social post — tender, spicy chicken kabab on a black plate', w: 1080, h: 1350 },
  { src: pudina, label: 'Refreshing Pudina Kabab', alt: 'Refreshing Pudina Kabab social post with fresh mint marinated chicken', w: 1080, h: 1350 },
  { src: lollipop, label: 'Chicken Lollipop', alt: 'Chicken Lollipop social post — bold, spicy, addictive', w: 1080, h: 1350 },
  { src: french, label: 'French Chicken', alt: 'French Chicken social post with crispy coated chicken', w: 1080, h: 1350 },
];
const posterArt: Art = { src: poster, label: 'Newly Launched Campaign Poster', alt: 'Newly launched poster: Jumbo Roll ₹139 and Loaded Fries ₹149, available on Swiggy, Zomato, Ownly and Toing', w: 1357, h: 1920 };
const menuArt: Art = { src: menu, label: 'Menu Design', alt: 'BLR Kabab menu listing kabab quantities from 150 g to 1 kg with prices, plus Drum Stick, BLR Special, Chicken Lollipop and French Chicken', w: 1357, h: 1920 };

const all: Art[] = [...social, posterArt, menuArt];

const overview = [
  { icon: UtensilsCrossed, title: 'Industry', body: 'Food & Beverage — QSR / Takeaway' },
  { icon: Target, title: 'Objective', body: 'Strengthen digital brand presence and support online orders.' },
  { icon: MapPin, title: 'Location', body: 'Bengaluru, Karnataka, India.' },
];

const services = [
  { icon: Camera, title: 'Content Creation', body: 'Food photography, promotional posts, reels, and product-focused visual storytelling.' },
  { icon: CalendarCheck, title: 'Social Media Management', body: 'Consistent content planning, publishing, and brand presentation across social channels.' },
  { icon: Megaphone, title: 'Hyperlocal Advertising', body: 'Meta and Google advertising support focused on local audiences and order generation.' },
  { icon: Store, title: 'Platform Management', body: 'Swiggy and Zomato menu updates, promotional listings, and advertising support.' },
  { icon: Palette, title: 'Brand Consistency', body: 'A recognizable visual identity and consistent communication across digital touchpoints.' },
];

const pillars = [
  { title: 'Scroll-Stopping Food Content', body: 'Showcase signature dishes, combos, and special menu items through bold food photography and engaging creative formats.' },
  { title: 'Hyperlocal Campaigns', body: 'Support local customer acquisition through geographically relevant advertising.' },
  { title: 'Offer-Led Creatives', body: 'Highlight menu items, promotions, and ordering opportunities using clear, action-oriented designs.' },
  { title: 'Consistent Brand Identity', body: 'Maintain a recognizable visual language across Instagram, Swiggy, Zomato, menus, and promotional materials.' },
];

const impact = [
  { icon: Flame, title: 'Consistent Food-First Content', body: 'Created visual assets focused on signature dishes, menu items, and food-led promotions.' },
  { icon: Tag, title: 'Offer-Led Creative Direction', body: 'Designed promotional creatives to communicate menu highlights and ordering opportunities.' },
  { icon: BadgeCheck, title: 'Consistent Brand Presentation', body: 'Maintained a recognizable visual identity across social media content, promotional posters, and menu materials.' },
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
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col">
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

const BlrKababCaseStudy = () => {
  const { open: openContact } = useContactDialog();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + all.length) % all.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % all.length)), []);

  return (
    <PageTransition>
      <Seo
        title="BLR Kabab — Food & Beverage Social Media Case Study"
        description="How HydroBlaze Media built a distinctive digital presence for BLR Kabab, a Bengaluru quick-service restaurant, through food-first content, offer-led creatives and platform support."
        path="/portfolio/blr-kabab"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: 'BLR Kabab', path: '/portfolio/blr-kabab' },
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
                  <span className="text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold">Case Study</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full border border-blaze/40 text-blaze bg-blaze/10">Food &amp; Beverage</span>
                </div>
                <h1 className="font-display font-bold tracking-tight">
                  <span className="block text-5xl md:text-7xl text-foreground">BLR Kabab</span>
                  <span className="block mt-4 text-2xl md:text-4xl leading-tight text-gradient">Turning Bold Bengaluru Flavours Into Scroll-Stopping Content.</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Building a distinctive digital presence for a Bengaluru-based quick-service restaurant through food-focused content, social media management, promotional campaigns, and platform support.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold bg-gradient-to-r from-hydro to-blaze text-background hover:scale-[1.03] transition-transform">
                    <Instagram className="w-4 h-4" aria-hidden="true" /> View on Instagram
                  </a>
                  <a href="#showcase" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-foreground/15 hover:border-hydro hover:text-hydro transition-colors">
                    See the Work <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-blaze/25 via-transparent to-hydro/20 blur-3xl" aria-hidden="true" />
                <div className="relative grid grid-cols-5 gap-3 items-end">
                  <img src={sholay} alt="Sholay Kabab social creative" width={1080} height={1350}
                    className="col-span-2 w-full h-auto rounded-2xl border border-foreground/10 shadow-2xl -rotate-3 translate-y-6" />
                  <img src={blrSpecial} alt="BLR Special social creative featuring the BLR Kabab logo" width={1080} height={1350} fetchPriority="high"
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
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Bringing Bengaluru's Kabab Flavours Online</h2>
            </motion.div>
            <motion.div {...reveal}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                BLR Kabab is a Bengaluru-based quick-service restaurant specializing in chicken kababs, rolls, and signature combos. The project focused on building a consistent digital presence, showcasing the menu through compelling food visuals, communicating promotional offers, and supporting online ordering.
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
              <SectionLabel>Services Provided</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">What We Delivered</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

        {/* STRATEGY */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...reveal}>
              <SectionLabel>Marketing Strategy</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8">A Focused Strategy to Drive Online Orders</h2>
              <ol className="space-y-6">
                {pillars.map((p, i) => (
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
            <motion.div {...reveal} className="grid grid-cols-2 gap-4">
              <ArtButton art={social[2]} index={2} onOpen={setLightbox} className="translate-y-8" />
              <ArtButton art={social[4]} index={4} onOpen={setLightbox} />
            </motion.div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="showcase" className="py-16 md:py-28 px-4 md:px-8 lg:px-12 border-t border-foreground/5 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-14">
              <SectionLabel>Creative Showcase</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">From Social Content to Campaign Design</h2>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                A flavour-first creative direction combining bold typography, striking food photography, promotional messaging, and BLR Kabab's distinctive red-and-white identity.
              </p>
            </motion.div>

            <h3 className="flex items-center gap-3 font-display text-xl md:text-2xl font-semibold mb-6">
              <Sparkles className="w-5 h-5 text-blaze" aria-hidden="true" /> Social Media Creatives
            </h3>
            <ul className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
              {social.map((art, i) => (
                <li key={art.label} className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-auto">
                  <ArtButton art={art} index={i} onOpen={setLightbox} />
                  <p className="mt-3 text-sm font-medium text-center">{art.label}</p>
                </li>
              ))}
            </ul>

            <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">Promotional Campaign Poster</h3>
                <p className="text-sm text-muted-foreground mb-6">Launch creative for the Jumbo Roll and Loaded Fries.</p>
                <ArtButton art={posterArt} index={5} onOpen={setLightbox} />
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">Menu Design</h3>
                <p className="text-sm text-muted-foreground mb-6">Kabab varieties, portion sizes and prices — tap to read in full.</p>
                <ArtButton art={menuArt} index={6} onOpen={setLightbox} />
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <motion.div {...reveal} className="max-w-2xl mb-10">
              <SectionLabel>Impact &amp; Deliverables</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Building a Recognizable Local Food Brand</h2>
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
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Have a Brand That Deserves to Stand Out?</h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's build a distinctive digital presence for your business through thoughtful strategy, compelling creative, and consistent execution.
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

export default BlrKababCaseStudy;
