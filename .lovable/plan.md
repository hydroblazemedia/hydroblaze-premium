## Goal
Add premium AI-generated imagery to two home-page sections: the Hero and the "How We Work" (Hydro Strategy / Blaze Creative) cards.

## What to build

### 1. Hero visual
Convert the current centered text hero into a two-column layout on `lg+` (stacked on mobile):
- Left: existing badge, headline, subtitle, CTAs (unchanged copy/animations)
- Right: a floating "device stack" visual — a tilted dashboard/phone mockup composed of an AI-generated image, wrapped in the existing glass card treatment (rounded-2xl, border, backdrop-blur), with hydro/blaze ambient glow orbs behind it
- Keep the scroll-parallax and opacity fade on the whole block
- Preserve mobile: image stacks below CTAs, scaled down

### 2. How We Work section
Give each of the two methodology cards (Hydro Strategy, Blaze Creative) a visual header image at the top of the card:
- Hydro Strategy: abstract blueprint / data-grid visual in cyan-blue tones
- Blaze Creative: abstract content/creative visual in orange-red tones
- Image sits in a `rounded-xl` frame above the icon, ~16:10 aspect, with subtle inner border and gradient tint overlay to blend with the card

## Assets to generate
Using the agent-side `generate_image` tool (premium quality, saved to `src/assets/` as `.asset.json` pointers):

1. `hero-dashboard.png` — dark premium analytics dashboard mockup with cyan and orange accent charts, glassmorphic UI, floating on transparent-friendly dark bg
2. `hydro-strategy.png` — abstract blueprint grid with data nodes and flow lines, cyan/blue palette, minimal dark bg
3. `blaze-creative.png` — abstract collage of content shapes (reels frames, spark bursts), orange/red palette, minimal dark bg

All images will look correct in both light and dark themes (dark backgrounds framed inside cards work in both — matches the pattern already used in PortfolioSection).

## Files to change

- `src/components/Hero.tsx` — restructure to two-column grid, add image column
- `src/components/PagePreviewSection.tsx` — add image header to each of the two "How We Work" cards
- `src/assets/hero-dashboard.png.asset.json` (new, via `lovable-assets`)
- `src/assets/hydro-strategy.png.asset.json` (new)
- `src/assets/blaze-creative.png.asset.json` (new)

## Out of scope
- No changes to "What We Do" cards, Results, Why Us, or Final CTA sections
- No new sections, no featured-work strip
- No copy changes
