import React from 'react';
import { LeaderCategory, ViewMode, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Landmark, 
  Layers, 
  GitCompare, 
  BarChart3, 
  HelpCircle, 
  Sun, 
  Moon, 
  Globe, 
  Clock, 
  ShieldCheck,
  Crown,
  Building2,
  Flag
} from 'lucide-react';

interface HeaderProps {
  currentCategory: LeaderCategory | 'all';
  onSelectCategory: (cat: LeaderCategory | 'all') => void;
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  language: Language;
  onToggleLanguage: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  compareCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  currentView,
  onSelectView,
  language,
  onToggleLanguage,
  isDarkMode,
  onToggleDarkMode,
  compareCount,
}) => {
  const t = translations[language];

  const categories: { id: LeaderCategory | 'all'; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'all', label: t.categories.all, icon: <Layers className="w-4 h-4" />, color: 'hover:border-slate-400' },
    { id: 'tokugawa_shogun', label: t.categories.tokugawa_shogun, icon: <Crown className="w-4 h-4 text-amber-500" />, color: 'hover:border-amber-500' },
    { id: 'japan_prime_minister', label: t.categories.japan_prime_minister, icon: <Building2 className="w-4 h-4 text-rose-500" />, color: 'hover:border-rose-500' },
    { id: 'us_president', label: t.categories.us_president, icon: <Flag className="w-4 h-4 text-blue-500" />, color: 'hover:border-blue-500' },
  ];

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'grid', label: t.nav.explorer, icon: <Landmark className="w-4 h-4" /> },
    { id: 'timeline', label: t.nav.timeline, icon: <Clock className="w-4 h-4" /> },
    { id: 'compare', label: t.nav.compare, icon: <GitCompare className="w-4 h-4" />, badge: compareCount },
    { id: 'rankings', label: t.nav.rankings, icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'quiz', label: t.nav.quiz, icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-amber-600 via-rose-600 to-blue-600 rounded-xl text-white shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                  {t.app.title}
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  {t.app.badge}
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate max-w-md">
                {t.app.subtitle}
              </p>
            </div>
          </div>

          {/* Right actions (i18n & Theme) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switch button */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
              title="Switch language / 言語切替"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{language === 'ja' ? 'English' : '日本語'}</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-sm"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Navigation & Category Bar */}
        <div className="pb-3 flex flex-col gap-2.5">
          {/* Main Views Navigation (Desktop / Tablet) */}
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
            <nav className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap relative ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-amber-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Category Filter Pills (Shown when in Grid or Timeline view) */}
          {(currentView === 'grid' || currentView === 'timeline' || currentView === 'rankings') && (
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {categories.map((cat) => {
                const isSelected = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition whitespace-nowrap border ${
                      isSelected
                        ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-sm'
                        : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    } ${cat.color}`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
