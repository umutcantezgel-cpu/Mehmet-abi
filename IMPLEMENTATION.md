# Abschnitt 4: Umsetzung der Design- und Funktions-Erweiterungen
## Produktionsreifer Code für Premium-Website

**Datum:** 2025-11-13
**Fokus:** Konkrete Implementierung aller vorgeschlagenen Verbesserungen
**Status:** Ready for Production

---

## 📦 IMPLEMENTIERUNGS-ÜBERSICHT

Die folgenden Code-Beispiele sind **produktionsreif** und können direkt in die Website integriert werden. Jeder Abschnitt enthält:

1. Vollständigen HTML/Astro-Code
2. Styling (Tailwind + Custom CSS)
3. JavaScript/TypeScript (falls nötig)
4. Kommentare zur Erklärung

---

## 1. ANIMIERTER MESH-GRADIENT HINTERGRUND 🌈

### Datei: `src/components/layout/AnimatedBackground.astro`

```astro
---
/**
 * Animierter Mesh-Gradient Hintergrund
 * - Organische Blob-Shapes mit Morphing-Animation
 * - GPU-beschleunigt via CSS
 * - Responsive & Performance-optimiert
 */
---

<div class="animated-background" aria-hidden="true"></div>

<style>
  .animated-background {
    /* Fixed positioning für Fullscreen-Hintergrund */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    /* Basis-Hintergrund */
    background: #fafafa;
  }

  .animated-background::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;

    /* Multi-Radial-Gradient Mesh */
    background:
      radial-gradient(
        circle at 20% 30%,
        rgba(16, 185, 129, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(46, 125, 70, 0.12) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(250, 204, 21, 0.08) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 90% 20%,
        rgba(220, 252, 231, 0.3) 0%,
        transparent 50%
      );

    /* Sanfte Mesh-Bewegung */
    animation: meshMove 20s ease-in-out infinite;
  }

  @keyframes meshMove {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(-5%, 5%) rotate(3deg);
    }
    66% {
      transform: translate(5%, -5%) rotate(-3deg);
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .animated-background::before {
      animation: none;
    }
  }
</style>
```

**Integration in BaseLayout.astro:**
```astro
---
import AnimatedBackground from '../components/layout/AnimatedBackground.astro';
---

<!doctype html>
<html lang="de">
  <body>
    <AnimatedBackground />
    <!-- Rest des Layouts -->
  </body>
</html>
```

---

## 2. ERWEITERTE TAILWIND-KONFIGURATION 🎨

### Datei: `tailwind.config.cjs` (VOLLSTÄNDIG)

```javascript
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
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
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },

      fontFamily: {
        sans: ['Inter Variable', 'Inter', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.825rem + 0.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.65vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.2rem + 1.25vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.4rem + 2vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.6rem + 2.75vw, 3.5rem)',
        'fluid-5xl': 'clamp(3rem, 2rem + 4.5vw, 5rem)',
      },

      boxShadow: {
        'glass-sm': '0 2px 8px rgba(31, 38, 135, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.12), 0 16px 48px rgba(31, 38, 135, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
        'glass-lg': '0 16px 48px rgba(31, 38, 135, 0.15), 0 24px 64px rgba(31, 38, 135, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.6)',
        'glass-xl': '0 24px 64px rgba(31, 38, 135, 0.2), 0 32px 96px rgba(31, 38, 135, 0.15), inset 0 2px 12px rgba(255, 255, 255, 0.7)',
        'glow-primary': '0 4px 16px rgba(16, 185, 129, 0.25), 0 8px 24px rgba(16, 185, 129, 0.15)',
        'glow-accent': '0 4px 16px rgba(250, 204, 21, 0.3), 0 8px 24px rgba(250, 204, 21, 0.15)',
      },

      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px',
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'wheel': 'mouseWheel 1.5s ease-in-out infinite',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)' },
          '50%': { boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)' },
        },
        mouseWheel: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
    },
  },

  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        // === GLASSMORPHISM SYSTEM ===
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
      });
    },
  ],
};
```

---

## 3. BUTTON-SYSTEM MIT VARIANTS 🔘

### Datei: `src/styles/components/buttons.css`

```css
/* ===================================
   BUTTON SYSTEM - Premium Design
   =================================== */

/* === BASE BUTTON === */
.btn {
  /* Reset */
  appearance: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* Typography */
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;

  /* Transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Accessibility */
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
}

.btn:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 3px;
}

.btn:active {
  transform: scale(0.96);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* === SIZE VARIANTS === */

.btn-xs {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  min-height: 32px;
}

.btn-sm {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  border-radius: 0.625rem;
  min-height: 36px;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  min-height: 44px; /* WCAG Touch Target */
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  border-radius: 1rem;
  min-height: 52px;
}

.btn-xl {
  padding: 1.25rem 2.5rem;
  font-size: 1.25rem;
  border-radius: 1.25rem;
  min-height: 60px;
}

/* === STYLE VARIANTS === */

/* PRIMARY: Hauptaktionen */
.btn-primary {
  background: linear-gradient(135deg, theme('colors.primary.500'), theme('colors.primary.700'));
  color: white;
  box-shadow:
    0 4px 12px rgba(16, 185, 129, 0.25),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Shine-Effekt */
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  background: linear-gradient(135deg, theme('colors.primary.400'), theme('colors.primary.600'));
  box-shadow:
    0 8px 20px rgba(16, 185, 129, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* ACCENT: Wichtige CTAs */
.btn-accent {
  background: linear-gradient(135deg, theme('colors.accent.400'), theme('colors.accent.600'));
  color: theme('colors.earth.900');
  box-shadow:
    0 4px 12px rgba(250, 204, 21, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 700;
}

.btn-accent:hover {
  background: linear-gradient(135deg, theme('colors.accent.300'), theme('colors.accent.500'));
  box-shadow:
    0 8px 20px rgba(250, 204, 21, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px) scale(1.02);
}

/* SECONDARY: Sekundäre Aktionen (Glassmorphism) */
.btn-secondary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4));
  color: theme('colors.primary.700');
  backdrop-filter: blur(15px) saturate(150%);
  -webkit-backdrop-filter: blur(15px) saturate(150%);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.65));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.12),
    inset 0 1px 3px rgba(255, 255, 255, 0.6);
  transform: translateY(-1px);
}

/* GHOST: Subtile Aktionen */
.btn-ghost {
  background: transparent;
  color: theme('colors.primary.700');
}

.btn-ghost:hover {
  background: rgba(16, 185, 129, 0.1);
}

/* OUTLINE: Alternative Stil */
.btn-outline {
  background: transparent;
  color: theme('colors.primary.700');
  border: 2px solid theme('colors.primary.500');
}

.btn-outline:hover {
  background: theme('colors.primary.500');
  color: white;
  border-color: theme('colors.primary.500');
}

/* === RIPPLE EFFECT (click) === */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.btn::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  top: 50%;
  left: 50%;
  transform: scale(0);
  pointer-events: none;
}

.btn:active::after {
  animation: ripple 0.6s ease-out;
}

/* === ICON ANIMATION === */
.btn svg {
  transition: transform 0.3s ease;
}

.btn:hover svg {
  transform: translateX(3px);
}

/* === FULL WIDTH VARIANT === */
.btn-full {
  width: 100%;
}

/* === LOADING STATE === */
.btn-loading {
  pointer-events: none;
  opacity: 0.7;
}

.btn-loading::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Komponente: `src/components/ui/Button.astro`

```astro
---
/**
 * Premium Button Component mit Variants
 */
interface Props {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  loading = false,
  class: className = '',
} = Astro.props;

const classes = [
  'btn',
  `btn-${variant}`,
  `btn-${size}`,
  fullWidth && 'btn-full',
  loading && 'btn-loading',
  className,
].filter(Boolean).join(' ');

const Component = href ? 'a' : 'button';
const props = href
  ? { href }
  : { type, disabled: disabled || loading };
---

<Component class={classes} {...props}>
  <slot />
</Component>
```

**Nutzung:**
```astro
<!-- Verschiedene Variants -->
<Button variant="primary" size="lg">
  Jetzt anfragen
</Button>

<Button variant="accent" size="xl">
  Kostenlose Beratung
  <svg>...</svg>
</Button>

<Button variant="secondary" href="/leistungen">
  Mehr erfahren
</Button>

<Button variant="ghost" size="sm">
  Abbrechen
</Button>
```

---

## 4. PREMIUM MOBILE MENU 📱

### Datei: `src/components/layout/MobileMenu.astro`

```astro
---
/**
 * Premium Mobile Menu mit Slide-In & Icon-Morphing
 */
---

<!-- Mobile Menu Button -->
<button
  id="mobile-menu-btn"
  class="menu-toggle md:hidden"
  aria-label="Menü öffnen"
  aria-expanded="false"
  aria-controls="mobile-menu"
>
  <span class="menu-icon">
    <span class="line line-1"></span>
    <span class="line line-2"></span>
    <span class="line line-3"></span>
  </span>
</button>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="mobile-menu" aria-hidden="true">
  <div class="mobile-menu-backdrop"></div>

  <nav class="mobile-menu-panel" role="navigation" aria-label="Mobile Navigation">
    <div class="mobile-menu-header">
      <span class="logo">Memo-BauT</span>
      <button class="menu-close" aria-label="Menü schließen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <ul class="mobile-menu-links">
      <li style="--delay: 0.1s">
        <a href="/leistungen">Leistungen</a>
      </li>
      <li style="--delay: 0.15s">
        <a href="/ueber-uns">Über uns</a>
      </li>
      <li style="--delay: 0.2s">
        <a href="/referenzen">Referenzen</a>
      </li>
    </ul>

    <div class="mobile-menu-footer" style="--delay: 0.25s">
      <a href="/kontakt" class="btn-accent btn-lg w-full">
        Jetzt anfragen
      </a>
      <a href="tel:+4917670162293" class="btn-secondary btn-md w-full mt-3">
        📞 +49 176 70162293
      </a>
    </div>
  </nav>
</div>

<style>
  /* === HAMBURGER ICON === */
  .menu-toggle {
    width: 44px;
    height: 44px;
    border: none;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4));
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .menu-icon {
    width: 24px;
    height: 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .line {
    display: block;
    width: 100%;
    height: 2px;
    background: theme('colors.primary.700');
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: center;
  }

  /* MORPHING: Hamburger → X */
  .menu-toggle[aria-expanded="true"] .line-1 {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle[aria-expanded="true"] .line-2 {
    opacity: 0;
    transform: scaleX(0);
  }

  .menu-toggle[aria-expanded="true"] .line-3 {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* === MOBILE MENU OVERLAY === */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mobile-menu[aria-hidden="false"] {
    pointer-events: all;
    opacity: 1;
  }

  /* Backdrop mit Blur */
  .mobile-menu-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mobile-menu[aria-hidden="false"] .mobile-menu-backdrop {
    opacity: 1;
  }

  /* Panel mit Slide-In */
  .mobile-menu-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.9)
    );
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    box-shadow:
      -8px 0 32px rgba(0, 0, 0, 0.15),
      -16px 0 48px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .mobile-menu[aria-hidden="false"] .mobile-menu-panel {
    transform: translateX(0);
  }

  /* Header */
  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, theme('colors.primary.500'), theme('colors.primary.700'));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .menu-close {
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: theme('colors.gray.700');
    transition: background 0.2s ease;
  }

  .menu-close:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  /* Links mit Stagger */
  .mobile-menu-links {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
  }

  .mobile-menu-links li {
    opacity: 0;
    transform: translateX(20px);
    transition:
      opacity 0.4s ease,
      transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: var(--delay);
  }

  .mobile-menu[aria-hidden="false"] .mobile-menu-links li {
    opacity: 1;
    transform: translateX(0);
  }

  .mobile-menu-links a {
    display: block;
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: theme('colors.gray.900');
    text-decoration: none;
    position: relative;
    transition: color 0.2s ease;
  }

  .mobile-menu-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, theme('colors.primary.500'), theme('colors.primary.700'));
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .mobile-menu-links a:hover {
    color: theme('colors.primary.600');
  }

  .mobile-menu-links a:hover::after {
    width: 60px;
  }

  /* Footer mit CTA */
  .mobile-menu-footer {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.4s ease,
      transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: var(--delay);
  }

  .mobile-menu[aria-hidden="false"] .mobile-menu-footer {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script>
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const backdrop = menu?.querySelector('.mobile-menu-backdrop');
  const closeBtn = menu?.querySelector('.menu-close');

  function openMenu() {
    menuBtn?.setAttribute('aria-expanded', 'true');
    menu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first link
    const firstLink = menu?.querySelector('.mobile-menu-links a');
    (firstLink as HTMLElement)?.focus();
  }

  function closeMenu() {
    menuBtn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuBtn?.focus();
  }

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  // ESC closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.getAttribute('aria-hidden') === 'false') {
      closeMenu();
    }
  });

  // Close menu on navigation
  menu?.querySelectorAll('.mobile-menu-links a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
</script>
```

---

## 5. ENHANCED HERO MIT 3D & ANIMATIONEN 🎭

### Datei: `src/components/sections/HeroPremium.astro`

```astro
---
/**
 * Premium Hero mit 3D-Tilt, Animated Counters, Split-Text
 */
interface Props {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const {
  title,
  subtitle = 'Professioneller Garten- und Landschaftsbau in Werdorf & Umgebung seit über 20 Jahren.',
  ctaText = 'Kostenlose Beratung',
  ctaLink = '/kontakt',
} = Astro.props;

const stats = [
  { number: 20, suffix: '+', label: 'Jahre Erfahrung' },
  { number: 500, suffix: '+', label: 'Projekte' },
  { number: 100, suffix: '%', label: 'Zufriedenheit' },
];
---

<section class="hero-premium">
  <!-- Animated Background wird von AnimatedBackground.astro gerendert -->

  <div class="hero-container">
    <div class="hero-card-3d glass-hero rounded-4xl p-8 md:p-16 max-w-5xl mx-auto">
      <!-- Title mit Split-Text-Animation -->
      <h1 class="hero-title mb-6">
        {title.split('.').map((line, index) => (
          <span
            class="hero-title-line"
            style={`animation-delay: ${0.2 + index * 0.2}s`}
          >
            {line.trim()}{line.includes('.') ? '.' : ''}
          </span>
        ))}
      </h1>

      <!-- Subtitle -->
      {subtitle && (
        <p class="hero-subtitle text-fluid-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}

      <!-- CTAs -->
      <div class="hero-ctas flex flex-wrap gap-4 justify-center mb-12">
        <a href={ctaLink} class="btn-accent btn-xl">
          {ctaText}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a href="#leistungen" class="btn-secondary btn-xl">
          Leistungen ansehen
        </a>
      </div>

      <!-- Animated Stats -->
      <div class="hero-stats grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t-2 border-primary-200">
        {stats.map((stat) => (
          <div class="stat-item text-center">
            <div
              class="stat-number text-fluid-5xl font-extrabold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-2"
              data-target={stat.number}
              data-suffix={stat.suffix}
            >
              0{stat.suffix}
            </div>
            <div class="stat-label text-sm md:text-base text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <div class="scroll-indicator">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
    <span>Scroll</span>
  </div>
</section>

<style>
  .hero-premium {
    position: relative;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    perspective: 1500px;
    overflow: hidden;
  }

  .hero-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  /* 3D-Card */
  .hero-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Split-Text Animation */
  .hero-title {
    text-align: center;
    overflow: hidden;
  }

  .hero-title-line {
    display: block;
    opacity: 0;
    transform: translateY(100%);
    animation: slideUpReveal 1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  }

  @keyframes slideUpReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Subtitle Fade-In */
  .hero-subtitle {
    opacity: 0;
    animation: fadeInUp 1s ease forwards 0.6s;
  }

  /* CTAs Fade-In */
  .hero-ctas {
    opacity: 0;
    animation: fadeInUp 1s ease forwards 0.8s;
  }

  /* Stats Fade-In */
  .hero-stats {
    opacity: 0;
    animation: fadeInUp 1s ease forwards 1s;
  }

  /* Scroll Indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1.2s;
  }

  .mouse {
    width: 28px;
    height: 44px;
    border: 2px solid theme('colors.primary.600');
    border-radius: 14px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }

  .wheel {
    width: 4px;
    height: 8px;
    background: theme('colors.primary.600');
    border-radius: 2px;
    animation: wheel 1.5s ease-in-out infinite;
  }

  .scroll-indicator span {
    font-size: 0.75rem;
    color: theme('colors.gray.500');
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .hero-stats {
      grid-template-columns: 1fr;
    }

    .scroll-indicator {
      display: none;
    }
  }
</style>

<script>
  // === 3D-TILT EFFECT ===
  const card = document.querySelector('.hero-card-3d') as HTMLElement;

  if (card && window.innerWidth > 768) {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 5; // Max 5deg
      const rotateY = ((centerX - x) / centerX) * 5;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // === ANIMATED COUNTERS ===
  function animateCounter(element: HTMLElement) {
    const target = parseInt(element.dataset.target || '0');
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    updateCounter();
  }

  // Intersection Observer für Counter-Start
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
</script>
```

---

## 6. FLUID TYPOGRAPHY SETUP ✍️

### Datei: `src/styles/base/typography.css`

```css
/* ===================================
   FLUID TYPOGRAPHY SYSTEM
   =================================== */

@layer base {
  /* Font Loading */
  @font-face {
    font-family: 'Inter Variable';
    src: url('/fonts/inter-var.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-display: swap;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter Variable', 'Inter', system-ui, sans-serif;
    font-optical-sizing: auto;
    font-feature-settings:
      'cv02' on, /* Alternativen für g */
      'cv03' on, /* Alternativen für l */
      'cv04' on, /* Alternativen für i */
      'cv11' on, /* Alternativen für 0 */
      'calt' on, /* Contextual Alternates */
      'kern' on; /* Kerning */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* === HEADING HIERARCHY === */

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: theme('colors.gray.900');
  }

  h1 {
    font-size: theme('fontSize.fluid-5xl');
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  h2 {
    font-size: theme('fontSize.fluid-4xl');
    line-height: 1.15;
  }

  h3 {
    font-size: theme('fontSize.fluid-3xl');
  }

  h4 {
    font-size: theme('fontSize.fluid-2xl');
    font-weight: 600;
  }

  h5 {
    font-size: theme('fontSize.fluid-xl');
    font-weight: 600;
  }

  h6 {
    font-size: theme('fontSize.fluid-lg');
    font-weight: 600;
  }

  /* === BODY TEXT === */

  p {
    font-size: theme('fontSize.fluid-base');
    line-height: 1.75;
    color: theme('colors.gray.700');
    max-width: 65ch;
  }

  /* Lead Text (Intro-Absätze) */
  .text-lead {
    font-size: theme('fontSize.fluid-xl');
    font-weight: 300;
    line-height: 1.75;
    color: theme('colors.gray.600');
    max-width: 60ch;
  }

  /* Small Text */
  .text-small {
    font-size: theme('fontSize.fluid-sm');
  }

  /* Links */
  a {
    transition: color 0.2s ease;
  }
}

/* === RESPONSIVE TYPOGRAPHY === */

/* Mobile adjustments */
@media (max-width: 640px) {
  h1 { letter-spacing: -0.02em; }
  h2 { letter-spacing: -0.015em; }
}

/* Desktop enhancements */
@media (min-width: 1280px) {
  h1 { letter-spacing: -0.04em; }
  p { font-size: 1.125rem; }
}
```

---

## 📦 DEPLOYMENT-READY PACKAGE

### Zusammenfassung der Implementierungen:

1. ✅ **Animierter Hintergrund** (`AnimatedBackground.astro`)
2. ✅ **Erweiterte Tailwind-Config** (`tailwind.config.cjs`)
3. ✅ **Button-System** (`buttons.css` + `Button.astro`)
4. ✅ **Premium Mobile Menu** (`MobileMenu.astro`)
5. ✅ **Enhanced Hero** (`HeroPremium.astro`)
6. ✅ **Fluid Typography** (`typography.css`)

### Integration-Checklist:

```bash
# 1. Dateien erstellen
cp IMPLEMENTATION.md src/

# 2. Komponenten hinzufügen
# - AnimatedBackground.astro → src/components/layout/
# - Button.astro → src/components/ui/
# - MobileMenu.astro → src/components/layout/
# - HeroPremium.astro → src/components/sections/

# 3. Styles hinzufügen
# - buttons.css → src/styles/components/
# - typography.css → src/styles/base/

# 4. Tailwind-Config ersetzen
# - tailwind.config.cjs (root)

# 5. Build testen
npm run build

# 6. Dev-Server starten
npm run dev
```

**Erwartetes Ergebnis:**
- ✅ Animierter Mesh-Gradient-Hintergrund
- ✅ 5-Ebenen Glassmorphism-System
- ✅ Konsistente Button-Varianten
- ✅ Premium Mobile Menu mit Slide-In
- ✅ Hero mit 3D-Tilt & Animated Counters
- ✅ Flüssige Typografie auf allen Geräten

*Nächster Schritt: Abschnitt 5 - Design-Entscheidungen erläutern*
