export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  distance?: string;
  duration?: string;
}

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
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Destination {
  id: number | string;
  slug: string;
  canonicalSlug?: string;
  name: string;
  district: string;
  state?: string;
  image: string;
  heroImage?: string;
  rating: number;
  reviewsCount?: number;
  description: string;
  shortDescription?: string;
  overview?: string;
  additionalInfo?: string[];
  highlights?: string[];
  bestTimeToVisit?: string;
  attractions?: Attraction[];
  gallery?: GalleryImage[];
  faqs?: FAQ[];
  reviews?: Review[];
  seo?: SEOData;
  recommendedVehicleSlugs?: string[];
}
