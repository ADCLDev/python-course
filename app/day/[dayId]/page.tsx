import Link from 'next/link';
import { day1Data } from '../../../data/courseData';
import { Section } from '../../../types';

export default function DayPage({ params }: { params: { dayId: string } }) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Day {params.dayId}</h1>
      <div className="grid gap-4">
        {day1Data.sections.map((section: Section) => (
          <Link
            key={section.id}
            href={`/day/${params.dayId}/${section.slug}`}
            className="p-6 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-2xl font-semibold">{section.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
} 