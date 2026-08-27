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

interface UniqueLeaderRankingItem {
  id: string;
  nameJa: string;
  nameEn: string;
  nameRuby: string;
  category: LeaderCategory;
  representativeLeader: Leader;
  allTerms: number[];
  termCount: number;
  totalReignDays: number;
  heightCm?: number;
  heightSource?: string;
  heightNoteJa?: string;
  heightNoteEn?: string;
  weightKg?: number;
  weightSource?: string;
  weightNoteJa?: string;
  weightNoteEn?: string;
  youngestInaugurationAge?: number;
  oldestInaugurationAge?: number;
}

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

  // Group and deduplicate leaders into unique historical persons
  const uniqueLeaders = useMemo<UniqueLeaderRankingItem[]>(() => {
    let list = [...leaders];
    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }

    const map = new Map<string, UniqueLeaderRankingItem>();

    for (const l of list) {
      const key = `${l.category}_${l.nameJa}`;
      const existing = map.get(key);

      if (!existing) {
        map.set(key, {
          id: l.id,
          nameJa: l.nameJa,
          nameEn: l.nameEn,
          nameRuby: l.nameRuby,
          category: l.category,
          representativeLeader: l,
          allTerms: [l.order],
          termCount: 1,
          totalReignDays: l.reignDays,
          heightCm: l.physicalStats.heightCm,
          heightSource: l.physicalStats.heightSource,
          heightNoteJa: l.physicalStats.heightNoteJa,
          heightNoteEn: l.physicalStats.heightNoteEn,
          weightKg: l.physicalStats.weightKg,
          weightSource: l.physicalStats.weightSource,
          weightNoteJa: l.physicalStats.weightNoteJa,
          weightNoteEn: l.physicalStats.weightNoteEn,
          youngestInaugurationAge: l.inaugurationAge || undefined,
          oldestInaugurationAge: l.inaugurationAge || undefined,
        });
      } else {
        if (!existing.allTerms.includes(l.order)) {
          existing.allTerms.push(l.order);
          existing.allTerms.sort((a, b) => a - b);
        }
        existing.termCount += 1;
        existing.totalReignDays += l.reignDays;

        if (l.inaugurationAge !== undefined && l.inaugurationAge !== null) {
          existing.youngestInaugurationAge = existing.youngestInaugurationAge !== undefined
            ? Math.min(existing.youngestInaugurationAge, l.inaugurationAge)
            : l.inaugurationAge;
          existing.oldestInaugurationAge = existing.oldestInaugurationAge !== undefined
            ? Math.max(existing.oldestInaugurationAge, l.inaugurationAge)
            : l.inaugurationAge;
        }

        if (!existing.heightCm && l.physicalStats.heightCm) {
          existing.heightCm = l.physicalStats.heightCm;
          existing.heightSource = l.physicalStats.heightSource;
          existing.heightNoteJa = l.physicalStats.heightNoteJa;
          existing.heightNoteEn = l.physicalStats.heightNoteEn;
        }
        if (!existing.weightKg && l.physicalStats.weightKg) {
          existing.weightKg = l.physicalStats.weightKg;
          existing.weightSource = l.physicalStats.weightSource;
          existing.weightNoteJa = l.physicalStats.weightNoteJa;
          existing.weightNoteEn = l.physicalStats.weightNoteEn;
        }
      }
    }

    return Array.from(map.values());
  }, [leaders, selectedCategory]);

  // Filtered and sorted dataset of unique persons
  const rankingList = useMemo<UniqueLeaderRankingItem[]>(() => {
    switch (currentMetric) {
      case 'height':
        return uniqueLeaders
          .filter((l) => l.heightCm !== undefined)
          .sort((a, b) => (b.heightCm || 0) - (a.heightCm || 0));
      case 'weight':
        return uniqueLeaders
          .filter((l) => l.weightKg !== undefined)
          .sort((a, b) => (b.weightKg || 0) - (a.weightKg || 0));
      case 'reign_long':
        return [...uniqueLeaders].sort((a, b) => b.totalReignDays - a.totalReignDays);
      case 'reign_short':
        return uniqueLeaders
          .filter((l) => l.representativeLeader.reignEnd !== '現職' && l.representativeLeader.reignEnd !== 'Present')
          .sort((a, b) => a.totalReignDays - b.totalReignDays);
      case 'age_young':
        return uniqueLeaders
          .filter((l) => l.youngestInaugurationAge !== undefined)
          .sort((a, b) => (a.youngestInaugurationAge || 0) - (b.youngestInaugurationAge || 0));
      case 'age_old':
        return uniqueLeaders
          .filter((l) => l.oldestInaugurationAge !== undefined)
          .sort((a, b) => (b.oldestInaugurationAge || 0) - (a.oldestInaugurationAge || 0));
      default:
        return uniqueLeaders;
    }
  }, [uniqueLeaders, currentMetric]);

  const maxVal = useMemo(() => {
    if (rankingList.length === 0) return 1;
    switch (currentMetric) {
      case 'height':
        return rankingList[0]?.heightCm || 200;
      case 'weight':
        return rankingList[0]?.weightKg || 160;
      case 'reign_long':
        return rankingList[0]?.totalReignDays || 20000;
      case 'reign_short':
        return rankingList[rankingList.length - 1]?.totalReignDays || 5000;
      case 'age_young':
      case 'age_old':
        return 85;
      default:
        return 100;
    }
  }, [rankingList, currentMetric]);

  const renderPrimaryValue = (item: UniqueLeaderRankingItem) => {
    switch (currentMetric) {
      case 'height':
        return (
          <span>
            {item.heightCm} <span className="text-xs font-normal text-slate-400">cm</span>
          </span>
        );
      case 'weight':
        return (
          <span>
            {item.weightKg} <span className="text-xs font-normal text-slate-400">kg</span>
          </span>
        );
      case 'reign_long':
      case 'reign_short':
        return (
          <span>
            {item.totalReignDays.toLocaleString()} <span className="text-xs font-normal text-slate-400">{t.leaderCard.days}</span>
          </span>
        );
      case 'age_young':
        return (
          <span>
            {item.youngestInaugurationAge} <span className="text-xs font-normal text-slate-400">歳</span>
          </span>
        );
      case 'age_old':
        return (
          <span>
            {item.oldestInaugurationAge} <span className="text-xs font-normal text-slate-400">歳</span>
          </span>
        );
    }
  };

  const renderSubValue = (item: UniqueLeaderRankingItem) => {
    switch (currentMetric) {
      case 'height':
        return item.heightSource ? (
          <span className="hidden sm:inline-block text-[10px] text-slate-400 truncate max-w-[180px]" title={item.heightSource}>
            {item.heightSource}
          </span>
        ) : null;
      case 'weight':
        return item.weightSource ? (
          <span className="hidden sm:inline-block text-[10px] text-slate-400 truncate max-w-[180px]" title={item.weightSource}>
            {item.weightSource}
          </span>
        ) : null;
      case 'reign_long':
      case 'reign_short':
        return (
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium shrink-0">
            約 {(item.totalReignDays / 365.25).toFixed(1)} {t.leaderCard.years}
          </span>
        );
      case 'age_young':
        return item.termCount > 1 ? (
          <span className="text-[10px] sm:text-xs text-slate-400 shrink-0">
            {language === 'ja' ? '初就任時' : '1st Term'}
          </span>
        ) : null;
      case 'age_old':
        return item.termCount > 1 ? (
          <span className="text-[10px] sm:text-xs text-slate-400 shrink-0">
            {language === 'ja' ? '最高齢時' : 'Oldest'}
          </span>
        ) : null;
    }
  };

  const getBarPercentage = (item: UniqueLeaderRankingItem) => {
    let val = 0;
    switch (currentMetric) {
      case 'height':
        val = item.heightCm || 0;
        break;
      case 'weight':
        val = item.weightKg || 0;
        break;
      case 'reign_long':
      case 'reign_short':
        val = item.totalReignDays;
        break;
      case 'age_young':
        val = item.youngestInaugurationAge || 0;
        break;
      case 'age_old':
        val = item.oldestInaugurationAge || 0;
        break;
    }
    return Math.min(100, Math.max(15, (val / maxVal) * 100));
  };

  const formatTermBadge = (item: UniqueLeaderRankingItem) => {
    if (item.category === 'japan_prime_minister') {
      if (item.allTerms.length === 1) {
        return `第${item.allTerms[0]}代`;
      }
      return `第${item.allTerms.join('・')}代 (${language === 'ja' ? `通算${item.termCount}期` : `${item.termCount} terms`})`;
    } else if (item.category === 'us_president') {
      if (item.allTerms.length === 1) {
        return `第${item.allTerms[0]}代`;
      }
      return `第${item.allTerms.join('・')}代`;
    } else {
      return `第${item.allTerms[0]}代将軍`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            {t.rankings.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.rankings.subtitle}（{language === 'ja' ? '各人物をユニーク集計して掲載' : 'Aggregated by unique individual'}）
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ja' ? '全指導者' : 'All Leaders'}
          </button>
          <button
            onClick={() => onSelectCategory('japan_prime_minister')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'japan_prime_minister'
                ? 'bg-red-500 text-white border-red-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.categories.japan_prime_minister}
          </button>
          <button
            onClick={() => onSelectCategory('us_president')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'us_president'
                ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.categories.us_president}
          </button>
          <button
            onClick={() => onSelectCategory('tokugawa_shogun')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'tokugawa_shogun'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {t.categories.tokugawa_shogun}
          </button>
        </div>
      </div>

      {/* Metric Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {metricTabs.map((tab) => {
          const isActive = currentMetric === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentMetric(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition border whitespace-nowrap ${
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
          {rankingList.map((item, index) => {
            const rank = index + 1;
            const colors = getCategoryBadgeColor(item.category);
            const isTop3 = rank <= 3;

            return (
              <div
                key={item.id}
                onClick={() => onSelectLeader(item.representativeLeader)}
                className="p-3.5 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition group"
              >
                {/* Rank Badge */}
                <div className={`w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-sm ${
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
                <LeaderAvatar leader={item.representativeLeader} language={language} size="sm" className="shrink-0 w-10 h-10 sm:w-12 sm:h-12" />

                {/* Leader Info & Visual Bar */}
                <div className="flex-1 min-w-0 space-y-1">
                  {/* Line 1: Leader Full Name (Left) & Primary Value (Right) */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition truncate tracking-tight">
                      {language === 'ja' ? item.nameJa : item.nameEn}
                    </h3>
                    <div className="text-right font-black text-[15px] sm:text-lg text-slate-900 dark:text-white shrink-0">
                      {renderPrimaryValue(item)}
                    </div>
                  </div>

                  {/* Line 2: Badges (Left) & Secondary Sub-Info (Right) */}
                  <div className="flex items-center justify-between gap-2 text-xs min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shrink-0 ${colors.badgeBg}`}>
                        {formatTermBadge(item)}
                      </span>
                      {item.representativeLeader.eraNameJa && (
                        <span className="text-[11px] text-slate-400 truncate">
                          ({language === 'ja' ? item.representativeLeader.eraNameJa : item.representativeLeader.eraNameEn})
                        </span>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      {renderSubValue(item)}
                    </div>
                  </div>

                  {/* Line 3: Horizontal Bar Chart Progress */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 sm:h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop3 ? colors.accent : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                      style={{ width: `${getBarPercentage(item)}%` }}
                    />
                  </div>
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
