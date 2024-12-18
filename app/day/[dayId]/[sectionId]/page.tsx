'use client';
import { use } from 'react';
import { useState } from 'react';
import { 
  printingLesson, 
  printingTest, 
  debuggingLesson, 
  debuggingTest,
  variablesLesson,
  variablesTest,
  concatenationLesson,
  concatenationTest,
  challengesLesson,
  challenge1,
  challenge2,
  challenge3
} from '../../../../data/courseData';
import dynamic from 'next/dynamic';
import type { TestContent } from '@/types';

// Dynamically import CodeEditor with no SSR to avoid hydration issues
const CodeEditor = dynamic(() => import('../../../../components/CodeEditor'), {
  ssr: false,
});

interface PageProps {
  params: Promise<{ dayId: string; sectionId: string }>;
}

export default function SectionPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const currentSection = resolvedParams.sectionId;
  const [currentChallenge, setCurrentChallenge] = useState<TestContent>(challenge1);
  
  // Get the appropriate lesson and test based on the section
  const lesson = 
    currentSection === 'debugging' ? debuggingLesson :
    currentSection === 'variables' ? variablesLesson :
    currentSection === 'concatenation' ? concatenationLesson :
    currentSection === 'challenges' ? challengesLesson :
    printingLesson;

  const test = 
    currentSection === 'debugging' ? debuggingTest :
    currentSection === 'variables' ? variablesTest :
    currentSection === 'concatenation' ? concatenationTest :
    currentSection === 'challenges' ? currentChallenge :
    printingTest;

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Section */}
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
          <div className="markdown-content whitespace-pre-wrap">
            {lesson.content}
          </div>
          
          {/* Show challenge selection if in challenges section */}
          {currentSection === 'challenges' && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold">Select a Challenge</h2>
              <div className="grid gap-4">
                <button 
                  onClick={() => setCurrentChallenge(challenge1)}
                  className={`p-4 border rounded-lg hover:bg-gray-50 ${
                    currentChallenge === challenge1 ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  Recipe Generator
                </button>
                <button 
                  onClick={() => setCurrentChallenge(challenge2)}
                  className={`p-4 border rounded-lg hover:bg-gray-50 ${
                    currentChallenge === challenge2 ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  Debug the Story
                </button>
                <button 
                  onClick={() => setCurrentChallenge(challenge3)}
                  className={`p-4 border rounded-lg hover:bg-gray-50 ${
                    currentChallenge === challenge3 ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  Variable Swap Chain
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Testing Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice: {currentSection}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{test.title}</h3>
            <p className="mb-4 whitespace-pre-wrap">{test.content}</p>
            <CodeEditor 
              key={`${currentSection}-${test.title}`}
              initialCode={test.initialCode}
              expectedOutput={test.expectedOutput}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 