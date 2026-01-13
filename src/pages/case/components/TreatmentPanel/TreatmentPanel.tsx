import { useState } from "react";
import { Activity, ShieldCheck } from "lucide-react";
import { useCaseContext } from "@/hooks/useCaseContext";

import type {
  TreatmentItem as TreatmentResponse,
  ProgressionMode,
  TrustMetadata,
} from "../../../../type/intelligence";
import { TreatmentCard } from "./components/TreatmentCard";
import { CalculationDialog } from "./components/CalculationDialog";
import { OperationalReferenceBlock } from "./components/OperationalReferenceBlock";
import { PanelShell } from "@/components/ui/PanelShell";
import { logEvent } from "@/lib/telemetry";
import { SuccessCard } from "@/components/ui/SuccessCard";

interface TreatmentPanelProps {
  treatmentResponse: TreatmentResponse[] | null;
  progressionMode?: ProgressionMode;
  trustData?: TrustMetadata;
}

export const TreatmentPanel = ({
  treatmentResponse,
  progressionMode,
  trustData,
}: TreatmentPanelProps) => {
  const [selectedTreatment, setSelectedTreatment] =
    useState<TreatmentResponse | null>(null);

  const hasRecommendations = treatmentResponse && treatmentResponse.length > 0;

  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();
  const isExpanded = expandedPanels["treatment"];

  // Only show operational reference in ADVANCE or PIVOT modes
  const showOperationalReference =
    progressionMode === "ADVANCE" || progressionMode === "PIVOT";

  const handleViewCalculation = (treatment: TreatmentResponse) => {
    if (activeCaseId) {
      logEvent("treatment_math_expanded", activeCaseId, {
        drug: treatment.drugName,
      });
    }
    setSelectedTreatment(treatment);
  };

  return (
    <>
      <PanelShell
        title="Treatment Plan"
        icon={<Activity size={18} />}
        isExpanded={isExpanded}
        onToggle={() => togglePanel("treatment")}
        telemetryLabel="treatments_panel_viewed"
        caseId={activeCaseId}
        trustData={trustData}
      >
        <div className="flex flex-col gap-3">
          {hasRecommendations ? (
            treatmentResponse?.map((treatment, index) => (
              <div key={index}>
                <TreatmentCard
                  treatment={treatment}
                  onViewCalculation={handleViewCalculation}
                />
                {/* Operational Reference Block - only in ADVANCE/PIVOT modes when data present */}
                {showOperationalReference && treatment.operationalReference && (
                  <OperationalReferenceBlock
                    data={treatment.operationalReference}
                  />
                )}
              </div>
            ))
          ) : (
            <SuccessCard
              title="No active pharmacological interventions"
              message="Continue current supportive care"
              icon={<ShieldCheck size={20} />}
              variant="calm"
            />
          )}
        </div>
      </PanelShell>

      {selectedTreatment && (
        <CalculationDialog
          isOpen={!!selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
          treatment={selectedTreatment}
        />
      )}
    </>
  );
};
