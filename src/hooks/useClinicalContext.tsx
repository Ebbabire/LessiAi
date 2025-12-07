import { useContext } from "react";
import { ClinicContext } from "@/context/clinicalContext";

export const useClinicContext = () => {
  const context = useContext(ClinicContext);
  if (!context)
    throw new Error("useClinicContext must be used within a ClinicProvider");
  return context;
};
