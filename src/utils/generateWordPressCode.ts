import type { ProductData } from '../types';

export const generateWordPressCode = (data: ProductData): { html: string; css: string } => {
  // Determine variant
  const isBook = data.cardVariant === 'book';
  const isProduct = data.cardVariant === 'product';
  const isSimple = data.cardVariant === 'simple';
  const isComic = (!isBook && !isProduct && !isSimple) || data.cardVariant === 'comic';

  let rootClass = 'wp-comic-card';
  if (isBook) rootClass = 'wp-book-card';
  if (isProduct) rootClass = 'wp-edu-card';
  if (isSimple) rootClass = 'wp-simple-card';

  const css = `
/* 
 * CSS per WP Product Card (v. 4.0 - Comic, Book, Edu, Simple)
 * Inserire in: Aspetto > Personalizza > CSS Aggiuntivo 
 */

/* --- Container Principale --- */
.wp-comic-card,
.wp-book-card,
.wp-edu-card,
.wp-simple-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  max-width: 850px;
  margin: 2rem auto;
  position: relative;
}

.wp-comic-card:hover,
.wp-book-card:hover,
.wp-edu-card:hover,
.wp-simple-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
  .wp-comic-card,
  .wp-book-card,
  .wp-edu-card,
  .wp-simple-card {
    flex-direction: row;
    align-items: stretch;
  }
}

/* --- Colonna Sinistra: Immagine --- */
.wp-comic-card__image-col,
.wp-book-card__image-col,
.wp-edu-card__image-col,
.wp-simple-card__image-col {
  background-color: #f8fafc;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 200px;
}

@media (min-width: 768px) {
  .wp-comic-card__image-col,
  .wp-book-card__image-col,
  .wp-edu-card__image-col,
  .wp-simple-card__image-col {
    flex: 0 0 30%;
    max-width: 300px;
  }
}

.wp-comic-card__image-link,
.wp-book-card__image-link,
.wp-edu-card__image-link,
.wp-simple-card__image-link {
  display: block;
  transition: transform 0.3s ease;
}

.wp-comic-card__image-link:hover,
.wp-book-card__image-link:hover,
.wp-edu-card__image-link:hover,
.wp-simple-card__image-link:hover {
  transform: scale(1.03) rotate(-1deg);
}

.wp-comic-card__image,
.wp-book-card__image,
.wp-edu-card__image,
.wp-simple-card__image {
  display: block;
  width: 100%;
  max-width: 160px;
  height: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 0 auto;
}

/* --- Colonna Destra: Contenuto --- */
.wp-comic-card__content-col,
.wp-book-card__content-col,
.wp-edu-card__content-col,
.wp-simple-card__content-col {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* --- Elementi Comuni --- */
.wp-comic-card__title,
.wp-book-card__title,
.wp-edu-card__title,
.wp-simple-card__title {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  color: #1e293b;
}

.wp-comic-card__title a,
.wp-book-card__title a,
.wp-edu-card__title a,
.wp-simple-card__title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.wp-comic-card__title a:hover,
.wp-book-card__title a:hover,
.wp-edu-card__title a:hover,
.wp-simple-card__title a:hover {
  color: #2563eb;
}

.wp-comic-card__publisher,
.wp-book-card__publisher {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.5rem 0 1rem 0;
}

.wp-comic-card__publisher strong,
.wp-book-card__publisher strong {
  color: #334155;
  font-weight: 600;
}

.wp-comic-card__publisher a,
.wp-book-card__publisher a {
  color: #475569;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.wp-comic-card__description,
.wp-book-card__description,
.wp-edu-card__description,
.wp-simple-card__description {
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 1.5rem;
}

/* --- Elementi Specifici FUMETTO --- */
.wp-comic-card__subject-badge {
  display: inline-block;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
  align-self: flex-start;
}

.wp-comic-card__tags {
  margin-bottom: 1.5rem;
}

.wp-comic-card__tags-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 0.25rem; 
}

.wp-comic-card__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wp-comic-card__tag {
  background-color: #f1f5f9;
  color: #475569;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

/* --- Elementi Specifici LIBRO --- */
.wp-book-card__author {
  font-size: 1.1rem;
  color: #475569;
  font-style: italic;
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
}

.wp-book-card__why-read {
  background-color: #f0f9ff;
  border-left: 4px solid #3b82f6;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0 6px 6px 0;
}

.wp-book-card__why-read-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.wp-book-card__why-read p {
  margin: 0;
  font-size: 0.95rem;
  color: #334155;
  font-style: italic;
}

/* --- Elementi Specifici PRODOTTO DIDATTICO & SEMPLICE --- */
.wp-edu-card__brand,
.wp-simple-card__brand {
  font-size: 0.9rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 0.5rem 0 1rem 0;
}

.wp-edu-card__objectives {
  margin-bottom: 1.5rem;
}

.wp-edu-card__objectives-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #16a34a; /* Green for education */
  margin-bottom: 0.25rem;
}

.wp-edu-card__objective-tag {
  background-color: #f0fdf4;
  color: #15803d;
  border: 1px solid #dcfce7;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

/* --- Bottoni / Azioni --- */
.wp-card-actions {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.wp-card-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none !important;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.2;
}

.wp-card-btn--primary {
  background-color: #2563eb;
  color: #ffffff !important;
  border: 1px solid #2563eb;
}

.wp-card-btn--primary:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.wp-card-btn--secondary {
  background-color: transparent;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
}

.wp-card-btn--secondary:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
  color: #0f172a !important;
}
`;

  // Generazione Contenuti Dinamici
  const publisherHtml = data.publisherUrl
    ? `<a href="${data.publisherUrl}" target="_blank" rel="noopener">${data.publisher}</a>`
    : data.publisher;

  const primaryUrl = data.links[0]?.url || '#';
  const titleHref = data.titleUrl || primaryUrl;
  const imageHref = data.imageClickUrl || primaryUrl;

  // Per i libri, prodotti didattici e semplici mostriamo solo il link primario (Acquista)
  const linksToRender = (isBook || isProduct || isSimple)
    ? data.links.filter(l => l.type === 'primary')
    : data.links;

  // Tag Lists
  const tagsListHtml = isComic && data.tags.length > 0 ? `
    <div class="wp-comic-card__tags">
      <span class="wp-comic-card__tags-label">Argomenti</span>
      <div class="wp-comic-card__tag-list">
        ${data.tags.map(tag => `<span class="wp-comic-card__tag">${tag}</span>`).join('')}
      </div>
    </div>
  ` : '';

  const objectivesListHtml = isProduct && data.educationalObjectives && data.educationalObjectives.length > 0 ? `
    <div class="wp-edu-card__objectives">
      <span class="wp-edu-card__objectives-label">Obiettivi Didattici</span>
      <div class="wp-comic-card__tag-list">
        ${data.educationalObjectives.map(tag => `<span class="wp-edu-card__objective-tag">${tag}</span>`).join('')}
      </div>
    </div>
  ` : '';

  // Use cardTitle for display, not internal title


  const html = `
<!-- WP Card: ${isBook ? 'Libro' : isProduct ? 'Prodotto Didattico' : isSimple ? 'Prodotto Semplice' : 'Fumetto'} - ${data.title} -->
<div class="${rootClass}">
  <!-- Immagine -->
  <div class="${rootClass}__image-col">
    <a href="${imageHref}" class="${rootClass}__image-link" target="_blank" rel="noopener">
      <img src="${data.coverImage}" alt="${data.cardTitle}" class="${rootClass}__image" />
    </a>
  </div>

  <!-- Contenuto -->
  <div class="${rootClass}__content-col">
    ${isComic ? `<span class="wp-comic-card__subject-badge">${data.subject}</span>` : ''}
    
    <h3 class="${rootClass}__title">
      <a href="${titleHref}" target="_blank" rel="noopener">${data.cardTitle}</a>
    </h3>

    ${isBook && data.author ? `<div class="wp-book-card__author">${data.author}</div>` : ''}
    ${(isProduct || isSimple) && data.brand ? `<div class="${rootClass}__brand">Produttore: ${data.brand}</div>` : ''}

    ${!isProduct && !isSimple ? `
    <div class="${rootClass}__publisher">
        <strong>Editore:</strong> ${publisherHtml}
    </div>
    ` : ''}
    
    <!-- Description -->
    <div class="${rootClass}__description wp-description-content">
        ${data.description}
    </div>
    
    ${isBook && data.whyRead ? `
    <div class="wp-book-card__why-read">
      <span class="wp-book-card__why-read-title">Perché leggere questo libro?</span>
      <p>${data.whyRead}</p>
    </div>
    ` : ''}

    ${tagsListHtml}
    ${objectivesListHtml}

    <div class="wp-card-actions">
      ${linksToRender.map(link => `
      <a class="wp-card-btn ${link.type === 'primary' ? 'wp-card-btn--primary' : 'wp-card-btn--secondary'}" href="${link.url}" target="_blank" rel="noopener">
        ${link.label}
      </a>
      `).join('')}
    </div>
  </div>
</div>
`;

  return {
    html: html.trim(),
    css: css.trim()
  };
};