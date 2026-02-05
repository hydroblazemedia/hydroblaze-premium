import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PagePreviewSection = () => {
  return (
    <div className="relative z-10">
      {/* Services Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-4">
                🚀 Services
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Three Elements. <span className="text-gradient">One Growth Engine.</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Strategy, Creative, and Tech that work together seamlessly. We build systems that attract, convert, and scale—so your brand doesn't just grow, it dominates.
              </p>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-hydro/80 text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-hydro/20 to-hydro/5 border border-foreground/10 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8">
                  <div className="text-center">
                    <span className="text-3xl">💧</span>
                    <p className="text-xs text-muted-foreground mt-2">Strategy</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl">🔥</span>
                    <p className="text-xs text-muted-foreground mt-2">Creative</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl">⚙️</span>
                    <p className="text-xs text-muted-foreground mt-2">Tech</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-hydro/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blaze/20 to-blaze/5 border border-foreground/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-5xl">💎</span>
                  <p className="text-muted-foreground mt-4 text-sm">Plans starting at</p>
                  <p className="font-display text-3xl font-bold mt-1">$2,500<span className="text-base font-normal text-muted-foreground">/mo</span></p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blaze/20 rounded-full blur-3xl" />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
                💎 Pricing
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Transparent Pricing. <span className="text-gradient-blaze">No Surprises.</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Every stage of growth deserves the right support. Choose the plan that fits your needs—no hidden fees, no long-term contracts, just results.
              </p>
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blaze to-blaze/80 text-white hover:shadow-[0_0_30px_hsl(var(--blaze)/0.4)] transition-all duration-300"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-4">
                💧🔥 About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Where <span className="text-gradient">Water</span> Meets <span className="text-gradient-blaze">Fire</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                We're a digital marketing agency that combines the fluidity of data-driven strategy with the intensity of scroll-stopping creative. Learn about our story, values, and the team behind HydroBlaze.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-foreground/20 hover:border-hydro hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] transition-all duration-300"
              >
                Meet the Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-hydro/10 via-transparent to-blaze/10 border border-foreground/10 flex items-center justify-center">
                <span className="text-6xl">💧🔥</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-hydro to-blaze rounded-full blur-3xl opacity-30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-hydro/20 to-hydro/5 border border-foreground/10 flex items-center justify-center">
                <div className="flex gap-6 p-8">
                  <div className="text-center">
                    <span className="text-2xl">🌍</span>
                    <p className="text-xs text-muted-foreground mt-2">Remote</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">🎨</span>
                    <p className="text-xs text-muted-foreground mt-2">Creative</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">📈</span>
                    <p className="text-xs text-muted-foreground mt-2">Growth</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-hydro/20 rounded-full blur-3xl" />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
                🌟 Careers
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Join the <span className="text-gradient-blaze">HydroBlaze</span> Team
              </h2>
              <p className="text-muted-foreground mb-6">
                We're building the future of digital marketing. If you're passionate about creating work that actually moves the needle, we want to hear from you.
              </p>
              <Link
                to="/careers"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-foreground/20 hover:border-blaze hover:shadow-[0_0_20px_hsl(var(--blaze)/0.3)] transition-all duration-300"
              >
                View Open Positions
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-4">
                📚 Blog
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Insights & <span className="text-gradient-blaze">Strategies</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Stay ahead of the curve with our latest insights on digital marketing, growth strategies, and industry trends. Fuel your brand's digital growth with expert knowledge.
              </p>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blaze to-blaze/80 text-white hover:shadow-[0_0_30px_hsl(var(--blaze)/0.4)] transition-all duration-300"
              >
                Read the Blog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blaze/20 to-blaze/5 border border-foreground/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-5xl">📚</span>
                  <p className="text-muted-foreground mt-4 text-sm">Latest articles on</p>
                  <p className="font-display text-lg font-semibold mt-1">Growth & Marketing</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blaze/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PagePreviewSection;
