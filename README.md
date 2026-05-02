# H.Studio — Harvey Specter Portfolio

A high-performance creative portfolio site for Harvey Specter, a Chicago-based creative director and photographer. Built with Next.js 16 App Router, Sanity CMS, GSAP animations, and Tailwind CSS v4.

---

## Overview

A full-featured portfolio and studio website with five public pages, a CMS-driven projects and news system, an animated contact modal, a validated contact form with email delivery, and a Sanity Studio accessible in development only.

**Live pages**

| Route | Description |
|---|---|
| `/` | Home — hero, identity, about, full-bleed photo, services, selected work, testimonials, news |
| `/about` | About — biography, stats, full-bleed photo, disciplines, process, testimonials, CTA |
| `/contact` | Contact — info panel with social links and a validated contact form |
| `/projects/[slug]` | Individual project page — cover image, body content, metadata |
| `/news/[slug]` | Individual news article — cover image, portable text body, metadata |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript (strict) |
| CMS | Sanity v3 with live preview |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 (ScrollTrigger, hover effects, parallax, modals) |
| Email | Resend |
| Fonts | Inter, Geist Mono, Playfair Display (Google Fonts) |
| Deployment | Vercel (recommended) |

---

## Features

### Animations
- Scroll-triggered blur-to-clear reveal on full-bleed photos (GSAP ScrollTrigger)
- Portrait clip-path reveal on scroll
- Horizontal parallax text (identity section)
- Service row hover — background sweep, title slide, image zoom
- Project card hover — image zoom, title slide, circle fill
- News card hover — image zoom, arrow translate
- "Let's talk" button — clip-path fill wipe on hover (all instances)
- Footer reveal — staggered entrance on scroll

### Contact
- **Modal** — triggered from any "Let's talk" button; focus-trapped, GSAP-animated, Escape/click-outside to close, focus restoration on close
- **Contact page form** — server action with per-IP rate limiting (3/min), input validation, HTML sanitization, and email delivery via Resend
- Both routes send to the address set in `CONTACT_EMAIL`

### CMS (Sanity)
- **Projects** — title, slug, category, year, tags, cover image, portable text body
- **Posts** — title, slug, category, published date, excerpt, cover image, portable text body
- Live preview enabled in development
- Sanity Studio available only in development (`/studio`); blocked by middleware in production

### SEO
- Per-page metadata (`title`, `description`, `openGraph`, `twitter`, `alternates.canonical`)
- Dynamic `generateMetadata()` on news and project pages
- `sitemap.ts` — auto-generated from Sanity content
- `robots.ts` — disallows `/studio` and `/api/`
- Person JSON-LD schema in root layout
- Article JSON-LD schema on news pages

### Accessibility (WCAG 2.1 AA)
- Skip-to-content link
- Semantic headings (`h1`/`h2`) on every page, including sr-only where visual hierarchy is decorative
- Focus trap in modal dialog (`role="dialog"`, `aria-modal`)
- `focus-visible` outline for keyboard navigation
- `aria-label` on all icon-only buttons and links
- `aria-live="polite"` on form success state; `aria-live="assertive"` on error state
- `aria-required` on all required form fields
- `prefers-reduced-motion` respected via GSAP `globalTimeline.timeScale`

### Security
- Content Security Policy (CSP) header
- HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- `/studio` blocked in production via Next.js middleware
- Server action input validation, length limits, and HTML escaping
- `SANITY_API_READ_TOKEN` server-side only — never sent to the browser

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Sanity project (free tier is sufficient)
- A Resend account for contact form email delivery

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_sanity_read_token
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=you@yourdomain.com
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio) in development only.

### 4. Deploy the Sanity schema

```bash
npx sanity deploy
```

---

## Content Management

Log in to your Sanity Studio (`/studio` in development, or at `your-project.sanity.studio`) to manage:

- **Projects** — add/edit portfolio pieces with cover images, tags, and rich text body
- **Posts** — add/edit news articles with categories, excerpts, and rich text body

Content updates appear on the live site within 60 seconds (ISR revalidation).

---

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel project settings
4. Deploy

### Required before going live

- [ ] Replace placeholder Figma CDN image URLs in `src/app/page.tsx` and `src/app/about/page.tsx` with permanent `/public/` assets
- [ ] Add `public/og-image.jpg` (1200×630px) for social share previews
- [ ] Verify your sending domain in Resend and update the `from` address in `src/app/contact/actions.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain in Vercel environment variables

---

## Project Structure

```
src/
├── app/
│   ├── about/            # About page
│   ├── components/       # Shared UI components
│   │   ├── BlurImage.tsx         # Scroll-triggered blur reveal
│   │   ├── ContactModal.tsx      # "Let's talk" modal with focus trap
│   │   ├── CTAButton.tsx         # CTA button (opens modal)
│   │   ├── FooterReveal.tsx      # Scroll-animated footer entrance
│   │   ├── HeroSection.tsx       # Hero with GSAP intro animation
│   │   ├── IdentityText.tsx      # Horizontal parallax identity text
│   │   ├── ModalProvider.tsx     # Modal context provider
│   │   ├── NavBar.tsx            # Fixed nav with scroll-aware theme
│   │   ├── NewsCard.tsx          # Desktop news card with hover
│   │   ├── NewsSlider.tsx        # Mobile news carousel
│   │   ├── ParallaxX.tsx         # Horizontal parallax wrapper
│   │   ├── PortraitReveal.tsx    # Clip-path portrait reveal
│   │   ├── ProjectCard.tsx       # Project card with hover animation
│   │   ├── ReducedMotion.tsx     # Respects prefers-reduced-motion
│   │   ├── ServiceRow.tsx        # Service row with hover sweep
│   │   └── TestimonialCard.tsx   # Testimonial card with tilt hover
│   ├── contact/          # Contact page + server action
│   ├── news/[slug]/      # Dynamic news article page
│   ├── projects/[slug]/  # Dynamic project page
│   ├── error.tsx         # Global error boundary
│   ├── not-found.tsx     # Custom 404 page
│   ├── layout.tsx        # Root layout with metadata + JSON-LD
│   ├── page.tsx          # Home page
│   ├── robots.ts         # robots.txt generation
│   └── sitemap.ts        # sitemap.xml generation
├── sanity/
│   ├── lib/              # Sanity client, image helper, live preview
│   └── schemaTypes/      # Project and Post content schemas
middleware.ts             # Blocks /studio in production
next.config.ts            # Security headers + CSP
```

---

## License

All rights reserved. This codebase is the property of Harvey Specter / H.Studio.
