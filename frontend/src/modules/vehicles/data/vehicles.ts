import { Vehicle } from '../types/vehicle.types';

// Innova Crysta
import innovaCrystaFront from '@/assets/innova-crysta-front-view.webp';
import innovaCrystaInterior from '@/assets/innova-crysta-interior.webp';
import innovaCrystaDashboard from '@/assets/innova-crysta-dashboard.webp';
import innovaCrystaBoot from '@/assets/innova-crysta-boot.webp';

// Maruti Ertiga
import ertigaExterior from '@/assets/Ertiga/ertiga-exterior.webp';
import ertigaSeats from '@/assets/Ertiga/ertiga-seats.webp';
import ertigaDashboard from '@/assets/Ertiga/ertiga-premium-dashboard.webp';
import ertigaBoot from '@/assets/Ertiga/ertiga-boot.webp';

// Toyota Rumion
import rumionExterior from '@/assets/rumion/toyota-rumion-exterior.webp';
import rumionSeats from '@/assets/rumion/toyota-rumion-rear-seats.webp';
import rumionDashboard from '@/assets/rumion/toyota-rumion-interior-dashboard.webp';
import rumionBoot from '@/assets/rumion/toyota-rumion-boot-space.webp';

// Maruti Invicto
import invictoExterior from '@/assets/invicto/suzuki-invicto-exterior.webp';
import invictoSeats from '@/assets/invicto/suzuki-invicto-rear-seats.webp';
import invictoDashboard from '@/assets/invicto/suzuki-invicto-interior-dashboard.webp';
import invictoBoot from '@/assets/invicto/suzuki-invicto-boot-space.webp';

// Honda City
import cityExterior from '@/assets/city/honda-city-exterior.webp';
import citySeats from '@/assets/city/honda-city-seat.webp';
import cityDashboard from '@/assets/city/honda-city-dashboard.webp';
import cityBoot from '@/assets/city/honda-city-boot.webp';

// Force Urbania
import urbaniaExterior from '@/assets/urbania/force-urbania-exterior.webp';
import urbaniaSeats from '@/assets/urbania/force-urbania-interior-seats.webp';
import urbaniaDashboard from '@/assets/urbania/force-urbania-interior-dashboard.webp';
import urbaniaBoot from '@/assets/urbania/force-urbania-boot-space.webp';

export const vehicles: Vehicle[] = [
  {
    id: '101',
    slug: 'maruti-ertiga',
    name: 'Maruti Ertiga',
    category: 'MPV',
    image: ertigaExterior,
    heroImage: ertigaExterior,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 7,
    luggageCapacity: 4,
    fuelType: 'Petrol / Smart Hybrid',
    transmission: 'Manual',
    airConditioning: true,
    engine: '1.5L K15C Smart Hybrid',
    safetyRating: '4 Star Safety (NCAP)',
    airbags: '4 Airbags',
    shortDescription: 'Smart & Economical 7-Seater Family MPV',
    overview: 'The Maruti Suzuki Ertiga is Kerala’s favourite family tourer, striking the perfect balance between seating flexibility, smooth fuel efficiency, and serene comfort. Designed with ergonomic seating across all three rows and intelligent cabin space, it delivers seamless rides across Munnar hill climbs, Alleppey backwater roads, and Kochi city transfers.',
    tags: ['Family Tour', 'Airport Pickup', 'Budget Friendly', 'Kerala Sightseeing', 'Munnar Trip', 'Clean Fleet'],
    specifications: {
      vehicle: {
        'Transmission': 'Manual (5-Speed)',
        'Fuel Type': 'Petrol (Smart Hybrid)',
        'Engine': '1.5L Dual Jet K15C',
        'Seating': '7 Seats (2+3+2 Layout)',
      },
      comfort: {
        'Air Conditioning': 'Dual AC with Rear Roof Vents',
        'Entertainment': 'SmartPlay Audio + Bluetooth/USB',
        'Seats': 'Flexible Fold-Flat Recliners',
        'Charging': '12V Accessory Sockets & USB',
      },
      safety: {
        'Airbags': 'Front & Side SRS Airbags',
        'Safety Rating': '4-Star Safety',
        'Braking': 'ABS with EBD & Brake Assist',
        'Chassis': 'HEARTECT High-Tensile Body',
      }
    },
    destinations: [
      { name: 'Munnar', distance: '125 km', duration: '3.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Alleppey', distance: '85 km', duration: '2.2 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' },
      { name: 'Wayanad', distance: '260 km', duration: '7 hrs', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'thekkady' }
    ],
    highlights: [
      '7 Passenger Seating',
      'Roof-Mounted Rear AC',
      'Flexible Luggage Space',
      'Experienced Driver',
      'Airport Pickup Available',
      '24×7 Customer Support',
      'Fully Sanitized Daily'
    ],
    features: [
      { name: '7 Seats', icon: 'users' },
      { name: 'Roof AC', icon: 'wind' },
      { name: 'Smart Hybrid', icon: 'zap' },
      { name: 'Comfort Seating', icon: 'star' }
    ],
    amenities: [
      { name: 'Bottle Holders', icon: 'coffee' },
      { name: 'USB Charging', icon: 'battery-charging' },
      { name: 'Music System', icon: 'music' },
      { name: 'Reclining Seats', icon: 'corner-down-right' },
      { name: 'Reading Lamps', icon: 'sun' }
    ],
    gallery: [
      { url: ertigaExterior, alt: 'Maruti Ertiga Exterior Design', caption: 'Exterior View', category: 'Exterior' },
      { url: ertigaSeats, alt: 'Maruti Ertiga Spacious 7 Seater Interior', caption: 'Spacious 7-Seater Cabin', category: 'Interior' },
      { url: ertigaDashboard, alt: 'Maruti Ertiga Premium Dashboard & Steering', caption: 'Driver Console & Tech', category: 'Dashboard' },
      { url: ertigaBoot, alt: 'Maruti Ertiga Expandable Luggage Boot Space', caption: 'Expandable Boot Space', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'Can 7 passengers and luggage fit comfortably?', answer: 'The Ertiga seats 6 to 7 passengers comfortably. For 6-7 passengers with heavy luggage, we recommend a roof carrier or our larger Innova Crysta/Urbania fleet.' },
      { question: 'Is the vehicle air-conditioned in hill stations like Munnar?', answer: 'Yes, all our Ertiga vehicles feature powerful dual air conditioning with dedicated rear roof-mounted blower vents for all rows.' },
      { question: 'Are toll and parking charges included?', answer: 'Our customized tour packages can include all toll, parking, and driver allowances upon request for a completely hassle-free tour.' }
    ],
    reviews: [
      { id: 'rev-ertiga-1', author: 'Deepak Nair', location: 'Chennai, India', rating: 5, date: '2 weeks ago', comment: 'Booked Ertiga for our 4-day Kerala tour. The vehicle was spotlessly clean, very fuel-efficient, and driver Rajesh was courteous and knowledgeable.' }
    ],
    pricing: { rate: '₹2,200', period: 'per day' },
    rating: 4.7,
    seo: {
      title: 'Rent Maruti Ertiga in Kerala | 7 Seater MPV Hire - Green World Holidays',
      description: 'Book Maruti Ertiga 7-seater car rental in Kerala with professional driver. Ideal for budget family holidays, Cochin airport transfers, and hill station tours.',
      keywords: ['Maruti Ertiga rental Kerala', '7 seater car hire Kochi', 'Ertiga taxi Kerala', 'budget MPV rental']
    }
  },
  {
    id: '102',
    slug: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'MPV',
    image: innovaCrystaFront,
    heroImage: innovaCrystaFront,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 7,
    luggageCapacity: 5,
    fuelType: 'Diesel (BS6)',
    transmission: 'Automatic',
    airConditioning: true,
    engine: '2.4L GD Turbo',
    safetyRating: '5 Star Safety (NCAP)',
    airbags: '7 Airbags (SRS)',
    shortDescription: 'Luxury Family & Executive Transportation',
    overview: 'The Toyota Innova Crysta is more than just an MPV; it is the benchmark for luxury travel in Kerala. Whether navigating the winding mist of Munnar or cruising along the coastal highways of Kochi, the Crysta ensures every passenger enjoys the ride with unparalleled comfort.',
    tags: ['Airport Transfer', 'Wedding', 'Family Trip', 'Hill Station', 'Corporate', 'Kerala Tours'],
    specifications: {
      vehicle: {
        'Transmission': 'Automatic (6-Speed)',
        'Fuel Type': 'Diesel (BS6 Compliant)',
        'Engine': '2.4L GD Turbo Diesel',
        'Seating': '7 Seats (2+2+3 Recliners)',
      },
      comfort: {
        'Air Conditioning': 'Dual-Zone Auto Climate',
        'Entertainment': 'Touchscreen + Bluetooth/USB',
        'Seats': 'Plush Captain Leather Seats',
        'Charging': 'USB & 12V Ports in All Rows',
      },
      safety: {
        'Airbags': '7 SRS Airbags',
        'Safety Rating': '5-Star NCAP',
        'Braking': 'ABS with EBD & Brake Assist',
        'Chassis': 'GOA High-Rigidity Frame',
      }
    },
    destinations: [
      { name: 'Munnar', distance: '125 km', duration: '3.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Alleppey', distance: '85 km', duration: '2.2 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' },
      { name: 'Thekkady', distance: '145 km', duration: '4 hrs', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'thekkady' }
    ],
    highlights: [
      '8+1 Seats',
      'Dual AC',
      'Large Luggage',
      'Professional Driver',
      'Airport Pickup',
      '24×7 Support',
      'Automatic',
      'Sanitized Daily'
    ],
    features: [
      { name: '7 Seats', icon: 'users' },
      { name: 'Automatic', icon: 'settings' },
      { name: 'Air Conditioning', icon: 'wind' },
      { name: 'Premium Interiors', icon: 'star' }
    ],
    amenities: [
      { name: 'Bottle Holder', icon: 'coffee' },
      { name: 'USB Charging', icon: 'battery-charging' },
      { name: 'Music System', icon: 'music' },
      { name: 'Push Back Seats', icon: 'corner-down-right' },
      { name: 'Reading Lights', icon: 'sun' }
    ],
    gallery: [
      { url: innovaCrystaFront, alt: 'Toyota Innova Crysta Exterior View', caption: 'Exterior View', category: 'Exterior' },
      { url: innovaCrystaInterior, alt: 'Toyota Innova Crysta Luxury Leather Seats', caption: 'Luxury Leather Seats', category: 'Interior' },
      { url: innovaCrystaDashboard, alt: 'Toyota Innova Crysta Premium Dashboard', caption: 'Premium Dashboard', category: 'Dashboard' },
      { url: innovaCrystaBoot, alt: 'Toyota Innova Crysta Ample Luggage Space', caption: 'Ample Luggage Space', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'Is fuel included in the daily rental price?', answer: 'Yes, our premium packages include all fuel costs for the agreed itinerary. There are no hidden surcharges based on mileage within the standard tour route.' },
      { question: 'Can the driver multiday tour across Kerala?', answer: 'Yes! All our drivers are experienced, multi-lingual professionals certified for state-wide travel across all districts and hill stations.' },
      { question: 'What happens if my flight is delayed?', answer: 'Our 24x7 operations team monitors flight schedules in real-time. Your chauffeur will be waiting at Cochin Airport (COK) regardless of flight delays.' }
    ],
    reviews: [
      { id: 'rev-1', author: 'Arun Kumar', location: 'Bangalore, India', rating: 5, date: '1 month ago', comment: 'The Innova Crysta we booked was in pristine condition. The seats were very comfortable, and the driver was extremely polite and punctual.' },
      { id: 'rev-2', author: 'Sarah Jenkins', location: 'London, UK', rating: 5, date: '3 months ago', comment: 'Perfect vehicle for our family trip to Munnar. Spacious enough for all our luggage and the ride was smooth on hill roads.' }
    ],
    pricing: { rate: '₹3,500', period: 'per day' },
    rating: 4.9,
    seo: {
      title: 'Rent Toyota Innova Crysta in Kerala | Green World Holidays',
      description: 'Book a premium Toyota Innova Crysta for your Kerala tour. Enjoy spacious, air-conditioned comfort with professional drivers for family trips and corporate travel.',
      keywords: ['Toyota Innova Crysta rental Kerala', 'premium MPV hire', 'Kerala tour car', '7 seater taxi Kerala']
    }
  },
  {
    id: '103',
    slug: 'toyota-rumion',
    name: 'Toyota Rumion',
    category: 'MPV',
    image: rumionExterior,
    heroImage: rumionExterior,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 7,
    luggageCapacity: 4,
    fuelType: 'Petrol',
    transmission: 'Manual',
    airConditioning: true,
    engine: '1.5L K-Series Dual VVT',
    safetyRating: '4 Star Safety (NCAP)',
    airbags: '4 SRS Airbags',
    shortDescription: 'Toyota Reliability in an Economical 7-Seater MPV',
    overview: 'The Toyota Rumion brings Toyota’s renowned engineering reliability and refined passenger comfort to the versatile 7-seater MPV segment. Boasting plush two-tone interiors, seamless air conditioning throughout all passenger rows, and generous legroom, the Rumion ensures a quiet and enjoyable family road trip across Kerala.',
    tags: ['Family Tour', 'Toyota Reliability', 'Kerala Holidays', 'Airport Taxi', 'Munnar & Thekkady', 'Economical MPV'],
    specifications: {
      vehicle: {
        'Transmission': 'Manual (5-Speed)',
        'Fuel Type': 'Petrol (BS6 Compliant)',
        'Engine': '1.5L K-Series Dual VVT',
        'Seating': '7 Seats (2+3+2 Configuration)',
      },
      comfort: {
        'Air Conditioning': 'Auto Climate Control with Rear Roof Vents',
        'Entertainment': 'Smart Audio Display + Bluetooth/USB',
        'Seats': 'Plush Ergonomic Reclining Seats',
        'Charging': 'USB & 12V Power Sockets',
      },
      safety: {
        'Airbags': 'SRS Airbags (Front & Side)',
        'Safety Rating': '4-Star NCAP',
        'Braking': 'ABS + EBD with Brake Assist',
        'Chassis': 'High Tensile Safety Cage',
      }
    },
    destinations: [
      { name: 'Munnar', distance: '125 km', duration: '3.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Thekkady', distance: '145 km', duration: '4 hrs', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'thekkady' },
      { name: 'Alleppey', distance: '85 km', duration: '2.2 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' }
    ],
    highlights: [
      '7 Passenger Seating',
      'Roof AC Blowers',
      'Smooth Suspension',
      'Professional Chauffeur',
      'Cochin Airport Pickup',
      '24×7 Customer Helpline',
      'Daily Cleaned & Sanitized'
    ],
    features: [
      { name: '7 Seats', icon: 'users' },
      { name: 'Dual AC', icon: 'wind' },
      { name: 'Toyota Reliability', icon: 'shield' },
      { name: 'Quiet Cabin', icon: 'star' }
    ],
    amenities: [
      { name: 'Bottle Holders', icon: 'coffee' },
      { name: 'USB Charging', icon: 'battery-charging' },
      { name: 'Audio System', icon: 'music' },
      { name: 'Adjustable Headrests', icon: 'corner-down-right' },
      { name: 'Cabin Lighting', icon: 'sun' }
    ],
    gallery: [
      { url: rumionExterior, alt: 'Toyota Rumion Exterior Front & Profile', caption: 'Exterior View', category: 'Exterior' },
      { url: rumionSeats, alt: 'Toyota Rumion Plush Rear Passenger Seats', caption: 'Plush Rear Seating', category: 'Interior' },
      { url: rumionDashboard, alt: 'Toyota Rumion Modern Interior Dashboard', caption: 'Modern Driver Dashboard', category: 'Dashboard' },
      { url: rumionBoot, alt: 'Toyota Rumion Generous Boot Space', caption: 'Generous Luggage Space', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'How is the Toyota Rumion different from other MPVs?', answer: 'The Toyota Rumion is backed by Toyota’s legendary durability, refined cabin insulation, and exceptionally comfortable suspension for Kerala tours.' },
      { question: 'Is the Rumion suitable for hill station trips like Munnar and Vagamon?', answer: 'Yes! The 1.5L engine handles winding ghat roads effortlessly with ample pulling power and smooth suspension for passenger comfort.' }
    ],
    reviews: [
      { id: 'rev-rumion-1', author: 'Siddharth Menon', location: 'Kochi, India', rating: 5, date: '3 weeks ago', comment: 'The Rumion was extremely comfortable for our family of 5 with grandparents. Smooth suspension and great AC performance in Kerala weather.' }
    ],
    pricing: { rate: '₹2,500', period: 'per day' },
    rating: 4.6,
    seo: {
      title: 'Rent Toyota Rumion in Kerala | 7 Seater MPV - Green World Holidays',
      description: 'Hire Toyota Rumion 7-seater MPV with driver for your Kerala vacation. Enjoy reliable comfort, spacious luggage space, and airport pickup.',
      keywords: ['Toyota Rumion rental Kerala', '7 seater MPV hire Kochi', 'Toyota taxi Kerala', 'Rumion cab booking']
    }
  },
  {
    id: '104',
    slug: 'maruti-invicto',
    name: 'Maruti Invicto',
    category: 'MPV',
    image: invictoExterior,
    heroImage: invictoExterior,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 7,
    luggageCapacity: 5,
    fuelType: 'Petrol / Strong Hybrid',
    transmission: 'Automatic',
    airConditioning: true,
    engine: '2.0L Intelligent Strong Hybrid',
    safetyRating: '5 Star Safety (NCAP)',
    airbags: '6 SRS Airbags',
    shortDescription: 'Ultra-Premium Hybrid MPV with Automatic Luxury',
    overview: 'The Maruti Suzuki Invicto represents flagship executive luxury and cutting-edge hybrid engineering. With captain seat luxury, whisper-silent hybrid electric cruising, automatic transmission, and panoramic space, it offers VIP-grade travel throughout Kerala for executive tours, destination weddings, and premium family holidays.',
    tags: ['Luxury MPV', 'Strong Hybrid', 'VIP Transportation', 'Executive Travel', 'Wedding Car', 'Automatic'],
    specifications: {
      vehicle: {
        'Transmission': 'e-CVT Automatic',
        'Fuel Type': 'Strong Hybrid (Electric + Petrol)',
        'Engine': '2.0L VVTi Hybrid Powertrain',
        'Seating': '7 Seats (Captain Recliner Chairs)',
      },
      comfort: {
        'Air Conditioning': 'Multi-Zone Climate Control',
        'Entertainment': '10-inch Touchscreen with Apple CarPlay/Android Auto',
        'Seats': 'Ultra-Plush Captain Seats with Armrests',
        'Charging': 'Fast Type-C & USB Ports',
      },
      safety: {
        'Airbags': '6 SRS Airbags Protection',
        'Safety Rating': '5-Star Safety Standard',
        'Braking': 'All-Wheel Disc Brakes + ESP + Hill Hold',
        'Chassis': 'Rigid TNGA-Monocoque Architecture',
      }
    },
    destinations: [
      { name: 'Munnar', distance: '125 km', duration: '3.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Alleppey', distance: '85 km', duration: '2.2 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' },
      { name: 'Thekkady', distance: '145 km', duration: '4 hrs', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'thekkady' }
    ],
    highlights: [
      'Strong Hybrid Silent Drive',
      'Plush Captain Chairs',
      'Automatic e-CVT',
      'Multi-Zone Climate',
      'Executive Class Comfort',
      '24×7 Airport Concierge',
      'Uniformed Chauffeur'
    ],
    features: [
      { name: '7 Seats', icon: 'users' },
      { name: 'Automatic e-CVT', icon: 'settings' },
      { name: 'Multi-Zone AC', icon: 'wind' },
      { name: 'Executive Interior', icon: 'star' }
    ],
    amenities: [
      { name: 'Cup & Bottle Holders', icon: 'coffee' },
      { name: 'Fast USB Ports', icon: 'battery-charging' },
      { name: 'Premium Audio', icon: 'music' },
      { name: 'Captain Reclining Chairs', icon: 'corner-down-right' },
      { name: 'Ambient Reading Lights', icon: 'sun' }
    ],
    gallery: [
      { url: invictoExterior, alt: 'Maruti Invicto Bold SUV-MPV Exterior', caption: 'Exterior View', category: 'Exterior' },
      { url: invictoSeats, alt: 'Maruti Invicto Luxury Captain Rear Seats', caption: 'Luxury Captain Seating', category: 'Interior' },
      { url: invictoDashboard, alt: 'Maruti Invicto Cockpit and Touchscreen Dashboard', caption: 'Smart Console & Dashboard', category: 'Dashboard' },
      { url: invictoBoot, alt: 'Maruti Invicto Large Cargo Boot Space', caption: 'Expansive Boot Space', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'What makes the Invicto a premium option?', answer: 'The Invicto is built on a flagship premium MPV platform with strong hybrid technology, whisper-quiet cabin acoustics, expansive legroom, and captain chair comfort.' },
      { question: 'Is the vehicle automatic?', answer: 'Yes, all our Invicto models feature e-CVT automatic transmission for buttery-smooth acceleration without gear shifts.' }
    ],
    reviews: [
      { id: 'rev-invicto-1', author: 'Vikram Singhania', location: 'Mumbai, India', rating: 5, date: '1 month ago', comment: 'Top-tier luxury! Traveled from Cochin airport to Kumarakom resort. The Invicto is so silent and captain seats were exceptionally relaxing.' }
    ],
    pricing: { rate: '₹2,800', period: 'per day' },
    rating: 4.8,
    seo: {
      title: 'Rent Maruti Invicto in Kerala | Luxury Hybrid MPV - Green World Holidays',
      description: 'Book Maruti Invicto strong hybrid luxury MPV rental in Kerala. Premium captain seating, automatic transmission, and chauffeur service for VIP & family travel.',
      keywords: ['Maruti Invicto rental Kerala', 'luxury MPV hire Kochi', 'Invicto hybrid taxi', 'automatic 7 seater rental Kerala']
    }
  },
  {
    id: '105',
    slug: 'honda-city',
    name: 'Honda City',
    category: 'Sedan',
    image: cityExterior,
    heroImage: cityExterior,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 5,
    luggageCapacity: 3,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    engine: '1.5L i-VTEC DOHC Engine',
    safetyRating: '5 Star Safety (NCAP)',
    airbags: '6 Airbags',
    shortDescription: 'Iconic Executive Sedan for Smooth Highway & City Travel',
    overview: 'The Honda City is the quintessential executive sedan, synonymous with supreme ride comfort, whisper-quiet ride dynamics, and class-leading rear legroom. Ideal for corporate travelers, couples on honeymoon, and small families touring Kerala, the City turns every journey into a relaxed, effortless experience.',
    tags: ['Executive Sedan', 'Honeymoon Tour', 'Airport Transfer', 'Corporate Travel', 'Smooth Ride', 'Automatic'],
    specifications: {
      vehicle: {
        'Transmission': 'CVT Automatic with Paddle Shift',
        'Fuel Type': 'Petrol (BS6 Compliant)',
        'Engine': '1.5L i-VTEC 4-Cylinder DOHC',
        'Seating': '5 Seats (Ergonomic Contoured)',
      },
      comfort: {
        'Air Conditioning': 'Automatic Climate Control with Rear AC Vents',
        'Entertainment': '8-inch Touchscreen with Apple CarPlay/Android Auto',
        'Seats': 'Plush Ergonomic Leatherette Seats',
        'Charging': 'USB & 12V Power Sockets Front & Rear',
      },
      safety: {
        'Airbags': '6 SRS Airbags Protection',
        'Safety Rating': '5-Star ASEAN NCAP',
        'Braking': 'ABS with EBD + Vehicle Stability Assist',
        'Chassis': 'Advanced ACE Body Structure',
      }
    },
    destinations: [
      { name: 'Kochi City', distance: '35 km', duration: '1 hr', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'munnar' },
      { name: 'Munnar', distance: '125 km', duration: '3.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Alleppey', distance: '85 km', duration: '2.2 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' }
    ],
    highlights: [
      'Plush Rear Bench Legroom',
      'Smooth CVT Automatic',
      'Rear AC Vents',
      '506L Massive Trunk',
      'Executive Chauffeur',
      'Flight Tracking Airport Pickup',
      'Sanitized Daily'
    ],
    features: [
      { name: '5 Seats', icon: 'users' },
      { name: 'CVT Automatic', icon: 'settings' },
      { name: 'Auto AC & Rear Vents', icon: 'wind' },
      { name: 'Executive Comfort', icon: 'star' }
    ],
    amenities: [
      { name: 'Cup & Bottle Holders', icon: 'coffee' },
      { name: 'Rear USB Charging', icon: 'battery-charging' },
      { name: 'Surround Sound Audio', icon: 'music' },
      { name: 'Rear Armrest & Headrests', icon: 'corner-down-right' },
      { name: 'Reading Lamps', icon: 'sun' }
    ],
    gallery: [
      { url: cityExterior, alt: 'Honda City Sleek Sedan Exterior', caption: 'Exterior View', category: 'Exterior' },
      { url: citySeats, alt: 'Honda City Plush Ergonomic Seating', caption: 'Ergonomic Passenger Seating', category: 'Interior' },
      { url: cityDashboard, alt: 'Honda City Modern Digital Dashboard', caption: 'Driver Cockpit & Console', category: 'Dashboard' },
      { url: cityBoot, alt: 'Honda City Massive 506-Litre Trunk Boot Space', caption: 'Deep Trunk Luggage Space', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'How much luggage can the Honda City trunk hold?', answer: 'The Honda City features a class-leading 506-litre trunk boot that easily accommodates 2 to 3 large suitcases plus carry-on bags.' },
      { question: 'Is the Honda City suitable for couples and honeymoon tours?', answer: 'Yes! The Honda City is our most recommended sedan for couples and honeymooners seeking privacy, plush rear seat ride comfort, and smooth highway handling.' }
    ],
    reviews: [
      { id: 'rev-city-1', author: 'Ananya Sharma', location: 'Delhi, India', rating: 5, date: '2 weeks ago', comment: 'Hired Honda City for our Kerala honeymoon tour. Excellent car condition, very smooth ride on winding roads, and the chauffeur was super courteous.' }
    ],
    pricing: { rate: '₹2,000', period: 'per day' },
    rating: 4.7,
    seo: {
      title: 'Rent Honda City in Kerala | Executive Sedan Hire - Green World Holidays',
      description: 'Book Honda City sedan rental in Kerala with professional chauffeur. Perfect for corporate travel, honeymoon tours, and Cochin airport transfers.',
      keywords: ['Honda City rental Kerala', 'sedan hire Kochi', 'Honda City taxi Kerala', 'executive car rental']
    }
  },
  {
    id: '106',
    slug: 'urbania',
    name: 'Urbania',
    category: 'Van',
    image: urbaniaExterior,
    heroImage: urbaniaExterior,
    heroBackdrop: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80',
    seatCapacity: 17,
    luggageCapacity: 10,
    fuelType: 'Diesel (BS6)',
    transmission: 'Manual',
    airConditioning: true,
    engine: 'Mercedes-Derived FM 2.6L CR ED Turbo Diesel',
    safetyRating: 'Crash Tested Global Standards',
    airbags: 'Driver & Co-Driver Airbags',
    shortDescription: 'Next-Gen International Luxury Van for Group Travel',
    overview: 'The Force Urbania is India’s next-generation luxury passenger van, engineered with European styling, independent front suspension, and executive business-class recliner seating. With individual AC vents, wide panoramic windows, and whisper-quiet ride isolation, large families and corporate delegations experience first-class travel across Kerala.',
    tags: ['Luxury Van', 'Group Travel', 'Corporate Fleet', 'Family Reunion', 'Wedding Guest Fleet', 'Kerala Grand Tour'],
    specifications: {
      vehicle: {
        'Transmission': 'Manual (5-Speed Synchromesh)',
        'Fuel Type': 'Diesel (BS6 Compliant)',
        'Engine': 'Mercedes-Derived 2.6L Turbo Diesel',
        'Seating': '17 Seats (Executive Recliners + Armrests)',
      },
      comfort: {
        'Air Conditioning': 'Individual Ceiling AC Vents for Each Passenger',
        'Entertainment': 'LED Screen + Hi-Fi Audio System',
        'Seats': 'Ergonomic Pushback Luxury Recliner Seats',
        'Charging': 'Individual USB Charging Ports for Every Seat',
      },
      safety: {
        'Airbags': 'Driver & Passenger SRS Airbags',
        'Safety Rating': 'Full Monocoque Body with Rollover Compliance',
        'Braking': 'All-Wheel Disc Brakes + ABS with EBD + ESP',
        'Chassis': 'Rigid European Monocoque Platform',
      }
    },
    destinations: [
      { name: 'Munnar', distance: '125 km', duration: '4 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_img_nezzuf.jpg', slug: 'munnar' },
      { name: 'Thekkady', distance: '145 km', duration: '4.5 hrs', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80', slug: 'thekkady' },
      { name: 'Alleppey', distance: '85 km', duration: '2.5 hrs', image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg', slug: 'alleppey' }
    ],
    highlights: [
      '17 Business Class Seats',
      'Individual AC Vents',
      'Independent Front Suspension',
      'Dedicated Huge Luggage Bay',
      'Professional Heavy-Vehicle Pilot',
      'Full Kerala Tour Ready',
      'Daily Deep Cleaned & Sanitized'
    ],
    features: [
      { name: '17 Seats', icon: 'users' },
      { name: 'Individual AC', icon: 'wind' },
      { name: 'Pushback Recliners', icon: 'corner-down-right' },
      { name: 'Monocoque Safety', icon: 'shield' }
    ],
    amenities: [
      { name: 'Individual USB Ports', icon: 'battery-charging' },
      { name: 'Individual Reading Lights', icon: 'sun' },
      { name: 'Hi-Fi Audio & Mic', icon: 'music' },
      { name: 'Bottle Holders & Magazine Nets', icon: 'coffee' },
      { name: 'Panoramic Tinted Windows', icon: 'eye' }
    ],
    gallery: [
      { url: urbaniaExterior, alt: 'Force Urbania Luxury Van Exterior', caption: 'Exterior View', category: 'Exterior' },
      { url: urbaniaSeats, alt: 'Force Urbania Business Class Recliner Passenger Seats', caption: 'Business Class Recliners', category: 'Interior' },
      { url: urbaniaDashboard, alt: 'Force Urbania Advanced Driver Cockpit and Console', caption: 'Driver Cockpit & Console', category: 'Dashboard' },
      { url: urbaniaBoot, alt: 'Force Urbania Dedicated Rear Cargo Luggage Bay', caption: 'Dedicated Luggage Bay', category: 'Luggage Space' }
    ],
    faqs: [
      { question: 'How is the Urbania different from a conventional Tempo Traveller?', answer: 'The Force Urbania is built on a European monocoque architecture with independent front suspension, offering car-like ride smoothness, dramatically lower cabin noise, individual AC vents, and executive recliner seats.' },
      { question: 'Can the Urbania easily navigate hill stations like Munnar?', answer: 'Yes! The Urbania is powered by a torquey Mercedes-derived 2.6L engine designed specifically for mountain climbs and ghat roads, piloted by our senior mountain-certified drivers.' }
    ],
    reviews: [
      { id: 'rev-urbania-1', author: 'George Mathew', location: 'Dubai, UAE', rating: 5, date: '3 weeks ago', comment: 'We booked the Urbania for our 14-member family reunion tour in Kerala. Absolutely outstanding vehicle! Comfortable recliners, individual AC, and very quiet ride.' }
    ],
    pricing: { rate: '₹5,000', period: 'per day' },
    rating: 4.8,
    seo: {
      title: 'Rent Force Urbania in Kerala | Luxury 17 Seater Van - Green World Holidays',
      description: 'Hire Force Urbania 17-seater luxury van in Kerala with driver. Perfect for family group tours, destination weddings, and corporate outings.',
      keywords: ['Force Urbania rental Kerala', '17 seater luxury van hire Kochi', 'Urbania van Kerala', 'luxury group tempo traveller']
    }
  },
  {
    id: '107',
    slug: 'force-traveller',
    name: 'Force Traveller',
    category: 'Van',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556506/1-force-tempo-traveller-3050-1-1741842933_ogk4tm.webp',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556506/1-force-tempo-traveller-3050-1-1741842933_ogk4tm.webp',
    seatCapacity: 17,
    luggageCapacity: 15,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A highly spacious van perfectly suited for large family groups and tours.',
    pricing: { rate: '₹4,500', period: 'per day' },
    rating: 4.7
  },
  {
    id: '108',
    slug: 'scania-bus',
    name: 'Scania Bus',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556522/scania_bus_y8btpt.webp',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556522/scania_bus_y8btpt.webp',
    seatCapacity: 40,
    luggageCapacity: 40,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A luxury 40-seater bus for large corporate and tourist groups.',
    pricing: { rate: '₹12,000', period: 'per day' },
    rating: 4.9
  },
  {
    id: '109',
    slug: 'toyota-etios',
    name: 'Toyota Etios',
    category: 'Sedan',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556504/etios_roaxm6.jpg',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556504/etios_roaxm6.jpg',
    seatCapacity: 5,
    luggageCapacity: 3,
    fuelType: 'Petrol',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'An economical sedan suitable for small families and budget travel.',
    pricing: { rate: '₹1,800', period: 'per day' },
    rating: 4.5
  },
  {
    id: '110',
    slug: 'maruti-dzire',
    name: 'Maruti Dzire',
    category: 'Sedan',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556515/dzire_fvls6t.jpg',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556515/dzire_fvls6t.jpg',
    seatCapacity: 5,
    luggageCapacity: 3,
    fuelType: 'Petrol',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A popular, highly efficient compact sedan for comfortable budget rides.',
    pricing: { rate: '₹1,700', period: 'per day' },
    rating: 4.4
  },
  {
    id: '111',
    slug: 'glider-bus',
    name: 'Glider Bus',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556702/glider_olmo2e.webp',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556702/glider_olmo2e.webp',
    seatCapacity: 45,
    luggageCapacity: 45,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A comfortable 45-seater luxury bus.',
    pricing: { rate: '₹11,000', period: 'per day' },
    rating: 4.8
  },
  {
    id: '113',
    slug: 'toyota-hycross',
    name: 'Toyota Hycross',
    category: 'MPV',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556513/hycross_a9rffv.jpg',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556513/hycross_a9rffv.jpg',
    seatCapacity: 7,
    luggageCapacity: 4,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    airConditioning: true,
    shortDescription: 'A stylish and advanced MPV with superior automated comfort.',
    pricing: { rate: '₹3,200', period: 'per day' },
    rating: 4.7
  },
  {
    id: '114',
    slug: 'bharath-benz-glider-34',
    name: 'Bharath Benz Glider (34 Seater)',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556511/bharath_benz_1_wnniui.jpg',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556511/bharath_benz_1_wnniui.jpg',
    seatCapacity: 34,
    luggageCapacity: 34,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A luxury 34-seater bus with premium seating.',
    pricing: { rate: '₹11,000', period: 'per day' },
    rating: 4.8
  },
  {
    id: '116',
    slug: 'bharath-benz-glider-24',
    name: 'Bharath Benz Glider (24 Seater)',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556652/Untitled_1_xg8xtg.png',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556652/Untitled_1_xg8xtg.png',
    seatCapacity: 24,
    luggageCapacity: 24,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'A comfortable 24-seater bus offering premium luxury.',
    pricing: { rate: '₹11,000', period: 'per day' },
    rating: 4.8
  },
  {
    id: '115',
    slug: 'volvo-bus',
    name: 'Volvo Bus',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556532/volvo-banner-1_l0fptk.webp',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556532/volvo-banner-1_l0fptk.webp',
    seatCapacity: 45,
    luggageCapacity: 45,
    fuelType: 'Diesel',
    transmission: 'Manual',
    airConditioning: true,
    shortDescription: 'The pinnacle of road luxury with 45 seating capacity.',
    pricing: { rate: '₹13,000', period: 'per day' },
    rating: 4.8
  },
  {
    id: '117',
    slug: '45-seater-luxury-coach',
    name: '45 Seater Luxury Coach',
    category: 'Bus',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556532/volvo-banner-1_l0fptk.webp',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556532/volvo-banner-1_l0fptk.webp',
    seatCapacity: 45,
    luggageCapacity: 45,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    airConditioning: true,
    shortDescription: 'Comfortable Group Travel',
    pricing: { rate: 'On Request', period: '' },
    rating: 4.9,
    highlights: [
      'Ideal for Corporate Tours, School Trips & Group Packages'
    ],
    features: [
      { name: '45 Seats', icon: 'users' },
      { name: 'Fully Air Conditioned', icon: 'wind' },
      { name: 'Pushback Recliner Seats', icon: 'corner-down-right' },
      { name: 'Premium Audio System', icon: 'music' },
      { name: 'LED TV / Entertainment', icon: 'tv' },
      { name: 'Charging Ports', icon: 'battery-charging' }
    ]
  }
];
