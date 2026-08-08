import React from 'react';
import { Calendar, Heart, Coffee, Sparkles, MapPin, Gift, HeartHandshake, Star } from 'lucide-react';
import { TimelineEvent, ThemeConfig } from '../types';

interface TimelineSectionProps {
  timeline: TimelineEvent[];
  theme: ThemeConfig;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline, theme }) => {
  if (!timeline || timeline.length === 0) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-pink-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-rose-300" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-emerald-300" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-purple-300" />;
      default:
        return <Heart className="w-5 h-5 text-rose-400 fill-rose-500/50" />;
    }
  };

  return (
    <section id="timeline" className="py-20 relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>Fechas Inolvidables</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white">
          Nuestra Línea del Tiempo
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-0">
        {/* Central Vertical Line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-purple-600 -translate-x-1/2 rounded-full" />

        <div className="space-y-12">
          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Central Node Icon */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-900 border-2 border-rose-400 flex items-center justify-center z-10 shadow-lg shadow-rose-950/60">
                  {getIcon(event.iconName)}
                </div>

                {/* Event Card Content */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <div className={`rounded-3xl p-6 ${theme.cardBg} ${theme.cardBorder} border shadow-xl hover:border-rose-400/50 transition-all duration-300 hover:-translate-y-1`}>
                    <span className="inline-block text-xs font-semibold text-rose-300 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 mb-2">
                      {event.date}
                    </span>
                    <h3 className="text-xl font-serif-elegant font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-rose-100/80 leading-relaxed">
                      {event.description}
                    </p>

                    {event.photoUrl && (
                      <img
                        src={event.photoUrl}
                        alt={event.title}
                        className="mt-4 rounded-xl w-full h-40 object-cover border border-white/10"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
