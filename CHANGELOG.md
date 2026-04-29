# Changelog - bSmart Card Designer

## [1.2.5] - 2026-04-29

### Added
- Added Promo-only `Argomenti` and `Livello scolastico` tag fields.
- Displayed the new Promo tags between the description and pricing section with soft palettes based on `#FF6643`.

## [1.2.4] - 2026-04-29

### Changed
- Renamed the producer-facing labels to partner-facing labels in the card and editor.

## [1.2.3] - 2026-04-29

### Changed
- Released a new installable package with the editor version label aligned to the plugin version.

## [1.2.2] - 2026-04-29

### Added
- Added `Nome produttore` and `Link produttore` fields for product, simple, and promo cards.
- Made producer names clickable when a producer URL is provided.

### Fixed
- Removed the incorrect `Editore:` label from promo cards.

## [1.2.1] - 2026-04-29

### Fixed
- Prevented card cover images from being cropped by using contained image rendering.
- Updated promotional price display to use comma decimals.
- Updated Promo discount badge color to `#FF6643`.
- Applied a lighter `#FF6643`-based gradient to the savings badge.

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
