import React, { useMemo, useState } from 'react';
import { Leader, LeaderCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import { 
  Clock, 
  Search,
  X,
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
  const [timelineSearch, setTimelineSearch] = useState('');

  // Group and sort chronologically by reignStart with full timeline text search
  const chronologicalLeaders = useMemo(() => {
    let list = [...leaders];
    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }
    if (timelineSearch.trim()) {
      const q = timelineSearch.toLowerCase().trim();
      list = list.filter((l) => {
        const nameJa = l.nameJa.toLowerCase();
        const nameRuby = l.nameRuby.toLowerCase();
        const nameEn = l.nameEn.toLowerCase();
        const summaryJa = l.summaryJa.toLowerCase();
        const summaryEn = l.summaryEn.toLowerCase();
        const eraJa = (l.eraNameJa || '').toLowerCase();
        const eraEn = (l.eraNameEn || '').toLowerCase();
        const partyJa = (l.partyOrFactionJa || '').toLowerCase();
        const partyEn = (l.partyOrFactionEn || '').toLowerCase();

        // Search events
        const eventsText = (l.keyEvents || [])
          .map((e) => `${e.year} ${e.titleJa} ${e.titleEn} ${e.descriptionJa} ${e.descriptionEn}`)
          .join(' ')
          .toLowerCase();

        const achievements = (language === 'ja' ? l.keyAchievementsJa : l.keyAchievementsEn).join(' ').toLowerCase();

        return (
          nameJa.includes(q) ||
          nameRuby.includes(q) ||
          nameEn.includes(q) ||
          summaryJa.includes(q) ||
          summaryEn.includes(q) ||
          eraJa.includes(q) ||
          eraEn.includes(q) ||
          partyJa.includes(q) ||
          partyEn.includes(q) ||
          eventsText.includes(q) ||
          achievements.includes(q)
        );
      });
    }
    return list.sort((a, b) => a.reignStart.localeCompare(b.reignStart));
  }, [leaders, selectedCategory, timelineSearch, language]);

  return (
    <div className="space-y-6">
      {/* Header Banner with Integrated Search */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            {t.timeline.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Timeline Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={timelineSearch}
            onChange={(e) => setTimelineSearch(e.target.value)}
            placeholder={language === 'ja' ? '歴史年表の事件・出来事、指導者名、年号などで年表を検索...' : 'Search timeline by events, incident names, years, leaders...'}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition"
          />
          {timelineSearch && (
            <button
              onClick={() => setTimelineSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chronological Vertical Stream */}
      {chronologicalLeaders.length > 0 ? (
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
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover/card:text-amber-600 dark:group-hover/card:text-amber-400 transition">
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

                    {/* Major Historical Events in Tenure */}
                    {leader.keyEvents && leader.keyEvents.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {leader.keyEvents.slice(0, 3).map((evt, eIdx) => (
                          <span
                            key={eIdx}
                            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700"
                          >
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {language === 'ja' ? `${evt.year}年` : evt.year}:
                            </span>
                            <span className="truncate max-w-[180px] sm:max-w-[240px] md:max-w-[320px]">
                              {language === 'ja' ? evt.titleJa : evt.titleEn}
                            </span>
                          </span>
                        ))}
                        {leader.keyEvents.length > 3 && (
                          <span className="inline-flex items-center text-[11px] px-1.5 py-0.5 rounded-lg text-slate-400 font-semibold">
                            +{leader.keyEvents.length - 3}
                          </span>
                        )}
                      </div>
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
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">
            {language === 'ja' ? '該当する歴史年表の出来事・指導者が見つかりませんでした' : 'No matching timeline events or leaders found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {language === 'ja'
              ? '検索キーワードを変更するか、検索欄をクリアしてください。'
              : 'Try modifying your search keywords or clearing the search bar.'}
          </p>
          <button
            onClick={() => setTimelineSearch('')}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {t.filter.clearFilter}
          </button>
        </div>
      )}
    </div>
  );
};
