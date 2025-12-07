import { Accordion } from "@/components/ui/Accordion";
import { useCaseContext } from "@/hooks/useCaseContext";
import { useClinicContext } from "@/hooks/useClinicalContext";

export const OpsIntelPanel: React.FC = () => {
  const { blastCIFlags } = useClinicContext();
  const { expandedPanels, togglePanel } = useCaseContext();

  return (
    <Accordion
      title="Operational Intelligence (BlastCI)"
      summary="2 Flags Requiring Attention"
      isOpen={expandedPanels["ops"]}
      onToggle={() => togglePanel("ops")}
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
          className="text-amber-500"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-4.31 2.5a2 2 0 0 0-1 1.73V10a2 2 0 0 0 2 2h.44a2 2 0 0 1 1 1.73l.43 5.23a2 2 0 0 1-2 1.73H11a2 2 0 0 0 2 2v.18a2 2 0 0 0 1 1.73l4.31 2.5a2 2 0 0 1 1 1.73V20a2 2 0 0 1-2 2h-.44a2 2 0 0 0-1 1.73l-.43 5.23a2 2 0 0 1 2 1.73H20a2 2 0 0 0-2-2v-.18a2 2 0 0 1-1-1.73l-4.31-2.5a2 2 0 0 0-1-1.73V14a2 2 0 0 0-2-2h-.44a2 2 0 0 1-1-1.73L9 5a2 2 0 0 1 2-1.73H15a2 2 0 0 0 2-2V.18a2 2 0 0 1-1-1.73L16.22 2Z" />
        </svg>
      }
    >
      <div className="space-y-3">
        {blastCIFlags.map((flag) => (
          <div
            key={flag.code}
            className="flex items-start gap-3 p-3 bg-slate-50 rounded-md border border-slate-200"
          >
            <div
              className={`mt-0.5 w-2 h-2 rounded-full ${
                flag.severity === "high"
                  ? "bg-red-500"
                  : flag.severity === "medium"
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
            />
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-0.5">
                {flag.code}
              </span>
              <p className="text-sm text-slate-700 font-medium">{flag.label}</p>
            </div>
          </div>
        ))}
        <div className="pt-2 text-center">
          <button className="text-xs text-blue-600 font-medium hover:underline">
            View Practice Efficiency Report
          </button>
        </div>
      </div>
    </Accordion>
  );
};
