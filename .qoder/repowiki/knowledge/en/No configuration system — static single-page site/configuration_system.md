This repository does not implement a configuration system. It is a pure static single-page marketing and ordering site served directly from GitHub Pages, with all runtime data and settings embedded inline:

- Product catalog is hard-coded in `docs/products.json`.
- UI text strings are hard-coded in `docs/translations.json`.
- Tailwind CSS theme customization is inlined as `tailwind.config = { ... }` inside `docs/index.html`.
- No `.env`, `config.*`, `application.properties`, YAML/TOML manifests, or environment-variable loading logic exists anywhere in the repo.
- There is no build step, bundler, or server-side runtime that could resolve configuration at deploy time.

Consequently, changing any site behavior (products, labels, colors) requires editing the source files directly and pushing to the `main` branch.