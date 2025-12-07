import { useState, type ReactNode } from "react";
import { CaseContext } from "./caseContext";

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>(
    {
      reasoning: true, // Default open
      treatment: false,
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
