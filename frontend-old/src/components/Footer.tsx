import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/green_world_zetcew.png" 
                alt="Green World Holidays" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your complete travel and transportation partner. We provide exceptional holiday experiences and reliable car rental services to make every journey memorable and convenient.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-emerald-400 transition-colors">Services</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-emerald-400 transition-colors">Destinations</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-emerald-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">+91 8075438808</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">greenworldholidays@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">Kochi,Kerala, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Green World Holidays. All rights reserved. 
          </p>
          <p className="text-gray-700 mt-2 text-xs">
            Developed by <a href="https://www.linkedin.com/in/akhil-krishna-k-j-a33372317/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-700 transition-colors"> : Akhil Krishna K J</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;