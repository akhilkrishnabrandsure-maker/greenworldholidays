import React from 'react';
import { MapPin, Star, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AppImage } from '@/shared/components/display/AppImage';
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

      <article className="bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <Breadcrumb
            className="mb-6"
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Destinations', href: ROUTES.DESTINATIONS },
              { label: destination.name, href: canonicalUrl },
            ]}
          />

          {/* Hero Header & Title */}
          <header className="mb-8 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              {destination.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              {destination.shortDescription || destination.description}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center font-medium">
                <MapPin className="h-4 w-4 text-emerald-600 mr-1.5" />
                {destination.district}{destination.state ? `, ${destination.state}` : ''}
              </span>
              <span className="flex items-center font-medium">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1.5" />
                {destination.rating} {destination.reviewsCount ? `(${destination.reviewsCount} reviews)` : ''}
              </span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="w-full h-[45vh] md:h-[65vh] relative mb-10 rounded-3xl overflow-hidden shadow-2xl">
            <AppImage
              src={destination.heroImage || destination.image}
              alt={destination.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Quick Info Grid */}
          <DestinationQuickInfo destination={destination} />

          {/* Detailed Overview & Highlights */}
          <section className="max-w-4xl mx-auto my-14 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              About {destination.name}
            </h2>
            <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
              <p>{destination.overview || destination.description}</p>
              {destination.additionalInfo?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {destination.highlights && destination.highlights.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base font-medium">{highlight}</span>
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
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-14 text-center text-white my-16 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your Trip to {destination.name} Today
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Our travel experts will create a customized itinerary including houseboats, luxury cabs, and hotel reservations.
            </p>
            <a
              href={getDestinationWhatsAppUrl(destination.name, 'enquire')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-emerald-800 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Enquire Now on WhatsApp
            </a>
          </div>

          {/* Related Destinations */}
          <RelatedDestinations destinations={relatedDestinations} />
        </div>
      </article>
    </>
  );
}
