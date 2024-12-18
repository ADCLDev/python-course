'use client';

import { useState } from 'react';
import Link from 'next/link';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'printing' | 'variables' | 'debugging' | 'syntax';
}

const quizData: QuizQuestion[] = [
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
  {
    question: "Which of these is a valid variable name in Python?",
    options: [
      '2myVariable',
      'my-variable',
      'my_variable',
      'my variable'
    ],
    correctAnswer: 2,
    explanation: "Variable names can contain letters, numbers, and underscores, but must start with a letter or underscore.",
    category: 'variables'
  },
  {
    question: "What will be the output of: print('Hello' + ' World')?",
    options: [
      'Hello World',
      'HelloWorld',
      'Error',
      'Hello + World'
    ],
    correctAnswer: 0,
    explanation: "String concatenation with + joins the strings together, including spaces.",
    category: 'printing'
  },
  {
    question: "How do you create a comment in Python?",
    options: [
      '// This is a comment',
      '/* This is a comment */',
      '# This is a comment',
      '-- This is a comment'
    ],
    correctAnswer: 2,
    explanation: "Python uses the # symbol for single-line comments.",
    category: 'syntax'
  },
  {
    question: "Which line contains a syntax error?",
    options: [
      'print("Hello")',
      'print("Hi" + "there")',
      'print(Hello)',
      'print("2" + "2")'
    ],
    correctAnswer: 2,
    explanation: "String literals must be enclosed in quotes.",
    category: 'debugging'
  }
];

interface CategoryScore {
  total: number;
  correct: number;
}

interface QuizResults {
  [key: string]: CategoryScore;
}

function generateFeedback(results: QuizResults) {
  const feedback = {
    strongPoints: [] as string[],
    weakPoints: [] as string[],
    recommendations: [] as string[]
  };

  Object.entries(results).forEach(([category, score]) => {
    const percentage = (score.correct / score.total) * 100;
    
    if (percentage >= 75) {
      feedback.strongPoints.push(category);
    } else if (percentage <= 50) {
      feedback.weakPoints.push(category);
    }
  });

  // Generate specific recommendations
  feedback.weakPoints.forEach(weakness => {
    switch (weakness) {
      case 'printing':
        feedback.recommendations.push(
          "Practice more with the print function. Try printing different types of strings and combining them."
        );
        break;
      case 'variables':
        feedback.recommendations.push(
          "Review variable naming rules and practice creating descriptive variable names."
        );
        break;
      case 'debugging':
        feedback.recommendations.push(
          "Focus on identifying common syntax errors. Try debugging exercises with intentional errors."
        );
        break;
      case 'syntax':
        feedback.recommendations.push(
          "Study Python syntax rules more carefully. Pay attention to quotes, parentheses, and indentation."
        );
        break;
    }
  });

  return feedback;
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<QuizResults>({
    printing: { total: 0, correct: 0 },
    variables: { total: 0, correct: 0 },
    debugging: { total: 0, correct: 0 },
    syntax: { total: 0, correct: 0 }
  });
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const category = quizData[currentQuestion].category;
    setResults(prev => ({
      ...prev,
      [category]: {
        total: prev[category].total + 1,
        correct: prev[category].correct + (answerIndex === quizData[currentQuestion].correctAnswer ? 1 : 0)
      }
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const feedback = generateFeedback(results);
    const totalScore = Object.values(results).reduce(
      (acc, curr) => ({
        total: acc.total + curr.total,
        correct: acc.correct + curr.correct
      }),
      { total: 0, correct: 0 }
    );

    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overall Score</h2>
            <p className="text-lg">
              You got {totalScore.correct} out of {totalScore.total} questions correct
              ({Math.round((totalScore.correct / totalScore.total) * 100)}%)
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Performance by Category</h2>
            <div className="grid gap-4">
              {Object.entries(results).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span className="capitalize">{category}</span>
                  <span className="font-semibold">
                    {score.correct}/{score.total} 
                    ({Math.round((score.correct / score.total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {feedback.strongPoints.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-600">Strong Points</h2>
              <ul className="list-disc list-inside space-y-2">
                {feedback.strongPoints.map(point => (
                  <li key={point} className="capitalize">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {feedback.weakPoints.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-red-600">Areas for Improvement</h2>
              <ul className="list-disc list-inside space-y-2">
                {feedback.weakPoints.map(point => (
                  <li key={point} className="capitalize">{point}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Recommendations</h2>
            <ul className="space-y-4">
              {feedback.recommendations.map((rec, index) => (
                <li key={index} className="p-4 bg-blue-50 rounded">
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href={`/day/1`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          <h2 className="text-2xl font-bold mt-2">
            {quizData[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-4">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === null
                  ? 'hover:bg-gray-100 border'
                  : selectedAnswer === index
                  ? index === quizData[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500 border'
                    : 'bg-red-100 border-red-500 border'
                  : index === quizData[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-green-500 border'
                  : 'bg-gray-50 border'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {quizData[currentQuestion].explanation}
            </p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={nextQuestion}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
} 