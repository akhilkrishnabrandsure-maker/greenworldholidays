import React from 'react';
import { ROUTES } from '@/constants/routes';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateVehicleSchema } from '@/lib/seo';
import { Vehicle } from '../types/vehicle.types';

// Luxury Component Imports
import { VehicleHeroSection } from '../components/VehicleHeroSection';
import { VehicleQuickHighlights } from '../components/VehicleQuickHighlights';
import { VehicleEditorialGallery } from '../components/VehicleEditorialGallery';
import { VehicleInfoSection } from '../components/VehicleInfoSection';
import { VehiclePromiseSection } from '../components/VehiclePromiseSection';
import { VehiclePopularRoutes } from '../components/VehiclePopularRoutes';
import { VehicleFAQ } from '../components/VehicleFAQ';
import { VehicleFinalCTA } from '../components/VehicleFinalCTA';
import { RelatedVehicles } from '../components/RelatedVehicles';

interface VehicleTemplateProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export default function VehicleTemplate({
  vehicle,
  relatedVehicles,
}: VehicleTemplateProps) {
  const canonicalUrl = ROUTES.vehicleDetail(vehicle.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: ROUTES.HOME },
    { name: 'Fleet', url: ROUTES.VEHICLES },
    { name: vehicle.name, url: canonicalUrl },
  ]);

  const faqSchema = vehicle.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: vehicle.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  const jsonLdData: Record<string, unknown>[] = [
    generateVehicleSchema({
      ...vehicle,
      description: vehicle.shortDescription,
    }) as unknown as Record<string, unknown>,
    breadcrumbSchema as unknown as Record<string, unknown>,
  ];
  if (faqSchema) {
    jsonLdData.push(faqSchema as unknown as Record<string, unknown>);
  }

  // Filter related vehicles by same category, filling remaining slots with others
  const otherVehicles = relatedVehicles.filter((v) => v.id !== vehicle.id);
  const sameCategoryVehicles = otherVehicles.filter((v) => v.category === vehicle.category);
  const differentCategoryVehicles = otherVehicles.filter((v) => v.category !== vehicle.category);
  const displayRelated = [...sameCategoryVehicles, ...differentCategoryVehicles].slice(0, 3);

  return (
    <>
      <JsonLd data={jsonLdData} />

      <article className="bg-[#FDFBF7] min-h-screen text-gray-900 selection:bg-emerald-800 selection:text-white">
        {/* 1. Immersive Hero Section with Floating Glassmorphic Booking Widget */}
        <VehicleHeroSection vehicle={vehicle} />

        {/* 2. Quick Highlights Bar */}
        <VehicleQuickHighlights vehicle={vehicle} />

        {/* 3. Editorial Photo Gallery & Lightbox */}
        <VehicleEditorialGallery
          gallery={vehicle.gallery}
          vehicleName={vehicle.name}
          defaultImage={vehicle.image}
        />

        {/* 4. Editorial Vehicle Overview & Technical Specification Cards */}
        <VehicleInfoSection vehicle={vehicle} />

        {/* 5. The Green World Promise (Luxury Guarantees) */}
        <VehiclePromiseSection />

        {/* 6. Perfect Destinations for This Vehicle */}
        <VehiclePopularRoutes vehicle={vehicle} />

        {/* 7. Fleet Recommendations */}
        <RelatedVehicles vehicles={displayRelated} title="Alternative Vehicles" />

        {/* 8. Minimal FAQ Accordion */}
        <VehicleFAQ faqs={vehicle.faqs} vehicleName={vehicle.name} />

        {/* 9. Deep Emerald Final CTA Banner */}
        <VehicleFinalCTA vehicle={vehicle} />
      </article>
    </>
  );
}
