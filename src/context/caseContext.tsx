import { createContext } from "react";

interface CaseContextType {
  expandedPanels: Record<string, boolean>;
  togglePanel: (panelId: string) => void;
  activeReasoningTrace: string | null;
  setActiveReasoningTrace: (id: string | null) => void;
}

export const CaseContext = createContext<CaseContextType | undefined>(
  undefined
);
