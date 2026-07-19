export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 220));
}

export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  if (typeof window === "undefined") return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(doc.querySelectorAll("h1, h2, h3, h4"));
  return nodes.map((n) => {
    const text = n.textContent?.trim() ?? "";
    const id = slugify(text) || Math.random().toString(36).slice(2, 8);
    return { id, text, level: Number(n.tagName.replace("H", "")) };
  });
}

export function injectHeadingIds(html: string): string {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("h1, h2, h3, h4").forEach((n) => {
    const id = slugify(n.textContent ?? "");
    if (id) n.setAttribute("id", id);
  });
  return doc.body.innerHTML;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const BLOG_CATEGORIES = [
  "Strategy",
  "Marketing",
  "Growth",
  "SEO",
  "Creative",
  "Design",
  "Content",
  "Social Media",
  "Web",
  "Case Study",
  "News",
];