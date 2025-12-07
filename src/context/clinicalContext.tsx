import { createContext } from "react";

interface ClinicContextType {
  isVoiceActive: boolean;
  toggleVoice: () => void;
  globalAlerts: string[];
  blastCIFlags: {
    code: string;
    label: string;
    severity: "low" | "medium" | "high";
  }[];
}

export const ClinicContext = createContext<ClinicContextType | undefined>(
  undefined
);
