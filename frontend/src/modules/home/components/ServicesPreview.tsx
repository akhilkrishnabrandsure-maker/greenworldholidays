import React from 'react';
import { 
  Compass, 
  Shield, 
  Mountain, 
  Headphones, 
  Car, 
  MapPin, 
  Clock, 
  Users, 
  Fuel, 
  Settings,
  LucideIcon 
} from 'lucide-react';
import Link from 'next/link';
import { serviceRepository } from '@/modules/services/repository/service.repository';

const ICON_MAP: Record<string, LucideIcon> = {
  Compass,
  Shield,
  Mountain,
  Headphones,
  Car,
  MapPin,
  Clock,
  Users,
  Fuel,
  Settings
};

export async function ServicesPreview() {
  const travelServices = await serviceRepository.getTravelServices();
  const carRentalServices = await serviceRepository.getCarRentalServices();

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-200 via-emerald-100 to-white shadow-2xl p-6 sm:p-10 lg:p-16 mx-auto w-full">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-800 mb-6 max-w-3xl mx-auto text-center leading-relaxed">
              We – Green World Holidays – offer various vehicle types and flexible tour packages tailored to your demands.
              Make Kerala your next destination and experience the natural beauty of God's Own Country with us.
            </p>
          </div>

          {/* Travel Services */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">
              Travel & Tourism Services
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {travelServices.map((service, index) => {
                const IconComponent = ICON_MAP[service.icon] || Compass;
                const content = (
                  <>
                    <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{service.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                  </>
                );
                
                const cardClasses = "bg-gray-50/90 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col";
                
                return service.slug ? (
                  <Link href={`/services/${service.slug}`} key={index} className={`${cardClasses} block`}>
                    {content}
                  </Link>
                ) : (
                  <div key={index} className={cardClasses}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Car Rental Services */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">
              Car Rental Services
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {carRentalServices.map((service, index) => {
                const IconComponent = ICON_MAP[service.icon] || Car;
                const content = (
                  <>
                    <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{service.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                  </>
                );
                
                const cardClasses = "group bg-gray-50/90 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col";
                
                return service.slug ? (
                  <Link href={`/services/${service.slug}`} key={index} className={`${cardClasses} block`}>
                    {content}
                  </Link>
                ) : (
                  <div key={index} className={cardClasses}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

