'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TeamMember } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/components/providers/LanguageContext';
import { Eye } from 'lucide-react';

interface TeamDirectoryProps {
  members: TeamMember[];
}

export const TeamDirectory: React.FC<TeamDirectoryProps> = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { t, language } = useLanguage();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedMember(member)}
            className="group cursor-pointer bg-white dark:bg-kin-coffee-card rounded-2xl p-6 border-2 border-stone-300/90 dark:border-kin-coffee-border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Discipline Tag */}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-kin-coffee/85 dark:bg-kin-coffee-elevated backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-kin-gold border border-kin-gold/40 shadow-sm">
              {member.discipline}
            </div>

            {/* Cropped Circle Image Container on Card */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-kin-gold shadow-lg mb-5 group-hover:scale-105 transition-transform duration-500 bg-kin-coffee-muted shrink-0">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-kin-green/20 text-kin-green dark:text-kin-gold font-serif text-3xl font-bold">
                  {member.name[0]}
                </div>
              )}
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-kin-coffee/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-8 h-8 text-kin-gold animate-pulse" />
              </div>
            </div>

            {/* Name and Role */}
            <h3 className="font-serif text-xl font-extrabold text-stone-950 dark:text-white group-hover:text-kin-green dark:group-hover:text-kin-gold transition-colors">
              {language === 'am' && member.amharicName ? member.amharicName : member.name}
            </h3>
            {member.amharicName && language !== 'am' && (
              <span className="font-geez text-xs text-kin-gold font-bold mt-0.5">
                {member.amharicName}
              </span>
            )}
            <p className="text-xs text-stone-800 dark:text-stone-300 font-bold mt-1">
              {language === 'am' && member.amharicRole ? member.amharicRole : member.role}
            </p>

            <span className="mt-4 text-[11px] font-extrabold text-kin-green dark:text-kin-gold uppercase tracking-wider inline-flex items-center gap-1 group-hover:underline">
              {t('team.clickHint')} →
            </span>
          </motion.div>
        ))}
      </div>

      {/* Profile Detail Modal displaying full picture in cropped circle */}
      <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)}>
        {selectedMember && (
          <div className="p-6 sm:p-8 max-w-xl dark:text-stone-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 text-center sm:text-left">
              {/* Cropped Circle Picture Inside Modal */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-kin-gold shadow-2xl shrink-0 bg-kin-coffee-muted">
                {selectedMember.photoUrl ? (
                  <Image
                    src={selectedMember.photoUrl}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-kin-green/20 text-kin-green dark:text-kin-gold font-serif text-4xl font-bold">
                    {selectedMember.name[0]}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white">
                    {language === 'am' && selectedMember.amharicName ? selectedMember.amharicName : selectedMember.name}
                  </h3>
                  {selectedMember.amharicName && language !== 'am' && (
                    <span className="font-geez text-base text-kin-gold font-bold">
                      {selectedMember.amharicName}
                    </span>
                  )}
                </div>
                <p className="text-xs uppercase tracking-wider font-extrabold text-kin-green dark:text-kin-gold mb-3">
                  {(language === 'am' && selectedMember.amharicRole ? selectedMember.amharicRole : selectedMember.role)} • {(language === 'am' && selectedMember.amharicDiscipline ? selectedMember.amharicDiscipline : selectedMember.discipline)}
                </p>
                <div className="inline-flex px-3 py-1 rounded-full bg-kin-gold/15 border border-kin-gold/40 text-kin-gold text-[11px] font-bold">
                  {language === 'am' ? 'የኪን ኢትዮጵያ ቡድን' : 'Kin Ethiopia Ensemble'}
                </div>
              </div>
            </div>

            <p className="text-stone-900 dark:text-stone-200 text-sm font-medium leading-relaxed mb-6 font-sans">
              {language === 'am' && selectedMember.amharicBio ? selectedMember.amharicBio : selectedMember.bio}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-stone-700 dark:text-stone-400 mb-2">
                {t('team.expertise')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(language === 'am' && selectedMember.amharicSkills ? selectedMember.amharicSkills : selectedMember.skills).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-stone-200 dark:bg-kin-coffee-elevated text-stone-900 dark:text-stone-200 font-bold border border-stone-300 dark:border-kin-coffee-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-300 dark:border-kin-coffee-border flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2.5 rounded-full bg-kin-coffee dark:bg-kin-gold text-white dark:text-kin-coffee text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md active:scale-95"
              >
                {t('team.closeProfile')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};