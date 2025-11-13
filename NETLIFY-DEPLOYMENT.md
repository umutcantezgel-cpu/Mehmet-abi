# 🚀 Netlify Deployment Guide

Diese Anleitung zeigt dir, wie du die Memo-BauT Website direkt von GitHub zu Netlify deployen kannst.

## ✅ Voraussetzungen

Das Repository ist **vollständig deploy-ready** für Netlify:

- ✅ `netlify.toml` konfiguriert
- ✅ Security Headers in `public/_headers`
- ✅ Node.js Version in `.nvmrc` festgelegt
- ✅ Build-Befehl: `npm run build`
- ✅ Publish-Verzeichnis: `dist`
- ✅ Alle Abhängigkeiten in `package.json`

## 🔗 Schritt 1: GitHub Repository verbinden

1. **Gehe zu Netlify**: https://app.netlify.com
2. **Klicke auf "Add new site"** → "Import an existing project"
3. **Wähle "Deploy with GitHub"**
4. **Autorisiere Netlify** für Zugriff auf dein GitHub-Konto
5. **Wähle das Repository**: `umutcantezgel-cpu/Mehmet-abi`

## ⚙️ Schritt 2: Build-Einstellungen

Netlify sollte diese Einstellungen **automatisch erkennen** (aus `netlify.toml`):

```
Build command:    npm run build
Publish directory: dist
```

**Falls nicht automatisch erkannt:**
- Branch to deploy: `main` (oder dein Production-Branch)
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `18` (wird aus `.nvmrc` gelesen)

## 🎯 Schritt 3: Deploy starten

1. **Klicke "Deploy site"**
2. Netlify wird:
   - Dependencies installieren (`npm ci`)
   - Die Website bauen (`npm run build`)
   - Das `dist/` Verzeichnis veröffentlichen

⏱️ **Build-Zeit**: ca. 1-2 Minuten

## ✨ Schritt 4: Domain konfigurieren

Nach erfolgreichem Deployment:

1. **Temporäre Domain**: `https://[random-name].netlify.app`
2. **Custom Domain einrichten**:
   - Gehe zu "Domain settings"
   - Klicke "Add custom domain"
   - Gib `www.memobaut.de` ein
   - Folge den DNS-Anweisungen

### DNS-Einstellungen für memobaut.de

Füge diese Records bei deinem Domain-Provider hinzu:

```
# CNAME für www
www.memobaut.de  →  CNAME  →  [deine-site].netlify.app

# ALIAS/ANAME für Root-Domain
memobaut.de      →  ALIAS  →  [deine-site].netlify.app
```

**Oder nutze Netlify DNS** (empfohlen):
- Übertrage die Domain-Verwaltung zu Netlify
- Netlify konfiguriert alles automatisch

## 🔒 Schritt 5: HTTPS aktivieren

1. Gehe zu "Domain settings" → "HTTPS"
2. Klicke "Verify DNS configuration"
3. Klicke "Provision certificate"
4. ✅ Let's Encrypt SSL wird automatisch eingerichtet

## 🔄 Automatische Deployments

Netlify deployt **automatisch** bei jedem Push zum konfigurierten Branch:

```bash
git push origin main
# Netlify erkennt den Push und deployed automatisch
```

**Deploy-Trigger**:
- ✅ Push zu `main` Branch
- ✅ Pull Request Previews (optional aktivierbar)
- ✅ Manueller Deploy über Netlify UI

## 📊 Build-Status überprüfen

**Im Netlify Dashboard**:
- "Deploys" Tab zeigt alle Deployments
- Build-Logs zeigen detaillierte Ausgabe
- Performance-Metriken nach jedem Deploy

**Erwartete Metriken**:
- ✅ Build Time: ~1-2 Minuten
- ✅ Total Size: ~212 KB
- ✅ Lighthouse Performance: 95+
- ✅ Accessibility: 100

## 🛠️ Troubleshooting

### Build schlägt fehl

**1. Node-Version prüfen**
```
Erwartete Version: Node 18 (definiert in .nvmrc)
```

**2. Dependencies-Problem**
```bash
# Im Netlify Build-Log prüfen:
# "npm ci" sollte ohne Fehler durchlaufen
```

**3. Build-Befehl prüfen**
```bash
# Lokal testen:
npm ci
npm run build
# Sollte dist/ Ordner erstellen
```

### Seiten werden nicht richtig angezeigt

**1. Publish Directory prüfen**
```
Muss "dist" sein (ohne Slash am Ende)
```

**2. Asset-Pfade prüfen**
```
Alle Assets sollten relative Pfade verwenden
Keine hartkodierten localhost-URLs
```

### Security Headers funktionieren nicht

**1. Prüfe public/_headers**
```bash
# File sollte in dist/_headers landen
ls dist/_headers
```

**2. Header-Syntax prüfen**
```toml
# In netlify.toml ist korrekte Syntax definiert
```

## 🎉 Deployment erfolgreich!

Nach erfolgreichem Deployment solltest du sehen:

- ✅ Website ist live unter Netlify-URL
- ✅ Alle 8 Seiten sind erreichbar
- ✅ Security Headers sind aktiv (prüfe mit securityheaders.com)
- ✅ HTTPS ist aktiviert
- ✅ Sitemap ist verfügbar unter `/sitemap-index.xml`

## 📞 Support

**Website**: https://www.memobaut.de
**Repository**: https://github.com/umutcantezgel-cpu/Mehmet-abi

**Netlify Docs**: https://docs.netlify.com
**Astro Deployment**: https://docs.astro.build/en/guides/deploy/netlify/

---

## ⚡ Quick-Start Checkliste

- [ ] GitHub Repository mit Netlify verbunden
- [ ] Build-Einstellungen geprüft (automatisch aus netlify.toml)
- [ ] Erster Deploy durchgeführt
- [ ] Custom Domain hinzugefügt (optional)
- [ ] DNS-Records konfiguriert
- [ ] HTTPS aktiviert
- [ ] Build-Status überprüft
- [ ] Website live getestet

**Geschätzte Setup-Zeit**: 10-15 Minuten
