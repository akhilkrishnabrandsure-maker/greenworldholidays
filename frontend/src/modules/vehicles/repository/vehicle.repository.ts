import { vehicles } from '../data/vehicles';
import { Vehicle } from '../types/vehicle.types';

export const vehicleRepository = {
  getAll: async (): Promise<Vehicle[]> => {
    return vehicles;
  },

  getVehicleBySlug: async (slug: string): Promise<Vehicle | undefined> => {
    const normalizedSlug = vehicleRepository.normalizeSlug(slug);
    return vehicles.find(v => v.slug === normalizedSlug);
  },

  normalizeSlug: (slug: string): string => {
    const slugMap: Record<string, string> = {
      'innova': 'toyota-innova-crysta',
      'crysta': 'toyota-innova-crysta',
      'ertiga': 'maruti-ertiga',
      'dzire': 'maruti-dzire',
      'tempo-traveller': 'force-traveller',
      '35-seater-bus': 'bharath-benz-glider-34',
    };
    return slugMap[slug.toLowerCase()] || slug.toLowerCase();
  },

  getPopularVehicles: async (): Promise<Vehicle[]> => {
    // Return top rated vehicles
    return vehicles.filter(v => v.rating >= 4.7).slice(0, 4);
  },

  getLuxuryVehicles: async (): Promise<Vehicle[]> => {
    return vehicles.filter(v => 
      v.category === 'Bus' && v.pricing && parseInt(v.pricing.rate.replace(/[^0-9]/g, '')) >= 10000
    );
  },

  getVehiclesByCategory: async (category: string): Promise<Vehicle[]> => {
    return vehicles.filter(v => v.category.toLowerCase() === category.toLowerCase());
  },

  getVehiclesBySeatCapacity: async (minSeats: number, maxSeats?: number): Promise<Vehicle[]> => {
    return vehicles.filter(v => {
      if (maxSeats) {
        return v.seatCapacity >= minSeats && v.seatCapacity <= maxSeats;
      }
      return v.seatCapacity >= minSeats;
    });
  },

  getRelatedVehicles: async (category: string, excludeSlug: string): Promise<Vehicle[]> => {
    return vehicles
      .filter(v => v.category === category && v.slug !== excludeSlug)
      .slice(0, 3);
  },

  searchVehicles: async (query: string): Promise<Vehicle[]> => {
    const lowerQuery = query.toLowerCase();
    return vehicles.filter(v => 
      v.name.toLowerCase().includes(lowerQuery) || 
      v.category.toLowerCase().includes(lowerQuery)
    );
  }
};
