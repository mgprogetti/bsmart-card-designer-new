# bSmart Card Designer

WordPress plugin per creare, modificare e pubblicare card prodotto tramite un'interfaccia React dentro l'admin WordPress.

Versione corrente: `1.2.5`

## Cosa Fa

- Crea card salvate in WordPress come contenuti interni del plugin.
- Genera shortcode installabili negli articoli o nelle pagine.
- Offre una preview live mentre si modifica la card.
- Supporta descrizioni rich text.
- Gestisce varianti diverse di card: `Fumetto`, `Libro`, `Didattica`, `Semplice`, `Promo`.

## Variante Promo

La variante `Promo` include:

- prezzo originale e prezzo promo
- badge sconto
- CTA personalizzata
- partner con link opzionale
- argomenti e livello scolastico come tag
- immagini non tagliate, con rendering contenuto nel box
- prezzi visualizzati con virgola decimale italiana

## Installazione WordPress

1. Usa lo ZIP installabile più recente, per esempio:
   `bsmart-card-designer-1.2.5.zip`
2. Vai in WordPress:
   `Plugin > Aggiungi nuovo > Carica plugin`
3. Carica lo ZIP e attiva il plugin.
4. Apri la voce admin `Card Designer`.

## Sviluppo Locale

Prerequisiti:

- Node.js
- npm

Comandi principali:

```bash
npm install
npm run dev
npm run build
npm run lint
```

La build di produzione viene generata in `dist/`.

## Esportare Una Release

Prima di creare uno ZIP:

1. aggiorna la versione in `bsmart-card-designer.php`
2. aggiorna le versioni enqueue CSS/JS nello stesso file
3. aggiorna `package.json`
4. aggiorna `package-lock.json`
5. aggiorna il testo versione in `src/App.tsx`
6. aggiorna `CHANGELOG.md`
7. esegui `npm run build`

Lo ZIP installabile deve contenere solo:

- `bsmart-card-designer.php`
- `bsmart-style.css`
- `dist/`

## Documentazione Tecnica

- [Architettura](docs/architecture.md)
- [Variante Promo](docs/promo-card.md)
- [Checklist release](docs/release.md)

## File Principali

- `bsmart-card-designer.php`: plugin WordPress, REST API, shortcode, asset enqueue
- `src/App.tsx`: shell React e testo versione interfaccia
- `src/components/CardEditor.tsx`: editor card
- `src/components/ModernCard.tsx`: preview/render card
- `src/utils/generateWordPressCode.ts`: HTML statico salvato per lo shortcode
- `bsmart-style.css`: CSS frontend caricato dallo shortcode
