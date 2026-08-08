import React, { useState, useEffect } from 'react';
import { Clock, Heart, Calendar, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types';

interface LiveCounterProps {
  startDate: string;
  partnerName: string;
  theme: ThemeConfig;
}

interface TimeDifference {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

export const LiveCounter: React.FC<LiveCounterProps> = ({ startDate, partnerName, theme }) => {
  const [timeDiff, setTimeDiff] = useState<TimeDifference | null>(null);

  useEffect(() => {
    if (!startDate) return;

    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      let diffMs = Math.max(0, now - start);

      const seconds = Math.floor((diffMs / 1000) % 60);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      // Calculate breakdown of years, months, weeks, days
      const startD = new Date(startDate);
      const nowD = new Date();

      let years = nowD.getFullYear() - startD.getFullYear();
      let months = nowD.getMonth() - startD.getMonth();
      let days = nowD.getDate() - startD.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonthDate = new Date(nowD.getFullYear(), nowD.getMonth(), 0).getDate();
        days += prevMonthDate;
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;

      setTimeDiff({
        years: Math.max(0, years),
        months: Math.max(0, months),
        weeks: Math.max(0, weeks),
        days: Math.max(0, remainingDays),
        hours,
        minutes,
        seconds,
        totalDays,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  if (!timeDiff) return null;

  const statItems = [
    { label: 'Años', value: timeDiff.years, unit: 'Año(s)' },
    { label: 'Meses', value: timeDiff.months, unit: 'Mes(es)' },
    { label: 'Semanas', value: timeDiff.weeks, unit: 'Semana(s)' },
    { label: 'Días', value: timeDiff.days, unit: 'Día(s)' },
    { label: 'Horas', value: timeDiff.hours, unit: 'Hora(s)' },
    { label: 'Minutos', value: timeDiff.minutes, unit: 'Minuto(s)' },
    { label: 'Segundos', value: timeDiff.seconds, unit: 'Segundo(s)' },
  ];

  return (
    <section id="counter" className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className={`rounded-3xl p-8 sm:p-12 ${theme.cardBg} ${theme.cardBorder} border shadow-2xl text-center relative overflow-hidden`}>
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Clock className="w-4 h-4 text-rose-400" />
          <span>Tiempo Juntos en Tiempo Real</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif-elegant font-bold text-white mb-4">
          Cada segundo a tu lado cuenta
        </h2>
        <p className="text-rose-200/80 max-w-xl mx-auto text-sm sm:text-base mb-10">
          Desde aquel momento especial, han transcurrido exactamente:
        </p>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4 mb-10">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/50 backdrop-blur-md border border-rose-500/20 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-rose-400/40 transition-all hover:-translate-y-1 shadow-md"
            >
              <span className="text-2xl sm:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-rose-200/70 mt-1 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Total Days Highlight */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 border border-rose-400/30 text-rose-100 text-sm font-medium">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
          <span>
            ¡Un total de <strong className="text-white text-base font-bold">{timeDiff.totalDays.toLocaleString()} días</strong> llenos de amor y momentos mágicos!
          </span>
        </div>
      </div>
    </section>
  );
};
