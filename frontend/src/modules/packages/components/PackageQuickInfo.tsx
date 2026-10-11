import React from 'react';
import { Clock, MapPin, Banknote, Shield } from 'lucide-react';
import { TourPackage } from '../types/package.types';
import { SpecificationCard } from '@/modules/vehicles/components/SpecificationCard';

interface PackageQuickInfoProps {
  tourPackage: TourPackage;
}

export function PackageQuickInfo({ tourPackage }: PackageQuickInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <SpecificationCard 
        icon={Clock} 
        label="Duration" 
        value="On Request" 
      />
      
      <SpecificationCard 
        icon={Shield} 
        label="Category" 
        value={tourPackage.category} 
      />
      
      {tourPackage.pricing && (
        <SpecificationCard 
          icon={Banknote} 
          label="Pricing" 
          value="On Request" 
        />
      )}
      
      {tourPackage.coveredDestinations && tourPackage.coveredDestinations.length > 0 && (
        <SpecificationCard 
          icon={MapPin} 
          label="Destinations" 
          value="On Request" 
        />
      )}
    </div>
  );
}
