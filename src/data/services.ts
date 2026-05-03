export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'residential' | 'commercial' | 'specialized';
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Regular House Cleaning',
    description: 'Weekly or bi-weekly cleaning of all living areas, kitchen, and bathrooms.',
    price: 45,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf3b6fd3-1506-4ac1-ba4f-d83b984eaca0/hero-image-69a0d14f-1777792090509.webp',
    category: 'residential'
  },
  {
    id: '2',
    title: 'Deep Cleaning',
    description: 'Thorough cleaning including baseboards, inside windows, and hard-to-reach areas.',
    price: 120,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf3b6fd3-1506-4ac1-ba4f-d83b984eaca0/deep-cleaning-service-b3773839-1777792090535.webp',
    category: 'residential'
  },
  {
    id: '3',
    title: 'Laundry & Ironing',
    description: 'Professional washing, drying, and precise ironing of your garments.',
    price: 30,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf3b6fd3-1506-4ac1-ba4f-d83b984eaca0/laundry-service-4e59658c-1777792090201.webp',
    category: 'specialized'
  },
  {
    id: '4',
    title: 'Office Cleaning',
    description: 'Daily or weekly cleaning for small to medium sized office spaces.',
    price: 85,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf3b6fd3-1506-4ac1-ba4f-d83b984eaca0/office-cleaning-fb6b734f-1777792090534.webp',
    category: 'commercial'
  }
];

export interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  workerId?: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  totalPrice: number;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'worker';
  avatar?: string;
  verified?: boolean;
  rating?: number;
  earnings?: number;
}