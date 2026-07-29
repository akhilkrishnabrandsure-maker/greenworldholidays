import { ROUTES } from './routes';
import { NavigationItem } from '../types';
import { Users, Map, HeartHandshake, Settings } from 'lucide-react';

export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Destinations', href: ROUTES.DESTINATIONS },
  { label: 'Vehicles', href: ROUTES.VEHICLES },
  { 
    label: 'Services', 
    href: ROUTES.SERVICES,
    children: [
      { label: 'Kerala Tour Packages', href: ROUTES.packageDetail('kerala-tour-packages'), icon: Map },
      { label: 'Customized Tour Packages', href: ROUTES.packageDetail('customized-tour-packages'), icon: Settings },
      { label: 'Group Tour Packages', href: ROUTES.packageDetail('group-tour-packages'), icon: Users },
      { label: 'Honeymoon Packages', href: ROUTES.packageDetail('honeymoon-packages'), icon: HeartHandshake },
    ]
  },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'Contact', href: ROUTES.CONTACT },
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'Facebook' },
  { label: 'Instagram', href: '#', icon: 'Instagram' },
  { label: 'Twitter', href: '#', icon: 'Twitter' },
];

export const COMPANY_INFO = {
  name: 'Green World Holidays',
  phone: '+91 8075438808',
  email: 'info@greenworldholidays.com',
  address: 'Kerala, India'
};
