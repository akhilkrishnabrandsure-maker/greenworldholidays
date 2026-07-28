'use client';

import React, { useState } from 'react';
import { Car, ShieldCheck, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../types/vehicle.types';

interface VehicleInfoSectionProps {
  vehicle: Vehicle;
}

export function VehicleInfoSection({ vehicle }: VehicleInfoSectionProps) {
  const [activeTab, setActiveTab] = useState<'vehicle' | 'comfort' | 'safety'>('vehicle');

  const defaultOverview = vehicle.overview || `The ${vehicle.name} represents the gold standard of luxury passenger transport in Kerala. Engineered for effortless long-distance cruising and refined passenger comfort, it navigates Kerala's hill routes and expressways with equal poise. Outfitted with dual-zone climate control, plush captain seats, and whisper-quiet cabin insulation, every journey feels relaxed and refreshing.`;

  const tags = vehicle.tags || [
    'Airport Transfer',
    'Family Vacation',
    'Hill Station Drive',
    'Wedding Fleet',
    'Corporate Travel',
    'Kerala Tours',
  ];

  const specs = vehicle.specifications || {
    vehicle: {
      'Transmission': vehicle.transmission || 'Automatic (6-Speed)',
      'Fuel Type': vehicle.fuelType || 'Diesel (BS6 Compliant)',
      'Engine': vehicle.engine || '2.4L GD Turbo Diesel',
      'Seating Capacity': `${vehicle.seatCapacity || 7} Passengers`,
      'Category': vehicle.category || 'Luxury MPV',
    },
    comfort: {
      'Air Conditioning': vehicle.airConditioning !== false ? 'Dual-Zone Auto Climate' : 'Standard AC',
      'Entertainment': 'Touchscreen + Bluetooth / USB',
      'Seat Configuration': 'Plush Leather Reclining Seats',
      'Charging Ports': 'USB & 12V Power in All Rows',
    },
    safety: {
      'Airbags': vehicle.airbags || '7 SRS Airbags',
      'Safety Rating': vehicle.safetyRating || '5-Star NCAP Standard',
      'Braking System': 'ABS with EBD & Brake Assist',
      'Chassis': 'High-Rigidity Impact Frame',
    },
  };

  const includedServices = [
    'Professional Uniformed Chauffeur',
    'Fuel Included for Agreed Route',
    'All-Kerala Permit & Insurance',
    '24×7 On-Road Assistance',
    'Complimentary Bottled Water',
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Editorial Storytelling */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Editorial Overview</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 mt-1">
                Redefining Kerala Luxury Travel
              </h2>
            </div>

            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed text-base sm:text-lg space-y-4">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:mr-3 first-letter:float-left">
                {defaultOverview}
              </p>
              <p>
                From the misty plantation heights of Munnar to the palm-fringed backwaters of Alleppey, our chauffeurs ensure you enjoy a serene, private travel experience tailored to your itinerary.
              </p>
            </div>

            {/* Luxury Tags */}
            <div className="pt-4 border-t border-emerald-900/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Ideal For Your Journey</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-50 text-emerald-900 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Included Services Guarantee Box */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-700/20 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-serif font-bold text-white">Included Services & Comforts</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {includedServices.map((service, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm text-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Specification Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100">
              
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-serif text-gray-900">Technical Specifications</h3>
                <Car className="w-5 h-5 text-emerald-700" />
              </div>

              {/* Categorized Tabs: Vehicle | Comfort | Safety */}
              <div className="flex rounded-xl bg-gray-100 p-1 my-6 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('vehicle')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    activeTab === 'vehicle' ? 'bg-emerald-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Vehicle
                </button>
                <button
                  onClick={() => setActiveTab('comfort')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    activeTab === 'comfort' ? 'bg-emerald-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Comfort
                </button>
                <button
                  onClick={() => setActiveTab('safety')}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    activeTab === 'safety' ? 'bg-emerald-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Safety
                </button>
              </div>

              {/* Specification Grid */}
              <div className="space-y-4">
                {Object.entries(specs[activeTab] || {}).map(([key, val], idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0 text-sm">
                    <span className="text-gray-500 font-medium">{key}</span>
                    <span className="text-gray-900 font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>

              {/* Verified Badge */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Fleet Inspection 2026</span>
                </div>
                <span className="font-mono text-emerald-800 font-bold uppercase">100% RELIABLE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
