<div align="left">

# Fraol Admasu — IT Specialist & Full Stack Developer Portfolio

#### A production-grade, single-page portfolio built with vanilla HTML/CSS/JS and custom WebGL visual effects

</div>

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#tech-stack) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#tech-stack) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#tech-stack) [![OGL](https://img.shields.io/badge/OGL-WebGL-6B3FA0?style=for-the-badge&logo=webgl&logoColor=white)](#tech-stack) [![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](#tech-stack)

**Live Site:** [https://fraoladmasu.dev](https://fraoladmasu.dev) | **Repository:** [GitHub](https://github.com/FelixAdmasu/Responsive-Portfolio-Website-Fraol-Admasu-Full-Stack-Developer)

---

*A modern, fully responsive portfolio website showcasing the work, skills, and professional qualifications of **Fraol Admasu** — an IT specialist and full stack developer based in Addis Ababa, Ethiopia, with experience building production systems for government institutions.*

</div>

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections](#sections)
- [Visual Effects System](#visual-effects-system)
  - [LightRays WebGL](#lightrays-webgl)
  - [Antigravity Hero Ring](#antigravity-hero-ring)
  - [Magic Rings Footer](#magic-rings-footer)
- [Theme System](#theme-system)
- [Responsive Design](#responsive-design)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Performance](#performance)
- [Security](#security)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │  Skills  │  │  Qualif. │  │ Services │       │
│  │  (Hero)  │  │ (Grid/   │  │ (Edu +   │  │ (4 cards)│       │
│  │          │  │  Loop)   │  │  Work)   │  │          │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │              │              │              │             │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐       │
│  │ Projects │  │ Testimnl │  │   Map    │  │ Contact  │       │
│  │ (Swiper) │  │ (Swiper) │  │ (Google) │  │ (Form)   │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       └──────────────┴──────────────┴──────────────┘             │
│                         │                                        │
│  ┌──────────────────────┴──────────────────────┐                │
│  │                   Footer                     │                │
│  │          (Magic Rings WebGL Effect)          │                │
│  └─────────────────────────────────────────────┘                │
├─────────────────────────────────────────────────────────────────┤
│                     JavaScript Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ main.js  │  │lightrays │  │antigravity│  │magicrings│       │
│  │ (Core)   │  │   .js    │  │   .js    │  │   .js    │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│                      External CDN Libraries                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   OGL    │  │ Three.js │  │  Swiper  │  │ScrollRev.│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

**Design Principles:**

- **Zero build step** — no bundler, no transpiler, no framework. Pure static files.
- **Progressive enhancement** — core content works without JavaScript; WebGL effects are additive.
- **CSS custom properties** — entire color system driven by variables for instant theme switching.
- **Component-based HTML** — each section is self-contained with its own effects and animations.

---

## Key Features

| Category | Feature | Implementation |
|----------|---------|----------------|
| **Visual** | LightRays WebGL (11 instances) | OGL shader, IntersectionObserver, theme-aware |
| **Visual** | Antigravity hero ring | Three.js particle system |
| **Visual** | Astronaut float animation | CSS `@keyframes float`, subtle up/down hover |
| **Visual** | Magic Rings footer | Three.js glow ring geometry |
| **Theme** | Light/Dark mode toggle | CSS variables + `localStorage` persistence |
| **Theme** | OS preference detection | `prefers-color-scheme` media query |
| **Skills** | Grid view (categorized) | CSS Grid, proficiency badges, hover popups |
| **Skills** | Loop view (marquee) | CSS `@keyframes`, dual-row infinite scroll |
| **Skills** | Soft skills pills | Theme-aware hover effect |
| **Carousel** | Projects slider | Swiper.js with pagination |
| **Carousel** | Testimonials slider | Swiper.js with navigation |
| **Form** | AJAX contact form | FormSubmit.co, honeypot spam prevention |
| **Form** | Spinning loader animation | CSS `@keyframes spin` |
| **Map** | Google Maps embed | Responsive iframe with lazy loading |
| **SEO** | JSON-LD structured data | Schema.org Person markup |
| **SEO** | Open Graph + Twitter Cards | Social media preview optimization |
| **Security** | HTTP headers | X-Content-Type-Options, X-Frame-Options, etc. |
| **Performance** | Lazy loading | `loading="lazy"` on images/videos |
| **Performance** | Adaptive DPR | Caps device pixel ratio for WebGL |
| **A11y** | Semantic HTML | ARIA labels, focus states, reduced motion |
| **PWA** | Web manifest | `site.webmanifest` for mobile install |

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| HTML5 | - | Semantic markup, accessibility, JSON-LD |
| CSS3 | - | Custom properties, Grid, Flexbox, animations |
| JavaScript | ES6+ | Interactivity, effects, theme system |

### WebGL Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| OGL | 1.0.11 | LightRays shader rendering (CDN, dynamic `import()`) |
| Three.js | r160 | Hero particle ring + footer glow rings |

### UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Swiper | 9.x | Projects + testimonials carousels |
| ScrollReveal | - | Scroll-triggered reveal animations |
| RemixIcon | 4.6.0 | Icon set for UI elements |

### Fonts

| Font | Weights | Usage |
|------|---------|-------|
| Lora | 400, 500, 600 | Headings, decorative text |
| Roboto | 400, 500 | Body text, UI elements |
| Lobster | 400 | Accent text |

### External Services

| Service | Purpose |
|---------|---------|
| FormSubmit.co | Serverless contact form backend |
| Google Maps | Location embed |
| Google Fonts | Web font delivery |

---

## Project Structure

```
.
├── index.html                    # Main portfolio (1,430+ lines, all sections)
├── README.md                     # This documentation
├── security_readme.md            # Security hardening guide
├── robots.txt                    # Search engine crawl rules
├── .htaccess                     # Apache config (security headers, caching)
├── nginx.conf                    # Nginx config (security headers, gzip)
│
├── css/
│   ├── styles.css                # Main stylesheet (3,500+ lines)
│   │   ├── :root                 #   Light theme variables
│   │   ├── body.dark-theme       #   Dark theme overrides
│   │   ├── .skills__*            #   Skills grid/loop/popup styles
│   │   ├── .services__*          #   Service card styles
│   │   ├── .projects__*          #   Project carousel styles
│   │   ├── .contact__*           #   Contact form styles
│   │   ├── .light-rays-*         #   WebGL container styles
│   │   └── @media queries        #   20+ responsive breakpoints
│   └── swiper-bundle.min.css     # Swiper carousel styles
│
├── js/
│   ├── main.js                   # Core logic (loader, nav, theme, sliders, reveals)
│   ├── lightrays.js              # Custom LightRays WebGL (OGL vanilla port, 380+ lines)
│   ├── antigravity.js            # Three.js hero particle ring effect
│   ├── magicrings.js             # Three.js footer glow ring effect
│   ├── scrollreveal.min.js       # ScrollReveal library
│   └── swiper-bundle.min.js      # Swiper carousel library
│
├── img/                          # Assets (SVGs, PNGs, WebM videos)
│   ├── Stylized Astronaut Render.png  # Hero astronaut illustration (with float animation)
│   ├── Avatar.svg                # Avatar illustration
│   ├── felix-adm2.png            # Profile photo
│   ├── Mesob Website Thumbnail.png  # Mesob system screenshot
│   ├── favicon_io/               # Favicon files + site.webmanifest
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   └── site.webmanifest
│   └── *.svg                     # Skill icons, decorative shapes
│
├── 404/
│   └── index.html                # Custom 404 page (GSAP animations)
│
└── documentation/
    ├── fraol admasu resume c1.pdf
    ├── Certificate Of Collection By Fraol Admasu.pdf
    └── Profile.pdf
```

---

## Sections

### Home / Hero
- **Antigravity particle ring** background (Three.js WebGL)
- Name, role title ("IT Specialist & Full Stack Developer")
- Biography with Mesob impact statement (21,000+ permits)
- **Astronaut illustration** with subtle float animation (up/down hover effect)
- Social links (GitHub, LinkedIn, Email)
- CTA button → Contact section
- Decorative SVG shapes (wave + circle)

### Skills
**Grid View (Default):**
- 3 categories: Frontend (6), Backend (6), Tools (6) = 18 skills
- Proficiency badges: Advanced (green), Intermediate (yellow), Basic (blue)
- Hover popups with descriptions and proficiency percentages
- Transparent backgrounds for LightRays visibility

**Loop View:**
- Dual-row infinite marquee scroll
- Row 1: scrolls left →
- Row 2: ← scrolls right
- Skill icons with labels

**Soft Skills:**
- 6 pill badges: Problem-Solving, Attention to Detail, Teamwork, Leadership, Critical Thinking, Deadline-Oriented
- Theme-aware hover effect

### Qualification
**Education (right column):**
- Diploma in Information Technology (Level V)
- Tegbare-id Polytechnic College (April 2022–August 2025)
- 9 professional certifications (Cisco, Udacity, Python, etc.)

**Work Experience (left column):**
1. **Data Entry Specialist (Volunteer) — Mesob System Builder** (Dec 2025–Present)
   - Mezgeb origin story + production system details
2. **IT Intern** — Piya's Federal First Instance Court (Aug–Oct 2024)
3. **IT Intern (Co-operative Training)** — Lideta District Bench (2015–2016 E.C)

### Services
4 outcome-focused cards:
1. Custom Web Applications
2. Data Management
3. Government & Institutional Systems
4. Web Design & Development

### Projects
Swiper carousel with 7 projects:
1. **Mesob** — Laravel 12 permit system (21,000+ permits, 3 languages, geospatial mapping)
2. **Library Management System** — Face recognition authentication
3. **The Filli Coffee** — Coffee shop website
4. **Modern Digital Portfolio** — Personal portfolio
5. **Digital Portfolio** — Additional design
6. **Error 404** — Creative 404 page
7. **Danob** — Restaurant redesign

### Testimonials
- Swiper carousel with navigation + pagination
- Client feedback cards

### Map
- Google Maps iframe (responsive)
- Working hours availability info
- LightRays effect (bottom-right origin)

### Contact
- Contact info cards (email, phone, LinkedIn)
- AJAX form with spinning loader
- FormSubmit.co integration

### Footer
- Navigation links
- Social links (LinkedIn, GitHub, Email)
- Download CV button
- Magic Rings WebGL background
- Copyright notice

---

## Visual Effects System

### LightRays WebGL

**File:** `js/lightrays.js` (380+ lines, vanilla JavaScript)

A custom WebGL shader effect that renders animated light rays sweeping across sections. Built as a vanilla port of an OGL shader, loaded via dynamic `import()`.

#### Ray Instances (11 total)

| # | Section | Origin | Purpose |
|---|---------|--------|---------|
| 1 | Skills | `top-center` | Primary display, visible on load |
| 2 | Skills | `bottom-center` | Symmetry with top ray |
| 3 | Qualification (Education) | `top-left` | Scroll-triggered reveal |
| 4 | Qualification (Work) | `bottom-right` | Scroll-triggered reveal |
| 5 | Services | `bottom-center` | Scroll-triggered reveal |
| 6 | Projects | `bottom-left` | Scroll-triggered reveal |
| 7 | Testimonial | `top-right` | Scroll-triggered reveal |
| 8 | Testimonial | `bottom-left` | Scroll-triggered reveal |
| 9 | Contact | `bottom-left` | Scroll-triggered reveal |
| 10 | Footer | `bottom-center` | Always visible |
| 11 | Map | `bottom-right` | Scroll-triggered reveal |

#### Shader Uniforms

| Uniform | Type | Default | Description |
|---------|------|---------|-------------|
| `iTime` | float | auto | Elapsed time (animated) |
| `iResolution` | vec2 | auto | Canvas resolution |
| `rayPos` | vec2 | varies | Origin point (pixels) |
| `rayDir` | vec2 | varies | Direction vector |
| `raysColor` | vec3 | theme | Ray color |
| `raysSpeed` | float | 0.6 | Animation speed |
| `lightSpread` | float | 0.9 | Spread width |
| `rayLength` | float | 1.2 | Maximum length |
| `fadeDistance` | float | 2.0 | Fade-out distance |
| `saturation` | float | 2.0 | Color saturation |
| `mouseInfluence` | float | 0.1 | Mouse effect strength |
| `iBottom` | float | auto | Bottom-origin flag (0.0 or 1.0) |

#### Configuration

Each instance is configured via `data-*` attributes:

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

#### Performance Optimizations

- **IntersectionObserver** — initializes when section enters viewport (200px rootMargin)
- **Adaptive DPR** — caps device-pixel-ratio at 2.0 (1.5 on mobile)
- **Reduced motion** — renders static frame when `prefers-reduced-motion: reduce`
- **Theme sync** — `MutationObserver` updates colors on theme toggle

### Antigravity Hero Ring

**File:** `js/antigravity.js`

Three.js particle system that renders an animated ring of particles in the hero section background. Creates a floating, cosmic effect that draws attention to the main content.

### Magic Rings Footer

**File:** `js/magicrings.js`

Three.js glow ring geometry that renders animated rings in the footer section. Provides a visually striking background for the footer content.

---

## Theme System

### How It Works

1. **Toggle button** in header (`#theme-button`) — moon/sun icon
2. **Persistence** — saves to `localStorage` under key `theme`
3. **OS detection** — on first visit, respects `prefers-color-scheme`
4. **Application** — toggles `dark-theme` class on `<body>`
5. **CSS variables** — all colors driven by custom properties

### Color Palette

| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--first-color` | `hsl(207, 65%, 65%)` | `hsl(207, 65%, 65%)` |
| `--title-color` | `hsl(207, 4%, 16%)` | `hsl(207, 4%, 95%)` |
| `--body-color` | `hsl(207, 4%, 99%)` | `hsl(207, 4%, 10%)` |
| `--container-color` | `#fff` | `hsl(207, 4%, 17%)` |
| `--lightrays-color` | `#d97706` (warm gold) | `#fbbf24` (bright amber) |
| `--text-color-light` | `hsl(207, 4%, 45%)` | `hsl(207, 4%, 65%)` |

### LightRays Visibility

- **Light mode** — rays hidden via `display: none`
- **Dark mode** — rays visible via `display: block`

---

## Responsive Design

### Breakpoint System

| Breakpoint | Width | Grid Columns | Target |
|-----------|-------|--------------|--------|
| XS | 320–360px | 2 | Very small phones |
| SM | 361–576px | 2 | Small phones |
| MD | 577–768px | 2 | Tablets |
| LG | 769–1024px | 4 | Small laptops |
| XL | 1025–1280px | 4 | Desktops |
| XXL | 1281px+ | 4 | Large screens |

### Key Responsive Behaviors

- **Navigation** — hamburger menu on mobile, horizontal on desktop
- **Skills grid** — 4 columns → 2 columns on mobile
- **Qualification** — 2 columns → 1 column on mobile
- **Services** — horizontal scroll on mobile
- **Projects** — centered carousel on all sizes
- **Contact** — stacked layout on mobile
- **Map** — full-width iframe, reduced height on mobile

---

## Getting Started

### Prerequisites

- Modern browser with WebGL support (Chrome, Firefox, Safari, Edge)
- Local static file server (recommended — `file://` blocks ES modules)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/FelixAdmasu/Responsive-Portfolio-Website-Fraol-Admasu-Full-Stack-Developer.git

# Navigate to project
cd Responsive-Portfolio-Website-Fraol-Admasu-Full-Stack-Developer
```

### Local Server Options

**VS Code Live Server (Recommended):**
1. Install Live Server extension
2. Right-click `index.html` → Open with Live Server

**Python:**
```bash
python -m http.server 5500
# Open http://localhost:5500
```

**Node.js:**
```bash
npx serve .
# Open printed URL
```

**PHP:**
```bash
php -S localhost:5500
# Open http://localhost:5500
```

---

## Customization Guide

### Personal Info

Edit `index.html`:

| Section | Location | What to Change |
|---------|----------|----------------|
| Meta tags | `<head>` | Title, description, keywords, OG tags |
| Hero | `#home` | Name, role, biography, social links |
| Skills | `#skills` | Skill items, categories, proficiency levels |
| Qualification | `#qualification` | Education, work experience, certifications |
| Services | `#services` | Service cards, descriptions |
| Projects | `#projects` | Project items, images, descriptions |
| Testimonials | `#testimonial` | Client quotes |
| Contact | `#contact` | Email, phone, LinkedIn, form action |
| Footer | `footer` | Social links, copyright |
| JSON-LD | `<head>` | Structured data (jobTitle, knowsAbout, sameAs) |

### Colors

Edit CSS custom properties in `css/styles.css`:

```css
:root {
  --first-color: hsl(207, 65%, 65%);     /* Accent color */
  --title-color: hsl(207, 4%, 16%);      /* Heading color */
  --body-color: hsl(207, 4%, 99%);       /* Background */
  --container-color: #fff;                /* Card background */
  --lightrays-color: #d97706;            /* Light mode rays */
}

body.dark-theme {
  --title-color: hsl(207, 4%, 95%);
  --body-color: hsl(207, 4%, 10%);
  --container-color: hsl(207, 4%, 17%);
  --lightrays-color: #fbbf24;            /* Dark mode rays */
}
```

### LightRays Tuning

Adjust `data-*` attributes on any `.light-rays-container`:

```html
<div class="light-rays-container"
     data-rays-origin="top-center"      <!-- Options: top-center, bottom-center, top-left, bottom-right, bottom-left -->
     data-rays-speed="0.6"              <!-- Animation speed (0.1 - 2.0) -->
     data-light-spread="0.9"            <!-- Spread width (0.1 - 2.0) -->
     data-ray-length="1.2"              <!-- Ray length (0.5 - 3.0) -->
     data-follow-mouse="true"           <!-- Enable mouse tracking -->
     data-mouse-influence="0.1"         <!-- Mouse effect strength (0.0 - 1.0) -->
     data-noise-amount="0.1"            <!-- Noise intensity -->
     data-distortion="0.05"             <!-- Distortion amount -->
     data-fade-distance="2"             <!-- Fade-out distance -->
     data-saturation="2"                <!-- Color saturation -->
     aria-hidden="true">
</div>
```

### Adding New Sections

1. Add HTML structure in `index.html` following existing patterns
2. Add CSS styles in `css/styles.css`
3. Add LightRays container (optional):
   ```html
   <div class="light-rays-container" data-rays-origin="bottom-center" ...></div>
   ```
4. Add ScrollReveal animation (optional):
   ```javascript
   ScrollReveal().reveal('.new-section', { ... });
   ```

---

## API Reference

### LightRays Instance

```javascript
// Access via LIGHTRAYS_CONFIG in main.js
window.LIGHTRAYS_CONFIG = {
  enabled: true,
  origin: 'top-center',
  speed: 0.6,
  spread: 0.9,
  length: 1.2,
  followMouse: true,
  mouseInfluence: 0.1
};
```

### Theme Toggle

```javascript
// Toggle theme programmatically
document.getElementById('theme-button').click();

// Check current theme
const isDark = document.body.classList.contains('dark-theme');

// Listen for theme changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      const isDark = document.body.classList.contains('dark-theme');
      console.log('Theme changed:', isDark ? 'dark' : 'light');
    }
  });
});
observer.observe(document.body, { attributes: true });
```

### Swiper Instances

```javascript
// Projects swiper (initialized in main.js)
const projectsSwiper = new Swiper('.projects__container', {
  loop: true,
  pagination: { el: '.swiper-pagination' },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
});

// Testimonials swiper
const testimonialsSwiper = new Swiper('.testimonial__container', {
  loop: true,
  pagination: { el: '.swiper-pagination' },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
});
```

---

## Deployment

### Supported Platforms

| Platform | Method | Notes |
|----------|--------|-------|
| **GitHub Pages** | Push to `main` branch | Free, automatic |
| **Netlify** | Drag & drop or Git | Free tier, custom domain |
| **Vercel** | Git integration | Free tier, instant deploys |
| **cPanel** | Upload via File Manager | Traditional hosting |
| **VPS** | SCP/rsync + Nginx/Apache | Full control |

### Apache Configuration

The `.htaccess` file includes:

```apache
# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Custom 404
ErrorDocument 404 /404/index.html
```

### Nginx Configuration

The `nginx.conf` file includes:

```nginx
server {
    listen 80;
    server_name fraoladmasu.dev;
    root /var/www/html;
    index index.html;

    # Security Headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # Caching
    location ~* \.(svg|css|js|png|jpg|jpeg|gif|ico|webm)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Custom 404
    error_page 404 /404/index.html;
}
```

---

## Performance

### Metrics

| Metric | Target | Implementation |
|--------|--------|----------------|
| First Contentful Paint | < 1.5s | No render-blocking resources |
| Largest Contentful Paint | < 2.5s | Lazy loading, CDN libraries |
| Cumulative Layout Shift | < 0.1 | Fixed dimensions on embeds |
| Time to Interactive | < 3s | No framework overhead |

### Optimizations

- **No build step** — zero compile-time overhead
- **CDN libraries** — OGL, Three.js, Swiper, RemixIcon, Google Fonts
- **DNS prefetch** — pre-resolves CDN domains
- **IntersectionObserver** — lazy initializes effects
- **Adaptive DPR** — caps pixel ratio for WebGL (2.0 desktop, 1.5 mobile)
- **Reduced motion** — static frames for `prefers-reduced-motion`
- **Lazy video loading** — videos pause when off-screen
- **CSS containment** — scoped styles prevent layout thrashing

---

## Security

### Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking |
| `X-XSS-Protection` | `1; mode=block` | Enables XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer data |
| `Permissions-Policy` | `camera=(), microphone=()` | Restricts browser features |

### Best Practices

- `noopener noreferrer` on all external links
- Honeypot field (`_honey`) for spam prevention
- HTTPS-only form submissions (FormSubmit.co)
- No client-side credentials stored
- See `security_readme.md` for full documentation

---

## Accessibility

- **Semantic HTML** — `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`
- **ARIA labels** — on icon-only controls (nav toggle, social links, scroll-up)
- **ARIA hidden** — on decorative graphics and WebGL containers
- **Alt text** — on all meaningful images
- **Focus states** — visible focus rings for keyboard navigation
- **Reduced motion** — WebGL effects render statically
- **Color contrast** — WCAG AA compliant in both themes

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 90+ | Full | Recommended |
| Firefox 90+ | Full | Recommended |
| Safari 14+ | Full | WebGL required |
| Edge 90+ | Full | Recommended |
| Mobile Chrome | Full | Optimized layouts |
| Mobile Safari | Full | iOS 14+ required |
| Mobile Firefox | Full | Android 10+ recommended |

> WebGL is universal on modern devices. All effects include graceful fallbacks — the site remains fully functional without WebGL.

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| LightRays not visible | Light mode active | Toggle to dark mode |
| LightRays delayed | IntersectionObserver | Wait for section to enter viewport |
| Contact form not sending | FormSubmit not activated | Visit formssubmit.co to confirm email |
| Theme resets | `localStorage` disabled | Enable `localStorage` in browser |
| CSS not loading | CDN blocked | Check network, try different CDN |
| WebGL errors | GPU disabled | Enable hardware acceleration |
| Favicon missing | Wrong path | Verify `img/favicon_io/` exists |
| Skills popup clipped | Grid gap too small | Already fixed with `row-gap: 5rem` |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **HTML** — semantic elements, ARIA attributes, 2-space indentation
- **CSS** — BEM-like naming, CSS custom properties, mobile-first
- **JavaScript** — ES6+, no framework dependencies, comments for complex logic

---

## License

All rights reserved. This is a personal portfolio site. You may reference it for learning purposes, but please do not redistribute or resell the content, images, or branding without explicit permission.

---

## Author

**Fraol Admasu** — IT Specialist | Full-Stack Developer & Database Administrator | Cybersecurity Enthusiast | Microsoft Tools | Visual Content Designer

| Platform | Link |
|----------|------|
| Website | [fraoladmasu.dev](https://fraoladmasu.dev) |
| Email | [fadm94202@gmail.com](mailto:fadm94202@gmail.com) |
| GitHub | [FelixAdmasu](https://github.com/FelixAdmasu) |
| LinkedIn | [fraol-admasu](https://www.linkedin.com/in/fraol-admasu/) |

---

<div align="center">

**Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no compromises.**

</div>
