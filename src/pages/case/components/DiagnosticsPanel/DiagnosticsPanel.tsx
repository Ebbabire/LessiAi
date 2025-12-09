import type { CaseBundleV1 } from "@/type/intelligence";
import { PanelShell } from "../../../../components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";

interface DiagnosticsPanelProps {
  bundle?: CaseBundleV1 | null;
}

export const DiagnosticsPanel = ({ bundle }: DiagnosticsPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();
  const labs = bundle?.labs;
  const hasLabs = labs && (labs.urinalysis || labs.culture);

  return (
    <PanelShell
      title="Diagnostics"
      isExpanded={expandedPanels["diagnostics"]}
      onToggle={() => togglePanel("diagnostics")}
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
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      }
    >
      {!hasLabs ? (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            Drag & Drop Lab Results
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {labs.urinalysis && (
            <div className="bg-[#0D0F12] border border-[#2A2F33] rounded-md overflow-hidden">
              <div className="px-3 py-2 bg-[#1A1D21] border-b border-[#2A2F33] flex justify-between items-center">
                <span className="text-xs font-bold text-[#9BA3AF] uppercase">
                  Urinalysis
                </span>
                <span className="text-[10px] text-[#9BA3AF] font-mono">
                  Cystocentesis
                </span>
              </div>
              <div className="p-3 grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-[#9BA3AF]">USG</div>
                <div className="font-medium text-[#F2F2F2] text-right">
                  {labs.urinalysis.specificGravity}
                </div>

                <div className="text-[#9BA3AF]">pH</div>
                <div className="font-medium text-[#F2F2F2] text-right">
                  {labs.urinalysis.ph}
                </div>

                <div className="text-[#9BA3AF]">Bacteria</div>
                <div className="font-medium text-[#EB5757] text-right">
                  {labs.urinalysis.bacteria}
                </div>

                <div className="text-[#9BA3AF]">WBC</div>
                <div className="font-medium text-[#F2F2F2] text-right">
                  {labs.urinalysis.wbc}
                </div>
              </div>
            </div>
          )}

          {labs.culture && (
            <div className="bg-[#0D0F12] border border-[#27AE60]/30 rounded-md p-3">
              <div className="flex items-start gap-2 mb-2">
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
                  className="text-[#27AE60] mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-xs font-bold text-[#27AE60] uppercase">
                  Culture Positive
                </span>
              </div>
              <div className="text-sm font-semibold text-[#F2F2F2] mb-1">
                {labs.culture.organism}
              </div>
              <div className="text-xs text-[#27AE60]/80">
                Sensitive to: {labs.culture.sensitivity?.join(", ")}
              </div>
            </div>
          )}
        </div>
      )}
    </PanelShell>
  );
};
