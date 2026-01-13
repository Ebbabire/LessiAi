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

// 3. Operational Reference (structured clinical reference data)
export interface OperationalReference {
  // Dosing parameters
  dosing?: {
    dose: string;
    route: string;
    frequency: string;
    duration?: string;
  };
  // Timing checkpoints
  timing?: {
    recheckInterval?: string;
    monitoringWindow?: string;
    criticalCheckpoints?: string[];
  };
  // Reference values/ranges
  referenceValues?: {
    label: string;
    target: string;
    unit?: string;
  }[];
  // Patient-specific calculations
  calculations?: {
    label: string;
    value: string;
    formula?: string;
  }[];
  // Contraindications/precautions
  contraindications?: string[];
  // Contact/escalation info
  escalation?: {
    contact?: string;
    threshold?: string;
  };
}

// 4. Treatment Item
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
  operationalReference?: OperationalReference;
}

// 5. Readiness Status (Backend-determined validity gate)
export interface ReadinessStatus {
  isReady: boolean;
  missingInputs: string[]; // e.g., ["Patient Weight", "Urine Culture"]
  unlockCondition: string; // e.g., "Update patient record in VitalRads"
}

// 6. Trust Metadata (Lassi Sources & Trust Doctrine v1.0)
export interface TrustMetadata {
  finding_confidence: "definitive" | "suggestive" | "uncertain";
  evidence_strength: "strong" | "moderate" | "limited" | "extrapolated";
  source_class: string; // e.g. "Clinical Guidelines"
  reasoning_type: string; // e.g. "Deductive", "Inductive"
  explanation: string; // Human-readable explanation of why this content is shown
  uncertainty_notes?: string;
  is_suppressed?: boolean;
  suppression_reason?: string;
}

// 7. Main AI Response
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
  readiness?: ReadinessStatus; // Backend-determined readiness gate
  meta?: TrustMetadata; // Global trust for the whole analysis
}
