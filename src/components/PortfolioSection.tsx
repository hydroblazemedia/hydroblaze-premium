import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle, X, TrendingUp, Users, BarChart3, Eye, Target, Megaphone, Palette, Globe, Zap, Quote, CheckCircle2 } from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';

import imgCultfit from '@/assets/portfolio-cultfit.jpg';
import imgBlrkabab from '@/assets/portfolio-blrkabab.jpg';
import imgAayara from '@/assets/portfolio-aayara.jpg';

const categories = ['All', 'Lead Generation', 'Social Media', 'Brand Building'] as const;
type Category = typeof categories[number];

interface Project {
  id: number;
  title: string;
  emoji: string;
  category: Category;
  service: string;
  description: string;
  objective: string;
  image: string;
  featured?: boolean;
  whatWeDid: string[];
  impact: string[];
  details: {
    industry: string;
    services: string[];
    objective: string;
    results: { label: string; value: string; icon: typeof TrendingUp }[];
    strategy: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Cult.fit – Rajajinagar',
    emoji: '🏋️',
    category: 'Lead Generation',
    service: 'Performance Marketing & Lead Gen',
    description: 'Increased walk-ins & memberships for a highly competitive fitness location through localized Meta Ads and high-converting funnels.',
    objective: 'Increase walk-ins & memberships for a highly competitive fitness location',
    image: imgCultfit,
    featured: true,
    whatWeDid: [
      'Localized Meta Ads targeting nearby fitness audience',
      'High-converting lead generation funnels',
      'Content strategy focused on transformation + social proof',
      'Performance creatives highlighting offers, trainers, and facilities',
    ],
    impact: [
      'Consistent flow of qualified leads',
      'Improved cost per lead efficiency',
      'Stronger local brand visibility',
    ],
    details: {
      industry: 'Fitness & Wellness',
      services: ['Meta Ads', 'Lead Generation Funnels', 'Content Strategy', 'Performance Creatives'],
      objective: 'Increase walk-ins & memberships for a highly competitive fitness location',
      results: [
        { label: 'Qualified Leads', value: 'Consistent', icon: Users },
        { label: 'CPL Efficiency', value: 'Improved', icon: Target },
        { label: 'Brand Visibility', value: 'Stronger', icon: Eye },
        { label: 'Walk-ins', value: 'Increased', icon: TrendingUp },
      ],
      strategy: 'We implemented localized Meta Ads targeting nearby fitness audiences, combined with high-converting lead generation funnels and a content strategy focused on transformation stories and social proof.',
    },
  },
  {
    id: 2,
    title: 'BLR Kabab',
    emoji: '🍢',
    category: 'Social Media',
    service: 'Social Media & Ad Campaigns',
    description: 'Drove online orders & built a strong food brand presence through scroll-stopping content and hyperlocal ad campaigns.',
    objective: 'Drive online orders & build a strong food brand presence',
    image: imgBlrkabab,
    featured: true,
    whatWeDid: [
      'Scroll-stopping food content & reels',
      'Hyperlocal ad campaigns for order generation',
      'Offer-based creatives to boost conversion rate',
      'Consistent branding across all platforms',
    ],
    impact: [
      'Increased daily order volume',
      'Higher engagement & repeat customers',
      'Strong positioning as a go-to kebab brand',
    ],
    details: {
      industry: 'Food & Beverage',
      services: ['Content Creation', 'Reels & Stories', 'Hyperlocal Ads', 'Brand Consistency'],
      objective: 'Drive online orders & build a strong food brand presence',
      results: [
        { label: 'Daily Orders', value: 'Increased', icon: TrendingUp },
        { label: 'Engagement', value: 'Higher', icon: BarChart3 },
        { label: 'Repeat Customers', value: 'Growing', icon: Users },
        { label: 'Brand Position', value: 'Strong', icon: Target },
      ],
      strategy: 'Created scroll-stopping food content and reels, paired with hyperlocal ad campaigns and offer-based creatives to drive orders and build a recognizable food brand.',
    },
  },
  {
    id: 3,
    title: 'Aayara Boutique',
    emoji: '👗',
    category: 'Brand Building',
    service: 'Brand Strategy & Digital Presence',
    description: 'Launched and established a premium boutique brand from scratch with complete brand positioning and aesthetic-first social media.',
    objective: 'Launch and establish a premium boutique brand from scratch',
    image: imgAayara,
    featured: true,
    whatWeDid: [
      'Complete brand positioning & identity development',
      'Premium content strategy aligned with target audience',
      'Social media setup with aesthetic-first approach',
      'Funnel planning for lead generation & conversions',
    ],
    impact: [
      'Strong brand foundation before launch',
      'Clear premium positioning in market',
      'Ready-to-scale digital presence',
    ],
    details: {
      industry: 'Fashion & Retail',
      services: ['Brand Identity', 'Content Strategy', 'Social Media Setup', 'Funnel Planning'],
      objective: 'Launch and establish a premium boutique brand from scratch',
      results: [
        { label: 'Brand Foundation', value: 'Strong', icon: Palette },
        { label: 'Market Position', value: 'Premium', icon: Target },
        { label: 'Digital Presence', value: 'Scalable', icon: Globe },
        { label: 'Conversions', value: 'Ready', icon: TrendingUp },
      ],
      strategy: 'Developed complete brand positioning and identity, combined with a premium content strategy, aesthetic-first social media presence, and conversion funnel planning.',
    },
  },
];

/* ─── Project Detail Modal ─── */
const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-foreground/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/15 text-hydro border border-hydro/20 mb-3">
              {project.category}
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-10">
          {/* Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Industry</p>
              <p className="text-sm font-medium">{project.details.industry}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Services Provided</p>
              <p className="text-sm font-medium">{project.details.services.join(', ')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Objective</p>
              <p className="text-sm font-medium">{project.details.objective}</p>
            </div>
          </div>

          {/* What We Did */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">What We Did</h3>
            <div className="space-y-3">
              {project.whatWeDid.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-hydro mt-0.5 shrink-0" />
                  <p className="text-muted-foreground text-sm">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Strategy */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-3">Marketing Strategy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.details.strategy}</p>
          </div>

          {/* Impact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-5">Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.impact.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-5 rounded-2xl bg-background/50 border border-foreground/5"
                >
                  <TrendingUp className="w-5 h-5 text-hydro mx-auto mb-2" />
                  <p className="font-display text-sm font-semibold text-gradient">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Portfolio Card ─── */
const PortfolioCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-foreground/5 hover:border-hydro/20 transition-all duration-500">
        {/* Image */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-hydro/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-sm text-foreground">
              View Project <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-hydro font-semibold">{project.service}</span>
          <h3 className="font-display text-lg font-semibold group-hover:text-hydro transition-colors duration-300">{project.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const PortfolioSection = () => {
  const { open } = useContactDialog();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section className="relative z-10 overflow-hidden">
      {/* ── Hero ── */}
      <div className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden">
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
          <motion.div initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Our Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Our Work That Drives
            <br />
            <span className="text-gradient">Real Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          >
            We don't just run campaigns — we build systems that bring in leads, increase sales, and scale brands.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
            <button
              onClick={() => open("Start Your Project")}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.4)] transition-all duration-500 hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Featured Projects ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-muted-foreground mt-3 max-w-lg">Our best campaigns that delivered exceptional results for our clients.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-foreground/5 hover:border-hydro/20 transition-all duration-500 h-full">
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/15 text-hydro border border-hydro/20 mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
                    <div className="space-y-1.5">
                      {project.impact.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-hydro shrink-0" />
                          <p className="text-xs text-foreground/80">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Filter + Grid ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">All <span className="text-gradient">Projects</span></h2>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-hydro/15 text-hydro border-hydro/30'
                      : 'bg-card/50 text-muted-foreground border-foreground/10 hover:border-foreground/20 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── What This Means ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <div className="p-8 md:p-12 rounded-3xl bg-card/50 border border-foreground/5">
              <span className="text-3xl mb-4 block">💡</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">What This Means <span className="text-gradient">for You</span></h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Whether you're a local business, restaurant, or fashion brand — we build growth systems that bring real customers, not just likes.
              </p>
              <p className="font-display text-lg font-semibold text-gradient">
                Strategy + Creatives + Performance = Revenue Growth
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
          <div className="relative bg-card/50 backdrop-blur-sm border border-foreground/10 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-hydro/5 via-transparent to-blaze/5 pointer-events-none" />
            <div className="relative space-y-6">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Ready to Achieve <span className="text-gradient">Similar Results?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
                Let HydroBlaze Media create a powerful digital marketing strategy for your business.
              </p>
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
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
