import React from 'react';
import { Metadata } from 'next';
import { ContactPage } from '@/modules/contact/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Green World Holidays for your Kerala travel needs. We are available 24/7 via WhatsApp, Phone, and Email.',
  alternates: {
    canonical: 'https://greenworldholidays.com/contact',
  },
  openGraph: {
    title: 'Contact Green World Holidays | Kerala Travel Experts',
    description: 'Get in touch with Green World Holidays for your Kerala travel needs. We are available 24/7 via WhatsApp, Phone, and Email.',
    url: 'https://greenworldholidays.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Green World Holidays',
    description: 'Get in touch with Green World Holidays for your Kerala travel needs.',
  }
};

export default function ContactRoute() {
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
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Malayalam', 'Hindi']
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://greenworldholidays.com/#localbusiness',
        name: 'Green World Holidays & Car Rentals',
        image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556508/houseboat_pvwt7k.jpg',
        telephone: '+91-8075438808',
        email: 'greenworldholidays@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ernakulam',
          addressLocality: 'Kochi',
          addressRegion: 'Kerala',
          postalCode: '682011',
          addressCountry: 'IN'
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
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
            name: 'Contact Us',
            item: 'https://greenworldholidays.com/contact'
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
      <ContactPage />
    </>
  );
}
