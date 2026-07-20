import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/blog';

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  featured_image: string | null;
  published_at: string | null;
  category: string | null;
  reading_time: number;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('blogs')
      .select('id,title,excerpt,slug,featured_image,published_at,category,reading_time')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setPosts((data as unknown as Post[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 relative" aria-label="Blog">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-hydro/10 text-hydro border border-hydro/20 mb-6">
            Blog
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Insights & <span className="text-gradient">Growth Strategies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Strategy breakdowns, creative inspiration, and actionable insights from the HydroBlaze team.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
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
          <div className="text-center py-16 text-muted-foreground">No published blogs yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block rounded-2xl bg-card/50 border border-foreground/10 backdrop-blur-sm overflow-hidden hover:border-hydro/30 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-hydro/20 to-blaze/20 flex items-center justify-center relative">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        loading="lazy"
                        width={640}
                        height={192}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <span className="absolute text-4xl font-display font-bold text-foreground/10 -z-0">HB</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
                      <span>· {post.reading_time} min read</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-hydro transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-hydro group-hover:gap-2.5 transition-all duration-300">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-hydro to-blaze text-white hover:shadow-[0_0_30px_hsl(var(--hydro)/0.4)] transition-all duration-300"
          >
            View All Blogs <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
