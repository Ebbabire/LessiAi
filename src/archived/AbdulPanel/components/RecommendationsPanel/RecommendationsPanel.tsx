import { useMemo } from 'react';
import SummarySection from '../SummarySection/SummarySection';
import RecommendationsList from '../RecommendationsList/RecommendationsList';
import FlagsSection from '../FlagsSection/FlagsSection';
import { Recommendation } from '../../data/mockData';

interface RecommendationsPanelProps {
  summary: string;
  recommendations: Recommendation[];
  flags: string[];
}

const PATTERN_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

function RecommendationsPanel({ summary, recommendations, flags }: RecommendationsPanelProps) {
  const hasSummary = useMemo(() => 
    typeof summary === 'string' && summary.trim().length > 0,
    [summary]
  );
  
  const hasRecommendations = useMemo(() => 
    Array.isArray(recommendations) && recommendations.length > 0,
    [recommendations]
  );
  
  const hasFlags = useMemo(() => 
    Array.isArray(flags) && flags.length > 0,
    [flags]
  );
  
  const hasContent = useMemo(() => 
    hasSummary || hasRecommendations || hasFlags,
    [hasSummary, hasRecommendations, hasFlags]
  );

  const sanitizedSummary = useMemo(() => 
    hasSummary ? String(summary).trim() : '',
    [summary, hasSummary]
  );

  if (!hasContent) {
    return (
      <article 
        className="bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden"
        aria-label="Clinical recommendations panel"
      >
        <div className="px-6 sm:px-10 py-12 sm:py-16 text-center">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 mb-4"
            aria-hidden="true"
          >
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-medium" role="status" aria-live="polite">
            No recommendations data available
          </p>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden backdrop-blur-sm focus-within:ring-4 focus-within:ring-primary-500/20 focus-within:outline-none"
      aria-label="Clinical recommendations panel"
      role="region"
      tabIndex={-1}
    >
      <header className="relative bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 px-6 sm:px-10 py-6 sm:py-7 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{ backgroundImage: PATTERN_BG, backgroundSize: '60px 60px' }}
            aria-hidden="true"
          />
        </div>
        <div className="relative flex items-center gap-4 sm:gap-5">
          <div 
            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg"
            aria-hidden="true"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">Clinical Recommendations</h2>
            <p className="text-xs sm:text-sm text-primary-100 font-medium">AI-powered decision support system</p>
          </div>
        </div>
      </header>

      <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-8 sm:space-y-10 bg-gradient-to-b from-white to-gray-50/30">
        {hasSummary && <SummarySection summary={sanitizedSummary} />}
        {hasRecommendations && <RecommendationsList recommendations={recommendations} />}
        {hasFlags && <FlagsSection flags={flags} />}
      </div>
    </article>
  );
}

export default RecommendationsPanel;

