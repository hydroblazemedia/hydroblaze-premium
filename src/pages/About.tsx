import { motion } from 'framer-motion';
import { BarChart3, Sparkles, Target, Search, Flame, Droplets } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useContactDialog } from '@/components/ContactFormDialog';
import { Seo } from '@/lib/seo';

const About = () => {
  const { open: openContact } = useContactDialog();

  const values = [
    { title: 'Data-Driven', description: 'Every decision is backed by insights, not guesswork.', icon: BarChart3 },
    { title: 'Creative Excellence', description: 'We push boundaries to create memorable experiences.', icon: Sparkles },
    { title: 'Results First', description: 'Beautiful work means nothing without measurable impact.', icon: Target },
    { title: 'Transparency', description: 'Clear communication and honest reporting, always.', icon: Search },
  ];

  return (
    <PageTransition>
      <Seo
        title="About HydroBlaze Media — Strategy-First Growth Partner"
        description="We're a strategy-first growth partner blending performance marketing with editorial-grade creative for ambitious brands."
        path="/about"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
      />
      <div className="noise-overlay" />
      <Navbar />

      <main className="pt-24 overflow-hidden">
        {/* Hero */}
        <section className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full bg-hydro/20 blur-[140px]" />
            <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] rounded-full bg-blaze/20 blur-[140px]" />
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.04] text-muted-foreground border border-foreground/10 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" /> About HydroBlaze
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-8"
            >
              Where <span className="text-gradient">strategy</span> meets{' '}
              <span className="text-gradient-blaze">creative fire</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              We build growth systems for ambitious brands — engineered with analytical precision,
              executed with creative intensity.
            </motion.p>
          </div>
        </section>

        {/* Manifesto / Story */}
        <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 border-t border-foreground/[0.06] overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--hydro)/0.14),transparent_55%)] blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-[30%] -translate-y-[70%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--blaze)/0.12),transparent_60%)] blur-[120px]" />
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-14"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-hydro/60" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                The Manifesto
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-blaze/60" />
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative text-center max-w-5xl mx-auto"
            >
              <span
                aria-hidden
                className="pointer-events-none select-none absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 font-display text-[220px] md:text-[340px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-hydro/25 via-foreground/[0.04] to-blaze/25"
              >
                “
              </span>

              <p className="relative font-display text-[2rem] md:text-5xl lg:text-6xl font-semibold leading-[1.12] tracking-[-0.02em]">
                Most agencies are either{' '}
                <span className="text-gradient-hydro">all strategy</span>{' '}
                with boring execution — or{' '}
                <span className="text-gradient-blaze">all creative</span>{' '}
                with no measurable results.
              </p>

              <p className="relative mt-10 md:mt-12 max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed text-muted-foreground">
                We refused to pick a side. HydroBlaze exists to fuse analytical rigor with
                scroll-stopping craft — so growth stops feeling like a gamble and starts
                behaving like a system.
              </p>

              <div className="relative mt-14 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-hydro" />
                <div className="text-xs md:text-sm tracking-wide text-muted-foreground">
                  <span className="text-foreground font-semibold">HydroBlaze</span>
                  <span className="mx-2 text-muted-foreground/50">—</span>
                  Founding Principle
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blaze" />
              </div>
            </motion.blockquote>
          </div>
        </section>

        {/* Stats band */}
        <section className="relative py-20 md:py-24 px-6 md:px-12 lg:px-16 border-t border-foreground/[0.06]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {[
              { k: '40+', v: 'Brands scaled' },
              { k: '3.2x', v: 'Avg. ROAS lift' },
              { k: '2M+', v: 'Impressions driven' },
              { k: '100%', v: 'Transparent reporting' },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-center md:text-left"
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-gradient mb-2">
                  {s.k}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dual philosophy — editorial split */}
        <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-t border-foreground/[0.06]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-foreground/[0.06] rounded-3xl overflow-hidden border border-foreground/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative p-10 md:p-14 bg-background/60 backdrop-blur-sm"
            >
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-hydro/10 blur-3xl" />
              <Droplets className="w-10 h-10 text-hydro mb-8" />
              <div className="text-xs uppercase tracking-[0.2em] text-hydro/80 mb-4">Hydro — Strategy</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Fluid, measured, relentless.
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Research, positioning, funnels, and analytics. We build the invisible architecture
                that turns attention into pipeline — then compound it week over week.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative p-10 md:p-14 bg-background/60 backdrop-blur-sm"
            >
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-blaze/10 blur-3xl" />
              <Flame className="w-10 h-10 text-blaze mb-8" />
              <div className="text-xs uppercase tracking-[0.2em] text-blaze/80 mb-4">Blaze — Creative</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Bold, cinematic, unmistakable.
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Direction, content, and ads engineered to stop the scroll. Every frame carries
                intent — because forgettable creative is the most expensive line item in marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Principles */}
        <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-t border-foreground/[0.06]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-16"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Operating principles
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                The standards we <span className="text-gradient">refuse to bend</span>.
              </h2>
            </motion.div>

            <div className="divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="grid md:grid-cols-[auto_1fr_2fr] gap-6 md:gap-10 py-10 md:py-12 items-start group"
                >
                  <div className="text-xs font-mono text-muted-foreground/60 md:pt-2">
                    0{index + 1}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-hydro/10 border border-hydro/20 flex items-center justify-center shrink-0 group-hover:bg-hydro/20 transition-colors">
                      <value.icon className="w-5 h-5 text-hydro" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 border-t border-foreground/[0.06]">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] bg-gradient-to-r from-hydro/10 via-transparent to-blaze/10 blur-3xl" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Let's build something{' '}
              <span className="text-gradient-blaze">worth remembering</span>.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Bring us your ambition. We'll bring the system to scale it.
            </p>
            <button
              onClick={() => openContact('About Page CTA')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_40px_hsl(var(--hydro)/0.5)] transition-all duration-300"
            >
              Book a Free Strategy Call
            </button>
          </motion.div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
