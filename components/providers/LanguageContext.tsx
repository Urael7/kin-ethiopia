'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'am';

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', am: 'መነሻ' },
  'nav.about': { en: 'About Us', am: 'ስለ እኛ' },
  'nav.disciplines': { en: 'Disciplines', am: 'ዘርፎች' },
  'nav.events': { en: 'Events', am: 'ሁነቶች' },
  'nav.blog': { en: 'Blog', am: 'ብሎግ' },
  'nav.announcements': { en: 'Announcements', am: 'ማስታወቂያዎች' },
  'nav.contact': { en: 'Contact', am: 'እውቂያ' },
  'nav.getInvolved': { en: 'Get Involved', am: 'ተሳተፉ' },

  // Hero
  'hero.tag': { en: 'Premier Ethiopian Cultural & Circus Ensemble', am: 'የኢትዮጵያ መሪ የባህል እና ሰርከስ እንስምብል' },
  'hero.title': { en: 'Culture in Motion.', am: 'ባህል በእንቅስቃሴ::' },
  'hero.subtitle_highlight': { en: 'Rooted in Memory.', am: 'በትዝታ የተተከለ::' },
  'hero.description': {
    en: 'Kin Ethiopia unites acrobatic physical theatre, electrified Azmari traditions, ancient percussion, and living rituals into breathtaking cultural experiences.',
    am: 'ኪን ኢትዮጵያ የአክሮባቲክ ሰርከስ ቲያትርን፣ የአዝማሪ ባህልን፣ ጥንታዊ ከበሮዎችንና ሕያው ባህላዊ ሥርዓቶችን በማቀናጀት አዲስ ጥበባዊ ድምቀት ይፈጥራል።',
  },
  'hero.cta.events': { en: 'Explore Experiences', am: 'ሁነቶችን ይመልከቱ' },
  'hero.cta.story': { en: 'Discover Our Story', am: 'ታሪካችንን ይወቁ' },

  // About Page
  'about.journeyTag': { en: 'Our Journey & Heritage', am: 'ጉዟችን እና ቅርሳችን' },
  'about.mainHeading': {
    en: 'Preserving Ancestral Fire. Propelling Modern Movement.',
    am: 'የቀደምቶችን እሳት መጠበቅ። ዘመናዊ እንቅስቃሴን ማፋጠን።',
  },
  'about.storyBody': {
    en: 'Kin Ethiopia was founded on a singular conviction: that Ethiopia’s centuries-old performing traditions, from the Azmari poetry houses of Gondar to the ceremonial Kebero circles, are living, breathing languages that deserve modern stages and international reverence.',
    am: 'ኪን ኢትዮጵያ የተመሰረተው በአንድ ጽኑ እምነት ነው፡ ከጎንደር አዝማሪ ቤቶች እስከ ከበሮ ሥርዓቶች ያሉ የኢትዮጵያ ጥንታዊ የትይንት ባህሎች፣ በዘመናዊ መድረክና በዓለም አቀፍ ደረጃ ሊከበሩ የሚገባቸው ሕያው ቋንቋዎች ናቸው።',
  },
  'about.mission.title': { en: 'Our Mission', am: 'ተልእኳችን' },
  'about.mission.desc': {
    en: 'To nurture, document, and present Ethiopian traditional arts and circus theatre with uncompromising artistic integrity and world-class physical training.',
    am: 'የኢትዮጵያን ባህላዊ ጥበባት እና የሰርከስ ቲያትር በከፍተኛ ጥበባዊ ጥራትና በዓለም አቀፍ ደረጃ በማሰልጠን መንከባከብና ማቅረብ።',
  },
  'about.vision.title': { en: 'Our Vision', am: 'ራእያችን' },
  'about.vision.desc': {
    en: 'A thriving creative ecosystem where Ethiopian youth build global artistic careers while remaining anchored in their ancestral heritage.',
    am: 'የኢትዮጵያ ወጣቶች በባህላዊ ቅርሳቸው ላይ ተመስርተው ዓለም አቀፍ ጥበባዊ ስኬት የሚያስመዘግቡበት የበለፀገ የጥበብ ሥነ-ምህዳር ማነጽ።',
  },
  'about.philosophy.title': { en: 'Our Philosophy', am: 'ፍልስፍናችን' },
  'about.philosophy.desc': {
    en: 'We respect the root so the branch can reach higher. Tradition is not the worship of ashes, but the preservation of fire.',
    am: 'ቅርንጫፉ ወደ ላይ እንዲወጣ ስሩን እናከብራለን። ባህል የረገፈ አማድ ማምለክ ሳይሆን፣ ሕያው እሳትን መጠበቅ ነው።',
  },
  'about.ensemble.tag': { en: 'The Ensemble', am: 'ቡድኑ' },
  'about.ensemble.title': { en: 'Masters, Acrobats & Visionaries', am: 'ባለሙያዎች፣ አክሮባቶች እና ባለራእዮች' },
  'about.ensemble.subtitle': {
    en: 'Meet the artists, percussionists, and cultural directors who form the heart of Kin Ethiopia. Click any portrait to view full profile & photo.',
    am: 'የኪን ኢትዮጵያ ልብ የሆኑትን አርቲስቶች፣ ከበሮ መቺዎችና የባህል ዳይሬክተሮችን ይወቁ። ፎቶውን ወይም ስሙን በመንካት ሙሉ መረጃቸውን ይመልከቱ።',
  },

  // Team Directory
  'team.clickHint': { en: 'Click to view picture & biography', am: 'ምስሉንና ታሪካቸውን ለማየት ይጫኑ' },
  'team.closeProfile': { en: 'Close Profile', am: 'ዝርዝር ዝጋ' },
  'team.expertise': { en: 'Expertise & Repertoire', am: 'ሙያና ጥበብ' },

  // Footer
  'footer.explore': { en: 'Explore', am: 'ያስሱ' },
  'footer.connect': { en: 'Connect', am: 'ተገናኙ' },
  'footer.verify': { en: 'Verify / Support', am: 'ይደግፉን' },
  'footer.philosophy': { en: 'Our Philosophy', am: 'ፍልስፍናችን' },
  'footer.experiences': { en: 'Experiences & Tours', am: 'ሁነቶችና ዝግጅቶች' },
  'footer.journal': { en: 'Cultural Journal', am: 'የባህል መጽሔት' },
  'footer.auditions': { en: 'Auditions & Grants', am: 'መልመጃዎችና ድጋፎች' },
  'footer.partner': { en: 'Partner With Us', am: 'አብረውን ይስሩ' },
  'footer.rights': { en: '© 2026 KIN ETHIOPIA. All rights reserved.', am: '© 2026 ኪን ኢትዮጵያ። መብቱ በህግ የተጠበቀ ነው።' },

  // Buttons & UI
  'ui.themeToggle.dark': { en: 'Switch to Light Mode', am: 'ወደ ብርሃን ሁነታ ቀይር' },
  'ui.themeToggle.light': { en: 'Switch to Dark Mode (Coffee Black)', am: 'ወደ ቡና ጥቁር ሁነታ ቀይር' },
  'ui.langToggle': { en: 'አማርኛ', am: 'English' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('kin_language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'am')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kin_language', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'am' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
