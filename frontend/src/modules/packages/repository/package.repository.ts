import { mockPackages } from '../data/packages';
import { TourPackage } from '../types/package.types';

class PackageRepository {
  /**
   * Get all tour packages
   */
  async getAllPackages(): Promise<TourPackage[]> {
    // In a real app, this would be an API call
    return Promise.resolve(mockPackages);
  }

  /**
   * Get a specific package by its slug
   */
  async getPackageBySlug(slug: string): Promise<TourPackage | undefined> {
    const packages = await this.getAllPackages();
    return packages.find(p => p.slug === slug);
  }

  /**
   * Get packages by category
   */
  async getPackagesByCategory(category: string): Promise<TourPackage[]> {
    const packages = await this.getAllPackages();
    return packages.filter(p => p.category === category);
  }

  /**
   * Get related packages, optionally excluding the current package
   */
  async getRelatedPackages(category: string, currentSlug: string): Promise<TourPackage[]> {
    const allRelated = await this.getPackagesByCategory(category);
    const filtered = allRelated.filter(p => p.slug !== currentSlug);
    
    // If not enough related in the same category, get some others
    if (filtered.length < 3) {
      const allPackages = await this.getAllPackages();
      const others = allPackages.filter(p => p.category !== category && p.slug !== currentSlug);
      return [...filtered, ...others].slice(0, 3);
    }
    
    return filtered.slice(0, 3);
  }

  /**
   * Normalize a string into a URL-friendly slug
   */
  normalizeSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}

export const packageRepository = new PackageRepository();
