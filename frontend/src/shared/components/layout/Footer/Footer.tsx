import React from 'react';
import { SocialLinks } from './SocialLinks';
import { FooterSections } from './FooterSections';
import { Copyright } from './Copyright';
import { AppImage } from '../../display/AppImage';
import { COMPANY_INFO } from '@/constants/navigation';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <AppImage 
                src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/green_world_zetcew.png" 
                alt={COMPANY_INFO.name}
                width={150}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your complete travel and transportation partner. We provide exceptional holiday experiences and reliable car rental to make every journey memorable and convenient.
            </p>
            <SocialLinks />
          </div>
          
          <FooterSections />
          
        </div>
        
        <Copyright />
      </div>
    </footer>
  );
}
