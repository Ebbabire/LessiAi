const ClinicalFlag = ({ flag }: { flag: string }) => {
  const isWarning =
    flag.toLowerCase().includes("monitor") ||
    flag.toLowerCase().includes("caution");
  const isDanger =
    flag.toLowerCase().includes("contraindicated") ||
    flag.toLowerCase().includes("allergy");
  const variant = isDanger ? "danger" : isWarning ? "warning" : "success";

  const styles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 ",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border ${styles[variant]} transition-colors duration-200`}
    >
      {flag}
    </span>
  );
};

export default ClinicalFlag;
