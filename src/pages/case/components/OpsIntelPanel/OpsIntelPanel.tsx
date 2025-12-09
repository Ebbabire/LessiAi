import { PanelShell } from "../../../../components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";

export const OpsIntelPanel = () => {
  const { expandedPanels, togglePanel } = useCaseContext();

  return (
    <PanelShell
      title="Operations"
      isExpanded={expandedPanels["ops"]}
      onToggle={() => togglePanel("ops")}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      }
    >
      <div className="text-center py-4">
        <p className="text-sm text-[#9BA3AF]">
          No operational flags for this case.
        </p>
      </div>
    </PanelShell>
  );
};
