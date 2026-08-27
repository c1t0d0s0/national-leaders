import React, { useState, useMemo } from 'react';
import { Leader, LeaderCategory, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import { 
  Ruler, 
  Weight, 
  Clock, 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Medal, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

interface RankingsViewProps {
  leaders: Leader[];
  language: Language;
  selectedCategory: LeaderCategory | 'all';
  onSelectCategory: (cat: LeaderCategory | 'all') => void;
  onSelectLeader: (leader: Leader) => void;
}

type RankingMetric = 'height' | 'weight' | 'reign_long' | 'reign_short' | 'age_young' | 'age_old';

export const RankingsView: React.FC<RankingsViewProps> = ({
  leaders,
  language,
  selectedCategory,
  onSelectCategory,
  onSelectLeader,
}) => {
  const [currentMetric, setCurrentMetric] = useState<RankingMetric>('height');
  const t = translations[language];

  // Metrics tabs
  const metricTabs: { id: RankingMetric; label: string; icon: React.ReactNode }[] = [
    { id: 'height', label: t.rankings.heightRanking, icon: <Ruler className="w-4 h-4 text-amber-500" /> },
    { id: 'weight', label: t.rankings.weightRanking, icon: <Weight className="w-4 h-4 text-blue-500" /> },
    { id: 'reign_long', label: t.rankings.reignLongest, icon: <Clock className="w-4 h-4 text-emerald-500" /> },
    { id: 'reign_short', label: t.rankings.reignShortest, icon: <Flame className="w-4 h-4 text-rose-500" /> },
    { id: 'age_young', label: t.rankings.youngestInauguration, icon: <TrendingUp className="w-4 h-4 text-indigo-500" /> },
    { id: 'age_old', label: t.rankings.oldestInauguration, icon: <Medal className="w-4 h-4 text-purple-500" /> },
  ];

  // Filtered and sorted dataset
  const rankingList = useMemo(() => {
    let list = [...leaders];
    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }

    switch (currentMetric) {
      case 'height':
        return list
          .filter((l) => l.physicalStats.heightCm !== undefined)
          .sort((a, b) => (b.physicalStats.heightCm || 0) - (a.physicalStats.heightCm || 0));
      case 'weight':
        return list
          .filter((l) => l.physicalStats.weightKg !== undefined)
          .sort((a, b) => (b.physicalStats.weightKg || 0) - (a.physicalStats.weightKg || 0));
      case 'reign_long':
        return list.sort((a, b) => b.reignDays - a.reignDays);
      case 'reign_short':
        return list
          .filter((l) => l.reignEnd !== '現職' && l.reignEnd !== 'Present')
          .sort((a, b) => a.reignDays - b.reignDays);
      case 'age_young':
        return list
          .filter((l) => l.inaugurationAge !== undefined)
          .sort((a, b) => (a.inaugurationAge || 0) - (b.inaugurationAge || 0));
      case 'age_old':
        return list
          .filter((l) => l.inaugurationAge !== undefined)
          .sort((a, b) => (b.inaugurationAge || 0) - (a.inaugurationAge || 0));
    }
  }, [leaders, selectedCategory, currentMetric]);

  const maxVal = useMemo(() => {
    if (rankingList.length === 0) return 1;
    switch (currentMetric) {
      case 'height':
        return rankingList[0]?.physicalStats.heightCm || 200;
      case 'weight':
        return rankingList[0]?.physicalStats.weightKg || 160;
      case 'reign_long':
        return rankingList[0]?.reignDays || 20000;
      case 'reign_short':
        return rankingList[rankingList.length - 1]?.reignDays || 5000;
      case 'age_young':
      case 'age_old':
        return 85;
    }
  }, [rankingList, currentMetric]);

  const renderValueDisplay = (leader: Leader) => {
    switch (currentMetric) {
      case 'height':
        return (
          <div>
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {leader.physicalStats.heightCm} <span className="text-xs font-normal text-slate-400">cm</span>
            </span>
            {leader.physicalStats.heightSource && (
              <span className="block text-[10px] text-slate-400 truncate max-w-[200px]">
                {leader.physicalStats.heightSource}
              </span>
            )}
          </div>
        );
      case 'weight':
        return (
          <div>
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {leader.physicalStats.weightKg} <span className="text-xs font-normal text-slate-400">kg</span>
            </span>
            {leader.physicalStats.weightSource && (
              <span className="block text-[10px] text-slate-400 truncate max-w-[200px]">
                {leader.physicalStats.weightSource}
              </span>
            )}
          </div>
        );
      case 'reign_long':
      case 'reign_short':
        return (
          <div>
            <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {leader.reignDays.toLocaleString()} <span className="text-xs font-normal text-slate-400">{t.leaderCard.days}</span>
            </span>
            <span className="block text-[11px] text-slate-500 font-medium">
              約 {(leader.reignDays / 365.25).toFixed(1)} {t.leaderCard.years}
            </span>
          </div>
        );
      case 'age_young':
      case 'age_old':
        return (
          <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {leader.inaugurationAge} <span className="text-xs font-normal text-slate-400">歳</span>
          </span>
        );
    }
  };

  const getBarPercentage = (leader: Leader) => {
    let val = 0;
    switch (currentMetric) {
      case 'height':
        val = leader.physicalStats.heightCm || 0;
        break;
      case 'weight':
        val = leader.physicalStats.weightKg || 0;
        break;
      case 'reign_long':
      case 'reign_short':
        val = leader.reignDays;
        break;
      case 'age_young':
      case 'age_old':
        val = leader.inaugurationAge || 0;
        break;
    }
    return Math.min(100, Math.max(15, (val / maxVal) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          {t.rankings.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {t.rankings.subtitle}
        </p>
      </div>

      {/* Metric Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {metricTabs.map((tab) => {
          const isActive = currentMetric === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentMetric(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition border whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Rankings List Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {rankingList.map((leader, index) => {
            const rank = index + 1;
            const colors = getCategoryBadgeColor(leader.category);
            const isTop3 = rank <= 3;

            return (
              <div
                key={leader.id}
                onClick={() => onSelectLeader(leader)}
                className="p-4 sm:p-5 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition group"
              >
                {/* Rank Badge */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                  rank === 1
                    ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                    : rank === 2
                    ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                    : rank === 3
                    ? 'bg-amber-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {rank}
                </div>

                {/* Avatar */}
                <LeaderAvatar leader={leader} language={language} size="sm" className="shrink-0" />

                {/* Leader Info & Visual Bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors.badgeBg}`}>
                      #{leader.order}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-serif group-hover:text-amber-600 dark:group-hover:text-amber-400 transition break-words">
                      {language === 'ja' ? leader.nameJa : leader.nameEn}
                    </h3>
                    <span className="text-xs text-slate-400 hidden sm:inline shrink-0">
                      ({language === 'ja' ? leader.eraNameJa : leader.eraNameEn})
                    </span>
                  </div>

                  {/* Horizontal Bar Chart Progress */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop3 ? colors.accent : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                      style={{ width: `${getBarPercentage(leader)}%` }}
                    />
                  </div>
                </div>

                {/* Stat Metric Value */}
                <div className="text-right shrink-0">
                  {renderValueDisplay(leader)}
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition shrink-0 hidden sm:block" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
