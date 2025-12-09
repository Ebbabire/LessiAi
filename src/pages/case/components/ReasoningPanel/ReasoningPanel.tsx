import { PanelShell } from "@/components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { ClinicalAIResponse } from "@/type/intelligence";

interface ReasoningPanelProps {
  aiResponse: ClinicalAIResponse | null;
  isLoading?: boolean;
}

export const ReasoningPanel = ({
  aiResponse,
  isLoading,
}: ReasoningPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  if (isLoading || !aiResponse) return null;

  const { differentials, redFlags, summary } = aiResponse;
  const primaryDx = differentials[0];
  const otherDx = differentials.slice(1);

  return (
    <PanelShell
      title="Clinical Reasoning"
      isExpanded={expandedPanels["reasoning"]}
      onToggle={() => togglePanel("reasoning")}
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      }
    >
      <div className="space-y-4">
        {/* Primary Diagnosis */}
        <div>
          <span className="text-xs font-bold text-[#27AE60] uppercase tracking-wider block mb-1">
            Primary Consideration
          </span>
          <div className="text-lg font-bold text-[#F2F2F2] flex items-center gap-2">
            {primaryDx}
            <span className="inline-flex h-2 w-2 rounded-full bg-[#27AE60] animate-pulse"></span>
          </div>
          <p className="text-sm text-[#9BA3AF] mt-1">{summary}</p>
        </div>

        {/* Red Flags */}
        {redFlags && redFlags.length > 0 && (
          <div className="bg-[#0D0F12] border border-[#EB5757]/40 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#EB5757]"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
              <span className="text-xs font-bold text-[#EB5757] uppercase">
                Red Flags
              </span>
            </div>
            <ul className="list-disc list-inside text-sm text-[#F2F2F2] space-y-1">
              {redFlags.map((flag, idx) => (
                <li key={idx}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Differentials List */}
        {otherDx.length > 0 && (
          <div className="border-t border-[#2A2F33] pt-3">
            <span className="text-xs font-semibold text-[#9BA3AF] uppercase mb-2 block">
              Differentials
            </span>
            <ul className="space-y-2">
              {otherDx.map((dx, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-[#F2F2F2]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A2F33] mr-2"></span>
                  {dx}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PanelShell>
  );
};
