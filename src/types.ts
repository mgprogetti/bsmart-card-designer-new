export interface ProductLink {
  url: string;
  label: string;
  type: 'primary' | 'secondary';
}

export type CardVariant = 'comic' | 'book' | 'product' | 'simple';

export interface ProductData {
  id?: number | string; // WP ID (number) or Local ID (string)
  title: string; // Internal Title for WP Admin (Nome Card)
  
  // Card Content
  cardTitle: string; // Title displayed on card (Titolo Visibile)
  titleUrl?: string;
  coverImage: string;
  imageClickUrl?: string;
  description: string;
  subject: string;
  publisher: string;
  publisherUrl?: string;
  tags: string[];
  links: ProductLink[];
  
  // Fields for Book variant
  author?: string;
  whyRead?: string;

  // Fields for Product / Simple variant
  brand?: string;
  educationalObjectives?: string[];

  cardVariant?: CardVariant;
}

export interface SavedCard {
    id: number | string;
    title: string; // Internal Name
    data: ProductData; // Raw JSON data for editing
    shortcode: string;
    date: string;
}