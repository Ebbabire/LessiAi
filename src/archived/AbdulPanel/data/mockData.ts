export interface Recommendation {
  title: string;
  value: string;
}

export interface RecommendationsData {
  summary: string;
  recommendations: Recommendation[];
  flags: string[];
}

export const mockRecommendationsData: RecommendationsData = {
  summary: "10-year-old female spayed cat with E. coli UTI confirmed on culture.",
  recommendations: [
    { title: "Primary Antibiotic", value: "Amoxicillin-clavulanate" },
    { title: "Dosage", value: "12.5–20 mg/kg PO q12h" },
    { title: "Duration", value: "7 days" },
    { title: "Monitoring", value: "Recheck clinical signs in 3–4 days" }
  ],
  flags: [
    "No complicating factors identified",
    "Follow ISCAID guidelines"
  ]
};

