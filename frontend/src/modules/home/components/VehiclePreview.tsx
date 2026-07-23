import React from 'react';
import { vehicleRepository } from '@/modules/vehicles/repository/vehicle.repository';
import { VehicleFilterList } from './VehicleFilterList';

export async function VehiclePreview() {
  const vehicles = await vehicleRepository.getAll();

  return (
    <section id="vehicles" className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <VehicleFilterList initialVehicles={vehicles} />
    </section>
  );
}

