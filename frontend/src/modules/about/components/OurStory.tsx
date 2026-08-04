import React from 'react';
import { aboutRepository } from '../repository/about.repository';
import { Sparkles } from 'lucide-react';

export function OurStory() {
  const { introduction, profile } = aboutRepository;

  return (
    <section className="py-20 lg:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Company Introduction */}
          <div className="space-y-8">
            <div>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-6">
                Complete Travel Solutions for
                <span className="block text-emerald-700 mt-2">Beautiful Kerala</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full" />
            </div>
            
            <div className="space-y-6 font-outfit text-gray-700 text-lg leading-relaxed font-light">
              {introduction.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* MD Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-md">
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-200/50 to-green-100/50 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              <div className="relative bg-white rounded-[2rem] p-8 shadow-2xl border border-emerald-50/50 hover:shadow-emerald-900/10 transition-shadow duration-500">
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-60 transition-opacity text-emerald-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                
                {/* Photo */}
                <div className="flex justify-center mb-8">
                  <div className="relative p-1 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl shadow-lg">
                    <img
                      src={profile.imageUrl}
                      alt={`${profile.name} - ${profile.designation}`}
                      className="w-48 h-60 object-cover rounded-3xl bg-[#FDFBF7]"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="text-center space-y-4 mb-6">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-emerald-950">
                      {profile.name}
                    </h3>
                    <p className="text-emerald-700 font-semibold text-sm tracking-widest uppercase mt-1 font-outfit">
                      {profile.designation}
                    </p>
                    <p className="text-gray-500 text-sm font-light mt-1 font-outfit">
                      {profile.company}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-emerald-100 font-playfair leading-none select-none">&quot;</span>
                  <p className="relative z-10 text-gray-600 italic font-light text-center leading-relaxed text-sm px-4">
                    {profile.quote}
                  </p>
                  <span className="absolute -bottom-8 -right-2 text-6xl text-emerald-100 font-playfair leading-none select-none rotate-180">&quot;</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
