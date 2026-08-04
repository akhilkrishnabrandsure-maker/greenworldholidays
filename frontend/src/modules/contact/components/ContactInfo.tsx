import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';

export function ContactInfo() {
  const { phone, whatsapp, email, address } = contactRepository.details;

  const cards = [
    {
      id: 'phone',
      icon: Phone,
      title: 'Call Us',
      description: 'Available 24 Hours',
      content: phone,
      actionText: 'Call Now',
      href: `tel:${phone.replace(/[^0-9+]/g, '')}`
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Instant Support',
      content: whatsapp,
      actionText: 'Chat Now',
      href: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email Us',
      description: 'Response within 1 hour',
      content: email,
      actionText: 'Send Email',
      href: `mailto:${email}`
    },
    {
      id: 'office',
      icon: MapPin,
      title: 'Office Address',
      description: 'Visit Our Office',
      content: `${address.line1}, ${address.state}`,
      actionText: 'Get Directions',
      href: contactRepository.map.openUrl
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FDFBF7] relative -mt-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target={card.id !== 'phone' && card.id !== 'email' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-emerald-50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                <card.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="font-playfair text-xl font-bold text-emerald-950 mb-2">
                {card.title}
              </h3>
              
              <p className="font-outfit text-gray-500 text-sm mb-4">
                {card.description}
              </p>
              
              <p className="font-outfit text-emerald-800 font-medium text-base mb-8 flex-grow">
                {card.content}
              </p>
              
              <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700 transition-colors">
                <span>{card.actionText}</span>
                <div className="w-6 h-px bg-emerald-300 mx-3 group-hover:w-10 transition-all duration-300"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
