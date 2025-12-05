import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Case } from "@/type";
import { RecommendationsPanel } from "./RecommendationPanel/RecommendationPanel";
import { MOCKED_RECOMMENDATIONS } from "@/data";

interface CaseDetailProps {
  caseData: Case;
}

const CaseDetail = ({ caseData }: CaseDetailProps) => {
  return (
    <div className="h-full bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* Detail Header */}
      <div className="px-6 py-5 bg-blue-800 border-b border-slate-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-200">
                {caseData.name}
              </h1>
              <StatusBadge status={caseData.status} />
            </div>
            <p className="text-sm text-slate-300 font-medium">
              {caseData.species} • {caseData.age} • Case #{caseData.id}
            </p>
          </div>
          <div className="text-right">
            <span className="block text-xs text-slate-200 uppercase tracking-wide">
              Created
            </span>
            <span className="text-sm font-medium text-slate-300">
              {caseData.createdAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm">
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
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

          <div className="bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm">
            <span className="block text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
              Reason for Visit
            </span>
            <p
              className="font-medium text-slate-900 line-clamp-2"
              title={caseData.complaint}
            >
              {caseData.complaint}
            </p>
          </div>
        </div>

        {/* Clinical recommendations */}
        <RecommendationsPanel data={MOCKED_RECOMMENDATIONS} />
      </div>
    </div>
  );
};

export default CaseDetail;
