import { Accordion } from "@/components/ui/Accordion";
import { useCaseContext } from "@/hooks/useCaseContext";

export const TreatmentPanel = () => {
  const { expandedPanels, togglePanel } = useCaseContext();
  return (
    <Accordion
      title="Treatment Protocols"
      summary="Gastroenteritis Protocol A Suggested"
      isOpen={expandedPanels["treatment"]}
      onToggle={() => togglePanel("treatment")}
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
          className="text-emerald-500"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      }
    >
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-100 rounded-md p-3 mb-4">
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">
            Recommended Protocol
          </h4>
          <p className="text-sm text-amber-900">
            Gastroenteritis Protocol A (Conservative Management)
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="text-xs font-semibold text-slate-500 uppercase">
            Medications
          </h5>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded-md bg-white">
            <div className="flex items-start gap-2">
              <input
                title="input"
                type="checkbox"
                className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <div>
                <div className="text-sm font-medium text-slate-800">
                  Cerenia (Maropitant)
                </div>
                <div className="text-xs text-slate-500">
                  10mg/ml SQ Injection • Once
                </div>
              </div>
            </div>
            <button className="text-xs text-slate-400 hover:text-blue-600">
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between p-2 border border-slate-200 rounded-md bg-white">
            <div className="flex items-start gap-2">
              <input
                title="input"
                type="checkbox"
                className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <div>
                <div className="text-sm font-medium text-slate-800">
                  LRS Fluid Therapy
                </div>
                <div className="text-xs text-slate-500">200ml SQ • Once</div>
              </div>
            </div>
            <button className="text-xs text-slate-400 hover:text-blue-600">
              Edit
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded shadow-sm hover:bg-blue-700 transition-colors">
            Approve All
          </button>
          <button className="flex-1 bg-white text-slate-600 border border-slate-300 text-sm font-medium py-2 rounded shadow-sm hover:bg-slate-50 transition-colors">
            Modify
          </button>
        </div>
      </div>
    </Accordion>
  );
};
