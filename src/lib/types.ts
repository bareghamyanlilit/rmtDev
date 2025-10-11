export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duaration: string;
  location: string;
  salary: string;
  coverImgUrl: string;
  companyUrl: string;
};

export type PageDirection = "next" | "previous";

export type SortBy="relevant" | "recent";