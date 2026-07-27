---
kind: design
name: Refactor to multi-page static site with client-side component injection
source: session
category: adr
---

# Refactor to multi-page static site with client-side component injection

_Source: coding plans from commit period 25cf306 → 40d4138 — records intent at planning time; the implementation may lag or differ._

**Status:** accepted

## Context
The existing single-page application needed restructuring into a multi-page static site hosted on GitHub Pages, requiring shared components (nav, footer, cart sidebar, toast, WhatsApp button) and data (products, translations) to be decoupled from individual pages.

## Decision drivers
- GitHub Pages compatibility
- component reusability across pages
- separation of concerns between HTML structure and JS logic
- client-side rendering for dynamic content

## Considered options
- **Client-side component injection via fetch()** — pros: No build step required, works with static hosting, easy to maintain shared components as separate HTML files
- **Server-side template engine (e.g., Nunjucks)** _(rejected)_ — pros: Cleaner HTML in templates, better SEO; cons: Requires build step or server processing, incompatible with pure static hosting
- **Single-page app with hash routing** _(rejected)_ — pros: Faster navigation, no page reloads; cons: Complex state management, harder SEO, not suitable for simple brochure site

## Decision
Adopt a multi-page static site architecture where each HTML page loads shared components via JavaScript fetch() calls at runtime. Products are stored in products.json and rendered client-side, while translations live in translations.json with a data-i18n attribute system. Cart state persists via localStorage key 'fujianFloristCart'.

## Consequences
Each page is independently deployable and cacheable. Component updates propagate automatically across all pages. No build toolchain needed — just plain HTML/CSS/JS served by GitHub Pages. Trade-off: initial page load includes multiple HTTP requests for components, but this is acceptable for the small component sizes involved.