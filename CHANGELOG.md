# Changelog - bSmart Card Designer

## [1.2.0] - 2026-04-29

### Added
- **New Promo Card Variant**: 5th variant for promotional pricing displays
  - Circular discount badge on card image (customizable text, red #B92A09)
  - Original and promotional price fields with auto-calculated savings
  - Price validation: promo price must be less than original price
  - Customizable CTA button text per card
  - Square image aspect ratio (shared with product/simple variants)
- Form validation in CardEditor blocks save if promo price >= original price
- Inline validation warnings for incorrect pricing

### Modified Files
- `src/types.ts` - Added 'promo' CardVariant, price fields to ProductData
- `src/components/CardEditor.tsx` - Promo form section with price fields and CTA input
- `src/components/ModernCard.tsx` - Badge rendering, pricing section, CTA customization

### Technical Details
- **Badge Styling**: 48x48px circular, positioned top-right, background #B92A09
- **Price Display**: Original (strikethrough gray) + Promo (large bold dark) + Savings (green pill)
- **Type Safety**: All new fields optional in ProductData interface
- **Build**: npm run build passes with no TypeScript errors

## [1.1.0] - 2026-02-01

### Added
- Rich text editing for card descriptions using react-quill
- WYSIWYG toolbar with basic formatting (bold, italic, lists, links)
- HTML content stored in description field
- Support for advanced text formatting in all card variants

## [1.0.0] - 2025-11-28

### Initial Release
- React + TypeScript admin interface for WordPress
- Four card variants: comic, book, product, simple
- Card CRUD operations via REST API
- Custom Post Type storage in WordPress database
- Shortcode rendering for frontend display
- CSV import support (partial)
- Vite build system with TypeScript compilation
- TailwindCSS styling + custom CSS for WordPress integration

---

## How to Use This File

- Keep track of all version changes here
- Use semantic versioning: MAJOR.MINOR.PATCH
- Document what was added, modified, and fixed in each release
- Link to related commits if applicable
