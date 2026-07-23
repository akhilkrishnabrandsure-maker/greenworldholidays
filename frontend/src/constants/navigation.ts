import { ROUTES } from './routes';
import { NavigationItem } from '../types';

export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Destinations', href: ROUTES.DESTINATIONS },
  { label: 'Vehicles', href: ROUTES.VEHICLES },
  { label: 'Services', href: ROUTES.SERVICES },
  { label: 'Packages', href: ROUTES.PACKAGES },
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'About', href: ROUTES.ABOUT },
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
