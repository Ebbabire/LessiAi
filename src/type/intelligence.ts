// src/types/intelligence.ts

import type { Case } from "./case";

// Progression Mode determines case handling priority
export type ProgressionMode = "ADVANCE" | "PIVOT" | "MONITOR" | "ESCALATE";

// 1. Case Bundle (Input Context)
export interface CaseBundleV1 {
  case: Partial<Case> & {
    description: string | null;
    clinicalHistory: string | null;
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
  specialistInput?: {
    implications: string[];
    monitoring: string[];
  };
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
  nextSteps: {
    action: string;
    rationale: string;
  }[];
  diagnostics: DiagnosticItem[]; // Dedicated array
  treatments: TreatmentItem[]; // Dedicated array
  progressionMode?: ProgressionMode; // ADVANCE | PIVOT | MONITOR | ESCALATE
}
