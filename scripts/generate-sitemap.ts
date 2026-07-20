// Generates public/sitemap.xml from static routes + published blog slugs.
// Runs before dev and build via predev/prebuild hooks.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://hydroblazemedia.com";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://xtdemrqoeraogjwwfses.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const staticEntries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
];

// Static portfolio slugs (kept in sync with src/components/PortfolioSection.tsx)
const portfolioSlugs = ["cultfit-rajajinagar", "blr-kabab", "aayara", "aqua-splash", "amsc"];

async function fetchBlogEntries(): Promise<Entry[]> {
  if (!SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blogs?select=slug,updated_at,published_at&status=eq.published`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string; updated_at?: string; published_at?: string }[];
    return rows.map((r) => ({
      path: `/blog/${r.slug}`,
      lastmod: (r.updated_at || r.published_at || "").slice(0, 10) || undefined,
      changefreq: "monthly",
      priority: "0.7",
    }));
  } catch {
    return [];
  }
}

function toXml(entries: Entry[]) {
  const urls = entries
    .map((e) =>
      [
        "  <url>",
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

(async () => {
  const blog = await fetchBlogEntries();
  const portfolio: Entry[] = portfolioSlugs.map((s) => ({
    path: `/portfolio/${s}`,
    changefreq: "monthly",
    priority: "0.8",
  }));
  const all = [...staticEntries, ...portfolio, ...blog];
  writeFileSync(resolve("public/sitemap.xml"), toXml(all));
  console.log(`sitemap.xml written (${all.length} entries)`);
})();