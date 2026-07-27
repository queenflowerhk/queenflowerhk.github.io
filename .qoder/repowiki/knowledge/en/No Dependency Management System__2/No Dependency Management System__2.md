---
kind: dependency_management
name: No Dependency Management System
category: dependency_management
scope:
    - '**'
source_files:
    - docs/index.html
    - _serve.js
---

This repository is a static website for Fujian Florist with no dependency management system in place. There are no package manager files (package.json, go.mod, requirements.txt, etc.), no lockfiles, and no vendoring strategy. All third-party dependencies are loaded directly via CDN links in the HTML file: Tailwind CSS from cdn.tailwindcss.com, Google Fonts from fonts.googleapis.com, and Font Awesome from cdnjs.cloudflare.com. The only Node.js code is a simple local development server (_serve.js) that uses only built-in Node.js modules (http, fs, path). Dependencies are managed informally by updating CDN URLs directly in docs/index.html when needed, with no version pinning or update tracking mechanism.