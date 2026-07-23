import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'Green World Holidays exceeded all my expectations! The Munnar tour was absolutely magical, and the car rental service made exploring the hills so convenient. Perfect blend of nature and comfort!',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      text: 'Amazing service! Booked a trip to Athirapally Waterfalls with their car rental—smooth and hassle-free. The vehicle was spotless and the itinerary perfectly organized. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      text: 'From booking to the final goodbye, everything was perfect. The Kovalam Beach trip was relaxing and scenic, and the reliable rental car made exploring stress-free and seamless.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who've experienced the magic of sustainable travel with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Quote className="h-10 w-10 text-emerald-600 mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;