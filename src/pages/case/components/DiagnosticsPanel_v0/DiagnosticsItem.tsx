
import React, { useState } from 'react';
import { StatusBadge } from '../../../../components/ui/StatusBadge'; 
import type { DiagnosticTest } from '../../../../type/intelligence'; 
import { getPriorityVariant, getPriorityHoverClasses } from '../../../../utils/ui-helpers'; 

interface DiagnosticItemProps {
  test: DiagnosticTest;
}

export const DiagnosticItem: React.FC<DiagnosticItemProps> = React.memo(({ test }) => {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const isRecommended = test.recommendedByAI;
  
  const priorityHoverClass = getPriorityHoverClasses(test.priority);
  const priorityVariant = getPriorityVariant(test.priority);

  return (
    <div 
      className={`
        mb-3 p-3 rounded-md border border-[#2A2F33] bg-[#202529]
        transition duration-200 cursor-pointer
        ${priorityHoverClass}
        ${isRecommended ? 'border-l-4 border-l-[#F2C94C]' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#F2F2F2]">{test?.testName}</p>
          
          {/* AI Recommended Badge */}
          {isRecommended && (
              <StatusBadge label="AI Recommended" variant="warning" className="mt-1" />
          )}
        </div>
        
        {/* Priority Badge */}
        <StatusBadge 
          label={`${test?.priority.toUpperCase()} PRIORITY`} 
          variant={priorityVariant} 
        />
      </div>

      <button
        className="text-xs text-[#9BA3AF] hover:text-[#F2F2F2] mt-2"
        onClick={() => setIsDetailExpanded(!isDetailExpanded)}
      >
        {isDetailExpanded ? '▲ Hide Rationale' : '▼ View AI Rationale'}
      </button>
      
      {isDetailExpanded && (
        <p className="mt-2 text-sm text-[#9BA3AF] border-t border-dashed border-[#2A2F33] pt-2">
          <b>**Reasoning:**</b> {test?.reasoning}
        </p>
      )}
    </div>
  );
});