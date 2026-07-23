import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Service } from '../types/service.types';

interface ServiceOverviewProps {
  service: Service;
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  if (!service.overview && !service.highlights?.length && !service.benefits?.length) return null;

  return (
    <section className="max-w-4xl mx-auto my-14 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        About {service.name}
      </h2>
      
      {service.overview && (
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 mb-8">
          <p>{service.overview}</p>
        </div>
      )}

      {service.highlights && service.highlights.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose This Service?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm md:text-base font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
