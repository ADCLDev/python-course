import { QuizQuestion } from '@/types';

export const quizzesByDay: { [key: string]: QuizQuestion[] } = {
  "1": [
    {
      question: "What is the correct way to print 'Hello, World!' in Python?",
      options: [
        'print("Hello, World!")',
        'Print("Hello, World!")',
        'print(Hello, World!)',
        'print[Hello, World!]'
      ],
      correctAnswer: 0,
      explanation: "In Python, we use print() with parentheses and quotes around strings.",
      category: 'printing'
    },
    // ... existing Day 1 questions ...
  ],
  "2": [
    {
      question: "What is the result of 3 + 2 * 4?",
      options: ['20', '11', '14', '8'],
      correctAnswer: 1,
      explanation: "Python follows order of operations (PEMDAS). Multiplication happens before addition.",
      category: 'operators'
    },
    // Add more Day 2 questions...
  ],
  // Add more days...
}; 