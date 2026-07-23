import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Service } from '../types/service.types';

interface ServiceIncludedServicesProps {
  service: Service;
}

export function ServiceIncludedServices({ service }: ServiceIncludedServicesProps) {
  if (!service.includedServices || service.includedServices.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto my-14 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 md:p-12 rounded-3xl shadow-sm border border-emerald-100">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6 text-center">
        What's Included
      </h2>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {service.includedServices.map((included, idx) => (
          <div key={idx} className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" />
            <span className="text-gray-800 font-medium">{included}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
