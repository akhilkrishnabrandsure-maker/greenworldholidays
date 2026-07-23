import React from 'react';
import { MapPin, Banknote, Car, Shield } from 'lucide-react';
import { Service } from '../types/service.types';
import { SpecificationCard } from '@/modules/vehicles/components/SpecificationCard';

interface ServiceQuickInfoProps {
  service: Service;
}

export function ServiceQuickInfo({ service }: ServiceQuickInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <SpecificationCard 
        icon={Shield} 
        label="Service Category" 
        value={service.category} 
      />
      
      <SpecificationCard 
        icon={MapPin} 
        label="Availability" 
        value={service.serviceAreas && service.serviceAreas.length > 0 ? `${service.serviceAreas.length} Areas` : 'Kerala Wide'} 
      />
      
      {service.pricing && (
        <SpecificationCard 
          icon={Banknote} 
          label="Starting Price" 
          value={service.pricing.startingPrice} 
        />
      )}
      
      {service.availableVehicles && service.availableVehicles.length > 0 && (
        <SpecificationCard 
          icon={Car} 
          label="Fleet Options" 
          value={`${service.availableVehicles.length} Options`} 
        />
      )}
    </div>
  );
}
