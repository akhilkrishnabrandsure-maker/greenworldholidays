import React from 'react';
import { Search, PenTool, CheckCircle, PlaneTakeoff } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Choose Package',
    description: 'Explore our curated selection of premium itineraries and select the one that matches your vision.'
  },
  {
    icon: PenTool,
    title: 'Customize Trip',
    description: 'Work with our travel specialists to tailor the itinerary, accommodations, and pacing to your preferences.'
  },
  {
    icon: CheckCircle,
    title: 'Confirm Booking',
    description: 'Review your personalized plan and secure your booking with our transparent and easy payment process.'
  },
  {
    icon: PlaneTakeoff,
    title: 'Travel Kerala',
    description: 'Arrive in God&apos;s Own Country and enjoy a flawless, luxurious journey managed entirely by our experts.'
  }
];

export function HowItWorksTimeline() {
  return (
    <section className="py-24 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] text-luxury-gold-dark font-extrabold uppercase tracking-widest mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 leading-tight">
            How It Works
          </h2>
          <div className="h-0.5 w-12 bg-luxury-gold mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-emerald-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative mb-8">
                    <div className="h-24 w-24 rounded-full bg-white shadow-premium flex items-center justify-center border border-emerald-100 group-hover:border-primary-green group-hover:-translate-y-2 transition-all duration-300 z-10 relative">
                      <Icon className="h-10 w-10 text-primary-green" strokeWidth={1.5} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-luxury-gold text-white flex items-center justify-center font-bold text-sm shadow-md z-20">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
