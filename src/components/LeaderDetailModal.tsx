import React, { useState, useEffect } from 'react';
import { Leader, Language } from '../types';
import { translations } from '../i18n/translations';
import { LeaderAvatar } from './LeaderAvatar';
import { getCategoryBadgeColor } from '../data';
import {
  X,
  Calendar,
  Ruler,
  Weight,
  Award,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  MapPin,
  Clock,
  ExternalLink,
  ShieldAlert,
  GitCompare,
  Plus,
  Check,
  History,
  Sparkles,
  Info
} from 'lucide-react';

interface LeaderDetailModalProps {
  leader: Leader | null;
  language: Language;
  onClose: () => void;
  isCompared: boolean;
  onToggleCompare: (leader: Leader) => void;
}

type TabType = 'profile' | 'achievements' | 'duality' | 'timeline' | 'sources';

export const LeaderDetailModal: React.FC<LeaderDetailModalProps> = ({
  leader,
  language,
  onClose,
  isCompared,
  onToggleCompare,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const t = translations[language];

  // Handle ESC key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!leader) return null;

  const colors = getCategoryBadgeColor(leader.category);

  const getCategoryLabel = () => {
    switch (leader.category) {
      case 'tokugawa_shogun':
        return t.categories.tokugawa_shogun;
      case 'japan_prime_minister':
        return t.categories.japan_prime_minister;
      case 'us_president':
        return t.categories.us_president;
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: t.modal.tabs.profile, icon: <Info className="w-4 h-4" /> },
    { id: 'achievements', label: t.modal.tabs.achievements, icon: <Award className="w-4 h-4" /> },
    { id: 'duality', label: t.modal.tabs.evaluation, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'timeline', label: t.modal.tabs.events, icon: <History className="w-4 h-4" /> },
    { id: 'sources', label: t.modal.tabs.sources, icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Banner */}
        <div className={`relative p-6 bg-gradient-to-r ${colors.bg} border-b border-slate-200 dark:border-slate-800`}>
          {/* Close & Compare Floating Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(leader)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition ${
                isCompared
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isCompared ? t.leaderCard.removeFromCompare : t.leaderCard.addToCompare}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Leader Hero Profile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
            <LeaderAvatar leader={leader} language={language} size="lg" className="shadow-lg shrink-0" />

            <div className="flex-1 text-center sm:text-left">
              {/* Category & Order Badge */}
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1.5">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${colors.badgeBg}`}>
                  {getCategoryLabel()} {leader.termDisplayJa && language === 'ja' ? leader.termDisplayJa : `${t.leaderCard.orderPrefix}${leader.order}${t.leaderCard.orderSuffix}`}
                </span>
                {leader.eraNameJa && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {language === 'ja' ? leader.eraNameJa : leader.eraNameEn || leader.eraNameJa}
                  </span>
                )}
              </div>

              {/* Names */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
                {language === 'ja' ? leader.nameJa : leader.nameEn}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'ja' ? `${leader.nameRuby} / ${leader.nameEn}` : `${leader.nameJa} (${leader.nameRuby})`}
              </p>

              {/* Image Attribution */}
              {(leader.imageCaptionJa || leader.imageCaptionEn) && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 italic">
                  📷 {language === 'ja' ? leader.imageCaptionJa : leader.imageCaptionEn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-4 sm:px-6 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Profile & Physical */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Summary description */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  {language === 'ja' ? '人物概要' : 'Executive Summary'}
                </h4>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                  {language === 'ja' ? leader.summaryJa : leader.summaryEn}
                </p>
              </div>

              {/* Basic Facts Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
                {/* Lifespan */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-sm">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block mb-0.5">{t.modal.lifespan}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {leader.birthDate} 〜 {leader.deathDate || (leader.reignEnd === '現職' ? '生存中' : '現職')}
                    </span>
                    {leader.deathAge && (
                      <span className="block text-[11px] text-slate-500">
                        {t.modal.deathAge}: {leader.deathAge} 歳
                      </span>
                    )}
                  </div>
                </div>

                {/* Term in Office */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-sm">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block mb-0.5">{t.modal.reignPeriod}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {leader.reignStart} 〜 {leader.reignEnd}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {t.modal.reignDuration}: {leader.reignDays.toLocaleString()} {t.leaderCard.days}
                    </span>
                  </div>
                </div>

                {/* Birthplace */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-sm">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block mb-0.5">{t.modal.birthplace}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {language === 'ja' ? leader.birthPlaceJa || '記録なし' : leader.birthPlaceEn || 'Unrecorded'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Stats Section (With Academic Citations & Measurement Basis) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 via-slate-50 to-blue-500/5 dark:from-amber-950/20 dark:via-slate-850 dark:to-blue-950/20 border border-amber-500/20 dark:border-amber-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Ruler className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.modal.physicalSectionTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Height Box */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="text-xs text-slate-400 block mb-1">{t.leaderCard.height}</span>
                    {leader.physicalStats.heightCm ? (
                      <div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                          {leader.physicalStats.heightCm} <span className="text-sm font-normal text-slate-500">cm</span>
                        </div>
                        {leader.physicalStats.heightNoteJa && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            {language === 'ja' ? leader.physicalStats.heightNoteJa : leader.physicalStats.heightNoteEn}
                          </p>
                        )}
                        {leader.physicalStats.heightSource && (
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2 font-medium bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800/60">
                            📖 {t.modal.measurementBasis} {leader.physicalStats.heightSource}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        {t.leaderCard.noPhysicalData}（推測排除のため非掲載）
                      </p>
                    )}
                  </div>

                  {/* Weight Box */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="text-xs text-slate-400 block mb-1">{t.leaderCard.weight}</span>
                    {leader.physicalStats.weightKg ? (
                      <div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                          {leader.physicalStats.weightKg} <span className="text-sm font-normal text-slate-500">kg</span>
                        </div>
                        {leader.physicalStats.weightNoteJa && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            {language === 'ja' ? leader.physicalStats.weightNoteJa : leader.physicalStats.weightNoteEn}
                          </p>
                        )}
                        {leader.physicalStats.weightSource && (
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-2 font-medium bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-800/60">
                            📖 {t.modal.measurementBasis} {leader.physicalStats.weightSource}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        {t.leaderCard.noPhysicalData}（推測排除のため非掲載）
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.modal.physicalNoteNotice}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Key Achievements */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                {language === 'ja' ? '在任中の主な功績・重要施策' : 'Key Accomplishments & Landmark Policies'}
              </h3>

              <div className="space-y-3">
                {(language === 'ja' ? leader.keyAchievementsJa : leader.keyAchievementsEn).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3.5 shadow-sm"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Light & Shadow (Duality) */}
          {activeTab === 'duality' && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                💡 <strong>{language === 'ja' ? '客観的両面評価' : 'Objective Historical Duality'}</strong>: {language === 'ja' 
                  ? '歴史的指導者の評価は単一的ではありません。一次史料・学術研究に基づき、功績と課題の両面を中立に記載しています。' 
                  : 'Historical leadership is multifaceted. Both accomplishments and criticisms are objectively documented based on archival consensus.'}
              </div>

              {/* Positive Aspects */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.modal.positiveTitle}
                </h4>

                <div className="space-y-3">
                  {leader.positiveAspects.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60"
                    >
                      <h5 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1.5">
                        {language === 'ja' ? item.titleJa : item.titleEn}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                        {language === 'ja' ? item.descriptionJa : item.descriptionEn}
                      </p>
                      {item.source && (
                        <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                          📚 根拠・出典: {item.source}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative Aspects */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {t.modal.negativeTitle}
                </h4>

                <div className="space-y-3">
                  {leader.negativeAspects.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60"
                    >
                      <h5 className="text-sm font-bold text-rose-900 dark:text-rose-200 mb-1.5">
                        {language === 'ja' ? item.titleJa : item.titleEn}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                        {language === 'ja' ? item.descriptionJa : item.descriptionEn}
                      </p>
                      {item.source && (
                        <p className="text-[11px] text-rose-800 dark:text-rose-400 font-medium">
                          📚 根拠・出典: {item.source}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-4 h-4 text-blue-500" />
                {language === 'ja' ? '生涯と主要歴史事件の年表' : 'Chronological Events'}
              </h3>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-5 py-2">
                {leader.keyEvents.map((evt, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Circle Bullet */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-2 border-white dark:border-slate-900 shadow-sm" />

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 mb-1">
                        {evt.year}年
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        {language === 'ja' ? evt.titleJa : evt.titleEn}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {language === 'ja' ? evt.descriptionJa : evt.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Sources & Citations */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                {language === 'ja' ? '参照した公的記録・学術文献一覧' : 'Academic & Archival References'}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.modal.sourceDisclaimer}
              </p>

              <div className="space-y-2.5">
                {leader.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        {src.title}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {src.sourceType}
                      </span>
                    </div>

                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onToggleCompare(leader)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition ${
              isCompared
                ? 'bg-amber-500 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? t.leaderCard.removeFromCompare : t.leaderCard.addToCompare}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm"
          >
            {t.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
