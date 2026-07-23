import { useEffect, useRef, useState } from 'react';
import { Leaf, Users, Award, Heart, Star, MapPin, Phone, Car, Sparkles, Crown, Diamond } from 'lucide-react';

// ✅ Custom Hook for CountUp
function useCountUp(target: number, duration: number, start: boolean, suffix = '') {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return suffix ? `${count}${suffix}` : count;
}

const About = () => {
  // ✅ Track if stats section is in view
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;
      const rect = statsRef.current.getBoundingClientRect();
      if (!statsInView && rect.top < window.innerHeight && rect.bottom > 0) {
        setStatsInView(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsInView]);

  // ✅ Animated counters
    const customersCount = useCountUp(10, 1200, statsInView, 'K+');
  const vehiclesCount = useCountUp(100, 1000, statsInView, '+');
  const yearsCount = useCountUp(20, 1000, statsInView, '+');
  const satisfactionCount = useCountUp(98, 1000, statsInView, '%');

  const stats = [
    { icon: Users, number: customersCount, label: 'Happy Customers' },
    { icon: Car, number: vehiclesCount, label: 'Vehicles Available' },
    { icon: Award, number: yearsCount, label: 'Years Experience' },
    { icon: Heart, number: satisfactionCount, label: 'Customer Satisfaction' },
  ];

  const features = [
    {
      title: 'Personalized Service',
      description: 'Tailored travel experiences designed just for you and your family',
      icon: Heart
    },
    {
      title: 'Lifelong Relationships',
      description: 'Building lasting connections that extend beyond your journey',
      icon: Users
    },
    {
      title: 'Dream Fulfillment',
      description: 'Turning your travel dreams into unforgettable memories',
      icon: Star
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50/80 to-teal-50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-green-500/6 to-teal-500/8"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(5,150,105,0.08),transparent_50%)]"></div>

      {/* Premium Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-tl from-teal-200/25 to-emerald-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-green-300/15 to-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce delay-700">
        <Sparkles className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="absolute top-40 right-20 opacity-15 animate-bounce delay-1000">
        <Crown className="w-8 h-8 text-green-500" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-20 animate-bounce delay-500">
        <Diamond className="w-5 h-5 text-teal-400" />
      </div>

      <div className="relative py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Premium Header Section */}
          <div className="text-center mb-16 lg:mb-28">
            <div className="relative inline-flex items-center justify-center mb-8">
              {/* Glow effect behind icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-xl opacity-30 scale-150"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center border-4 border-white/20 backdrop-blur-sm">
                <Leaf className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
                About Green World Holidays
              </h2>
              
              {/* Premium Divider */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg"></div>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-full shadow-lg"></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-teal-400"></div>
              </div>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light tracking-wide">
                Your <span className="font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Complete Travel Partner</span> for Unforgettable Kerala Experiences
              </p>
            </div>
          </div>

          {/* Premium Motive Section */}
          <div className="mb-20 lg:mb-32">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-10 sm:p-14 lg:p-20 shadow-2xl border border-white/30 overflow-hidden group hover:shadow-3xl transition-all duration-700">
              {/* Luxury border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-500/10 to-teal-500/20 rounded-[2rem] blur-sm"></div>
              <div className="absolute inset-px bg-white/95 backdrop-blur-xl rounded-[2rem]"></div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Crown className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="absolute bottom-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 tracking-tight">
                  Our <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Mission & Promise</span>
                </h3>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed italic font-light max-w-6xl mx-auto mb-10">
                  "To provide better tour reports, when you & your family depart it will be a lifelong touch with us. From your experience you will automatically recommend your friends & relatives to us. We assure that we will fulfill your dreams and the moments with us."
                </blockquote>
                
                {/* Premium decorative line */}
                <div className="flex justify-center items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg"></div>
                  <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-green-500"></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-full shadow-lg transform rotate-45"></div>
                  <div className="w-8 h-px bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Service Definition Section */}
          <div className="mb-20 lg:mb-32 max-w-5xl mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl border border-white/40">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight tracking-tight">
                Complete Travel Solutions for
                <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mt-2">Beautiful Kerala</span>
              </h3>
              
              <div className="space-y-6 text-gray-700 text-lg lg:text-xl leading-relaxed font-light">
                <p>
                  At Green World Holidays, we provide <span className="font-semibold text-emerald-700">comprehensive travel solutions</span> combining the best holiday experiences with reliable car rental services. Whether you're planning a family vacation or need a vehicle for business travel, we've got you covered.
                </p>
                <p>
                  Our experienced team ensures seamless service delivery, from curating perfect travel itineraries to maintaining a modern fleet of well-serviced vehicles. We're committed to making your travel experience <span className="font-semibold text-green-700">smooth, safe, and memorable</span>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Premium Features and MD Photo Section */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20 lg:mb-32">
            {/* Enhanced Features Grid */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left">
                Why Choose <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Us</span>
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="group relative">
                    {/* Luxury card with enhanced effects */}
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90">
                      {/* Gradient border effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative flex items-start space-x-5">
                        <div className="flex-shrink-0 relative">
                          {/* Icon glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                          <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
                            <feature.icon className="w-7 h-7 text-white drop-shadow-sm" />
                          </div>
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className="font-bold text-gray-800 text-xl mb-3 group-hover:text-emerald-800 transition-colors duration-300">{feature.title}</h4>
                          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium MD Photo and Info */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                {/* Luxury card with enhanced styling */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-700 group max-w-sm w-full relative overflow-hidden">
                  {/* Premium border glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-teal-500/20 rounded-3xl blur-sm"></div>
                  
                  {/* Floating sparkles */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Enhanced Image Container */}
                    <div className="relative mb-8 flex justify-center">
                      {/* Multiple glow layers */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full bg-emerald-400 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full bg-green-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Premium image frame */}
                      <div className="relative z-10 p-1 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl shadow-xl">
                        <img
                          src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/Jayan_dliyhn.jpg"
                          alt="Managing Director Jayan - Green World Holidays"
                          className="w-48 h-60 sm:w-56 sm:h-64 lg:w-64 lg:h-72 rounded-3xl object-cover object-center shadow-lg bg-white"
                          style={{ background: 'transparent' }}
                        />
                      </div>
                    </div>

                    {/* Enhanced Professional Info */}
                    <div className="text-center space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold text-gray-900">Jayakumar K R</h4>
                        <div className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Managing Director & Founder</div>
                        <div className="text-gray-600 text-sm font-light">Green World Holidays & Car Rentals</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Stats Section */}
          <div
            ref={statsRef}
            className="relative bg-white/85 backdrop-blur-xl rounded-[2.5rem] p-10 sm:p-14 lg:p-20 shadow-2xl border border-white/30 mb-20 lg:mb-32 overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 tracking-tight">
                  Our <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Achievements</span>
                </h3>
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
                  <Crown className="w-6 h-6 text-emerald-500" />
                  <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-green-500"></div>
                  <Diamond className="w-5 h-5 text-green-500" />
                  <div className="w-16 h-px bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <Sparkles className="w-6 h-6 text-teal-500" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-teal-400"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group hover:scale-110 transition-all duration-500 relative"
                  >
                    {/* Luxury stat card */}
                    <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      {/* Icon with enhanced effects */}
                      <div className="relative mb-6 flex justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        </div>
                        <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl border-4 border-white/30 backdrop-blur-sm transition-all duration-500">
                          <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-3 tracking-tight">
                        {stat.number}
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Contact CTA */}
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-[2.5rem] p-12 sm:p-16 lg:p-20 text-white shadow-2xl overflow-hidden">
              {/* Luxury background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-black/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
              
              {/* Floating elements */}
              <div className="absolute top-8 right-8 opacity-20 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="absolute bottom-8 left-8 opacity-15 animate-pulse delay-1000">
                <Crown className="w-10 h-10" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight">
                  Ready to Start Your <span className="text-emerald-200">Kerala Journey?</span>
                </h3>
                <p className="text-xl sm:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
                  Let us create unforgettable memories for you and your family. Contact us today to plan your perfect Kerala experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href="tel:+918075438808"
                    className="group bg-white text-emerald-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl flex items-center space-x-3 border-4 border-white/20 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="tracking-wide">Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/918075438808"
                    className="group bg-emerald-800/80 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-900/80 transition-all duration-300 hover:scale-105 shadow-xl flex items-center space-x-3 border-4 border-white/10"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="tracking-wide">Plan Trip</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;