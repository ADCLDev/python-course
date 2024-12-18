'use client';
import { use } from 'react';
import { day1Data } from '../../../data/courseData';
import dynamic from 'next/dynamic';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ dayId: string }>;
}

export default function DayPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const currentSection = resolvedParams.dayId;
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Day {currentSection}</h1>
      <div className="grid gap-4">
        {day1Data.sections.map((section) => (
          <Link
            key={section.id}
            href={`/day/${currentSection}/${section.slug}`}
            className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{section.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
} 