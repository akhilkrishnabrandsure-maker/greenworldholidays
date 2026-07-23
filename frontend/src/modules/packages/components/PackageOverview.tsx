import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { TourPackage } from '../types/package.types';

interface PackageOverviewProps {
  tourPackage: TourPackage;
}

export function PackageOverview({ tourPackage }: PackageOverviewProps) {
  if (!tourPackage.overview && !tourPackage.highlights?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-14 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Trip Overview
      </h2>
      
      {tourPackage.overview && (
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
          <p>{tourPackage.overview}</p>
        </div>
      )}

      {tourPackage.highlights && tourPackage.highlights.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Sparkles className="h-6 w-6 text-amber-500 mr-2" />
            Trip Highlights
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {tourPackage.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
