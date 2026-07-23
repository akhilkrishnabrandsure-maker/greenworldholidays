

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
    vehicle: '' // Added vehicle field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("oJwZEh0zMk_mw030U"); // You'll need to replace this with your actual EmailJS public key
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        to_email: 'greenworldholidays@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        message: formData.message,
        reply_to: formData.email,
        vehicle: formData.vehicle // Added vehicle to templateParams
      };

      await emailjs.send(
        'service_dkfyzrf', // EmailJS service ID
        'template_inl96lf', // EmailJS template ID
        templateParams
      );

      alert('Thank you for your inquiry! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', destination: '', message: '', vehicle: '' }); // Reset vehicle
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Soft Green Gradient Background (darker on top, lighter on bottom) */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-200 via-emerald-100 to-emerald-50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5"></div>
      {/* Decorative Blurred Circles (matching About) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Glassmorphism Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100/50 p-8 sm:p-12 lg:p-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Plan Your Next Adventure
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to embark on your sustainable travel journey? Get in touch with our expert team today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
              <div className="col-span-2 mb-10 lg:mb-0">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <p className="text-gray-600">+91 8075438808</p>
                      <p className="text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <p className="text-gray-600">greenworldholidays@gmail.com</p>
                      <p className="text-gray-600">Response within 1 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Visit Us</h4>
                      <p className="text-gray-600"> Kochi,Kerala, India</p>
                      <p className="text-gray-600">Kerala, India</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <img 
                    src="https://res.cloudinary.com/dyup8ivlh/image/upload/v1754556514/elephant_y9fwnq.jpg" 
                    alt="Contact us - Green World Holidays" 
                    className="rounded-lg shadow-lg w-full max-w-xs mx-auto"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-none mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                        Interested Destination
                      </label>
                      <select
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select a destination</option>
                        <option value="Munnar-Hill Station">Munnar-Hill Station</option>
                        <option value="Alappuzha-Backwaters &Houseboat">Alappuzha-Backwaters & Houseboat</option>
                        <option value="Kochi - Port City with Heritge">Kochi - Port City with Heritage</option>
                        <option value="Thekkady-Wildlife">Thekkady-Wildlife</option>
                        <option value="Athirapally-Waterfalls">Athirapally-Waterfalls</option>
                        <option value="Kovalam-Beach Paradise">Kovalam-Beach Paradise</option>
                        <option value="custom">Custom Request</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Vehicle
                    </label>
                    <select
                      id="vehicle"
                      name="vehicle"
                      value={formData.vehicle || ''}
                      onChange={handleChange}
                      className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select a vehicle</option>
                      <option value="Maruti Ertiga">Maruti Ertiga</option>
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                      <option value="Toyota Rumion">Toyota Rumion</option>
                      <option value="Maruti Invicto">Maruti Invicto</option>
                      <option value="Honda City">Honda City</option>
                      <option value="Urbania">Urbania</option>
                      <option value="Force Traveller">Force Traveller</option>
                      <option value="Scania Bus">Scania Bus</option>
                      <option value="Toyota Etios">Toyota Etios</option>
                      <option value="custom">Custom Request</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-w-[220px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Share your travel preferences, rental dates, group size, vehicle preferences, and any special requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 hover:transform hover:scale-105 duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;