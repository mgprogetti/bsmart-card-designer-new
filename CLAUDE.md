# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**bSmart Card Designer** is a WordPress plugin that provides a React-based admin interface for creating, editing, and managing product cards (card designer). The plugin supports multiple card variants (comic, book, product, simple, promo) with rich text editing capabilities and promotional pricing features.

The project consists of:
- **Frontend**: React + TypeScript application built with Vite
- **Backend**: WordPress plugin (PHP) that provides REST API endpoints and custom post type storage
- **Styling**: TailwindCSS for component styling, custom CSS for WordPress integration

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite dev server)
npm run dev

# Build for production (includes TypeScript type checking)
npm run build

# Run ESLint
npm run lint

# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main React app (dashboard/editor view switcher)
├── main.tsx               # React DOM entry point (mounts to #bsmart-card-root)
├── types.ts               # TypeScript interfaces (ProductData, SavedCard, etc.)
├── index.css              # Global styles
├── components/
│   ├── CardDashboard.tsx  # Lists and manages saved cards
│   ├── CardEditor.tsx     # Form for creating/editing card data with rich text
│   └── ModernCard.tsx     # Display component for rendering cards
├── utils/
│   ├── api.ts             # WordPress REST API client (CRUD operations)
│   ├── csvParser.ts       # CSV import utility
│   └── generateWordPressCode.ts  # Generates shortcode for inserting cards

bsmart-card-designer.php   # WordPress plugin file (menu, CPT, REST API, shortcode)
```

## Architecture

### React App (Frontend)
The React app follows a simple state-based pattern:
- **App.tsx**: Top-level component managing navigation (dashboard ↔ editor)
- **CardDashboard**: Displays list of saved cards with create/edit/delete actions
- **CardEditor**: Form UI for product data with form validation
- **ModernCard**: Preview/display component for card variants
- The app mounts to `#bsmart-card-root` element injected by the PHP plugin

### WordPress Plugin (Backend)
The PHP plugin (bsmart-card-designer.php) handles:
1. **Custom Post Type**: Stores card data as posts of type `bsmart-card`
2. **Admin Menu**: Adds "Card Designer" to WordPress admin menu
3. **REST API Routes**: Exposes endpoints for CRUD operations (`/wp-json/bsmart-cards/...`)
4. **Shortcode**: `[card-designer]` displays the React app in admin; shortcodes display rendered cards in posts/pages
5. **Script Enqueuing**: Enqueues the built React bundle with `type="module"`

### Data Flow
1. User opens WordPress admin → PHP plugin enqueues React app
2. React app loads and mounts to `#bsmart-card-root`
3. CardDashboard fetches saved cards via API (api.ts)
4. User creates/edits card → CardEditor captures data
5. On save, API call persists to WordPress database
6. Card is stored as CPT post with ProductData in post_content (JSON)
7. In articles, `[card-designer id="123"]` shortcode renders card frontend

## Key Type Definitions

### ProductData
The core data structure for a card. Fields include:
- Basic: `title`, `cardTitle`, `description`, `coverImage`
- Links: `links` array with url/label/type (primary/secondary)
- Metadata: `subject`, `publisher`, `tags`
- Variant-specific: 
  - `author`/`whyRead` (book)
  - `brand` (product/simple)
  - `originalPrice`/`promoPrice`/`discountBadge`/`ctaText` (promo)
  - `educationalObjectives` (product)
- `cardVariant`: One of 'comic' | 'book' | 'product' | 'simple' | 'promo'

### SavedCard
Wrapper for persisted data:
- `id`: WordPress post ID or local identifier
- `title`: Internal card name (stored in post_title)
- `data`: The full ProductData object (stored as JSON in post_content)
- `shortcode`: Generated shortcode string for insertion
- `date`: Creation/modification date

## Important Development Patterns

### API Integration
- All WordPress REST calls go through `src/utils/api.ts`
- The API client handles authentication (assumes WordPress admin context)
- Endpoints follow REST conventions: `GET /wp-json/bsmart-cards`, `POST`, `DELETE`, etc.
- Example: `api.getCards()` fetches list, `api.saveCard(data, id)` creates/updates

### React Component Patterns
- **State Management**: App.tsx manages global state (cards, view, editingCard)
- **Loading States**: Loading spinners shown at top of page during API calls
- **Error Handling**: Wrapped in try/catch with alert fallback
- **Async Operations**: All API calls are async; state updates after completion

### TypeScript Path Alias
The tsconfig defines `@/*` → `src/*` for cleaner imports:
```typescript
import { ProductData } from '@/types';  // instead of '../../../types'
```

### Rich Text Editing
- Uses `react-quill` library for WYSIWYG rich text editing in card descriptions
- Quill toolbar configurable in CardEditor component
- Stores HTML content in description field

## Common Tasks

### Adding a New Field to ProductData
1. Add field to `ProductData` interface in `src/types.ts`
2. Add form input in `CardEditor.tsx`
3. Include in generateWordPressCode.ts if needed for frontend display

### Modifying Card Display
- Edit `ModernCard.tsx` to change card rendering
- Styles use TailwindCSS classes + custom CSS (bsmart-style.css)

### Testing API Changes
- The plugin provides REST endpoints at `/wp-json/bsmart-cards/`
- Cards are stored as Custom Post Type with slug `bsmart-card`
- Use browser DevTools Network tab to inspect requests during development

## Deployment Notes

- Build step compiles TypeScript and bundles React: `npm run build`
- Output goes to `dist/` directory
- PHP plugin expects built assets at specific paths (configured in vite.config.ts)
- The plugin is designed to work in WordPress admin context only (for now)

## Dependencies Overview

- **react**, **react-dom**: UI framework
- **react-quill**: Rich text editor for card descriptions
- **vite**, **@vitejs/plugin-react**: Build tool with React support
- **typescript**: Type checking
- **tailwindcss**, **postcss**: Styling utilities and processing
- **lucide-react**: Icon library (if used in components)
- **eslint**: Code linting (configured but no explicit .eslintrc file found)

## Recent Feature: Promo Card Variant (v1.2.0 - Apr 29, 2026)

### What was added
A new 5th card variant called **"Promo"** designed for promotional product cards with dynamic pricing:

**New Fields in ProductData:**
```typescript
originalPrice?: number;      // Original price (strikethrough)
promoPrice?: number;         // Promotional price (emphasized)
discountBadge?: string;      // Text like "30%" displayed on circular badge
ctaText?: string;            // Custom CTA button text (e.g., "Acquista ora")
```

### Implementation Details

**Files Modified:**
1. **src/types.ts** - Added 'promo' to CardVariant, new price fields to ProductData
2. **src/components/CardEditor.tsx** - Added promo variant selector button (Tag icon, red when active), form fields for prices with inline validation
3. **src/components/ModernCard.tsx** - Badge rendering on image, pricing display section, custom CTA text support

**Key Features:**
- **Price Validation**: Form blocks save if `promoPrice >= originalPrice`
- **Discount Badge**: Circular red badge (#B92A09) positioned top-right on image (48x48px)
- **Savings Display**: Auto-calculated savings shown in green pill
- **CTA Customization**: Button text customizable per card (defaults to link.label)
- **Square Images**: Promo cards use square aspect ratio (same as product/simple)

**Frontend Display (ModernCard):**
- Original price: small, strikethrough, gray
- Promo price: large, bold, dark
- Savings: green background pill with savings amount
- Badge: circular red overlay on image
- CTA: button with custom text

### How to Extend Promo Further

**Add more pricing fields:**
1. Add field to ProductData interface (src/types.ts)
2. Add form input in CardEditor.tsx conditional block (`{variant === 'promo' && (...)`)
3. Add display logic in ModernCard.tsx (check `isPromo` flag)

**Change badge color/style:**
- Badge styling in ModernCard.tsx line ~52: `backgroundColor: '#B92A09'` and dimensions `w-12 h-12`

**Modify pricing display format:**
- Pricing section in ModernCard.tsx line ~115-128

### Version History
- v1.2.0: Added Promo variant with pricing and discount badges
- v1.1.0: Rich text editing for descriptions
- v1.0.0: Initial release with comic, book, product, simple variants

## Git Workflow

Recent commits show feature-based development:
- `chore: Bump version to 1.2.0 for Promo card feature release` (v1.2.0)
- `feat: Implement Promo card variant with pricing and discount badge` (v1.2.0)
- `feat: Implement rich text editing...` (v1.1.0)
- `First version` (v1.0.0)

Follow conventional commit format for clarity. Use version tags for releases (e.g., `v1.2.0`).
