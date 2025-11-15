# Netlify Deployment Guide

## 🚀 Quick Deploy

Diese Website ist vollständig optimiert für Netlify-Deployment und kann direkt deployed werden.

### Deployment-Methoden

#### Option 1: GitHub Integration (Empfohlen)
1. Repository zu Netlify verbinden
2. Build-Einstellungen werden automatisch erkannt
3. Deploy!

#### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option 3: Netlify Drop
Build lokal ausführen und `dist/` Ordner zu Netlify ziehen.

## ⚙️ Build-Konfiguration

Alle Einstellungen sind bereits in `netlify.toml` konfiguriert:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Functions**: Keine
- **Environment Variables**: Keine erforderlich

## 🔒 Security Headers

Folgende Security Headers sind automatisch konfiguriert:
- ✅ HSTS mit Preload
- ✅ Content Security Policy (CSP)
- ✅ Permissions Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy

## 📝 Netlify Forms

Das Kontaktformular verwendet Netlify Forms:
- Automatische Spam-Filterung durch Honeypot
- Submissions im Netlify Dashboard sichtbar
- Keine zusätzliche Konfiguration erforderlich

## ⚡ Performance

Optimierte Caching-Strategien:
- Static Assets: 1 Jahr Cache
- HTML: 1 Stunde Cache mit Revalidation
- Fonts: 1 Jahr Cache
- Astro Assets: 1 Jahr Cache

## 🌐 Custom Domain

Nach dem Deployment können Sie eine Custom Domain hinzufügen:
1. Netlify Dashboard → Domain Settings
2. Domain hinzufügen: `www.memobaut.de`
3. DNS-Records bei Domain-Provider aktualisieren
4. SSL/TLS wird automatisch bereitgestellt

## ✅ Pre-Deployment Checklist

- [x] Build erfolgreich (npm run build)
- [x] Netlify Forms konfiguriert
- [x] Security Headers konfiguriert
- [x] Sitemap generiert
- [x] Robots.txt vorhanden
- [x] 404-Seite vorhanden
- [x] Redirects konfiguriert
- [x] GDPR-konform (Consent Banner)
- [x] Performance optimiert
- [x] Accessibility (WCAG 2.2 AA)

## 📊 Erwartete Lighthouse-Scores

- Performance: 96+
- Accessibility: 98+
- Best Practices: 95+
- SEO: 98+

## 🔍 Testing

Lokaler Preview:
```bash
npm run build
npm run preview
```

Netlify Dev (lokales Netlify-Environment):
```bash
netlify dev
```

## 🎨 Design-Features

- Animierter Mesh-Gradient Hintergrund
- 5-Ebenen Glassmorphismus-System
- Premium Mobile Menu mit Slide-In
- 3D Tilt-Effekt auf Hero
- Animierte Counter
- Fluid Typography
- Micro-Interactions (Shine, Ripple)

## 📁 Projekt-Struktur

```
/
├── src/
│   ├── pages/          # Astro Pages (Routes)
│   ├── layouts/        # Layout-Komponenten
│   ├── components/     # Wiederverwendbare Komponenten
│   └── styles/         # Global CSS
├── public/             # Statische Assets
│   ├── _headers        # Netlify Headers (Fallback)
│   ├── _redirects      # Netlify Redirects
│   ├── assets/         # Bilder, Icons
│   └── robots.txt      # SEO
├── netlify.toml        # Netlify Konfiguration (Primary)
├── astro.config.mjs    # Astro Konfiguration
└── tailwind.config.cjs # Tailwind CSS Konfiguration
```

## 🆘 Troubleshooting

### Build-Fehler
- Node-Version überprüfen: `node -v` (sollte 18.x sein)
- Dependencies neu installieren: `rm -rf node_modules && npm install`
- Cache löschen: `npm run build -- --force`

### CSP-Fehler
- CSP ist optimiert für Astro und Google Fonts
- Inline Scripts/Styles sind erlaubt (`unsafe-inline`)
- External Resources werden automatisch erlaubt

### Forms funktionieren nicht
- `data-netlify="true"` Attribut vorhanden?
- Hidden input `form-name` korrekt?
- Nach Deployment testen (nicht lokal)

## 📞 Support

Bei Fragen zum Deployment:
- Netlify Docs: https://docs.netlify.com
- Astro Docs: https://docs.astro.build
- Issue Tracker: [GitHub Issues]

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Letztes Update**: 2025-11-15
