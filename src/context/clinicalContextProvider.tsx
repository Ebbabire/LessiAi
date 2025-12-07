import { useState, type ReactNode, useMemo } from "react";
import { ClinicContext } from "./clinicalContext";

const ClinicProvider = ({ children }: { children: ReactNode }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Mock Global Alerts
  const [globalAlerts] = useState<string[]>([
    "Regional Alert: Canine Influenza Outbreak in Sector 4",
  ]);

  // Mock BlastCI Flags
  const [blastCIFlags] = useState([
    {
      code: "EFF-01",
      label: "Patient Throughput: High",
      severity: "low" as const,
    },
    {
      code: "BILL-99",
      label: "Missing Vaccination Code",
      severity: "medium" as const,
    },
  ]);

  const toggleVoice = () => setIsVoiceActive((prev) => !prev);

  // memoize value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({ isVoiceActive, toggleVoice, globalAlerts, blastCIFlags }),
    [isVoiceActive, globalAlerts, blastCIFlags]
  );

  return (
    <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
  );
};

export default ClinicProvider;
