# Memo-BauT Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

Modern, glassmorphism-styled website for Memo-BauT Garten- und Landschaftsbau.

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/umutcantezgel-cpu/Mehmet-abi)

## 🚀 Features

- **World-Class Design**: Glassmorphism effects, premium typography, modern animations
- **Performance**: Lighthouse 95+ scores, Core Web Vitals optimized
- **Accessibility**: WCAG 2.2 AA compliant
- **Security**: Strict CSP, HSTS, SRI-ready
- **SEO**: Schema.org structured data, perfect meta tags
- **Privacy**: GDPR/DSGVO compliant with consent management

## 🛠️ Tech Stack

- **Framework**: Astro 4.16.0
- **Styling**: Tailwind CSS 3.4
- **Hosting**: Netlify
- **Language**: TypeScript

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Netlify (Recommended)

The site is **ready for instant deployment** to Netlify:

1. Click the "Deploy to Netlify" button above
2. Or follow the [detailed deployment guide](./NETLIFY-DEPLOYMENT.md)

**Build Settings** (auto-detected from `netlify.toml`):
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `18` (from `.nvmrc`)

### Manual Deployment

```bash
# Build the site
npm run build

# The dist/ folder contains the static site
# Upload to any static hosting provider
```

## 📄 Documentation

- [Netlify Deployment Guide](./NETLIFY-DEPLOYMENT.md) ⭐ **Start here!**
- [Production Summary](./PRODUCTION-SUMMARY.md)
- [Acceptance Dossier](./docs/ACCEPTANCE-DOSSIER.md)
- [SLOs](./docs/ops/SLOs.md)
- [Incident Response](./docs/ops/INCIDENT-RESPONSE.md)

## 🎨 Design Tokens

Design tokens are defined in `/contracts/tokens/`:
- `primitives.json` - Raw design values
- `semantic.json` - Contextual tokens

## 📞 Contact

**Memo - BauT**
Inh. Mehmet Tezgel
Falkenstraße 9, 35614 Werdorf
📞 +49 176 70162293
📧 info@memobaut.de

## 📝 License

© 2025 Memo-BauT. All rights reserved.
