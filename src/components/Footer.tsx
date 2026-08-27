import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-colors pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.footer.builtFor}
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              {t.footer.dataIntegrity}
            </p>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 max-w-md">
            <p>{t.footer.sourcesText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
