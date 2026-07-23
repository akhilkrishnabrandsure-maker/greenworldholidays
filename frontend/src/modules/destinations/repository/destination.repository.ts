import { destinations } from '../data/destinations';
import { Destination } from '../types/destination.types';

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().trim();
}

export const destinationRepository = {
  getAll: async (): Promise<Destination[]> => {
    return destinations;
  },

  getById: async (id: number | string): Promise<Destination | undefined> => {
    return destinations.find((destination) => String(destination.id) === String(id));
  },

  getBySlug: async (slug: string): Promise<Destination | undefined> => {
    const norm = normalizeSlug(slug);
    
    // 1. Direct slug or canonicalSlug match
    const exactMatch = destinations.find(
      (destination) =>
        normalizeSlug(destination.slug) === norm ||
        (destination.canonicalSlug && normalizeSlug(destination.canonicalSlug) === norm)
    );
    if (exactMatch) return exactMatch;

    // 2. Fallback prefix/substring matching (e.g., 'munnar' -> 'munnar-hill-station')
    return destinations.find((destination) => {
      const destSlug = normalizeSlug(destination.slug);
      return destSlug.startsWith(norm) || norm.startsWith(destSlug);
    });
  },

  getSlugs: async (): Promise<string[]> => {
    const slugs = new Set<string>();
    destinations.forEach((d) => {
      slugs.add(d.slug);
      if (d.canonicalSlug) {
        slugs.add(d.canonicalSlug);
      }
    });
    return Array.from(slugs);
  },

  getRelated: async (slug: string, limit = 3): Promise<Destination[]> => {
    const current = await destinationRepository.getBySlug(slug);
    if (!current) return [];

    const sameDistrict = destinations.filter(
      (d) => d.id !== current.id && d.district === current.district
    );
    const sameState = destinations.filter(
      (d) => d.id !== current.id && d.district !== current.district && d.state === current.state
    );
    const others = destinations.filter(
      (d) => d.id !== current.id && d.district !== current.district && d.state !== current.state
    );

    return [...sameDistrict, ...sameState, ...others].slice(0, limit);
  },
};
