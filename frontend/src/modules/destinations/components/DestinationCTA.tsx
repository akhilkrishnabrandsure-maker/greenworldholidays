import { getCustomPackageWhatsAppUrl } from '../utils/destination.utils';

export function DestinationCTA() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white mt-16">
      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Custom Destination Package?</h3>
      <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
        Don&apos;t see your dream destination? Our travel experts will create a personalized package
        tailored to your preferences and requirements.
      </p>
      <a
        href={getCustomPackageWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
      >
        Contact Our Travel Experts
      </a>
    </div>
  );
}
