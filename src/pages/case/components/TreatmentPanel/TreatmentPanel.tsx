import { PanelShell } from "@/components/ui/PanelShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCaseContext } from "@/hooks/useCaseContext";

import type { ClinicalAIResponse } from "@/type/intelligence";

interface TreatmentPanelProps {
  aiResponse: ClinicalAIResponse | null;
  isLoading?: boolean;
}
export const TreatmentPanel = ({
  aiResponse,
  isLoading,
}: TreatmentPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  if (isLoading || !aiResponse) return null;

  return (
    <PanelShell
      title="Suggested Plan"
      isExpanded={expandedPanels["treatment"]}
      onToggle={() => togglePanel("treatment")}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      }
    >
      <div className="space-y-3">
        {aiResponse.nextSteps.map((step, idx) => (
          <div
            key={idx}
            className="border border-[#2A2F33] rounded-lg p-3 hover:border-[#F2C94C]/50 transition-colors bg-[#0D0F12] group shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex items-center justify-center w-5 h-5 rounded border border-[#2A2F33] text-transparent group-hover:text-[#F2C94C] cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F2F2F2]">
                    {step.action}
                  </h4>
                  <p className="text-xs text-[#9BA3AF] italic mt-0.5">
                    {step.rationale}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {step.dose && (
                      <StatusBadge
                        label={`${step.dose.mgPerKg} mg/kg ${step.dose.route}`}
                        variant="neutral"
                        className="font-mono text-[10px]"
                      />
                    )}
                    {step.warnings?.map((warn, wIdx) => (
                      <StatusBadge
                        key={wIdx}
                        label={warn}
                        variant="warning"
                        className="text-[10px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full mt-2 py-2 text-xs font-medium text-[#2D9CDB] border border-dashed border-[#2A2F33] rounded hover:bg-[#2A2F33] transition-colors">
          + Add Custom Action
        </button>
      </div>
    </PanelShell>
  );
};
