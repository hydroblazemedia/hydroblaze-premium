import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle, X, TrendingUp, Users, BarChart3, Eye, Target, Megaphone, Palette, Globe, Zap, Quote } from 'lucide-react';
import { useContactDialog } from '@/components/ContactFormDialog';

import imgSocial from '@/assets/portfolio-social-campaign.jpg';
import imgAds from '@/assets/portfolio-paid-ads.jpg';
import imgWebsite from '@/assets/portfolio-website.jpg';
import imgBranding from '@/assets/portfolio-branding.jpg';
import imgLeadgen from '@/assets/portfolio-leadgen.jpg';
import imgEcommerce from '@/assets/portfolio-ecommerce.jpg';

const categories = ['All', 'Social Media', 'Paid Advertising', 'Website Design', 'Content Creation', 'Lead Generation'] as const;
type Category = typeof categories[number];

interface Project {
  id: number;
  title: string;
  category: Category;
  service: string;
  description: string;
  image: string;
  featured?: boolean;
  details: {
    industry: string;
    services: string[];
    objective: string;
    results: { label: string; value: string; icon: typeof TrendingUp }[];
    visuals: string[];
    strategy: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Growth Campaign',
    category: 'Paid Advertising',
    service: 'Meta & Google Ads',
    description: 'Scaled an e-commerce brand from ₹2L to ₹15L monthly revenue through strategic paid advertising.',
    image: imgEcommerce,
    featured: true,
    details: {
      industry: 'E-Commerce / Fashion',
      services: ['Meta Ads', 'Google Ads', 'Conversion Tracking', 'A/B Testing'],
      objective: 'Increase online sales and reduce cost per acquisition through optimized paid campaigns.',
      results: [
        { label: 'Revenue Growth', value: '650%', icon: TrendingUp },
        { label: 'ROAS', value: '5.2x', icon: BarChart3 },
        { label: 'Leads Generated', value: '2,400+', icon: Users },
        { label: 'Cost Reduction', value: '45%', icon: Target },
      ],
      visuals: ['Ad creatives', 'Campaign dashboards', 'Performance reports'],
      strategy: 'We implemented a full-funnel advertising strategy with lookalike audiences, retargeting sequences, and dynamic product ads across Meta and Google platforms.',
    },
  },
  {
    id: 2,
    title: 'Restaurant Chain Social Media',
    category: 'Social Media',
    service: 'Social Media Management',
    description: 'Built a 50K+ engaged community for a restaurant chain through strategic content and community management.',
    image: imgSocial,
    featured: true,
    details: {
      industry: 'Food & Beverage',
      services: ['Content Strategy', 'Community Management', 'Influencer Marketing', 'Reels & Stories'],
      objective: 'Build brand awareness and drive foot traffic through engaging social media presence.',
      results: [
        { label: 'Follower Growth', value: '380%', icon: Users },
        { label: 'Engagement Rate', value: '8.5%', icon: TrendingUp },
        { label: 'Monthly Reach', value: '500K+', icon: Eye },
        { label: 'Store Visits', value: '2x', icon: Target },
      ],
      visuals: ['Social media posts', 'Instagram reels', 'Story highlights'],
      strategy: 'Created a content calendar focused on food photography, behind-the-scenes content, and user-generated content campaigns to build authentic community engagement.',
    },
  },
  {
    id: 3,
    title: 'SaaS Website Redesign',
    category: 'Website Design',
    service: 'Website & Landing Page Design',
    description: 'Redesigned a SaaS platform website resulting in 3x more demo bookings and reduced bounce rate.',
    image: imgWebsite,
    featured: true,
    details: {
      industry: 'Technology / SaaS',
      services: ['Website Design', 'UI/UX', 'Landing Pages', 'SEO Optimization'],
      objective: 'Increase conversion rate and improve user experience for a B2B SaaS platform.',
      results: [
        { label: 'Demo Bookings', value: '3x', icon: TrendingUp },
        { label: 'Bounce Rate', value: '-52%', icon: BarChart3 },
        { label: 'Page Speed', value: '95/100', icon: Zap },
        { label: 'Organic Traffic', value: '+180%', icon: Eye },
      ],
      visuals: ['Website mockups', 'Responsive designs', 'UI components'],
      strategy: 'Implemented a conversion-centered design approach with clear CTAs, social proof sections, and optimized page load performance.',
    },
  },
  {
    id: 4,
    title: 'Real Estate Brand Identity',
    category: 'Content Creation',
    service: 'Branding & Content Creation',
    description: 'Complete brand identity and content system for a premium real estate developer.',
    image: imgBranding,
    featured: true,
    details: {
      industry: 'Real Estate',
      services: ['Brand Identity', 'Content Creation', 'Video Production', 'Marketing Collateral'],
      objective: 'Establish a premium brand identity that attracts high-net-worth buyers.',
      results: [
        { label: 'Brand Recall', value: '4x', icon: Eye },
        { label: 'Lead Quality', value: '+85%', icon: Users },
        { label: 'Content Pieces', value: '200+', icon: Palette },
        { label: 'Engagement', value: '+320%', icon: TrendingUp },
      ],
      visuals: ['Brand guidelines', 'Social media templates', 'Video content'],
      strategy: 'Developed a cohesive visual identity with premium photography, cinematic property tours, and a consistent content system across all touchpoints.',
    },
  },
  {
    id: 5,
    title: 'Healthcare Lead Funnel',
    category: 'Lead Generation',
    service: 'Lead Generation Funnels',
    description: 'Built an automated lead generation system generating 300+ qualified leads monthly for a healthcare clinic.',
    image: imgLeadgen,
    details: {
      industry: 'Healthcare',
      services: ['Funnel Design', 'Landing Pages', 'Email Automation', 'WhatsApp Integration'],
      objective: 'Create a scalable lead generation system with automated nurturing sequences.',
      results: [
        { label: 'Monthly Leads', value: '300+', icon: Users },
        { label: 'Conversion Rate', value: '12%', icon: TrendingUp },
        { label: 'Cost Per Lead', value: '-60%', icon: Target },
        { label: 'Booking Rate', value: '35%', icon: BarChart3 },
      ],
      visuals: ['Landing pages', 'Funnel flow', 'Automation sequences'],
      strategy: 'Designed a multi-step funnel with targeted landing pages, WhatsApp automation, and email nurture sequences to convert cold traffic into booked appointments.',
    },
  },
  {
    id: 6,
    title: 'Fitness Brand Paid Campaign',
    category: 'Paid Advertising',
    service: 'Meta & Google Ads',
    description: 'Drove 1,000+ gym memberships through a hyper-targeted Meta and Google advertising campaign.',
    image: imgAds,
    details: {
      industry: 'Fitness & Wellness',
      services: ['Meta Ads', 'Google Ads', 'Lead Ads', 'Retargeting'],
      objective: 'Generate membership sign-ups at scale while maintaining profitable unit economics.',
      results: [
        { label: 'Memberships', value: '1,000+', icon: Users },
        { label: 'ROAS', value: '4.8x', icon: TrendingUp },
        { label: 'CPL Reduced', value: '55%', icon: Target },
        { label: 'Ad Reach', value: '2M+', icon: Megaphone },
      ],
      visuals: ['Ad creatives', 'Campaign analytics', 'Performance reports'],
      strategy: 'Implemented geo-targeted campaigns with compelling video ads, social proof elements, and limited-time offer sequences to drive urgency.',
    },
  },
];

const testimonials = [
  {
    quote: "HydroBlaze Media helped us generate consistent leads through their advertising campaigns. Their team truly understands performance marketing.",
    name: "Rahul Sharma",
    business: "TechStart Solutions",
  },
  {
    quote: "Our social media presence went from zero to hero. The content quality and engagement strategies they implemented were outstanding.",
    name: "Priya Mehta",
    business: "Flavor Street Restaurants",
  },
  {
    quote: "The website they designed for us completely transformed our online presence. Demo bookings increased 3x within the first month.",
    name: "Arjun Patel",
    business: "CloudSync SaaS",
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

          {/* Strategy */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-3">Marketing Strategy</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.details.strategy}</p>
          </div>

          {/* Results */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-5">Results & Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.details.results.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-5 rounded-2xl bg-background/50 border border-foreground/5"
                >
                  <result.icon className="w-5 h-5 text-hydro mx-auto mb-2" />
                  <p className="font-display text-2xl md:text-3xl font-bold text-gradient">{result.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{result.label}</p>
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
            Our Work & Marketing
            <br />
            <span className="text-gradient">Success Stories</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          >
            Explore how HydroBlaze Media helps businesses grow with high-performing digital marketing campaigns, creative content, and strategic marketing solutions.
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
                    <div className="flex gap-4">
                      {project.details.results.slice(0, 3).map((r, j) => (
                        <div key={j} className="text-center">
                          <p className="font-display text-lg font-bold text-hydro">{r.value}</p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.label}</p>
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

      {/* ── Testimonials ── */}
      <div className="px-6 md:px-12 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Client <span className="text-gradient">Testimonials</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-card/50 border border-foreground/5 hover:border-hydro/10 transition-colors duration-500"
              >
                <Quote className="w-8 h-8 text-hydro/30 mb-4" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
