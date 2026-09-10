import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually without dotenv package
let MONGODB_URI = 'mongodb://127.0.0.1:27017/kin_ethiopia';
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match && match[1].trim()) {
      MONGODB_URI = match[1].trim();
    }
  }
} catch (e) {
  // Use default fallback
}

const mockTeamMembers = [
  {
    slug: 'dawit-mengistu',
    name: 'Dawit Mengistu',
    amharicName: 'ዳዊት መንግስቱ',
    role: 'Artistic Director',
    discipline: 'Circus',
    bio: "Dawit directs the company's physical theatre language, building aerial sequences that sit inside Ethiopian storytelling rather than on top of it. He trained in Addis Ababa and later studied ensemble circus direction in Europe before returning to form the Kin rehearsal method.",
    photoUrl: '/images/team/dawit.svg',
    skills: ['Aerial direction', 'Ensemble composition', 'Rehearsal pedagogy'],
    socialLinks: { instagram: '#' },
    featured: true,
  },
  {
    slug: 'selamawit-worku',
    name: 'Selamawit Worku',
    amharicName: 'ሰላማዊት ወርቁ',
    role: 'Principal Krar & Voice',
    discipline: 'Music',
    bio: "Selamawit grew up around Azmari houses in Gondar and now writes arrangements that keep Tizita phrasing intact while making space for contemporary staging. She leads the company's evening music residencies.",
    photoUrl: '/images/team/selamawit.svg',
    skills: ['Krar', 'Vocal arrangement', 'Tizita repertoire'],
    socialLinks: { instagram: '#' },
    featured: true,
  },
  {
    slug: 'yared-kebede',
    name: 'Yared Kebede',
    amharicName: 'ያሬድ ከበደ',
    role: 'Master Drummer',
    discipline: 'Music',
    bio: 'Yared maps ceremonial kebero patterns from Tigray, Wollo, and Sidama into scores that circus artists can physically count. He also mentors weekend youth percussion circles in Entoto.',
    photoUrl: '/images/team/yared.svg',
    skills: ['Kebero', 'Polyrhythm', 'Youth teaching'],
    featured: true,
  },
  {
    slug: 'hiwot-tadesse',
    name: 'Hiwot Tadesse',
    amharicName: 'ህይወት ታደሰ',
    role: 'Lead Choreographer',
    discipline: 'Dance',
    bio: 'Hiwot studies Eskista as a technical system: shoulder micro-timing, breath, and weight. She translates that vocabulary onto floorwork and, with Dawit, onto aerial apparatus without flattening the original form.',
    photoUrl: '/images/team/hiwot.svg',
    skills: ['Eskista', 'Contemporary floorwork', 'Stage composition'],
    featured: true,
  },
  {
    slug: 'mekdes-alemu',
    name: 'Mekdes Alemu',
    amharicName: 'መቅደስ አለሙ',
    role: 'Community Programmes Lead',
    discipline: 'Community',
    bio: "Mekdes designs Kin's open workshops, school visits, and fellowship logistics. She previously coordinated cultural education programmes in Hawassa and believes rehearsal rooms should remain public enough for young artists to walk in.",
    photoUrl: '/images/team/mekdes.svg',
    skills: ['Programme design', 'Partnerships', 'Access'],
    featured: true,
  },
  {
    slug: 'nahom-girma',
    name: 'Nahom Girma',
    amharicName: 'ናሆም ግርማ',
    role: 'Aerialist & Rigger',
    discipline: 'Circus',
    bio: "Nahom is the company's lead rigger and a specialist in straps. His work is quiet and precise: load calculations, rescue plans, and the kind of trust that lets a phrase happen twelve metres above the floor.",
    photoUrl: '/images/team/nahom.svg',
    skills: ['Straps', 'Rigging', 'Safety direction'],
    featured: false,
  },
  {
    slug: 'rahel-tesfaye',
    name: 'Rahel Tesfaye',
    amharicName: 'ራሄል ተስፋዬ',
    role: 'Washint & Wind Arranger',
    discipline: 'Music',
    bio: 'Rahel writes wind lines that sit between ceremony and theatre. She treats the washint as a lead voice, not a decorative colour, and often opens the coffee sanctuary evenings.',
    photoUrl: '/images/team/rahel.svg',
    skills: ['Washint', 'Ensemble writing', 'Improvisation'],
    featured: false,
  },
  {
    slug: 'abesolom-desta',
    name: 'Abesolom Desta',
    amharicName: 'አበሶሎም ደስታ',
    role: 'Traditional Arts Coordinator',
    discipline: 'Traditional Arts',
    bio: 'Abesolom works with weavers, coffee ceremony hosts, and instrument makers so that Kin stages do not treat craft as scenery. He documents process and invites makers into rehearsal.',
    photoUrl: '/images/team/abesolom.svg',
    skills: ['Craft liaison', 'Documentation', 'Ceremony staging'],
    featured: false,
  },
];

const mockEvents = [
  {
    slug: 'echoes-of-the-ridge',
    title: 'Echoes of the Ridge',
    amharicTitle: 'የደጋው ንቅናቄ',
    date: new Date('2026-10-18T18:30:00+03:00'),
    time: '18:30–21:30 EAT',
    location: 'Addis Ababa',
    venue: 'National Theatre Main Hall',
    category: 'Circus',
    description:
      'An evening-length work about highland trade routes told through human pyramids, masinko underscoring, and aerial phrases that follow the contour of a ridge line. The company performs with a live percussion quartet.',
    imageUrl: '/images/events/echoes.svg',
    performers: ['Kin Performance Ensemble', 'Selamawit Worku', 'Addis Kebero Quartet'],
    status: 'upcoming',
    ticketUrl: '#',
  },
  {
    slug: 'buna-rhythms-night',
    title: 'Buna Rhythms',
    amharicTitle: 'የቡና ዜማ',
    date: new Date('2026-11-05T17:00:00+03:00'),
    time: '17:00–20:30 EAT',
    location: 'Addis Ababa',
    venue: 'Kin Pavilion, Entoto',
    category: 'Traditional Arts',
    description:
      'A seated coffee sanctuary with live washint and krar, frankincense, and short stories between roasts. Capacity is limited so the room can stay conversational rather than theatrical.',
    imageUrl: '/images/events/buna.svg',
    performers: ['Rahel Tesfaye', 'Yared Kebede', 'Kin hosts'],
    status: 'upcoming',
    ticketUrl: '#',
  },
  {
    slug: 'youth-open-rehearsal',
    title: 'Youth Open Rehearsal',
    amharicTitle: 'ክፍት ልምምድ',
    date: new Date('2026-09-26T10:00:00+03:00'),
    time: '10:00–13:00 EAT',
    location: 'Addis Ababa',
    venue: 'Kin Training Studio',
    category: 'Community',
    description:
      'Families are invited to watch a working rehearsal and then join a short floor-tumbling and kebero session. No prior training is required. Soft-soled shoes recommended.',
    imageUrl: '/images/events/youth.svg',
    performers: ['Mekdes Alemu', 'Nahom Girma'],
    status: 'upcoming',
  },
  {
    slug: 'fire-and-clay',
    title: 'Fire & Clay',
    amharicTitle: 'እሳት እና ሸክላ',
    date: new Date('2025-12-12T19:00:00+03:00'),
    time: '19:00 EAT',
    location: 'Hawassa',
    venue: 'Lakefront Cultural Hall',
    category: 'Cultural Events',
    description:
      'A 2025 company gathering on the lakeshore with hoop aerials, southern percussion, and a closing coffee circle. This archive page remains as a record of the evening.',
    imageUrl: '/images/events/retrospective.svg',
    performers: ['Full Kin Company'],
    status: 'past',
  },
  {
    slug: 'gondar-night-songs',
    title: 'Night Songs in Gondar',
    amharicTitle: 'የጎንደር ሌሊት',
    date: new Date('2025-08-22T19:30:00+03:00'),
    time: '19:30 EAT',
    location: 'Gondar',
    venue: 'Fasil Cultural Centre',
    category: 'Music',
    description:
      'An outdoor programme of Azmari-informed song with restrained circus interludes. Recorded for the company archive; a written reflection appears in the journal.',
    imageUrl: '/images/events/gondar.svg',
    performers: ['Selamawit Worku', 'Rahel Tesfaye'],
    status: 'past',
  },
];

const mockBlogPosts = [
  {
    slug: 'geometry-of-the-kebero',
    title: 'The Geometry of the Kebero',
    amharicTitle: 'የከበሮ ምት',
    excerpt:
      'How a dual-headed drum teaches balance to acrobats, and why tempo is the wrong word for ceremonial time.',
    content: `The kebero is two rooms sharing one body. The larger head holds a long, warm tone. The smaller head answers with a dry slap. Players move between those rooms the way a good ensemble moves between earth and air.

In Kin rehearsals we do not treat percussion as a metronome glued under circus. The body has to understand rebound. When Yared plays a Wollo pattern, the aerialists count the hide, not a click track. A delayed second strike changes how a pyramid unloads. A rushed slap makes a strap phrase look anxious.

This is why we invite musicians into the studio from week one. Costume, lighting, and flying can wait. The first agreement is time: who holds it, who answers it, and when the room is allowed to breathe.`,
    featuredImage: '/images/blog/kebero.svg',
    author: { name: 'Yared Kebede', role: 'Master Drummer' },
    category: 'Music',
    tags: ['Percussion', 'Rehearsal', 'Kebero'],
    publishedAt: new Date('2026-08-20'),
    readingTime: '5 min read',
    featured: true,
  },
  {
    slug: 'eskista-in-the-air',
    title: 'Eskista in the Air',
    excerpt:
      'Shoulder isolations were never meant for silk. Translating them upward without turning them into decoration.',
    content: `Eskista lives in the torso. The floor gives the dancer a place to send force. Silk gives almost none. If you copy the steps twelve metres up, you get a souvenir of dance, not dance.

Hiwot's current research is smaller: which micro-isolations survive when the pelvis cannot plant. The answer so far is breath, neck, and the timing of a delayed shoulder. Nahom then builds a strap phrase that can host those timings rather than fight them.

We show this work in progress because cultural movement on circus apparatus is easy to fake and hard to do well. The company would rather be precise than spectacular.`,
    featuredImage: '/images/blog/eskista.svg',
    author: { name: 'Hiwot Tadesse', role: 'Lead Choreographer' },
    category: 'Circus',
    tags: ['Dance', 'Aerial', 'Research'],
    publishedAt: new Date('2026-07-14'),
    readingTime: '6 min read',
  },
  {
    slug: 'coffee-as-rehearsal',
    title: 'Coffee Is a Rehearsal',
    excerpt:
      'Why the company treats the jebena as a staging problem, not a hospitality extra.',
    content: `A coffee ceremony already has dramaturgy: fire, waiting, three rounds, talk. If a theatre company adds it as interval flavour, the form collapses into scent.

Abesolom and the hosts now rehearse Buna Rhythms the way we rehearse aerials. Who carries the tray. When frankincense enters. How long the room stays quiet after the first pour. Rahel's washint line is written to those intervals, not over them.

Guests often say the evening feels unhurried. That is the point. Heritage work is not faster when it is amplified. It is clearer.`,
    featuredImage: '/images/blog/coffee.svg',
    author: { name: 'Abesolom Desta', role: 'Traditional Arts Coordinator' },
    category: 'Ethiopian Heritage',
    tags: ['Coffee', 'Ceremony', 'Staging'],
    publishedAt: new Date('2026-06-02'),
    readingTime: '4 min read',
  },
];

const mockAnnouncements = [
  {
    slug: 'young-artist-fellowship',
    title: '2026/27 Young Artist Fellowship is open',
    publishedAt: new Date('2026-09-01'),
    category: 'Auditions',
    excerpt:
      'A twelve-month residency for acrobats, traditional instrumentalists, and physical actors based in Ethiopia.',
    content:
      'Kin Ethiopia invites applications from artists aged 18–28. The fellowship includes housing support in Addis Ababa, daily training, injury-prevention sessions, and a place in the 2027 city season. Applicants should prepare a two-minute work sample and a short letter describing what they want to learn, not a list of prizes. Deadline: 20 October 2026. Email fellowship@kinethiopia.org with the subject line Fellowship 2027.',
    imageUrl: '/images/announcements/fellowship.svg',
    featured: true,
  },
  {
    slug: 'entoto-weekend-workshops',
    title: 'Weekend workshops continue in Entoto',
    publishedAt: new Date('2026-08-28'),
    category: 'Workshops',
    excerpt: 'Free Saturday sessions in percussion, washint, and floor tumbling for young people.',
    content:
      "On the first and third Saturday of each month, principal artists host open workshops at the Kin Pavilion. Sessions run 10:00–12:30. Bring water. Instruments are provided. Parents may wait in the courtyard. No registration is required for the first visit; return students should add their name to Mekdes's list.",
    imageUrl: '/images/announcements/workshop.svg',
  },
];

const mockGallery = [
  {
    imageUrl: '/images/gallery/circus-pyramid.svg',
    alt: 'Three-tier human pyramid in rehearsal',
    caption: 'Pyramid phrase during ridge-cycle rehearsal',
    category: 'Circus',
    location: 'Addis Ababa',
    uploadedAt: new Date('2026-08-01'),
  },
  {
    imageUrl: '/images/gallery/krar.svg',
    alt: 'Krar player in low studio light',
    caption: 'Selamawit testing a new ten-string setup',
    category: 'Music',
    location: 'Gondar residency',
    uploadedAt: new Date('2026-07-12'),
  },
  {
    imageUrl: '/images/gallery/coffee.svg',
    alt: 'Jebena on charcoal with smoke',
    caption: 'Morning roast before Buna Rhythms',
    category: 'Culture',
    location: 'Entoto Pavilion',
    uploadedAt: new Date('2026-06-20'),
  },
];

async function seed() {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    const db = mongoose.connection.db;

    // Clear existing collections
    await db.collection('teammembers').deleteMany({});
    await db.collection('events').deleteMany({});
    await db.collection('blogposts').deleteMany({});
    await db.collection('announcements').deleteMany({});
    await db.collection('galleryimages').deleteMany({});

    // Insert mock data
    await db.collection('teammembers').insertMany(mockTeamMembers);
    await db.collection('events').insertMany(mockEvents);
    await db.collection('blogposts').insertMany(mockBlogPosts);
    await db.collection('announcements').insertMany(mockAnnouncements);
    await db.collection('galleryimages').insertMany(mockGallery);

    console.log('Database seeded successfully with initial data!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
