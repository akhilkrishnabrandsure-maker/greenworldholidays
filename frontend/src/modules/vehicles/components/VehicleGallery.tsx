import React from 'react';
import { GalleryImage } from '../types/vehicle.types';
import { SectionHeader } from '@/shared/components/display/SectionHeader';
import { Gallery } from '@/shared/components/display/Gallery';

interface VehicleGalleryProps {
  gallery?: GalleryImage[];
  vehicleName: string;
}

export function VehicleGallery({ gallery, vehicleName }: VehicleGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="my-20">
      <SectionHeader
        title={`${vehicleName} Photo Gallery`}
        subtitle="Take a look at the interior comfort and external features of our premium fleet."
      />
      <Gallery images={gallery} />
    </section>
  );
}
