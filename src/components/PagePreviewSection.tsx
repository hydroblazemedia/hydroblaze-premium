import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Rocket, Gem, Droplets, Flame, BookOpen, Smartphone, Camera, TrendingUp, Palette } from 'lucide-react';
import servicesPreview from '@/assets/services-preview.jpg';
import pricingPreview from '@/assets/pricing-preview.jpg';
import aboutPreview from '@/assets/about-preview.jpg';
import blogPreview from '@/assets/blog-preview.jpg';

const quickServices = [
  { icon: Smartphone, label: 'Social Media', color: 'hydro' },
  { icon: Camera, label: 'Content', color: 'blaze' },
  { icon: TrendingUp, label: 'Performance Ads', color: 'hydro' },
  { icon: Palette, label: 'Branding', color: 'blaze' },
];

const blogPosts = [
  { title: "10 Growth Hacks for 2024", excerpt: "Discover the latest strategies to accelerate your brand's digital presence.", category: "Growth", date: "Feb 1, 2024" },
  { title: "The Art of Scroll-Stopping Content", excerpt: "Learn how to create content that captures attention in under 3 seconds.", category: "Creative", date: "Jan 28, 2024" },
  { title: "AI in Marketing: A Complete Guide", excerpt: "How artificial intelligence is reshaping digital marketing strategies.", category: "Tech", date: "Jan 20, 2024" },
  { title: "Building Brand Loyalty in 2024", excerpt: "Strategies to turn one-time customers into lifelong advocates.", category: "Strategy", date: "Jan 15, 2024" },
];

const PagePreviewSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % blogPosts.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);

  return (
    <div className="relative z-10">

      {/* === Bento Services Section === */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-5">
              <Rocket className="w-3.5 h-3.5" />
              Services
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1]">
                Powered by Strategy.
                <br />
                <span className="text-gradient">Executed with Precision.</span>
              </h2>
              <Link to="/services" className="group inline-flex items-center gap-2 text-sm text-hydro hover:text-hydro-glow transition-colors shrink-0">
                View all services
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {quickServices.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative p-5 md:p-6 rounded-2xl border border-foreground/10 bg-card/50 backdrop-blur-sm hover:border-${service.color}/30 transition-all duration-400 cursor-pointer`}
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-${service.color}/5 to-transparent pointer-events-none`} />
                <service.icon className={`w-7 h-7 mb-3 text-${service.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <p className="font-display font-semibold text-sm">{service.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Large image card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/services" className="group block relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-hydro/30 transition-all duration-500">
              <div className="aspect-[21/9] md:aspect-[3/1]">
                <img src={servicesPreview} alt="Services" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-muted-foreground text-sm mb-2">Hydro Strategy + Blaze Creative</p>
                <div className="flex items-center gap-2 font-display font-semibold text-lg">
                  Explore our framework
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === Pricing === */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 relative group">
              <Link to="/pricing" className="block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 group-hover:border-blaze/30 transition-all duration-500">
                  <img src={pricingPreview} alt="Pricing tiers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-5">
                <Gem className="w-3.5 h-3.5" />
                Pricing
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-[1.1]">
                Transparent Pricing.
                <br />
                <span className="text-gradient-blaze">No Surprises.</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every stage of growth deserves the right support. Choose the plan that fits — no hidden fees, no long-term contracts.
              </p>
              <Link to="/pricing" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blaze to-blaze/80 text-white hover:shadow-[0_0_30px_hsl(var(--blaze)/0.4)] transition-all duration-300">
                View Pricing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === About === */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-5">
                <Droplets className="w-3.5 h-3.5" />
                <Flame className="w-3.5 h-3.5 text-blaze" />
                About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-[1.1]">
                Where <span className="text-gradient">Water</span> Meets <span className="text-gradient-blaze">Fire</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                A digital marketing agency that combines fluid, data-driven strategy with the intensity of scroll-stopping creative. Meet the team behind HydroBlaze.
              </p>
              <Link to="/about" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-foreground/20 hover:border-hydro hover:shadow-[0_0_20px_hsl(var(--hydro)/0.3)] transition-all duration-300">
                Meet the Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="relative group">
              <Link to="/about" className="block">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 group-hover:border-hydro/30 transition-all duration-500">
                  <img src={aboutPreview} alt="About HydroBlaze" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === Blog === */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Blog
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Insights & <span className="text-gradient-blaze">Strategies</span>
                </h2>
              </div>
              <Link to="/blog" className="group inline-flex items-center gap-2 text-sm text-blaze hover:text-blaze-glow transition-colors shrink-0">
                All articles
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Blog carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {blogPosts.map((post, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="aspect-video rounded-2xl overflow-hidden border border-foreground/10">
                          <img src={blogPreview} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 md:p-8">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blaze/10 text-blaze border border-blaze/20 mb-3">{post.category}</span>
                          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{post.title}</h3>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          <p className="text-sm text-muted-foreground/60 mb-6">{post.date}</p>
                          <Link to="/blog" className="group/link inline-flex items-center gap-2 text-blaze hover:underline">
                            Read More
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {blogPosts.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-blaze' : 'bg-foreground/20 hover:bg-foreground/40'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PagePreviewSection;
