import React, { useState, useMemo } from 'react';
import { Leader, LeaderCategory, Language, FilterOptions } from '../types';
import { translations } from '../i18n/translations';
import { LeaderCard } from './LeaderCard';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Ruler, 
  X, 
  UserX,
  Sparkles
} from 'lucide-react';

interface LeaderGridProps {
  leaders: Leader[];
  language: Language;
  selectedCategory: LeaderCategory | 'all';
  onSelectLeader: (leader: Leader) => void;
  comparedLeaderIds: string[];
  onToggleCompare: (leader: Leader) => void;
}

export const LeaderGrid: React.FC<LeaderGridProps> = ({
  leaders,
  language,
  selectedCategory,
  onSelectLeader,
  comparedLeaderIds,
  onToggleCompare,
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'order' | 'reign' | 'height' | 'weight' | 'age'>('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [physicalOnly, setPhysicalOnly] = useState(false);

  // Filter & Sort Logic
  const filteredAndSortedLeaders = useMemo(() => {
    let list = [...leaders];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((l) => l.category === selectedCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((l) => {
        const nameJa = l.nameJa.toLowerCase();
        const nameRuby = l.nameRuby.toLowerCase();
        const nameEn = l.nameEn.toLowerCase();
        const summaryJa = l.summaryJa.toLowerCase();
        const summaryEn = l.summaryEn.toLowerCase();
        const eraJa = (l.eraNameJa || '').toLowerCase();
        const partyJa = (l.partyOrFactionJa || '').toLowerCase();
        const achievements = (language === 'ja' ? l.keyAchievementsJa : l.keyAchievementsEn).join(' ').toLowerCase();

        return (
          nameJa.includes(q) ||
          nameRuby.includes(q) ||
          nameEn.includes(q) ||
          summaryJa.includes(q) ||
          summaryEn.includes(q) ||
          eraJa.includes(q) ||
          partyJa.includes(q) ||
          achievements.includes(q)
        );
      });
    }

    // 3. Physical Data Only Toggle
    if (physicalOnly) {
      list = list.filter((l) => l.physicalStats.heightCm !== undefined || l.physicalStats.weightKg !== undefined);
    }

    // 4. Sorting
    list.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'order':
          // If different categories, order category then order number
          if (a.category !== b.category) {
            comparison = a.category.localeCompare(b.category);
          } else {
            comparison = a.order - b.order;
          }
          break;
        case 'reign':
          comparison = a.reignDays - b.reignDays;
          break;
        case 'height':
          comparison = (a.physicalStats.heightCm || 0) - (b.physicalStats.heightCm || 0);
          break;
        case 'weight':
          comparison = (a.physicalStats.weightKg || 0) - (b.physicalStats.weightKg || 0);
          break;
        case 'age':
          comparison = (a.inaugurationAge || 0) - (b.inaugurationAge || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return list;
  }, [leaders, selectedCategory, searchQuery, sortBy, sortOrder, physicalOnly, language]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('order');
    setSortOrder('asc');
    setPhysicalOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.filter.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="sort-select" className="text-slate-500 font-medium">{t.filter.sortBy}:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  if (e.target.value === 'reign' || e.target.value === 'height' || e.target.value === 'weight') {
                    setSortOrder('desc'); // default to highest/longest for stats
                  } else {
                    setSortOrder('asc');
                  }
                }}
                className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="order">{language === 'ja' ? '代数・就任順' : 'Order'}</option>
                <option value="reign">{language === 'ja' ? '在任期間' : 'Term Length'}</option>
                <option value="height">{t.leaderCard.height}</option>
                <option value="weight">{t.leaderCard.weight}</option>
                <option value="age">{language === 'ja' ? '就任時年齢' : 'Inauguration Age'}</option>
              </select>
            </div>

            {/* Asc / Desc Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition"
            >
              {sortOrder === 'asc' ? (language === 'ja' ? '昇順 ▲' : 'Asc ▲') : (language === 'ja' ? '降順 ▼' : 'Desc ▼')}
            </button>

            {/* Physical Records Only Toggle */}
            <button
              onClick={() => setPhysicalOnly(!physicalOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition ${
                physicalOnly
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{t.filter.hasPhysicalOnly}</span>
            </button>
          </div>

          {/* Results Count & Reset */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              {filteredAndSortedLeaders.length} {t.filter.foundCount}
            </span>

            {(searchQuery || sortBy !== 'order' || sortOrder !== 'asc' || physicalOnly) && (
              <button
                onClick={handleResetFilters}
                className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                {t.filter.clearFilter}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Leaders (1 col mobile, 2 cols tablet, 3 cols desktop for optimal full-name readability) */}
      {filteredAndSortedLeaders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredAndSortedLeaders.map((leader) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              language={language}
              onSelect={onSelectLeader}
              isCompared={comparedLeaderIds.includes(leader.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <UserX className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            {language === 'ja' ? '条件に一致する指導者が見つかりませんでした' : 'No leaders matched your search'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-sm mx-auto">
            {language === 'ja' 
              ? '検索キーワードを変更するか、フィルタ条件をリセットしてお試しください。' 
              : 'Try modifying your search keywords or resetting your filter criteria.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm"
          >
            {t.filter.clearFilter}
          </button>
        </div>
      )}
    </div>
  );
};
