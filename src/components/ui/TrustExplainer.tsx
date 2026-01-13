import { useState } from "react";
import {
  ShieldQuestion,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { TrustMetadata } from "@/type/intelligence";

interface TrustExplainerProps {
  data: TrustMetadata;
}

// Confidence badge styling
const confidenceConfig: Record<
  TrustMetadata["finding_confidence"],
  { label: string; bg: string; text: string; border: string }
> = {
  definitive: {
    label: "Definitive",
    bg: "bg-emerald-500/15",
    text: "text-emerald-400",
    border: "border-emerald-500/40",
  },
  suggestive: {
    label: "Suggestive",
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/40",
  },
  uncertain: {
    label: "Uncertain",
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/40",
  },
};

// Evidence strength styling
const evidenceConfig: Record<
  TrustMetadata["evidence_strength"],
  { label: string; level: number }
> = {
  strong: { label: "Strong", level: 4 },
  moderate: { label: "Moderate", level: 3 },
  limited: { label: "Limited", level: 2 },
  extrapolated: { label: "Extrapolated", level: 1 },
};

export const TrustExplainer = ({ data }: TrustExplainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const confidence = confidenceConfig[data.finding_confidence];
  const evidence = evidenceConfig[data.evidence_strength];

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
        aria-label="Why am I seeing this?"
      >
        <ShieldQuestion size={14} />
        <span className="hidden sm:inline">Why am I seeing this?</span>
        {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {/* Inline Trust Card - Shows below header when open */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-[#0D0F12] border-t border-b border-[#2A2F33] px-4 py-3 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Explanation - Why am I seeing this? */}
          <p className="text-xs text-[#F2F2F2] mb-2">{data.explanation}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {/* Confidence */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#9BA3AF]">Confidence:</span>
              <span
                className={`px-1.5 py-0.5 rounded border ${confidence.bg} ${confidence.text} ${confidence.border} font-medium`}
              >
                {confidence.label}
              </span>
            </div>

            {/* Evidence */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#9BA3AF]">Evidence:</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-2 h-1.5 rounded-sm ${
                        level <= evidence.level
                          ? "bg-indigo-500"
                          : "bg-[#2A2F33]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#F2F2F2]">{evidence.label}</span>
              </div>
            </div>

            {/* Source */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#9BA3AF]">Source:</span>
              <span className="text-[#F2F2F2]">{data.source_class}</span>
            </div>

            {/* Reasoning */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#9BA3AF]">Reasoning:</span>
              <span className="text-[#F2F2F2]">{data.reasoning_type}</span>
            </div>

            {/* Suppression Warning */}
            {data.is_suppressed && (
              <div className="flex items-center gap-1.5 text-rose-400">
                <AlertTriangle size={12} />
                <span className="font-medium">
                  Suppressed: {data.suppression_reason}
                </span>
              </div>
            )}
          </div>

          {/* Uncertainty Notes */}
          {data.uncertainty_notes && (
            <p className="mt-2 text-xs text-[#9BA3AF] italic">
              {data.uncertainty_notes}
            </p>
          )}
        </div>
      )}
    </>
  );
};
