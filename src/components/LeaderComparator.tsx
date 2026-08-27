import React from 'react';
import { Leader, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import { 
  GitCompare, 
  Trash2, 
  Plus, 
  Ruler, 
  Weight, 
  Calendar, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';

interface LeaderComparatorProps {
  comparedLeaders: Leader[];
  language: Language;
  onRemoveLeader: (leaderId: string) => void;
  onClearAll: () => void;
  onSelectLeader: (leader: Leader) => void;
  onNavigateToExplorer: () => void;
}

export const LeaderComparator: React.FC<LeaderComparatorProps> = ({
  comparedLeaders,
  language,
  onRemoveLeader,
  onClearAll,
  onSelectLeader,
  onNavigateToExplorer,
}) => {
  const t = translations[language];

  if (comparedLeaders.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <GitCompare className="w-14 h-14 text-amber-500/60 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
          {t.compare.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {t.compare.emptyPrompt}
        </p>
        <button
          onClick={onNavigateToExplorer}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition"
        >
          <span>{language === 'ja' ? '指導者一覧へ戻って追加する' : 'Go to Leaders Explorer to Add'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'tokugawa_shogun':
        return t.categories.tokugawa_short;
      case 'japan_prime_minister':
        return t.categories.japan_pm_short;
      case 'us_president':
        return t.categories.us_pres_short;
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with clear button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif">
            {t.compare.title} ({comparedLeaders.length}/3)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.compare.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {comparedLeaders.length < 3 && (
            <button
              onClick={onNavigateToExplorer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 hover:bg-amber-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'ja' ? 'さらに追加' : 'Add More'}</span>
            </button>
          )}

          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/60 dark:hover:text-rose-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.compare.clearAll}</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid Matrix */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[700px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Leaders Header Row */}
          <div className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 divide-x divide-slate-200 dark:divide-slate-800">
            <div className="p-4 flex items-center font-bold text-xs uppercase tracking-wider text-slate-400">
              {t.compare.metric}
            </div>

            {comparedLeaders.map((leader) => {
              const colors = getCategoryBadgeColor(leader.category);
              return (
                <div key={leader.id} className="p-5 flex flex-col items-center text-center relative group">
                  <button
                    onClick={() => onRemoveLeader(leader.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <LeaderAvatar leader={leader} language={language} size="md" className="mb-2 shadow-md" />
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border mb-1 ${colors.badgeBg}`}>
                    {getCategoryLabel(leader.category)} #{leader.order}
                  </span>
                  <h3 
                    onClick={() => onSelectLeader(leader)}
                    className="text-base font-bold text-slate-900 dark:text-white font-serif hover:text-amber-600 cursor-pointer transition"
                  >
                    {language === 'ja' ? leader.nameJa : leader.nameEn}
                  </h3>
                  <p className="text-[11px] text-slate-400">{leader.birthDate.slice(0, 4)} 〜 {leader.deathDate ? leader.deathDate.slice(0, 4) : (leader.reignEnd === '現職' ? 'Present' : '')}</p>
                </div>
              );
            })}

            {/* Empty slots placeholders */}
            {Array.from({ length: 3 - comparedLeaders.length }).map((_, idx) => (
              <div key={idx} className="p-8 flex flex-col items-center justify-center text-center border-dashed border-slate-200 dark:border-slate-800">
                <button
                  onClick={onNavigateToExplorer}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-400 hover:text-amber-600 hover:border-amber-500 transition"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-xs font-semibold">{language === 'ja' ? '指導者を追加' : 'Add Leader'}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Row: Physical Height */}
          <div className="grid grid-cols-4 border-b border-slate-100 dark:border-slate-800 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-slate-50/30 dark:bg-slate-900/30">
              <Ruler className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.compare.height}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 flex flex-col justify-center">
                {leader.physicalStats.heightCm ? (
                  <div>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {leader.physicalStats.heightCm} cm
                    </span>
                    {leader.physicalStats.heightNoteJa && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {language === 'ja' ? leader.physicalStats.heightNoteJa : leader.physicalStats.heightNoteEn}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">{t.leaderCard.noPhysicalData}</span>
                )}
              </div>
            ))}
          </div>

          {/* Row: Physical Weight */}
          <div className="grid grid-cols-4 border-b border-slate-100 dark:border-slate-800 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-slate-50/30 dark:bg-slate-900/30">
              <Weight className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.compare.weight}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 flex flex-col justify-center">
                {leader.physicalStats.weightKg ? (
                  <div>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {leader.physicalStats.weightKg} kg
                    </span>
                    {leader.physicalStats.weightNoteJa && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {language === 'ja' ? leader.physicalStats.weightNoteJa : leader.physicalStats.weightNoteEn}
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">{t.leaderCard.noPhysicalData}</span>
                )}
              </div>
            ))}
          </div>

          {/* Row: Term Length */}
          <div className="grid grid-cols-4 border-b border-slate-100 dark:border-slate-800 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-slate-50/30 dark:bg-slate-900/30">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.compare.reignLength}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 flex flex-col justify-center">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {leader.reignDays.toLocaleString()} {t.leaderCard.days} ({(leader.reignDays / 365.25).toFixed(1)} {t.leaderCard.years})
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {leader.reignStart} 〜 {leader.reignEnd}
                </span>
              </div>
            ))}
          </div>

          {/* Row: Key Achievements */}
          <div className="grid grid-cols-4 border-b border-slate-100 dark:border-slate-800 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-slate-50/30 dark:bg-slate-900/30">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.compare.keyAchievements}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 space-y-1.5">
                {(language === 'ja' ? leader.keyAchievementsJa : leader.keyAchievementsEn).slice(0, 3).map((ach, idx) => (
                  <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    • {ach}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Row: Positive Aspects */}
          <div className="grid grid-cols-4 border-b border-slate-100 dark:border-slate-800 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/20 dark:bg-emerald-950/10">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.compare.positiveHighlights}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 space-y-2 bg-emerald-50/10 dark:bg-emerald-950/5">
                {leader.positiveAspects.map((pos, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                    <strong className="block text-emerald-900 dark:text-emerald-300 text-[11px] mb-0.5">
                      {language === 'ja' ? pos.titleJa : pos.titleEn}
                    </strong>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {language === 'ja' ? pos.descriptionJa : pos.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row: Negative Aspects */}
          <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="p-4 font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5 bg-rose-50/20 dark:bg-rose-950/10">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.compare.negativeHighlights}</span>
            </div>
            {comparedLeaders.map((leader) => (
              <div key={leader.id} className="p-4 space-y-2 bg-rose-50/10 dark:bg-rose-950/5">
                {leader.negativeAspects.map((neg, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/40">
                    <strong className="block text-rose-900 dark:text-rose-300 text-[11px] mb-0.5">
                      {language === 'ja' ? neg.titleJa : neg.titleEn}
                    </strong>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {language === 'ja' ? neg.descriptionJa : neg.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
