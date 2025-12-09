import { useMemo, useState } from "react";
import CaseItem from "./CaseItem";
import type { Case } from "@/type/case";
import { SortIcon } from "@/components/ui/SortIcon";

interface CaseListProps {
  cases: Case[];
  onSelectCase: (id: string) => void;
  selectedId?: string | null;
}

const CaseList = ({ cases, onSelectCase, selectedId }: CaseListProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [cases, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  return (
    <div className="w-full bg-[#1A1D21] border border-[#2A2F33] rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header bar with sort control */}
      <div className="px-4 py-3 bg-[#1A1D21] border-b border-[#2A2F33] flex justify-between items-center shrink-0">
        <span className="text-xs font-bold text-[#9BA3AF] uppercase tracking-wider">
          Cases
        </span>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1 text-[11px] font-medium text-[#9BA3AF] hover:text-[#F2C94C] transition-colors bg-[#0D0F12] border border-[#2A2F33] hover:border-[#F2C94C]/50 rounded px-2 py-1 shadow-sm"
          title={`Sort by Date ${
            sortOrder === "asc" ? "(Oldest First)" : "(Newest First)"
          }`}
        >
          <span>Date</span>
          <SortIcon order={sortOrder} />
        </button>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto flex-1 bg-[#1A1D21] p-1">
        {sortedCases.length === 0 ? (
          <div className="p-8 text-center text-[#9BA3AF] text-sm">
            No cases found.
          </div>
        ) : (
          sortedCases.map((patientCase) => (
            <CaseItem
              key={patientCase.id}
              patientCase={patientCase}
              onSelectCase={onSelectCase}
              isSelected={patientCase.id === selectedId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CaseList;
