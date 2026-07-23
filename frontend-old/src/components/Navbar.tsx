import  { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

interface AuthUser {
  name: string;
  email: string;
}

interface NavbarProps {
  onJoinClick: () => void;
  loggedInUser: AuthUser | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onJoinClick, loggedInUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled 
        ? 'bg-gradient-to-r from-white via-emerald-100 to-emerald-300/80 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-r from-white via-emerald-100 to-emerald-300/90'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/green_world_zetcew.png" 
              alt="Green World Holidays" 
              className="h-16 sm:h-14 lg:h-16 w-auto drop-shadow-md"
            />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 mt-4">
              {['Home', 'Services', 'Destinations', 'Vehicles', 'Testimonials', 'About','Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 text-base font-medium transition-colors hover:text-emerald-600 hover:bg-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white ${
                    isScrolled ? 'text-gray-700' : 'text-emerald-700'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              {/* User Authentication Section */}
              {loggedInUser ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-2 bg-emerald-100 hover:bg-emerald-200 px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    <User className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      {loggedInUser.name}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-emerald-600 transition-transform duration-200 ${
                      showUserDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{loggedInUser.name}</p>
                        <p className="text-xs text-gray-500">{loggedInUser.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onJoinClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-emerald-700'} bg-white/70 hover:bg-emerald-100 transition-colors`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-white via-emerald-100 to-emerald-300/90 backdrop-blur-md shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {['Home', 'Services', 'Destinations', 'Vehicles', 'Testimonials', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block px-4 py-3 text-base font-medium text-emerald-800 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg w-full text-left mobile-touch-target transition-all duration-200"
              >
                {item}
              </button>
            ))}
            
            {/* Mobile User Authentication Section */}
            {loggedInUser ? (
              <div className="border-t border-emerald-200 pt-4 mt-4">
                <div className="px-4 py-2 bg-emerald-100 rounded-lg mb-2">
                  <p className="text-sm font-medium text-emerald-700">{loggedInUser.name}</p>
                  <p className="text-xs text-emerald-600">{loggedInUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg w-full text-left mobile-touch-target transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-emerald-200 pt-4 mt-4">
                <button
                  onClick={() => {
                    onJoinClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 w-full"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;