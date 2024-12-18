'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { QuizProgress } from '@/types';

interface CategoryScores {
  [category: string]: {
    correct: number;
    total: number;
  };
}

const QuizProgressContext = createContext<{
  progress: QuizProgress;
  updateProgress: (dayId: number, score: number, categoryScores: CategoryScores) => void;
}>({
  progress: {
    currentDay: 1,
    completedQuizzes: [],
    scores: {}
  },
  updateProgress: () => {}
});

export function QuizProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<QuizProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      currentDay: 1,
      completedQuizzes: [],
      scores: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (dayId: number, score: number, categoryScores: CategoryScores) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: Array.from(new Set([...prev.completedQuizzes, dayId])),
      scores: {
        ...prev.scores,
        [dayId]: {
          score,
          totalQuestions: Object.values(categoryScores).reduce(
            (acc: number, curr) => acc + curr.total, 0
          ),
          categoryScores
        }
      }
    }));
  };

  return (
    <QuizProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </QuizProgressContext.Provider>
  );
}

export const useQuizProgress = () => useContext(QuizProgressContext); 