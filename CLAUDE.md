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

## Architecture

All source lives under `src/`. Path alias `@/*` maps to `src/*`.

The app uses the Next.js App Router:
- `src/app/layout.tsx` — root layout, sets fonts and global metadata
- `src/app/globals.css` — global styles with CSS custom properties for background/foreground colors; dark mode handled via `prefers-color-scheme` media query and `@theme inline` Tailwind block
- `src/app/page.tsx` — home page (currently the default scaffold)

CSS design tokens (`--background`, `--foreground`, `--color-background`, `--color-foreground`, `--font-sans`, `--font-mono`) are defined in `globals.css` and available as Tailwind utilities via the `@theme inline` block.
