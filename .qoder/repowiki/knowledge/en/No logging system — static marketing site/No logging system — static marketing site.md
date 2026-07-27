---
kind: logging_system
name: No logging system — static marketing site
category: logging_system
scope:
    - '**'
source_files:
    - _serve.js
---

This repository is a static single-page marketing and ordering site served directly from the `docs/` directory on GitHub Pages. It contains no logging framework, no structured logger, no log-level management, and no centralized logging infrastructure.

The only console output in the entire codebase is a single `console.log('Server running on http://localhost:8080')` inside `_serve.js`, which is used solely for the local development HTTP server and is not part of any runtime application logging strategy. The five client-side modules (`main.js`, `cart.js`, `products.js`, `components.js`, `translations.js`) contain zero logging calls — they rely on DOM manipulation, `localStorage`, and direct function returns instead of emitting logs.