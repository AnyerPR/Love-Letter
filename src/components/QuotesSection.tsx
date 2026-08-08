import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { QuoteItem, ThemeConfig } from '../types';

interface QuotesSectionProps {
  quotes: QuoteItem[];
  theme: ThemeConfig;
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({ quotes, theme }) => {
  if (!quotes || quotes.length === 0) return null;

  return (
    <section id="quotes" className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Quote className="w-4 h-4 text-rose-400" />
          <span>Pensamientos & Frases</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white">
          Frases que nos Definen
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((q) => (
          <div
            key={q.id}
            className={`rounded-3xl p-6 sm:p-8 ${theme.cardBg} ${theme.cardBorder} border shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-rose-400/50 transition-all duration-300`}
          >
            <Quote className="w-10 h-10 text-rose-400/30 absolute top-4 right-4 pointer-events-none group-hover:scale-110 transition-transform" />

            <p className="font-serif-elegant italic text-base sm:text-lg text-rose-100 leading-relaxed relative z-10 mb-6">
              "{q.quote}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-rose-500/20 text-xs">
              {q.category && (
                <span className="text-rose-300 font-medium px-2.5 py-1 rounded-full bg-rose-500/10">
                  {q.category}
                </span>
              )}
              {q.author && (
                <span className="text-rose-200/70 font-romantic-script text-lg">
                  — {q.author}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
