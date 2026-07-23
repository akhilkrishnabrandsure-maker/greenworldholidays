export interface Feature {
  name: string;
  icon?: string;
}

export interface Amenity {
  name: string;
  icon?: string;
}

export interface Pricing {
  rate: string;
  period: string;
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

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: string;
  
  image: string;
  heroImage: string;
  gallery?: GalleryImage[];

  seatCapacity: number;
  luggageCapacity: number;

  fuelType?: string;
  transmission?: string;
  airConditioning?: boolean;

  shortDescription: string;
  overview?: string;

  highlights?: string[];
  features?: Feature[];
  amenities?: Amenity[];

  includedServices?: string[];
  idealFor?: string[];

  pricing?: Pricing;
  rating: number;

  faqs?: FAQ[];
  reviews?: Review[];

  seo?: SEOData;
}
