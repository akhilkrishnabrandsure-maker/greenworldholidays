export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  overnightStay?: string;
  activities?: string[];
  meals?: string[];
}

export interface PricingInfo {
  startingPrice: string;
  priceNote?: string;
  discountPercentage?: number;
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
  rating: number;
  comment: string;
  date: string;
  location?: string;
  avatar?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  category: string;
  duration: string;
  heroImage: string;
  gallery?: GalleryImage[];
  shortDescription: string;
  overview?: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  includedServices?: string[];
  excludedServices?: string[];
  coveredDestinations?: string[]; // SLUGS referencing destinations
  availableVehicles?: string[];    // SLUGS referencing vehicles
  pricing?: PricingInfo;
  faqs?: FAQ[];
  reviews?: Review[];
  seo?: SEOData;
}
