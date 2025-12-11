import React from 'react';
import { PanelShell } from '../../../../components/ui/PanelShell'; 
import { Microscope } from 'lucide-react'; 
import { useCaseContext } from "@/hooks/useCaseContext"; 

import type {DiagnosticsResponse } from '../../../../type/intelligence'; 
import { DiagnosticItem } from './DiagnosticsItem';

interface DiagnosticsPanelProps {
  
  data: DiagnosticsResponse | null; 
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ data }) => {
  
  const tests = data?.diagnostics; 
  const hasRecommendations = tests && tests?.length > 0;
  
  const { expandedPanels, togglePanel } = useCaseContext();
  const panelKey = "diagnostics"; 
  const isExpanded = expandedPanels[panelKey];

  return (
    <PanelShell
      title="Diagnostic Recommendations"
      icon={<Microscope size={18} />}
      isExpanded={isExpanded}
      onToggle={() => togglePanel(panelKey)} 
    >
      {hasRecommendations ? (
        tests.map((test, index) => (
            <DiagnosticItem 
                key={index} 
                test={test} 
            /> 
        ))
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            No AI Diagnostic Recommendations available for this case.
          </span>
        </div>
      )}
    </PanelShell>
  );
};