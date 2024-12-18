'use client';

import { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
    explanation: "In Python, we use print() with parentheses and quotes around strings."
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
    explanation: "Variable names can contain letters, numbers, and underscores, but must start with a letter or underscore."
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
    explanation: "String concatenation with + joins the strings together, including spaces."
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
    explanation: "Python uses the # symbol for single-line comments."
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
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

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
        <p className="text-lg mb-4">
          Your score: {score} out of {quizData.length}
          ({Math.round((score / quizData.length) * 100)}%)
        </p>
        <button
          onClick={restartQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {quizData.length}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">
        {quizData[currentQuestion].question}
      </h3>

      <div className="space-y-3">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-3 text-left rounded ${
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
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="text-blue-800">
            {quizData[currentQuestion].explanation}
          </p>
        </div>
      )}

      {selectedAnswer !== null && (
        <button
          onClick={nextQuestion}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
} 