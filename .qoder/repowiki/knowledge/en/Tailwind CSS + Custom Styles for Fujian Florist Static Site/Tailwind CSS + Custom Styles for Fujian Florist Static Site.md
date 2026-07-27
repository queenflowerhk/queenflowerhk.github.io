---
kind: frontend_style
name: Tailwind CSS + Custom Styles for Fujian Florist Static Site
category: frontend_style
scope:
    - '**'
source_files:
    - docs/index.html
    - docs/css/styles.css
---

The Fujian Florist static site uses a hybrid styling approach combining Tailwind CSS (via CDN) with a small custom stylesheet for animations, transitions, and component-specific overrides.

**System & Tools:**
- Tailwind CSS loaded via CDN (`https://cdn.tailwindcss.com`) with an inline `tailwind.config` that extends the theme with custom fonts (`Noto Serif TC`, `Playfair Display`, `Noto Sans TC`, `Inter`) and a gold color palette (`gold.50`–`gold.900`).
- Font Awesome 6.4.0 for icons.
- Google Fonts for typography loading.
- A single custom stylesheet (`docs/css/styles.css`) for animations, keyframes, and UI micro-interactions not covered by utility classes.

**Architecture & Conventions:**
- All layout and structural styling is done inline with Tailwind utility classes directly in `index.html`. There are no separate component CSS files — the HTML is the primary source of truth for visual presentation.
- Custom CSS is reserved exclusively for: page-level font families, CSS keyframe animations (`float`, `fadeIn`, `slideInRight`, `lightboxZoomIn`), transition effects on product cards, cart sidebar, category pills, quantity buttons, language toggles, scroll behavior, scrollbar theming, ribbon badges, hero gradient backgrounds, and lightbox overlay.
- The design system centers on a warm amber/gold palette (`#b45309` as the primary accent) paired with stone/neutral tones (`stone-50`, `stone-100`, `gray-800/900`) to convey a respectful, traditional aesthetic appropriate for both celebratory and funeral flower services.
- Responsive design follows Tailwind's mobile-first breakpoint convention (`sm:`, `md:`, `lg:`) applied throughout the markup.
- Internationalization is handled via `data-i18n` attributes on text nodes; styling does not vary by language except for font-family selection based on `[lang="en"]` selectors.

**Key Files:**
- `docs/index.html` — Single-page HTML with all Tailwind utilities inline and embedded Tailwind config.
- `docs/css/styles.css` — Custom styles for animations, transitions, and visual polish.
- `docs/js/components.js`, `products.js`, `cart.js`, `translations.js`, `main.js` — JavaScript modules that manipulate DOM classes (e.g., `active`, `hidden`) but do not inject styles.

**Developer Rules:**
- Use Tailwind utility classes for all layout, spacing, colors, typography, and responsive behavior — avoid writing new CSS rules unless they involve animations or complex transitions.
- Keep custom CSS in `docs/css/styles.css`; do not add inline `<style>` blocks in HTML.
- Follow the established gold/amber accent color scheme (`gold.700` = `#b45309`) and stone neutral palette already defined in the Tailwind config and custom CSS.
- When adding new interactive components, prefer class-based state management (toggling `active`, `hidden`, etc.) consistent with existing patterns rather than dynamic style injection.