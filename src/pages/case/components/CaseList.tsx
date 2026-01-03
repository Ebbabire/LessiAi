import CaseItem from "./CaseItem";
import type { Case } from "@/type/case";

interface CaseListProps {
  cases: Case[];
  onSelectCase: (id: string) => void;
  selectedId?: string | null;
}

const CaseList = ({ cases, onSelectCase, selectedId }: CaseListProps) => {
  // Backend authority: render list exactly as provided, no client-side sorting
  return (
    <div className="w-full bg-[#1A1D21] border border-[#2A2F33] rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-[#1A1D21] border-b border-[#2A2F33] flex justify-between items-center shrink-0">
        <span className="text-xs font-bold text-[#9BA3AF] uppercase tracking-wider">
          Cases
        </span>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2F33] scrollbar-track-transparent flex-1 bg-[#1A1D21] p-1">
        {cases.length === 0 ? (
          <div className="p-8 text-center text-[#9BA3AF] text-sm">
            No cases found.
          </div>
        ) : (
          cases.map((patientCase) => (
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
