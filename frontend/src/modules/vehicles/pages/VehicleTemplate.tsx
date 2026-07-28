import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateVehicleSchema } from '@/lib/seo';
import { Vehicle } from '../types/vehicle.types';
import { VehicleQuickInfo } from '../components/VehicleQuickInfo';
import { VehicleOverview } from '../components/VehicleOverview';
import { VehicleAmenities } from '../components/VehicleAmenities';
import { VehicleGallery } from '../components/VehicleGallery';
import { VehicleFAQ } from '../components/VehicleFAQ';
import { VehicleReviews } from '../components/VehicleReviews';
import { RelatedVehicles } from '../components/RelatedVehicles';
import { HeroBanner } from '@/shared/components/display/HeroBanner';
import { BookingCTA } from '@/shared/components/display/BookingCTA';

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
    { name: 'Vehicles', url: ROUTES.VEHICLES },
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

  // Create a specialized whatsapp message for vehicles
  const whatsappMessage = `Hi! I'm interested in renting the ${vehicle.name}. Could you please provide more details about availability and pricing?`;
  const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <JsonLd data={jsonLdData} />

      <article className="bg-gradient-to-b from-cream via-white to-cream-dark/30 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <Breadcrumb
            className="mb-8"
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Vehicles', href: ROUTES.VEHICLES },
              { label: vehicle.name, href: canonicalUrl },
            ]}
          />

          {/* Hero Banner */}
          <HeroBanner
            title={vehicle.name}
            subtitle={vehicle.shortDescription}
            backgroundImage={vehicle.heroImage || vehicle.image}
            badgeText={vehicle.category}
            rating={vehicle.rating}
            ratingLabel="Google Rating"
            className="mb-12"
          />

          {/* Quick Info Grid */}
          <VehicleQuickInfo vehicle={vehicle} />

          {/* Detailed Overview & Highlights */}
          <VehicleOverview vehicle={vehicle} />

          {/* Amenities & Features */}
          <VehicleAmenities vehicle={vehicle} />

          {/* Gallery */}
          <VehicleGallery
            gallery={vehicle.gallery}
            vehicleName={vehicle.name}
          />

          {/* Reviews */}
          <VehicleReviews
            reviews={vehicle.reviews}
            vehicleName={vehicle.name}
          />

          {/* FAQ */}
          <VehicleFAQ
            faqs={vehicle.faqs}
            vehicleName={vehicle.name}
          />

          {/* Reusable Booking / Enquiry CTA */}
          <BookingCTA
            title={`Book the ${vehicle.name} Today`}
            description={`Our travel experts will ensure a comfortable and hassle-free journey with our well-maintained ${vehicle.category.toLowerCase()} fleet.`}
            whatsappUrl={whatsappUrl}
            className="my-16"
          />

          {/* Related Vehicles */}
          <RelatedVehicles vehicles={relatedVehicles} />
        </div>
      </article>
    </>
  );
}
