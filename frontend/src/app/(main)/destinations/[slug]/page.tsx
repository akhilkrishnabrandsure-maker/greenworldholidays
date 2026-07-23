import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DestinationTemplate from '@/modules/destinations/pages/DestinationTemplate';
import { destinationRepository } from '@/modules/destinations/repository/destination.repository';
import { constructMetadata } from '@/lib/seo';
import { ROUTES } from '@/constants/routes';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await destinationRepository.getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await destinationRepository.getBySlug(slug);

  if (!destination) {
    return constructMetadata({
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
      noIndex: true,
    });
  }

  const canonicalUrl = destination.canonicalSlug
    ? ROUTES.destinationDetail(destination.canonicalSlug)
    : ROUTES.destinationDetail(destination.slug);

  return constructMetadata({
    title: destination.seo?.title || `${destination.name} Travel Packages | Green World Holidays`,
    description: destination.seo?.description || destination.description,
    image: destination.heroImage || destination.image,
    url: canonicalUrl,
  });
}

export default async function DestinationSlugPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await destinationRepository.getBySlug(slug);

  if (!destination) {
    notFound();
  }

  const relatedDestinations = await destinationRepository.getRelated(destination.slug);

  return (
    <DestinationTemplate destination={destination} relatedDestinations={relatedDestinations} />
  );
}
