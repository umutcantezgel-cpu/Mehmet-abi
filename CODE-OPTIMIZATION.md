# Abschnitt 3: Code-Optimierung und Strukturverbesserung
## Modulare, wartbare Code-Architektur

**Datum:** 2025-11-13
**Fokus:** Saubere Code-Struktur für Skalierbarkeit & Wartbarkeit
**Framework:** Astro 4.16.0 + Tailwind CSS 3.4.1

---

## 🏗️ AKTUELLE CODE-STRUKTUR (Analyse)

### Stärken ✅
- Astro-Komponenten sauber getrennt
- TypeScript-Interfaces für Props
- Semantisches HTML
- Tailwind CSS für schnelle Entwicklung

### Schwächen ⚠️
- CSS Custom Properties untergenutzt
- Redundante Stil-Definitionen
- Fehlende Component Variants
- Keine Animation-Utilities-Bibliothek
- Mischung aus Tailwind und Custom CSS

---

## 1. STYLING-METHODIK: ENTSCHEIDUNG 🎨

### Optionen-Vergleich:

| Kriterium | Vanilla CSS | SCSS | **Tailwind CSS** |
|-----------|-------------|------|------------------|
| **Learning Curve** | Niedrig | Mittel | Mittel-Hoch |
| **Entwicklungs-Speed** | Langsam | Mittel | **Schnell** |
| **Bundle-Size** | Klein | Mittel | **Klein (mit PurgeCSS)** |
| **Wartbarkeit** | Mittel | Hoch | **Sehr hoch** |
| **Design-System** | Manuell | Mit Variablen | **Eingebaut** |
| **Netlify-Kompatibilität** | ✅ Perfekt | ✅ Build-Step nötig | ✅ **PostCSS** |
| **Team-Skalierbarkeit** | Niedrig | Hoch | **Sehr hoch** |

### 🏆 EMPFEHLUNG: **Tailwind CSS BEIBEHALTEN & ERWEITERN**

**Begründung:**

1. **Bereits implementiert** → Kein Refactoring-Overhead
2. **PurgeCSS** → Automatische Bundle-Optimierung (aktuell 212 KB)
3. **Utility-First** → Konsistentes Design-System durch Constraints
4. **JIT-Modus** → On-Demand CSS-Generierung (schnelle Builds)
5. **Plugin-Ökosystem** → Einfache Erweiterung (Forms, Typography, etc.)
6. **Netlify-Ready** → PostCSS-Build out-of-the-box

### ❌ Warum NICHT SCSS?

- **Overhead:** Zusätzlicher Build-Step (node-sass/dart-sass)
- **Redundanz:** Tailwind + SCSS = Doppelte Styling-Logik
- **Bundle-Size:** SCSS ohne PurgeCSS = größere CSS-Dateien
- **Wartung:** Tailwind-Utilities schneller zu lesen als custom classes

### ✅ Warum NICHT reines CSS?

- **Kein Design-Token-System** → Inkonsistenzen
- **Langsame Entwicklung** → Jede Klasse manuell schreiben
- **Keine Built-in Responsive** → Media-Queries manuell

---

## 2. ERWEITERTE TAILWIND-KONFIGURATION 🔧

### Aktuelle tailwind.config.cjs:
```javascript
// Basis-Konfiguration vorhanden, aber unvollständig
```

### 🎯 VORSCHLAG: Erweiterte Config mit Design Tokens

```javascript
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {
      // === FARBEN (aus Design-Proposals) ===
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Lebendigeres Grün
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        earth: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15', // Akzent-Gelb
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },

      // === TYPOGRAPHY ===
      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
        display: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        // Fluid Typography via CSS Custom Properties
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.825rem + 0.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.65vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.2rem + 1.25vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.4rem + 2vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.6rem + 2.75vw, 3.5rem)',
        'fluid-5xl': 'clamp(3rem, 2rem + 4.5vw, 5rem)',
      },

      // === SPACING (Konsistente Skala) ===
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '30': '7.5rem',  // 120px
        '34': '8.5rem',  // 136px
        '38': '9.5rem',  // 152px
      },

      // === BORDER RADIUS (Organische Formen) ===
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      // === BOX SHADOWS (Glassmorphism) ===
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(31, 38, 135, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.12), 0 16px 48px rgba(31, 38, 135, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
        'glass-lg': '0 16px 48px rgba(31, 38, 135, 0.15), 0 24px 64px rgba(31, 38, 135, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.6)',
        'glass-xl': '0 24px 64px rgba(31, 38, 135, 0.2), 0 32px 96px rgba(31, 38, 135, 0.15), inset 0 2px 12px rgba(255, 255, 255, 0.7)',
        'glow-primary': '0 4px 16px rgba(16, 185, 129, 0.25), 0 8px 24px rgba(16, 185, 129, 0.15)',
        'glow-accent': '0 4px 16px rgba(250, 204, 21, 0.3), 0 8px 24px rgba(250, 204, 21, 0.15)',
      },

      // === BACKDROP BLUR ===
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
      },

      // === ANIMATIONS ===
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'mesh-move': 'meshMove 20s ease-in-out infinite',
        'wheel': 'mouseWheel 1.5s ease-in-out infinite',
        'blob-morph': 'blobMorph 10s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)' },
          '50%': { boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)' },
        },
        meshMove: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-5%, 5%) rotate(3deg)' },
          '66%': { transform: 'translate(5%, -5%) rotate(-3deg)' },
        },
        mouseWheel: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0' },
        },
        blobMorph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },

      // === TRANSITIONS ===
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      // === Z-INDEX SYSTEM ===
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },

  // === PLUGINS ===
  plugins: [
    // Forms Plugin (für bessere Form-Styles)
    require('@tailwindcss/forms')({
      strategy: 'class', // .form-input, .form-select, etc.
    }),

    // Custom Plugin für Glassmorphism-Utilities
    function({ addComponents, theme }) {
      addComponents({
        '.glass-ambient': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))',
          backdropFilter: 'blur(5px) saturate(120%)',
          WebkitBackdropFilter: 'blur(5px) saturate(120%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: theme('boxShadow.glass-sm'),
        },
        '.glass-elevated': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.45))',
          backdropFilter: 'blur(15px) saturate(150%)',
          WebkitBackdropFilter: 'blur(15px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: theme('boxShadow.glass'),
        },
        '.glass-card': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: theme('boxShadow.glass'),
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            boxShadow: theme('boxShadow.glass-lg'),
            transform: 'translateY(-4px) scale(1.01)',
          },
        },
        '.glass-hero': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.75))',
          backdropFilter: 'blur(35px) saturate(200%)',
          WebkitBackdropFilter: 'blur(35px) saturate(200%)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          boxShadow: theme('boxShadow.glass-lg'),
        },
        '.glass-overlay': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(45px) saturate(220%)',
          WebkitBackdropFilter: 'blur(45px) saturate(220%)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          boxShadow: theme('boxShadow.glass-xl'),
        },
      });
    },
  ],
};
```

**Vorteile dieser Konfiguration:**
- ✅ Vollständiges Design-Token-System in Tailwind
- ✅ Fluid Typography mit clamp() direkt nutzbar
- ✅ 5-Ebenen Glassmorphism als Utility-Klassen
- ✅ Umfangreiche Animation-Bibliothek
- ✅ Konsistente Z-Index-Hierarchie
- ✅ Forms-Plugin für bessere Input-Styles

---

## 3. CSS-DATEI-STRUKTUR 📁

### Aktuelle Struktur:
```
src/styles/
  └── global.css (253 Zeilen - zu groß!)
```

### 🎯 VORSCHLAG: Modulare Aufteilung

```
src/styles/
├── global.css              # Haupt-Import-Datei
├── base/
│   ├── reset.css           # CSS Reset/Normalize
│   ├── typography.css      # Font-Loading, Base Typography
│   └── accessibility.css   # A11y-Utilities (sr-only, skip-links)
├── tokens/
│   └── design-tokens.css   # CSS Custom Properties
├── components/
│   ├── buttons.css         # Alle Button-Varianten
│   ├── forms.css           # Form-Styles
│   ├── cards.css           # Card-Komponenten
│   └── navigation.css      # Nav-Spezifische Styles
├── utilities/
│   ├── animations.css      # Animation-Utilities
│   ├── glassmorphism.css   # Glas-Effekte (ergänzend zu Tailwind)
│   └── helpers.css         # Sonstige Utilities
└── vendors/
    └── particles.css       # Third-Party CSS (falls nötig)
```

### Haupt-Import (global.css):
```css
/* === TAILWIND BASE === */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* === BASE STYLES === */
@import './base/reset.css';
@import './base/typography.css';
@import './base/accessibility.css';

/* === DESIGN TOKENS === */
@import './tokens/design-tokens.css';

/* === COMPONENTS === */
@import './components/buttons.css';
@import './components/forms.css';
@import './components/cards.css';
@import './components/navigation.css';

/* === UTILITIES === */
@import './utilities/animations.css';
@import './utilities/glassmorphism.css';
@import './utilities/helpers.css';

/* === VENDORS === */
@import './vendors/particles.css';
```

**Vorteile:**
- ✅ Jede Datei < 100 Zeilen (wartbar)
- ✅ Klare Verantwortlichkeiten
- ✅ Einfaches Debugging (Dateiname = Kontext)
- ✅ Tree-Shaking möglich (ungenutzte Imports entfernen)

---

## 4. COMPONENT-STRUKTUR OPTIMIERUNG 🧩

### Aktuelle Komponenten:
```
src/components/
├── Hero.astro            # 129 Zeilen
├── ServiceCard.astro     # 54 Zeilen
├── FeatureSection.astro  # 51 Zeilen
└── ConsentBanner.astro   # 102 Zeilen
```

### 🎯 VORSCHLAG: Erweiterte Komponenten-Bibliothek

```
src/components/
├── layout/
│   ├── BaseLayout.astro        # Hauptlayout (wie bisher)
│   ├── Header.astro            # Navigation (ausgelagert)
│   ├── Footer.astro            # Footer (ausgelagert)
│   └── MobileMenu.astro        # Mobile Nav (neu)
├── ui/
│   ├── Button.astro            # Button-Komponente mit Variants
│   ├── Card.astro              # Basis-Card-Komponente
│   ├── GlassCard.astro         # Glassmorphism-Card
│   ├── Input.astro             # Form-Input
│   ├── Select.astro            # Form-Select
│   └── Modal.astro             # Modal-Overlay
├── sections/
│   ├── Hero.astro              # Hero-Section
│   ├── FeatureGrid.astro       # Feature-Grids
│   ├── ServiceGrid.astro       # Service-Übersicht
│   ├── Stats.astro             # Animated Counters
│   └── CTA.astro               # Call-to-Action Sections
├── features/
│   ├── ServiceCard.astro       # Service-Card (wie bisher)
│   ├── StatCounter.astro       # Einzelner Stat mit Animation
│   ├── TestimonialCard.astro   # Kundenbewertung
│   └── ProjectCard.astro       # Referenz-Projekt
└── utils/
    ├── ConsentBanner.astro     # Cookie-Banner
    ├── ScrollIndicator.astro   # Scroll-Hinweis
    └── BackToTop.astro         # Back-to-Top Button
```

### Beispiel: Button-Komponente mit Variants

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  class: className = '',
} = Astro.props;

const baseClasses = 'btn';
const variantClasses = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
};
const sizeClasses = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const classes = [
  baseClasses,
  variantClasses[variant],
  sizeClasses[size],
  fullWidth && 'w-full',
  className,
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
const props = href
  ? { href }
  : { type, disabled };
---

<Component class={classes} {...props}>
  <slot />
</Component>

<style>
  /* Basis-Button-Styles aus buttons.css
     werden hier via Tailwind oder @apply genutzt */
</style>
```

**Nutzung:**
```astro
<!-- Verschiedene Button-Varianten -->
<Button variant="primary" size="lg" href="/kontakt">
  Jetzt anfragen
</Button>

<Button variant="accent" size="xl">
  Kostenlose Beratung
  <svg>...</svg>
</Button>

<Button variant="secondary" size="md">
  Mehr erfahren
</Button>

<Button variant="ghost" size="sm">
  Abbrechen
</Button>
```

**Vorteile:**
- ✅ Konsistente Button-Nutzung projekt-weit
- ✅ Variants via Props (typsicher durch TypeScript)
- ✅ Einmal definiert, überall wiederverwendbar
- ✅ Einfache Wartung (eine Änderung = alle Buttons)

---

## 5. JAVASCRIPT-OPTIMIERUNG 🚀

### Aktueller Zustand:
```javascript
// BaseLayout.astro - Inline-Scripts
// Imperativer Code mit DOM-Manipulation
```

### 🎯 VORSCHLAG: Utility-Funktionen auslagern

```
src/scripts/
├── utils/
│   ├── animations.ts       # Animation-Helpers
│   ├── intersection.ts     # IntersectionObserver-Wrapper
│   └── focus-trap.ts       # Focus-Management
├── components/
│   ├── mobile-menu.ts      # Mobile-Menu-Logik
│   ├── consent-banner.ts   # Cookie-Banner-Logik
│   └── animated-counter.ts # Zahlen-Counter
└── index.ts                # Haupt-Export
```

### Beispiel: IntersectionObserver-Utility

```typescript
// src/scripts/utils/intersection.ts

interface ObserveOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Observes elements and calls callback when they intersect viewport
 */
export function observeIntersection(
  selector: string,
  callback: (entry: IntersectionObserverEntry) => void,
  options: ObserveOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = false } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold, rootMargin }
  );

  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => observer.observe(el));

  return observer;
}

/**
 * Animates elements on scroll with class toggle
 */
export function animateOnScroll(selector = '.animate-on-scroll') {
  return observeIntersection(
    selector,
    (entry) => {
      entry.target.classList.add('visible');
    },
    { once: true }
  );
}
```

### Nutzung in BaseLayout:

```astro
---
// BaseLayout.astro
---

<!-- ... HTML ... -->

<script>
  import { animateOnScroll } from '../scripts/utils/intersection';

  // Initialisierung
  document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll('.animate-on-scroll');
  });
</script>
```

**Vorteile:**
- ✅ TypeScript für Type-Safety
- ✅ Wiederverwendbare Funktionen
- ✅ Einfaches Testing möglich
- ✅ Weniger Redundanz

---

## 6. PERFORMANCE-OPTIMIERUNGEN ⚡

### 🎯 VORSCHLAG: Code-Splitting & Lazy Loading

**1. Critical CSS Inlining:**
```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto', // Inline small CSS files
  },
});
```

**2. Component Lazy Loading:**
```astro
---
// Nur laden, wenn Komponente sichtbar wird
const ConsentBanner = import.meta.env.SSR
  ? (await import('../components/utils/ConsentBanner.astro')).default
  : null;
---

{ConsentBanner && <ConsentBanner />}
```

**3. Image Optimization:**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero-garden.jpg';
---

<Image
  src={heroImage}
  alt="Gartengestaltung"
  width={1920}
  height={1080}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

**4. Font Optimization:**
```html
<!-- Self-Hosted Fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<style>
  @font-face {
    font-family: 'Inter Variable';
    src: url('/fonts/inter-var.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-display: swap;
  }
</style>
```

---

## 7. SEMANTISCHES HTML REVIEW 📝

### Aktuelle Struktur: ✅ Größtenteils korrekt

### Verbesserungen:

**1. Heading-Hierarchie strenger:**
```html
<!-- ❌ FALSCH (Hierarchie übersprungen) -->
<h1>Haupttitel</h1>
<h3>Untertitel</h3>

<!-- ✅ RICHTIG -->
<h1>Haupttitel</h1>
<h2>Untertitel</h2>
```

**2. Landmarks korrekt nutzen:**
```html
<!-- Alle Seiten-Bereiche als Landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Hauptnavigation">...</nav>
</header>

<main role="main" id="main-content">
  <article>...</article>
</main>

<aside role="complementary" aria-label="Zusätzliche Informationen">
  ...
</aside>

<footer role="contentinfo">...</footer>
```

**3. Listen semantisch:**
```html
<!-- Navigation als Liste -->
<nav>
  <ul>
    <li><a href="/leistungen">Leistungen</a></li>
    <li><a href="/kontakt">Kontakt</a></li>
  </ul>
</nav>
```

---

## 8. TYPESCRIPT-INTEGRATION STÄRKEN 📘

### Aktuelle Interfaces: ✅ Vorhanden

### 🎯 VORSCHLAG: Shared Types

```
src/types/
├── components.ts   # Komponenten-Props
├── content.ts      # Content-Types
└── index.ts        # Haupt-Export
```

### Beispiel: Shared Types

```typescript
// src/types/components.ts

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  class?: string;
}

export interface CardProps {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  variant?: 'default' | 'featured' | 'highlight';
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  height?: 'normal' | 'tall' | 'full';
  showStats?: boolean;
}

// ... weitere Types
```

**Nutzung:**
```astro
---
import type { ButtonProps } from '../types/components';

interface Props extends ButtonProps {}

const { variant = 'primary', size = 'md', ...props } = Astro.props;
---
```

---

## 📋 ZUSAMMENFASSUNG - UMSETZUNGSPLAN

### Phase 1: Foundation (Tag 1-2)
1. ✅ Erweiterte Tailwind-Config implementieren
2. ✅ CSS-Dateien modular aufteilen
3. ✅ Shared Types erstellen

### Phase 2: Komponenten (Tag 3-4)
4. ✅ Button-Komponente mit Variants
5. ✅ Card-Komponenten-Familie
6. ✅ Header/Footer auslagern

### Phase 3: Utils & Optimierung (Tag 5-6)
7. ✅ TypeScript-Utilities schreiben
8. ✅ Image-Optimierung
9. ✅ Font Self-Hosting

### Phase 4: Testing & Polishing (Tag 7)
10. ✅ Semantisches HTML reviewen
11. ✅ Performance-Audit
12. ✅ Accessibility-Tests

---

## 🏆 ERWARTETES ERGEBNIS

**Vorher:**
- 1 CSS-Datei (253 Zeilen)
- Inline-Scripts in Layout
- Tailwind + Custom CSS gemischt
- Keine Component-Variants

**Nachher:**
- Modulare CSS-Struktur (10+ Dateien à <100 Zeilen)
- TypeScript-Utilities ausgelagert
- Vollständiges Tailwind-Design-Token-System
- Wiederverwendbare Komponenten mit Variants
- 20%+ kleinere CSS-Bundles (PurgeCSS-Optimierung)

**Code-Qualität:**
- ✅ Wartbar (klare Datei-Struktur)
- ✅ Skalierbar (Design-Token-System)
- ✅ Typsicher (TypeScript überall)
- ✅ Performant (Code-Splitting, Lazy Loading)

*Nächster Schritt: Abschnitt 4 - Design-Umsetzung*
