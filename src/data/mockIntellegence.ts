import type { CaseBundleV1, ClinicalAIResponse } from "@/type/intelligence";

export const mockBundles: Record<string, CaseBundleV1> = {
  case_123: {
    case: {
      id: "case_123",
      description:
        "Indoor cat with 3-day history of pollakiuria, stranguria, and occasional hematuria.",
      clinicalHistory:
        "Previously healthy, no prior urinary issues reported. Exam findings: Mild discomfort on bladder palpation; otherwise unremarkable.",
      status: "New",
    },
    patient: {
      name: "Mittens",
      species: "FELINE",
      breed: "Domestic Shorthair",
      sex: "FS",
      age: 10,
      weightKg: 4.5,
    },
    clinic: {
      name: "Woodhaven Animal Hospital",
    },
    flags: ["lower_urinary_signs", "recurrent_risk"],
    imaging: [],
  },
  "C-2023-001": {
    case: {
      id: "C-2023-001",
      description: "Acute vomiting × 24 hours",
      clinicalHistory:
        "Case state: Active Evaluation → Watching → Resolved if improvement with supportive care. Escalation thresholds: Persistent vomiting >48h, radiographic obstruction, worsening pain, electrolyte abnormalities.",
      status: "In Progress",
    },
    patient: {
      name: "Bella",
      species: "CANINE",
      breed: "Golden Retriever",
      sex: "FS",
      age: 4,
      weightKg: 28.5,
    },
    clinic: { name: "Main Street Vet" },
    flags: ["vomiting", "dehydration_risk"],
    imaging: [],
  },
  "C-2023-002": {
    case: {
      id: "C-2023-002",
      description: "Annual wellness exam and vaccinations.",
      clinicalHistory: "Doing well at home. No significant history.",
      status: "Completed",
    },
    patient: {
      name: "Luna",
      species: "FELINE",
      breed: "DSH",
      sex: "FS",
      age: 2,
      weightKg: 4.2,
    },
    clinic: { name: "Main Street Vet" },
    flags: [],
    imaging: [],
  },
};

export const mockAIResponses: Record<string, ClinicalAIResponse> = {
  case_123: {
    progressionMode: "ADVANCE",
    summary:
      "Clinical presentation and urinalysis consistent with bacterial cystitis.",
    meta: {
      finding_confidence: "suggestive",
      evidence_strength: "moderate",
      source_class: "Clinical Guidelines",
      reasoning_type: "Deductive",
      explanation: "Based on clinical signs and ISCAID guidelines for feline lower urinary tract disease.",
      uncertainty_notes: "Awaiting urine culture confirmation for definitive diagnosis.",
    },
    differentials: [
      "Bacterial Cystitis",
      "Urolithiasis",
      "Feline Idiopathic Cystitis",
      "Neoplasia",
    ],
    redFlags: ["Risk of obstruction (low/female)", "Ascending infection risk"],
    nextSteps: [
      {
        action: "Collect cystocentesis sample for urinalysis and culture",
        rationale:
          "Confirms bacterial infection and identifies organism for targeted antimicrobial therapy.",
      },
      {
        action: "Start empiric amoxicillin-clavulanate 12.5 mg/kg PO q12h",
        rationale:
          "First-line antibiotic per ISCAID guidelines while awaiting culture results.",
      },
      {
        action: "Increase water intake and consider wet food transition",
        rationale:
          "Environmental management reduces recurrence risk in cats with lower urinary tract disease.",
      },
    ],
    diagnostics: [
      {
        testName: "Urinalysis",
        priority: "high",
        reasoning:
          "Essential for evaluating lower urinary tract disease and confirming presence of inflammation or crystals.",
        recommendedByAI: true,
      },
      {
        testName: "Urine Culture & Sensitivity",
        priority: "high",
        reasoning:
          "Confirms bacterial infection and guides antimicrobial selection.",
        recommendedByAI: true,
      },
      {
        testName: "Abdominal Ultrasound",
        priority: "medium",
        reasoning:
          "Helps evaluate bladder structure, stones, masses, or thickening suggestive of chronic disease.",
        recommendedByAI: false,
      },
      {
        testName: "Bloodwork (CBC/Chemistry)",
        priority: "low",
        reasoning:
          "Useful if systemic illness or concurrent renal disease is suspected.",
        recommendedByAI: false,
      },
    ],
    treatments: [
      {
        drugName: "Amoxicillin-Clavulanate",
        displayText: "12.5 mg/kg PO q12h for 10 days",
        rationale:
          "Culture-guided therapy with ISCAID-concordant dosing for E. coli cystitis.",
        dose: {
          mgPerKg: 12.5,
          route: "PO",
          frequency: "q12h",
          durationDays: 10,
        },
        calculation: {
          patientWeightKg: 4.5,
          perDoseMg: 56.25,
          tabletStrengthMg: 62.5,
          perDoseTablets: 1,
          totalTablets: 20,
          notes:
            "Rounded to nearest practical tablet size for accurate home dosing.",
        },
        source: {
          guideline: "ISCAID UTI Guidelines (2019)",
          protocolName: "Woodhaven UTI Standard",
          url: "https://www.iscaid.org/guidelines",
        },
        warnings: [
          "Avoid in patients with history of severe beta-lactam allergy.",
          "Monitor renal function in older cats.",
        ],
        operationalReference: {
          dosing: {
            dose: "56.25 mg",
            route: "PO",
            frequency: "q12h",
            duration: "10 days",
          },
          timing: {
            recheckInterval: "10-14 days post-completion",
            monitoringWindow: "48-72h for clinical response",
            criticalCheckpoints: ["Day 3", "Day 7", "Day 14"],
          },
          referenceValues: [
            { label: "USG Target", target: ">1.035", unit: "" },
            { label: "WBC (urine)", target: "<5", unit: "HPF" },
          ],
          calculations: [
            {
              label: "Per Dose",
              value: "56.25 mg",
              formula: "4.5kg × 12.5mg/kg",
            },
            {
              label: "Total Course",
              value: "20 tablets",
              formula: "2/day × 10d",
            },
          ],
          contraindications: [
            "Severe beta-lactam allergy",
            "Concurrent nephrotoxic agents",
          ],
          escalation: {
            threshold: "No improvement at 72h or worsening symptoms",
            contact: "Internal Medicine: ext. 2240",
          },
        },
      },
      {
        drugName: "Gabapentin",
        displayText: "5–10 mg/kg PO q8–12h as needed",
        rationale: "Provides analgesia for lower urinary tract discomfort.",
        dose: {
          mgPerKg: "5–10",
          route: "PO",
          frequency: "q8–12h",
          durationDays: "As needed",
        },
        calculation: {
          patientWeightKg: 4.5,
          perDoseMg: "22.5–45 mg",
          notes:
            "Use liquid formulation for small patients to improve dosing accuracy.",
        },
        source: {
          guideline: "International Feline Pain Council Recommendations",
          protocolName: "Clinic Pain Management Protocol",
        },
        warnings: [
          "May cause mild sedation.",
          "Use lower end of dose range in geriatric patients.",
        ],
      },
    ],
  },
  "C-2023-001": {
    progressionMode: "PIVOT",
    summary:
      "Acute vomiting presentation consistent with gastritis/dietary indiscretion or pancreatitis. Initial diagnostics to guide management with supportive care approach.",
    meta: {
      finding_confidence: "uncertain",
      evidence_strength: "limited",
      source_class: "Clinical Experience",
      reasoning_type: "Inductive",
      explanation: "Multiple differentials possible; prioritizing obstruction rule-out and stabilization.",
      uncertainty_notes: "Multiple differentials remain; pending radiographic and lab results.",
    },
    differentials: [
      "Acute gastritis / dietary indiscretion",
      "Pancreatitis",
      "Partial obstruction",
    ],
    redFlags: [
      "Persistent vomiting >48h",
      "Radiographic obstruction",
      "Worsening pain",
      "Electrolyte abnormalities",
    ],
    nextSteps: [
      {
        action:
          "Administer Maropitant (Cerenia) 1 mg/kg SQ for antiemetic control",
        rationale:
          "First-line antiemetic to stop vomiting cycle and improve patient comfort.",
      },
      {
        action: "Provide subcutaneous fluid bolus (500ml LRS) for rehydration",
        rationale:
          "Addresses dehydration from fluid losses; reassess hydration status in 4-6 hours.",
      },
      {
        action:
          "NPO for 12-24 hours, then introduce bland diet in small portions",
        rationale:
          "GI rest followed by gradual refeeding reduces recurrence risk.",
      },
      {
        action: "Recheck if vomiting persists >48h or new symptoms develop",
        rationale:
          "Escalation pathway: consider abdominal ultrasound or hospitalization if no improvement.",
      },
    ],
    diagnostics: [
      {
        testName: "Abdominal radiographs",
        priority: "high",
        reasoning:
          "Initial imaging to evaluate for obstruction, foreign body, or gas patterns suggestive of pancreatitis.",
        recommendedByAI: true,
      },
      {
        testName: "CBC/Chem",
        priority: "high",
        reasoning:
          "Assess hydration status, electrolyte balance, and screen for pancreatitis or systemic illness.",
        recommendedByAI: true,
      },
      {
        testName: "Ultrasound",
        priority: "medium",
        reasoning:
          "Conditional only if rads inconclusive or signs persist after initial diagnostics.",
        recommendedByAI: false,
      },
    ],
    treatments: [
      {
        drugName: "Maropitant (Cerenia)",
        displayText: "28 mg SQ Once",
        rationale: "Antiemetic for vomiting control.",
        dose: { mgPerKg: 1, route: "SQ", frequency: "Once", durationDays: 1 },
        calculation: { patientWeightKg: 28.5, perDoseMg: 28.5 },
        operationalReference: {
          dosing: {
            dose: "28.5 mg",
            route: "SQ",
            frequency: "Once daily",
            duration: "1-5 days PRN",
          },
          timing: {
            recheckInterval: "4-6 hours post-admin",
            monitoringWindow: "24-48h",
          },
          referenceValues: [
            { label: "Hydration", target: "<5%", unit: "dehydration" },
          ],
          calculations: [
            { label: "Dose", value: "28.5 mg", formula: "28.5kg × 1mg/kg" },
          ],
          escalation: {
            threshold: "Vomiting persists >48h or new symptoms",
            contact: "ER: ext. 1100",
          },
        },
      },
      {
        drugName: "LRS Fluids",
        displayText: "500ml SQ Bolus",
        rationale: "Restore hydration.",
        dose: { mgPerKg: 20, route: "SQ", frequency: "Once", durationDays: 1 },
        warnings: ["Listen to lungs post-admin"],
        operationalReference: {
          dosing: {
            dose: "500 ml",
            route: "SQ",
            frequency: "Bolus",
          },
          timing: {
            recheckInterval: "4-6 hours",
            criticalCheckpoints: ["2h", "4h", "6h"],
          },
          referenceValues: [
            { label: "Skin Turgor", target: "Normal", unit: "" },
            { label: "CRT", target: "<2", unit: "sec" },
          ],
          contraindications: ["Pulmonary edema", "Cardiac disease"],
        },
      },
    ],
  },
  "C-2023-002": {
    summary:
      "Healthy 2-year-old feline presenting for routine annual wellness examination. No abnormalities detected on physical exam.",
    meta: {
      finding_confidence: "definitive",
      evidence_strength: "strong",
      source_class: "Physical Examination",
      reasoning_type: "Observational",
      explanation: "Routine wellness visit; standard preventive care guidelines apply.",
    },
    differentials: [],
    redFlags: [],
    nextSteps: [],
    diagnostics: [
      {
        testName: "Fecal examination",
        priority: "low",
        reasoning:
          "Recommended annually to screen for intestinal parasites, even in indoor cats.",
        recommendedByAI: false,
      },
      {
        testName: "Baseline bloodwork (CBC/Chem)",
        priority: "low",
        reasoning:
          "Optional for young healthy cats; establishes baseline values for future comparison.",
        recommendedByAI: false,
      },
    ],
    treatments: [],
  },
};
