import React from 'react';
import { Users, Briefcase, Fuel, Settings, Snowflake } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';
import { SpecificationCard } from './SpecificationCard';

interface VehicleQuickInfoProps {
  vehicle: Vehicle;
}

export function VehicleQuickInfo({ vehicle }: VehicleQuickInfoProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <SpecificationCard 
        icon={Users} 
        label="Seat Capacity" 
        value={`${vehicle.seatCapacity} Seats`} 
      />
      
      <SpecificationCard 
        icon={Briefcase} 
        label="Luggage Capacity" 
        value={`${vehicle.luggageCapacity} Bags`} 
      />
      
      {vehicle.fuelType && (
        <SpecificationCard 
          icon={Fuel} 
          label="Fuel Type" 
          value={vehicle.fuelType} 
        />
      )}
      
      {vehicle.transmission && (
        <SpecificationCard 
          icon={Settings} 
          label="Transmission" 
          value={vehicle.transmission} 
        />
      )}
    </div>
  );
}
