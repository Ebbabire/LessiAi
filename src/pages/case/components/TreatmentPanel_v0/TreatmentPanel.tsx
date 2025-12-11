import React, { useState } from 'react';
import { PanelShell } from '../../../../components/ui/PanelShell'; 
import { Activity } from 'lucide-react'; 
import { useCaseContext } from "@/hooks/useCaseContext"; 

import type{ TreatmentResponse, TreatmentItem } from '../../../../type/intelligence'; 
import { TreatmentCard } from './TreatmentCard'; 
import { TreatmentExplainabilityModal } from './TreatmentExplainabilityModal';

interface TreatmentPanelProps {
  data: TreatmentResponse | null; 
}

export const TreatmentPanel: React.FC<TreatmentPanelProps> = ({ data }) => {
  const [modalData, setModalData] = useState<TreatmentItem | null>(null);
  
  
  const treatments = data?.treatments; 
  const hasRecommendations = treatments && treatments.length > 0;
  
  const { expandedPanels, togglePanel } = useCaseContext();
  const panelKey = "treatments"; 
  const isExpanded = expandedPanels[panelKey];

  const handleViewCalculation = (treatment: TreatmentItem) => {
    setModalData(treatment);
  };

  return (
    <>
      <PanelShell
        title="Treatment Recommendations"
        icon={<Activity size={18} />}
        isExpanded={isExpanded}
        onToggle={() => togglePanel(panelKey)} 
      >
        {hasRecommendations ? (
          treatments?.map((treatment, index) => (
            <TreatmentCard 
              key={index} 
              treatment={treatment} 
              onViewCalculation={handleViewCalculation}
            /> 
          ))
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
            <span className="text-sm text-[#9BA3AF] font-medium">
              No AI Treatment Recommendations available for this case.
            </span>
          </div>
        )}
      </PanelShell>

      {modalData && (
        <TreatmentExplainabilityModal
          data={modalData}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
};