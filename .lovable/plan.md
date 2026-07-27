## Plan: Premium 404 Page Redesign

### Current State
- `src/pages/NotFound.tsx` exists and is wired as the catch-all route (`path="*"`) in `src/App.tsx`.
- The current page is bare: plain "404" text, "Oops! Page not found", and a basic link on a muted background.
- `public/404.html` handles the GitHub Pages SPA fallback redirect.
- SEO is already covered with `noindex` and a `Page Not Found` title via the `Seo` component.

### Goal
Redesign the 404 page to feel like a polished HydroBlaze experience — dark cinematic, glassmorphism, ambient gradients, and helpful next steps — while keeping the SPA fallback intact.

### What I Will Build

1. **Visual redesign of `src/pages/NotFound.tsx`**
   - Apply the existing dark background with subtle ambient orbs / gradient tints.
   - Use a frosted-glass card container (`backdrop-blur-xl`, `bg-card/70`, border ring).
   - Display a large, stylized "404" using the brand gradient (Hydro cyan → Blaze orange).
   - Add a friendly, on-brand message: "Lost in the digital wilderness? Let's get you back on track."
   - Include a primary CTA button: "Back to Home".
   - Add a secondary row of quick links: Services, Portfolio, About, Contact, Blog.

2. **Light-mode consistency**
   - Ensure the card background, text contrast, and gradients work in both themes using the existing semantic tokens.
   - Avoid hardcoded colors; use `primary`, `foreground`, `muted-foreground`, `card`, `border` tokens.

3. **Keep SEO and fallback intact**
   - Preserve `noindex` and `Seo` title/description.
   - Leave `public/404.html` unchanged so GitHub Pages SPA fallback still works.

4. **Verification**
   - Check the page renders at `/nonexistent-route` in both dark and light modes.
   - Verify the home link and quick navigation links work correctly.
   - Confirm no console errors or broken imports.

### Files to Modify
- `src/pages/NotFound.tsx`

### Files to Leave Unchanged
- `public/404.html`
- `src/App.tsx`
- `src/lib/seo.tsx`

Let me know if you'd like me to add an animated element (e.g., a slow-pulsing orb or a floating hydro/flame icon) or keep it static.