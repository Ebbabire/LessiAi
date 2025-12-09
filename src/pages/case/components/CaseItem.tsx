import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Case } from "@/type/case";

import { ChevronRight } from "lucide-react";

interface CaseItemProps {
  patientCase: Case;
  onSelectCase: (id: string) => void;
  isSelected?: boolean;
}

const CaseItem = ({ patientCase, onSelectCase, isSelected }: CaseItemProps) => {
  return (
    <div
      onClick={() => onSelectCase(patientCase.id)}
      className={`group relative flex items-center p-4 cursor-pointer transition-colors duration-150 ease-in-out border-l-4 ${
        isSelected
          ? "bg-[#252a31] border-[#F2C94C]"
          : "bg-transparent border-transparent hover:bg-[#2A2F33] hover:border-[#615e35]"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectCase(patientCase.id);
        }
      }}
    >
      {/* Left Column: ID & Main Info */}
      <div className="flex-1 min-w-0 grid gap-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-medium text-[#9BA3AF] bg-[#2A2F33] px-1.5 py-0.5 rounded">
            {patientCase.id}
          </span>
          <div className="flex items-baseline gap-2 truncate">
            <h3
              className={`text-sm font-semibold truncate ${
                isSelected ? "text-[#F2C94C]" : "text-[#F2F2F2]"
              } group-hover:text-[#F2F2F2]`}
            >
              {patientCase.name}
            </h3>
            <span className="text-[11px] text-[#9BA3AF] font-medium uppercase tracking-wide">
              {patientCase.species}
            </span>
          </div>
        </div>

        {/* Complaint truncated to 1 line */}
        <p className="text-sm text-[#9BA3AF] truncate pr-4">
          {patientCase.complaint}
        </p>

        <div className="flex items-center gap-2 mt-1 md:hidden">
          <StatusBadge
            label={patientCase.status}
            variant={patientCase.status}
          />
          <span className="text-[10px] text-[#9BA3AF]">
            {patientCase.createdAt}
          </span>
        </div>
      </div>

      {/* Right Column: Status, Date, Action (Visible on medium screens and up) */}
      <div className="hidden md:flex items-center gap-6 shrink-0 ml-4">
        <StatusBadge label={patientCase.status} variant={patientCase.status} />
        <span className="text-[11px] text-[#9BA3AF] w-20 text-right">
          {patientCase.createdAt}
        </span>
        <div
          className={`pl-2 transition-colors ${
            isSelected
              ? "text-[#F2C94C]"
              : "text-[#43505a] group-hover:text-[#9BA3AF]"
          }`}
        >
          <ChevronRight size={16} />
        </div>
      </div>

      {/* Mobile Arrow only */}
      <div
        className={`md:hidden ml-2 ${
          isSelected ? "text-[#F2C94C]" : "text-[#2A2F33]"
        }`}
      >
        <ChevronRight size={16} />
      </div>
    </div>
  );
};

export default CaseItem;
