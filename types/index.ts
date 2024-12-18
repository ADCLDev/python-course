interface Section {
  id: string;
  title: string;
  slug: string;
}

interface SubSection {
  id: string;
  title: string;
  content: string;
}

export interface Day {
  id: number;
  title: string;
  sections: {
    id: string;
    title: string;
    slug: string;
  }[];
}

export interface TestContent {
  title: string;
  content: string;
  initialCode: string;
  expectedOutput: string[];
  testCode?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface QuizProgress {
  currentDay: number;
  completedQuizzes: number[];
  scores: {
    [day: number]: {
      score: number;
      totalQuestions: number;
      categoryScores: {
        [category: string]: {
          correct: number;
          total: number;
        };
      };
    };
  };
}

// Only export the non-exported interfaces
export type { Section, SubSection };