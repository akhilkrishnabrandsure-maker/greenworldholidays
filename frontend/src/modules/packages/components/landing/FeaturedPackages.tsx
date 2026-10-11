import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { packageRepository } from '../../repository/package.repository';
import { ROUTES } from '@/constants/routes';

export async function FeaturedPackages() {
  // Fetch packages dynamically from the repository
  const packages = await packageRepository.getAllPackages();
  // For the featured section, we take the top 4
  const featuredPackages = packages.slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
              Signature Journeys
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
              Featured Tour Packages
            </h2>
          </div>
          <Link 
            href={ROUTES.PACKAGES}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-primary-green transition-colors group"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-12 md:space-y-24">
          {featuredPackages.map((pkg, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article 
                key={pkg.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 lg:gap-16 items-center bg-cream md:bg-transparent rounded-4xl md:rounded-none overflow-hidden p-4 md:p-0 border border-gray-100 md:border-none shadow-sm md:shadow-none`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative">
                  <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-premium group">
                    <AppImage
                      src={pkg.heroImage}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Badge */}
                    {idx === 0 && (
                      <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md text-primary-green text-[10px] font-extrabold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm">
                        Most Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'md:pr-12' : 'md:pl-12'} p-4 md:p-0`}>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-luxury-gold-dark" />
                      On Request
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-luxury-gold-dark" />
                      <span className="truncate max-w-[200px]">
                        On Request
                      </span>
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold font-serif text-gray-900 mb-6 leading-tight">
                    {pkg.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed font-light mb-8">
                    {pkg.shortDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
                    <div>
                      <span className="block text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-1">
                        Pricing
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        On Request
                      </span>
                    </div>
                    <Link
                      href={ROUTES.packageDetail(pkg.slug)}
                      className="inline-flex items-center justify-center bg-white border border-gray-300 hover:border-primary-green hover:text-primary-green text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition-all duration-300"
                    >
                      Explore Package
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
