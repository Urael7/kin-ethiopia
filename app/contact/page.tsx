'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validation/contact';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [serverState, setServerState] = useState<{
    loading: boolean;
    success?: boolean;
    error?: string;
  }>({ loading: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerState({ loading: true });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setServerState({ loading: false, success: true });
        reset();
      } else {
        setServerState({ loading: false, error: result.message || 'Submission failed' });
      }
    } catch {
      setServerState({ loading: false, error: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-kin-parchment via-kin-parchment-light to-kin-parchment dark:from-kin-coffee-dark dark:via-kin-coffee dark:to-kin-coffee-dark text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          geez="፩"
          tag={language === 'am' ? 'ከቡድኑ ጋር ይገናኙ' : 'Connect With The Collective'}
          title={language === 'am' ? 'ኪን ኢትዮጵያን ያግኙ' : 'Reach Out to Kin Ethiopia'}
          subtitle={
            language === 'am'
              ? 'ስለ ሁነቶች ጥያቄ፣ ሰርከስ እና ሙዚቃ ትይንት ዝግጅቶች ከእኛ ጋር ይነጋገሩ።'
              : 'Whether planning an international festival collaboration, inquiring about youth auditions, or joining our cultural sanctuary.'
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-kin-coffee-card rounded-2xl p-8 border-2 border-stone-300 dark:border-kin-coffee-border shadow-md space-y-6">
              <h3 className="font-serif text-2xl font-extrabold text-stone-950 dark:text-white">
                {language === 'am' ? 'ዋና ጽሕፈት ቤት እና ማዕከል' : 'Headquarters & Sanctuary'}
              </h3>
              
              <div className="space-y-4 text-sm font-medium text-stone-800 dark:text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-kin-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-stone-950 dark:text-white block">
                      {language === 'am' ? 'ዋና ፓቪሊዮን' : 'Main Pavilion'}
                    </span>
                    <span>
                      {language === 'am'
                        ? 'እንቶቶ የፈጠራ ፓርክ እና ባህል ማዕከል፣ አዲስ አበባ፣ ኢትዮጵያ'
                        : 'Entoto Creative Park & Cultural Corridor, Addis Ababa, Ethiopia'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-kin-gold shrink-0" />
                  <span className="font-bold">+251 (0) 91 100 0000 / +251 (0) 11 500 0000</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-kin-gold shrink-0" />
                  <span className="font-bold">contact@kinethiopia.org</span>
                </div>
              </div>
            </div>

            {/* Map Canvas Card */}
            <div className="h-64 rounded-2xl bg-stone-200 dark:bg-kin-coffee-elevated overflow-hidden relative border-2 border-stone-300 dark:border-kin-coffee-border flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin className="w-8 h-8 text-kin-crimson dark:text-kin-gold mx-auto mb-2" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-stone-900 dark:text-stone-100 block">
                  {language === 'am' ? 'እንቶቶ ባህል ማዕከል አዲስ አበባ' : 'Entoto Pavilion Addis Ababa'}
                </span>
                <span className="text-[11px] text-stone-600 dark:text-stone-400 font-medium">
                  {language === 'am' ? 'አዲስ አበባ፣ ኢትዮጵያ' : 'Addis Ababa, Ethiopia'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-kin-coffee-card rounded-3xl p-8 sm:p-10 border-2 border-stone-300 dark:border-kin-coffee-border shadow-md">
              {serverState.success ? (
                <div className="text-center py-12 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-kin-green dark:text-kin-gold mx-auto" />
                  <h3 className="font-serif text-2xl font-extrabold text-stone-950 dark:text-white">
                    {language === 'am' ? 'መልእክትዎ ተልኳል' : 'Message Transmitted'}
                  </h3>
                  <p className="text-stone-800 dark:text-stone-300 text-sm font-medium max-w-md mx-auto">
                    {language === 'am'
                      ? 'ለኪን ኢትዮጵያ መልእክት ስለላኩ እናመሰግናለን። የዝግጅት ቡድናችን መልእክትዎን አይቶ በአጭር ጊዜ ውስጥ ያገኝዎታል።'
                      : 'Thank you for reaching out to Kin Ethiopia. Our coordination ensemble will review your inquiry and connect with you shortly.'}
                  </p>
                  <button
                    onClick={() => setServerState({ loading: false })}
                    className="mt-4 px-6 py-2.5 rounded-full bg-kin-coffee dark:bg-kin-gold text-white dark:text-kin-coffee text-xs font-extrabold uppercase"
                  >
                    {language === 'am' ? 'ሌላ መልእክት ላክ' : 'Send Another Note'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {serverState.error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverState.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1.5">
                        {language === 'am' ? 'ሙሉ ስም *' : 'Full Name *'}
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-kin-coffee-border bg-white dark:bg-kin-coffee-elevated text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-kin-gold text-sm font-medium"
                        placeholder={language === 'am' ? 'ምሳሌ፡ አበበ ቢቂላ' : 'e.g. Abebe Bikila'}
                      />
                      {errors.name && <p className="text-xs text-red-600 font-bold mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1.5">
                        {language === 'am' ? 'ኢሜይል *' : 'Email Address *'}
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-kin-coffee-border bg-white dark:bg-kin-coffee-elevated text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-kin-gold text-sm font-medium"
                        placeholder="you@domain.com"
                      />
                      {errors.email && <p className="text-xs text-red-600 font-bold mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1.5">
                        {language === 'am' ? 'ስልክ ቁጥር *' : 'Phone Number *'}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-kin-coffee-border bg-white dark:bg-kin-coffee-elevated text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-kin-gold text-sm font-medium"
                        placeholder="+251 ..."
                      />
                      {errors.phone && <p className="text-xs text-red-600 font-bold mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1.5">
                        {language === 'am' ? 'ርዕስ *' : 'Subject *'}
                      </label>
                      <input
                        id="subject"
                        type="text"
                        {...register('subject')}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-kin-coffee-border bg-white dark:bg-kin-coffee-elevated text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-kin-gold text-sm font-medium"
                        placeholder={language === 'am' ? 'ምሳሌ፡ የመልመጃ / የትይንት ጥያቄ' : 'Audition / Performance Booking'}
                      />
                      {errors.subject && <p className="text-xs text-red-600 font-bold mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-1.5">
                      {language === 'am' ? 'መልእክትዎ *' : 'Your Message *'}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-kin-coffee-border bg-white dark:bg-kin-coffee-elevated text-stone-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-kin-gold text-sm font-medium"
                      placeholder={language === 'am' ? 'የጥያቄዎን ወይም የሃሳብዎን ዝርዝር ይጻፉ...' : 'Share your inquiry or proposal details...'}
                    />
                    {errors.message && <p className="text-xs text-red-600 font-bold mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={serverState.loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-kin-green hover:bg-kin-green-dark dark:bg-kin-gold dark:text-kin-coffee text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {serverState.loading ? (language === 'am' ? 'እየተላከ ነው...' : 'Transmitting...') : language === 'am' ? 'መልእክት ላክ' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}