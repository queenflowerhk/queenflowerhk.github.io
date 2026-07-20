The Fujian Florist site uses a utility-first CSS approach built on Tailwind CSS, loaded via CDN (cdn.tailwindcss.com) directly in docs/index.html. There is no build step — styles are applied inline as HTML class strings throughout the single-page template.

Design tokens and theme:
- A custom gold color palette (50-900) is defined in the inline tailwind.config, centered around amber/gold tones (#b45309 as primary).
- Font families are extended: serif defaults to Noto Serif TC / Playfair Display; sans defaults to Noto Sans TC / Inter.
- The body background is bg-stone-50 with text-gray-800, giving a warm, muted base.

Custom CSS layer:
A small stylesheet at docs/css/styles.css supplements Tailwind with brand typography overrides for headings vs body text per language, animation keyframes (float, fadeIn, slideInRight), component-specific classes (.product-card, .cart-slide, .category-pill, .ribbon, .hero-bg), scrollbar theming, and smooth scrolling.

Iconography and assets:
Icons come from Font Awesome 6.4 via CDN. Product/hero images are hotlinked from Unsplash with no local image asset pipeline.

Responsive strategy:
Fully responsive using Tailwind breakpoint prefixes (sm:, md:, lg:) for grid layouts, navigation collapse, and spacing. No media-query-based CSS.

What is not present:
No SCSS/Sass, PostCSS, or CSS-in-JS setup. No design-token files beyond the inline Tailwind config. No component library — this is vanilla HTML + JS. No CSS architecture methodology beyond simple class names.

Conventions developers should follow:
1. Prefer Tailwind utilities over adding new CSS rules in styles.css; keep custom CSS reserved for animations and cross-cutting effects.
2. Use the gold-* palette for brand colors instead of ad-hoc hex values.
3. Keep font-family choices consistent: serif for headings, sans for body; respect [lang="en"] overrides.
4. Animate sparingly using existing keyframe classes rather than defining new ones.
5. Responsive first: use Tailwind breakpoints rather than writing custom media queries.