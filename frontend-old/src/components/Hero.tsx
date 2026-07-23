import { Helmet } from 'react-helmet-async';

const handlePlanTrip = () => {
  const message = `Hi! I'm interested in planning a Kerala trip with Green World Holidays. Could you please help me with travel packages and car rental options?`;
  const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

interface HeroProps {
  onBookNow?: () => void;
}

const Hero = ({ onBookNow }: HeroProps) => {
  const images = [
    {
      src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1755231050/kathakali_img_ulaa3h.jpg',
      alt: 'Kerala Kathakali dance tour by Green World Holidays'
    },
    {
      src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556505/athirapally_falls_ax0zbh.jpg',
      alt: 'Kerala waterfall biggest waterfall tour by Green world holidays'
    },
    {
      src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
      alt: 'Kerala lighthouse tour by Green world holidays'
    },
    {
      src: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg',
      alt: 'Kerala hills  tour by  Green world Holidays'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Kerala Travel Packages | Green World Holidays</title>
        <meta name="description" content="Plan your Kerala trip with Green World Holidays. Explore houseboats, backwaters, hill stations, and customized travel packages for an unforgettable journey."/>
        <meta property="og:title" content="Kerala Travel Packages | Green World Holidays"/>
        <meta property="og:description" content="Explore Kerala's backwaters, houseboats, and hill stations with Green World Holidays. Book your customized travel package today!"/>
        <meta property="og:image" content="https://res.cloudinary.com/dyup8ivlh/image/upload/v1755231050/kathakali_img_ulaa3h.jpg"/>
        <meta property="og:url" content="https://your-domain.com"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Helmet>
      <div className="relative w-full h-screen mt-16">
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {images.map((image, index) => (
          <div key={index} className="relative overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl">
          <p className="text-lg md:text-xl font-medium mb-4 text-green-300">
            Welcome to Kerala
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-green-300">God's Own</span>
            <span className="block text-white">Country</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100">
              Explore Kerala travel packages, backwaters, houseboats, and hill stations with Green World Holidays. Enjoy vibrant cultural experiences, serene landscapes, and customized tours for an unforgettable journey.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBookNow}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book Now
            </button>
            <button
              onClick={handlePlanTrip}
              className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Hero;