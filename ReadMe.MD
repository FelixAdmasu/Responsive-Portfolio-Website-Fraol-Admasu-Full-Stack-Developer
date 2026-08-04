# Fraol Admasu — IT Specialist & Full Stack Developer Portfolio

> A modern, fully responsive single-page portfolio website built with **HTML5, CSS3, and vanilla JavaScript**, enhanced with custom WebGL-powered visual effects. Designed to showcase the work, skills, and professional qualifications of **Fraol Admasu** — an IT specialist and full stack developer based in Addis Ababa, Ethiopia, with experience building production systems for government institutions.

**Live site:** [https://fraoladmasu.dev](https://fraoladmasu.dev)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections](#sections)
  - [Home / Hero](#home--hero)
  - [Skills](#skills)
  - [Qualification](#qualification)
  - [Services](#services)
  - [Projects](#projects)
  - [Testimonials](#testimonials)
  - [Contact](#contact)
  - [Map](#map)
  - [Footer](#footer)
  - [404 Page](#404-page)
- [Visual Effects — LightRays](#visual-effects--lightrays)
- [Theme System (Light / Dark)](#theme-system-light--dark)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Contact Form Configuration](#contact-form-configuration)
- [SEO & Structured Data](#seo--structured-data)
- [Performance](#performance)
- [Deployment & Server Configuration](#deployment--server-configuration)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Author](#author)

---

## Overview

This is a single-page application that presents a professional developer brand. It combines:

- **Clean, semantic HTML5** markup with structured data (`JSON-LD`) for rich search results.
- **Fully responsive layouts** powered by CSS Grid and Flexbox with 20+ tuned breakpoints.
- **Custom WebGL visual effects** — nine LightRays instances rendered via OGL, with automatic theme-aware color transitions.
- **Smooth scroll animations** powered by ScrollReveal.
- **Interactive carousels** powered by Swiper for projects and testimonials.
- **Real-time visual effects** that initialize when sections enter the viewport.

The site is completely static — no build step, no bundler, no framework — making it trivial to deploy anywhere and extremely fast to load.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Responsive design** | Mobile-first layouts optimized from 320px to 1280px+ with 20+ breakpoints |
| **Light / Dark theme** | Toggleable via header button, persists via `localStorage`, auto-detects OS preference |
| **LightRays WebGL effects** | Nine animated light-ray instances across the site, theme-aware (warm gold `#d97706` in light, bright amber `#fbbf24` in dark) |
| **Skills views** | Grid view (categorized skills with proficiency badges) and Loop view (infinite scrolling marquee) |
| **Soft skills badges** | Six skill pills with theme-aware hover effect (dark in light mode, light in dark mode) |
| **Swiper carousels** | Projects and testimonials sliders with pagination and navigation |
| **Working contact form** | AJAX-powered form with spinning loader animation, submits via [FormSubmit](https://formsubmit.co) |
| **Google Maps embed** | Contact location iframe with responsive sizing |
| **Page loader** | Animated preloader with graceful fade-out on load |
| **Read More toggle** | Expandable project descriptions with smooth transitions |
| **Scroll-to-top button** | Smooth scroll up helper, appears after scrolling |
| **SEO ready** | Open Graph, Twitter Cards, canonical URL, JSON-LD structured data with social profiles |
| **Security headers** | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, referrer policy |
| **Custom 404 page** | Branded error page consistent with the main site design |
| **PWA manifest** | `site.webmanifest` linked for mobile home screen support |
| **9 professional certifications** | Cisco, Udacity, Python, Graphic Design, and more displayed in the Qualification section |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantics, accessibility, structured data (JSON-LD) |
| **CSS3** | Styling, CSS custom properties, Grid, Flexbox, animations, media queries |
| **Vanilla JavaScript (ES6)** | Interactivity, effects, form handling, theme system |
| **OGL** | WebGL rendering library for LightRays effects (CDN, loaded via dynamic `import()`) |
| **Three.js r160** | WebGL rendering for hero particle ring (Antigravity) and footer glow rings (Magic Rings) |
| **Swiper 9** | Projects and testimonials carousels |
| **ScrollReveal** | Scroll-triggered reveal animations |
| **RemixIcon** | Icon set for UI elements |
| **Google Fonts** | Lora, Roboto, Lobster |
| **FormSubmit** | Serverless contact form backend (no server required) |

---

## Project Structure

```
.
├── index.html                  # Main portfolio page (all sections)
├── README.md                   # This documentation
├── security_readme.md          # Security hardening documentation
├── robots.txt                  # Search engine crawl rules
├── .htaccess                   # Apache server configuration
├── nginx.conf                  # Nginx server configuration
│
├── css/
│   ├── styles.css              # Main stylesheet (~3,500 lines, CSS variables)
│   └── swiper-bundle.min.css   # Swiper carousel styles
│
├── js/
│   ├── main.js                 # Core site logic (loader, nav, theme, sliders, reveals)
│   ├── lightrays.js            # Custom LightRays WebGL effect (OGL vanilla port)
│   ├── antigravity.js          # Three.js hero particle ring effect
│   ├── magicrings.js           # Three.js footer glow ring effect
│   ├── scrollreveal.min.js     # ScrollReveal library
│   └── swiper-bundle.min.js    # Swiper carousel library
│
├── img/                        # Images, SVG icons, project screenshots, video demos
│   ├── felix-adm2.png          # Hero/profile photo
│   ├── Mesob Website Thumbnail.png  # Mesob system screenshot
│   ├── favicon_io/             # Favicon files and site.webmanifest
│   └── ...                     # Other project screenshots and assets
│
├── 404/
│   └── index.html              # Custom 404 error page
│
├── documentation/              # Project documentation folder
│   ├── fraol admasu resume c1.pdf   # Official resume
│   ├── Certificate Of Collection By Fraol Admasu.pdf  # Certificate collection
│   └── Profile.pdf                  # LinkedIn profile export
│
└── .kombai/                    # Design tool metadata (safe to ignore)
```

---

## Sections

### Home / Hero
The landing section featuring:
- Animated **Antigravity particle ring** background (Three.js WebGL).
- Name, role title ("IT Specialist & Full Stack Developer"), and call-to-action buttons.
- Biography with impact statement about the Mesob system (21,000+ permits).
- Social links (GitHub, LinkedIn, Email).
- Decorative SVG shapes (wave and circle patterns).

### Skills
Two interactive views (Grid is the default):
1. **Grid View** — categorized technical skills (Frontend, Backend, Tools) with proficiency badges (Advanced / Intermediate / Basic) and progress level dots. Skill icons have a transparent background so LightRays shine through.
2. **Loop View** — an infinite horizontal scroll of skill logos with two rows scrolling in opposite directions.

**Soft Skills** — Six pill badges with theme-aware dark/light hover effect: Problem-Solving, Attention to Detail, Teamwork, Leadership, Critical Thinking, and Deadline-Oriented.

### Qualification
Two-column layout:
- **Education (right-aligned):** Diploma in Information Technology (Level V) from Addis Ababa Tegbare-id Polytechnic College (April 2022–August 2025), plus Certifications & Awards.
- **Work Experience (left-aligned):**
  - **Data Entry Specialist (Volunteer) — Mesob System Builder** at Shager City First Service Center MESOB (Dec 2025–Present) — includes the Mezgeb origin story and production system details.
  - **IT Intern** at Piya's Federal First Instance Court (Aug–Oct 2024) — web development and database administration.
  - **IT Intern (Co-operative Training)** at Lideta District Bench — Federal First Instance Court (2015–2016 E.C) — network setup, hardware/software support, database management.

### Services
Four service cards focused on client outcomes:
1. **Custom Web Applications** — Business process automation, role-based access, PDF reports, bulk data import/export
2. **Data Management** — Database design, data migration from paper/Excel, backup & recovery, performance tuning
3. **Government & Institutional Systems** — Permit & records management, interactive maps, multi-language interfaces, audit trails
4. **Web Design & Development** — Responsive design, modern aesthetics, fast loading, SEO friendly

### Projects
A Swiper carousel of seven featured projects, each with:
- Screenshot or demo video thumbnail.
- Title, short and full description with a **Read more / Read less** toggle.
- Unique project descriptions (no template filler text).
- Tech tags and live/demo links where applicable.

**Featured projects:**
1. **Mesob** — Production Laravel 12 permit management system (21,000+ permits, 3 languages, geospatial mapping)
2. **Library Management System** — Full-stack library platform with face recognition authentication
3. **The Filli Coffee** — Modern coffee shop website
4. **Modern Digital Portfolio** — Personal portfolio website (2 versions)
5. **Digital Portfolio** — Additional portfolio design
6. **Error 404** — Creative 404 page design
7. **Danob** — Restaurant website redesign

### Testimonials
A Swiper carousel of client testimonials with navigation arrows and pagination. Includes a dedicated section ID for anchor link navigation.

### Contact
- Contact information cards (email, phone, LinkedIn).
- A working **AJAX contact form** (`#contactForm`) with spinning loader animation on submit.
- Posts to FormSubmit with email delivery.

### Map
- Google Maps iframe showing location.
- Availability info (working hours, contact preferences).
- LightRays effect (top-right origin) visible in dark mode.

### Footer
- Footer navigation, social links (LinkedIn, GitHub, Email), and copyright.
- Download CV link (points to `documentation/fraol admasu resume c1.pdf`).
- **Magic Rings** WebGL glow-ring background (Three.js).

### 404 Page
A custom, on-brand error page located in `404/index.html`, styled consistently with the main site.

---

## Visual Effects — LightRays

The site uses a custom **LightRays** WebGL effect — nine independent instances placed across different sections. The effect renders animated light rays that sweep across a transparent background. Rays are visible only in dark mode (CSS `display: none` in light theme).

**File:** `js/lightrays.js` (vanilla JavaScript port of an OGL shader, loaded via dynamic `import()`)

### Ray Instances

| Section | Origin | Notes |
|---------|--------|-------|
| Skills | top-center | Primary display, visible on load |
| Skills | bottom-center | Paired with top ray for symmetry |
| Qualification (Education) | top-left | Scroll-triggered reveal |
| Qualification (Work) | bottom-right | Scroll-triggered reveal |
| Services | bottom-center | Scroll-triggered reveal |
| Testimonial | top-right | Scroll-triggered reveal |
| Contact | bottom-left | Scroll-triggered reveal |

### Shader Uniforms

| Uniform | Type | Default | Description |
|---------|------|---------|-------------|
| `iTime` | float | auto | Elapsed time (animated automatically) |
| `iResolution` | vec2 | auto | Canvas resolution (set automatically) |
| `rayPos` | vec2 | varies | Ray origin point (in pixels) |
| `rayDir` | vec2 | varies | Ray direction vector |
| `raysColor` | vec3 | theme | Ray color (from CSS `--lightrays-color`) |
| `raysSpeed` | float | 0.6 | Animation speed multiplier |
| `lightSpread` | float | 0.9 | How wide the rays spread |
| `rayLength` | float | 1.2 | Maximum ray length |
| `fadeDistance` | float | 2.0 | How far rays fade out |
| `saturation` | float | 2.0 | Color saturation |
| `mouseInfluence` | float | 0.1 | How much mouse position affects ray direction |
| `iBottom` | float | auto | Set automatically based on origin (1.0 for bottom-origin rays) |

### Performance Features

- **IntersectionObserver** initializes rays when sections enter the viewport (with 200px rootMargin for smooth transitions).
- **Adaptive DPR** caps device-pixel-ratio at 2.0 (1.5 on mobile).
- **Reduced motion** — renders a static frame when `prefers-reduced-motion: reduce` is set.
- **Dynamic theme colors** — rays automatically update color when toggling light/dark mode via `MutationObserver`.
- **Theme-aware colors** — `--lightrays-color: #d97706` (light mode) / `#fbbf24` (dark mode).

---

## Theme System (Light / Dark)

- Toggle button in the header (`#theme-button`).
- Theme is saved to `localStorage` and restored on page reload.
- On first visit, the site respects the OS-level `prefers-color-scheme`.
- Theme is applied via a `dark-theme` class on `<body>`.
- All colors are driven by **CSS custom properties** in `:root` (light) and `body.dark-theme` (dark).
- LightRays are **only visible in dark mode** (CSS `display: none` in light theme).

**Core palette:**

| Variable | Light | Dark |
|----------|-------|------|
| `--first-color` | `hsl(207, 65%, 65%)` (blue) | same |
| `--title-color` | `hsl(207, 4%, 16%)` | `hsl(207, 4%, 95%)` |
| `--body-color` | `hsl(207, 4%, 99%)` | `hsl(207, 4%, 10%)` |
| `--container-color` | `#fff` | `hsl(207, 4%, 17%)` |
| `--lightrays-color` | `#d97706` (warm gold) | `#fbbf24` (bright amber) |

---

## Getting Started

### Prerequisites
- A modern browser (Chrome, Firefox, Safari, Edge) with WebGL support.
- A local static file server is **recommended** — `<script type="module">` is blocked on `file://` in most browsers.

### Running Locally

**Option 1 — VS Code Live Server**
1. Open the project folder in VS Code.
2. Install the *Live Server* extension.
3. Right-click `index.html` → **Open with Live Server**.

**Option 2 — Python**
```bash
python -m http.server 5500
```
Then open `http://localhost:5500`.

**Option 3 — Node.js**
```bash
npx serve .
```
Then open the printed local URL.

**Option 4 — PHP built-in server**
```bash
php -S localhost:5500
```

---

## Customization Guide

### Content & Personal Info
Edit `index.html` to update:
- **Title / description** → `<head>` meta tags.
- **Hero name & intro** → Home section.
- **Skills** → Skills section grid cards and marquee items.
- **Education / Work Experience** → Qualification section.
- **Services** → Services section cards.
- **Projects** → Projects slider (update `src` for screenshots/videos in `img/`).
- **Testimonials** → Testimonials slider.
- **Contact details / email** → Contact section + `mailto:` links.
- **Social links** → Home and Footer social lists.
- **Structured data** → `application/ld+json` script in `<head>`.

### Colors & Styling
All colors, fonts, and spacing live in CSS custom properties at the top of `css/styles.css`. Change the accent color site-wide by editing just `--first-color`:

```css
:root {
  --first-color: hsl(207, 65%, 65%); /* <-- site accent */
}
```

### LightRays Effect Tuning
Each instance is configured via `data-*` attributes on the container div:

```html
<div class="light-rays-container"
     data-rays-origin="top-center"
     data-rays-speed="0.6"
     data-light-spread="0.9"
     data-ray-length="1.2"
     data-follow-mouse="true"
     data-mouse-influence="0.1"
     data-noise-amount="0.1"
     data-distortion="0.05"
     data-fade-distance="2"
     data-saturation="2"
     aria-hidden="true">
</div>
```

---

## Contact Form Configuration

The form (`#contactForm` in the Contact section) uses **[FormSubmit](https://formsubmit.co)** — no backend required.

- Form posts to: `https://formsubmit.co/ajax/fadm94202@gmail.com`
- Submission is handled via AJAX in the inline `<script>` near the bottom of `index.html`.
- **Spinning loader animation** on the submit button during sending.
- **To change the receiving email:** replace `fadm94202@gmail.com` in:
  1. The form `action` URL.
  2. The `fetch()` URL in the inline script.
  3. The email contact card (`mailto:` link).

> After changing the target email, visit [formsubmit.co](https://formsubmit.co) with the new address to confirm the first submission.

---

## SEO & Structured Data

The site ships with production-ready SEO metadata:

- Meta title: "Fraol Admasu | IT Specialist & Full Stack Developer"
- Meta description, keywords, author.
- Open Graph (Facebook) and Twitter Card tags.
- Canonical URL → `https://fraoladmasu.dev`.
- `robots.txt` for crawl guidance.
- `site.webmanifest` for PWA support.
- **JSON-LD** `Person` structured data including:
  - Name, job title ("IT Specialist | Full-Stack Developer & Database Administrator | Cybersecurity Enthusiast | Microsoft Tools | Visual Content Designer"), description, URL, image.
  - `knowsAbout`: Web Development, Full Stack Development, Database Administration, Cybersecurity, Responsive Design, UI/UX Design, Geospatial Mapping, HTML5, CSS3, JavaScript, React, PHP, Laravel, MySQL, Python, Node.js.
  - Social profiles (GitHub, LinkedIn).
  - `sameAs` links for search engine association.

To add analytics (e.g., GA4, Plausible), paste the script just before `</body>` in `index.html`.

---

## Performance

- **No build step / no framework** → zero compile-time overhead, instant page loads.
- **CDN-hosted libraries** (OGL, Three.js, RemixIcons, Google Fonts, Swiper) → better caching and delivery.
- **DNS prefetch** hints for CDNs and fonts in `<head>`.
- **IntersectionObserver** initializes LightRays when sections enter the viewport (200px rootMargin for smooth transitions).
- **Adaptive DPR** caps device-pixel-ratio at 2.0 (1.5 on mobile) for GPU-heavy WebGL rendering.
- **Reduced motion support** — all WebGL effects render a static frame when `prefers-reduced-motion: reduce` is set.
- **Lazy video loading** — videos in the Projects section pause when off-screen and play when in view.
- **CSS containment** — scoped styles prevent layout thrashing across sections.

---

## Deployment & Server Configuration

Deploy the project as a **static site** (Netlify, Vercel, GitHub Pages, cPanel, VPS, etc.). Upload the entire project root — no build step required.

### Apache (.htaccess)
`/.htaccess` ships with hardening and caching rules:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Static asset caching with `expires` headers and cache-control.
- Custom 404 handling.

### Nginx (nginx.conf)
`/nginx.conf` provides the equivalent configuration for Nginx hosts:
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Static file caching with `expires` directives.
- Gzip compression for text-based assets.

---

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`).
- `aria-label` on icon-only controls (nav toggle, social links, scroll-up button).
- `aria-hidden="true"` on decorative graphics and WebGL effect containers.
- `alt` text on meaningful images.
- Visible focus states and keyboard-friendly navigation.
- Supports `prefers-reduced-motion` — WebGL effects render statically.
- Color contrast meets WCAG AA standards for both light and dark themes.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome / Edge (latest) | Full |
| Firefox (latest) | Full |
| Safari (latest) | Full |
| Mobile browsers | Full (optimized layouts, reduced particle counts) |

> WebGL effects require a browser with WebGL support (universal on modern devices). All effects include graceful fallbacks if WebGL is unavailable — the rest of the site remains fully functional.

---

## Security

- Security headers applied via meta tags, `.htaccess`, and `nginx.conf`.
- `noopener noreferrer` on all external links.
- Contact form uses HTTPS POST (FormSubmit) with no credentials stored client-side.
- Honeypot field (`_honey`) for spam prevention.
- Referrer policy restricts outgoing referrer data.
- See **`security_readme.md`** for the full security hardening documentation.

---

## Troubleshooting

| Symptom | Likely Fix |
|---------|-----------|
| LightRays not visible | Rays only appear in dark mode; toggle theme. Ensure WebGL is enabled; hard-refresh (Ctrl+Shift+R) |
| LightRays delayed on view switch | Normal — rays initialize via IntersectionObserver with 200px rootMargin |
| Contact form not sending | Confirm the FormSubmit email activation; check browser console for fetch errors |
| Theme resets on reload | Enable `localStorage` in browser settings |
| Styling looks broken | Confirm `css/styles.css` is loading (no blocked CDN) |
| Effects jittery / low FPS | Disable browser GPU acceleration, or check if `prefers-reduced-motion` is interfering |
| Favicon not showing | Verify `img/favicon_io/` folder exists with all favicon files |
| Skills grid rays not visible | Rays show through transparent skill icons; ensure dark mode is active |

---

## License

All rights reserved. This is a personal portfolio site. You may reference it for learning purposes, but please do not redistribute or resell the content, images, or branding without explicit permission.

---

## Author

**Fraol Admasu** — IT Specialist | Full-Stack Developer & Database Administrator | Cybersecurity Enthusiast | Microsoft Tools | Visual Content Designer

- **Website:** [https://fraoladmasu.dev](https://fraoladmasu.dev)
- **Email:** [fadm94202@gmail.com](mailto:fadm94202@gmail.com)
- **GitHub:** [github.com/FraolAdmasu](https://github.com/FraolAdmasu)
- **LinkedIn:** [linkedin.com/in/fraol-admasu](https://www.linkedin.com/in/fraol-admasu/)

---

*Documentation generated for the Responsive Portfolio Website project.*
