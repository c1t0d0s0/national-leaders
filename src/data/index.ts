import { Leader, LeaderCategory } from '../types';
import { tokugawaShoguns } from './tokugawaShoguns';
import { japanPrimeMinisters } from './japanPrimeMinisters';
import { usPresidents } from './usPresidents';
import { quizQuestions } from './quizQuestions';

export { tokugawaShoguns, japanPrimeMinisters, usPresidents, quizQuestions };

export const allLeaders: Leader[] = [
  ...tokugawaShoguns,
  ...japanPrimeMinisters,
  ...usPresidents,
];

export function getLeadersByCategory(category: LeaderCategory | 'all'): Leader[] {
  if (category === 'all') return allLeaders;
  if (category === 'tokugawa_shogun') return tokugawaShoguns;
  if (category === 'japan_prime_minister') return japanPrimeMinisters;
  if (category === 'us_president') return usPresidents;
  return allLeaders;
}

export function getLeaderById(id: string): Leader | undefined {
  return allLeaders.find(leader => leader.id === id);
}

export function getCategoryBadgeColor(category: LeaderCategory): {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
  accent: string;
} {
  switch (category) {
    case 'tokugawa_shogun':
      return {
        bg: 'from-amber-500/10 to-amber-950/20',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-500/30 dark:border-amber-500/40',
        badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300 dark:border-amber-700',
        accent: 'bg-amber-600 dark:bg-amber-500',
      };
    case 'japan_prime_minister':
      return {
        bg: 'from-rose-500/10 to-rose-950/20',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-500/30 dark:border-rose-500/40',
        badgeBg: 'bg-rose-100 text-rose-900 dark:bg-rose-900/60 dark:text-rose-200 border-rose-300 dark:border-rose-700',
        accent: 'bg-rose-600 dark:bg-rose-500',
      };
    case 'us_president':
      return {
        bg: 'from-blue-500/10 to-blue-950/20',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-500/30 dark:border-blue-500/40',
        badgeBg: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200 border-blue-300 dark:border-blue-700',
        accent: 'bg-blue-600 dark:bg-blue-500',
      };
  }
}
