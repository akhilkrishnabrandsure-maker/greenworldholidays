import { TourPackage } from '../types/package.types';

export const mockPackages: TourPackage[] = [
  {
    id: 'pkg-001',
    slug: 'kerala-honeymoon-package',
    name: 'Romantic Kerala Honeymoon Package',
    category: 'Honeymoon Packages',
    duration: '5 Days / 4 Nights',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    shortDescription: 'Experience the most romantic getaway with our premium Kerala Honeymoon Package covering Munnar, Thekkady, and Alleppey.',
    overview: 'Designed exclusively for couples, this honeymoon package offers a perfect blend of romance, adventure, and relaxation. Wander through the misty tea gardens of Munnar, enjoy a thrilling wildlife safari in Thekkady, and end your trip with a romantic overnight stay in a traditional Kerala houseboat on the tranquil backwaters of Alleppey.',
    highlights: [
      'Flower bed decoration in Munnar',
      'Candlelight dinner on Alleppey houseboat',
      'Private AC vehicle for all transfers and sightseeing',
      'Spice plantation tour in Thekkady'
    ],
    pricing: {
      startingPrice: '₹14,500',
      priceNote: 'per person on twin sharing basis',
      discountPercentage: 10
    },
    includedServices: [
      'Accommodation in 3-star/4-star premium hotels',
      'Breakfast at all hotels',
      'All meals on the houseboat (Lunch, Dinner, Breakfast)',
      'Exclusive AC vehicle for the entire trip',
      'Toll, parking, and driver allowance',
      'All taxes'
    ],
    excludedServices: [
      'Flight/Train tickets',
      'Entrance fees to monuments/parks',
      'Lunch and dinner (except houseboat)',
      'Personal expenses (laundry, tips, etc.)'
    ],
    coveredDestinations: ['munnar', 'thekkady', 'alappuzha-backwaters-houseboat'],
    availableVehicles: ['maruti-ertiga', 'maruti-swift-dzire', 'toyota-innova-crysta'],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Kochi & Transfer to Munnar',
        description: 'Arrive at Cochin International Airport or Railway Station. Our representative will receive you and transfer you to Munnar. En route, enjoy the scenic beauty of Cheeyappara and Valara waterfalls.',
        overnightStay: 'Munnar',
        activities: ['Cheeyappara Waterfalls', 'Valara Waterfalls', 'Tea Plantations'],
        meals: ['Dinner (if included in hotel package)']
      },
      {
        dayNumber: 2,
        title: 'Munnar Sightseeing',
        description: 'After breakfast, proceed for a full day sightseeing tour of Munnar. Visit the famous Mattupetty Dam, Echo Point, and the Eravikulam National Park.',
        overnightStay: 'Munnar',
        activities: ['Eravikulam National Park', 'Mattupetty Dam', 'Echo Point', 'Tea Museum'],
        meals: ['Breakfast']
      },
      {
        dayNumber: 3,
        title: 'Transfer to Thekkady',
        description: 'Check out from the hotel and drive to Thekkady. Thekkady is famous for the Periyar Wildlife Sanctuary. Enjoy a boat ride on Periyar Lake and a spice plantation tour.',
        overnightStay: 'Thekkady',
        activities: ['Periyar Boating', 'Spice Plantation Tour', 'Kathakali Show (Optional)'],
        meals: ['Breakfast']
      },
      {
        dayNumber: 4,
        title: 'Transfer to Alleppey Houseboat',
        description: 'After breakfast, proceed to Alleppey. Check-in to a traditional Kerala houseboat by noon. Cruise through the beautiful backwaters, witnessing local village life.',
        overnightStay: 'Houseboat in Alleppey',
        activities: ['Backwater Cruising', 'Village Walk'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        dayNumber: 5,
        title: 'Departure from Kochi',
        description: 'After breakfast on the houseboat, check out and drive back to Kochi for your return journey with sweet memories of Kerala.',
        meals: ['Breakfast']
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb96667a0?auto=format&fit=crop&w=800&q=80', alt: 'Munnar Tea Gardens' },
      { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', alt: 'Alleppey Houseboat' }
    ],
    faqs: [
      {
        question: 'Is the houseboat private or sharing?',
        answer: 'For our honeymoon packages, we exclusively provide private 1-bedroom houseboats to ensure your privacy and comfort.'
      },
      {
        question: 'Are flight tickets included?',
        answer: 'No, flight or train tickets to and from Kochi are not included in the package price. However, we can assist with booking them upon request.'
      }
    ],
    reviews: [
      {
        id: 'rev-01',
        author: 'Rahul & Priya',
        rating: 5,
        comment: 'An unforgettable honeymoon experience! The arrangement in Munnar and the candlelight dinner on the houseboat were magical. The driver was very polite and helpful.',
        date: 'Oct 2023',
        location: 'Mumbai, India'
      }
    ],
    seo: {
      title: 'Romantic Kerala Honeymoon Package | 5 Days / 4 Nights',
      description: 'Book the best 5 Days Kerala Honeymoon Package covering Munnar, Thekkady, and Alleppey Houseboat with private AC cab and premium stays.',
      keywords: ['kerala honeymoon package', 'munnar honeymoon', 'alleppey houseboat', 'kerala tour']
    }
  },
  {
    id: 'pkg-002',
    slug: 'kerala-family-tour-package',
    name: 'Essence of Kerala Family Tour',
    category: 'Family Packages',
    duration: '6 Days / 5 Nights',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb96667a0?auto=format&fit=crop&w=1920&q=80',
    shortDescription: 'A perfect 6 days family vacation covering the best of Kerala: hills, wildlife, backwaters, and beaches.',
    overview: 'Create beautiful memories with your family on this 6-day Kerala tour. This itinerary is carefully crafted to offer a relaxed pace suitable for all age groups. From the cool climate of Munnar to the elephant rides in Thekkady, the houseboat cruise in Alleppey, and relaxing at Marari beach.',
    highlights: [
      'Child-friendly hotels with swimming pools',
      'Elephant ride and martial arts show in Thekkady',
      'Spacious family vehicles like Innova Crysta',
      'Relaxing beach day'
    ],
    pricing: {
      startingPrice: '₹16,999',
      priceNote: 'per person (min 4 pax)'
    },
    coveredDestinations: ['munnar', 'thekkady', 'alappuzha-backwaters-houseboat', 'marari-beach'],
    availableVehicles: ['toyota-innova-crysta', 'maruti-ertiga', 'force-urbania'],
  }
];
