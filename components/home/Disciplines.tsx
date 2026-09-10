'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { KeberoDrumIcon, JebenaIcon } from '@/components/ui/CulturalMotifs';
import { Sparkles, Users, HeartHandshake, Award } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export const Disciplines: React.FC = () => {
  const { language } = useLanguage();

  const DISCIPLINES = [
    {
      title: language === 'am' ? 'ሰርከስ' : 'Circus',
      amharicTitle: 'ሰርከስ',
      description:
        language === 'am'
          ? 'ከጥንታዊ የኢትዮጵያ ታሪኮች ጋር የተቀናጀ የአየር አክሮባቲክስ፣ ሚዛን መጠበቅና የእሳት ትይንት።'
          : 'Breathtaking aerial acrobatics, balancing sculptures, and fire routines fused with ancient Ethiopian folklore.',
      icon: <Sparkles className="w-7 h-7 text-kin-gold" />,
    },
    {
      title: language === 'am' ? 'ሙዚቃ' : 'Music',
      amharicTitle: 'ሙዚቃ',
      description:
        language === 'am'
          ? 'በከበሮ፣ በክራርና በበገና ምቶች የተቃኘ የአዝማሪ ባህላዊ የዜማ ጥበብ።'
          : 'Polyrhythmic Kebero percussion, pentatonic Krar and Masinko cadences rooted in Azmari improvisations.',
      icon: <KeberoDrumIcon className="w-7 h-7 text-kin-gold" />,
    },
    {
      title: language === 'am' ? 'ውዝዋዜ' : 'Dance',
      amharicTitle: 'ውዝዋዜ',
      description:
        language === 'am'
          ? 'የሰሜን እስክስታ፣ የጉራጌ፣ የኦሮሞ እና የደቡብ ብሔረሰቦች ባህላዊ ውዝዋዜዎች ጥበብ።'
          : 'Mastery of regional dance styles including northern Eskista, Gurage leg syncopation, and Oromo movement.',
      icon: <Award className="w-7 h-7 text-kin-gold" />,
    },
    {
      title: language === 'am' ? 'ባህላዊ ጥበባት' : 'Traditional Arts',
      amharicTitle: 'ባህላዊ ጥበባት',
      description:
        language === 'am'
          ? 'የቡና ሥርዓት፣ የመሶብ ሥራና የባህላዊ አልባሳት ጥበብን መጠበቅና ማሳደግ።'
          : 'Preserving ceremonial coffee roasting (Buna), sacred basket weaving (Mesob), and living textile crafts.',
      icon: <JebenaIcon className="w-7 h-7 text-kin-gold" />,
    },
    {
      title: language === 'am' ? 'ባህላዊ ዝግጅቶች' : 'Cultural Events',
      amharicTitle: 'ባህላዊ ዝግጅቶች',
      description:
        language === 'am'
          ? 'ብሔራዊ የባህል ፌስቲቫሎችን፣ የቲያትርና የሙዚቃ ትይንቶችን ማዘጋጀት።'
          : 'Curating memorable national festivals, high-impact cultural dinners, and international theatrical tours.',
      icon: <Users className="w-7 h-7 text-kin-gold" />,
    },
    {
      title: language === 'am' ? 'ማኅበረሰብ' : 'Community',
      amharicTitle: 'ማኅበረሰብ',
      description:
        language === 'am'
          ? 'ለወጣቶች በነጻ የአክሮባቲክስና የሙዚቃ ስልጠናዎችን በመስጠት አቅምን መገንባት።'
          : 'Empowering youth through free acrobatic training, instrument craftsmanship workshops, and artist mentorship.',
      icon: <HeartHandshake className="w-7 h-7 text-kin-gold" />,
    },
  ];

  return (
    <section id="disciplines" className="py-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          geez="፪"
          tag={language === 'am' ? 'የጥበብ ዘርፎች' : 'Disciplines of Expression'}
          title={language === 'am' ? 'እንቅስቃሴና ባህል የሚገናኙበት' : 'Where Movement Meets Heritage'}
          subtitle={
            language === 'am'
              ? 'ቡድናችን ባህላዊ የኢትዮጵያ ባለሙያዎችንና ዘመናዊ አርቲስቶችን በስድስት ዋና ዋና ዘርፎች ያገናኛል።'
              : 'Our collective unites traditional Ethiopian masters with innovative performers across six primary cultural frontiers.'
          }
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {DISCIPLINES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-kin-coffee-card rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all border-2 border-stone-300 dark:border-kin-coffee-border group relative overflow-hidden cursor-pointer"
            >
              {/* Accent border on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-kin-green via-kin-gold to-kin-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-kin-coffee/5 dark:bg-kin-coffee-elevated flex items-center justify-center group-hover:bg-kin-green/10 transition-colors border border-kin-gold/20">
                  {item.icon}
                </div>
                <span className="font-geez text-sm font-bold text-kin-gold dark:text-kin-gold">
                  {['፩', '፪', '፫', '፬', '፭', '፮'][idx]}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-extrabold text-stone-950 dark:text-white mb-3 group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors">
                {item.title}
              </h3>

              <p className="text-stone-900 dark:text-stone-300 text-sm font-medium leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smooth Section Bottom Gradient Fade Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent to-kin-coffee/20 dark:to-kin-coffee-dark pointer-events-none mt-16" />
    </section>
  );
};