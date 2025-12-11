import { useMemo, useEffect } from "react";
import type { Case } from "@/type/case";
import { useCaseContext } from "@/hooks/useCaseContext";

// Components
import { ReasoningPanel } from "./ReasoningPanel/ReasoningPanel";
import { TreatmentPanel } from "./TreatmentPanel_v0/TreatmentPanel";
import { OpsIntelPanel } from "./OpsIntelPanel/OpsIntelPanel";
import { DiagnosticsPanel } from "./DiagnosticsPanel_v0/DiagnosticsPanel";

// Mock Data Source (In real app, this would be a React Query hook)
import { DiagnosticsAIResponses, mockAIResponses, mockBundles, TreatmentAIResponse } from "@/data/mockIntellegence";
import { CaseIntelPanel } from "./CaseIntelPanel/CaseInetlPanel";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CaseDetailProps {
  caseData: Case;
  onBack?: () => void;
}

export const CaseDetail = ({ caseData, onBack }: CaseDetailProps) => {
  const { setActiveCaseId } = useCaseContext();

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
  const diagnosticsResponse = useMemo(
    () => DiagnosticsAIResponses[caseData.id] || null,
    [caseData.id]
  );
  const TreatmentResponse = useMemo(
    () => TreatmentAIResponse[caseData.id] || null,
    [caseData.id]
  );

  return (
    <div className="h-[400px] lg:h-full bg-[#0D0F12] border border-[#2A2F33] rounded-lg shadow-sm flex flex-col overflow-y-auto animate-in fade-in duration-300 relative">
      {/* Header */}
      <div className="px-6 py-4 bg-[#1A1D21] border-b border-[#2A2F33] shrink-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              title="back"
              onClick={onBack}
              className="p-1.5 hover:bg-[#2A2F33] rounded-full text-[#9BA3AF] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#2A2F33] scrollbar-track-transparent">
        {bundle ? (
          <>
            <CaseIntelPanel bundle={bundle} />
            <ReasoningPanel aiResponse={aiResponse} />
            {/* <DiagnosticsPanel bundle={bundle} /> */}
            <DiagnosticsPanel data={diagnosticsResponse} />
            {/* <TreatmentPanel aiResponse={aiResponse} /> */}
            <TreatmentPanel data={TreatmentResponse} />
            <OpsIntelPanel />
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
    </div>
  );
};
