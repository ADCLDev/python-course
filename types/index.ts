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

interface Day {
  id: number;
  title: string;
  sections: Section[];
}

export type { Section, SubSection, Day }; 