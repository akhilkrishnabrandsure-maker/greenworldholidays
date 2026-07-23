import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AppImage } from '@/shared/components/display/AppImage';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateVehicleSchema } from '@/lib/seo';
import { Vehicle } from '../types/vehicle.types';
import { getDestinationWhatsAppUrl } from '@/modules/destinations/utils/destination.utils';
import { VehicleQuickInfo } from '../components/VehicleQuickInfo';
import { VehicleOverview } from '../components/VehicleOverview';
import { VehicleAmenities } from '../components/VehicleAmenities';
import { VehicleGallery } from '../components/VehicleGallery';
import { VehicleFAQ } from '../components/VehicleFAQ';
import { VehicleReviews } from '../components/VehicleReviews';
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

      <article className="bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Vehicles', href: ROUTES.VEHICLES }, // Note: We might need a vehicles list page in the future
              { label: vehicle.name, href: canonicalUrl },
            ]}
          />

          {/* Hero Header & Title */}
          <header className="mb-8 text-center max-w-4xl mx-auto">
            <div className="mb-4 inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
              {vehicle.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              {vehicle.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              {vehicle.shortDescription}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center font-medium">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1.5" />
                {vehicle.rating} Rating
              </span>
              {vehicle.pricing && (
                <span className="flex items-center font-bold text-emerald-600">
                  {vehicle.pricing.rate} <span className="text-gray-500 font-normal ml-1">{vehicle.pricing.period}</span>
                </span>
              )}
            </div>
          </header>

          {/* Hero Image */}
          <div className="w-full h-[40vh] md:h-[60vh] relative mb-10 rounded-3xl overflow-hidden shadow-2xl bg-white">
            <AppImage
              src={vehicle.heroImage || vehicle.image}
              alt={vehicle.name}
              fill
              priority
              className="object-contain md:object-cover"
              sizes="100vw"
            />
          </div>

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
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-14 text-center text-white my-16 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book the {vehicle.name} Today
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Our travel experts will ensure a comfortable and hassle-free journey with our well-maintained {vehicle.category.toLowerCase()} fleet.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Enquire Now on WhatsApp
            </a>
          </div>

          {/* Related Vehicles */}
          <RelatedVehicles vehicles={relatedVehicles} />
        </div>
      </article>
    </>
  );
}
