import { Service } from '../types/service.types';

export const detailedServices: Service[] = [
  {
    id: '1',
    slug: 'airport-pickup-drop',
    name: 'Airport Pickup & Drop',
    category: 'Transportation',
    heroImage: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop',
    shortDescription: 'Reliable and comfortable airport transfers across Kerala. Start and end your journey without stress.',
    overview: 'Our Airport Pickup and Drop service is designed to give you a seamless transition between the airport and your destination in Kerala. Whether you are arriving at Cochin International Airport, Trivandrum International Airport, or Calicut International Airport, our professional chauffeurs will be there to greet you, assist with your luggage, and drive you comfortably to your hotel or home.',
    highlights: [
      'Punctual and reliable service',
      'Professional, English-speaking chauffeurs',
      'Meet & Greet service at arrivals',
      'Flight tracking for delayed arrivals'
    ],
    benefits: [
      'No waiting in taxi queues',
      'Pre-fixed transparent pricing',
      'Safe and sanitized vehicles',
      '24/7 customer support'
    ],
    includedServices: [
      'Toll and parking charges',
      'Driver allowance',
      'Fuel costs',
      'Luggage assistance'
    ],
    availableVehicles: ['toyota-innova-crysta', 'maruti-ertiga', 'sedan'],
    serviceAreas: ['Cochin', 'Trivandrum', 'Calicut', 'Kannur'],
    pricing: {
      startingPrice: '₹1,500',
      priceNote: 'Pricing varies based on distance and vehicle chosen.'
    },
    faqs: [
      {
        question: 'Do you track flight delays?',
        answer: 'Yes, we actively monitor your flight status. If your flight is delayed, we will adjust the pickup time accordingly at no extra charge.'
      },
      {
        question: 'Where will the driver meet me?',
        answer: 'Our driver will wait at the arrival hall with a placard bearing your name.'
      }
    ]
  },
  {
    id: '2',
    slug: 'corporate-transportation',
    name: 'Corporate Transportation',
    category: 'Corporate',
    heroImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop',
    shortDescription: 'Premium transportation solutions for businesses, delegates, and corporate events in Kerala.',
    overview: 'Green World Holidays provides top-tier corporate transportation services tailored to the needs of businesses. From executive airport transfers to managing logistics for large corporate events and delegate transport, we offer a fleet of luxury and premium vehicles driven by courteous and highly trained chauffeurs.',
    highlights: [
      'Dedicated account managers',
      'Luxury sedans and premium MPVs',
      'Customized billing and invoicing',
      'Strict adherence to schedules'
    ],
    benefits: [
      'Enhance your corporate image',
      'Stress-free travel for executives',
      'Bulk booking discounts',
      'Flexible hourly and daily packages'
    ],
    availableVehicles: ['toyota-innova-crysta', 'luxury-coach'],
    serviceAreas: ['Kochi InfoPark', 'Trivandrum Technopark', 'All major business hubs in Kerala'],
    pricing: {
      startingPrice: 'Customized Pricing',
      priceNote: 'Contact us for corporate rates and long-term contracts.'
    }
  },
  {
    id: '3',
    slug: 'wedding-transportation',
    name: 'Wedding Transportation',
    category: 'Events',
    heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    shortDescription: 'Elegant and luxurious wedding cars and guest transportation services for your special day.',
    overview: 'Make a grand entrance on your wedding day with our exclusive wedding transportation services. We offer beautifully decorated luxury cars for the bride and groom, as well as spacious MPVs and buses to comfortably transport your guests between venues. We handle the logistics so you can focus on celebrating.',
    highlights: [
      'Luxury cars for the bridal couple',
      'Floral decoration services available',
      'Coordinated transport for guests',
      'Experienced and well-dressed chauffeurs'
    ],
    availableVehicles: ['toyota-innova-crysta', 'premium-sedan', 'luxury-bus'],
    serviceAreas: ['All over Kerala'],
  }
];
