interface AccordionProps {
  title: string;
  summary?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Accordion = ({
  title,
  summary,
  isOpen,
  onToggle,
  children,
  icon,
}: AccordionProps) => {
  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
          isOpen
            ? "bg-slate-50 border-b border-slate-100"
            : "bg-white hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-slate-400">{icon}</span>}
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
            {!isOpen && summary && (
              <div className="mt-0.5 text-xs text-slate-500">{summary}</div>
            )}
          </div>
        </div>
        <div
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-white animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
