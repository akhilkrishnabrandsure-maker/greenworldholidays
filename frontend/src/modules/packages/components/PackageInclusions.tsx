import React from 'react';
import { Check, X } from 'lucide-react';
import { TourPackage } from '../types/package.types';

interface PackageInclusionsProps {
  tourPackage: TourPackage;
}

export function PackageInclusions({ tourPackage }: PackageInclusionsProps) {
  const hasInclusions = tourPackage.includedServices && tourPackage.includedServices.length > 0;
  const hasExclusions = tourPackage.excludedServices && tourPackage.excludedServices.length > 0;

  if (!hasInclusions && !hasExclusions) return null;

  return (
    <section className="max-w-6xl mx-auto my-14 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Inclusions & Exclusions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          What is covered in the package price and what is not.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inclusions */}
        {hasInclusions && (
          <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 shadow-sm">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-emerald-600" />
              </div>
              What's Included
            </h3>
            <ul className="space-y-4">
              {tourPackage.includedServices!.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {hasExclusions && (
          <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100 shadow-sm">
            <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <X className="h-5 w-5 text-red-600" />
              </div>
              What's Excluded
            </h3>
            <ul className="space-y-4">
              {tourPackage.excludedServices!.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
