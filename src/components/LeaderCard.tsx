import React from 'react';
import { Leader, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import { 
  Calendar, 
  Ruler, 
  Weight, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LeaderCardProps {
  leader: Leader;
  language: Language;
  onSelect: (leader: Leader) => void;
  isCompared: boolean;
  onToggleCompare: (leader: Leader) => void;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  leader,
  language,
  onSelect,
  isCompared,
  onToggleCompare,
}) => {
  const t = translations[language];
  const colors = getCategoryBadgeColor(leader.category);

  const formatReignYears = (days: number) => {
    const years = (days / 365.25).toFixed(1);
    return `${years} ${t.leaderCard.years}`;
  };

  const getCategoryLabel = () => {
    switch (leader.category) {
      case 'tokugawa_shogun':
        return t.categories.tokugawa_short;
      case 'japan_prime_minister':
        return t.categories.japan_pm_short;
      case 'us_president':
        return t.categories.us_pres_short;
    }
  };

  return (
    <div className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 ${
      isCompared ? 'ring-2 ring-amber-500 dark:ring-amber-400' : ''
    }`}>
      {/* Top Accent Strip */}
      <div className={`h-1.5 w-full ${colors.accent}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Badges & Compare Toggle */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.badgeBg}`}>
              {getCategoryLabel()} {leader.termDisplayJa && language === 'ja' ? leader.termDisplayJa : `${t.leaderCard.orderPrefix}${leader.order}${t.leaderCard.orderSuffix}`}
            </span>
            {leader.eraNameJa && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {language === 'ja' ? leader.eraNameJa : leader.eraNameEn || leader.eraNameJa}
              </span>
            )}
          </div>

          {/* Quick Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(leader);
            }}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              isCompared
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={isCompared ? t.leaderCard.removeFromCompare : t.leaderCard.addToCompare}
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Profile Info: Avatar + Name */}
        <div className="flex items-start gap-3.5 mb-4">
          <LeaderAvatar leader={leader} language={language} size="md" />

          <div className="flex-1 min-w-0">
            {language === 'ja' ? (
              <>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wider break-words leading-tight mb-0.5">
                  {leader.nameRuby}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide break-words leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {leader.nameJa}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-words leading-tight mt-0.5">
                  {leader.nameEn}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide break-words leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {leader.nameEn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 break-words leading-tight mt-0.5">
                  {leader.nameJa} ({leader.nameRuby})
                </p>
              </>
            )}

            {/* Party or Faction */}
            {(leader.partyOrFactionJa || leader.partyOrFactionEn) && (
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 break-words flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"></span>
                <span>{language === 'ja' ? leader.partyOrFactionJa : leader.partyOrFactionEn}</span>
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats Grid (Reign & Physical) */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs mb-3.5">
          {/* Term / Days */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">
              {leader.reignEnd === '現職' || leader.reignEnd === 'Present' ? (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t.leaderCard.currentInOffice}</span>
              ) : (
                <span className="font-medium">{formatReignYears(leader.reignDays)}</span>
              )}
            </span>
          </div>

          {/* Physical Stats Badge */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Ruler className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {leader.physicalStats.heightCm ? (
              <span className="font-medium">
                {leader.physicalStats.heightCm} cm
                {leader.physicalStats.weightKg && (
                  <span className="text-slate-400 ml-1">/ {leader.physicalStats.weightKg} kg</span>
                )}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 italic truncate">
                {t.leaderCard.noPhysicalData}
              </span>
            )}
          </div>
        </div>

        {/* Key Achievements preview */}
        <div className="flex-1 mb-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {language === 'ja' ? leader.summaryJa : leader.summaryEn}
          </p>
        </div>

        {/* Duality Badges (Positive & Negative Highlights count) */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>{leader.positiveAspects.length} 功績/評価</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
            <AlertCircle className="w-3 h-3" />
            <span>{leader.negativeAspects.length} 批判/課題</span>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <button
        onClick={() => onSelect(leader)}
        className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-between border-t border-slate-100 dark:border-slate-800 transition group/btn"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {t.leaderCard.viewDetails}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 transition" />
      </button>
    </div>
  );
};
