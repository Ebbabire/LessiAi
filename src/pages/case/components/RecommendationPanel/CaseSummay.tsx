import { useState } from "react";
import { Check, Copy, Stethoscope } from "lucide-react";
import type { ClinicalData } from "@/type";

interface CaseSummaryProps {
  summary: string;
  data: ClinicalData;
  loading: boolean;
  setSummary: (summary: string) => void;
  error: string | null;
}

const CaseSummay = ({
  summary,
  data,
  loading,
  setSummary,
  error,
}: CaseSummaryProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Summary: ${summary}\n\nRecommendations:\n${data.recommendations
      .map((r) => `- ${r.title}: ${r.value}`)
      .join("\n")}\n\nFlags: ${data.flags.join(", ")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-slate-500  uppercase tracking-wide flex items-center gap-2">
            <Stethoscope size={16} />
            Case Summary
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-slate-200 dark:text-slate-700 dark:hover:text-slate-800 transition-colors"
          aria-label="Copy notes"
        >
          <span
            className={`flex items-center gap-1 ${
              copied ? "text-emerald-600 dark:text-emerald-500" : ""
            }`}
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy size={14} /> Copy Notes
              </>
            )}
          </span>
        </button>
      </div>

      <div
        className={`relative rounded-lg border transition-all duration-200 mb-3 ${
          loading
            ? "bg-slate-50 border-slate-200  opacity-70 cursor-wait"
            : error
            ? "bg-red-50 border-red-300"
            : "border-blue-300 hover:border-blue-400  focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-indigo-300"
        }`}
      >
        <textarea
          title="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          disabled={loading} // Optional: keep enabled if you want to allow typing while debouncing
          className={`w-full  p-4 text-slate-700 leading-relaxed resize-none focus:outline-none rounded-lg ${
            loading ? "cursor-wait" : ""
          }`}
          rows={2}
          spellCheck={false}
        ></textarea>
      </div>
    </section>
  );
};

export default CaseSummay;
