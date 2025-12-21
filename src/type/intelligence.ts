// src/types/intelligence.ts

// 1. Case Bundle (Input Context)
export interface CaseBundleV1 {
  case: {
    id: string;
    description: string | null;
    clinicalHistory: string | null;
    status?: string; // Added to track explicit case state
  };
  patient: {
    name: string;
    species: string; // "FELINE", "CANINE"
    breed: string | null;
    sex: string | null;
    age: number | null; // e.g., 10 (years)
    weightKg: number | null;
  };
  clinic: {
    name: string;
  };
  flags: string[]; // e.g. ["lower_urinary_signs"]
  imaging?: { id: string }[]; // If length > 0, imaging is available
}

// 2. Diagnostics Item
export interface DiagnosticItem {
  testName: string;
  priority: "low" | "medium" | "high";
  reasoning: string;
  recommendedByAI: boolean; // Triggers yellow accent
}

// 3. Treatment Item
export interface TreatmentItem {
  drugName: string;
  displayText: string; // "12.5 mg/kg PO q12h..."
  rationale: string;
  dose?: {
    mgPerKg: number | string;
    route: string;
    frequency: string;
    durationDays: number | string;
  };
  calculation?: {
    patientWeightKg: number;
    perDoseMg: number | string;
    tabletStrengthMg?: number | string; // e.g. 62.5
    perDoseTablets?: number | string; // e.g. 1
    totalTablets?: number | string; // e.g. 20
    notes?: string;
  };
  source?: {
    protocolName?: string;
    guideline?: string;
    url?: string;
  };
  warnings?: string[];
}

// 4. Main AI Response
export interface ClinicalAIResponse {
  summary: string;
  differentials: string[];
  redFlags: string[];
  diagnostics: DiagnosticItem[]; // Dedicated array
  treatments: TreatmentItem[]; // Dedicated array
}
