# 🔧 Routing & 404 Fix

## Problem behoben: "Page not found"

Die Website verwendet jetzt korrekte Routing-Konfiguration für Netlify.

---

## ✅ Was wurde gefixt?

### 1. **Astro Konfiguration** (`astro.config.mjs`)

```js
export default defineConfig({
  site: 'https://www.memobaut.de',
  trailingSlash: 'ignore',      // ✅ Akzeptiert /page UND /page/
  build: {
    format: 'directory'          // ✅ Generiert /page/index.html
  }
});
```

**Effekt:**
- URLs funktionieren mit UND ohne Trailing Slash
- Clean URLs: `/leistungen` statt `/leistungen.html`
- Netlify serviert automatisch die richtige Datei

### 2. **Netlify Redirects** (`public/_redirects`)

```
# Custom 404 - Must be last rule
/*  /404.html  404
```

**Effekt:**
- Alle nicht-existierenden Seiten → Custom 404-Seite
- Verhindert Netlify Standard-404

### 3. **Netlify Configuration** (`netlify.toml`)

```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

**Effekt:**
- Backup für 404-Handling
- Funktioniert auch ohne `_redirects` Datei

---

## 📂 Build-Output Struktur

```
dist/
├── index.html              # Homepage (/)
├── 404.html                # Custom 404 Seite
├── _redirects              # Netlify Routing Rules
├── _headers                # Security Headers
├── leistungen/
│   └── index.html         # /leistungen oder /leistungen/
├── ueber-uns/
│   └── index.html         # /ueber-uns oder /ueber-uns/
├── referenzen/
│   └── index.html         # /referenzen oder /referenzen/
├── kontakt/
│   └── index.html         # /kontakt oder /kontakt/
├── impressum/
│   └── index.html         # /impressum oder /impressum/
└── datenschutz/
    └── index.html         # /datenschutz oder /datenschutz/
```

---

## 🎯 URL Handling

### Alle diese URLs funktionieren jetzt:

| URL-Variante | Funktioniert | Serviert |
|-------------|--------------|----------|
| `/` | ✅ | `/index.html` |
| `/leistungen` | ✅ | `/leistungen/index.html` |
| `/leistungen/` | ✅ | `/leistungen/index.html` |
| `/kontakt` | ✅ | `/kontakt/index.html` |
| `/kontakt/` | ✅ | `/kontakt/index.html` |
| `/nicht-existent` | ✅ | `/404.html` (404 Status) |

### Internal Links in der Website

Alle internen Links verwenden relative Pfade ohne Trailing Slash:
```html
<a href="/leistungen">Leistungen</a>
<a href="/kontakt">Kontakt</a>
<a href="/ueber-uns">Über uns</a>
```

---

## 🔍 Wie Netlify das Routing handhabt

1. **User besucht `/leistungen`**
   - Netlify sucht nach `/leistungen.html` → nicht gefunden
   - Netlify sucht nach `/leistungen/index.html` → ✅ gefunden
   - Serviert die Seite mit 200 Status

2. **User besucht `/leistungen/`**
   - Netlify sucht nach `/leistungen/index.html` → ✅ gefunden
   - Serviert die Seite mit 200 Status

3. **User besucht `/nicht-existent`**
   - Netlify sucht nach Datei → nicht gefunden
   - `_redirects` matched `/*` → redirect zu `/404.html`
   - Serviert 404-Seite mit 404 Status

---

## 🛠️ Lokales Testen

### Build und Preview

```bash
# Build die Site
npm run build

# Preview lokal (simuliert Netlify)
npm run preview
# Öffnet: http://localhost:4321

# Teste verschiedene URLs:
# http://localhost:4321/leistungen
# http://localhost:4321/leistungen/
# http://localhost:4321/nicht-existent  (sollte 404 zeigen)
```

### Mit Netlify CLI (optional)

```bash
# Installiere Netlify CLI
npm install -g netlify-cli

# Serve lokal mit Netlify
netlify dev

# Oder teste den Build lokal
netlify build
netlify serve
```

---

## 📊 Validierung nach Deployment

### 1. Alle Seiten testen

```bash
# Sollten alle 200 Status zurückgeben:
curl -I https://www.memobaut.de/
curl -I https://www.memobaut.de/leistungen
curl -I https://www.memobaut.de/leistungen/
curl -I https://www.memobaut.de/kontakt
curl -I https://www.memobaut.de/ueber-uns
curl -I https://www.memobaut.de/referenzen
curl -I https://www.memobaut.de/impressum
curl -I https://www.memobaut.de/datenschutz

# Sollte 404 Status zurückgeben:
curl -I https://www.memobaut.de/nicht-existent
```

### 2. Browser-Test

Besuche jede Seite manuell:
- ✅ Seite lädt korrekt
- ✅ Styling wird angewendet
- ✅ Navigation funktioniert
- ✅ Assets laden (Bilder, Fonts)
- ✅ 404-Seite für ungültige URLs

### 3. Developer Tools Check

```
Network Tab:
- Alle Seiten: 200 Status
- Assets: 200 Status
- Nicht-existente URLs: 404 Status

Console:
- Keine JavaScript Fehler
- Keine 404 Fehler für Assets
```

---

## 🐛 Troubleshooting

### Problem: Seite zeigt noch 404

**Lösung 1: Cache leeren**
```bash
# In Netlify Dashboard:
# Deploys → Trigger deploy → Clear cache and deploy
```

**Lösung 2: Build-Log prüfen**
```bash
# Prüfe ob alle Seiten generiert wurden:
# dist/leistungen/index.html
# dist/kontakt/index.html
# etc.
```

### Problem: Styling fehlt

**Lösung:**
- Prüfe ob `_astro/` Ordner im dist/ existiert
- Prüfe Browser Network Tab auf 404s
- Stelle sicher dass Base URL korrekt ist

### Problem: 404-Seite wird nicht angezeigt

**Lösung:**
- Prüfe ob `dist/404.html` existiert
- Prüfe ob `dist/_redirects` existiert
- Prüfe Netlify Redirects im Dashboard

---

## 📝 Wichtige Dateien

| Datei | Zweck | Kritisch |
|-------|-------|----------|
| `astro.config.mjs` | Astro Build-Konfiguration | ✅ |
| `public/_redirects` | Netlify Routing Rules | ✅ |
| `netlify.toml` | Netlify Build & Deploy Config | ✅ |
| `dist/_redirects` | Generiert aus public/ | ⚠️ Auto |
| `dist/404.html` | Custom 404 Seite | ⚠️ Auto |

---

## ✅ Status: GEFIXT

Das Routing-Problem ist behoben. Die Website sollte jetzt auf Netlify korrekt funktionieren.

**Test-Checklist:**
- [x] Build erfolgreich
- [x] `_redirects` wird kopiert
- [x] Alle 8 Seiten generiert
- [x] 404-Seite existiert
- [x] Clean URLs funktionieren
- [x] Trailing Slash handling korrekt

**Nächste Schritte:**
1. Commit & Push der Änderungen
2. Netlify Re-Deploy triggern
3. Alle URLs im Browser testen
4. Lighthouse-Test durchführen

---

**Erstellt:** 2025-11-13
**Problem:** Page not found auf Netlify
**Status:** ✅ Behoben
