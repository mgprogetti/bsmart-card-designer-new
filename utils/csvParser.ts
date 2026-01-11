import { ProductData } from '../types';

export const parseCSV = (csvContent: string): ProductData[] => {
    const lines = csvContent.trim().split(/\r\n|\n/);
    if (lines.length < 2) return []; // Need at least headers and one row

    // Headers normalization: lowercase and remove quotes
    const headers = lines[0].split(/,|;/).map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    // Helper to find index of a column by possible names
    const getIndex = (patterns: string[]) => headers.findIndex(h => patterns.some(p => h.includes(p)));

    const idxTitle = getIndex(['titolo', 'title']);
    const idxTitleLink = getIndex(['link titolo', 'title link', 'url titolo']);
    const idxPublisher = getIndex(['editore', 'publisher']);
    const idxPublisherUrl = getIndex(['link editore', 'publisher link', 'url editore']);
    const idxImage = getIndex(['url immagine', 'image url', 'cover', 'src']);
    const idxImageClickLink = getIndex(['link immagine', 'image link', 'href immagine']);
    const idxSubject = getIndex(['materia', 'subject', 'argomento']);
    const idxTags = getIndex(['tag', 'tags', 'keywords']);
    const idxDesc = getIndex(['descrizione', 'description', 'sinossi']);
    const idxBuy = getIndex(['link acquista', 'buy link', 'purchase']);
    const idxPreview = getIndex(['link anteprima', 'preview link']);
    
    // New fields for Book variant
    const idxAuthor = getIndex(['autore', 'author']);
    const idxWhyRead = getIndex(['perché leggere', 'why read', 'motivi']);

    // New fields for Product variant
    const idxBrand = getIndex(['marca', 'brand', 'produttore']);
    const idxObjectives = getIndex(['obiettivi', 'objectives']);

    const result: ProductData[] = [];

    // Helper to split line respecting quotes (basic implementation)
    const splitLine = (line: string) => {
       const matches = [];
       let inQuote = false;
       let current = '';
       for(let i=0; i<line.length; i++) {
           const char = line[i];
           if(char === '"') {
               inQuote = !inQuote;
           } else if ((char === ',' || char === ';') && !inQuote) {
               matches.push(current.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
               current = '';
           } else {
               current += char;
           }
       }
       matches.push(current.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
       return matches;
    };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        const cols = splitLine(line);
        
        // Basic validation
        if (cols.length < 3) continue;

        const title = idxTitle > -1 ? cols[idxTitle] : "Titolo mancante";
        const titleUrl = idxTitleLink > -1 ? cols[idxTitleLink] : "";
        const publisher = idxPublisher > -1 ? cols[idxPublisher] : "";
        const publisherUrl = idxPublisherUrl > -1 ? cols[idxPublisherUrl] : "";
        const coverImage = idxImage > -1 ? cols[idxImage] : "";
        const imageClickUrl = idxImageClickLink > -1 ? cols[idxImageClickLink] : "";
        const subject = idxSubject > -1 ? cols[idxSubject] : "";
        const tagsString = idxTags > -1 ? cols[idxTags] : "";
        const description = idxDesc > -1 ? cols[idxDesc] : "";
        const buyUrl = idxBuy > -1 ? cols[idxBuy] : "";
        const previewUrl = idxPreview > -1 ? cols[idxPreview] : "";
        
        const author = idxAuthor > -1 ? cols[idxAuthor] : "";
        const whyRead = idxWhyRead > -1 ? cols[idxWhyRead] : "";

        const brand = idxBrand > -1 ? cols[idxBrand] : "";
        const objectivesString = idxObjectives > -1 ? cols[idxObjectives] : "";

        const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);
        const educationalObjectives = objectivesString.split(',').map(t => t.trim()).filter(t => t);
        
        const links = [];
        if (buyUrl) links.push({ label: "Acquista", url: buyUrl, type: 'primary' as const });
        if (previewUrl) links.push({ label: "Sfoglia l'anteprima", url: previewUrl, type: 'secondary' as const });

        result.push({
            title,
            titleUrl,
            coverImage,
            imageClickUrl,
            description,
            subject,
            publisher,
            publisherUrl,
            tags,
            links,
            author,
            whyRead,
            brand,
            educationalObjectives
        });
    }
    
    return result;
};