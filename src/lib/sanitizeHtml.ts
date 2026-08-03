import DOMPurify from "dompurify";

/**
 * Sanitize rich-text HTML (blog content) before rendering it into the DOM.
 * Strict allowlist: no scripts, no event handlers, safe link/image protocols only.
 */
export function sanitizeRichHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "del", "mark", "small", "sub", "sup",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "pre", "code",
      "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "span", "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "width", "height", "id", "class", "colspan", "rowspan", "start", "type"],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "link", "meta"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
    ALLOW_DATA_ATTR: false,
  });
}