interface PanelShellProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlight";
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const PanelShell = ({
  title,
  icon,
  action,
  children,
  className = "",
  variant = "default",
  isExpanded = true,
  onToggle,
}: PanelShellProps) => {
  return (
    <div
      className={`
        bg-[#1A1D21] border rounded-lg shadow-sm mb-4 overflow-hidden transition-all duration-200
        ${
          variant === "highlight"
            ? "border-[#F2C94C]/30 ring-1 ring-[#F2C94C]/10"
            : "border-[#2A2F33]"
        }
        ${className}
    `}
    >
      <div
        onClick={onToggle}
        className={`
          px-4 py-3 border-b flex items-center justify-between
          ${
            variant === "highlight"
              ? "bg-[#F2C94C]/5 border-[#F2C94C]/20"
              : "bg-[#1A1D21] border-[#2A2F33]"
          }
          ${onToggle ? "cursor-pointer hover:bg-[#2A2F33]" : ""}
      `}
      >
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className={
                variant === "highlight" ? "text-[#F2C94C]" : "text-[#9BA3AF]"
              }
            >
              {icon}
            </span>
          )}
          <h3
            className={`font-semibold text-sm ${
              variant === "highlight" ? "text-[#F2C94C]" : "text-[#F2F2F2]"
            }`}
          >
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
          {onToggle && (
            <div
              className={`text-[#9BA3AF] transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
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
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
