
const galleryImages = [
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556525/vallam_kali_vynfft.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556517/kathakali_1_mr545z.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556520/onam_wjdjpb.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/mohiniattam_zbrxut.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556524/vagamon_y8ubni.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754558483/spices_job8vh.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556514/elephant_y9fwnq.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556523/thrissur_pooram_asukdb.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kumarakam_wrnzza.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556523/temples_in_kl_dfxgsp.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556521/pulikali_fjtbix.jpg',
];

const heroImages = [
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556525/vallam_kali_vynfft.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kumarakam_wrnzza.webp',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556517/kathakali_1_mr545z.jpg',
  'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556520/onam_wjdjpb.jpg',
];

const WhyKerala = () => {
  // Handler to pause video before last 2 seconds
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-emerald-100 to-teal-50">
      {/* Hero Collage */}
      <section className="relative w-full h-[45vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex w-full h-full">
          {heroImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Kerala Hero ${idx + 1}`}
              className="w-1/4 h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
        <h1 className="relative z-20 text-white text-4xl md:text-6xl font-bold drop-shadow-lg text-center w-full">Why Kerala?</h1>
      </section>

      {/* Video Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-200 bg-black">
          <video
            src="https://res.cloudinary.com/dyup8ivlh/video/upload/v1752741129/tourist_vdo_eklb7n.mp4"
            autoPlay
            muted
            playsInline
            loop={true}
            poster="/houseboat.jpg"
            className="w-full h-[340px] md:h-[420px] object-cover bg-black"
            preload="metadata"
          />
        </div>
        <p className="mt-6 text-lg md:text-xl text-emerald-900 text-center max-w-2xl font-medium">
          Discover the soul of Kerala through this immersive video journey—lush landscapes, vibrant culture, and unforgettable experiences await you in God’s Own Country.
        </p>
      </section>

      {/* Image Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-emerald-700">Kerala in Pictures</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={img}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={img}
                alt={`Kerala Gallery ${idx + 1}`}
                className="w-full h-40 md:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Optional overlay caption */}
              {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Caption</div> */}
            </div>
          ))}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
        <div className="bg-white/80 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-700">Experience Kerala</h2>
          <p className="text-lg text-gray-700">Kerala is not just a destination; it’s a living canvas of nature, culture, and tradition. Let your journey begin here.</p>
        </div>
      </section>
    </div>
  );
};

export default WhyKerala; 