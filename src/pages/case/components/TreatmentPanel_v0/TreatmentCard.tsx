import React, { useState } from 'react';
import { StatusBadge } from '../../../../components/ui/StatusBadge';
import type { TreatmentItem } from '../../../../type/intelligence';
import { getPriorityHoverClasses, getTreatmentPriority } from '../../../../utils/ui-helpers';
import { Beaker } from 'lucide-react';


interface TreatmentItemProps {
  treatment: TreatmentItem;
  onViewCalculation: (treatment: TreatmentItem) => void;
}

export const TreatmentCard: React.FC<TreatmentItemProps> = React.memo(({ treatment, onViewCalculation }) => {
  const [isRationaleExpanded, setIsRationaleExpanded] = useState(false);
  const [isWarningHovered, setIsWarningHovered] = useState(false);

  const priority = getTreatmentPriority(treatment.warnings);
  const priorityHoverClass = getPriorityHoverClasses(priority);

  return (
    <div
      className={`
        mb-3 p-3 rounded-md border border-[#2A2F33] bg-[#202529]
        transition duration-200 cursor-pointer ${priorityHoverClass}`}
    >
      <div className="flex flex-col space-y-3">

        {/* --- 1. Drug Name & Display Text --- */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            {/* Increased Drug Name size */}
            <p className={`text-base font-semibold text-[#F2F2F2]`}>{treatment.drugName}</p>
            {/* Increased Display Text size */}
            <p className={`text-sm text-[#9BA3AF]`}>{treatment.displayText}</p>
          </div>

          {/* --- Warnings Badge & Hover Card --- */}
          {treatment.warnings && treatment.warnings.length > 0 && (
            <div
              className="relative ml-2"
              onMouseEnter={() => setIsWarningHovered(true)}
              onMouseLeave={() => setIsWarningHovered(false)}
            >
              <StatusBadge label="Warning" variant="danger" />

              {/* Warning Hover Card/Popover */}
              {isWarningHovered && (
                <div
                  className={`absolute top-0 right-full z-10 w-64 mr-3 p-3 rounded-md bg-[#2A2F33] border border-[#EB5757] shadow-lg`}
                >
                  <p className={`text-md font-semibold text-[#EB5757] mb-1`}>Critical Warnings:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {treatment.warnings.map((warning, i) => (
                      <li key={i} className={`text-md text-[#EB5757]`}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- 2. Rationale/Expandable Detail --- */}
        <button
          className={`text-xs text-[#9BA3AF] hover:text-[#F2F2F2] text-left`}
          onClick={() => setIsRationaleExpanded(!isRationaleExpanded)}
        >
          {isRationaleExpanded ? '▲ Hide Rationale' : '▼ View AI Rationale'}
        </button>

        {isRationaleExpanded && (
          <p className={`mt-0.5 text-sm text-[#9BA3AF] border-t border-dashed border-[#2A2F33] pt-0.5`}>
            **Rationale:** {treatment.rationale}
          </p>
        )}

        <div className="flex justify-between items-center pt-2">

          <div className="flex flex-col">
            <p className={`text-xs font-semibold text-[#F2F2F2]`}>Dose Summary:</p>
            <p className={`text-xs text-[#9BA3AF]`}>
              {treatment.dose.mgPerKg} mg/kg {treatment.dose.route}
            </p>
          </div>

          {/* --- "View Math & Source" Button --- */}
          <button
            className="flex items-center gap-1 text-xs px-2 py-1 rounded  text-white border border-[#2A2F33] hover:border-white transition"
            onClick={() => onViewCalculation(treatment)}
          >
            <Beaker size={14} />
            View Math & Source
          </button>
        </div>
      </div>
    </div>
  );
});