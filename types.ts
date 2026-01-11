export interface ProductLink {
  url: string;
  label: string;
  type: 'primary' | 'secondary';
}

export type CardVariant = 'comic' | 'book' | 'product' | 'simple';

export interface ProductData {
  title: string;
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