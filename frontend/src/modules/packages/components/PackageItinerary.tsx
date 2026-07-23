import React from 'react';
import { MapPin, Utensils, Activity, Moon } from 'lucide-react';
import { ItineraryDay } from '../types/package.types';

interface PackageItineraryProps {
  itinerary?: ItineraryDay[];
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto my-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Day by Day Itinerary
      </h2>

      <div className="relative border-l-2 border-emerald-100 ml-4 md:ml-8 space-y-12">
        {itinerary.map((day, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-emerald-500 ring-4 ring-white shadow-sm" />
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  <span className="text-emerald-600 mr-2">Day {day.dayNumber}:</span>
                  {day.title}
                </h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {day.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-50">
                {day.overnightStay && (
                  <div className="flex items-start">
                    <Moon className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-sm font-semibold text-gray-900">Overnight Stay</span>
                      <span className="text-sm text-gray-600">{day.overnightStay}</span>
                    </div>
                  </div>
                )}

                {day.meals && day.meals.length > 0 && (
                  <div className="flex items-start">
                    <Utensils className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-sm font-semibold text-gray-900">Meals Included</span>
                      <span className="text-sm text-gray-600">{day.meals.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>

              {day.activities && day.activities.length > 0 && (
                <div className="mt-4 flex items-start">
                  <Activity className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-sm font-semibold text-gray-900 mb-1">Activities</span>
                    <ul className="flex flex-wrap gap-2">
                      {day.activities.map((act, i) => (
                        <li key={i} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-md border border-emerald-100">
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
