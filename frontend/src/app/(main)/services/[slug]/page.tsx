import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceRepository } from '@/modules/services/repository/service.repository';
import { ServiceTemplate } from '@/modules/services/pages/ServiceTemplate';
import { constructMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await serviceRepository.getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return constructMetadata({
      title: 'Service Not Found | Green World Holidays',
      description: 'The requested service could not be found.',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${service.name} in Kerala | Green World Holidays`,
    description: service.shortDescription,
    image: service.heroImage,
    url: `/services/${service.slug}`,
  });
}

export async function generateStaticParams() {
  const services = await serviceRepository.getAllServices();
  
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ServiceTemplate slug={resolvedParams.slug} />;
}
