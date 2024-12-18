'use client';
import { use } from 'react';
import { printingLesson, printingTest } from '../../../../data/courseData';
import dynamic from 'next/dynamic';

// Dynamically import CodeEditor with no SSR to avoid hydration issues
const CodeEditor = dynamic(() => import('../../../../components/CodeEditor'), {
  ssr: false,
});

export default function SectionPage({
  params
}: {
  params: Promise<{ dayId: string; sectionId: string }>;
}) {
  // Use React.use to unwrap the params promise
  const resolvedParams = use(params);
  const currentSection = resolvedParams.sectionId;
  
  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Section */}
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">{printingLesson.title}</h1>
          <div className="markdown-content whitespace-pre-wrap">
            {printingLesson.content}
          </div>
        </div>

        {/* Testing Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice: {currentSection}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{printingTest.title}</h3>
            <p className="mb-4 whitespace-pre-wrap">{printingTest.content}</p>
            <CodeEditor 
              key={currentSection}
              initialCode=""
              expectedOutput={printingTest.expectedOutput}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 