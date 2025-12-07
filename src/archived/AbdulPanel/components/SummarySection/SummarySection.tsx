import { useMemo } from 'react';

interface SummarySectionProps {
  summary: string;
}

function SummarySection({ summary }: SummarySectionProps) {
  const safeSummary = useMemo(() => 
    typeof summary === 'string' ? String(summary).trim() : '',
    [summary]
  );
  
  if (!safeSummary) return null;

  return (
    <section 
      className="pb-8 sm:pb-10 border-b border-gray-200/60 last:border-b-0"
      aria-labelledby="case-summary-heading"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div 
          className="flex-shrink-0 w-1.5 h-7 sm:h-8 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 rounded-full shadow-sm"
          aria-hidden="true"
        />
        <div>
          <h2 
            id="case-summary-heading"
            className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1"
          >
            Case Summary
          </h2>
          <div 
            className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-primary-500 to-transparent rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="pl-4 sm:pl-5.5 relative">
        <div 
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-300 to-transparent rounded-full"
          aria-hidden="true"
        />
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-5 sm:p-6 border border-gray-100/80 shadow-sm">
          <p className="text-base text-gray-900 leading-7 sm:leading-8 font-medium">
            {safeSummary}
          </p>
        </div>
      </div>
    </section>
  );
}

export default SummarySection;

