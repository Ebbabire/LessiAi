import type { CaseBundleV1, ClinicalAIResponse, DiagnosticsResponse, TreatmentResponse } from "@/type/intelligence";

export const mockBundles: Record<string, CaseBundleV1> = {
  case_123: {
    case: {
      id: "case_123",
      status: "open",
      title: "Dysuria and hematuria",
      description:
        "Indoor cat with 3-day history of pollakiuria, stranguria, and occasional hematuria.",
      reasonForVisit: "Stranguria and hematuria",
      history: "Previously healthy, no prior urinary issues reported.",
      priority: "urgent",
      createdAt: "2025-01-01T10:00:00.000Z",
      updatedAt: "2025-01-01T10:30:00.000Z",
    },
    patient: {
      id: "patient_001",
      clinicId: "clinic_001",
      name: "Mittens",
      species: "FELINE",
      breed: "Domestic Shorthair",
      sex: "FS",
      age: 10,
      weightKg: 4.5,
    },
    clinic: {
      id: "clinic_001",
      name: "Woodhaven Animal Hospital",
      address: "123 Main St, Springfield",
    },
    clinicalHistory:
      "Indoor cat with 3-day history of pollakiuria and stranguria, occasional hematuria.",
    examFindings:
      "Mild discomfort on bladder palpation; otherwise unremarkable physical exam.",
    labs: {
      urinalysis: {
        specificGravity: 1.04,
        ph: 6.2,
        rbc: "3-5/hpf",
        wbc: "10-15/hpf",
        bacteria: "moderate, rods",
      },
      culture: {
        organism: "E. coli",
        sensitivity: ["amoxicillin-clavulanate", "cephalexin", "enrofloxacin"],
      },
    },
    imaging: [],
    provisionalDiagnosis: "Bacterial lower urinary tract infection",
    flags: ["lower_urinary_signs", "recurrent_risk"],
  },
  "C-2023-001": {
    case: {
      id: "C-2023-001",
      status: "in_progress",
      title: "Acute Gastroenteritis",
      description:
        "Patient presented with acute vomiting and lethargy. Owner reports 4 episodes in 24h.",
      reasonForVisit: "Vomiting, Lethargy",
      history:
        "Vomiting started 24h ago. Bilious. No known dietary indiscretion.",
      priority: "urgent",
      createdAt: "2023-10-24T09:00:00Z",
      updatedAt: "2023-10-24T10:30:00Z",
    },
    patient: {
      id: "P-101",
      clinicId: "CL-01",
      name: "Bella",
      species: "CANINE",
      breed: "Golden Retriever",
      sex: "FS",
      age: 4,
      weightKg: 28.5,
    },
    clinic: { id: "CL-01", name: "Main Street Vet", address: "123 Main St" },
    clinicalHistory: "Previously healthy. UTD on vaccines.",
    examFindings:
      "BAR. MM pink/moist. Abdominal palpation reveals mild cranial discomfort. No masses.",
    flags: ["vomiting", "lethargy", "dehydration_risk"],
    imaging: [
      {
        studyInstanceUID: "1.2.840.123",
        studyDescription: "Abdominal Ultrasound",
        modality: "US",
        numberOfInstances: 45,
      },
    ],
  },
  "C-2023-002": {
    case: {
      id: "C-2023-002",
      status: "closed",
      title: "Routine Wellness",
      description: "Annual wellness exam and vaccinations.",
      reasonForVisit: "Wellness",
      history: "Doing well at home.",
      priority: "routine",
      createdAt: "2023-10-23T14:00:00Z",
      updatedAt: "2023-10-23T15:00:00Z",
    },
    patient: {
      id: "P-102",
      clinicId: "CL-01",
      name: "Luna",
      species: "FELINE",
      breed: "DSH",
      sex: "FS",
      age: 2,
      weightKg: 4.2,
    },
    clinic: { id: "CL-01", name: "Main Street Vet", address: "123 Main St" },
    clinicalHistory: "No significant history.",
    examFindings: "Normal PE.",
    flags: [],
  },
};

export const mockAIResponses: Record<string, ClinicalAIResponse> = {
  case_123: {
    summary:
      "Clinical presentation and urinalysis consistent with bacterial cystitis.",
    differentials: [
      "Bacterial Cystitis",
      "Urolithiasis",
      "Feline Idiopathic Cystitis",
      "Neoplasia (less likely)",
    ],
    redFlags: [
      "Risk of obstruction if stones present (though female)",
      "Ascending infection risk",
    ],
    nextSteps: [
      {
        action: "Amoxicillin-Clavulanate",
        rationale: "First-line antibiotic based on culture sensitivity.",
        dose: {
          mgPerKg: 13.75,
          route: "PO",
          frequency: "BID",
          durationDays: 7,
        },
        calculation: {
          patientWeightKg: 4.5,
          perDoseMg: 61.875,
          totalTablets: 14,
          notes: "Give 1/2 of 125mg tablet BID",
        },
      },
      {
        action: "Prazosin",
        rationale: "Urethral relaxant to aid micturition comfort.",
        dose: { mgPerKg: 0.5, route: "PO", frequency: "BID", durationDays: 5 },
        calculation: {
          patientWeightKg: 4.5,
          perDoseMg: 0.5,
          notes: "Administer 1 capsule BID",
        },
      },
    ],
  },
  "C-2023-001": {
    summary: "High suspicion of acute gastroenteritis vs dietary indiscretion.",
    differentials: [
      "Acute Gastroenteritis",
      "Dietary Indiscretion",
      "Pancreatitis",
      "Foreign Body (Low likelihood)",
    ],
    redFlags: ["Risk of dehydration", "Monitor for hematemesis"],
    nextSteps: [
      {
        action: "Maropitant (Cerenia)",
        rationale: "Antiemetic for vomiting control",
        dose: { mgPerKg: 1, route: "SQ", frequency: "Once", durationDays: 1 },
        calculation: {
          patientWeightKg: 28.5,
          perDoseMg: 28.5,
          notes: "Administer 2.85ml of 10mg/ml solution",
        },
      },
      {
        action: "LRS Fluid Therapy",
        rationale: "Rehydration and maintenance",
        dose: { mgPerKg: 20, route: "SQ", frequency: "Once" },
        warnings: ["Monitor lung sounds post-administration"],
      },
      {
        action: "Metronidazole",
        rationale: "Empiric therapy for potential bacterial overgrowth",
        dose: { mgPerKg: 10, route: "PO", frequency: "BID", durationDays: 5 },
      },
    ],
  },
};


export const DiagnosticsAIResponses: Record<string, DiagnosticsResponse> = {

  case_123: {
    diagnostics: [
      {
        "testName": "Urinalysis",
        "priority": "high",
        "reasoning": "Essential for evaluating lower urinary tract disease and confirming presence of inflammation or crystals.",
        "recommendedByAI": true
      },
      {
        "testName": "Urine Culture & Sensitivity",
        "priority": "high",
        "reasoning": "Confirms bacterial infection and guides antimicrobial selection.",
        "recommendedByAI": true
      },
      {
        "testName": "Abdominal Ultrasound",
        "priority": "medium",
        "reasoning": "Helps evaluate bladder structure, stones, masses, or thickening suggestive of chronic disease.",
        "recommendedByAI": false
      },
      {
        "testName": "Bloodwork (CBC/Chemistry)",
        "priority": "low",
        "reasoning": "Useful if systemic illness or concurrent renal disease is suspected.",
        "recommendedByAI": false
      }
    ]
  }
}


export const TreatmentAIResponse: Record<string, TreatmentResponse> = {
  case_123: {

    treatments: [
      {
        "drugName": "Amoxicillin-Clavulanate",
        "displayText": "12.5 mg/kg PO q12h for 10 days",
        "rationale": "Culture-guided therapy with ISCAID-concordant dosing for E. coli cystitis.",
        "dose": {
          "mgPerKg": 12.5,
          "route": "PO",
          "frequency": "q12h",
          "durationDays": 10
        },
        "calculation": {
          "patientWeightKg": 4.5,
          "perDoseMg": 56.25,
          "tabletStrengthMg": 62.5,
          "perDoseTablets": 1,
          "totalTablets": 20,
          "notes": "Rounded to nearest practical tablet size for accurate home dosing."
        },
        "source": {
          "guideline": "ISCAID UTI Guidelines (2019)",
          "protocolName": "Woodhaven UTI Standard",
          "url": "https://www.iscaid.org/guidelines"
        },
        "warnings": [
          "Avoid in patients with history of severe beta-lactam allergy.",
          "Monitor renal function in older cats."
        ]
      },
      {
        "drugName": "Gabapentin",
        "displayText": "5–10 mg/kg PO q8–12h as needed",
        "rationale": "Provides analgesia for lower urinary tract discomfort.",
        "dose": {
          "mgPerKg": "5–10",
          "route": "PO",
          "frequency": "q8–12h",
          "durationDays": "As needed"
        },
        "calculation": {
          "patientWeightKg": 4.5,
          "perDoseMg": "22.5–45 mg",
          "notes": "Use liquid formulation for small patients to improve dosing accuracy."
        },
        "source": {
          "guideline": "International Feline Pain Council Recommendations",
          "protocolName": "Clinic Pain Management Protocol"
        },
        "warnings": [
          "May cause mild sedation.",
          "Use lower end of dose range in geriatric patients."
        ]
      }
    ]
  }
}