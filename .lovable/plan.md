## Problem

Your site is hosted on GitHub Pages (via `.github/workflows/pages.yml`). GitHub Pages serves static files only — it has no SPA fallback. When someone visits `/portal/login` directly (or refreshes on any client-side route), GitHub returns its own 404 page instead of `index.html`, so React Router never gets a chance to render.

This affects every non-root route: `/portal/login`, `/portal`, `/services`, `/pricing`, `/about`, `/blog`, `/portfolio`, `/portal/accept-invite`, etc.

Note: Lovable's own hosting handles SPA routing automatically. This issue is specific to the GitHub Pages deployment.

## Fix

Use the standard GitHub Pages SPA workaround (spa-github-pages technique):

1. **Add `public/404.html`** — a small HTML file GitHub serves on any unknown path. It captures the requested path, encodes it into a query string, and redirects to `/` (which serves `index.html`).

2. **Add a redirect script snippet in `index.html` `<head>`** — runs before React mounts, decodes the query string back into a real path, and calls `history.replaceState` so React Router sees the original URL (e.g. `/portal/login`).

3. **Ensure `.nojekyll`** — add `public/.nojekyll` so GitHub Pages doesn't run Jekyll (which can hide files starting with `_` and interfere with Vite output).

No changes to router config, routes, or portal code. `BrowserRouter` stays as-is.

## Files

- `public/404.html` — new (SPA redirect page)
- `public/.nojekyll` — new (empty file)
- `index.html` — edit `<head>` to add the ~10-line decode script before the module script

## Verification

After the next GitHub Actions deploy completes, visit `/portal/login` directly on the Pages URL and confirm the login page renders instead of the GitHub 404.
