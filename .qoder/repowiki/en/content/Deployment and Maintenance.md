# Deployment and Maintenance

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [index.html](file://docs/index.html)
- [CNAME](file://docs/CNAME)
</cite>

## Update Summary
**Changes Made**
- Added comprehensive custom domain configuration section for CNAME setup
- Updated GitHub Pages deployment configuration to include branded domain setup
- Enhanced troubleshooting guide with custom domain-specific issues
- Added practical examples for domain management and DNS configuration

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document provides end-to-end deployment and maintenance guidance for a single-page, single-file website hosted on GitHub Pages with custom domain configuration. The site is implemented as one HTML file with embedded CSS and JavaScript, using Tailwind CSS via CDN and external fonts and icons. It includes product catalogs, a shopping cart UI, language switching (Traditional Chinese and English), and WhatsApp-based checkout.

The goal is to help maintainers:
- Deploy and update the site on GitHub Pages with custom domain support
- Configure and manage CNAME files for branded domains
- Update products and images safely
- Monitor and optimize performance
- Back up and version-control the monolithic HTML file
- Test across browsers and devices
- Troubleshoot common deployment issues including domain-related problems
- Plan for future evolution beyond a single-page architecture

[No sources needed since this section summarizes without analyzing specific files]

## Project Structure
The repository contains:
- docs/index.html: The entire site (HTML structure, styles, scripts, product data, translations, and client-side logic)
- docs/CNAME: Custom domain configuration file pointing to fujianflorist.com
- README.md: Minimal project readme

```mermaid
graph TB
A["Repository Root"] --> B["docs/"]
B --> C["index.html"]
B --> D["CNAME"]
B --> E["css/styles.css"]
B --> F["js/"]
B --> G["images/"]
A --> H["README.md"]
D --> I["fujianflorist.com"]
```

**Diagram sources**
- [index.html:1-20](file://docs/index.html#L1-L20)
- [CNAME:1-1](file://docs/CNAME#L1-L1)
- [README.md:1-1](file://README.md#L1-L1)

**Section sources**
- [README.md:1-1](file://README.md#L1-L1)
- [index.html:1-20](file://docs/index.html#L1-L20)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

## Core Components
- Single-file application: All content, styling, and behavior are contained within docs/index.html.
- Custom domain configuration: CNAME file enables branded domain access via fujianflorist.com
- External dependencies loaded at runtime:
  - Tailwind CSS via CDN
  - Google Fonts (Playfair Display, Inter, Noto Serif TC, Noto Sans TC)
  - Font Awesome 6.4.0 via CDN
- Client-side features:
  - Product catalog rendering by category
  - Shopping cart state management in memory
  - Language switching between Traditional Chinese and English
  - WhatsApp-based checkout link generation
  - Mobile menu toggle and sticky header shadow on scroll

Key implementation anchors:
- Head and CDN links: [index.html:1-20](file://docs/index.html#L1-L20)
- Tailwind configuration object: [index.html:13-38](file://docs/index.html#L13-L38)
- Translations dictionary and language switcher: [index.html:882-1075](file://docs/index.html#L882-L1075), [index.html:1353-1374](file://docs/index.html#L1353-L1374)
- Product arrays and render functions: [index.html:1079-1328](file://docs/index.html#L1079-L1328), [index.html:1406-1444](file://docs/index.html#L1406-L1444)
- Cart operations and WhatsApp checkout link: [index.html:1446-1553](file://docs/index.html#L1446-L1553)
- UI interactions (cart sidebar, mobile menu, toast): [index.html:1555-1585](file://docs/index.html#L1555-L1585)

**Section sources**
- [index.html:1-20](file://docs/index.html#L1-L20)
- [index.html:13-38](file://docs/index.html#L13-L38)
- [index.html:882-1075](file://docs/index.html#L882-L1075)
- [index.html:1353-1374](file://docs/index.html#L1353-L1374)
- [index.html:1079-1328](file://docs/index.html#L1079-L1328)
- [index.html:1406-1444](file://docs/index.html#L1406-L1444)
- [index.html:1446-1553](file://docs/index.html#L1446-L1553)
- [index.html:1555-1585](file://docs/index.html#L1555-L1585)

## Architecture Overview
High-level flow with custom domain support:
- Browser loads docs/index.html from GitHub Pages via custom domain fujianflorist.com
- CNAME file maps the branded domain to GitHub Pages infrastructure
- Tailwind CSS and fonts/icons are fetched from CDNs
- DOMContentLoaded triggers rendering of all product sections and initial language set to Traditional Chinese
- User interactions update the in-memory cart and generate a WhatsApp message link for checkout

```mermaid
sequenceDiagram
participant U as "User"
participant CF as "DNS Provider"
participant GH as "GitHub Pages"
participant H as "index.html"
participant CDN as "CDN Services"
participant WA as "WhatsApp"
U->>CF : Resolve fujianflorist.com
CF-->>U : CNAME record points to GitHub Pages
U->>GH : GET fujianflorist.com/docs/index.html
GH-->>U : 200 OK (HTML)
U->>CDN : Load Tailwind CSS, Fonts, Icons
U->>H : Execute script (DOMContentLoaded)
H->>H : Render product grids and set language
U->>H : Add item to cart
H->>H : Update cart state and UI
U->>H : Click Checkout
H->>WA : Open wa.me link with encoded order text
```

**Diagram sources**
- [CNAME:1-1](file://docs/CNAME#L1-L1)
- [index.html:1332-1351](file://docs/index.html#L1332-L1351)
- [index.html:1446-1553](file://docs/index.html#L1446-L1553)
- [index.html:1478-1494](file://docs/index.html#L1478-L1494)

**Section sources**
- [CNAME:1-1](file://docs/CNAME#L1-L1)
- [index.html:1332-1351](file://docs/index.html#L1332-L1351)
- [index.html:1446-1553](file://docs/index.html#L1446-L1553)
- [index.html:1478-1494](file://docs/index.html#L1478-L1494)

## Detailed Component Analysis

### GitHub Pages Deployment Configuration with Custom Domain
- Repository name pattern: queenflowerhk.github.io indicates user/organization pages; GitHub Pages serves the root of the default branch automatically.
- Content location: docs/index.html is served at https://queenflowerhk.github.io/docs/index.html or accessible via custom domain.
- **Custom Domain Configuration**: The CNAME file in docs/ directory contains "fujianflorist.com", enabling branded domain access.
- No build step required; static HTML is deployed directly.

Operational notes:
- Ensure the default branch is main or master (as configured in your repo).
- The CNAME file must be placed in the root of the published content (docs/ folder in this case).
- DNS records must point to GitHub Pages IP addresses (185.199.108.153, 185.199.109.153, etc.).
- If you move index.html to the repository root, adjust any relative references accordingly.
- There are no CI workflows or build artifacts in this repository.

**Updated** Added custom domain configuration via CNAME file for branded domain access.

**Section sources**
- [README.md:1-1](file://README.md#L1-L1)
- [index.html:1-20](file://docs/index.html#L1-L20)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

### Custom Domain Setup and Management
The site now supports both the default GitHub Pages URL and the branded domain fujianflorist.com through CNAME configuration.

Domain configuration workflow:
1. Create CNAME file in docs/ directory with your custom domain
2. Configure DNS records at your domain registrar to point to GitHub Pages
3. Wait for DNS propagation (typically 24-48 hours)
4. Verify HTTPS certificate provisioning by GitHub Pages

DNS requirements:
- A records pointing to GitHub Pages IP addresses
- CNAME record for www subdomain (optional)
- Proper SSL/TLS certificate handling by GitHub Pages

**New Section** Added comprehensive custom domain setup and management information.

**Section sources**
- [CNAME:1-1](file://docs/CNAME#L1-L1)

### Content Update Workflows (Products and Images)
- Products are defined as JavaScript arrays near the top of the script block. Each product has id, names, price, category, image URL, and descriptions.
- Rendering functions map these arrays into grid containers by category.
- To add/update/remove products:
  - Edit the relevant array (ceremonial, funeral, wreath, opening, association, graduation, pets).
  - Ensure unique ids per category scope.
  - Update prices and descriptions in both languages where applicable.
  - Save and commit changes to trigger GitHub Pages rebuild.

Image handling:
- Images are referenced by absolute URLs (e.g., Unsplash). For production reliability:
  - Host images under a stable path in the repository (e.g., assets/images/) and reference them relatively.
  - Optimize images before committing (resize, compress, use modern formats like WebP when appropriate).

Language updates:
- The translations object holds keys used across the page. When adding new strings, add entries for both zh and en, then ensure elements have matching data-i18n attributes.

**Section sources**
- [index.html:1079-1328](file://docs/index.html#L1079-L1328)
- [index.html:1406-1444](file://docs/index.html#L1406-L1444)
- [index.html:882-1075](file://docs/index.html#L882-L1075)

### Performance Monitoring and Optimization Techniques
Observability:
- Use browser DevTools Network and Performance panels to measure load times, waterfall, and interactivity.
- Track Largest Contentful Paint (LCP), First Input Delay (FID)/Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) via Chrome UX Report or Lighthouse.

Optimization opportunities:
- Reduce payload size:
  - Replace large hero/background images with optimized versions or SVGs where possible.
  - Limit number of high-resolution images; consider lazy loading below-the-fold images.
- Improve font loading:
  - Preconnect to fonts.googleapis.com and cdnjs.cloudflare.com.
  - Subset fonts or limit weights to reduce download size.
- Minimize layout shifts:
  - Set explicit width/height on images to prevent reflow.
  - Reserve space for dynamic content such as product cards.
- Defer non-critical JS:
  - Move heavy initialization after first paint or defer execution until after critical resources load.
- Cache strategy:
  - Configure cache headers for static assets if migrating to a custom domain with server control.
- **Custom domain considerations**: 
  - Monitor SSL certificate renewal and HTTPS redirect performance.
  - Use CDN caching policies for optimal global delivery.

[No sources needed since this section provides general guidance]

### Backup Strategies for the Single-File Architecture
- Local backups:
  - Keep a local copy of docs/index.html and any asset directories.
  - Export the current live page as a snapshot for audit purposes.
- Versioned backups:
  - Tag releases in Git (e.g., v1.0.0) to mark stable deployments.
  - Maintain a changelog describing content and feature changes.
- Offsite copies:
  - Mirror the repository to another Git provider or archive it periodically.
- Rollback plan:
  - Revert to the last known-good commit if an update breaks functionality.
- **Domain backup**:
  - Document DNS configuration settings and registrar details.
  - Keep backup of CNAME file and any custom domain configurations.

[No sources needed since this section provides general guidance]

### Version Control Best Practices for the Monolithic HTML File
- Branching model:
  - Create feature branches for major updates (e.g., feature/new-products, fix/cart-ui).
  - Merge via pull requests with code review.
- Commit hygiene:
  - Atomic commits with descriptive messages (e.g., “Add graduation products and translations”).
  - Avoid mixing unrelated changes in a single commit.
- Code organization within the single file:
  - Group related logic (data, rendering, event handlers) with clear comments and consistent indentation.
  - Keep translation keys centralized and avoid duplication.
- Release tags:
  - Tag each production-ready state to simplify rollbacks and audits.
- **Domain configuration tracking**:
  - Treat CNAME file changes as significant deployments requiring verification.
  - Document domain ownership and DNS provider details in repository documentation.

[No sources needed since this section provides general guidance]

### Testing Procedures Across Different Browsers and Devices
- Cross-browser testing:
  - Validate on latest Chrome, Safari, Firefox, Edge.
  - Check mobile Safari and Android Chrome for responsive behavior.
- Device matrix:
  - Test on phones (iOS and Android), tablets, and desktops.
- Feature checks:
  - Language switching toggles correctly and persists during session.
  - Cart adds/removes items, updates totals, and generates correct WhatsApp link.
  - Mobile menu opens/closes and overlays work.
- Accessibility:
  - Verify keyboard navigation and screen reader announcements for key actions.
- Visual regression:
  - Capture screenshots across breakpoints to detect unintended layout shifts.
- **Custom domain testing**:
  - Verify both default GitHub Pages URL and custom domain accessibility.
  - Test HTTPS certificate validity and redirect behavior.
  - Check mixed content warnings when accessing via custom domain.

[No sources needed since this section provides general guidance]

### Troubleshooting Common Deployment Issues
- Site not updating:
  - Confirm the change was pushed to the default branch and that GitHub Pages is enabled.
  - Clear browser cache or hard refresh.
- Missing styles or fonts:
  - Ensure CDN links are reachable and not blocked by corporate proxies.
  - Prefer preconnect hints for faster resource loading.
- Images not loading:
  - Verify image URLs are accessible and CORS-friendly if cross-origin.
  - Prefer hosting images within the repository for reliability.
- Cart or language not working:
  - Check console for JavaScript errors.
  - Ensure data-i18n attributes match keys in the translations object.
- WhatsApp link formatting:
  - Confirm phone number format and message encoding.
- **Custom domain issues**:
  - CNAME file not recognized: Ensure it's in the correct location (docs/ folder).
  - DNS propagation delays: Wait 24-48 hours for DNS changes to propagate globally.
  - HTTPS certificate errors: GitHub Pages automatically provisions certificates; allow time for issuance.
  - Mixed content warnings: Ensure all resources are loaded via HTTPS when accessing custom domain.
  - Redirect loops: Verify proper HTTP to HTTPS redirects are configured.

**Updated** Added custom domain-specific troubleshooting scenarios and solutions.

**Section sources**
- [index.html:1332-1351](file://docs/index.html#L1332-L1351)
- [index.html:1478-1494](file://docs/index.html#L1478-L1494)
- [index.html:882-1075](file://docs/index.html#L882-L1075)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

## Dependency Analysis
External dependencies and their roles:
- Tailwind CSS (CDN): Utility-first styling framework applied via classes throughout the markup.
- Google Fonts: Typography assets for headings and body text.
- Font Awesome: Iconography used in navigation, buttons, and UI elements.

Runtime behavior:
- Tailwind config is injected inline to extend theme tokens (fonts and colors).
- Scripts run after DOMContentLoaded to render product grids and initialize language.

```mermaid
graph TB
subgraph "Browser"
HTML["index.html"]
TS["Tailwind CSS (CDN)"]
FT["Google Fonts (CDN)"]
FA["Font Awesome (CDN)"]
end
subgraph "Domain Layer"
CNAME["CNAME File"]
DNS["DNS Records"]
SSL["HTTPS Certificate"]
end
HTML --> TS
HTML --> FT
HTML --> FA
CNAME --> DNS
DNS --> SSL
SSL --> HTML
```

**Diagram sources**
- [index.html:1-20](file://docs/index.html#L1-L20)
- [index.html:13-38](file://docs/index.html#L13-L38)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

**Section sources**
- [index.html:1-20](file://docs/index.html#L1-L20)
- [index.html:13-38](file://docs/index.html#L13-L38)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

## Performance Considerations
- Bundle size:
  - The single HTML file includes substantial inline CSS and JS. Consider splitting concerns if the site grows significantly.
- Image optimization:
  - Compress and serve next-gen formats; implement responsive images with srcset where feasible.
- Critical rendering path:
  - Inline only critical CSS; defer non-critical styles and scripts.
- Caching:
  - Leverage browser caching for static assets; consider a CDN for global distribution.
- Metrics-driven iteration:
  - Regularly run Lighthouse audits and track improvements over time.
- **Custom domain performance**:
  - Monitor DNS resolution times and optimize DNS provider settings.
  - Utilize GitHub Pages' built-in CDN for global content delivery.
  - Implement proper cache headers for static assets when using custom domains.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common symptoms and resolutions:
- Styles appear unstyled initially:
  - Tailwind CDN may take time to compile; ensure network connectivity and allow time for processing.
- Fonts not loading:
  - Check DNS and firewall rules; add preconnect hints to speed up font resolution.
- Cart total incorrect:
  - Verify arithmetic in cart update functions and ensure quantities are integers.
- Language not switching:
  - Confirm data-i18n attributes exist and keys are present in both language dictionaries.
- WhatsApp link malformed:
  - Ensure proper URL encoding and valid phone number format.
- **Custom domain specific issues**:
  - Domain not resolving: Check DNS propagation status and verify CNAME records at domain registrar.
  - HTTPS certificate errors: Allow time for automatic certificate provisioning; check certificate validity.
  - Mixed content warnings: Ensure all external resources use HTTPS protocol.
  - Redirect loops: Verify proper HTTP to HTTPS redirect configuration.
  - Slow DNS resolution: Consider using a reliable DNS provider with global Anycast networks.

**Updated** Added comprehensive custom domain troubleshooting scenarios.

**Section sources**
- [index.html:1353-1374](file://docs/index.html#L1353-L1374)
- [index.html:1496-1553](file://docs/index.html#L1496-L1553)
- [index.html:1478-1494](file://docs/index.html#L1478-L1494)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

## Conclusion
This single-file site is straightforward to deploy and maintain on GitHub Pages with the added benefit of custom domain support through CNAME configuration. By following disciplined version control, careful content updates, proactive performance tuning, and robust testing practices, you can keep the site reliable and fast. The custom domain setup provides professional branding while maintaining the simplicity of GitHub Pages hosting. As business needs grow, consider evolving toward a modular architecture with separate assets, a build pipeline, and a CMS-backed content workflow while preserving the simplicity of the current deployment model.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Practical Examples for Routine Tasks
- Update a product price:
  - Locate the product entry in the relevant array and edit the price field.
  - Commit and push; verify the updated price renders correctly.
- Add a new product:
  - Insert a new object into the appropriate array with a unique id and bilingual descriptions.
  - Ensure the category matches the corresponding render function's target grid.
- Change brand color:
  - Adjust the Tailwind theme extension colors object and update class usages consistently.
- Add a new language:
  - Extend the translations object with a new locale key and update the language switcher to include the new option.
- **Manage custom domain**:
  - Update CNAME file with new domain name.
  - Configure DNS records at domain registrar.
  - Monitor DNS propagation and HTTPS certificate status.
  - Test both default and custom domain URLs.

**Updated** Added custom domain management tasks.

**Section sources**
- [index.html:1079-1328](file://docs/index.html#L1079-L1328)
- [index.html:13-38](file://docs/index.html#L13-L38)
- [index.html:882-1075](file://docs/index.html#L882-L1075)
- [CNAME:1-1](file://docs/CNAME#L1-L1)

### Scalability Considerations and Migration Strategy
When the site outgrows a single-file approach:
- Modularization:
  - Split HTML into templates, extract CSS into a build pipeline, and isolate JS modules.
- Asset management:
  - Centralize images and fonts; use a CDN and cache-busting strategies.
- Content management:
  - Introduce a headless CMS or JSON data files to decouple content from code.
- Build and CI:
  - Adopt a static site generator or bundler with automated tests and previews.
- Analytics and monitoring:
  - Integrate privacy-compliant analytics and error tracking.
- SEO and accessibility:
  - Implement structured data, meta tags, and semantic markup improvements.
- **Domain and hosting scalability**:
  - Consider dedicated hosting solutions for higher traffic volumes.
  - Implement advanced caching strategies and CDN configurations.
  - Plan for multi-region deployment if serving global audiences.

[No sources needed since this section provides general guidance]

### Custom Domain Configuration Reference
For quick reference, here are the essential steps for managing the custom domain configuration:

1. **CNAME File Location**: docs/CNAME
2. **Current Domain**: fujianflorist.com
3. **Default URL**: https://queenflowerhk.github.io/docs/index.html
4. **Branded URL**: https://fujianflorist.com

DNS Requirements:
- A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- CNAME for www: fujianflorist.com → username.github.io
- HTTPS: Automatically provisioned by GitHub Pages

**New Section** Added comprehensive custom domain configuration reference.

**Section sources**
- [CNAME:1-1](file://docs/CNAME#L1-L1)