import React from 'react';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { packageRepository } from '../repository/package.repository';
import { destinationRepository } from '@/modules/destinations/repository/destination.repository';
import { vehicleRepository } from '@/modules/vehicles/repository/vehicle.repository';
import { generatePackageSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';

// Package Components
import { PackageHero } from '../components/PackageHero';
import { PackageQuickInfo } from '../components/PackageQuickInfo';
import { PackageOverview } from '../components/PackageOverview';
import { PackageItinerary } from '../components/PackageItinerary';
import { PackageInclusions } from '../components/PackageInclusions';
import { PackageGallery } from '../components/PackageGallery';
import { PackageReviews } from '../components/PackageReviews';
import { PackageFAQ } from '../components/PackageFAQ';
import { RelatedPackages } from '../components/RelatedPackages';

// Shared/Reused Components
import { DestinationGrid } from '@/modules/destinations/components/DestinationGrid';
import { RelatedVehicles } from '@/modules/vehicles/components/RelatedVehicles';
import { FinalCTA } from '@/modules/home/components/FinalCTA';

interface PackageTemplateProps {
  slug: string;
}

export async function PackageTemplate({ slug }: PackageTemplateProps) {
  const tourPackage = await packageRepository.getPackageBySlug(slug);

  if (!tourPackage) {
    notFound();
  }

  // Fetch related data
  const relatedPackages = await packageRepository.getRelatedPackages(tourPackage.category, tourPackage.slug);
  
  const coveredDestinations = tourPackage.coveredDestinations 
    ? await Promise.all(tourPackage.coveredDestinations.map(ds => destinationRepository.getBySlug(ds)))
    : [];
  const validDestinations = coveredDestinations.filter(Boolean) as any[];

  const availableVehicles = tourPackage.availableVehicles 
    ? await Promise.all(tourPackage.availableVehicles.map(vs => vehicleRepository.getVehicleBySlug(vs)))
    : [];
  const validVehicles = availableVehicles.filter(Boolean) as any[];

  // SEO schemas
  const packageSchema = generatePackageSchema({
    name: tourPackage.name,
    description: tourPackage.shortDescription,
    image: tourPackage.heroImage,
    slug: tourPackage.slug,
    touristType: [tourPackage.category]
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Packages', url: '/#packages' },
    { name: tourPackage.name, url: `/packages/${tourPackage.slug}` }
  ]);

  const faqSchema = tourPackage.faqs && tourPackage.faqs.length > 0 
    ? generateFAQSchema(tourPackage.faqs)
    : null;

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      <Script
        id="package-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PackageHero title={tourPackage.name} image={tourPackage.heroImage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <Breadcrumb
          items={[
            { label: 'Packages', href: '/#packages' },
            { label: tourPackage.name, href: '#' }
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <PackageQuickInfo tourPackage={tourPackage} />
        
        <PackageOverview tourPackage={tourPackage} />
        
        <PackageItinerary itinerary={tourPackage.itinerary} />

        <PackageInclusions tourPackage={tourPackage} />

        {validDestinations.length > 0 && (
          <section className="my-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
              Covered Destinations
            </h2>
            <DestinationGrid destinations={validDestinations} showLearnMore={false} />
          </section>
        )}

        {validVehicles.length > 0 && (
          <RelatedVehicles vehicles={validVehicles} title="Available Vehicles for this Package" />
        )}

        {tourPackage.gallery && tourPackage.gallery.length > 0 && (
          <PackageGallery gallery={tourPackage.gallery} packageName={tourPackage.name} />
        )}

        {tourPackage.faqs && tourPackage.faqs.length > 0 && (
          <PackageFAQ faqs={tourPackage.faqs} packageName={tourPackage.name} />
        )}

        {tourPackage.reviews && tourPackage.reviews.length > 0 && (
          <PackageReviews reviews={tourPackage.reviews} packageName={tourPackage.name} />
        )}

        <RelatedPackages packages={relatedPackages} />
      </div>

      <FinalCTA />
    </article>
  );
}
