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
          </div>

          {showProject && (
            <div className="mt-6">
              <ProjectTerminal />
            </div>
          )}
        </div>

        <Syllabus />
      </div>
    </main>
  );
} 