import { useMemo } from 'react';
import RecommendationItem from '../RecommendationItem/RecommendationItem';
import { Recommendation } from '../../data/mockData';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

const isValidRecommendation = (rec: unknown): rec is Recommendation => 
  typeof rec === 'object' && 
  rec !== null && 
  'title' in rec && 
  'value' in rec &&
  typeof (rec as Recommendation).title === 'string' &&
  typeof (rec as Recommendation).value === 'string';

const generateKey = (recommendation: Recommendation, index: number): string => 
  recommendation.title 
    ? `${String(recommendation.title).toLowerCase().replace(/\s+/g, '-')}-${index}`
    : `rec-${index}`;

function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const validRecommendations = useMemo(() => {
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      return [];
    }
    return recommendations.filter(isValidRecommendation);
  }, [recommendations]);

  if (validRecommendations.length === 0) return null;

  return (
    <section 
      className="pb-8 sm:pb-10 border-b border-gray-200/60 last:border-b-0"
      aria-labelledby="recommendations-heading"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div 
          className="flex-shrink-0 w-1.5 h-7 sm:h-8 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 rounded-full shadow-sm"
          aria-hidden="true"
        />
        <div>
          <h2 
            id="recommendations-heading"
            className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1"
          >
            Recommendations
          </h2>
          <div 
            className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-primary-500 to-transparent rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/20 rounded-2xl blur-xl opacity-50"
          aria-hidden="true"
        />
        <div 
          className="relative bg-gradient-to-br from-gray-50/90 to-blue-50/40 rounded-2xl border border-gray-200/80 overflow-hidden shadow-lg backdrop-blur-sm"
          role="list"
          aria-label={`${validRecommendations.length} clinical recommendations`}
        >
          <dl className="divide-y divide-gray-200/60">
            {validRecommendations.map((recommendation, index) => (
              <RecommendationItem
                key={generateKey(recommendation, index)}
                title={String(recommendation.title).trim()}
                value={String(recommendation.value).trim()}
                isLast={index === validRecommendations.length - 1}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default RecommendationsList;

