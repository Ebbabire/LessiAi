import { useState } from "react";
import { FileBraces } from "lucide-react";

import { mockCases } from "@/data";
import CaseList from "./components/CaseList";
import { CaseDetail } from "./components/CaseDetail";

const Cases = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectCase = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const selectedCase = selectedId
    ? mockCases.find((c) => c.id === selectedId)
    : null;

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] overflow-y-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Clinical Cases</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage patient intake, history, and active treatments.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 h-full lg:h-[calc(100%-80px)]">
        {/* Left Column: List */}
        <div className="h-[400px] lg:h-full overflow-hidden">
          <CaseList
            cases={mockCases}
            selectedId={selectedId}
            onSelectCase={handleSelectCase}
          />
        </div>

        {/* Right Column: Detail Panel */}
        <div className="h-full overflow-hidden">
          {selectedCase ? (
            <CaseDetail caseData={selectedCase} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-white border border-slate-200 border-dashed rounded-lg p-8 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FileBraces className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">
                No Case Selected
              </h3>
              <p className="text-slate-500 max-w-xs mt-2 text-sm">
                Select a patient from the list on the left to view their full
                clinical details and history.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cases;
