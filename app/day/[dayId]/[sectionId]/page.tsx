'use client';
import { use } from 'react';
import { printingLesson, printingTest, debuggingLesson, debuggingTest } from '../../../../data/courseData';
import dynamic from 'next/dynamic';

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
  
  // Get the appropriate lesson and test based on the section
  const lesson = currentSection === 'debugging' ? debuggingLesson : printingLesson;
  const test = currentSection === 'debugging' ? debuggingTest : printingTest;

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Section */}
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
          <div className="markdown-content whitespace-pre-wrap">
            {lesson.content}
          </div>
        </div>

        {/* Testing Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice: {currentSection}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{test.title}</h3>
            <p className="mb-4 whitespace-pre-wrap">{test.content}</p>
            <CodeEditor 
              key={currentSection}
              initialCode={currentSection === 'debugging' ? test.initialCode : ""}
              expectedOutput={test.expectedOutput}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 