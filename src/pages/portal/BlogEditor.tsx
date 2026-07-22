import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, Send, Eye, Upload, Sparkles, X, Loader2 } from "lucide-react";
import RichEditor from "@/components/blog/RichEditor";
import { BLOG_CATEGORIES, calculateReadingTime, slugify } from "@/lib/blog";
import {
  normalizeBlogContentImageReferences,
  normalizeBlogImageReference,
  resolveBlogImageUrl,
  uploadBlogImage,
} from "@/lib/blogImages";

interface Form {
  id?: string;
  title: string; slug: string; excerpt: string; content: string;
  featured_image: string; category: string; tags: string; author: string;
  seo_title: string; seo_description: string; og_image: string;
  status: "draft" | "published"; featured: boolean; published_at: string | null;
}

const empty = (name: string): Form => ({
  title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "",
  tags: "", author: name || "", seo_title: "", seo_description: "", og_image: "",
  status: "draft", featured: false, published_at: null,
});

const AI_ACTIONS = [
  { key: "outline",       label: "Generate outline" },
  { key: "improve",       label: "Improve writing" },
  { key: "rewrite",       label: "Rewrite paragraph" },
  { key: "seo",           label: "SEO optimize" },
  { key: "meta",          label: "Generate meta title & description" },
  { key: "internal_links",label: "Suggest internal links" },
  { key: "excerpt",       label: "Write excerpt" },
] as const;
type AiKey = typeof AI_ACTIONS[number]["key"];

const BlogEditor = () => {
  const { isAdmin, loading, profile, user } = usePortalAuth();
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(empty(profile?.full_name || user?.email || ""));
  const [initialLoading, setInitialLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiBusy, setAiBusy] = useState<AiKey | null>(null);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState("");
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew || !isAdmin) return;
    (async () => {
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id!).maybeSingle();
      if (error) toast.error(error.message);
      if (data) {
        const d = data as never as Record<string, unknown>;
        setForm({
          id: String(d.id),
          title: String(d.title || ""),
          slug: String(d.slug || ""),
          excerpt: String(d.excerpt || ""),
          content: String(d.content || ""),
          featured_image: String(d.featured_image || ""),
          category: String(d.category || ""),
          tags: Array.isArray(d.tags) ? (d.tags as string[]).join(", ") : "",
          author: String(d.author || ""),
          seo_title: String(d.seo_title || ""),
          seo_description: String(d.seo_description || ""),
          og_image: String(d.og_image || ""),
          status: (d.status as "draft" | "published") || "draft",
          featured: Boolean(d.featured),
          published_at: (d.published_at as string) || null,
        });
      }
      setInitialLoading(false);
    })();
  }, [id, isNew, isAdmin]);

  useEffect(() => {
    if (!slugTouched && form.title) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugTouched]);

  useEffect(() => {
    let mounted = true;
    resolveBlogImageUrl(form.featured_image).then((url) => {
      if (mounted) setCoverPreview(url);
    });
    return () => { mounted = false; };
  }, [form.featured_image]);

  if (loading || initialLoading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isAdmin) return <Navigate to="/portal" replace />;

  const readingTime = calculateReadingTime(form.content);
  const wordCount = form.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;

  const persist = async (opts: { publish?: boolean; unpublish?: boolean } = {}) => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.slug.trim()) { toast.error("Slug is required"); return; }
    setSaving(true);
    const status = opts.publish ? "published" : opts.unpublish ? "draft" : form.status;
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt || null,
      content: normalizeBlogContentImageReferences(form.content),
      featured_image: normalizeBlogImageReference(form.featured_image) || null,
      category: form.category || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: form.author || null,
      author_id: user?.id ?? null,
      reading_time: readingTime,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      og_image: normalizeBlogImageReference(form.og_image) || null,
      status,
      featured: form.featured,
      published_at: status === "published" ? (form.published_at || new Date().toISOString()) : null,
    };

    if (isNew) {
      const { data, error } = await supabase.from("blogs").insert(payload as never).select("id").maybeSingle();
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success(opts.publish ? "Published" : "Draft saved");
      if (data?.id) navigate(`/portal/blogs/${data.id}`, { replace: true });
    } else {
      const { error } = await supabase.from("blogs").update(payload as never).eq("id", id!);
      setSaving(false);
      if (error) return toast.error(error.message);
      setForm((f) => ({ ...f, status: status as "draft" | "published", published_at: payload.published_at }));
      toast.success(opts.publish ? "Published" : opts.unpublish ? "Unpublished" : "Saved");
    }
  };

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    try {
      const imageRef = await uploadBlogImage(file, "covers");
      setForm((f) => ({ ...f, featured_image: imageRef, og_image: f.og_image || imageRef }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed");
    }
  };

  const runAi = async (action: AiKey) => {
    setAiBusy(action); setAiOutput("");
    try {
      const { data, error } = await supabase.functions.invoke("blog-ai-assistant", {
        body: {
          action,
          title: form.title,
          content: form.content,
          excerpt: form.excerpt,
          category: form.category,
          keywords: form.tags,
          prompt: aiPrompt,
        },
      });
      if (error) throw error;
      const out = (data as { result?: string })?.result ?? "";
      setAiOutput(out);
      if (action === "meta" && out) {
        // Try to parse "Title: ...\nDescription: ..."
        const t = out.match(/title[:\-]\s*(.+)/i)?.[1]?.trim();
        const d = out.match(/description[:\-]\s*([\s\S]+)/i)?.[1]?.trim();
        if (t) setForm((f) => ({ ...f, seo_title: t.slice(0, 70) }));
        if (d) setForm((f) => ({ ...f, seo_description: d.slice(0, 200) }));
      }
      if (action === "excerpt" && out) setForm((f) => ({ ...f, excerpt: out.slice(0, 240) }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "AI request failed";
      toast.error(message);
    } finally {
      setAiBusy(null);
    }
  };

  const insertAiIntoContent = () => {
    if (!aiOutput) return;
    const html = aiOutput
      .split(/\n{2,}/)
      .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
    setForm((f) => ({ ...f, content: (f.content || "") + html }));
    toast.success("Added to content");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild><Link to="/portal/blogs"><ArrowLeft className="w-4 h-4" /></Link></Button>
          <div>
            <h1 className="font-display text-2xl font-bold">{isNew ? "New blog post" : "Edit blog post"}</h1>
            <p className="text-xs text-muted-foreground">{wordCount} words · {readingTime} min read · status: <span className="capitalize">{form.status}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setAiOpen((v) => !v)}>
            <Sparkles className="w-4 h-4 mr-1" /> AI Assistant
          </Button>
          {!isNew && form.slug && (
            <Button variant="ghost" asChild>
              <Link to={`/blog/${form.slug}?preview=1`} target="_blank"><Eye className="w-4 h-4 mr-1" /> Preview</Link>
            </Button>
          )}
          <Button variant="secondary" onClick={() => persist()} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save draft</Button>
          {form.status === "published" ? (
            <Button variant="outline" onClick={() => persist({ unpublish: true })} disabled={saving}>Unpublish</Button>
          ) : (
            <Button onClick={() => persist({ publish: true })} disabled={saving}><Send className="w-4 h-4 mr-1" /> Publish</Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4 min-w-0">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Blog title"
            className="text-2xl md:text-3xl font-display font-bold h-auto py-4 px-4 border-foreground/10 bg-card/40"
          />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>/blog/</span>
            <Input value={form.slug} onChange={(e) => { setSlugTouched(true); setForm({ ...form, slug: slugify(e.target.value) }); }} placeholder="url-slug" className="h-8" />
          </div>
          <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt / summary (shown on blog listing)" rows={2} maxLength={240} className="bg-card/40" />
          <RichEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
        </div>

        <aside className="space-y-5">
          <section className="p-4 rounded-xl border border-foreground/10 bg-card/60 space-y-3">
            <h3 className="font-semibold text-sm">Featured image</h3>
            {form.featured_image ? (
              <div className="relative">
                <img src={coverPreview || form.featured_image} alt="cover" className="w-full h-40 object-cover rounded-lg" />
                <button type="button" onClick={() => setForm({ ...form, featured_image: "", og_image: form.og_image === form.featured_image ? "" : form.og_image })} className="absolute top-2 right-2 p-1 rounded-full bg-background/80 border border-foreground/10"><X className="w-3.5 h-3.5" /></button>
              </div>
            ) : (
              <button type="button" onClick={() => coverRef.current?.click()} className="w-full h-40 rounded-lg border border-dashed border-foreground/20 flex flex-col items-center justify-center text-muted-foreground hover:border-hydro hover:text-hydro transition-colors">
                <Upload className="w-5 h-5 mb-1" /> Upload cover
              </button>
            )}
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
            <Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="…or paste image URL" className="text-xs" />
          </section>

          <section className="p-4 rounded-xl border border-foreground/10 bg-card/60 space-y-3">
            <div>
              <Label className="text-xs">Category</Label>
              <Select value={form.category || "none"} onValueChange={(v) => setForm({ ...form, category: v === "none" ? "" : v })}>
                <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Uncategorized</SelectItem>
                  {BLOG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Tags (comma separated)</Label>
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="meta ads, growth, funnels" />
            </div>
            <div>
              <Label className="text-xs">Author</Label>
              <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Label htmlFor="feat" className="text-xs">Featured post</Label>
              <Switch id="feat" checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
            </div>
          </section>

          <section className="p-4 rounded-xl border border-foreground/10 bg-card/60 space-y-3">
            <h3 className="font-semibold text-sm">SEO</h3>
            <div>
              <Label className="text-xs">SEO title <span className="text-muted-foreground">({(form.seo_title || form.title).length}/60)</span></Label>
              <Input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} placeholder={form.title || "SEO title"} maxLength={70} />
            </div>
            <div>
              <Label className="text-xs">Meta description <span className="text-muted-foreground">({(form.seo_description || form.excerpt).length}/160)</span></Label>
              <Textarea value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} placeholder={form.excerpt || "Meta description"} rows={3} maxLength={200} />
            </div>
            <div>
              <Label className="text-xs">OG image URL</Label>
              <Input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} placeholder="Defaults to featured image" />
            </div>
            <p className="text-[11px] text-muted-foreground">Canonical: <span className="text-foreground">/blog/{form.slug || "your-slug"}</span></p>
          </section>
        </aside>
      </div>

      {aiOpen && (
        <div className="fixed bottom-4 right-4 w-[380px] max-h-[80vh] flex flex-col rounded-2xl border border-foreground/10 bg-card/95 backdrop-blur-xl shadow-2xl z-40">
          <div className="p-3 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-blaze" /> <span className="font-semibold text-sm">AI Blog Assistant</span></div>
            <Button variant="ghost" size="icon" onClick={() => setAiOpen(false)}><X className="w-4 h-4" /></Button>
          </div>
          <div className="p-3 space-y-2 overflow-y-auto">
            <div className="grid grid-cols-2 gap-1.5">
              {AI_ACTIONS.map((a) => (
                <Button key={a.key} variant="outline" size="sm" className="justify-start text-xs h-8" onClick={() => runAi(a.key)} disabled={aiBusy !== null}>
                  {aiBusy === a.key ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                  {a.label}
                </Button>
              ))}
            </div>
            <Textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Optional: extra instructions or keywords…" rows={2} className="text-xs" />
            <div className="rounded-lg border border-foreground/10 bg-background/50 p-3 min-h-[120px] max-h-[280px] overflow-y-auto text-sm whitespace-pre-wrap">
              {aiOutput || <span className="text-muted-foreground text-xs">Pick an action above. The assistant helps but never publishes automatically.</span>}
            </div>
            {aiOutput && (
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1" onClick={() => { navigator.clipboard.writeText(aiOutput); toast.success("Copied"); }}>Copy</Button>
                <Button size="sm" className="flex-1" onClick={insertAiIntoContent}>Insert into post</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;