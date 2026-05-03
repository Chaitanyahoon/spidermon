# Chaitanya Patil Portfolio

Spider-Man inspired portfolio for Chaitanya Patil, built with Next.js, React, Tailwind CSS, and Framer Motion.

## Overview

This site is a personal developer portfolio with an interactive hero, project pages, resume route, support page, animated overlays, custom cursor effects, and hidden easter eggs.

Live site: https://www.chaitanyapatil.online

## Features

- Interactive hero with portrait-to-Spider-Man reveal
- Project showcase with generated static project routes
- Resume page with downloadable PDF
- UPI support page with dynamic QR generation
- SEO metadata, sitemap, robots route, Open Graph image generation
- Spider-themed UI overlays, mascot artwork, loading screen, and hidden easter eggs

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- QRCode

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```text
app/
  components/        Shared UI and interactive effects
  data/              Project data
  projects/[slug]/   Static project detail pages
  resume/            Resume page
  support/           UPI support page
public/
  easter-eggs/       Hidden sticker assets
  Chaitanya*.png     Portfolio image assets
```

## Notes

`npm run build` is the primary validation command. If lint fails with an ESLint plugin compatibility issue, update the lint dependency set before treating it as an application error.
