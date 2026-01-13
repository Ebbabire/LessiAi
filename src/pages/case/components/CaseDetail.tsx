import { useMemo, useEffect, useState } from "react";
import type { Case } from "@/type/case";
import type { ReadinessStatus } from "@/type/intelligence";
import { useCaseContext } from "@/hooks/useCaseContext";
import { useIsMobile } from "@/hooks/useMediaQuery";

// Components
import { ReasoningPanel } from "./ReasoningPanel/ReasoningPanel";
import { TreatmentPanel } from "./TreatmentPanel/TreatmentPanel";
import { OpsIntelPanel } from "./OpsIntelPanel/OpsIntelPanel";
import { DiagnosticsPanel } from "./DiagnosticsPanel/DiagnosticsPanel";
import { CaseIntelPanel } from "./CaseIntelPanel/CaseInetlPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ReadinessBlock } from "@/components/ui/ReadinessBlock";

// Mock Data Source (this will be changed to a React Query hook)
import { mockAIResponses, mockBundles } from "@/data/mockIntellegence";
import { logEvent } from "@/lib/telemetry";

// Dev Mode: Mock readiness for testing locked state
const MOCK_LOCKED_READINESS: ReadinessStatus = {
  isReady: false,
  missingInputs: [
    "Patient Weight",
    "Urine Culture Results",
    "Clinical History",
  ],
  unlockCondition:
    "Update patient record with weight and attach pending lab results in VitalRads.",
};

interface CaseDetailProps {
  caseData: Case;
}

export const CaseDetail = ({ caseData }: CaseDetailProps) => {
  const { setActiveCaseId, setExpandedPanels } = useCaseContext();
  const isMobile = useIsMobile();

  // Dev Mode Simulator: Toggle to test locked state locally
  const [simulateLock, setSimulateLock] = useState(false);

  // Telemetry: Log Case Opened
  useEffect(() => {
    if (caseData.id) {
      logEvent("case_opened", caseData.id);
    }
  }, [caseData.id]);

  // Sync active case with context
  useEffect(() => {
    setActiveCaseId(caseData.id);
  }, [caseData.id, setActiveCaseId]);

  // Retrieve Intelligence Data
  const bundle = useMemo(() => mockBundles[caseData.id] || null, [caseData.id]);
  const aiResponse = useMemo(
    () => mockAIResponses[caseData.id] || null,
    [caseData.id]
  );

  // Determine lock state: Backend authority via aiResponse.readiness
  // Dev Mode: simulateLock overrides for QA testing
  const isLocked = useMemo(() => {
    if (simulateLock) return true;
    return aiResponse?.readiness?.isReady === false;
  }, [aiResponse?.readiness?.isReady, simulateLock]);

  // Get readiness data for display
  const readinessData = useMemo((): ReadinessStatus | null => {
    if (simulateLock) return MOCK_LOCKED_READINESS;
    if (aiResponse?.readiness && !aiResponse.readiness.isReady) {
      return aiResponse.readiness;
    }
    return null;
  }, [aiResponse?.readiness, simulateLock]);

  // Auto-Surface Logic: Automatically open relevant panels based on data presence
  // On mobile: collapse more aggressively to reduce scrolling
  // Only run when NOT locked
  useEffect(() => {
    if (aiResponse && !isLocked) {
      const hasTreatment =
        aiResponse.treatments && aiResponse.treatments.length > 0;
      const hasDiagnostics =
        aiResponse.diagnostics && aiResponse.diagnostics.length > 0;

      // Set the layout in ONE batch update to prevent race conditions
      setExpandedPanels((prev) => ({
        ...prev,
        // On mobile: only expand patient panel by default, collapse others
        // On desktop: auto-surface if data exists
        patient: !isMobile,
        reasoning: !isMobile,
        treatment: isMobile ? false : hasTreatment,
        diagnostics: isMobile ? false : hasDiagnostics,
      }));
    }
  }, [aiResponse, setExpandedPanels, isMobile, isLocked]);

  return (
    <div className="h-[400px] lg:h-full scrollbar-thin scrollbar-thumb-[#2A2F33] scrollbar-track-transparent bg-[#0D0F12] border border-[#2A2F33] rounded-lg shadow-sm flex flex-col overflow-y-auto animate-in fade-in duration-300 relative">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 bg-[#1A1D21] border-b border-[#2A2F33] shrink-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-bold text-[#F2F2F2] leading-tight">
              {caseData.name}
            </h1>
            <span className="text-xs text-[#9BA3AF] font-mono">
              #{caseData.id}
            </span>
          </div>
        </div>
        <div className="text-right">
          <StatusBadge label={caseData.status} variant={caseData.status} />
        </div>
      </div>

      {/* Scrollable Panel Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-[#2A2F33] scrollbar-track-transparent">
        {bundle ? (
          <>
            {/* CaseIntelPanel (Summary) - Always visible regardless of lock state */}
            <CaseIntelPanel bundle={bundle} nextSteps={aiResponse?.nextSteps} />

            {/* Intelligence Panels - Gated by readiness */}
            {isLocked && readinessData ? (
              // LOCKED: Show ReadinessBlock explaining why panels are silent
              <ReadinessBlock readiness={readinessData} />
            ) : (
              // UNLOCKED: Show Intelligence Panels normally
              <>
                <ReasoningPanel reasoningResponse={aiResponse} />
                <DiagnosticsPanel
                  diagnosticsResponse={aiResponse?.diagnostics}
                  trustData={aiResponse?.meta}
                />
                <TreatmentPanel
                  treatmentResponse={aiResponse?.treatments}
                  progressionMode={aiResponse?.progressionMode}
                  trustData={aiResponse?.meta}
                />
                <OpsIntelPanel />
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-[#1A1D21] p-6 rounded-xl border border-[#2A2F33] shadow-sm max-w-sm">
              <div className="w-12 h-12 bg-[#2A2F33] rounded-full flex items-center justify-center mx-auto mb-4 text-[#9BA3AF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
              </div>
              <h3 className="text-[#F2F2F2] font-medium">Standard Case View</h3>
              <p className="text-[#9BA3AF] text-sm mt-1">
                Intelligence features are not enabled for this case type.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Dev Mode Simulator Button - Only visible in development */}
      {import.meta.env.DEV && (
        <button
          onClick={() => setSimulateLock((prev) => !prev)}
          className={`fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
            simulateLock
              ? "bg-amber-500 text-black hover:bg-amber-400"
              : "bg-[#2A2F33] text-[#9BA3AF] hover:bg-[#3A3F43] border border-[#3A3F43]"
          }`}
        >
          {simulateLock ? "🔒 Locked (Dev)" : "🔓 Toggle Lock"}
        </button>
      )}
    </div>
  );
};
