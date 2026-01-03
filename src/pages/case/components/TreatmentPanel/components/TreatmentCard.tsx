import { memo } from "react";
import type { TreatmentItem } from "@/type/intelligence";
import { AlertOctagon, ShieldCheck } from "lucide-react";

interface TreatmentItemProps {
  treatment: TreatmentItem;
  onViewCalculation: (treatment: TreatmentItem) => void;
}

export const TreatmentCard = memo(
  ({ treatment, onViewCalculation }: TreatmentItemProps) => {
    return (
      <div className="border border-[#2A2F33] rounded-lg bg-[#0D0F12] overflow-hidden group hover:border-[#F2C94C]/30 transition-colors">
        {/* Warnings Strip - Safety First (Always at top) */}
        {treatment.warnings && treatment.warnings.length > 0 && (
          <div className="bg-[#EB5757]/10 border-b border-[#EB5757]/20 px-3 py-2 flex items-center gap-2">
            <AlertOctagon size={12} className="text-[#EB5757] shrink-0" />
            <span className="text-[10px] text-[#EB5757] font-semibold uppercase tracking-wide">
              {treatment.warnings.join(" • ")}
            </span>
          </div>
        )}

        {/* Compact Content */}
        <div className="p-3">
          {/* Header Row: Drug + Verify Button */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-bold text-[#2D9CDB]">
              {treatment.drugName}
            </h4>
            {treatment.calculation && (
              <button
                className="text-[#9BA3AF] hover:text-[#2D9CDB] transition-colors cursor-pointer px-2 py-1 rounded bg-[#2A2F33]/50 hover:bg-[#2A2F33] flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                onClick={() => onViewCalculation(treatment)}
              >
                <ShieldCheck size={12} />
                Verify
              </button>
            )}
          </div>

          {/* Main Instruction */}
          <div className="text-sm text-[#F2F2F2] font-medium mb-2 bg-[#1A1D21] px-2 py-1.5 rounded border border-[#2A2F33]">
            {treatment.displayText}
          </div>

          {/* Rationale - Compact */}
          <p className="text-xs text-[#9BA3AF] leading-snug mb-2">
            {treatment.rationale}
          </p>

          {/* Dose Metadata - Inline Compact */}
          {treatment.dose && (
            <div className="flex flex-wrap gap-1.5">
              <span className="px-1.5 py-0.5 bg-[#1A1D21] border border-[#2A2F33] rounded text-[9px] font-mono text-[#F2F2F2]">
                {treatment.dose.mgPerKg}mg/kg
              </span>
              <span className="px-1.5 py-0.5 bg-[#1A1D21] border border-[#2A2F33] rounded text-[9px] font-mono text-[#F2F2F2]">
                {treatment.dose.frequency}
              </span>
              <span className="px-1.5 py-0.5 bg-[#1A1D21] border border-[#2A2F33] rounded text-[9px] font-mono text-[#F2F2F2]">
                {treatment.dose.route}
              </span>
              <span className="px-1.5 py-0.5 bg-[#1A1D21] border border-[#2A2F33] rounded text-[9px] font-mono text-[#F2F2F2]">
                {treatment.dose.durationDays}
                {typeof treatment.dose.durationDays === "number" ? "d" : ""}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
