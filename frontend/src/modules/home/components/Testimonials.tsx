import React from 'react';
import { Star, Quote } from 'lucide-react';
import { AppImage } from '@/shared/components/display/AppImage';
import { testimonialsRepository } from '../repository/testimonials.repository';

export async function Testimonials() {
  const testimonialsList = await testimonialsRepository.getAll(3);

  return (
    <section id="testimonials" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who've experienced the magic of travel with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsList.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <Quote className="h-10 w-10 text-emerald-600 mb-4" />
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <AppImage 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

