const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'images');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createSvg = (title, subtitle, color1 = '#1C1612', color2 = '#C4A35A', symbol = 'ኪን') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
    <pattern id="tilet" width="60" height="20" patternUnits="userSpaceOnUse">
      <path d="M0 10 L15 0 L30 10 L45 0 L60 10 L45 20 L30 10 L15 20 Z" fill="none" stroke="#C4A35A" stroke-width="1" opacity="0.15"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#g)" />
  <rect width="800" height="600" fill="url(#grid)" />
  <rect width="800" height="600" fill="url(#tilet)" />

  <circle cx="400" cy="240" r="140" fill="none" stroke="${color2}" stroke-width="1.5" opacity="0.3" stroke-dasharray="8 4" />
  <circle cx="400" cy="240" r="100" fill="rgba(28,22,18,0.4)" stroke="${color2}" stroke-width="2" opacity="0.6" />
  
  <text x="400" y="260" font-family="Georgia, serif" font-size="72" fill="${color2}" text-anchor="middle" font-weight="bold" opacity="0.95">${symbol}</text>
  
  <rect x="150" y="420" width="500" height="110" rx="16" fill="rgba(28, 22, 18, 0.75)" stroke="rgba(196, 163, 90, 0.4)" stroke-width="1" />
  <text x="400" y="465" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="bold" fill="#F6F1E8" text-anchor="middle">${title}</text>
  <text x="400" y="500" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#C4A35A" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>
</svg>
`;

const assets = [
  // QR
  { path: 'qr/qr-code-placeholder.svg', title: 'KIN ETHIOPIA QR', sub: 'Scan to Connect', c1: '#1C1612', c2: '#C4A35A', sym: '፪0፪፮' },
  // Hero
  { path: 'hero/hero-bg.svg', title: 'Culture in Motion', sub: 'Ethiopian Cultural Ensemble', c1: '#1F3322', c2: '#7A3A36', sym: 'ኪን' },
  // Team
  { path: 'team/dawit.svg', title: 'Dawit Mengistu', sub: 'Artistic Director', c1: '#2F4A32', c2: '#C4A35A', sym: 'ዳ' },
  { path: 'team/selamawit.svg', title: 'Selamawit Worku', sub: 'Principal Krar & Voice', c1: '#7A3A36', c2: '#C4A35A', sym: 'ሰ' },
  { path: 'team/yared.svg', title: 'Yared Kebede', sub: 'Master Drummer', c1: '#1C1612', c2: '#C4A35A', sym: 'ያ' },
  { path: 'team/hiwot.svg', title: 'Hiwot Tadesse', sub: 'Lead Choreographer', c1: '#2F4A32', c2: '#8F4A45', sym: 'ህ' },
  { path: 'team/mekdes.svg', title: 'Mekdes Alemu', sub: 'Community Lead', c1: '#3A312A', c2: '#D4B56E', sym: 'መ' },
  { path: 'team/nahom.svg', title: 'Nahom Girma', sub: 'Aerialist & Rigger', c1: '#1F3322', c2: '#C4A35A', sym: 'ና' },
  { path: 'team/rahel.svg', title: 'Rahel Tesfaye', sub: 'Washint Arranger', c1: '#5E2C29', c2: '#C4A35A', sym: 'ራ' },
  { path: 'team/abesolom.svg', title: 'Abesolom Desta', sub: 'Traditional Arts', c1: '#261F1A', c2: '#C4A35A', sym: 'አ' },
  // Events
  { path: 'events/echoes.svg', title: 'Echoes of the Ridge', sub: 'National Theatre • Addis Ababa', c1: '#1F3322', c2: '#C4A35A', sym: '፩' },
  { path: 'events/buna.svg', title: 'Buna Rhythms', sub: 'Kin Pavilion • Entoto', c1: '#3A312A', c2: '#C4A35A', sym: '፪' },
  { path: 'events/youth.svg', title: 'Youth Open Rehearsal', sub: 'Training Studio • Addis Ababa', c1: '#7A3A36', c2: '#C4A35A', sym: '፫' },
  { path: 'events/retrospective.svg', title: 'Fire & Clay', sub: 'Lakefront Hall • Hawassa', c1: '#2F4A32', c2: '#D4B56E', sym: '፬' },
  { path: 'events/gondar.svg', title: 'Night Songs in Gondar', sub: 'Fasil Cultural Centre • Gondar', c1: '#1C1612', c2: '#8F4A45', sym: '፭' },
  // Blog
  { path: 'blog/kebero.svg', title: 'Geometry of the Kebero', sub: 'Music & Percussion', c1: '#2F4A32', c2: '#C4A35A', sym: 'ከ' },
  { path: 'blog/eskista.svg', title: 'Eskista in the Air', sub: 'Circus & Aerial Arts', c1: '#7A3A36', c2: '#C4A35A', sym: 'እ' },
  { path: 'blog/coffee.svg', title: 'Coffee Is a Rehearsal', sub: 'Ethiopian Heritage', c1: '#1C1612', c2: '#D4B56E', sym: 'ቡ' },
  { path: 'blog/studio.svg', title: 'Notes from Open Studio', sub: 'Community & Access', c1: '#3A312A', c2: '#C4A35A', sym: 'ል' },
  { path: 'blog/tour.svg', title: 'Why We Tour Slowly', sub: 'Behind the Scenes', c1: '#1F3322', c2: '#8F4A45', sym: 'ጉ' },
  // Announcements
  { path: 'announcements/fellowship.svg', title: 'Young Artist Fellowship', sub: '2026/27 Residency Application', c1: '#1F3322', c2: '#C4A35A', sym: 'ማ' },
  { path: 'announcements/workshop.svg', title: 'Entoto Weekend Workshops', sub: 'Free Community Sessions', c1: '#7A3A36', c2: '#C4A35A', sym: 'ት' },
  { path: 'announcements/instruments.svg', title: 'Call for Instrument Makers', sub: 'Craft Commission', c1: '#261F1A', c2: '#D4B56E', sym: 'እ' },
  // Gallery
  { path: 'gallery/circus-pyramid.svg', title: 'Human Pyramid', sub: 'Circus Performance', c1: '#1F3322', c2: '#C4A35A', sym: '፩' },
  { path: 'gallery/krar.svg', title: 'Krar Testing', sub: 'Music Residency', c1: '#7A3A36', c2: '#C4A35A', sym: '፪' },
  { path: 'gallery/coffee.svg', title: 'Buna Ceremony', sub: 'Culture & Heritage', c1: '#3A312A', c2: '#D4B56E', sym: '፫' },
  { path: 'gallery/youth.svg', title: 'Youth Circle', sub: 'Community Workshop', c1: '#2F4A32', c2: '#C4A35A', sym: '፬' },
  { path: 'gallery/aerial.svg', title: 'Straps Rigging', sub: 'Circus Acrobatics', c1: '#1C1612', c2: '#8F4A45', sym: '፭' },
  { path: 'gallery/night-stage.svg', title: 'Fasil Courtyard', sub: 'Cultural Events', c1: '#5E2C29', c2: '#C4A35A', sym: '፮' },
  { path: 'gallery/drums.svg', title: 'Kebero Rehearsal', sub: 'Music Ensemble', c1: '#2F4A32', c2: '#D4B56E', sym: '፯' },
  { path: 'gallery/crowd.svg', title: 'Open Studio Audience', sub: 'Community Gathering', c1: '#261F1A', c2: '#C4A35A', sym: '፰' }
];

assets.forEach((item) => {
  const fullPath = path.join(baseDir, item.path);
  ensureDir(path.dirname(fullPath));
  const content = createSvg(item.title, item.sub, item.c1, item.c2, item.sym);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Created ${item.path}`);
});
