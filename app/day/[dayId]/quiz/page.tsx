'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizzesByDay } from '@/data/quizData';
import { useQuizProgress } from '@/contexts/QuizProgressContext';

export default function DayQuizPage() {
  const params = useParams();
  const router = useRouter();
  const dayId = params.dayId as string;
  const { updateProgress } = useQuizProgress();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [categoryScores, setCategoryScores] = useState<{[key: string]: {correct: number; total: number}}>({});
  const [isReviewing, setIsReviewing] = useState(false);

  const quizQuestions = quizzesByDay[dayId] || [];
  const totalQuestions = quizQuestions.length;

  // Initialize selected answers array
  useEffect(() => {
    setSelectedAnswers(new Array(totalQuestions).fill(null));
  }, [totalQuestions]);

  const handleAnswer = (answerIndex: number) => {
    if (isReviewing) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
    
    const category = quizQuestions[currentQuestion].category;
    setCategoryScores(prev => ({
      ...prev,
      [category]: {
        total: (prev[category]?.total || 0) + 1,
        correct: (prev[category]?.correct || 0) + 
          (answerIndex === quizQuestions[currentQuestion].correctAnswer ? 1 : 0)
      }
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setIsReviewing(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(true);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowExplanation(selectedAnswers[index] !== null);
  };

  const submitQuiz = () => {
    const totalCorrect = Object.values(categoryScores).reduce(
      (acc, curr) => acc + curr.correct, 0
    );
    updateProgress(Number(dayId), totalCorrect, categoryScores);
    router.push('/quiz-results');
  };

  if (!quizQuestions.length) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
          <p className="mb-6">The quiz for Day {dayId} is not available yet.</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Day {dayId} Quiz</h1>
            <span className="text-lg font-semibold">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>

          {/* Question Navigation */}
          <div className="grid grid-cols-10 gap-2 mb-4">
            {selectedAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => jumpToQuestion(index)}
                className={`p-2 rounded ${
                  currentQuestion === index
                    ? 'bg-blue-600 text-white'
                    : answer !== null
                    ? answer === quizQuestions[index].correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${(selectedAnswers.filter(a => a !== null).length / totalQuestions) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {quizQuestions[currentQuestion].question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isReviewing}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswers[currentQuestion] === null
                  ? 'hover:bg-gray-100 border'
                  : selectedAnswers[currentQuestion] === index
                  ? index === quizQuestions[currentQuestion].correctAnswer
                    ? 'bg-green-100 border-green-500 border'
                    : 'bg-red-100 border-red-500 border'
                  : index === quizQuestions[currentQuestion].correctAnswer
                  ? 'bg-green-100 border-green-500 border'
                  : 'bg-gray-50 border'
              }`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-gray-200 text-center leading-8 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {quizQuestions[currentQuestion].explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <div className="space-x-4">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Exit Quiz
            </button>
            {currentQuestion > 0 && (
              <button
                onClick={previousQuestion}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
            )}
          </div>

          <div className="space-x-4">
            {selectedAnswers[currentQuestion] !== null && (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {currentQuestion === totalQuestions - 1 ? 'Review Answers' : 'Next'}
              </button>
            )}
            {selectedAnswers.every(answer => answer !== null) && (
              <button
                onClick={submitQuiz}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 