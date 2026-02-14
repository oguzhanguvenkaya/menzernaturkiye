# Menzerna Türkiye - Product Catalog Website

## Overview

This is a Turkish localization of the Menzerna professional polishing products website. Menzerna is a German manufacturer of polishing compounds and accessories. The site serves as a product catalog for the Turkish market (distributed by MTS Kimya / MG Polisaj), covering three main product lines:

1. **Car Care** - Automotive polishing compounds, polishes, paint protection, pads & accessories
2. **Industrial** - Solid polishing compounds for metals (aluminum, brass, stainless steel)
3. **Marine** - Boat/gelcoat polishing products

The site is a full-stack TypeScript application with a React frontend and Express backend. Product data is stored in PostgreSQL and also available as static JSON files in `client/public/data/`. The site uses Turkish language throughout the UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (`client/`)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite (dev server on port 5000)
- **Routing:** Wouter (lightweight client-side router)
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin) + CSS custom properties for theming
- **UI Components:** Shadcn/UI (New York style) with Radix UI primitives. Config in `components.json`. Components live at `client/src/components/ui/`
- **State/Data Fetching:** TanStack React Query for server state management
- **Font:** Source Sans Pro (loaded from Google Fonts)
- **Entry point:** `client/src/main.tsx` → `client/src/App.tsx`

**Key Design Rules (Brand Identity):**
- Primary colors: Dark Industrial Navy `#002b3d` and Menzerna Red `#e3000f` (also `#AF1D1F` as brand red in CSS vars)
- Sharp corners everywhere (`rounded-none`) — German industrial aesthetic, no rounded/oval shapes
- Bold uppercase headers with wide letter spacing (`font-black uppercase tracking-widest`)
- Product cards show Cut and Gloss ratings as progress bars (scale of 10)
- Step color coding: Step 1 = Red, Step 2 = Yellow, Step 3 = Green, Step 4 = Blue

**Page Routes:**
- `/` — Home page
- `/products` — All products listing
- `/category/:category` — Category product listing (car-polish, accessories, solid-compounds, boat-polish)
- `/category/:category/:id` — Product detail page
- `/about` — About page
- `/contact` — Contact form
- `/dealers` — Dealer locator (placeholder)

### Backend (`server/`)
- **Framework:** Express 5 on Node.js
- **Language:** TypeScript (run with `tsx`)
- **Entry point:** `server/index.ts`
- **API prefix:** `/api/`
- **Dev mode:** Vite dev server middleware is attached to Express (`server/vite.ts`)
- **Production:** Static files served from `dist/public/` (`server/static.ts`)

**API Endpoints:**
- `GET /api/products` — All products
- `GET /api/products/:sku` — Single product by SKU
- `GET /api/products/search/:query` — Search products by name or SKU
- `GET /api/categories/:category` — Products filtered by category (matches main_cat, sub_cat, or sub_cat2)
- `POST /api/contact` — Submit contact form message

### Database
- **Database:** PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM:** Drizzle ORM with `drizzle-zod` for validation
- **Schema:** Defined in `shared/schema.ts`
- **Migrations:** Via `drizzle-kit push` (config in `drizzle.config.ts`, output to `migrations/`)
- **Seeding:** `server/seed.ts` loads products from JSON into the database

**Database Tables:**
1. `products` — Main product table with fields: id (UUID), sku (unique), barcode, brand, product_name, price (integer), image_url, source_file, template_group, template_sub_type, category (JSONB with main_cat/sub_cat/sub_cat2), content (JSONB with descriptions), template_fields (JSONB with cut_level, finish_level, volume, etc.), relations (JSONB for product relationships), faq (JSONB)
2. `contact_messages` — Contact form submissions

### Data Layer
- **Dual data sources:** The app has both a database-backed API and static JSON files in `client/public/data/`
- Static JSON categories: `car-polish.json`, `accessories.json`, `solid-compounds.json`, `boat-polish.json`, `marine-polish.json`
- The `CategoryProducts` page likely fetches from these static JSON files
- The main products API (`/api/products`) reads from PostgreSQL
- Product JSON structure (static files): `{ id, name, step, image, description, cut, gloss, benefits[], processing[], originalUrl }`
- Product DB structure: More detailed with SKU, barcode, pricing, JSONB fields for content/template/relations/faq

### Build System
- **Dev:** `npm run dev` starts Express + Vite dev server with HMR
- **Build:** `npm run build` runs `script/build.ts` which builds client with Vite and server with esbuild
- **Output:** `dist/` directory (client assets in `dist/public/`, server bundle as `dist/index.cjs`)
- **Type checking:** `npm run check` runs TypeScript compiler

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

### Known Issues
- Runtime error in ProductCard: `Cannot read properties of undefined (reading 'toLowerCase')` — likely from accessing `product.product_name` or `product.template_sub_type` when the product object has missing/undefined fields. Guard against undefined values in product card rendering.

### Recent Changes (Feb 2026)
- All pages redesigned to match sharp-corner German industrial aesthetic (rounded-none everywhere)
- About page: removed placeholder boxes, split-layout with factory image, industrial color scheme
- Contact page: sharp-edged forms and icon containers, consistent header styling
- Products page: removed rounded corners from filter bar, loaders, and empty states
- Mobile: category teaser cards reduced to h-[300px] on mobile (from h-[400px])
- Dealers page redirects to mgpolishing.com/yetkili-saticilar
- HTML: added <title> and meta description tags
- Fixed TypeScript: added `relations` property to Product interface in types.ts
- LSP errors: all cleared
- Product detail pages: Added "İndirmeler" (Downloads) section with PDF links (technical datasheets, flyers) scraped from menzerna.com. 55/58 products have download links stored in `content.downloads` JSONB array. Links point directly to menzerna.com/fileadmin/ PDFs.
- Newsletter section removed from homepage

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used with `pg` (node-postgres) driver and Drizzle ORM.

### Key NPM Packages
- **Frontend:** React, Wouter, TanStack React Query, Radix UI (full suite), Shadcn/UI, Tailwind CSS, Embla Carousel, cmdk (command palette), react-hook-form + zod
- **Backend:** Express 5, Drizzle ORM, pg, connect-pg-simple (session store), express-session
- **Shared:** Zod (validation), drizzle-zod (schema-to-zod conversion)

### External Services
- **Google Fonts** — Source Sans Pro font loaded from `fonts.googleapis.com`
- **Menzerna CDN** — Product images are hotlinked from `www.menzerna.com/fileadmin/` (original manufacturer's server)
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev only)

### Content Sources
- Product data was manually scraped from the official Menzerna website (`www.menzerna.com`) and translated to Turkish
- MTS Kimya e-commerce data (product catalog with 58 products, pricing in Turkish Lira) available in `attached_assets/` and `client/public/data/` JSON files
- HTML source files from original Menzerna site stored at root level (`car_polish.html`, `boat_polish.html`, `solid_compounds.html`, `accessories.html`) for reference