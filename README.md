# Unified Hive Website

A React + Vite SPA for the Unified Hive platform, with server-side pre-rendering via Puppeteer for SEO.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 4 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first CSS |
| React Router | 6 | Client-side routing |
| Supabase | 2 | Auth & database |
| Puppeteer | 24 | Pre-rendering (SSG) |

## Prerequisites

- **Node.js** `20.x` (see `.nvmrc` — use `nvm use` to switch automatically)
- **npm** `10+`

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Yes | EmailJS service ID (contact form) |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |

## Build Pipeline

The `npm run build` command runs three steps in sequence:

1. **`node tools/generate-llms.js`** – Generates `public/llms.txt` from React Helmet metadata across all page components.
2. **`vite build`** – Bundles and transpiles the app into `dist/`.
3. **`node scripts/prerender.mjs`** – Launches Puppeteer, serves the `dist/` folder, visits every public route, and saves fully-rendered HTML for SEO crawlability.

### Pre-rendered Routes

The following routes are pre-rendered at build time:

`/`, `/solutions`, `/about`, `/contact`, `/book-demo`, `/method`, `/outcomes`, `/blog`, `/resources`, `/trust-center`, `/pricing-engage`, `/privacy`, `/terms`, `/cookies`, `/login`

## Deployment Notes

### Deployment Fix (April 2026)

**Root cause:** `@vitejs/plugin-basic-ssl@2.1.4` declares a peer dependency of `vite@"^6.0.0 || ^7.0.0"`, which is incompatible with the `vite@4` used by this project. This caused `npm install` to fail with a peer dependency conflict error, blocking all CI/CD builds.

**Fix:** Downgraded `@vitejs/plugin-basic-ssl` from `^2.1.4` → `^1.2.0`. Version `1.2.0` supports `vite@"^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0"` and is fully API-compatible.

### Hosting

Configure your hosting provider with:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Output directory** | `dist` |
| **Install command** | `npm install` |
| **Node version** | `20` |

The pre-render step requires Puppeteer, so ensure the CI/hosting environment has Chromium dependencies available (most managed CI environments such as GitHub Actions, Netlify, and Vercel include these by default).

## Linting

```bash
npm run lint
```
