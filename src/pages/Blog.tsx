import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowRight, Search, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { supabase } from '@/integrations/supabase/client';
import { BLOG_CATEGORIES, formatDate } from '@/lib/blog';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  reading_time: number;
  published_at: string | null;
}

const getCategoryColor = (category: string) => {
  const lower = category.toLowerCase();
  if (['strategy', 'marketing', 'growth', 'seo'].some(k => lower.includes(k))) return 'bg-hydro/10 text-hydro border-hydro/20';
  if (['creative', 'design', 'content', 'social'].some(k => lower.includes(k))) return 'bg-blaze/10 text-blaze border-blaze/20';
  if (['tech', 'web', 'development', 'code'].some(k => lower.includes(k))) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  return 'bg-foreground/5 text-muted-foreground border-foreground/10';
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sp, setSp] = useSearchParams();
  const category = sp.get('category') ?? '';
  const search = sp.get('q') ?? '';
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let q = supabase
        .from('blogs')
        .select('id,title,slug,excerpt,featured_image,category,tags,author,reading_time,published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (category) q = q.eq('category', category);
      if (search) q = q.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      const { data } = await q;
      setPosts((data as unknown as Post[]) ?? []);
      setLoading(false);
    })();
  }, [category, search]);

  const featuredPosts = useMemo(() => posts.slice(0, 2), [posts]);
  const regularPosts = useMemo(() => posts.slice(2), [posts]);

  const applySearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(sp);
    if (searchInput) next.set('q', searchInput); else next.delete('q');
    setSp(next);
  };
  const setCategory = (c: string) => {
    const next = new URLSearchParams(sp);
    if (c) next.set('category', c); else next.delete('category');
    setSp(next);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Blog — HydroBlaze Media</title>
        <meta name="description" content="Strategy breakdowns, creative inspiration, and technical deep-dives from the HydroBlaze team." />
        <link rel="canonical" href="https://hydro-blaze-elevate.lovable.app/blog" />
      </Helmet>
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

            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
              <form onSubmit={applySearch} className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-card/50 border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-hydro transition"
                />
              </form>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setCategory('')} className={`px-3 py-1.5 rounded-full text-xs border transition ${!category ? 'bg-hydro/10 text-hydro border-hydro/20' : 'bg-card/40 text-muted-foreground border-foreground/10 hover:text-foreground'}`}>All</button>
                {BLOG_CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs border transition ${category === c ? 'bg-hydro/10 text-hydro border-hydro/20' : 'bg-card/40 text-muted-foreground border-foreground/10 hover:text-foreground'}`}>{c}</button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="rounded-2xl bg-card/50 border border-foreground/10 overflow-hidden animate-pulse">
                    <div className="h-48 bg-foreground/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-foreground/5 rounded w-1/3" />
                      <div className="h-5 bg-foreground/5 rounded w-full" />
                      <div className="h-4 bg-foreground/5 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No posts found.</p>
              </div>
            ) : (
              <>
                {/* Featured */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {featuredPosts.map((post, index) => (
                    <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group">
                      <Link to={`/blog/${post.slug}`} className="block relative rounded-3xl bg-card/50 border border-foreground/10 backdrop-blur-sm overflow-hidden hover:border-hydro/30 transition-all duration-300 hover:-translate-y-1 h-full">
                        <span className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full text-xs bg-gradient-to-r from-hydro/20 to-blaze/20 text-foreground border border-foreground/10">Featured</span>
                        {post.featured_image ? (
                          <div className="h-56 overflow-hidden">
                            <img src={post.featured_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-56 bg-gradient-to-br from-hydro/20 to-blaze/20" />
                        )}
                        <div className="p-8">
                          {post.category && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(post.category)} mb-4`}>{post.category}</span>
                          )}
                          <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-hydro transition-colors duration-300">{post.title}</h2>
                          <p className="text-muted-foreground mb-6 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
                            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.reading_time} min</span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>

                {/* Regular */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, index) => (
                    <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group">
                      <Link to={`/blog/${post.slug}`} className="block rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm overflow-hidden hover:border-hydro/30 transition-all duration-300 hover:-translate-y-1 h-full">
                        {post.featured_image ? (
                          <div className="h-48 overflow-hidden">
                            <img src={post.featured_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-hydro/20 to-blaze/20 flex items-center justify-center">
                            <span className="text-4xl font-display font-bold text-foreground/10">HB</span>
                          </div>
                        )}
                        <div className="p-6">
                          {post.category && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(post.category)} mb-3`}>{post.category}</span>
                          )}
                          <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-hydro transition-colors duration-300 line-clamp-2">{post.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-hydro group-hover:gap-2 transition-all duration-300">
                              Read <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </>
            )}

            {/* Newsletter CTA */}
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

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Blog;
