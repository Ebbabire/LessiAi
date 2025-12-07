import { useMemo } from 'react';

interface RecommendationItemProps {
  title: string;
  value: string;
  isLast: boolean;
}

function RecommendationItem({ title, value, isLast }: RecommendationItemProps) {
  const safeTitle = useMemo(() => 
    typeof title === 'string' ? String(title).trim() : '',
    [title]
  );
  
  const safeValue = useMemo(() => 
    typeof value === 'string' ? String(value).trim() : '',
    [value]
  );

  const baseClasses = 'group flex flex-col sm:flex-row sm:items-center py-4 sm:py-5 px-5 sm:px-6 transition-all duration-200 hover:bg-white/80 focus-within:bg-white/80 focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:outline-none';
  const borderClass = !isLast ? 'border-b border-gray-200/40' : '';

  if (!safeTitle || !safeValue) return null;

  return (
    <div 
      className={`${baseClasses} ${borderClass}`}
      role="listitem"
      tabIndex={0}
      aria-label={`${safeTitle}: ${safeValue}`}
    >
      <dt className="flex items-center gap-2.5 sm:gap-3 text-sm font-bold text-gray-800 sm:w-52 sm:flex-shrink-0 mb-2 sm:mb-0">
        <div 
          className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200"
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="tracking-tight">{safeTitle}</span>
      </dt>
      <dd className="text-base text-gray-900 sm:flex-1 sm:ml-6 sm:ml-8 font-semibold pl-8 sm:pl-0">
        {safeValue}
      </dd>
    </div>
  );
}

export default RecommendationItem;

