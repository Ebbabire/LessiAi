import type { Case } from "@/type/case";
import type { ClinicalAIResponse } from "@/type/intelligence";
import { AlertOctagon, CheckCircle2 } from "lucide-react";

interface MobileStatusBarProps {
  caseData: Case;
  aiResponse: ClinicalAIResponse | null;
}

export const MobileStatusBar = ({
  caseData,
  aiResponse,
}: MobileStatusBarProps) => {
  const redFlags = aiResponse?.redFlags || [];
  const hasEscalation = redFlags.length > 0;

  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1A1D21] border-b border-[#2A2F33] shadow-lg"
      style={{
        animation:
          "slideDownFromTop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      <style>{`
        @keyframes slideDownFromTop {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="px-4 py-3 space-y-2">
        {caseData.complaint && (
          <div className="bg-[#0D0F12] px-3 py-2 rounded-lg border border-[#2A2F33] mb-4">
            <span className="text-xs font-bold text-[#2D9CDB] uppercase tracking-wide block mb-1">
              Current Clinical Intent
            </span>
            <p className="text-sm text-[#F2F2F2] leading-relaxed">
              {caseData.complaint}
            </p>
          </div>
        )}

        {/* Escalation Thresholds (Red Flags) */}
        {hasEscalation ? (
          <div className="bg-[#EB5757]/10 border border-[#EB5757]/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertOctagon size={14} className="text-[#EB5757]" />
              <span className="text-[10px] font-bold text-[#EB5757] uppercase tracking-wider">
                Escalation Watch
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {redFlags.map((flag, idx) => (
                <span
                  key={idx}
                  className="text-xs text-[#EB5757] bg-[#EB5757]/10 px-2 py-1 rounded font-medium"
                >
                  {flag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#27AE60]/10 border border-[#27AE60]/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#27AE60]" />
              <span className="text-xs font-medium text-[#27AE60]">
                No escalation flags — standard monitoring applies
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
