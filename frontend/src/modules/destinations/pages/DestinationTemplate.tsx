import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateDestinationSchema } from '@/lib/seo';
import { Destination } from '../types/destination.types';
import { getDestinationWhatsAppUrl } from '../utils/destination.utils';
import { RelatedDestinations } from '../components/RelatedDestinations';
import { DestinationQuickInfo } from '../components/DestinationQuickInfo';
import { DestinationAttractions } from '../components/DestinationAttractions';
import { DestinationGallery } from '../components/DestinationGallery';
import { DestinationFAQ } from '../components/DestinationFAQ';
import { DestinationReviews } from '../components/DestinationReviews';
import { DestinationFleetSection } from '../components/DestinationFleetSection';
import { DestinationHero } from '../components/DestinationHero';
import { BookingCTA } from '@/shared/components/display/BookingCTA';

interface DestinationTemplateProps {
  destination: Destination;
  relatedDestinations: Destination[];
}

export default function DestinationTemplate({
  destination,
  relatedDestinations,
}: DestinationTemplateProps) {
  const canonicalUrl = destination.canonicalSlug
    ? ROUTES.destinationDetail(destination.canonicalSlug)
    : ROUTES.destinationDetail(destination.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: ROUTES.HOME },
    { name: 'Destinations', url: ROUTES.DESTINATIONS },
    { name: destination.name, url: canonicalUrl },
  ]);

  const faqSchema = destination.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: destination.faqs.map((faq) => ({
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
    generateDestinationSchema(destination) as unknown as Record<string, unknown>,
    breadcrumbSchema as unknown as Record<string, unknown>,
  ];
  if (faqSchema) {
    jsonLdData.push(faqSchema as unknown as Record<string, unknown>);
  }

  return (
    <>
      <JsonLd data={jsonLdData} />

      <article className="bg-gradient-to-b from-cream via-white to-cream-dark/30 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Destinations', href: ROUTES.DESTINATIONS },
              { label: destination.name, href: canonicalUrl },
            ]}
          />
        </div>

        {/* Full-width Premium Hero */}
        <DestinationHero
          title={destination.name}
          subtitle={destination.shortDescription || destination.description}
          backgroundImage={destination.heroImage || destination.image}
          badgeText={destination.district}
          rating={destination.rating}
          ratingCount={destination.reviewsCount}
          destinationName={destination.name}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Quick Info Grid */}
          <DestinationQuickInfo destination={destination} />

          {/* Detailed Overview & Highlights */}
          <section className="max-w-4xl mx-auto my-16 bg-white p-8 md:p-14 rounded-3xl shadow-premium border border-gray-100/50">
            <h2 className="text-2xl md:text-3.5xl font-bold font-serif text-gray-950 mb-6 leading-tight">
              About {destination.name}
            </h2>
            <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
              <p>{destination.overview || destination.description}</p>
              {destination.additionalInfo?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {destination.highlights && destination.highlights.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-150/60">
                <h3 className="text-xl font-bold font-serif text-gray-950 mb-5">Key Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary-green mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base font-semibold font-sans">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Attractions */}
          <DestinationAttractions
            attractions={destination.attractions}
            destinationName={destination.name}
          />

          {/* Gallery */}
          <DestinationGallery
            gallery={destination.gallery}
            destinationName={destination.name}
          />

          {/* Reviews */}
          <DestinationReviews
            reviews={destination.reviews}
            destinationName={destination.name}
          />

          {/* FAQ */}
          <DestinationFAQ
            faqs={destination.faqs}
            destinationName={destination.name}
          />

          {/* Reusable Booking / Enquiry CTA */}
          <BookingCTA
            title={`Plan Your Trip to ${destination.name} Today`}
            description="Our travel experts will create a customized itinerary including houseboats, luxury cabs, and hotel reservations."
            whatsappUrl={getDestinationWhatsAppUrl(destination.name, 'enquire')}
            className="my-16"
          />

          {/* Related Destinations */}
          <RelatedDestinations destinations={relatedDestinations} />

          {/* Destination Fleet Section */}
          <DestinationFleetSection destination={destination} />
        </div>
      </article>
    </>
  );
}

