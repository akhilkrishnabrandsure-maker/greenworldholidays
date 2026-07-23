import { travelServices, carRentalServices, ServiceItem, detailedServices } from '../data/services';
import { Service } from '../types/service.types';

export const serviceRepository = {
  // Homepage Legacy Methods
  getTravelServices: async (): Promise<ServiceItem[]> => {
    return travelServices;
  },
  getCarRentalServices: async (): Promise<ServiceItem[]> => {
    return carRentalServices;
  },

  // Detailed Services Methods
  getAllServices: async (): Promise<Service[]> => {
    return detailedServices;
  },

  getServiceBySlug: async (slug: string): Promise<Service | undefined> => {
    return detailedServices.find(service => service.slug === slug);
  },

  getFeaturedServices: async (): Promise<Service[]> => {
    return detailedServices.slice(0, 3);
  },

  getRelatedServices: async (category: string, currentSlug: string): Promise<Service[]> => {
    return detailedServices
      .filter(service => service.category === category && service.slug !== currentSlug)
      .slice(0, 3);
  },

  normalizeSlug: (slug: string): string => {
    return slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
};
