import React from 'react';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { serviceRepository } from '../repository/service.repository';
import { vehicleRepository } from '@/modules/vehicles/repository/vehicle.repository';
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';

// Service Components
import { ServiceHero } from '../components/ServiceHero';
import { ServiceQuickInfo } from '../components/ServiceQuickInfo';
import { ServiceOverview } from '../components/ServiceOverview';
import { ServiceIncludedServices } from '../components/ServiceIncludedServices';
import { ServiceGallery } from '../components/ServiceGallery';
import { ServiceReviews } from '../components/ServiceReviews';
import { ServiceFAQ } from '../components/ServiceFAQ';
import { RelatedServices } from '../components/RelatedServices';

// Shared/Reused Components
import { RelatedVehicles } from '@/modules/vehicles/components/RelatedVehicles';
import { FinalCTA } from '@/modules/home/components/FinalCTA';

interface ServiceTemplateProps {
  slug: string;
}

export async function ServiceTemplate({ slug }: ServiceTemplateProps) {
  const service = await serviceRepository.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Fetch related data
  const relatedServices = await serviceRepository.getRelatedServices(service.category, service.slug);
  
  const availableVehicles = service.availableVehicles 
    ? await Promise.all(service.availableVehicles.map(slug => vehicleRepository.getVehicleBySlug(slug)))
    : [];
  
  const validVehicles = availableVehicles.filter(Boolean) as NonNullable<Awaited<ReturnType<typeof vehicleRepository.getVehicleBySlug>>>[];

  // SEO schemas
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.shortDescription,
    image: service.heroImage,
    slug: service.slug,
    category: service.category,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services' },
    { name: service.name, url: `/services/${service.slug}` }
  ]);

  const faqSchema = service.faqs && service.faqs.length > 0 
    ? generateFAQSchema(service.faqs)
    : null;

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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

      <ServiceHero title={service.name} image={service.heroImage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <Breadcrumb
          items={[
            { label: 'Services', href: '/#services' },
            { label: service.name, href: '#' }
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ServiceQuickInfo service={service} />
        
        <ServiceOverview service={service} />
        
        <ServiceIncludedServices service={service} />

        {validVehicles.length > 0 && (
          <RelatedVehicles vehicles={validVehicles} title="Available Vehicles for this Service" />
        )}

        {service.gallery && service.gallery.length > 0 && (
          <ServiceGallery gallery={service.gallery} serviceName={service.name} />
        )}

        {service.faqs && service.faqs.length > 0 && (
          <ServiceFAQ faqs={service.faqs} serviceName={service.name} />
        )}

        {service.reviews && service.reviews.length > 0 && (
          <ServiceReviews reviews={service.reviews} serviceName={service.name} />
        )}

        <RelatedServices services={relatedServices} />
      </div>

      <FinalCTA />
    </article>
  );
}
