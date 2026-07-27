---
kind: error_handling
name: Minimal Client-Side Error Handling in a Static Site
category: error_handling
scope:
    - '**'
source_files:
    - docs/js/cart.js
    - docs/js/products.js
    - docs/js/translations.js
    - docs/js/components.js
    - _serve.js
---

This static site uses a very lightweight, pragmatic approach to error handling with no centralized error types, middleware, or framework-level error management. Errors are handled locally where they occur:

- **localStorage operations** (`docs/js/cart.js`): The `_load()` function wraps `JSON.parse(localStorage.getItem(...))` in a try/catch block and returns an empty array on failure, treating corrupted storage as a non-fatal condition.
- **Network fetch calls** (`docs/js/products.js`, `docs/js/translations.js`): Both `Products.load()` and `Translations.load()` use unhandled `fetch()` + `res.json()` chains with no `.catch()` handlers — network failures will propagate as uncaught rejections that crash the module initialization but do not crash the entire page.
- **DOM safety checks**: Functions defensively check for element existence before manipulating the DOM (e.g., `if (!toast || !toastMessage) return;` in `Components.showToast`).
- **User feedback via toast notifications**: Success feedback is shown through `Components.showToast()`, but there is no equivalent error notification mechanism — errors are silently ignored rather than surfaced to users.
- **Development server** (`_serve.js`): Returns plain text "Not found" with a 404 status code for missing files.

There are no custom error classes, sentinel values, error codes, panic/recover patterns, or global error handlers. The site prioritizes graceful degradation over explicit error reporting: if translations fail to load, the UI falls back to key names; if products fail to load, the product grids remain empty.