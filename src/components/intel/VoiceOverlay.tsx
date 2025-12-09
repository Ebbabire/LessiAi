import { useClinicContext } from "@/hooks/useClinicalContext";

export const VoiceOverlay: React.FC = () => {
  const { isVoiceActive, toggleVoice } = useClinicContext();

  if (!isVoiceActive)
    return (
      <button
        onClick={toggleVoice}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#1A1D21] border border-[#2A2F33] text-[#9BA3AF] rounded-full shadow-lg flex items-center justify-center hover:text-[#2D9CDB] hover:border-[#2D9CDB] transition-all z-50"
        title="Activate Voice Command"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in">
      <div className="bg-[#0D0F12] border border-[#2A2F33] text-[#F2F2F2] px-4 py-2 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EB5757] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EB5757]"></span>
        </span>
        Listening...
      </div>
      <button
        title="toggle"
        onClick={toggleVoice}
        className="w-12 h-12 bg-[#2D9CDB] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#2D9CDB]/80 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </div>
  );
};
