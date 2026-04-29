# Architettura

## Panoramica

Il progetto è un plugin WordPress con interfaccia admin React.

Componenti principali:

- `bsmart-card-designer.php`: registra menu admin, custom post type, REST API, shortcode e asset.
- `src/App.tsx`: gestisce dashboard/editor e loading state.
- `src/components/CardDashboard.tsx`: lista card salvate.
- `src/components/CardEditor.tsx`: form di creazione/modifica.
- `src/components/ModernCard.tsx`: preview visuale dentro l'editor.
- `src/utils/api.ts`: client REST WordPress.
- `src/utils/generateWordPressCode.ts`: genera HTML statico salvato nel meta `_bsmart_card_html`.
- `bsmart-style.css`: CSS caricato nel frontend quando viene usato lo shortcode.

## Data Flow

1. WordPress carica la pagina admin `Card Designer`.
2. Il plugin PHP monta `#bsmart-card-root` e carica `dist/assets/index.js`.
3. React chiama le API REST con nonce WordPress.
4. Le card vengono salvate come custom post type `bsmart_card`.
5. I dati strutturati sono salvati come JSON in `post_content`.
6. L'HTML già renderizzato viene salvato nel meta `_bsmart_card_html`.
7. Lo shortcode `[card-designer id="123"]` legge quel meta e stampa la card nel frontend.

## Punti Di Attenzione

- Ogni campo visibile nella preview React deve essere replicato anche in `generateWordPressCode.ts`.
- Ogni stile necessario nel frontend pubblico deve esistere in `bsmart-style.css`.
- La preview React usa Tailwind; lo shortcode usa CSS statico.
- Gli asset compilati in `dist/` non sono tracciati da Git ma sono necessari nello ZIP installabile.
