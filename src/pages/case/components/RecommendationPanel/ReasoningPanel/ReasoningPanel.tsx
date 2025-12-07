import { Accordion } from "@/components/ui/Accordion";
import { useCaseContext } from "@/hooks/useCaseContext";

export const ReasoningPanel: React.FC = () => {
  const {
    activeReasoningTrace,
    setActiveReasoningTrace,
    expandedPanels,
    togglePanel,
  } = useCaseContext();

  const differentials = [
    {
      id: "dx-1",
      name: "Acute Gastroenteritis",
      confidence: 88,
      trace: "Matches vomiting history + lack of fever.",
    },
    {
      id: "dx-2",
      name: "Dietary Indiscretion",
      confidence: 65,
      trace: "Common in young canines, matches symptoms.",
    },
    {
      id: "dx-3",
      name: "Pancreatitis",
      confidence: 12,
      trace: "Unlikely due to age and lack of abdominal pain signal.",
    },
  ];

  return (
    <Accordion
      title="Clinical Reasoning"
      summary="3 Differentials Identified (High Confidence)"
      isOpen={expandedPanels["reasoning"]}
      onToggle={() => togglePanel("reasoning")}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-500"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Differential Diagnosis Model v2.1</span>
          <span className="text-emerald-600 font-medium">High Confidence</span>
        </div>

        <div className="space-y-3">
          {differentials.map((dx) => (
            <div
              key={dx.id}
              className="border border-slate-100 rounded-md p-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-800">{dx.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${dx.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-slate-600">
                    {dx.confidence}%
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  setActiveReasoningTrace(
                    activeReasoningTrace === dx.id ? null : dx.id
                  )
                }
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
                {activeReasoningTrace === dx.id ? "Hide Reasoning" : "Explain"}
              </button>

              {activeReasoningTrace === dx.id && (
                <div className="mt-2 text-xs text-slate-600 bg-blue-50/50 p-2 rounded border border-blue-100 animate-in fade-in">
                  <span className="font-semibold text-blue-900">
                    AI Trace:{" "}
                  </span>
                  {dx.trace}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Accordion>
  );
};
