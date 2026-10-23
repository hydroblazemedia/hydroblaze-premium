import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Expand, Instagram } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { Seo } from '@/lib/seo';
import { useContactDialog } from '@/components/ContactFormDialog';

import logo from '@/assets/aayara/logo.webp';
import pamphlet from '@/assets/aayara/pamphlet.webp';
import s1 from '@/assets/aayara/slide-1.webp';
import s2 from '@/assets/aayara/slide-2.webp';
import s3 from '@/assets/aayara/slide-3.webp';
import s4 from '@/assets/aayara/slide-4.webp';
import s5 from '@/assets/aayara/slide-5.webp';
import s6 from '@/assets/aayara/slide-6.webp';

type Art = { src: string; label: string; alt: string; w: number; h: number };

const logoArt: Art = { src: logo, label: 'Aayara Logo', alt: 'Aayara logo in gold with a tassel motif, floral detail and the tagline Weaving Dreams', w: 1536, h: 1024 };
const slides: Art[] = [
  { src: s1, label: 'Slide 01 — Lehengas', alt: 'Carousel cover slide reading Lehengas, made for moments worth remembering', w: 1080, h: 1350 },
  { src: s2, label: 'Slide 02 — A Color For Every Celebration', alt: 'Carousel slide titled A Color For Every Celebration with an ivory embroidered lehenga', w: 1080, h: 1350 },
  { src: s3, label: 'Slide 03 — The Art Of Festive Dressing', alt: 'Carousel slide titled The Art Of Festive Dressing with a mustard lehenga and jacket', w: 1080, h: 1350 },
  { src: s4, label: 'Slide 04 — Designed To Move Beautifully', alt: 'Carousel slide titled Designed To Move Beautifully showing a lehenga from behind in a stone corridor', w: 1080, h: 1350 },
  { src: s5, label: 'Slide 05 — Beauty Lies In The Details', alt: 'Carousel slide titled Beauty Lies In The Details with close-ups of neckline and embroidery', w: 1080, h: 1350 },
  { src: s6, label: 'Slide 06 — Celebrate Every Beautiful Moment', alt: 'Carousel closing slide reading Celebrate Every Beautiful Moment', w: 1080, h: 1350 },
];
const pamphletArt: Art = { src: pamphlet, label: 'Boutique Launch Pamphlet', alt: 'Aayara launch pamphlet: now open at Gunjur, Bengaluru, with sarees, lehengas, festive wear, salwar suits and designer collections, address and contact details', w: 1200, h: 1697 };

const all: Art[] = [logoArt, ...slides, pamphletArt];
const PAMPHLET_INDEX = all.length - 1;

const overview = [
  { k: 'Client', v: 'Aayara Boutique' },
  { k: 'Industry', v: 'Fashion & Retail' },
  { k: 'Location', v: 'Gunjur, Bengaluru' },
  { k: 'Deliverables', v: 'Brand identity, social media carousel, boutique launch pamphlet' },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
        <button autoFocus onClick={onClose} aria-label="Close viewer" className="shrink-0 w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
        <img src={item.src} alt={item.alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
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

const ArtButton = ({ art, index, onOpen, className = '', imgClass = '' }: { art: Art; index: number; onOpen: (i: number) => void; className?: string; imgClass?: string }) => (
  <button type="button" onClick={() => onOpen(index)} aria-label={`View ${art.label} full size`}
    className={`group relative block w-full overflow-hidden rounded-xl border border-foreground/10 transition-all duration-500 hover:border-hydro/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hydro ${className}`}>
    <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" decoding="async"
      className={`w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.015] ${imgClass}`} />
    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/75 backdrop-blur border border-foreground/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
      <Expand className="w-4 h-4" aria-hidden="true" />
    </span>
  </button>
);

const DeliverableHead = ({ n, title, body }: { n: string; title: string; body: string }) => (
  <motion.div {...reveal} className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-10 items-end mb-10 border-b border-foreground/10 pb-8">
    <span className="font-display text-6xl md:text-8xl font-bold leading-none text-hydro/80">{n}</span>
    <div>
      <span className="block text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold mb-3">Deliverable {n}</span>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">{body}</p>
    </div>
  </motion.div>
);

const AayaraBoutiquePortfolio = () => {
  const { open: openContact } = useContactDialog();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + all.length) % all.length)), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % all.length)), []);
  const track = useRef<HTMLDivElement>(null);
  const scrollTrack = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 20), behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <Seo
        title="Aayara Boutique — Brand Identity, Social Carousel & Launch Pamphlet"
        description="HydroBlaze Media shaped Aayara Boutique's visual presence: gold-detailed brand identity, a six-slide lehenga carousel and the Gunjur, Bengaluru launch pamphlet."
        path="/portfolio/aayara-boutique"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: 'Aayara Boutique', path: '/portfolio/aayara-boutique' },
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
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="ivory-surface inline-flex rounded-xl border border-foreground/10 px-4 py-2 mb-8">
                  <img src={logo} alt="Aayara — Weaving Dreams logo" width={1536} height={1024} fetchPriority="high" className="h-20 md:h-24 w-auto object-contain" />
                </div>
                <span className="block text-[11px] uppercase tracking-[0.28em] text-hydro font-semibold mb-4">Aayara Boutique</span>
                <h1 className="font-display font-bold tracking-tight text-4xl md:text-6xl leading-[1.05] text-foreground">
                  Weaving Dreams Into a Digital Brand Identity
                </h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  From brand identity to fashion-led social media creatives and boutique launch communication, we helped shape Aayara's visual presence.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#deliverables" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold border border-foreground/15 hover:border-hydro hover:text-hydro transition-colors">
                    See the Work <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a href="https://www.instagram.com/aayara_weaving_dreams/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-muted-foreground hover:text-hydro transition-colors">
                    <Instagram className="w-4 h-4" aria-hidden="true" /> @aayara_weaving_dreams
                  </a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="mx-auto w-full max-w-sm lg:max-w-md">
                <ArtButton art={pamphletArt} index={PAMPHLET_INDEX} onOpen={setLightbox} className="ivory-surface shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
          <dl className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-y border-foreground/10">
            {overview.map((o, i) => (
              <div key={o.k} className={`py-6 px-1 md:px-6 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 === 1 ? 'border-l lg:border-l' : ''} border-foreground/10 ${i < 2 ? 'border-b lg:border-b-0' : ''} pl-4`}>
                <dt className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground font-semibold mb-2">{o.k}</dt>
                <dd className="text-foreground font-medium leading-snug">{o.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div id="deliverables" className="scroll-mt-24" />

        {/* 01 BRAND IDENTITY */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <DeliverableHead n="01" title="Brand Identity"
              body="An elegant identity built around gold detailing, floral motifs, and the timeless character of Indian ethnic fashion." />
            <div className="grid md:grid-cols-[1.6fr_1fr] gap-5">
              <ArtButton art={logoArt} index={0} onOpen={setLightbox} className="ivory-surface" />
              <motion.div {...reveal} className="ivory-surface rounded-xl border border-foreground/10 overflow-hidden relative min-h-[220px]">
                <img src={logo} alt="" aria-hidden="true" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-[2.4] origin-[30%_55%]" />
                <span className="absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full bg-background/80 text-foreground">Detail — tassel mark</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 02 CAROUSEL */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <DeliverableHead n="02" title="Social Media Carousel"
              body="A six-slide lehenga carousel designed as one editorial sequence, in Aayara's ivory, burgundy and gold palette." />
            <div className="flex justify-end gap-2 mb-5">
              <button onClick={() => scrollTrack(-1)} aria-label="Previous slides" className="w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollTrack(1)} aria-label="Next slides" className="w-11 h-11 rounded-full border border-foreground/15 flex items-center justify-center hover:border-hydro hover:text-hydro transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div ref={track} className="max-w-7xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:thin]" tabIndex={0} aria-label="Lehenga carousel slides">
            <ol className="flex gap-5">
              {slides.map((s, i) => (
                <li key={s.label} className="snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[31%]">
                  <ArtButton art={s} index={i + 1} onOpen={setLightbox} className="ivory-surface" />
                  <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 03 PAMPHLET */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto">
            <DeliverableHead n="03" title="Boutique Launch Pamphlet"
              body="The launch announcement for Aayara's Gunjur boutique — brand identity, launch messaging, fashion imagery, collection categories and contact details in one portrait piece." />
            <div className="mx-auto max-w-2xl">
              <ArtButton art={pamphletArt} index={PAMPHLET_INDEX} onOpen={setLightbox} className="ivory-surface" />
              <p className="mt-3 text-sm text-muted-foreground text-center">Tap to view full size.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-4 md:px-8 lg:px-12">
          <motion.div {...reveal} className="max-w-4xl mx-auto text-center rounded-[28px] border border-foreground/10 px-6 py-14 md:py-20">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Launching a Brand Worth Remembering?</h2>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's build the identity, social creatives and launch material that make it feel unmistakably yours.
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

export default AayaraBoutiquePortfolio;
