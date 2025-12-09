import { PanelShell } from "@/components/ui/PanelShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { CaseBundleV1 } from "@/type/intelligence";

interface CaseIntelPanelProps {
  bundle: CaseBundleV1;
  isLoading?: boolean;
}

export const CaseIntelPanel = ({ bundle, isLoading }: CaseIntelPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  if (isLoading || !bundle)
    return (
      <div className="h-24 bg-[#1A1D21] border border-[#2A2F33] rounded-xl animate-pulse" />
    );

  const { patient, case: caseInfo, flags, imaging } = bundle;

  return (
    <PanelShell
      title="Patient Context"
      variant="highlight"
      isExpanded={expandedPanels["patient"]}
      onToggle={() => togglePanel("patient")}
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
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      }
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#F2F2F2]">{patient.name}</h2>
          <p className="text-sm text-[#9BA3AF] font-medium">
            {patient.age}y {patient.sex} {patient.species} •{" "}
            {patient.breed || "Mixed"} • {patient.weightKg}kg
          </p>
        </div>
        <div className="text-right">
          <StatusBadge
            label={caseInfo.priority.toUpperCase()}
            variant={caseInfo.priority === "urgent" ? "danger" : "neutral"}
          />
        </div>
      </div>

      <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] mb-4">
        <span className="text-xs font-bold text-[#2D9CDB] uppercase tracking-wide block mb-1">
          Presenting Complaint
        </span>
        <p className="text-sm text-[#F2F2F2] leading-relaxed">
          {caseInfo.description || caseInfo.reasonForVisit}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {flags?.map((flag) => (
          <StatusBadge
            key={flag}
            label={flag.replace("_", " ")}
            variant="warning"
          />
        ))}
        {imaging && imaging.length > 0 && (
          <StatusBadge
            label="Imaging Available"
            variant="neutral"
            className="border-dashed"
          />
        )}
      </div>
    </PanelShell>
  );
};
