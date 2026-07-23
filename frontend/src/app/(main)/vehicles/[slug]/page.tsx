import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { vehicleRepository } from '@/modules/vehicles/repository/vehicle.repository';
import VehicleTemplate from '@/modules/vehicles/pages/VehicleTemplate';
import { constructMetadata } from '@/lib/seo';

interface VehiclePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = vehicleRepository.normalizeSlug(slug);
  const vehicle = await vehicleRepository.getVehicleBySlug(normalizedSlug);

  if (!vehicle) {
    return constructMetadata({
      title: 'Vehicle Not Found | Green World Holidays',
      description: 'The requested vehicle could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: vehicle.seo?.title || `${vehicle.name} Rental in Kerala | Green World Holidays`,
    description: vehicle.seo?.description || `Rent ${vehicle.name} for your Kerala tour. ${vehicle.shortDescription}`,
    image: vehicle.heroImage || vehicle.image,
    url: `/vehicles/${normalizedSlug}`,
  });
}

export async function generateStaticParams() {
  const vehicles = await vehicleRepository.getAll();
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const normalizedSlug = vehicleRepository.normalizeSlug(slug);
  const vehicle = await vehicleRepository.getVehicleBySlug(normalizedSlug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = await vehicleRepository.getRelatedVehicles(vehicle.category, vehicle.slug);

  return <VehicleTemplate vehicle={vehicle} relatedVehicles={relatedVehicles} />;
}
