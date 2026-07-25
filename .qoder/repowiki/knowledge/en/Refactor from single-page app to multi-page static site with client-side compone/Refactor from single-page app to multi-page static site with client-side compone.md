---
kind: design
name: Refactor from single-page app to multi-page static site with client-side component injection
source: session
category: adr
---

# Refactor from single-page app to multi-page static site with client-side component injection

_Source: coding plans from commit period 13f4928 → 7b75df9 — records intent at planning time; the implementation may lag or differ._

**Status:** accepted

## Context
The original site was a single-page application with inline HTML, CSS, and JavaScript. The codebase needed reorganization for maintainability, SEO friendliness, and clearer separation of concerns across multiple distinct pages (landing, products, cart, about).

## Decision drivers
- SEO-friendly URLs per page
- Separation of shared vs page-specific markup
- Client-side data loading over server rendering
- No build toolchain or framework dependency

## Considered options
- **Multi-page static site with fetch-injected components** — pros: Simple static hosting, no build step, each page is independently indexable, shared nav/footer via JS injection; cons: Initial load requires extra HTTP requests for components, no SSR benefits
- **Single-page app with client-side routing** _(rejected)_ — pros: Faster navigation after initial load, one HTML shell; cons: Poor SEO without prerendering, harder to share links to specific sections, more complex state management
- **Server-side template engine (Jekyll/11ty)** _(rejected)_ — pros: True server rendering, better performance, built-in includes; cons: Requires build pipeline, adds deployment complexity, overkill for this small site

## Decision
Adopt a multi-page static site where each .html file is self-contained but loads shared components (nav, footer, cart sidebar, toast, WhatsApp button) via `components.js` which fetches HTML snippets from `docs/components/`. Product data lives in `products.json`, translations in `translations.json`, and Tailwind CDN remains inline.

## Consequences
Each page makes additional network requests on first load for components and data files, but gains independent page indexing, simpler caching, and clear separation between shared layout and page content. Cart state persists via localStorage key `fujianFloristCart` across all pages. No build toolchain is required — the site can be served directly from any static host.