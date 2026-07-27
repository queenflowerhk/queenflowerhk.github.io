---
kind: logging_system
name: No Logging System — Bare console.log Only
category: logging_system
scope:
    - '**'
source_files:
    - _serve.js
---

This repository does not implement a logging system. The entire codebase is a static website for Fujian Florist built with vanilla JavaScript modules (main.js, components.js, cart.js, products.js, translations.js) and contains no logging framework, structured logging, log-level management, or centralized logger. The only logging present is a single `console.log('Server running on http://localhost:8080')` in the local development server file `_serve.js`. All other modules use silent error handling (e.g., try/catch around localStorage parsing in cart.js) and user-facing feedback via toast notifications rather than any form of application logging. There are no dedicated log files, log sinks, log rotation, or debugging utilities anywhere in the project.