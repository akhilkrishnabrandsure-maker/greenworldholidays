import { JsonLd } from '@/shared/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateVehicleListSchema } from '@/lib/seo';
import { ROUTES } from '@/constants/routes';
import { vehicleRepository } from '../repository/vehicle.repository';
import { VehicleFilterList } from '@/modules/home/components/VehicleFilterList';

export default async function VehiclesListPage() {
  const vehicles = await vehicleRepository.getAll();

  return (
    <>
      <JsonLd
        data={[
          generateVehicleListSchema(vehicles.map(v => ({
            name: v.name,
            description: v.shortDescription,
            image: v.image,
            slug: v.slug,
            category: v.category
          }))),
          generateBreadcrumbSchema([
            { name: 'Home', url: ROUTES.HOME },
            { name: 'Fleet', url: ROUTES.VEHICLES },
          ]),
        ]}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200 min-h-screen">
        <VehicleFilterList 
          initialVehicles={vehicles} 
          hideViewAll={true} 
          isMainPage={true} 
        />
      </section>
    </>
  );
}
