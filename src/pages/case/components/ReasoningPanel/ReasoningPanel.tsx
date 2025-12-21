import { PanelShell } from "@/components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { ClinicalAIResponse } from "@/type/intelligence";
import { AlertOctagon, BookOpen, ListOrdered } from "lucide-react";

interface ReasoningPanelProps {
  reasoningResponse: ClinicalAIResponse | null;
  isLoading?: boolean;
}

export const ReasoningPanel = ({ reasoningResponse }: ReasoningPanelProps) => {
  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();
  const hasRecommendations =
    reasoningResponse &&
    reasoningResponse.differentials &&
    reasoningResponse.differentials.length > 0;

  const primaryDx = hasRecommendations
    ? reasoningResponse.differentials[0]
    : [];
  const otherDx = hasRecommendations
    ? reasoningResponse.differentials.slice(1)
    : [];

  return (
    <PanelShell
      title="Clinical Reasoning"
      isExpanded={expandedPanels["reasoning"]}
      onToggle={() => togglePanel("reasoning")}
      icon={<BookOpen size={18} />}
      telemetryLabel="reasoning_panel_viewed"
      caseId={activeCaseId}
    >
      {hasRecommendations ? (
        <div className="space-y-4">
          {/* Primary Diagnosis */}
          <div className="relative pl-4 border-l-2 border-[#2D9CDB]/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2D9CDB] text-white text-[10px] font-bold">
                1
              </span>
              <span className="text-[10px] font-bold text-[#2D9CDB] uppercase tracking-widest">
                Leading Hypothesis
              </span>
            </div>
            <p className="text-[10px] text-[#9BA3AF] mb-2 font-medium">
              Prioritized by likelihood — Not confirmed.
            </p>
            <h2 className="text-xl font-bold text-[#F2F2F2] leading-tight">
              {primaryDx}
            </h2>
            <p className="text-sm text-[#9BA3AF] mt-2 leading-relaxed italic">
              {reasoningResponse.summary}
            </p>
          </div>

          {/* Differentials List */}
          {otherDx.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#2A2F33] pb-2">
                <ListOrdered size={14} className="text-[#9BA3AF]" />
                <span className="text-xs font-bold text-[#9BA3AF] uppercase tracking-wider">
                  Ranked Differentials
                </span>
              </div>
              <div className="grid gap-2">
                {otherDx.map((dx, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-md bg-[#0D0F12] border border-[#2A2F33] hover:border-[#2D9CDB]/30 transition-colors group"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-[#2A2F33] text-[#9BA3AF] text-[10px] font-mono group-hover:text-[#2D9CDB]">
                      {idx + 2}
                    </span>
                    <span className="text-sm text-[#F2F2F2] font-medium">
                      {dx}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Protocols (Red Flags) - Referral Thresholds */}
          {reasoningResponse.redFlags &&
            reasoningResponse.redFlags.length > 0 && (
              <div className="bg-[#EB5757]/5 border border-[#EB5757]/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertOctagon size={16} className="text-[#EB5757]" />
                  <span className="text-xs font-bold text-[#EB5757] uppercase tracking-wider">
                    Safety Protocols / Referral Thresholds
                  </span>
                </div>
                <div className="space-y-2">
                  {reasoningResponse.redFlags.map((flag, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-[#EB5757] shrink-0" />
                      <p className="text-sm text-[#F2F2F2] leading-snug">
                        {flag}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[#EB5757]/20">
                  <p className="text-[10px] text-[#EB5757] font-medium uppercase text-center tracking-wider">
                    Presence of these markers suggests immediate specialist
                    referral or emergency escalation.
                  </p>
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            No AI Clinical Reasoning available for this case.
          </span>
        </div>
      )}
    </PanelShell>
  );
};
