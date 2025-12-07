import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

import RecommendationsPanelLoading from "./RecommendationPanel_loading";
import CaseSummay from "./CaseSummay";
import { ProfileIntelPanel } from "./ProfileIntelPanel/ProfileIntelPanel";
import { ReasoningPanel } from "./ReasoningPanel/ReasoningPanel";
import { TreatmentPanel } from "./TreatmentPanel/TreatmentPanel";
import { OpsIntelPanel } from "./OpsIntelPanel/OpsIntelPanel";
import { AlertTriangle } from "lucide-react";
import { MOCKED_RECOMMENDATIONS } from "@/data";

const data = MOCKED_RECOMMENDATIONS;

export const RecommendationsPanel = () => {
  const [summary, setSummary] = useState(data.summary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedValue = useDebounce(summary, 500);

  useEffect(() => {
    if (!debouncedValue) return;

    const runCheck = async () => {
      setLoading(true);
      setError(null);
      await new Promise((r) => setTimeout(r, 500)); // simulate async latency

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (normalize(debouncedValue) !== normalize(data.summary)) {
        setError(
          "The AI was unable to interpret the provided summary. Please try another summery input for accurate analysis."
        );
      } else {
        setError(null);
      }

      setLoading(false);
    };

    runCheck();
  }, [debouncedValue]);

  return (
    <div className="p-4">
      {/* Summary Section */}
      <CaseSummay
        data={data}
        error={error}
        loading={loading}
        setSummary={setSummary}
        summary={summary}
      />
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Intelligence Layers
        </h2>
        <ProfileIntelPanel />
      </div>

      {/* Content Area: Logic for Loading / Error / Data */}
      {loading ? (
        <RecommendationsPanelLoading />
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-400 rounded-lg flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-2 bg-red-300 rounded-full text-red-600  shrink-0">
            <AlertTriangle size={24} />
          </div>

          <p className="text-red-500 text-sm leading-relaxed">{error}</p>
        </div>
      ) : (
        <div>
          {/* Intelligence Accordion Dashboard */}
          <div className="flex flex-col gap-3 my-4">
            {/* Phase 2: Reasoning */}
            <ReasoningPanel />

            {/* Phase 3: Treatment */}
            <TreatmentPanel />

            {/* Phase 4: Ops */}
            <OpsIntelPanel />
          </div>
        </div>
      )}
    </div>
  );
};
