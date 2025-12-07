import { useClinicContext } from "@/hooks/useClinicalContext";

export const GlobalIntelPanel: React.FC = () => {
  const { globalAlerts } = useClinicContext();

  if (globalAlerts.length === 0) return null;

  return (
    <div className="bg-blue-900 text-white px-4 py-2 text-sm font-medium flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
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
        <span>{globalAlerts[0]}</span>
      </div>
      <button className="text-blue-200 hover:text-white text-xs underline">
        Details
      </button>
    </div>
  );
};
