import React, { useMemo, useState } from 'react';
import { Leader, LeaderCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  Layers, 
  Crown, 
  Building2, 
  Flag 
} from 'lucide-react';

interface TimelineViewProps {
  leaders: Leader[];
  language: Language;
  selectedCategory: LeaderCategory | 'all';
  onSelectCategory: (cat: LeaderCategory | 'all') => void;
  onSelectLeader: (leader: Leader) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  leaders,
  language,
  selectedCategory,
  onSelectCategory,
  onSelectLeader,
}) => {
  const t = translations[language];

  // Group and sort chronologically by reignStart
  const chronologicalLeaders = useMemo(() => {
    let list = [...leaders];
    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }
    return list.sort((a, b) => a.reignStart.localeCompare(b.reignStart));
  }, [leaders, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          {t.timeline.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {t.timeline.subtitle}
        </p>
      </div>

      {/* Chronological Vertical Stream */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 py-4">
        {chronologicalLeaders.map((leader, index) => {
          const colors = getCategoryBadgeColor(leader.category);
          const startYear = leader.reignStart.slice(0, 4);
          const endYear = leader.reignEnd === '現職' || leader.reignEnd === 'Present' ? (language === 'ja' ? '現職' : 'Present') : leader.reignEnd.slice(0, 4);

          return (
            <div key={leader.id} className="relative group">
              {/* Timeline Dot with Category Color */}
              <div className={`absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 shadow-md transition-transform group-hover:scale-125 ${colors.accent}`} />

              {/* Year Stamp */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm">
                  {startYear} 〜 {endYear}
                </span>
                {leader.eraNameJa && (
                  <span className="text-xs font-medium text-slate-500">
                    {language === 'ja' ? leader.eraNameJa : leader.eraNameEn}
                  </span>
                )}
              </div>

              {/* Leader Interactive Card */}
              <div
                onClick={() => onSelectLeader(leader)}
                className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group/card hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <LeaderAvatar leader={leader} language={language} size="md" className="shrink-0 shadow-md" />

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${colors.badgeBg}`}>
                        #{leader.order}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif group-hover/card:text-amber-600 dark:group-hover/card:text-amber-400 transition">
                        {language === 'ja' ? leader.nameJa : leader.nameEn}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
                      {language === 'ja' ? leader.summaryJa : leader.summaryEn}
                    </p>

                    {leader.physicalStats.heightCm && (
                      <span className="inline-block mt-2 text-[11px] text-slate-400">
                        📏 {t.leaderCard.height}: {leader.physicalStats.heightCm} cm
                        {leader.physicalStats.weightKg ? ` / ${leader.physicalStats.weightKg} kg` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover/card:text-slate-900 dark:group-hover/card:text-white transition shrink-0 self-end sm:self-center">
                  <span>{t.leaderCard.viewDetails}</span>
                  <ChevronRight className="w-4 h-4 group-hover/card:translate-x-1 transition" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
