# Portfolio

> **Live:** [bejewelled-faun-ac8bce.netlify.app](https://bejewelled-faun-ac8bce.netlify.app/)

Personal portfolio of a Senior Frontend Developer with 9+ years of experience. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

---

## Features

- **Multilingual** — English, Russian, Spanish (next-intl)
- **Dark / Light mode** — class-based theming (next-themes)
- **Hero slider** — 9-slide photo carousel with autoplay
- **Projects showcase** — 6 projects with live embeds, GitHub stats, language bars, and README previews
- **Responsive** — mobile menu with focus-trap, adaptive layouts across all pages
- **Static generation** — 34 pages prerendered at build time across 3 locales

## Stack

| Layer     | Tech                          |
| --------- | ----------------------------- |
| Framework | Next.js 16 (App Router)       |
| UI        | React 19, Tailwind CSS v4     |
| Language  | TypeScript (strict)           |
| i18n      | next-intl (EN / RU / ES)      |
| Theming   | next-themes (dark mode)       |
| Fonts     | Geist Sans & Mono (next/font) |

## Projects Showcased

| Project                                                             | Stack                                    |
| ------------------------------------------------------------------- | ---------------------------------------- |
| [Netflix-ChatGPT](https://github.com/enoxlaalu/netflix-chatGPT)     | React, TypeScript, OpenAI API, Tailwind  |
| [Spotify Clone](https://github.com/enoxlaalu/spotify-nextjs-nestjs) | Next.js, NestJS, MongoDB, Redux Toolkit  |
| [AitiGuru](https://github.com/enoxlaalu/AitiGuru)                   | React 19, Zustand, Zod, CSS Modules      |
| [Timberhub](https://github.com/enoxlaalu/timberhub)                 | Next.js 13, TypeScript, SCSS, App Router |
| [Mozio Travel](https://github.com/enoxlaalu/mozio)                  | React, MUI, React Hook Form, Cypress     |
| [Chess (OOP)](https://github.com/enoxlaalu/react-chess-oop)         | React, TypeScript, Vite                  |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Structure

```
src/
├── app/[locale]/        # pages: home, about, contacts, projects/[slug]
├── components/          # layout, home, projects, ui, providers
├── i18n/                # routing, request config, navigation
├── lib/                 # projects data, github api
└── messages/            # en.json, ru.json, es.json
```
