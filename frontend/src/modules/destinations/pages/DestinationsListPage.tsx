import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateDestinationListSchema } from '@/lib/seo';
import { ROUTES } from '@/constants/routes';
import { destinationRepository } from '../repository/destination.repository';
import { DestinationGrid } from '../components/DestinationGrid';
import { DestinationCTA } from '../components/DestinationCTA';

export default async function DestinationsListPage() {
  const destinations = await destinationRepository.getAll();

  return (
    <>
      <JsonLd
        data={[
          generateDestinationListSchema(destinations),
          generateBreadcrumbSchema([
            { name: 'Home', url: ROUTES.HOME },
            { name: 'Destinations', url: ROUTES.DESTINATIONS },
          ]),
        ]}
      />

    <section className="py-20 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Destinations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world&apos;s most spectacular natural wonders and create memories that last a
            lifetime.
          </p>
        </div>

        <DestinationGrid destinations={destinations} />
        <DestinationCTA />
      </div>
    </section>
    </>
  );
}
