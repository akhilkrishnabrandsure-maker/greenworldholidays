export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  slug?: string;
}

export const travelServices: ServiceItem[] = [
  {
    icon: 'Compass',
    title: 'Tour Packages',
    description: 'Explore a variety of curated tour packages for every kind of traveler.'
  },
  {
    icon: 'Shield',
    title: 'Hotel Reservation',
    description: 'Book the best hotels at competitive prices for a comfortable stay.'
  },
  {
    icon: 'Compass',
    title: 'House Boat Tourism',
    description: 'Experience the serenity of backwaters with our exclusive house boat tourism packages.'
  },
  {
    icon: 'Mountain',
    title: 'Trekking',
    description: 'Embark on thrilling trekking adventures with our experienced guides and safety equipment.'
  },
  {
    icon: 'Compass',
    title: 'Custom Itineraries',
    description: 'Personalized travel plans crafted to match your interests and budget.'
  },
  {
    icon: 'Headphones',
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your travel needs and emergency support.'
  }
];

export const carRentalServices: ServiceItem[] = [
  {
    icon: 'Car',
    title: 'Car Rentals',
    description: 'Wide range of vehicles from economy to luxury cars for all your travel needs.'
  },
  {
    icon: 'MapPin',
    title: 'Airport Pickup',
    description: 'Convenient airport pickup and drop-off services with professional drivers.',
    slug: 'airport-pickup-drop'
  },
  {
    icon: 'Clock',
    title: 'Flexible Rentals',
    description: 'Hourly, daily, weekly, and monthly rental options to suit your schedule.'
  },
  {
    icon: 'Users',
    title: 'Chauffeur Service',
    description: 'Professional drivers available for a comfortable and stress-free journey.'
  },
  {
    icon: 'Fuel',
    title: 'Fuel Included',
    description: 'Many packages include fuel costs for transparent pricing and convenience.'
  },
  {
    icon: 'Settings',
    title: 'Maintenance',
    description: 'All vehicles are regularly serviced and maintained for optimal performance.'
  }
];

export * from './detailedServices';
