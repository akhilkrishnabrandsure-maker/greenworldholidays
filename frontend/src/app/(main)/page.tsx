import HomePage from '@/modules/home/pages/HomePage';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Kerala Travel Packages | Green World Holidays',
  description: 'Plan your Kerala trip with Green World Holidays. Explore houseboats, backwaters, hill stations, and customized travel packages for an unforgettable journey.',
  url: '/',
  image: 'https://res.cloudinary.com/dyup8ivlh/image/upload/v1755231050/kathakali_img_ulaa3h.jpg'
});

export default function Page() {
  return <HomePage />;
}

