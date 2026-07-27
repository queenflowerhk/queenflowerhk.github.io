---
kind: configuration_system
name: Static Site Configuration (JSON-driven Content)
category: configuration_system
scope:
    - '**'
source_files:
    - docs/products.json
    - docs/translations.json
    - docs/js/products.js
    - docs/js/translations.js
    - _serve.js
---

This repository is a static website for Fujian Florist with no traditional application configuration system. Instead, runtime content and localization are managed through JSON data files at the root of the `docs/` directory:

- `products.json` — product catalog data consumed by `js/products.js`
- `translations.json` — localized strings consumed by `js/translations.js`
- `CNAME` — GitHub Pages domain configuration
- `.nojekyll` — Jekyll build directive for GitHub Pages

There is no centralized config loader, environment variable handling, feature flags, or secrets management. The site is purely static: HTML pages reference JS modules that read from these JSON files at runtime. A minimal `_serve.js` file exists at the repo root but appears to be a local development server helper rather than a configuration manager.

Developers should treat the JSON files as the single source of truth for site content and translations. There are no validation schemas, default value layers, or environment-specific overrides — changes to products or translations require direct edits to these files.