import React from 'react';
import { getTeamMembers, getEvents, getBlogPosts, getAnnouncements, getGallery } from '@/lib/content';
import { Users, Calendar, BookOpen, Bell, Image as ImageIcon, Plus, ShieldCheck, Database } from 'lucide-react';
import { AdminEventsManager } from '@/components/admin/AdminEventsManager';

export const metadata = {
  title: 'Admin Content Dashboard | Kin Ethiopia',
  description: 'Manage ensemble team members, events, articles, announcements, and contact messages.',
};

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [team, events, posts, announcements, gallery] = await Promise.all([
    getTeamMembers(),
    getEvents(),
    getBlogPosts(),
    getAnnouncements(),
    getGallery(),
  ]);

  const stats = [
    { title: 'Ensemble Members', count: team.length, icon: <Users className="w-5 h-5 text-kin-gold" /> },
    { title: 'Cultural Events', count: events.length, icon: <Calendar className="w-5 h-5 text-kin-gold" /> },
    { title: 'Journal Posts', count: posts.length, icon: <BookOpen className="w-5 h-5 text-kin-gold" /> },
    { title: 'Announcements', count: announcements.length, icon: <Bell className="w-5 h-5 text-kin-gold" /> },
    { title: 'Gallery Archive', count: gallery.length, icon: <ImageIcon className="w-5 h-5 text-kin-gold" /> },
  ];

  return (
    <div className="pt-28 pb-24 bg-kin-parchment min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kin-coffee/10 text-kin-coffee text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-kin-gold" />
              <span>Cultural Operations Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kin-coffee">
              Content & Ensemble Management
            </h1>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 bg-white px-4 py-2.5 rounded-full border border-stone-200 shadow-sm shrink-0">
            <Database className="w-4 h-4 text-kin-green" />
            <span>Storage: {process.env.IMAGE_PROVIDER ?? 'Local / MongoDB'}</span>
          </div>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  {stat.title}
                </span>
                {stat.icon}
              </div>
              <span className="font-serif text-3xl font-bold text-kin-coffee">
                {stat.count}
              </span>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="space-y-12">
          
          {/* Interactive Events Manager Component */}
          <AdminEventsManager initialEvents={events} />

          {/* Team Members Ensemble Directory */}
          <div id="team" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-kin-coffee flex items-center gap-2">
                <Users className="w-5 h-5 text-kin-green" /> Ensemble Directory
              </h2>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-kin-green text-white text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-kin-green-dark transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600 min-w-[600px]">
                <thead className="bg-stone-50 uppercase text-[10px] font-bold tracking-wider text-stone-400 border-b border-stone-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Discipline</th>
                    <th className="p-3">Featured</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {team.map((member) => (
                    <tr key={member.id} className="hover:bg-stone-50/50">
                      <td className="p-3 font-semibold text-kin-coffee">{member.name} ({member.amharicName})</td>
                      <td className="p-3">{member.role}</td>
                      <td className="p-3"><span className="px-2.5 py-0.5 rounded-full bg-kin-green/10 text-kin-green font-bold">{member.discipline}</span></td>
                      <td className="p-3">{member.featured ? 'Yes' : 'No'}</td>
                      <td className="p-3 font-bold text-kin-green hover:underline cursor-pointer">Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
