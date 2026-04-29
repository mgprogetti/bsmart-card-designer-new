# Project Handoff - bSmart Card Designer

## Current State (as of 2026-04-29)

**Version:** 1.2.0  
**Last Update:** Promo card variant implementation complete  
**Status:** Ready for deployment or further development

### What Was Just Completed

#### Feature: Promo Card Variant (1.2.0)
A complete implementation of a 5th card variant with promotional pricing capabilities.

**Files Modified:**
- `src/types.ts` - CardVariant type, ProductData interface
- `src/components/CardEditor.tsx` - Form section for promo fields
- `src/components/ModernCard.tsx` - Display logic for promo cards
- `bsmart-card-designer.php` - Version bump to 1.2.0
- `package.json` - Version bump to 1.2.0

**Build Status:** ✅ Passed (npm run build - no TypeScript errors)

**Commits:**
```
d591dea chore: Bump version to 1.2.0 for Promo card feature release
a197516 feat: Implement Promo card variant with pricing and discount badge
```

**Distribution:** `bsmart-card-designer-1.2.0.zip` created (156 KB)

---

## How to Resume Development

### 1. **Initial Setup**

```bash
# Navigate to project directory
cd /Users/matteogalli-bsmartlabs/Documents/bSmart\ Labs/Antigravity_bSmart_Labs/bsmart-card-designer

# Install dependencies (if needed after pulling changes)
npm install

# Verify current state
git status
git log --oneline -5
```

### 2. **Understanding the Current Code**

**Key Files to Review:**
- `CLAUDE.md` - Complete architecture guide + Promo feature documentation
- `CHANGELOG.md` - Version history and what changed
- `src/types.ts` - All TypeScript interfaces, including promo fields
- `src/components/CardEditor.tsx` - Form logic with promo variant section
- `src/components/ModernCard.tsx` - Display logic, promo badge rendering

**Promo Feature Structure:**
```
ProductData {
  // ... common fields ...
  originalPrice?: number;        // Original price (€)
  promoPrice?: number;           // Promotional price (€)
  discountBadge?: string;        // Text shown in badge (e.g., "30%")
  ctaText?: string;              // Custom button text (e.g., "Acquista ora")
  // ... other variant fields ...
}
```

### 3. **Common Next Steps**

#### Adding More Features to Promo
1. Add field to ProductData in `src/types.ts`
2. Add form input in `src/components/CardEditor.tsx` (inside `{variant === 'promo' && (...)` block)
3. Add display logic in `src/components/ModernCard.tsx` (check `isPromo` flag)
4. Update validation in CardEditor's `handleSubmit` if needed
5. Test with `npm run build` and verify no TypeScript errors

#### Modifying Existing Promo Features
- **Badge Color**: ModernCard.tsx line ~52, change `backgroundColor: '#B92A09'`
- **Price Display Format**: ModernCard.tsx lines ~115-128
- **Form Validation**: CardEditor.tsx in `handleSubmit()` function
- **Field Styling**: Use Tailwind classes in CardEditor.tsx form section

#### Creating a New Card Variant
1. Add variant name to CardVariant union in `src/types.ts`
2. Add variant button in CardEditor.tsx (follow promo button pattern)
3. Add variant-specific fields to ProductData
4. Add conditional form section in CardEditor.tsx
5. Add display logic in ModernCard.tsx with `isNewVariant` flag

### 4. **Development Workflow**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview build
npm run preview
```

**Important:** The dev server requires tmux or terminal access.

### 5. **Testing Changes**

1. **Type Safety:** `npm run build` must pass with no TypeScript errors
2. **Visual Testing:** Open WordPress admin, navigate to "Card Designer"
3. **Feature Testing:**
   - Create new Promo card
   - Fill in all promo fields
   - Verify price validation (promo < original blocks save)
   - Verify badge displays correctly
   - Verify CTA text is customizable

### 6. **Deployment**

**To create a new release .zip:**

```bash
# Build first
npm run build

# Update version numbers:
# - bsmart-card-designer.php (Version: X.Y.Z)
# - package.json ("version": "X.Y.Z")

# Commit version bump
git add bsmart-card-designer.php package.json
git commit -m "chore: Bump version to X.Y.Z"

# Create .zip (exclude unnecessary files)
cd ..
zip -r bsmart-card-designer-X.Y.Z.zip bsmart-card-designer \
  -x "bsmart-card-designer/.git/*" \
  "bsmart-card-designer/.claude/*" \
  "bsmart-card-designer/node_modules/*" \
  "bsmart-card-designer/.env*" \
  "bsmart-card-designer/*.config.*" \
  "bsmart-card-designer/tsconfig.json" \
  "bsmart-card-designer/CLAUDE.md"
```

### 7. **Key Documentation**

- **CLAUDE.md** - Complete architecture + Promo feature guide
- **CHANGELOG.md** - Version history
- **README.md** (if exists) - General project info
- **bsmart-card-designer.php** - PHP plugin file, see comments for REST endpoints

### 8. **Git Branches & Remote**

```bash
# Current status
git branch -v              # Show branches
git remote -v              # Show remotes
git log --oneline -10      # Recent commits

# Push changes
git push origin main       # Push to main branch
```

**Remote:** `https://github.com/mgprogetti/bsmart-card-designer-new.git`

---

## Quick Reference: File Locations

| Component | File | Purpose |
|-----------|------|---------|
| Types | `src/types.ts` | ProductData interface + CardVariant union |
| Editor Form | `src/components/CardEditor.tsx` | Create/edit card data |
| Card Display | `src/components/ModernCard.tsx` | Render cards (all variants) |
| API Client | `src/utils/api.ts` | WordPress REST communication |
| WordPress Plugin | `bsmart-card-designer.php` | Main plugin, REST endpoints |
| Config | `vite.config.ts` | Build configuration |

---

## Known Constraints

- Plugin works in WordPress admin context only (currently)
- REST API requires WordPress authentication
- Images must be hosted externally (URLs passed in)
- Rich text description uses react-quill (limited formatting)
- No database migration system (stores JSON in post_content)

---

## Troubleshooting

**"npm run build" fails with TypeScript errors:**
- Check for syntax errors in modified files
- Ensure all new types are properly defined in `src/types.ts`
- Run `npm run lint` to catch linting issues

**New form field not showing in CardEditor:**
- Verify it's inside the correct `{variant === 'promo' && (...)` block
- Check component hierarchy and state management
- Ensure `formData.fieldName` is properly handled by `handleChange()`

**Card not displaying correctly in preview:**
- Check ModernCard.tsx for rendering logic
- Verify CSS classes are correct (Tailwind + custom)
- Check browser DevTools for missing images or errors

---

## Next Session Checklist

When resuming development:

- [ ] Read CLAUDE.md to refresh architecture understanding
- [ ] Review CHANGELOG.md for recent changes
- [ ] Check `git log --oneline -10` for latest commits
- [ ] Run `npm install` if node_modules might be outdated
- [ ] Run `npm run build` to verify no TypeScript errors
- [ ] Check `git status` for uncommitted changes
- [ ] Plan next features or bugfixes

---

**Questions?** Refer to CLAUDE.md for detailed architecture or check the files mentioned above.
