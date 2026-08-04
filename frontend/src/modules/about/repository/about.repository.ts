export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface AboutStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface AboutProfile {
  name: string;
  designation: string;
  company: string;
  imageUrl: string;
  quote: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  introduction: string[];
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  profile: AboutProfile;
  features: AboutFeature[];
  stats: AboutStat[];
}

export const aboutRepository: AboutContent = {
  title: "About Green World Holidays",
  subtitle: "Your Complete Travel Partner for Unforgettable Kerala Experiences",
  introduction: [
    "At Green World Holidays, we provide comprehensive travel solutions combining the best holiday experiences with reliable car rental services. Whether you're planning a family vacation or need a vehicle for business travel, we've got you covered.",
    "Our experienced team ensures seamless service delivery, from curating perfect travel itineraries to maintaining a modern fleet of well-serviced vehicles. We're committed to making your travel experience smooth, safe, and memorable."
  ],
  mission: {
    title: "Our Mission",
    description: "To deliver exceptional and personalized travel experiences that exceed expectations, building lifelong relationships with every guest who chooses to explore Kerala with us."
  },
  vision: {
    title: "Our Vision",
    description: "To be the most trusted and preferred luxury travel partner in Kerala, recognized for our commitment to quality, transparent pricing, and unparalleled hospitality."
  },
  profile: {
    name: "Jayakumar K R",
    designation: "Managing Director & Founder",
    company: "Green World Holidays & Car Rentals",
    imageUrl: "https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/Jayan_dliyhn.jpg",
    quote: "To provide better tour reports, when you & your family depart it will be a lifelong touch with us. From your experience you will automatically recommend your friends & relatives to us. We assure that we will fulfill your dreams and the moments with us."
  },
  features: [
    {
      id: "personalized-service",
      title: "Personalized Service",
      description: "Tailored travel experiences designed just for you and your family.",
      iconName: "Heart"
    },
    {
      id: "professional-drivers",
      title: "Professional Drivers",
      description: "Courteous, experienced, and multilingual chauffeurs for your safety.",
      iconName: "Users"
    },
    {
      id: "premium-fleet",
      title: "Premium Fleet",
      description: "A wide range of well-maintained luxury and standard vehicles.",
      iconName: "Car"
    },
    {
      id: "local-experts",
      title: "Local Travel Experts",
      description: "In-depth local knowledge to guide you to Kerala's hidden gems.",
      iconName: "Map"
    },
    {
      id: "24-7-support",
      title: "24×7 Customer Support",
      description: "Round-the-clock assistance throughout your entire journey.",
      iconName: "Clock"
    },
    {
      id: "transparent-pricing",
      title: "Transparent Pricing",
      description: "No hidden costs. Honest and competitive rates for all packages.",
      iconName: "CreditCard"
    },
    {
      id: "safe-travel",
      title: "Safe & Comfortable Travel",
      description: "Highest safety standards ensuring peace of mind on every trip.",
      iconName: "ShieldCheck"
    },
    {
      id: "customized-planning",
      title: "Customized Tour Planning",
      description: "Turning your travel dreams into unforgettable memories.",
      iconName: "Star"
    }
  ],
  stats: [
    {
      id: "happy-travellers",
      label: "Happy Travellers",
      value: 10,
      suffix: "K+",
      iconName: "Users"
    },
    {
      id: "premium-vehicles",
      label: "Premium Vehicles",
      value: 100,
      suffix: "+",
      iconName: "Car"
    },
    {
      id: "destinations-covered",
      label: "Kerala Destinations Covered",
      value: 40,
      suffix: "+",
      iconName: "MapPin"
    },
    {
      id: "years-experience",
      label: "Years of Experience",
      value: 20,
      suffix: "+",
      iconName: "Award"
    }
  ]
};
