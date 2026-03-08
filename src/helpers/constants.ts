import type { Service } from '@/types/service';
import type { Testimonial } from '@/types/testimonial';
import type { GalleryItem } from '@/types/gallery';
import type { PricingTier } from '@/types/pricing';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
] as const;

export const STATS = [
  { key: 'carsWrapped', value: 1200, label: 'Cars Wrapped', suffix: '+' },
  { key: 'yearsExperience', value: 8, label: 'Years Experience', suffix: '+' },
  { key: 'happyClients', value: 98, label: 'Happy Clients', suffix: '%' },
  { key: 'wrapMaterials', value: 15, label: 'Wrap Materials', suffix: '+' },
] as const;

export const SERVICES: Service[] = [
  {
    id: 'full-wrap',
    title: 'Full Car Wraps',
    description:
      'Complete vehicle transformation with precision-cut vinyl that hugs every contour of your car for a factory-fresh look.',
    icon: 'car',
    features: [
      'Full exterior coverage',
      'Any color or finish',
      '5-year warranty',
      'Professional installation',
      'Surface prep included',
    ],
    startingPrice: 2500,
    popular: false,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
  },
  {
    id: 'color-change',
    title: 'Color Change Wraps',
    description:
      'Dramatically change your vehicle color without permanent paint. From matte black to chrome, your vision realized.',
    icon: 'palette',
    features: [
      'Satin, matte & gloss finishes',
      'Chrome & metallic options',
      'Fully reversible',
      'OEM color matching',
      'Custom blends available',
    ],
    startingPrice: 2200,
    popular: true,
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80',
  },
  {
    id: 'partial-wrap',
    title: 'Partial Wraps',
    description:
      'Accent panels, hood wraps, or roof wraps — add style and protection without wrapping the entire vehicle.',
    icon: 'layers',
    features: [
      'Hood, roof, mirrors',
      'Racing stripes',
      'Custom accent panels',
      'Budget-friendly',
      'Fast turnaround',
    ],
    startingPrice: 400,
    popular: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'commercial',
    title: 'Commercial Branding',
    description:
      'Turn your fleet into moving billboards. High-impact commercial wraps designed for maximum brand visibility.',
    icon: 'truck',
    features: [
      'Custom design service',
      'Fleet discounts',
      'Contour-cut graphics',
      'UV-resistant inks',
      'Fast fleet turnaround',
    ],
    startingPrice: 800,
    popular: false,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80',
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    description:
      'Invisible armor for your paintwork. PPF guards against stone chips, scratches, and UV damage.',
    icon: 'shield',
    features: [
      'Self-healing technology',
      'Crystal clear finish',
      '10-year warranty',
      'Anti-yellowing formula',
      'Hydrophobic coating',
    ],
    startingPrice: 1500,
    popular: false,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Reynolds',
    role: 'Supercar Enthusiast',
    rating: 5,
    text: 'WrapX transformed my Ferrari with a stunning satin midnight blue wrap. The attention to detail is second to none — not a single bubble or seam visible. Absolute perfection.',
    vehicleType: 'Ferrari 488 GTB',
    date: '2024-11-15',
  },
  {
    id: '2',
    name: 'Sophia Chen',
    role: 'Business Owner',
    rating: 5,
    text: 'Had our entire 12-van fleet wrapped in under a week. The branding came out exactly as designed, and the quality is exceptional. We\'ve already seen increased brand awareness on the road.',
    vehicleType: 'Mercedes Sprinter Fleet',
    date: '2024-10-22',
  },
  {
    id: '3',
    name: 'Jake Morrison',
    role: 'Car Enthusiast',
    rating: 5,
    text: 'The matte black wrap on my BMW M3 is absolutely flawless. The team was professional, the job was done on time, and the finish looks even better than factory paint. Highly recommend!',
    vehicleType: 'BMW M3 Competition',
    date: '2024-09-08',
  },
  {
    id: '4',
    name: 'Elena Vasquez',
    role: 'Content Creator',
    rating: 5,
    text: 'My pink chrome wrap has literally stopped traffic. WrapX nailed the concept from my mood board perfectly. The installers treat every car like it\'s their own masterpiece.',
    vehicleType: 'Lamborghini Huracán',
    date: '2024-12-01',
  },
  {
    id: '5',
    name: 'David Park',
    role: 'Fleet Manager',
    rating: 4,
    text: 'Reliable, professional, and great value for the quality. Our delivery vans look incredible with the new branding wrap. The PPF on the front ends has already saved us from several stone chip incidents.',
    vehicleType: 'Transit Custom Fleet',
    date: '2024-11-28',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Matte Black Assassin',
    category: 'color-change',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
    vehicle: 'Porsche 911 Turbo S',
    color: 'Matte Black',
    tags: ['matte', 'black', 'porsche'],
  },
  {
    id: '2',
    title: 'Midnight Blue Chrome',
    category: 'full-wrap',
    imageUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&q=80',
    vehicle: 'Ferrari 488',
    color: 'Chrome Blue',
    tags: ['chrome', 'blue', 'ferrari'],
  },
  {
    id: '3',
    title: 'Urban Camo Fleet',
    category: 'commercial',
    imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80',
    vehicle: 'Mercedes Sprinter',
    tags: ['commercial', 'fleet', 'branding'],
  },
  {
    id: '4',
    title: 'Ghost PPF Shield',
    category: 'ppf',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    vehicle: 'Lamborghini Urus',
    tags: ['ppf', 'protection', 'invisible'],
  },
  {
    id: '5',
    title: 'Satin Crimson',
    category: 'color-change',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    vehicle: 'BMW M4 Competition',
    color: 'Satin Red',
    tags: ['satin', 'red', 'bmw'],
  },
  {
    id: '6',
    title: 'Racing Stripes Edition',
    category: 'partial',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    vehicle: 'Ford Mustang GT500',
    tags: ['stripes', 'partial', 'mustang'],
  },
  {
    id: '7',
    title: 'Galaxy Shift',
    category: 'full-wrap',
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    vehicle: 'McLaren 720S',
    color: 'Color Shift',
    tags: ['colorshift', 'mclaren', 'premium'],
  },
  {
    id: '8',
    title: 'Corporate Identity',
    category: 'commercial',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    vehicle: 'VW Transporter',
    tags: ['commercial', 'corporate', 'branding'],
  },
  {
    id: '9',
    title: 'Brushed Titanium',
    category: 'color-change',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
    vehicle: 'Audi RS6',
    color: 'Brushed Titanium',
    tags: ['brushed', 'metallic', 'audi'],
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for accents & partial coverage',
    price: 599,
    priceNote: 'starting from',
    popular: false,
    color: 'default',
    cta: 'Get a Quote',
    features: [
      { label: 'Hood or roof wrap', included: true },
      { label: 'Mirror caps', included: true },
      { label: 'Racing stripes', included: true },
      { label: 'Surface prep', included: true },
      { label: 'Full exterior coverage', included: false },
      { label: 'Custom design', included: false },
      { label: 'PPF add-on', included: false },
      { label: 'Extended warranty', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Full transformation, professional finish',
    price: 2499,
    priceNote: 'starting from',
    popular: true,
    color: 'neon',
    cta: 'Book Now',
    features: [
      { label: 'Full exterior wrap', included: true },
      { label: 'All panel coverage', included: true },
      { label: 'Color change', included: true },
      { label: 'Surface prep & decontamination', included: true },
      { label: '3-year warranty', included: true },
      { label: 'Custom design consultation', included: true },
      { label: 'PPF add-on', included: false },
      { label: '5-year extended warranty', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'The ultimate vehicle transformation',
    price: 4999,
    priceNote: 'starting from',
    popular: false,
    color: 'gold',
    cta: 'Book Elite',
    features: [
      { label: 'Full exterior wrap', included: true },
      { label: 'PPF on high-impact zones', included: true },
      { label: 'Custom design by our artists', included: true },
      { label: 'Chrome & specialty finishes', included: true },
      { label: '5-year warranty', included: true },
      { label: 'Interior accents', included: true },
      { label: 'Ceramic coating option', included: true },
      { label: 'Priority scheduling', included: true },
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Martin',
    role: 'Founder & Master Installer',
    bio: 'The passion and precision behind every wrap at Martin Wrap Studio. Certified by 3M, Avery Dennison & XPEL — dedicated to flawless results on every vehicle.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
];
