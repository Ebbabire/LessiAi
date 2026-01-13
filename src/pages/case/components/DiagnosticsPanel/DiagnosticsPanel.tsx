import { useCaseContext } from "@/hooks/useCaseContext";

import type {
  DiagnosticItem as DiagnosticItemType,
  TrustMetadata,
} from "../../../../type/intelligence";

import { PanelShell } from "@/components/ui/PanelShell";
import { DiagnosticItem } from "./DiagnosticsItem";
import { CheckCircle2, LucideMicroscope } from "lucide-react";
import { SuccessCard } from "@/components/ui/SuccessCard";

export interface DiagnosticsPanelProps {
  diagnosticsResponse: DiagnosticItemType[];
  trustData?: TrustMetadata;
}
export const DiagnosticsPanel = ({
  diagnosticsResponse,
  trustData,
}: DiagnosticsPanelProps) => {
  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();

  const diagnostics = diagnosticsResponse || [];

  return (
    <PanelShell
      title="Diagnostic Panel"
      isExpanded={expandedPanels["diagnostics"]}
      onToggle={() => togglePanel("diagnostics")}
      icon={<LucideMicroscope className="h-5 w-5 text-[#9BA3AF]" />}
      telemetryLabel="diagnostics_panel_viewed"
      caseId={activeCaseId}
      trustData={trustData}
    >
      {diagnostics.length === 0 ? (
        <SuccessCard
          title="No immediate diagnostics pending"
          message="Standard monitoring protocols apply"
          icon={<CheckCircle2 size={20} />}
          variant="success"
        />
      ) : (
        <div className="space-y-3">
          {diagnostics.map((item, idx) => (
            <DiagnosticItem key={idx} test={item} />
          ))}
        </div>
      )}
    </PanelShell>
  );
};
