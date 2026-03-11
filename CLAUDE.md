# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript** (strict mode, target ES2017)
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, configured through `postcss.config.mjs`
- **Geist** fonts (sans + mono) loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`
- **next-intl** — i18n (EN/RU/ES), middleware in `src/proxy.ts` (Next.js 16 renames middleware → proxy)
- **next-themes** — dark mode, class-based (`ThemeProvider attribute="class"`)

## Architecture

All source lives under `src/`. Path alias `@/*` maps to `src/*`.

```
src/
├── app/
│   ├── layout.tsx                  # root layout, Geist fonts, suppressHydrationWarning
│   ├── globals.css                 # Tailwind v4 + CSS design tokens + @custom-variant dark
│   ├── page.tsx                    # redirects to /[locale]
│   └── [locale]/
│       ├── layout.tsx              # NextIntlClientProvider + Providers + Header
│       ├── page.tsx                # HeroSlider
│       ├── about/page.tsx
│       ├── contacts/page.tsx
│       └── projects/
│           ├── page.tsx            # project grid
│           └── [slug]/page.tsx     # project detail
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # fixed header; logo = Logo component (left), nav, controls (right)
│   │   ├── Logo.tsx                # circular avatar + rainbow ring animation
│   │   ├── Logo.module.css         # CSS module: ring keyframes, wrapper, inner clip
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx    # EN/RU/ES flags
│   │   ├── ProjectsDropdown.tsx
│   │   ├── MobileMenu.tsx          # full-screen, z-50, focus-trap
│   │   └── Dropdown.tsx            # shared dropdown (click/hover, align left/right)
│   ├── home/
│   │   └── HeroSlider.tsx          # 9-slide carousel, 5s autoplay, prefers-reduced-motion
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── TechTag.tsx
│   │   ├── GitHubStats.tsx
│   │   ├── LanguagesBar.tsx
│   │   └── EmbedFrame.tsx
│   ├── ui/
│   │   ├── Icon.tsx                # inline SVG icons (13 types)
│   │   └── Dropdown.tsx
│   └── providers/
│       └── Providers.tsx           # ThemeProvider wrapper
├── i18n/
│   ├── routing.ts                  # defineRouting locales + defaultLocale
│   ├── request.ts                  # getRequestConfig (server-side)
│   └── navigation.ts               # Link, useRouter, usePathname — use these, NOT next/navigation
├── lib/
│   ├── projects.ts                 # 6 projects with typed interface + getProjectBySlug
│   └── github.ts
├── messages/{en,ru,es}.json
├── proxy.ts                        # next-intl createMiddleware
└── global.d.ts                     # IntlMessages type
```

## Key Architecture Notes

- `params` in Next.js 16 is a **Promise** — always `const { locale } = await params`
- `useTranslations` in server components needs `setRequestLocale(locale)` called first
- Navigation: always import from `@/i18n/navigation`, never from `next/navigation`
- `NextIntlClientProvider` with no `messages` prop — auto-inherits via plugin
- Tailwind v4 dark mode: `@custom-variant dark (&:where(.dark, .dark *))` in globals.css

## CSS Design Tokens

Defined in `globals.css`, available as `var(--name)` and Tailwind utilities:

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#ffffff` | `#0a0a0a` |
| `--foreground` | `#171717` | `#ededed` |
| `--surface` | `#f4f4f5` | `#18181b` |
| `--border` | `#e4e4e7` | `#27272a` |
| `--muted` | `#71717a` | `#a1a1aa` |
| `--accent` | `#3b82f6` | `#60a5fa` |

## Public Assets

```
public/
└── images/
    ├── slider/slide-1.jpg … slide-9.jpg   # hero carousel
    └── avatar.jpeg                         # avatar photo (used in header logo)
src/app/icon.png                            # circular favicon generated from avatar via sharp
```

Images use `next/image` with `fill` + `sizes` + `priority` for above-the-fold.

## Build Status

`npm run build` ✅ — 28 static pages, 3 locales × all routes
