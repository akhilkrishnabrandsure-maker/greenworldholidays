import { Metadata } from 'next';
import VehiclesListPage from '@/modules/vehicles/pages/VehiclesListPage';
import { constructMetadata } from '@/lib/seo';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = constructMetadata({
  title: 'Premium Vehicle Rental in Kerala & South India',
  description:
    'Explore our premium fleet of vehicles including MPVs, Sedans, Vans, and Buses for comfortable travel across Kerala and South India.',
  url: ROUTES.VEHICLES,
});

export default function Page() {
  return <VehiclesListPage />;
}
