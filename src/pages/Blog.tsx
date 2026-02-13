import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const posts = [
  { title: 'Why Your Content Strategy Needs a Data-First Approach', excerpt: "Most brands create content based on vibes. Here's why that's killing your growth and what to do instead.", category: 'Strategy', date: 'Jan 25, 2026', readTime: '5 min read', slug: 'data-first-content-strategy', featured: true },
  { title: 'The Anatomy of a Viral Reel: What Actually Works in 2026', excerpt: "We analyzed 500+ viral reels to find the patterns. Spoiler: it's not just about trends.", category: 'Creative', date: 'Jan 20, 2026', readTime: '7 min read', slug: 'anatomy-viral-reel', featured: true },
  { title: 'Landing Pages That Convert: A Technical Deep Dive', excerpt: "From load times to CTA placement, here's everything you need to build pages that actually convert.", category: 'Tech', date: 'Jan 15, 2026', readTime: '10 min read', slug: 'landing-pages-convert', featured: false },
  { title: 'The Psychology of Scroll-Stopping Thumbnails', excerpt: 'Why some thumbnails demand attention while others get ignored. The science behind visual hooks.', category: 'Creative', date: 'Jan 10, 2026', readTime: '6 min read', slug: 'psychology-thumbnails', featured: false },
  { title: 'Building a Growth Engine: Strategy + Creative + Tech', excerpt: 'How the three pillars of digital marketing work together to create predictable, scalable growth.', category: 'Strategy', date: 'Jan 5, 2026', readTime: '8 min read', slug: 'building-growth-engine', featured: false },
  { title: "Meta Ads in 2026: What's Changed and What Works", excerpt: 'The latest algorithm updates and creative strategies that are driving results right now.', category: 'Strategy', date: 'Jan 1, 2026', readTime: '9 min read', slug: 'meta-ads-2026', featured: false },
];

const categories = ['All', 'Strategy', 'Creative', 'Tech'];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Strategy': return 'bg-hydro/10 text-hydro border-hydro/20';
    case 'Creative': return 'bg-blaze/10 text-blaze border-blaze/20';
    case 'Tech': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default: return 'bg-foreground/5 text-muted-foreground border-foreground/10';
  }
};

const Blog = () => {
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <PageTransition>
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-24">
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6">
                <BookOpen className="w-3.5 h-3.5" />
                Blog
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                Insights That <span className="text-gradient">Ignite</span> Growth
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
                Strategy breakdowns, creative inspiration, and technical deep-dives from the HydroBlaze team. No fluff, just actionable insights.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <button key={category} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === 'All' ? 'bg-foreground text-background' : 'bg-foreground/5 text-muted-foreground hover:bg-foreground/10'}`}>
                  {category}
                </button>
              ))}
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {featuredPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="group relative p-8 rounded-3xl bg-card/50 border border-foreground/10 backdrop-blur-sm hover:border-hydro/30 transition-all duration-300">
                  <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs bg-gradient-to-r from-hydro/20 to-blaze/20 text-foreground border border-foreground/10">Featured</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(post.category)} mb-4`}>{post.category}</span>
                  <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-hydro transition-colors duration-300">{post.title}</h2>
                  <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="group p-6 rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm hover:border-hydro/30 transition-all duration-300">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(post.category)} mb-4`}>{post.category}</span>
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-hydro transition-colors duration-300">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span><span>•</span><span>{post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-20 text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-hydro/10 to-blaze/10 border border-foreground/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Get insights in your inbox</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Weekly breakdowns on strategy, creative, and growth. No spam, just value.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full bg-background/50 border border-foreground/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-hydro transition-colors duration-300" />
                <button className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300">Subscribe</button>
              </div>
            </motion.div>
          </div>
        </section>
        <ContactForm />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Blog;
