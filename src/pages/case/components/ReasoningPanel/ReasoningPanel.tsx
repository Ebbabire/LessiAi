import { useState } from "react";
import { PanelShell } from "@/components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { ClinicalAIResponse, ProgressionMode } from "@/type/intelligence";
import { AlertOctagon, BookOpen, ListOrdered, ChevronDown, ChevronRight } from "lucide-react";

interface ReasoningPanelProps {
  reasoningResponse: ClinicalAIResponse | null;
  isLoading?: boolean;
}

// Progression Mode styling configuration
const progressionConfig: Record<
  ProgressionMode,
  { label: string; bg: string; text: string; border: string }
> = {
  ADVANCE: {
    label: "ADVANCE",
    bg: "bg-indigo-500/15",
    text: "text-indigo-400",
    border: "border-indigo-500/40",
  },
  PIVOT: {
    label: "PIVOT",
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/40",
  },
  MONITOR: {
    label: "MONITOR",
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/40",
  },
  ESCALATE: {
    label: "ESCALATE",
    bg: "bg-rose-500/15",
    text: "text-rose-400",
    border: "border-rose-500/40",
  },
};

export const ReasoningPanel = ({ reasoningResponse }: ReasoningPanelProps) => {
  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();
  const [expandedDifferential, setExpandedDifferential] = useState<number | null>(null);

  const hasRecommendations =
    reasoningResponse &&
    reasoningResponse.differentials &&
    reasoningResponse.differentials.length > 0;

  const primaryDx = hasRecommendations
    ? reasoningResponse.differentials[0]
    : null;
  const otherDx = hasRecommendations
    ? reasoningResponse.differentials.slice(1)
    : [];

  const progressionMode = reasoningResponse?.progressionMode || "MONITOR";
  const modeStyle = progressionConfig[progressionMode];

  return (
    <PanelShell
      title="Clinical Reasoning"
      isExpanded={expandedPanels["reasoning"]}
      onToggle={() => togglePanel("reasoning")}
      icon={<BookOpen size={18} />}
      telemetryLabel="reasoning_panel_viewed"
      caseId={activeCaseId}
      trustData={reasoningResponse?.meta}
    >
      {/* Progression Mode Header */}
      <div
        className={`w-full mb-4 px-3 py-2.5 border rounded-md font-bold text-xs uppercase tracking-widest text-center ${modeStyle.bg} ${modeStyle.text} ${modeStyle.border}`}
      >
        Case Mode: {modeStyle.label}
      </div>

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
            <h2 className="text-xl font-bold text-[#F2F2F2] leading-tight">
              {primaryDx}
            </h2>
          </div>

          {/* Differentials List - Strictly ranked, no narrative */}
          {otherDx.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-[#2A2F33] pb-2">
                <ListOrdered size={14} className="text-[#9BA3AF]" />
                <span className="text-xs font-bold text-[#9BA3AF] uppercase tracking-wider">
                  Differentials
                </span>
              </div>
              <div className="grid gap-1.5">
                {otherDx.map((dx, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() =>
                        setExpandedDifferential(
                          expandedDifferential === idx ? null : idx
                        )
                      }
                      className="w-full flex items-center gap-3 p-2 rounded-md bg-[#0D0F12] border border-[#2A2F33] hover:border-[#2D9CDB]/30 transition-colors group"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded bg-[#2A2F33] text-[#9BA3AF] text-[10px] font-mono group-hover:text-[#2D9CDB]">
                        {idx + 2}
                      </span>
                      <span className="text-sm text-[#F2F2F2] font-medium flex-1 text-left">
                        {dx}
                      </span>
                      {expandedDifferential === idx ? (
                        <ChevronDown size={14} className="text-[#9BA3AF]" />
                      ) : (
                        <ChevronRight size={14} className="text-[#9BA3AF]" />
                      )}
                    </button>
                    {/* Expandable reasoning - only shown on click */}
                    {expandedDifferential === idx && reasoningResponse.summary && (
                      <div className="mt-1 ml-8 p-2 bg-[#1A1D21] rounded border border-[#2A2F33]">
                        <p className="text-xs text-[#9BA3AF] leading-relaxed">
                          {reasoningResponse.summary}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Protocols (Red Flags) */}
          {reasoningResponse.redFlags &&
            reasoningResponse.redFlags.length > 0 && (
              <div className="bg-[#EB5757]/5 border border-[#EB5757]/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertOctagon size={14} className="text-[#EB5757]" />
                  <span className="text-xs font-bold text-[#EB5757] uppercase tracking-wider">
                    Safety Protocols
                  </span>
                </div>
                <div className="space-y-1.5">
                  {reasoningResponse.redFlags.map((flag, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-[#EB5757] shrink-0" />
                      <p className="text-sm text-[#F2F2F2] leading-snug">
                        {flag}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            No clinical reasoning available.
          </span>
        </div>
      )}
    </PanelShell>
  );
};
