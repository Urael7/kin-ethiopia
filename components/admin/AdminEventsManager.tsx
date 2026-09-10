'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Calendar, MapPin, Sparkles, X, Image as ImageIcon, Upload, Check } from 'lucide-react';
import type { EventItem } from '@/types';

interface AdminEventsManagerProps {
  initialEvents: EventItem[];
}

const PRESET_IMAGES = [
  { name: 'Echoes of the Ridge (Circus Aerial)', url: '/images/events/echoes.svg' },
  { name: 'Buna Rhythms (Coffee Sanctuary)', url: '/images/events/buna.svg' },
  { name: 'Youth Open Rehearsal', url: '/images/events/youth.svg' },
  { name: 'Gondar Night Songs (Azmari Music)', url: '/images/events/gondar.svg' },
  { name: 'Fire & Clay Lakefront Gathering', url: '/images/events/retrospective.svg' },
  { name: 'Circus Pyramid Rehearsal', url: '/images/gallery/circus-pyramid.svg' },
  { name: 'Krar & Masinko Performance', url: '/images/gallery/krar.svg' },
  { name: 'Jebena Coffee Ceremonial', url: '/images/gallery/coffee.svg' },
  { name: 'Percussion Kebero Quartet', url: '/images/gallery/drums.svg' },
];

export const AdminEventsManager: React.FC<AdminEventsManagerProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    amharicTitle: '',
    description: '',
    imageUrl: '/images/events/echoes.svg',
    date: new Date().toISOString().slice(0, 10),
    time: '18:00–21:00 EAT',
    location: 'Addis Ababa',
    venue: 'National Theatre Main Hall',
    category: 'Circus' as EventItem['category'],
    performers: 'Kin Performance Ensemble, Selamawit Worku',
    status: 'upcoming' as EventItem['status'],
    ticketUrl: '#',
  });

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setEvents((prev) => [json.data, ...prev]);
        setIsModalOpen(false);
        // Reset form
        setFormData({
          title: '',
          amharicTitle: '',
          description: '',
          imageUrl: '/images/events/echoes.svg',
          date: new Date().toISOString().slice(0, 10),
          time: '18:00–21:00 EAT',
          location: 'Addis Ababa',
          venue: 'Kin Pavilion, Entoto',
          category: 'Circus',
          performers: 'Kin Ensemble',
          status: 'upcoming',
          ticketUrl: '#',
        });
      }
    } catch (err) {
      console.error('Failed to create event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  return (
    <div id="events" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-kin-coffee flex items-center gap-2">
            <Calendar className="w-5 h-5 text-kin-green" /> Cultural Events & Gatherings
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Post new spectacles with cover images, manage venues, dates, and performer rosters.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-kin-green hover:bg-kin-green-dark text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4 text-kin-gold" /> Post New Event
        </button>
      </div>

      {/* Events Table / Cards Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600 min-w-[700px]">
          <thead className="bg-stone-50 uppercase text-[10px] font-bold tracking-wider text-stone-400 border-b border-stone-200">
            <tr>
              <th className="p-3">Cover Image</th>
              <th className="p-3">Title & Amharic</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Venue</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-stone-50/60 transition-colors">
                <td className="p-3">
                  <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-kin-coffee border border-stone-200 shrink-0">
                    <Image
                      src={event.imageUrl || '/images/events/echoes.svg'}
                      alt={event.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-3 font-semibold text-kin-coffee">
                  <div>{event.title}</div>
                  {event.amharicTitle && (
                    <span className="font-geez text-[11px] text-stone-400 font-normal">
                      {event.amharicTitle}
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-kin-green/10 text-kin-green font-bold text-[10px] uppercase">
                    {event.category}
                  </span>
                </td>
                <td className="p-3 font-mono">
                  {new Date(event.date).toLocaleDateString()}
                  <div className="text-[10px] text-stone-400 font-sans">{event.time}</div>
                </td>
                <td className="p-3">
                  {event.venue}, <span className="text-stone-400">{event.location}</span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      event.status === 'upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-kin-coffee/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-kin-gold">
                  Event Publisher
                </span>
                <h3 className="font-serif text-2xl font-bold text-kin-coffee">
                  Post New Cultural Experience
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateEvent} className="space-y-6">
              
              {/* Cover Image Showcase Preview & Input */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-kin-coffee mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-kin-gold" />
                  Event Cover Image (Shown on List & Details)
                </label>

                {/* Live Preview Card */}
                <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-kin-coffee mb-4 border border-stone-300">
                  <Image
                    src={formData.imageUrl || '/images/events/echoes.svg'}
                    alt="Event Image Preview"
                    fill
                    sizes="600px"
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kin-coffee/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 z-10">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-kin-green text-white mb-1 inline-block">
                      {formData.category}
                    </span>
                    <p className="text-white font-serif text-lg font-bold leading-tight">
                      {formData.title || 'Untitled Performance'}
                    </p>
                  </div>
                </div>

                {/* Image URL Input */}
                <div className="mb-3">
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Custom Image URL or Path:
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/events/echoes.svg or https://..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>

                {/* Preset Cultural Image Picker */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-2">
                    Or select from Kin Cultural Presets:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {PRESET_IMAGES.map((preset) => {
                      const isSelected = formData.imageUrl === preset.url;
                      return (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                          className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-kin-gold ring-2 ring-kin-gold/40 scale-105'
                              : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                          }`}
                          title={preset.name}
                        >
                          <Image src={preset.url} alt={preset.name} fill sizes="100px" className="object-cover" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-kin-gold/30 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Title & Amharic Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Event Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Echoes of the Ridge"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Amharic Title (Ge'ez Script)
                  </label>
                  <input
                    type="text"
                    value={formData.amharicTitle}
                    onChange={(e) => setFormData({ ...formData, amharicTitle: e.target.value })}
                    placeholder="e.g. የደጋው ንቅናቄ"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 font-geez focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as EventItem['category'] })
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  >
                    <option value="Circus">Circus Theatre</option>
                    <option value="Music">Azmari & Music</option>
                    <option value="Traditional Arts">Traditional Arts / Buna</option>
                    <option value="Community">Community & Rehearsal</option>
                    <option value="Cultural Events">Cultural Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as EventItem['status'] })
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past Archive</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Time Range</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="18:30–21:30 EAT"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
              </div>

              {/* Venue & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="National Theatre Main Hall"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Addis Ababa"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Event Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the performance, music arrangement, and gathering details..."
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold resize-none"
                />
              </div>

              {/* Performers & Ticket URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Featured Performers (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.performers}
                    onChange={(e) => setFormData({ ...formData, performers: e.target.value })}
                    placeholder="Kin Ensemble, Selamawit Worku"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Ticket / Booking Link</label>
                  <input
                    type="text"
                    value={formData.ticketUrl}
                    onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
                    placeholder="#"
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-kin-gold"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-kin-green hover:bg-kin-green-dark text-white text-xs font-semibold uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Publish Event'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};
