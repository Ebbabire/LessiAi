import { useState, type ReactNode } from "react";
import { CaseContext } from "./caseContext";

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>(
    {
      patient: true,
      reasoning: false,
      treatment: false,
      diagnostics: false,
      ops: false,
    }
  );
  const [activeReasoningTrace, setActiveReasoningTrace] = useState<
    string | null
  >(null);

  const togglePanel = (panelId: string) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panelId]: !prev[panelId],
    }));
  };

  return (
    <CaseContext.Provider
      value={{
        activeCaseId,
        setActiveCaseId,
        expandedPanels,
        togglePanel,
        activeReasoningTrace,
        setActiveReasoningTrace,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};
