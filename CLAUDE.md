# CLAUDE.md

Guida rapida per lavorare in questo repository senza caricare contesto non necessario.

## Contesto Essenziale

`bSmart Card Designer` è un plugin WordPress con admin React/TypeScript. Serve a creare card prodotto salvate in WordPress e pubblicate tramite shortcode.

Versione corrente: `1.2.5`

Stack:

- React + TypeScript + Vite
- WordPress plugin PHP
- TailwindCSS per la UI React
- `bsmart-style.css` per il frontend WordPress

## Regola Versioni

Ogni modifica funzionale o ZIP installabile deve aggiornare sempre:

- `bsmart-card-designer.php`
- versioni enqueue CSS/JS in `bsmart-card-designer.php`
- `package.json`
- `package-lock.json`
- testo versione in `src/App.tsx`
- `CHANGELOG.md`
- nome ZIP esportato

## Comandi

```bash
npm install
npm run dev
npm run build
npm run lint
```

Prima di consegnare modifiche applicative, eseguire almeno:

```bash
npm run build
```

## File Da Guardare Prima

- `src/types.ts`: shape dati card
- `src/components/CardEditor.tsx`: campi editor
- `src/components/ModernCard.tsx`: preview card
- `src/utils/generateWordPressCode.ts`: HTML salvato per shortcode
- `bsmart-style.css`: CSS frontend shortcode
- `bsmart-card-designer.php`: plugin WordPress e asset versioning

## Approfondimenti Solo Se Servono

Apri queste pagine solo quando il task lo richiede:

- Architettura e data flow: [docs/architecture.md](docs/architecture.md)
- Dettagli variante Promo: [docs/promo-card.md](docs/promo-card.md)
- Procedura release/ZIP: [docs/release.md](docs/release.md)

## Nota Operativa

`dist/` è ignorata da Git ma va inclusa negli ZIP installabili. Non committare `node_modules/` o pacchetti ZIP a meno che venga richiesto esplicitamente.
