# Variante Promo

## Scopo

La variante `Promo` serve a mostrare una card promozionale con prezzo originale, prezzo scontato, badge sconto, CTA e metadati didattici.

## Campi

In `ProductData`:

- `originalPrice?: number`
- `promoPrice?: number`
- `discountBadge?: string`
- `ctaText?: string`
- `promoTopics?: string[]`
- `schoolLevels?: string[]`
- `brand?: string`
- `brandUrl?: string`

Nota: `brand` e `brandUrl` sono mostrati all'utente come `Partner` e `Link partner`.

## Rendering

Preview React:

- `src/components/ModernCard.tsx`

HTML shortcode:

- `src/utils/generateWordPressCode.ts`
- `bsmart-style.css`

Ordine contenuti Promo:

1. titolo
2. partner
3. descrizione
4. `Argomenti`
5. `Livello scolastico`
6. prezzi
7. CTA

## Stile

Colore primario promo: `#FF6643`.

Palette usate:

- badge sconto: `#FF6643`
- risparmio: gradiente chiaro `#FFF2ED` -> `#FFE0D6`, testo `#C73E23`
- argomenti: sfondo `#FFF4F0`, bordo `#FFD8CC`, testo `#B94A2F`
- livello scolastico: sfondo `#FFF0ED`, bordo `#FFCFC4`, testo `#A94438`

## Regole Funzionali

- Il prezzo promo deve essere inferiore al prezzo originale.
- I prezzi visualizzati usano virgola decimale italiana.
- Le immagini devono usare rendering contenuto, senza crop.
