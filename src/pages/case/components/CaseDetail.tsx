import { StatusBadge } from "@/components/ui/StatusBadge";

import type { Case } from "@/type";
import { RecommendationsPanel } from "./RecommendationPanel/RecommendationPanel";
import { GlobalIntelPanel } from "./RecommendationPanel/GlobalIntelPanel/GlobalIntelPanel";

interface CaseDetailProps {
  caseData: Case;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseData }) => {
  return (
    <div className="h-full bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden animate-in fade-in duration-300 relative">
      {/* Global Intelligence Layer (Top) */}
      <GlobalIntelPanel />

      {/* Detail Header (Sticky) */}
      <div className="px-6 py-5 bg-white border-b border-slate-100 shrink-0 z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {caseData.name}
              </h1>
              <StatusBadge status={caseData.status} />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {caseData.species} • {caseData.age} • Case #{caseData.id}
            </p>
          </div>
          <div className="text-right">
            <span className="block text-xs text-slate-400 uppercase tracking-wide">
              Created
            </span>
            <span className="text-sm font-medium text-slate-700">
              {caseData.createdAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {/* Core Case Data (Static) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <span className="block text-xs text-slate-400 uppercase tracking-wide mb-1">
              Owner
            </span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                {caseData.owner.charAt(0)}
              </div>
              <span className="font-medium text-slate-900">
                {caseData.owner}
              </span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <span className="block text-xs text-slate-400 uppercase tracking-wide mb-1">
              Reason for Visit
            </span>
            <p className="font-medium text-slate-900 line-clamp-2">
              {caseData.complaint}
            </p>
          </div>
        </div>

        <RecommendationsPanel />
      </div>
    </div>
  );
};
