import React from 'react';
import Link from 'next/link';
import { Clock, Banknote, ArrowRight } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { TourPackage } from '../types/package.types';

interface RelatedPackagesProps {
  packages: TourPackage[];
  title?: string;
}

export function RelatedPackages({ packages, title = "Other Packages You Might Like" }: RelatedPackagesProps) {
  if (!packages || packages.length === 0) return null;

  return (
    <section className="my-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-2 text-center md:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Link
            key={pkg.id}
            href={`/packages/${pkg.slug}`}
            className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <AppImage
                src={pkg.heroImage}
                alt={pkg.name}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-emerald-600/90 text-white backdrop-blur-sm px-3 py-1 rounded-full z-10 text-xs font-semibold shadow-sm">
                {pkg.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                {pkg.name}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-4 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1.5" />
                On Request
              </div>

              {pkg.pricing && (
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pricing</span>
                    <span className="text-lg font-bold text-emerald-600 flex items-center">
                      On Request
                    </span>
                  </div>
                  <div className="text-emerald-600 group-hover:translate-x-1 transition-transform bg-emerald-50 p-2 rounded-full">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
