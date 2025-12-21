import { memo } from "react";
import type { TreatmentItem } from "@/type/intelligence";
import { AlertOctagon, Calculator, Info } from "lucide-react";

interface TreatmentItemProps {
  treatment: TreatmentItem;
  onViewCalculation: (treatment: TreatmentItem) => void;
}

export const TreatmentCard = memo(
  ({ treatment, onViewCalculation }: TreatmentItemProps) => {
    return (
      <div className="border border-[#2A2F33] rounded-lg bg-[#0D0F12] overflow-hidden group hover:border-[#F2C94C]/30 transition-colors">
        {/* Header: Drug Name + Protocol Source */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-[#F2F2F2]">
                  {treatment.drugName}
                </h4>
              </div>
            </div>
            {treatment.calculation && (
              <button
                className="text-[#9BA3AF] hover:text-[#2D9CDB] transition-colors cursor-pointer p-1.5 rounded bg-[#2A2F33]/50 hover:bg-[#2A2F33] flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                onClick={() => onViewCalculation(treatment)}
              >
                <Calculator size={14} />
                Verify Math
              </button>
            )}
          </div>

          {/* Main Instruction */}
          <div className="text-sm text-[#F2F2F2] font-semibold mb-3 bg-[#1A1D21] p-2.5 rounded border border-[#2A2F33]">
            {treatment.displayText}
          </div>

          {/* Rationale (The "Why") */}
          <div className="flex gap-2 mb-4">
            <Info size={14} className="text-[#9BA3AF] mt-0.5 shrink-0" />
            <p className="text-sm text-[#9BA3AF] font-medium leading-snug">
              <span className="text-[#F2F2F2]/70">Rationale:</span>{" "}
              {treatment.rationale}
            </p>
          </div>

          {/* Dose Metadata Pills */}
          {treatment.dose && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1D21] border border-[#2A2F33] rounded text-[10px] font-mono text-[#F2F2F2]">
                <span className="text-[#9BA3AF]">DOSE:</span>{" "}
                {treatment.dose.mgPerKg}mg/kg
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1D21] border border-[#2A2F33] rounded text-[10px] font-mono text-[#F2F2F2]">
                <span className="text-[#9BA3AF]">FREQ:</span>{" "}
                {treatment.dose.frequency}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1D21] border border-[#2A2F33] rounded text-[10px] font-mono text-[#F2F2F2]">
                <span className="text-[#9BA3AF]">ROUTE:</span>{" "}
                {treatment.dose.route}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1A1D21] border border-[#2A2F33] rounded text-[10px] font-mono text-[#F2F2F2]">
                <span className="text-[#9BA3AF]">DURATION:</span>{" "}
                {treatment.dose.durationDays}{" "}
                {typeof treatment.dose.durationDays === "number" ? "days" : ""}
              </div>
            </div>
          )}
        </div>

        {/* Warnings Strip */}
        {treatment.warnings && treatment.warnings.length > 0 && (
          <div className="bg-[#EB5757]/10 border-t border-[#EB5757]/20 px-4 py-2.5 flex items-start gap-2.5">
            <AlertOctagon
              size={14}
              className="text-[#EB5757] mt-0.5 shrink-0"
            />
            <div className="text-[11px] text-[#EB5757] font-semibold leading-tight">
              <span className="uppercase tracking-widest text-[9px] block mb-0.5">
                Safety Check
              </span>
              {treatment.warnings.join(" • ")}
            </div>
          </div>
        )}
      </div>
    );
  }
);
