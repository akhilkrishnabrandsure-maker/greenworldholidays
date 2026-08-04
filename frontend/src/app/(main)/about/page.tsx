import React from 'react';
import { Metadata } from 'next';
import { AboutPage } from '@/modules/about/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Green World Holidays, your trusted luxury travel partner in Kerala. Read our story, mission, and meet our founder.',
  alternates: {
    canonical: 'https://greenworldholidays.com/about',
  },
  openGraph: {
    title: 'About Green World Holidays | Luxury Kerala Travel',
    description: 'Learn about Green World Holidays, your trusted luxury travel partner in Kerala. Read our story, mission, and meet our founder.',
    url: 'https://greenworldholidays.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Green World Holidays',
    description: 'Learn about Green World Holidays, your trusted luxury travel partner in Kerala.',
  }
};

export default function AboutRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://greenworldholidays.com/#organization',
        name: 'Green World Holidays',
        url: 'https://greenworldholidays.com',
        logo: 'https://greenworldholidays.com/logo.png',
        sameAs: [
          'https://facebook.com/greenworldholidays',
          'https://instagram.com/greenworldholidays'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-8075438808',
          contactType: 'customer service'
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://greenworldholidays.com/#localbusiness',
        name: 'Green World Holidays & Car Rentals',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556518/Jayan_dliyhn.jpg',
        telephone: '+91-8075438808',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://greenworldholidays.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: 'https://greenworldholidays.com/about'
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
}
