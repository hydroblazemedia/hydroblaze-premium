import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { usePortalAuth } from "@/portal/PortalAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Search, Edit3, Trash2, Eye, Copy, Send, Undo2, Star } from "lucide-react";
import { BLOG_CATEGORIES, formatDate, slugify } from "@/lib/blog";

interface Blog {
  id: string;
  title: string; slug: string; excerpt: string | null; category: string | null;
  status: string; featured: boolean; published_at: string | null;
  updated_at: string; author: string | null; reading_time: number;
}

const statusBadge = (s: string) =>
  s === "published" ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
  : "bg-foreground/5 text-muted-foreground border-foreground/10";

const BlogsList = () => {
  const { isAdmin, loading } = usePortalAuth();
  const [rows, setRows] = useState<Blog[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("blogs").select("id,title,slug,excerpt,category,status,featured,published_at,updated_at,author,reading_time").order("updated_at", { ascending: false });
    if (error) return toast.error(error.message);
    setRows((data as Blog[]) ?? []);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const filtered = useMemo(() => rows.filter((r) => {
    if (status !== "all" && r.status !== status) return false;
    if (category !== "all" && r.category !== category) return false;
    if (q) {
      const t = q.toLowerCase();
      if (!r.title.toLowerCase().includes(t) && !(r.excerpt || "").toLowerCase().includes(t)) return false;
    }
    return true;
  }), [rows, q, status, category]);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!isAdmin) return <Navigate to="/portal" replace />;

  const togglePublish = async (r: Blog) => {
    setBusy(true);
    const next = r.status === "published" ? "draft" : "published";
    const patch: Record<string, unknown> = { status: next };
    if (next === "published" && !r.published_at) patch.published_at = new Date().toISOString();
    const { error } = await supabase.from("blogs").update(patch).eq("id", r.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(next === "published" ? "Published" : "Unpublished");
    load();
  };

  const toggleFeatured = async (r: Blog) => {
    const { error } = await supabase.from("blogs").update({ featured: !r.featured }).eq("id", r.id);
    if (error) return toast.error(error.message);
    load();
  };

  const duplicate = async (r: Blog) => {
    const { data: full } = await supabase.from("blogs").select("*").eq("id", r.id).maybeSingle();
    if (!full) return;
    const base = slugify(full.title + "-copy");
    let slug = base; let n = 2;
    while ((await supabase.from("blogs").select("id").eq("slug", slug).maybeSingle()).data) { slug = `${base}-${n++}`; }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, created_at, updated_at, published_at, ...rest } = full as never;
    const { error } = await supabase.from("blogs").insert({ ...rest, title: full.title + " (Copy)", slug, status: "draft", featured: false, published_at: null });
    if (error) return toast.error(error.message);
    toast.success("Duplicated");
    load();
  };

  const remove = async (r: Blog) => {
    if (!confirm(`Delete "${r.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blogs").delete().eq("id", r.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-bold">Blogs</h1>
          <p className="text-sm text-muted-foreground mt-1">{rows.length} total · {rows.filter(r => r.status === "published").length} published</p>
        </div>
        <Button asChild><Link to="/portal/blogs/new"><Plus className="w-4 h-4 mr-1" /> New blog</Link></Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-xl border border-foreground/10 bg-card/60">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search title or excerpt…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {BLOG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground border border-dashed border-foreground/10 rounded-xl">
            No blogs match. <Link to="/portal/blogs/new" className="text-hydro underline underline-offset-2">Create your first post</Link>.
          </div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="p-4 rounded-xl border border-foreground/10 bg-card/60 flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/portal/blogs/${r.id}`} className="font-medium hover:text-hydro transition-colors">{r.title || "Untitled"}</Link>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${statusBadge(r.status)}`}>{r.status}</span>
                {r.featured && <span className="text-[10px] px-2 py-0.5 rounded-full border bg-blaze/15 text-blaze border-blaze/30">Featured</span>}
                {r.category && <span className="text-[10px] px-2 py-0.5 rounded-full border bg-foreground/5 text-muted-foreground border-foreground/10">{r.category}</span>}
              </div>
              <div className="text-xs text-muted-foreground mt-1 truncate">
                /{r.slug} · {r.reading_time} min read · updated {formatDate(r.updated_at)}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" title={r.featured ? "Unfeature" : "Feature"} onClick={() => toggleFeatured(r)}>
                <Star className={`w-4 h-4 ${r.featured ? "fill-blaze text-blaze" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" title="Preview" asChild>
                <Link to={`/blog/${r.slug}?preview=1`} target="_blank"><Eye className="w-4 h-4" /></Link>
              </Button>
              <Button variant="ghost" size="icon" title="Edit" asChild>
                <Link to={`/portal/blogs/${r.id}`}><Edit3 className="w-4 h-4" /></Link>
              </Button>
              <Button variant="ghost" size="icon" title={r.status === "published" ? "Unpublish" : "Publish"} onClick={() => togglePublish(r)} disabled={busy}>
                {r.status === "published" ? <Undo2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" title="Duplicate" onClick={() => duplicate(r)}><Copy className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" title="Delete" onClick={() => remove(r)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsList;