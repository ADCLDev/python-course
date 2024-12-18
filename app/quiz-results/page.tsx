'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuizProgress } from '@/contexts/QuizProgressContext';

export default function QuizResultsPage() {
  const router = useRouter();
  const { progress } = useQuizProgress();

  useEffect(() => {
    if (!progress.completedQuizzes.length) {
      router.push('/');
    }
  }, [progress.completedQuizzes, router]);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Your Quiz Progress</h1>

        <div className="space-y-8">
          {Object.entries(progress.scores).map(([day, data]) => (
            <div key={day} className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Day {day}</h2>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Overall Score</span>
                  <span className="font-semibold">
                    {data.score}/{data.totalQuestions} 
                    ({Math.round((data.score / data.totalQuestions) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(data.score / data.totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Category Breakdown</h3>
                {Object.entries(data.categoryScores).map(([category, scores]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize">{category}</span>
                    <span>
                      {scores.correct}/{scores.total}
                      ({Math.round((scores.correct / scores.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/day/${day}/quiz`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
                >
                  Retake Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 