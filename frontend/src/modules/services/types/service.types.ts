export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  location?: string;
}

export interface PricingInfo {
  startingPrice: string;
  priceNote?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;

  heroImage: string;
  gallery?: GalleryImage[];

  shortDescription: string;
  overview?: string;

  highlights?: string[];
  benefits?: string[];
  includedServices?: string[];

  availableVehicles?: string[]; // IDs or slugs of available vehicles
  relatedDestinations?: string[]; // Slugs of related destinations
  serviceAreas?: string[];

  pricing?: PricingInfo;

  faqs?: FAQ[];
  reviews?: Review[];
  relatedServices?: string[]; // Slugs of related services

  bookingInformation?: string;

  seo?: SEOData;
}
