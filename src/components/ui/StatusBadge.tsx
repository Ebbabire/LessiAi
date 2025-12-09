interface BadgeProps {
  label: string;
  variant?:
    | "default"
    | "neutral"
    | "outline"
    | "warning"
    | "danger"
    | "New"
    | "In Progress"
    | "Completed";
  className?: string;
}

export const StatusBadge = ({
  label,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const styles: Record<string, string> = {
    default: "bg-[#2A2F33] text-[#2D9CDB] border-transparent",
    neutral: "bg-[#2A2F33] text-[#9BA3AF] border-transparent",
    outline: "bg-transparent text-[#9BA3AF] border-[#2A2F33]",
    warning: "bg-[#2A2F33] text-[#F2C94C] border-transparent",
    danger: "bg-[#EB5757] text-white border-transparent",
    success: "bg-[#2A2F33] text-[#27AE60] border-transparent",
    // Case Status Mappings
    New: "bg-[#2A2F33] text-[#2D9CDB] border border-[#2D9CDB]/20", // Sky Blue
    "In Progress": "bg-[#2A2F33] text-[#F2C94C] border border-[#F2C94C]/20", // AI Yellow
    Completed: "bg-[#2A2F33] text-[#27AE60] border border-[#27AE60]/20", // Clinical Green
  };

  const style = styles[variant as string] || styles.neutral;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${style} ${className}`}
    >
      {label}
    </span>
  );
};
