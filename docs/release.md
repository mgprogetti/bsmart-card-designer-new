# Checklist Release

## Aggiornamento Versione

Per ogni release aggiornare:

- `bsmart-card-designer.php`
- versioni enqueue CSS/JS in `bsmart-card-designer.php`
- `package.json`
- `package-lock.json`
- `src/App.tsx`
- `CHANGELOG.md`

## Build

```bash
npm run build
```

## ZIP Installabile

Lo ZIP deve contenere una cartella radice `bsmart-card-designer/` con:

- `bsmart-card-designer.php`
- `bsmart-style.css`
- `dist/`

Esempio:

```bash
tmpdir=$(mktemp -d /tmp/bsmart-card-designer-release-1.2.5.XXXXXX)
mkdir -p "$tmpdir/bsmart-card-designer"
cp -R bsmart-card-designer.php bsmart-style.css dist "$tmpdir/bsmart-card-designer/"
cd "$tmpdir"
zip -r bsmart-card-designer-1.2.5.zip bsmart-card-designer
```

## Verifica ZIP

```bash
unzip -t bsmart-card-designer-1.2.5.zip
unzip -p bsmart-card-designer-1.2.5.zip bsmart-card-designer/bsmart-card-designer.php | sed -n '1,12p'
```
