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
import { StaticImageData } from 'next/image';

export interface GalleryImage {
  url: string | StaticImageData;
  alt: string;
  caption?: string;
  category?: 'Exterior' | 'Interior' | 'Dashboard' | 'Rear Seats' | 'Luggage Space' | string;
}

export interface DestinationRoute {
  name: string;
  image: string;
  distance: string;
  duration: string;
  slug?: string;
}

export interface VehicleSpecifications {
  vehicle?: Record<string, string>;
  comfort?: Record<string, string>;
  safety?: Record<string, string>;
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
  
  image: string | StaticImageData;
  heroImage: string | StaticImageData;
  heroBackdrop?: string;
  gallery?: GalleryImage[];

  seatCapacity: number;
  luggageCapacity: number;

  fuelType?: string;
  transmission?: string;
  airConditioning?: boolean;
  engine?: string;
  safetyRating?: string;
  airbags?: string;

  shortDescription: string;
  overview?: string;

  highlights?: string[];
  features?: Feature[];
  amenities?: Amenity[];
  tags?: string[];

  specifications?: VehicleSpecifications;
  destinations?: DestinationRoute[];

  includedServices?: string[];
  idealFor?: string[];

  pricing?: Pricing;
  rating: number;

  faqs?: FAQ[];
  reviews?: Review[];

  seo?: SEOData;
}
