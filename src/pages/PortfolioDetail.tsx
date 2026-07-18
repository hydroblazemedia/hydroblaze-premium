import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, TrendingUp, Instagram, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { projects, ImageSlider } from '@/components/PortfolioSection';

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <PageTransition>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-hydro transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            {/* Hero */}
            <div
              className="relative h-56 md:h-80 rounded-3xl overflow-hidden border border-foreground/10 mb-10"
              style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
            >
              {project.imageFit === 'contain' && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--hydro) / 0.18), transparent 60%)' }}
                />
              )}
              <img
                src={project.image}
                alt={project.title}
                className={`relative w-full h-full ${project.imageFit === 'contain' ? 'object-contain p-8 md:p-14' : 'object-cover'}`}
              />
            </div>

            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold bg-hydro/15 text-hydro border border-hydro/20 mb-4">
                <Sparkles className="w-3 h-3" />
                {project.category}
              </span>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
                {project.instagram && (
                  <a
                    href={project.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-foreground/10 hover:border-hydro/40 bg-background/60 hover:bg-background/90 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-hydro" />
                    Instagram
                  </a>
                )}
              </div>
            </motion.div>

            {/* Overview grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
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
            <div className="mb-12">
              <h2 className="font-display text-2xl font-semibold mb-5">What We Did</h2>
              <div className="space-y-3">
                {project.whatWeDid.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-hydro mt-1 shrink-0" />
                    <p className="text-muted-foreground text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-semibold mb-3">Marketing Strategy</h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{project.details.strategy}</p>
            </div>

            {/* Impact */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-semibold mb-5">Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.impact.map((item, i) => (
                  <div key={i} className="text-center p-5 rounded-2xl bg-card/50 border border-foreground/5">
                    <TrendingUp className="w-5 h-5 text-hydro mx-auto mb-2" />
                    <p className="font-display text-sm font-semibold text-gradient">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <div className="mb-4">
                <h2 className="font-display text-2xl font-semibold mb-5">Case Study Highlights</h2>
                <ImageSlider images={project.images} title={project.title} bg={project.imageBg} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default PortfolioDetail;
