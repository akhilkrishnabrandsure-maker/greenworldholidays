'use client';

import React, { useState } from 'react';
import { Send, Phone, Calendar, Users, MapPin, Package, MessageSquare, Loader2 } from 'lucide-react';
import { contactRepository } from '../repository/contact.repository';
import { saveEnquiry } from '@/lib/leadService';
import { useToast } from '@/contexts/ToastProvider';

interface FormData {
  name: string;
  phone: string;
  email: string;
  destination: string;
  packageType: string;
  pickupLocation: string;
  travelDate: string;
  travellers: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    destination: '',
    packageType: '',
    pickupLocation: '',
    travelDate: '',
    travellers: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi Green World Holidays,\n\n`;
    if (formData.name) message += `My name is ${formData.name}.\n\n`;
    message += `I'm interested in:\n\n`;
    
    if (formData.packageType) message += `Package:\n${formData.packageType}\n\n`;
    if (formData.destination) message += `Destination:\n${formData.destination}\n\n`;
    if (formData.pickupLocation) message += `Pickup Location:\n${formData.pickupLocation}\n\n`;
    if (formData.travelDate) message += `Travel Date:\n${formData.travelDate}\n\n`;
    if (formData.travellers) message += `Travellers:\n${formData.travellers}\n\n`;
    if (formData.message) message += `Additional Message:\n${formData.message}\n\n`;
    
    message += `Please share the itinerary, pricing, and availability.\n\nThank you.`;
    return encodeURIComponent(message);
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Please fill in at least your Name and Phone number.", "error");
      return;
    }

    setIsSubmitting(true);

    const response = await saveEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination,
      package: formData.packageType,
      pickup: formData.pickupLocation,
      travelDate: formData.travelDate,
      travellers: formData.travellers,
      message: formData.message,
      source: 'Contact Page'
    });

    setIsSubmitting(false);

    if (response.success) {
      showToast("Enquiry saved successfully. Redirecting to WhatsApp...", "success");
      setSuccess(true);
      const { whatsapp } = contactRepository.details;
      const waUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`;
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', destination: '', packageType: '', pickupLocation: '', travelDate: '', travellers: '', message: '' });
      }, 1500);
    } else {
      showToast(response.message || "There was a problem submitting your enquiry.", "error");
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          
          {/* Left Text / Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
                Send a <span className="text-emerald-700">Travel Enquiry</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full mb-6" />
              <p className="font-outfit text-gray-600 text-lg leading-relaxed font-light">
                Provide us with some basic details about your upcoming trip, and our local Kerala travel experts will craft the perfect itinerary just for you.
              </p>
            </div>
            
            {/* Floating Call CTA within text column */}
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center flex-shrink-0 text-emerald-600">
                <Phone className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-outfit text-emerald-900 font-semibold mb-1">Prefer to talk directly?</p>
                <p className="text-sm text-emerald-700 mb-3 font-light">Our experts are ready to assist you.</p>
                <a 
                  href={`tel:${contactRepository.details.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-colors text-sm"
                >
                  Call {contactRepository.details.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-gray-100 relative">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[400px]">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-2">Enquiry Submitted!</h3>
                  <p className="text-gray-600">Redirecting you to WhatsApp...</p>
                </div>
              ) : (
                <fieldset disabled={isSubmitting} className="space-y-6 relative z-10 group">
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  {/* Travellers */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      Number of Travellers
                    </label>
                    <input
                      type="text"
                      name="travellers"
                      value={formData.travellers}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. 2 Adults, 1 Child"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Package Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-600" />
                      Package Type
                    </label>
                    <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Select a package type</option>
                      <option value="Honeymoon Package">Honeymoon Package</option>
                      <option value="Family Tour">Family Tour</option>
                      <option value="Houseboat Stay">Houseboat Stay</option>
                      <option value="Wildlife Tour">Wildlife Tour</option>
                      <option value="Car Rental Only">Car Rental Only</option>
                      <option value="Customized Package">Customized Package</option>
                    </select>
                  </div>
                  {/* Destination */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Primary Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. Munnar, Alleppey"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Travel Date
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                  {/* Pickup */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. Kochi Airport (COK)"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    Additional Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                    placeholder="Tell us about your preferences, required vehicle type, or specific hotels you have in mind..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send WhatsApp Enquiry</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Standard email submission is currently under maintenance. Please use WhatsApp for instant replies!")}
                    className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-colors duration-300"
                  >
                    Submit via Email
                  </button>
                </div>
                  </form>
                </fieldset>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
