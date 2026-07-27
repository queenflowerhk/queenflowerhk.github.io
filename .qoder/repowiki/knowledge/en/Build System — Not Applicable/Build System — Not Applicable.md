---
kind: build_system
name: Build System — Not Applicable
category: build_system
scope:
    - '**'
source_files:
    - _serve.js
---

This repository is a pure static site with no build system. It consists of plain HTML, CSS, JavaScript modules, and JSON data files served directly from the docs/ directory. There are no Makefiles, Dockerfiles, CI pipelines, package manifests (package.json), or build scripts present. The only server-side code is a minimal Node.js script (_serve.js) used for local development to serve static files on port 8080. Deployment is handled by GitHub Pages serving the docs/ folder as-is, with no compilation, bundling, or asset optimization step.