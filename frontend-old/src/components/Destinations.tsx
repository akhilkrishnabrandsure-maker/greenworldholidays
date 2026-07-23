import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import LoginModal from './LoginModal';
import ForgotPassword from './ForgotPassword';
import { apiService, UserData, RegisterUserData } from '../services/api';

interface Destination {
  id: number;
  name: string;
  district: string;
  image: string;
  rating: number;
  description: string;
}

const handleLearnMore = (destinationName: string) => {
  const message = `Hi! I'm interested in learning more about the ${destinationName} travel package. Could you please provide more details about the itinerary and pricing?`;
  const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

interface DestinationsProps {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showForgotPassword: boolean;
  setShowForgotPassword: (show: boolean) => void;
  loggedInUser: { name: string; email: string } | null;
  onUserLoggedIn: (user: { name: string; email: string }) => void;
}

const Destinations: React.FC<DestinationsProps> = ({
  showLoginModal,
  setShowLoginModal,
  showForgotPassword,
  setShowForgotPassword,
  loggedInUser,
  onUserLoggedIn
}) => {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const destinationsRef = useRef<HTMLElement>(null);

  // Use prop-based loggedIn check (reactive to login without reload)
  const isLoggedIn = !!loggedInUser;

  // Scroll detection for login modal
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownModal || isLoggedIn || isFormSubmitted) return;

      const element = destinationsRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;

      if (isVisible && !hasShownModal) {
        setShowLoginModal(true);
        setHasShownModal(true);
        // Prevent scrolling when modal is shown
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownModal, isLoggedIn, isFormSubmitted]);

  // Cleanup body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  const handleSignupSubmit = async (userData: RegisterUserData) => {
    setIsLoading(true);
    try {
      const response = await apiService.registerUser(userData);
      
      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }
      
      // Store user data and token
      localStorage.setItem('userToken', response.token || '');
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      // Update parent auth state instantly (no reload needed)
      if (!response.user) {
        throw new Error('Registration succeeded but no user data was returned.');
      }
      onUserLoggedIn(response.user);
      setIsFormSubmitted(true);
      document.body.style.overflow = 'unset';
      showNotification('Account created successfully! Welcome to Green World Holidays.', 'success');
      
    } catch (error) {
      console.error('Registration error:', error);
      showNotification(error instanceof Error ? error.message : 'Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (loginData: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await apiService.loginUser(loginData.email, loginData.password);
      
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }
      
      // Store user data and token
      localStorage.setItem('userToken', response.token || '');
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      // Update parent auth state instantly (no reload needed)
      if (!response.user) {
        throw new Error('Login response did not include user data.');
      }
      onUserLoggedIn(response.user);
      setIsFormSubmitted(true);
      document.body.style.overflow = 'unset';
      showNotification('Login successful! Welcome back to Green World Holidays.', 'success');
      
    } catch (error) {
      console.error('Login error:', error);
      showNotification(error instanceof Error ? error.message : 'Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  };

  const destinations = [
    {
      id: 1,
      name: 'Munnar-Hill Station',
      district: 'Idukki',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
      rating: 4.9,
      description: "Explore Munnar's breathtaking tea-covered hills, misty mountains, serene valleys, winding roads, and charming plantation villages nestled in nature."
    },
    {
      id: 2,
      name: 'Alappuzha-Backwaters &Houseboat',
      district: 'Alappuzha',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
      rating: 4.8,
      description: 'Cruise through the serene backwaters of Alleppey and experience the charm of traditional houseboats and lush green landscapes.'
    },
    {
      id: 3,
      name: 'Kochi - Port City with Heritage',
      district: 'Ernakulam',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/fort_kochi_eclsmg.webp',
      rating: 4.9,
      description: "Discover Fort Kochi's colonial architecture, vibrant streets, artistic vibes, ancient churches, and timeless coastal charm along the Arabian Sea shoreline."
    },
    {
      id: 4,
      name: 'Thekkady-Wildlife',
      district: 'Idukki',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556522/Thekkady-Wildlife_Spice_Plantations_xz4svb.webp',
      rating: 4.7,
      description: 'Explore the wild beauty of Thekkady with lush forests, exotic wildlife, elephant safaris, spice plantations, and tranquil boat rides on Periyar Lake'
    },
    {
      id: 5,
      name: 'Athirapally-Waterfalls',
      district: 'Thrissur',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556505/athirapally_falls_ax0zbh.jpg',
      rating: 4.9,
      description: 'Witness the majestic Athirapally Waterfalls cascading through lush forests, surrounded by roaring beauty, misty trails, and the untouched charm of nature.'
    },
    {
      id: 6,
      name: 'Kovalam-Beach Paradise',
      district: 'Thiruvananthapuram',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kovalam_zh3vmk.jpg',
      rating: 4.8,
      description: 'Relax on the golden sands of Kovalam Beach, enjoy swaying palm-lined shores, thrilling water sports, scenic sunsets, and rejuvenating Ayurvedic retreats'
    },
    {
      id: 7,
      name: 'Kanyakumari - Land’s End',
      district: 'Kanyakumari',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556517/kanyakumari_cpz0dw.jpg', // Use Kovalam beach as a placeholder if no Kanyakumari image
      rating: 4.8,
      description: 'Marvel at the confluence of three seas, iconic Vivekananda Rock, sunrise and sunset views, and the southernmost tip of India.'
    },
    {
      id: 8,
      name: 'Madurai - Temple City',
      district: 'Madurai',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/madurai_bqreqj.webp', // Use temples image as a placeholder
      rating: 4.7,
      description: 'Experience the spiritual grandeur of Meenakshi Temple, vibrant markets, and the rich cultural heritage of Tamil Nadu.'
    },
    {
      id: 9,
      name: 'Wayanad - Green Paradise',
      district: 'Wayanad',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556526/wayanad_emrkgd.jpg', // Use vagamon as a placeholder if no Wayanad image
      rating: 4.9,
      description: 'Discover misty mountains, lush forests, wildlife sanctuaries, waterfalls, and the cool climate of Wayanad.'
    },
    {
      id: 10,
      name: 'Bekal Fort (Bakel Kotta)',
      district: 'Kasaragod',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556506/bekal-fort_xcjam3.jpg', // Placeholder, update if Bekal Fort image is available
      rating: 4.8,
      description: 'Step into history at Bekal Fort, Kerala’s largest and best-preserved fort, offering panoramic views of the Arabian Sea and lush surroundings.'
    },
    {
      id: 11,
      name: 'Kumarakom',
      district: 'Kottayam',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kumarakam_wrnzza.webp', // Placeholder, update if Kumarakom image is available
      rating: 4.7,
      description: 'Unwind in the tranquil backwaters of Kumarakom, famous for its bird sanctuary, houseboat cruises, and lush green landscapes.'
    },
    {
      id: 12,
      name: 'Vagamon',
      district: 'Idukki',
      image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556524/vagamon_y8ubni.jpg',
      rating: 4.9,
      description: 'Escape to the rolling meadows, pine forests, and misty hills of Vagamon—a serene hill station perfect for nature lovers and adventure seekers.'
    },
  ];

  return (
      <section ref={destinationsRef} id="destinations" className="py-20 bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world's most spectacular natural wonders and create memories that last a lifetime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" onClick={() => setSelected(destination)}>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
               
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{destination.district}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                
                <div className="flex items-center mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleLearnMore(destination.name); }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Destination CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Need a Custom Destination Package?</h3>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
            Don't see your dream destination? Our travel experts will create a personalized package tailored to your preferences and requirements.
          </p>
          <button
            onClick={() => {
              const message = `Hi! I need a custom destination package. Could you please help me create a personalized travel experience?`;
              const whatsappUrl = `https://wa.me/918075438808?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="bg-white text-emerald-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
          >
            Contact Our Travel Experts
          </button>
        </div>
      </div>
      {/* Destination Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white/90 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto my-8 md:my-16 flex flex-col overflow-hidden h-[90vh] md:h-[80vh]">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-emerald-700 transition z-10">&times;</button>
            <img src={selected.image} alt={selected.name} className="w-full h-56 md:h-72 object-cover" />
            <div className="flex-1 flex flex-col justify-start items-center px-4 py-6 overflow-y-auto w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2 text-center">{selected.name}</h3>
              <p className="text-gray-700 text-center mb-3 text-base md:text-lg">{selected.description}</p>
              <p className="text-gray-600 text-sm md:text-base mb-2 text-center">This destination offers a unique blend of natural beauty and cultural heritage, making it a must-visit for travelers seeking both relaxation and adventure. From scenic landscapes to vibrant local traditions, every moment here promises a memorable experience.</p>
              <p className="text-gray-600 text-sm md:text-base mb-4 text-center">Whether you're exploring the lush greenery, enjoying local cuisine, or participating in traditional festivals, you'll find countless opportunities to immerse yourself in the charm and hospitality of this remarkable place.</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-gray-500">{selected.district}</span>
                <span className="text-yellow-500">★ {selected.rating}</span>
              </div>
              <button onClick={() => window.open(`https://wa.me/918075438808?text=${encodeURIComponent(`Hi! I'm interested in ${selected.name}. Please share more details.`)}`,'_blank')} className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition">Enquire Now</button>
            </div>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={handleSignupSubmit}
        onLogin={handleLoginSubmit}
        isLoading={isLoading}
        onForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotPassword(true);
        }}
      />

      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBackToLogin={() => {
          setShowForgotPassword(false);
          setShowLoginModal(true);
        }}
      />
    </section>
  );
};

export default Destinations;