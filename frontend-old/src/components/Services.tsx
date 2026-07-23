import {  Mountain, Compass, Shield, Headphones, Car, MapPin, Clock, Users, Fuel, Settings } from 'lucide-react';

const Services = () => {

  const travelServices = [
    {
      icon: Compass, // Placeholder for Tour Packages
      title: 'Tour Packages',
      description: 'Explore a variety of curated tour packages for every kind of traveler.'
    },
    {
      icon: Shield, // Placeholder for Hotel Reservation
      title: 'Hotel Reservation',
      description: 'Book the best hotels at competitive prices for a comfortable stay.'
    },
    {
      icon: Compass, // Placeholder for house boat tourism
      title: 'House Boat Tourism',
      description: 'Experience the serenity of backwaters with our exclusive house boat tourism packages.'
    },
    {
      icon: Mountain, // Using Mountain icon for Trekking
      title: 'Trekking',
      description: 'Embark on thrilling trekking adventures with our experienced guides and safety equipment.'
    },
    {
      icon: Compass,
      title: 'Custom Itineraries',
      description: 'Personalized travel plans crafted to match your interests and budget.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your travel needs and emergency support.'
    }
  ];

  const carRentalServices = [
    {
      icon: Car,
      title: 'Car Rentals',
      description: 'Wide range of vehicles from economy to luxury cars for all your travel needs.'
    },
    {
      icon: MapPin,
      title: 'Airport Pickup',
      description: 'Convenient airport pickup and drop-off services with professional drivers.'
    },
    {
      icon: Clock,
      title: 'Flexible Rentals',
      description: 'Hourly, daily, weekly, and monthly rental options to suit your schedule.'
    },
    {
      icon: Users,
      title: 'Chauffeur Service',
      description: 'Professional drivers available for a comfortable and stress-free journey.'
    },
    {
      icon: Fuel,
      title: 'Fuel Included',
      description: 'Many packages include fuel costs for transparent pricing and convenience.'
    },
    {
      icon: Settings,
      title: 'Maintenance',
      description: 'All vehicles are regularly serviced and maintained for optimal performance.'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-200 via-emerald-100 to-white shadow-2xl p-6 sm:p-10 lg:p-16 mx-auto w-full">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
            <p className="text-base sm:text-lg text-black mb-6 max-w-3xl mx-auto text-center">
              We – Green World Holidays – do have various types of vehicles which will suit your demand.<br/>
              We are very flexible with the rates compared to others.<br/><br/>
                Our tour itinerary contains the most exciting destinations. Pick the one which is just made for you. Traveling with us will be an experience. Make Kerala your next destination and get the blessings of natural beauty of God's own country, Kerala and the rich heritage of our great country, India.<br/><br/>
              A wonderful experience, at its best to travel through each location in this blessed land.<br/>
              We at GREEN WORLD HOLIDAYS promise an exciting opportunity.
          </p>
        </div>

        {/* Travel Services */}
        <div className="mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">Travel & Tourism Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {travelServices.map((service, index) => (
              <div key={index} className="mobile-card bg-gray-50 p-6 lg:p-8">
                <div className="bg-emerald-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Car Rental Services */}
          <div className="mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">Car Rental Services</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {carRentalServices.map((service, index) => (
            <div key={index} className="mobile-card bg-gray-50 p-6 lg:p-8">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
            </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;