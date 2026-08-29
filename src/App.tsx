import React, { useState, useEffect, useCallback, useRef } from 'react';
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

type TabType = 'profile' | 'achievements' | 'duality' | 'timeline' | 'sources';

interface ParsedRoute {
  view: ViewMode;
  category: LeaderCategory | 'all';
  leaderId: string | null;
  tab?: TabType;
  compareIds?: string[];
}

function parseUrlHash(hash: string): ParsedRoute {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) {
    return { view: 'grid', category: 'all', leaderId: null };
  }

  const [path, queryString] = clean.split('?');
  const segments = path.split('/').filter(Boolean);
  const params = new URLSearchParams(queryString || '');

  // 1. Direct Leader modal deep link: #/leader/:id or #/leader/:id/:tab
  if (segments[0] === 'leader' && segments[1]) {
    const validTabs: TabType[] = ['profile', 'achievements', 'duality', 'timeline', 'sources'];
    const requestedTab = segments[2] as TabType;
    return {
      view: 'grid',
      category: 'all',
      leaderId: segments[1],
      tab: validTabs.includes(requestedTab) ? requestedTab : undefined,
    };
  }

  // 2. View routes
  const viewMap: Record<string, ViewMode> = {
    grid: 'grid',
    explorer: 'grid',
    timeline: 'timeline',
    time: 'timeline',
    compare: 'compare',
    comparison: 'compare',
    rankings: 'rankings',
    ranking: 'rankings',
    stats: 'rankings',
    quiz: 'quiz',
  };

  const first = segments[0]?.toLowerCase();
  if (viewMap[first]) {
    const view = viewMap[first];
    let category: LeaderCategory | 'all' = 'all';
    const validCategories: LeaderCategory[] = ['tokugawa_shogun', 'japan_prime_minister', 'us_president'];
    
    if (segments[1] && validCategories.includes(segments[1] as LeaderCategory)) {
      category = segments[1] as LeaderCategory;
    } else if (params.get('category') && validCategories.includes(params.get('category') as LeaderCategory)) {
      category = params.get('category') as LeaderCategory;
    }

    let compareIds: string[] | undefined;
    if (view === 'compare') {
      const idsParam = params.get('ids') || (segments[1] && !validCategories.includes(segments[1] as LeaderCategory) ? segments[1] : undefined);
      if (idsParam) {
        compareIds = idsParam.split(',').filter(Boolean);
      }
    }

    return {
      view,
      category,
      leaderId: null,
      compareIds,
    };
  }

  // 3. Category deep links: #/category/tokugawa_shogun or #/tokugawa_shogun
  const categoryAlias: Record<string, LeaderCategory> = {
    tokugawa: 'tokugawa_shogun',
    tokugawa_shogun: 'tokugawa_shogun',
    shogun: 'tokugawa_shogun',
    japan: 'japan_prime_minister',
    japan_prime_minister: 'japan_prime_minister',
    pm: 'japan_prime_minister',
    us: 'us_president',
    us_president: 'us_president',
    president: 'us_president',
  };

  if (first === 'category' && segments[1] && categoryAlias[segments[1]]) {
    return { view: 'grid', category: categoryAlias[segments[1]], leaderId: null };
  }
  if (categoryAlias[first]) {
    return { view: 'grid', category: categoryAlias[first], leaderId: null };
  }

  return { view: 'grid', category: 'all', leaderId: null };
}

export const App: React.FC = () => {
  // 1. Language state: auto-detect browser language or read localStorage
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nl_language') as Language;
    if (saved === 'ja' || saved === 'en') return saved;
    return detectBrowserLanguage();
  });

  // Synchronize document.title and html lang dynamically
  useEffect(() => {
    document.title = language === 'ja' ? '歴史リーダー事典' : 'National Leaders Archive';
    document.documentElement.lang = language;
  }, [language]);

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

  // 3. Navigation, Category & Leader Selection States
  const [currentCategory, setCurrentCategory] = useState<LeaderCategory | 'all'>('all');
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<TabType | undefined>(undefined);

  // 4. Comparison State (Max 3 leaders)
  const [comparedLeaderIds, setComparedLeaderIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Avoid hash-change loops
  const isUpdatingHashRef = useRef(false);

  // Synchronize state to URL Hash
  const syncHashToUrl = useCallback((view: ViewMode, category: LeaderCategory | 'all', leader: Leader | null, tab?: TabType) => {
    isUpdatingHashRef.current = true;
    let newHash = '';

    if (leader) {
      newHash = tab && tab !== 'profile' ? `#/leader/${leader.id}/${tab}` : `#/leader/${leader.id}`;
    } else if (view === 'grid') {
      newHash = category !== 'all' ? `#/category/${category}` : '#/';
    } else if (view === 'timeline') {
      newHash = category !== 'all' ? `#/timeline/${category}` : `#/timeline`;
    } else if (view === 'rankings') {
      newHash = category !== 'all' ? `#/rankings/${category}` : `#/rankings`;
    } else if (view === 'compare') {
      newHash = `#/compare`;
    } else if (view === 'quiz') {
      newHash = `#/quiz`;
    }

    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    setTimeout(() => {
      isUpdatingHashRef.current = false;
    }, 50);
  }, []);

  // Listen to hash changes (browser Back / Forward / Direct URL pasting)
  useEffect(() => {
    const handleHashChange = () => {
      if (isUpdatingHashRef.current) return;
      const route = parseUrlHash(window.location.hash);

      setCurrentView(route.view);
      setCurrentCategory(route.category);

      if (route.leaderId) {
        const found = allLeaders.find((l) => l.id === route.leaderId);
        if (found) {
          setSelectedLeader(found);
          setModalInitialTab(route.tab || 'profile');
        }
      } else {
        setSelectedLeader(null);
      }

      if (route.compareIds && route.compareIds.length > 0) {
        const validIds = route.compareIds.filter((id) => allLeaders.some((l) => l.id === id));
        if (validIds.length > 0) {
          setComparedLeaderIds(validIds.slice(0, 3));
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    setSelectedLeader(null);
    syncHashToUrl(view, currentCategory, null);
  };

  const handleSelectCategory = (cat: LeaderCategory | 'all') => {
    setCurrentCategory(cat);
    syncHashToUrl(currentView, cat, selectedLeader);
  };

  const handleSelectLeader = (leader: Leader | null, tab?: TabType) => {
    setSelectedLeader(leader);
    setModalInitialTab(tab || 'profile');
    syncHashToUrl(currentView, currentCategory, leader, tab);
  };

  const handleCloseModal = () => {
    setSelectedLeader(null);
    syncHashToUrl(currentView, currentCategory, null);
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
        onSelectCategory={handleSelectCategory}
        currentView={currentView}
        onSelectView={handleSelectView}
        language={language}
        onToggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        compareCount={comparedLeaderIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'grid' && (
          <LeaderGrid
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectLeader={handleSelectLeader}
            comparedLeaderIds={comparedLeaderIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentView === 'timeline' && (
          <TimelineView
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectCategory={handleSelectCategory}
            onSelectLeader={handleSelectLeader}
          />
        )}

        {currentView === 'compare' && (
          <LeaderComparator
            comparedLeaders={comparedLeaders}
            language={language}
            onRemoveLeader={handleRemoveComparedLeader}
            onClearAll={handleClearAllCompared}
            onSelectLeader={handleSelectLeader}
            onNavigateToExplorer={() => handleSelectView('grid')}
          />
        )}

        {currentView === 'rankings' && (
          <RankingsView
            leaders={allLeaders}
            language={language}
            selectedCategory={currentCategory}
            onSelectCategory={handleSelectCategory}
            onSelectLeader={handleSelectLeader}
          />
        )}

        {currentView === 'quiz' && (
          <QuizView
            language={language}
            onSelectLeader={handleSelectLeader}
          />
        )}
      </main>

      {/* Detailed Modal */}
      <LeaderDetailModal
        leader={selectedLeader}
        language={language}
        onClose={handleCloseModal}
        isCompared={selectedLeader ? comparedLeaderIds.includes(selectedLeader.id) : false}
        onToggleCompare={handleToggleCompare}
        initialTab={modalInitialTab}
        onShowToast={showToast}
      />

      {/* Footer */}
      <Footer language={language} />

      {/* Sticky Bottom Navigation for Mobile */}
      <MobileNav
        currentView={currentView}
        onSelectView={handleSelectView}
        language={language}
        compareCount={comparedLeaderIds.length}
      />
    </div>
  );
};

export default App;
