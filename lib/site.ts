export const siteConfig = {
  name: 'KIN ETHIOPIA',
  nameAmharic: 'ኪን ኢትዮጵያ',
  tagline: 'Culture in Motion.',
  description:
    'KIN ETHIOPIA is a cultural performance collective in Addis Ababa working across circus, music, dance, traditional arts, and community programmes.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en',
  email: 'contact@kinethiopia.org',
  phone: '+251 91 447 2180',
  phoneSecondary: '+251 11 618 9044',
  address: {
    line1: 'Entoto Cultural Pavilion',
    line2: 'Yeka Sub-City, Addis Ababa, Ethiopia',
  },
  social: {
    instagram: '#',
    facebook: '#',
    whatsapp: '#',
    telegram: '#',
    youtube: '#',
    phone: 'tel:+251914472180',
  },
  qrCode: '/images/qr/qr-code-placeholder.png',
} as const;

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Announcements', href: '/announcements' },
  { name: 'Blog', href: '/blog' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
] as const;
