// ==========================================
// 1. Case Bundle (Input Context)
// ==========================================
export interface CaseBundleV1 {
  case: {
    id: string;
    status: "open" | "in_progress" | "closed" | "cancelled";
    title: string | null;
    description: string | null;
    reasonForVisit: string | null;
    history: string | null;
    priority: "routine" | "urgent" | "critical";
    createdAt: string;
    updatedAt: string;
  };
  patient: {
    id: string;
    clinicId: string;
    name: string;
    species: string; // e.g. CANINE, FELINE
    breed: string | null;
    sex: "M" | "F" | "MN" | "FS" | null;
    age: number | null;
    weightKg: number | null;
  };
  clinic: {
    id: string;
    name: string;
    address: string | null;
  };
  clinicalHistory: string | null;
  examFindings: string | null;
  labs?: {
    urinalysis?: {
      specificGravity?: number | string;
      ph?: number | string;
      rbc?: string;
      wbc?: string;
      bacteria?: string;
    };
    culture?: {
      organism?: string;
      sensitivity?: string[];
    };
  };
  imaging?: Array<{
    studyInstanceUID: string;
    studyDate?: string;
    studyDescription?: string;
    modality?: string;
    numberOfSeries?: number;
    numberOfInstances?: number;
  }>;
  provisionalDiagnosis?: string | null;
  flags?: string[]; // e.g. ["lower_urinary_signs"]
}

// ==========================================
// 2. Clinical AI Response (Output Logic)
// ==========================================
export interface ClinicalNextStep {
  action: string;
  rationale: string;
  // Future-proof optional fields
  dose?: {
    mgPerKg?: number | null;
    frequency?: string | null;
    durationDays?: number | null;
    route?: string | null;
  };
  calculation?: {
    patientWeightKg?: number | null;
    perDoseMg?: number | null;
    tabletStrengthMg?: number | null;
    perDoseTablets?: number | null;
    totalTablets?: number | null;
    notes?: string;
  };
  source?: {
    guideline?: string;
    protocolName?: string;
    url?: string | null;
  };
  warnings?: string[];
}

export interface ClinicalAIResponse {
  summary: string;
  differentials: string[];
  redFlags: string[];
  nextSteps: ClinicalNextStep[];
}
