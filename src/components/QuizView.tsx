import React, { useState, useMemo } from 'react';
import { QuizQuestion, Language, Leader, LeaderCategory } from '../types';
import { translations } from '../i18n/translations';
import { quizQuestions, getLeaderById } from '../data';
import { LeaderAvatar } from './LeaderAvatar';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface QuizViewProps {
  language: Language;
  onSelectLeader: (leader: Leader) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  language,
  onSelectLeader,
}) => {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<LeaderCategory | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter questions based on selected category
  const activeQuestions = useMemo(() => {
    if (selectedCategory === 'all') {
      return quizQuestions;
    }
    return quizQuestions.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const currentQ = activeQuestions[currentIndex] || activeQuestions[0];

  const handleSelectCategory = (cat: LeaderCategory | 'all') => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (leaderId: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedOptionId(leaderId);
    setIsAnswered(true);

    if (leaderId === currentQ.correctLeaderId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-scaleUp">
        <div className="inline-flex p-4 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-3xl text-white shadow-lg">
          <Trophy className="w-12 h-12" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {score === activeQuestions.length
              ? t.quiz.perfectScore
              : score >= activeQuestions.length * 0.7
              ? t.quiz.greatScore
              : t.quiz.goodTry}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.quiz.score}: <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{score}</span> / {activeQuestions.length} ({percentage}%)
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.quiz.retry}</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const progressPercent = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner & Category Filter */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            {t.quiz.title}
          </h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 self-start sm:self-auto">
            {t.quiz.question} {currentIndex + 1} {t.quiz.questionOf} {activeQuestions.length}
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-400 flex items-center gap-1 font-medium mr-1">
            <Layers className="w-3.5 h-3.5" />
            {language === 'ja' ? 'ジャンル:' : 'Category:'}
          </span>
          <button
            onClick={() => handleSelectCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ja' ? `全ジャンル (${quizQuestions.length}問)` : `All (${quizQuestions.length})`}
          </button>
          <button
            onClick={() => handleSelectCategory('japan_prime_minister')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'japan_prime_minister'
                ? 'bg-red-500 text-white border-red-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ja' ? '日本の歴代首相 (20問)' : 'Japan PMs (20)'}
          </button>
          <button
            onClick={() => handleSelectCategory('us_president')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'us_president'
                ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ja' ? '米歴代大統領 (20問)' : 'US Presidents (20)'}
          </button>
          <button
            onClick={() => handleSelectCategory('tokugawa_shogun')}
            className={`px-3 py-1.5 rounded-xl font-bold border transition ${
              selectedCategory === 'tokugawa_shogun'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            {language === 'ja' ? '徳川将軍家 (10問)' : 'Tokugawa (10)'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
          {language === 'ja' ? currentQ.questionJa : currentQ.questionEn}
        </h3>

        {/* 4 Choices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.leaderId;
            const isCorrect = opt.leaderId === currentQ.correctLeaderId;
            const targetLeader = getLeaderById(opt.leaderId);

            let btnClass = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700';

            if (isAnswered) {
              if (isCorrect) {
                btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400';
              } else if (isSelected) {
                btnClass = 'bg-rose-500 text-white border-rose-600 shadow-md';
              } else {
                btnClass = 'opacity-50 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
              }
            }

            return (
              <button
                key={opt.leaderId}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.leaderId)}
                className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  {targetLeader && (
                    <LeaderAvatar leader={targetLeader} language={language} size="sm" className="shrink-0" />
                  )}
                  <span>{language === 'ja' ? opt.textJa : opt.textEn}</span>
                </div>

                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon answering */}
        {isAnswered && (
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              {selectedOptionId === currentQ.correctLeaderId ? (
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.quiz.correct}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm font-bold text-rose-600 dark:text-rose-400">
                  <XCircle className="w-4 h-4" />
                  {t.quiz.incorrect}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {language === 'ja' ? currentQ.explanationJa : currentQ.explanationEn}
            </p>

            {(currentQ.sourceNoteJa || currentQ.sourceNoteEn) && (
              <p className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                📖 {t.modal.measurementBasis} {language === 'ja' ? currentQ.sourceNoteJa : currentQ.sourceNoteEn}
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition"
              >
                <span>{currentIndex + 1 < activeQuestions.length ? t.quiz.nextQuestion : t.quiz.finishQuiz}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
