import { Metadata } from 'next';
import { StaticImageData } from 'next/image';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.greenworldholidays.com';

interface SEOProps {
  title: string;
  description: string;
  image?: string | StaticImageData;
  url?: string;
  noIndex?: boolean;
}

export function constructMetadata({ 
  title, 
  description, 
  image, 
  url, 
  noIndex = false 
}: SEOProps): Metadata {
  const rawImageUrl = typeof image === 'string' ? image : (image?.src || `${siteUrl}/og-image.jpg`);
  const imageUrl = rawImageUrl.startsWith('http')
    ? rawImageUrl
    : `${siteUrl}${rawImageUrl.startsWith('/') ? '' : '/'}${rawImageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: url ? `${siteUrl}${url}` : siteUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      siteName: 'Green World Holidays',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url ? `${siteUrl}${url}` : siteUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Green World Holidays",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Premium travel packages, vehicle rentals, and destination management in Kerala.",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  };
}

interface DestinationSchemaInput {
  name: string;
  description: string;
  image: string;
  district: string;
  slug: string;
  rating: number;
}

export function generateDestinationSchema(destination: DestinationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.name,
    "description": destination.description,
    "image": destination.image,
    "url": `${siteUrl}/destinations/${destination.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": destination.district,
      "addressCountry": "IN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": destination.rating,
      "bestRating": 5,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`,
    })),
  };
}

interface DestinationListItemInput {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export function generateDestinationListSchema(destinations: DestinationListItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Popular Destinations in Kerala & South India",
    "itemListElement": destinations.map((destination, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristDestination",
        "name": destination.name,
        "description": destination.description,
        "image": destination.image,
        "url": `${siteUrl}/destinations/${destination.slug}`,
      },
    })),
  };
}

export interface VehicleSchemaInput {
  name: string;
  description: string;
  image: string | StaticImageData;
  slug: string;
  category: string;
}

export function generateVehicleSchema(vehicle: VehicleSchemaInput) {
  const rawImage = typeof vehicle.image === 'string' ? vehicle.image : vehicle.image?.src;
  const image = rawImage
    ? (rawImage.startsWith('http') ? rawImage : `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`)
    : `${siteUrl}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `${vehicle.category} Rental`,
    "name": vehicle.name,
    "description": vehicle.description,
    "image": image,
    "url": `${siteUrl}/vehicles/${vehicle.slug}`,
    "provider": {
      "@type": "TravelAgency",
      "name": "Green World Holidays",
      "image": `${siteUrl}/logo.png`
    }
  };
}

export function generateVehicleListSchema(vehicles: VehicleSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Vehicle Fleet in Kerala",
    "itemListElement": vehicles.map((vehicle, index) => {
      const rawImage = typeof vehicle.image === 'string' ? vehicle.image : vehicle.image?.src;
      const image = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`)
        : `${siteUrl}/og-image.jpg`;

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": vehicle.name,
          "description": vehicle.description,
          "image": image,
          "url": `${siteUrl}/vehicles/${vehicle.slug}`,
        },
      };
    }),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  image: string;
  slug: string;
  category: string;
}

export function generateServiceSchema(service: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.category,
    "name": service.name,
    "description": service.description,
    "image": service.image,
    "url": `${siteUrl}/services/${service.slug}`,
    "provider": {
      "@type": "TravelAgency",
      "name": "Green World Holidays",
      "image": `${siteUrl}/logo.png`
    }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export interface PackageSchemaInput {
  name: string;
  description: string;
  image: string;
  slug: string;
  touristType?: string[];
}

export function generatePackageSchema(tourPackage: PackageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tourPackage.name,
    "description": tourPackage.description,
    "image": tourPackage.image,
    "url": `${siteUrl}/packages/${tourPackage.slug}`,
    "provider": {
      "@type": "TravelAgency",
      "name": "Green World Holidays",
      "image": `${siteUrl}/logo.png`
    },
    "touristType": tourPackage.touristType || ["Sightseeing", "Nature"]
  };
}
