import { testimonials } from '../data/testimonials';
import { Testimonial } from '../types/testimonial.types';

export const testimonialsRepository = {
  getAll: async (limit?: number): Promise<Testimonial[]> => {
    if (limit !== undefined) {
      return testimonials.slice(0, limit);
    }
    return testimonials;
  }
};
