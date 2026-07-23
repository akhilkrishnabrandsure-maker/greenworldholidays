import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { AppImage } from '@/shared/components/display/AppImage';
import { Service } from '../types/service.types';

interface RelatedServicesProps {
  services: Service[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="my-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 px-2 text-center md:text-left">
        Other Services You Might Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`} // Assuming we don't have ROUTES.serviceDetail yet
            className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <AppImage
                src={service.heroImage}
                alt={service.name}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-emerald-600/90 text-white backdrop-blur-sm px-3 py-1 rounded-full z-10 text-xs font-semibold shadow-sm">
                {service.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                {service.shortDescription}
              </p>
              
              <div className="mt-auto flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                View Details <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
