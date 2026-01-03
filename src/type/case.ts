export type CaseStatus =
  | "default"
  | "neutral"
  | "outline"
  | "warning"
  | "danger"
  | "New"
  | "In Progress"
  | "Completed";

export interface Case {
  id: string;
  species: string;
  name: string;
  age: string;
  owner: string;
  complaint: string;
  status: CaseStatus;
  createdAt: string;
  surfaceReason?: string; // e.g., "Pending labs", "Awaiting imaging"
}

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export interface RecommendationItem {
  title: string;
  value: string;
}

export interface ClinicalData {
  summary: string;
  recommendations: RecommendationItem[];
  flags: string[];
}
