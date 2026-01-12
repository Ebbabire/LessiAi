// src/components/ui/ReadinessBlock.tsx
// Deterministic "Why I'm silent" gatekeeper for Intelligence panels

import { Lock, AlertCircle, ArrowRight } from "lucide-react";
import type { ReadinessStatus } from "@/type/intelligence";

interface ReadinessBlockProps {
  readiness: ReadinessStatus;
  className?: string;
}

/**
 * ReadinessBlock displays explicit reasons why Intelligence panels are locked.
 * - Shows lock state with missing inputs from backend
 * - Displays actionable unlock condition
 * - Zero flicker: renders deterministically based on backend response
 */
export const ReadinessBlock = ({
  readiness,
  className = "",
}: ReadinessBlockProps) => {
  const { missingInputs, unlockCondition } = readiness;

  return (
    <div
      className={`bg-[#1A1D21] border border-[#2A2F33] rounded-xl shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-[#0D0F12] border-b border-[#2A2F33] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <Lock size={16} className="text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[#F2F2F2]">
            Intelligence Locked
          </h3>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-medium">
            Awaiting required data
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Missing Inputs Section */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <AlertCircle size={12} className="text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
              Missing Inputs
            </span>
          </div>

          <div className="space-y-2">
            {missingInputs.map((input, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 bg-[#0D0F12] rounded-lg border border-[#2A2F33]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-sm text-[#F2F2F2] font-medium flex-1">
                  {input}
                </span>
                <span className="text-[9px] font-bold text-amber-500/60 uppercase px-1.5 py-0.5 bg-amber-500/10 rounded">
                  Required
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Unlock Condition */}
        <div className="pt-3 border-t border-[#2A2F33]">
          <div className="flex items-center gap-1.5 mb-2">
            <ArrowRight size={12} className="text-[#2D9CDB]" />
            <span className="text-[10px] font-bold text-[#2D9CDB] uppercase tracking-wider">
              To Unlock
            </span>
          </div>
          <p className="text-sm text-[#9BA3AF] leading-relaxed pl-4">
            {unlockCondition}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-[#0D0F12] border-t border-[#2A2F33]">
        <p className="text-[10px] text-[#6B7280] text-center">
          Clinical reasoning, diagnostics, and treatment panels will appear once
          all required inputs are provided.
        </p>
      </div>
    </div>
  );
};
