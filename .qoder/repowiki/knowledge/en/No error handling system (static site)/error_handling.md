This repository is a static single-page marketing and ordering site served directly from GitHub Pages. It contains no centralized error-handling framework, custom error types, sentinel errors, middleware, or logging infrastructure. Error handling is minimal and ad-hoc:

- `_serve.js` (local dev server): the only place where an `err` argument is checked; on failure it writes a 404 response with a plain text body.
- `docs/js/cart.js`: wraps `localStorage.getItem` + `JSON.parse` in a try/catch that silently returns an empty cart when storage is corrupted — no user-facing message.
- `docs/js/products.js`, `docs/js/translations.js`: use `fetch(...).json()` without any `.catch()` or error branch, so network failures are unhandled.
- All other modules (`main.js`, `components.js`) perform DOM mutations and assume elements exist; missing nodes are ignored via early `return` rather than surfaced as errors.

There are no `throw` statements, no custom Error subclasses, no global error handler, and no logging calls anywhere in the codebase. The site's architecture (pure client-side JS reading local JSON files) makes runtime errors rare and non-fatal by design.