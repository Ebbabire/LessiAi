import { useState } from "react";
import { VoiceOverlay } from "@/components/intel/VoiceOverlay";
import CaseList from "./components/CaseList";
import { CaseDetail } from "./components/CaseDetail";

import { mockCases } from "@/data/mockCases";

const Cases = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectCase = (id: string) => {
    setSelectedId(id);
  };

  const selectedCase = selectedId
    ? mockCases.find((c) => c.id === selectedId)
    : null;

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)] overflow-y-auto">
      <VoiceOverlay />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F2F2F2]">
          Clinical Cases
        </h1>
        <p className="text-sm text-[#9BA3AF] mt-1">
          Manage patient intake, history, and active treatments.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-6 h-full lg:h-[calc(100%-80px)]">
        {/* Left Column: List */}
        <div className="h-[400px] lg:h-full overflow-hidden">
          <CaseList
            cases={mockCases}
            selectedId={selectedId}
            onSelectCase={handleSelectCase}
          />
        </div>

        {/* Right Column: Detail Panel */}
        <div className="lg:h-full h-[400px] overflow-hidden">
          {selectedCase ? (
            <CaseDetail caseData={selectedCase} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-[#1A1D21] border border-[#2A2F33] border-dashed rounded-lg p-8 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#2A2F33] rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#9BA3AF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#F2F2F2]">
                No Case Selected
              </h3>
              <p className="text-[#9BA3AF] max-w-xs mt-2 text-sm">
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
