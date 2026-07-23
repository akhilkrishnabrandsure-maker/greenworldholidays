import { Destination } from '../types/destination.types';

const DEFAULT_ADDITIONAL_INFO = [
  'This destination offers a unique blend of natural beauty and cultural heritage, making it a must-visit for travelers seeking both relaxation and adventure. From scenic landscapes to vibrant local traditions, every moment here promises a memorable experience.',
  "Whether you're exploring the lush greenery, enjoying local cuisine, or participating in traditional festivals, you'll find countless opportunities to immerse yourself in the charm and hospitality of this remarkable place.",
];

export const destinations: Destination[] = [
  {
    id: 1,
    slug: 'munnar-hill-station',
    canonicalSlug: 'munnar',
    name: 'Munnar Hill Station',
    district: 'Idukki',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
    heroImage: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
    rating: 4.9,
    reviewsCount: 128,
    description:
      "Explore Munnar's breathtaking tea-covered hills, misty mountains, serene valleys, winding roads, and charming plantation villages nestled in nature.",
    shortDescription: 'Kerala\'s premier hill station famous for rolling tea plantations, mist-covered valleys, and cool mountain air.',
    overview: 'Perched at 1,600 meters above sea level in the Western Ghats of Kerala, Munnar is a serene hill station renowned for its sprawling tea estates, misty valleys, and cool mountain air. Once the summer resort of the British Government in South India, Munnar captivates travelers with its rolling hills, exotic flora and fauna, and picturesque waterfalls.',
    highlights: [
      'Sprawling Tea Plantations & Estate Walks',
      'Eravikulam National Park & Nilgiri Tahr Spotting',
      'Panoramic views from Anamudi Peak',
      'Serene boat rides on Mattupetty Lake & Dam',
      'Authentic Spice Plantation & Tea Museum Tours'
    ],
    bestTimeToVisit: 'September to May',
    attractions: [
      {
        id: '1',
        name: 'Eravikulam National Park',
        description: 'Home to the endangered Nilgiri Tahr, offering panoramic vistas of rolling tea estates and high-altitude grasslands.',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
        distance: '15 km from Munnar Town',
        duration: '3 - 4 hours'
      },
      {
        id: '2',
        name: 'Mattupetty Dam & Lake',
        description: 'Famous for speed boating and calm waters surrounded by tea gardens and hill ranges, often visited by wild elephants.',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
        distance: '13 km from Munnar Town',
        duration: '2 hours'
      },
      {
        id: '3',
        name: 'Tea Museum (Kannandeven Hills)',
        description: 'Exhibits the heritage and evolution of tea plantations in Munnar from the late 19th century to modern times.',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754558483/spices_job8vh.jpg',
        distance: '2 km from Munnar Town',
        duration: '1.5 hours'
      },
      {
        id: '4',
        name: 'Anamudi Peak',
        description: 'The highest peak in South India, standing tall at 2,695 meters, ideal for nature enthusiasts and scenic photography.',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556524/vagamon_y8ubni.jpg',
        distance: '18 km from Munnar Town',
        duration: ' Half-day trip'
      }
    ],
    gallery: [
      {
        url: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/munnar_new_myszfp.jpg',
        alt: 'Munnar Tea Gardens and Hills',
        caption: 'Misty tea plantations stretching across the valleys of Munnar'
      },
      {
        url: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556524/vagamon_y8ubni.jpg',
        alt: 'Rolling Green Meadows in Idukki',
        caption: 'Lush green mountain trails'
      },
      {
        url: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556505/athirapally_falls_ax0zbh.jpg',
        alt: 'Waterfalls near Munnar region',
        caption: 'Cascading mountain streams'
      },
      {
        url: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754558483/spices_job8vh.jpg',
        alt: 'Spice plantations in Idukki',
        caption: 'Aromatic cardamom and spice gardens'
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit Munnar?',
        answer: 'The best time to visit Munnar is from September to May when the weather is pleasant, cool, and perfect for outdoor sight-seeing and plantation visits.'
      },
      {
        question: 'How many days are needed for a Munnar trip?',
        answer: 'A 2 to 3-day itinerary is ideal to explore Munnar\'s major attractions including Eravikulam National Park, Mattupetty Dam, Tea Museum, and spice gardens.'
      },
      {
        question: 'How far is Munnar from Cochin Airport?',
        answer: 'Munnar is approximately 110 km from Cochin International Airport (COK). The scenic drive takes about 3.5 to 4 hours via private cab.'
      },
      {
        question: 'What are the top activities in Munnar?',
        answer: 'Key activities include tea plantation walks, wildlife watching at Eravikulam, speed boating at Mattupetty, spice garden tours, and sampling fresh Kerala teas.'
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Rahul Sharma',
        location: 'Mumbai, India',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Munnar was an absolute dream. The tea gardens stretching as far as the eye can see left us speechless. Green World Holidays provided seamless cab service!',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 'r2',
        author: 'Ananya Patel',
        location: 'Ahmedabad, India',
        rating: 5,
        date: '1 month ago',
        comment: 'The driver provided by Green World Holidays made our mountain drives completely stress-free. Exceptional experience visiting Eravikulam National Park.',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      {
        id: 'r3',
        author: 'David Miller',
        location: 'London, UK',
        rating: 5,
        date: '2 months ago',
        comment: 'Crisp mountain air, tea museum tour, and stunning viewpoints everywhere you look. Truly God\'s Own Country!',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    ],
    seo: {
      title: 'Munnar Travel Packages & Hill Station Guide | Green World Holidays',
      description: 'Plan your trip to Munnar Hill Station with Green World Holidays. Explore tea plantations, Eravikulam, Mattupetty Dam, and book custom tour packages.',
      keywords: ['Munnar hill station', 'Munnar tour packages', 'Tea gardens Kerala', 'Eravikulam National Park']
    },
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 2,
    slug: 'alappuzha-backwaters-houseboat',
    name: 'Alappuzha-Backwaters &Houseboat',
    district: 'Alappuzha',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
    rating: 4.8,
    description:
      'Cruise through the serene backwaters of Alleppey and experience the charm of traditional houseboats and lush green landscapes.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 3,
    slug: 'kochi-port-city-with-heritage',
    name: 'Kochi - Port City with Heritage',
    district: 'Ernakulam',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556507/fort_kochi_eclsmg.webp',
    rating: 4.9,
    description:
      "Discover Fort Kochi's colonial architecture, vibrant streets, artistic vibes, ancient churches, and timeless coastal charm along the Arabian Sea shoreline.",
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 4,
    slug: 'thekkady-wildlife',
    name: 'Thekkady-Wildlife',
    district: 'Idukki',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556522/Thekkady-Wildlife_Spice_Plantations_xz4svb.webp',
    rating: 4.7,
    description:
      'Explore the wild beauty of Thekkady with lush forests, exotic wildlife, elephant safaris, spice plantations, and tranquil boat rides on Periyar Lake',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 5,
    slug: 'athirapally-waterfalls',
    name: 'Athirapally-Waterfalls',
    district: 'Thrissur',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556505/athirapally_falls_ax0zbh.jpg',
    rating: 4.9,
    description:
      'Witness the majestic Athirapally Waterfalls cascading through lush forests, surrounded by roaring beauty, misty trails, and the untouched charm of nature.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 6,
    slug: 'kovalam-beach-paradise',
    name: 'Kovalam-Beach Paradise',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kovalam_zh3vmk.jpg',
    rating: 4.8,
    description:
      'Relax on the golden sands of Kovalam Beach, enjoy swaying palm-lined shores, thrilling water sports, scenic sunsets, and rejuvenating Ayurvedic retreats',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 7,
    slug: 'kanyakumari-lands-end',
    name: "Kanyakumari - Land's End",
    district: 'Kanyakumari',
    state: 'Tamil Nadu',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556517/kanyakumari_cpz0dw.jpg',
    rating: 4.8,
    description:
      'Marvel at the confluence of three seas, iconic Vivekananda Rock, sunrise and sunset views, and the southernmost tip of India.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 8,
    slug: 'madurai-temple-city',
    name: 'Madurai - Temple City',
    district: 'Madurai',
    state: 'Tamil Nadu',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556519/madurai_bqreqj.webp',
    rating: 4.7,
    description:
      'Experience the spiritual grandeur of Meenakshi Temple, vibrant markets, and the rich cultural heritage of Tamil Nadu.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 9,
    slug: 'wayanad-green-paradise',
    name: 'Wayanad - Green Paradise',
    district: 'Wayanad',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556526/wayanad_emrkgd.jpg',
    rating: 4.9,
    description:
      'Discover misty mountains, lush forests, wildlife sanctuaries, waterfalls, and the cool climate of Wayanad.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 10,
    slug: 'bekal-fort-bakel-kotta',
    name: 'Bekal Fort (Bakel Kotta)',
    district: 'Kasaragod',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556506/bekal-fort_xcjam3.jpg',
    rating: 4.8,
    description:
      'Step into history at Bekal Fort, Kerala’s largest and best-preserved fort, offering panoramic views of the Arabian Sea and lush surroundings.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 11,
    slug: 'kumarakom',
    name: 'Kumarakom',
    district: 'Kottayam',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/kumarakam_wrnzza.webp',
    rating: 4.7,
    description:
      'Unwind in the tranquil backwaters of Kumarakom, famous for its bird sanctuary, houseboat cruises, and lush green landscapes.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
  {
    id: 12,
    slug: 'vagamon',
    name: 'Vagamon',
    district: 'Idukki',
    state: 'Kerala',
    image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556524/vagamon_y8ubni.jpg',
    rating: 4.9,
    description:
      'Escape to the rolling meadows, pine forests, and misty hills of Vagamon—a serene hill station perfect for nature lovers and adventure seekers.',
    additionalInfo: DEFAULT_ADDITIONAL_INFO,
  },
];
