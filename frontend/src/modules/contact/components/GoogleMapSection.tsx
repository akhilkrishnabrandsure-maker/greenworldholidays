import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';

export function GoogleMapSection() {
  const { map, details } = contactRepository;

  return (
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-playfair text-4xl font-bold text-emerald-950 mb-4">
              Visit Our <span className="text-emerald-700">Office</span>
            </h2>
            <p className="font-outfit text-gray-600 text-lg leading-relaxed font-light">
              We are strategically located in the heart of Kochi, making it easy for you to drop by and plan your travel with our experts.
            </p>
          </div>
          
          <a 
            href={map.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors whitespace-nowrap bg-white border border-emerald-200 px-6 py-3 rounded-full shadow-sm hover:shadow-md"
          >
            <MapPin className="w-5 h-5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-emerald-100 bg-white p-2">
          <div className="rounded-[1.5rem] overflow-hidden bg-gray-100 relative h-[400px] lg:h-[500px]">
            <iframe 
              src={map.iframeSrc}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[0.2] contrast-[1.05]"
              title="Green World Holidays Office Location"
            ></iframe>
          </div>
          
          {/* Floating Address Overlay */}
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-emerald-50">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-emerald-950 mb-1">
                  Kochi Office
                </h3>
                <p className="font-outfit text-gray-600 text-sm leading-relaxed">
                  {details.address.line1}, {details.address.line2}<br />
                  {details.address.city}, {details.address.state} {details.address.pincode}<br />
                  {details.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
