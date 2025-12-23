import { PanelShell } from "@/components/ui/PanelShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { CaseBundleV1 } from "@/type/intelligence";
import { Heart, ArrowRight } from "lucide-react";

export interface CaseIntelPanelProps {
  bundle: CaseBundleV1;
  nextSteps?: { action: string; rationale: string }[];
  isLoading?: boolean;
}

export const CaseIntelPanel = ({
  bundle,
  nextSteps,
  isLoading,
}: CaseIntelPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  if (isLoading || !bundle)
    return (
      <div className="h-24 bg-[#1A1D21] border border-[#2A2F33] rounded-xl animate-pulse" />
    );

  const { patient, case: caseInfo, flags, imaging } = bundle;

  // Format patient demographics string
  const demographics = [
    patient.age ? `${patient.age}yo` : null,
    patient.sex,
    patient.species,
    patient.breed,
    patient.weightKg ? `${patient.weightKg}kg` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  const statusConfig: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    New: {
      label: "Active Evaluation - In Progress",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
    },
    "In Progress": {
      label: "Awaiting Diagnostics / Results",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
    },
    Completed: {
      label: "Case Resolved / Archive",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
    },
  };

  const status = statusConfig[caseInfo.status || "New"] || statusConfig["New"];

  return (
    <PanelShell
      title="Chief Complaint"
      variant="highlight"
      isExpanded={expandedPanels["patient"]}
      onToggle={() => togglePanel("patient")}
      icon={<Heart className="h-5 w-5" />}
    >
      {/* Case Status Banner */}
      <div
        className={`w-full mb-4 px-3 py-2 border rounded font-bold text-xs uppercase tracking-wider text-center ${status.bg} ${status.text} ${status.border}`}
      >
        {status.label}
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#F2F2F2]">{patient.name}</h2>
          <p className="text-sm text-[#9BA3AF] font-medium mt-1">
            {demographics}
          </p>
        </div>
      </div>

      <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] mb-4">
        <span className="text-xs font-bold text-[#2D9CDB] uppercase tracking-wide block mb-1">
          Clinical Summary
        </span>
        <p className="text-sm text-[#F2F2F2] leading-relaxed">
          {caseInfo.description ||
            caseInfo.clinicalHistory ||
            "No clinical details available."}
        </p>
      </div>

      {/* Next Steps Section */}
      {caseInfo.status !== "Completed" && nextSteps && nextSteps.length > 0 && (
        <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] mb-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block mb-2">
            Next Steps
          </span>
          <div className="space-y-2">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-[#1A1D21] rounded-md border border-[#2A2F33]"
              >
                <ArrowRight className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F2F2F2] font-medium leading-snug">
                    {step.action}
                  </p>
                  <p className="text-xs text-[#9BA3AF] mt-1 leading-relaxed">
                    {step.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {flags?.map((flag) => (
          <StatusBadge
            key={flag}
            label={flag.replace(/_/g, " ")}
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
