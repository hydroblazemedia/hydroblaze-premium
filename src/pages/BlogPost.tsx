import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Calendar, Clock, ArrowLeft, ArrowRight, Twitter, Linkedin, Facebook, Link2, User } from "lucide-react";
import { extractHeadings, formatDate, injectHeadingIds } from "@/lib/blog";
import { toast } from "sonner";

interface Blog {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  featured_image: string | null; category: string | null; tags: string[] | null;
  author: string | null; reading_time: number; status: string; published_at: string | null;
  seo_title: string | null; seo_description: string | null; og_image: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sp] = useSearchParams();
  const preview = sp.get("preview") === "1";
  const [post, setPost] = useState<Blog | null>(null);
  const [prev, setPrev] = useState<{ slug: string; title: string } | null>(null);
  const [next, setNext] = useState<{ slug: string; title: string } | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true); setNotFound(false);
      let q = supabase.from("blogs").select("*").eq("slug", slug);
      if (!preview) q = q.eq("status", "published");
      const { data } = await q.maybeSingle();
      if (!data) { setNotFound(true); setLoading(false); return; }
      const b = data as unknown as Blog;
      setPost(b);

      const { data: prevData } = await supabase.from("blogs").select("slug,title,published_at").eq("status", "published").lt("published_at", b.published_at || new Date().toISOString()).order("published_at", { ascending: false }).limit(1).maybeSingle();
      setPrev(prevData ? { slug: (prevData as never as Blog).slug, title: (prevData as never as Blog).title } : null);
      const { data: nextData } = await supabase.from("blogs").select("slug,title,published_at").eq("status", "published").gt("published_at", b.published_at || new Date().toISOString()).order("published_at", { ascending: true }).limit(1).maybeSingle();
      setNext(nextData ? { slug: (nextData as never as Blog).slug, title: (nextData as never as Blog).title } : null);

      if (b.category) {
        const { data: rel } = await supabase.from("blogs").select("id,title,slug,excerpt,featured_image,category,reading_time,published_at,author").eq("status", "published").eq("category", b.category).neq("id", b.id).order("published_at", { ascending: false }).limit(3);
        setRelated((rel as unknown as Blog[]) ?? []);
      }
      setLoading(false);
    })();
  }, [slug, preview]);

  const contentWithIds = useMemo(() => post ? injectHeadingIds(post.content) : "", [post]);
  const headings = useMemo(() => post ? extractHeadings(post.content) : [], [post]);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const share = (net: "twitter" | "linkedin" | "facebook" | "copy") => {
    if (!post) return;
    const text = encodeURIComponent(post.title);
    const u = encodeURIComponent(url);
    if (net === "twitter") window.open(`https://twitter.com/intent/tweet?text=${text}&url=${u}`, "_blank");
    else if (net === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`, "_blank");
    else if (net === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank");
    else { navigator.clipboard.writeText(url); toast.success("Link copied"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (notFound || !post) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="text-hydro underline underline-offset-2">Back to blog</Link>
    </div>
  );

  const seoTitle = post.seo_title || `${post.title} — HydroBlaze Media`;
  const seoDesc = post.seo_description || post.excerpt || "";
  const ogImage = post.og_image || post.featured_image || "";
  const canonical = `https://hydroblazemedia.com/blog/${post.slug}`;
  const ld = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: seoDesc, image: ogImage || undefined,
    author: { "@type": "Person", name: post.author || "HydroBlaze Media" },
    datePublished: post.published_at, url: canonical,
    publisher: { "@type": "Organization", name: "HydroBlaze Media" },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Helmet>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pt-24">
        {preview && post.status !== "published" && (
          <div className="max-w-4xl mx-auto px-6 md:px-12 mb-4">
            <div className="rounded-xl border border-blaze/30 bg-blaze/10 text-blaze px-4 py-2 text-sm">Preview mode — this post is a draft and is not publicly visible.</div>
          </div>
        )}
        <article className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-hydro transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
            {post.category && (
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="inline-block px-3 py-1 rounded-full text-xs bg-hydro/10 text-hydro border border-hydro/20 mb-4">{post.category}</Link>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
            {post.excerpt && <p className="text-lg md:text-xl text-muted-foreground mb-6">{post.excerpt}</p>}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {post.author && <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>}
              {post.published_at && <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <time dateTime={post.published_at}>{formatDate(post.published_at)}</time></span>}
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.reading_time} min read</span>
            </div>
          </motion.header>

          {post.featured_image && (
            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} src={post.featured_image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-3xl mb-12" loading="eager" />
          )}

          <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0">
              <div className="prose prose-lg max-w-none blog-content" dangerouslySetInnerHTML={{ __html: contentWithIds }} />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs bg-foreground/5 border border-foreground/10 text-muted-foreground">#{t}</span>
                  ))}
                </div>
              )}

              <div className="mt-10 flex items-center gap-3 pt-6 border-t border-foreground/10">
                <span className="text-sm text-muted-foreground">Share:</span>
                <button onClick={() => share("twitter")} className="p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
                <button onClick={() => share("linkedin")} className="p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
                <button onClick={() => share("facebook")} className="p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></button>
                <button onClick={() => share("copy")} className="p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Copy link"><Link2 className="w-4 h-4" /></button>
              </div>
            </div>

            {headings.length > 1 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28 p-4 rounded-xl border border-foreground/10 bg-card/40">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">On this page</div>
                  <ul className="space-y-1.5">
                    {headings.map((h) => (
                      <li key={h.id} style={{ paddingLeft: (h.level - 1) * 10 }}>
                        <a href={`#${h.id}`} className="text-sm text-muted-foreground hover:text-hydro transition-colors block truncate">{h.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="p-5 rounded-2xl border border-foreground/10 bg-card/40 hover:border-hydro/30 transition-colors group">
                <div className="text-xs text-muted-foreground mb-1">← Previous</div>
                <div className="font-medium group-hover:text-hydro transition-colors line-clamp-2">{prev.title}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="p-5 rounded-2xl border border-foreground/10 bg-card/40 hover:border-hydro/30 transition-colors group sm:text-right">
                <div className="text-xs text-muted-foreground mb-1">Next →</div>
                <div className="font-medium group-hover:text-hydro transition-colors line-clamp-2">{next.title}</div>
              </Link>
            ) : <div />}
          </div>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-display text-2xl font-bold mb-6">Related articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group block rounded-2xl bg-card/50 border border-foreground/10 overflow-hidden hover:border-hydro/30 transition-all hover:-translate-y-1">
                    {r.featured_image ? (
                      <img src={r.featured_image} alt={r.title} loading="lazy" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-hydro/20 to-blaze/20" />
                    )}
                    <div className="p-4">
                      <h3 className="font-display font-semibold line-clamp-2 mb-1 group-hover:text-hydro transition-colors">{r.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default BlogPost;