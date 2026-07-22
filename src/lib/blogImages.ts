import { getOptionalSupabase } from "@/lib/optionalSupabase";

const BLOG_IMAGE_BUCKET = "blog-images";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

const signedUrlCache = new Map<string, { url: string; expiresAt: number }>();

export const createBlogImageRef = (path: string) => `${BLOG_IMAGE_BUCKET}/${path.replace(/^\/+/, "")}`;

export const extractBlogImagePath = (value?: string | null): string | null => {
  const raw = value?.trim();
  if (!raw || raw.startsWith("data:")) return null;

  const directPrefix = `${BLOG_IMAGE_BUCKET}/`;
  if (raw.startsWith(directPrefix)) return raw.slice(directPrefix.length).split(/[?#]/)[0] || null;
  if (/^(covers|content)\//.test(raw)) return raw.split(/[?#]/)[0] || null;

  try {
    const url = new URL(raw);
    const pathname = decodeURIComponent(url.pathname);
    const publicNeedle = `/storage/v1/object/public/${BLOG_IMAGE_BUCKET}/`;
    const signedNeedle = `/storage/v1/object/sign/${BLOG_IMAGE_BUCKET}/`;
    const publicIndex = pathname.indexOf(publicNeedle);
    const signedIndex = pathname.indexOf(signedNeedle);

    if (publicIndex >= 0) return pathname.slice(publicIndex + publicNeedle.length) || null;
    if (signedIndex >= 0) return pathname.slice(signedIndex + signedNeedle.length) || null;
  } catch {
    const publicNeedle = `/storage/v1/object/public/${BLOG_IMAGE_BUCKET}/`;
    const signedNeedle = `/storage/v1/object/sign/${BLOG_IMAGE_BUCKET}/`;
    const publicIndex = raw.indexOf(publicNeedle);
    const signedIndex = raw.indexOf(signedNeedle);

    if (publicIndex >= 0) return raw.slice(publicIndex + publicNeedle.length).split(/[?#]/)[0] || null;
    if (signedIndex >= 0) return raw.slice(signedIndex + signedNeedle.length).split(/[?#]/)[0] || null;
  }

  return null;
};

export const normalizeBlogImageReference = (value?: string | null) => {
  const raw = value?.trim() ?? "";
  const path = extractBlogImagePath(raw);
  return path ? createBlogImageRef(path) : raw;
};

export const resolveBlogImageUrl = async (value?: string | null) => {
  const raw = value?.trim() ?? "";
  if (!raw) return "";

  const path = extractBlogImagePath(raw);
  if (!path) return raw;

  const cached = signedUrlCache.get(path);
  if (cached && cached.expiresAt > Date.now()) return cached.url;

  const supabase = await getOptionalSupabase();
  if (!supabase) return raw;

  const { data, error } = await supabase.storage
    .from(BLOG_IMAGE_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);

  if (error || !data?.signedUrl) return raw;

  signedUrlCache.set(path, {
    url: data.signedUrl,
    expiresAt: Date.now() + (SIGNED_URL_TTL_SECONDS - 60) * 1000,
  });

  return data.signedUrl;
};

export const uploadBlogImage = async (file: File, folder: "covers" | "content") => {
  const supabase = await getOptionalSupabase();
  if (!supabase) throw new Error("Backend storage is not configured.");

  const extension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const { error } = await supabase.storage.from(BLOG_IMAGE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) throw new Error(error.message);
  return createBlogImageRef(path);
};

const imageSrcPattern = /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi;

export const normalizeBlogContentImageReferences = (html: string) =>
  html.replace(imageSrcPattern, (_match, before: string, src: string, after: string) => {
    return `${before}${normalizeBlogImageReference(src)}${after}`;
  });

export const resolveBlogContentImages = async (html: string) => {
  const sources = Array.from(html.matchAll(imageSrcPattern)).map((match) => match[2]);
  if (sources.length === 0) return html;

  const replacements = new Map<string, string>();
  await Promise.all(
    Array.from(new Set(sources)).map(async (src) => {
      replacements.set(src, await resolveBlogImageUrl(src));
    }),
  );

  return html.replace(imageSrcPattern, (_match, before: string, src: string, after: string) => {
    return `${before}${replacements.get(src) ?? src}${after}`;
  });
};