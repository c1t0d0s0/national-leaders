import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Landmark, 
  Clock, 
  GitCompare, 
  BarChart3, 
  HelpCircle 
} from 'lucide-react';

interface MobileNavProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  language: Language;
  compareCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onSelectView,
  language,
  compareCount,
}) => {
  const t = translations[language];

  const items: { id: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'grid', label: t.nav.explorer, icon: <Landmark className="w-5 h-5" /> },
    { id: 'timeline', label: t.nav.timeline, icon: <Clock className="w-5 h-5" /> },
    { id: 'compare', label: t.nav.compare, icon: <GitCompare className="w-5 h-5" />, badge: compareCount },
    { id: 'rankings', label: t.nav.rankings, icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'quiz', label: t.nav.quiz, icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-2 safe-area-pb shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition relative min-w-[56px] ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-500 text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
