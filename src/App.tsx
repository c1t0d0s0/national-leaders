import React, { useState, useEffect } from 'react';
import { Leader, LeaderCategory, ViewMode, Language } from './types';
import { allLeaders, getLeadersByCategory } from './data';
import { detectBrowserLanguage, translations } from './i18n/translations';
import { Header } from './components/Header';
import { LeaderGrid } from './components/LeaderGrid';
import { LeaderDetailModal } from './components/LeaderDetailModal';
import { LeaderComparator } from './components/LeaderComparator';
import { RankingsView } from './components/RankingsView';
import { TimelineView } from './components/TimelineView';
import { QuizView } from './components/QuizView';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // 1. Language state: auto-detect browser language or read localStorage
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nl_language') as Language;
    if (saved === 'ja' || saved === 'en') return saved;
    return detectBrowserLanguage();
  });

  // 2. Dark Mode state: Default to light theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nl_dark_mode');
    if (saved !== null) return saved === 'true';
    return false; // Default to light theme
  });

  // Apply dark mode class to documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nl_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Save language preference
  const toggleLanguage = () => {
    const nextLang = language === 'ja' ? 'en' : 'ja';
    setLanguage(nextLang);
    localStorage.setItem('nl_language', nextLang);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 3. Navigation & Category States
  const [currentCategory, setCurrentCategory] = useState<LeaderCategory | 'all'>('all');
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  // 4. Comparison State (Max 3 leaders)
  const [comparedLeaderIds, setComparedLeaderIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleCompare = (leader: Leader) => {
    if (comparedLeaderIds.includes(leader.id)) {
      setComparedLeaderIds((prev) => prev.filter((id) => id !== leader.id));
    } else {
      if (comparedLeaderIds.length >= 3) {
        showToast(translations[language].leaderCard.compareLimitReached);
        return;
      }
      setComparedLeaderIds((prev) => [...prev, leader.id]);
    }
  };

  const handleRemoveComparedLeader = (id: string) => {
    setComparedLeaderIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAllCompared = () => {
    setComparedLeaderIds([]);
  };

  const comparedLeaders = allLeaders.filter((l) => comparedLeaderIds.includes(l.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 px-4 py-2.5 rounded-2xl bg-amber-600 text-white text-xs font-bold shadow-xl animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        currentView={currentView}
        onSelectView={setCurrentView}
        language={language}
        onToggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        compareCount={comparedLeaderIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'grid' && (
          <LeaderGrid
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectLeader={setSelectedLeader}
            comparedLeaderIds={comparedLeaderIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentView === 'timeline' && (
          <TimelineView
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            onSelectLeader={setSelectedLeader}
          />
        )}

        {currentView === 'compare' && (
          <LeaderComparator
            comparedLeaders={comparedLeaders}
            language={language}
            onRemoveLeader={handleRemoveComparedLeader}
            onClearAll={handleClearAllCompared}
            onSelectLeader={setSelectedLeader}
            onNavigateToExplorer={() => setCurrentView('grid')}
          />
        )}

        {currentView === 'rankings' && (
          <RankingsView
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            onSelectLeader={setSelectedLeader}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            language={language}
            onSelectLeader={setSelectedLeader}
          />
        )}
      </main>

      {/* Detailed Modal */}
      <LeaderDetailModal
        leader={selectedLeader}
        language={language}
        onClose={() => setSelectedLeader(null)}
        isCompared={selectedLeader ? comparedLeaderIds.includes(selectedLeader.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Footer */}
      <Footer language={language} />

      {/* Sticky Bottom Navigation for Mobile */}
      <MobileNav
        currentView={currentView}
        onSelectView={setCurrentView}
        language={language}
        compareCount={comparedLeaderIds.length}
      />
    </div>
  );
};

export default App;
