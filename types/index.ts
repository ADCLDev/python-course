interface Section {
  id: string;
  title: string;
  slug: string;
}

interface SubSection {
  id: string;
  title: string;
  content: string;
}

export interface Day {
  id: number;
  title: string;
  sections: {
    id: string;
    title: string;
    slug: string;
  }[];
}

export interface TestContent {
  title: string;
  content: string;
  initialCode: string;
  expectedOutput: string[];
}

// Only export the non-exported interfaces
export type { Section, SubSection };