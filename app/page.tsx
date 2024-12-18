'use client';

import Link from 'next/link';
import { useState } from 'react';
import { day1Data } from '../data/courseData';
import dynamic from 'next/dynamic';
import Syllabus from '@/components/Syllabus';

const ProjectTerminal = dynamic(() => import('../components/ProjectTerminal'), {
  ssr: false
});

export default function Home() {
  const [showProject, setShowProject] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">100 Days of Python</h1>
        <p className="text-xl text-gray-600">
          From Beginner to Professional: Master Python One Day at a Time
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold">Day {day1Data.id}</h2>
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Beginner
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">
            Introduction to Python Basics
          </h3>
          
          <div className="space-y-2 text-gray-600 mb-6">
            <p>In this lesson, you&apos;ll learn:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Printing and Output</li>
              <li>String Manipulation</li>
              <li>Debugging Techniques</li>
              <li>Python Comments</li>
              <li>Working with Variables</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link 
              href={`/day/${day1Data.id}`}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </Link>
            <button
              onClick={() => setShowProject(!showProject)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {showProject ? 'Hide Project' : 'Try Project'}
            </button>
            <button
              onClick={() => setShowChallenges(!showChallenges)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showChallenges ? 'Hide Challenges' : 'View Challenges'}
            </button>
            <Link
              href="/quiz"
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Take Quiz
            </Link>
          </div>

          {showProject && (
            <div className="mt-6">
              <ProjectTerminal />
            </div>
          )}

          {showChallenges && (
            <div className="mt-6 space-y-6">
              <h3 className="text-2xl font-bold">Day 1 Challenges</h3>
              <div className="grid gap-4">
                <Link
                  href={`/day/${day1Data.id}/challenges/1`}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h4 className="font-semibold">Recipe Generator</h4>
                  <p className="text-gray-600">Create a recipe title generator using string concatenation</p>
                </Link>
                <Link
                  href={`/day/${day1Data.id}/challenges/2`}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h4 className="font-semibold">Debug the Story</h4>
                  <p className="text-gray-600">Fix the broken print statements to tell a story</p>
                </Link>
                <Link
                  href={`/day/${day1Data.id}/challenges/3`}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <h4 className="font-semibold">Variable Swap Chain</h4>
                  <p className="text-gray-600">Practice variable manipulation with a three-way swap</p>
                </Link>
              </div>
            </div>
          )}
        </div>

        <Syllabus />
      </div>
    </main>
  );
} 