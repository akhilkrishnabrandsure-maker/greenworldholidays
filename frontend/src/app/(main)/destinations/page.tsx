import { Metadata } from 'next';
import DestinationsListPage from '@/modules/destinations/pages/DestinationsListPage';
import { constructMetadata } from '@/lib/seo';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = constructMetadata({
  title: 'Popular Destinations in Kerala & South India',
  description:
    'Explore Kerala and South India travel destinations including Munnar, Alleppey backwaters, Kochi, Thekkady, Athirapally, Kovalam, and more with Green World Holidays.',
  url: ROUTES.DESTINATIONS,
});

export default function Page() {
  return <DestinationsListPage />;
}
