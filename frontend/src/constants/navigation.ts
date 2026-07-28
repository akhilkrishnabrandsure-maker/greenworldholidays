import { ROUTES } from './routes';
import { NavigationItem } from '../types';
import { Plane, Briefcase, Heart, Users, Map, HeartHandshake, Tent, Sun, Settings, Navigation2 } from 'lucide-react';

export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Destinations', href: ROUTES.DESTINATIONS },
  { label: 'Vehicles', href: ROUTES.VEHICLES },
  { 
    label: 'Services', 
    href: ROUTES.SERVICES,
    children: [
      { label: 'Airport Pickup & Drop', href: ROUTES.serviceDetail('airport-pickup-drop'), icon: Plane },
      { label: 'Corporate Transportation', href: ROUTES.serviceDetail('corporate-transportation'), icon: Briefcase },
      { label: 'Wedding Transportation', href: ROUTES.serviceDetail('wedding-transportation'), icon: Heart },
      { label: 'Employee Transportation', href: ROUTES.serviceDetail('employee-transportation'), icon: Users },
      { label: 'Kerala Tour Packages', href: ROUTES.packageDetail('kerala-tour-packages'), icon: Map },
      { label: 'Honeymoon Packages', href: ROUTES.packageDetail('honeymoon-packages'), icon: HeartHandshake },
      { label: 'Family Tour Packages', href: ROUTES.packageDetail('family-tour-packages'), icon: Users },
      { label: 'Group Tour Packages', href: ROUTES.packageDetail('group-tour-packages'), icon: Users },
      { label: 'Pilgrimage Packages', href: ROUTES.packageDetail('pilgrimage-packages'), icon: Tent },
      { label: 'Weekend Getaways', href: ROUTES.packageDetail('weekend-getaways'), icon: Sun },
      { label: 'Customized Tour Packages', href: ROUTES.packageDetail('customized-tour-packages'), icon: Settings },
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
