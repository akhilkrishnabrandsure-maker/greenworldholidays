import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { WhyKerala } from '../components/WhyKerala';
import { DestinationPreview } from '../components/DestinationPreview';
import { VehiclePreview } from '../components/VehiclePreview';
import { Testimonials } from '../components/Testimonials';
import { FinalCTA } from '../components/FinalCTA';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateLocalBusinessSchema } from '@/lib/seo';

export default async function HomePage() {
  const businessSchema = generateLocalBusinessSchema();

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={businessSchema} />
      <Hero />
      <WhyKerala />
      <DestinationPreview />
      <VehiclePreview />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}

