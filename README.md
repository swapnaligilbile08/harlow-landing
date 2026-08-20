# Harlow — A Motorcycle Brand, Reimagined in Bloom

A single-page, premium landing experience built for a reimagined brand
concept: what if a legendary motorcycle marque had chosen fragrance over
horsepower? Harlow takes that rebel, chrome-and-leather identity and pours it
into luxury florals, fragrance, and candles — a cinematic boot animation,
glassmorphism UI, scroll-reveal transitions, and a filterable product
showcase.

![Harlow hero preview](public/images/hero-harlow.jpg)

---

## The Concept

Harlow is a creative reimagining exercise: take a globally recognizable
brand and flip it into something completely opposite to what it actually is.
Here, the loud, rugged, open-road identity of a classic motorcycle brand is
reimagined as a hushed, sensory, luxury fragrance house — roses instead of
chrome, candlelight instead of headlights.

This is an independent, unaffiliated creative/portfolio project, not a real
product and not endorsed by any motorcycle manufacturer.

---

## Tech Stack

| Layer      | Choice                     |
|------------|-----------------------------|
| Framework  | Next.js 16 (App Router)    |
| Language   | TypeScript                 |
| UI Library | React 19                   |
| Styling    | Tailwind CSS 4 + custom CSS |
| Backend    | None — static, client-rendered |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### 3. Build for production

```bash
npm run build
npm start
```

### Other useful scripts

```bash
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript in check-only mode
```

---

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout, fonts, metadata
    page.tsx         # The entire landing page (single route)
    globals.css       # Design system, glassmorphism, animations, breakpoints
public/
  images/
    hero-harlow.jpg     # Brand hero image
```

Everything on the page — products, testimonials, nav links, copy — is defined
directly inside `page.tsx`. There's no CMS or database; content changes mean
editing that file.

---

## Deploying to Vercel

1. Push this repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** — Vercel detects this automatically.
   No environment variables are required.
4. Click **Deploy**. You'll get a live `*.vercel.app` URL once the build finishes.

---

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Harlow — a motorcycle brand, reimagined in bloom"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

> Keep the repository **public** if you need it visible for grading, review,
> or portfolio purposes.

---

## Notes

- Product photography is sourced from [Pexels](https://www.pexels.com)
  (royalty-free), aside from the brand's own hero photo at
  `public/images/hero-harlow.jpg`.
- No `.env` file is required — there's nothing to configure.
- Dark/light theme, cart count, and animations all live in component state;
  none of it persists across page reloads yet.
