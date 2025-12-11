import React from 'react';
import { X } from 'lucide-react';
import type { TreatmentItem } from '../../../../type/intelligence';

interface ModalProps {
    data: TreatmentItem;
    onClose: () => void;
}

export const TreatmentExplainabilityModal: React.FC<ModalProps> = ({ data, onClose }) => {

    if (!data || !data.calculation) {
        return null;
    }

    const calc = data.calculation;

    const modalContainerStyle = `bg-[#1A1D21] rounded-[10px] p-[24px] w-full max-w-md border border-[#2A2F33] relative`;

    return (
        <div
            className={`fixed inset-0 bg-[#0D0F12]/80 flex items-center justify-center z-50`}
            onClick={onClose}
        >
            <div className={modalContainerStyle} onClick={(e) => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-[#9BA3AF] hover:text-[#F2F2F2] transition"
                    aria-label="Close modal"
                >
                    <X size={16} />
                </button>


                <h3 className={`text-[18px] font-semibold text-[#F2F2F2] mb-6 text-center`}>
                    Calculation & Source for {data.drugName}
                </h3>

                {/* --- 1. Warnings List Section Card --- */}
                {(data.warnings && data.warnings.length > 0) && (
                    <div className={`mb-4 p-4 rounded-md bg-[#1A1D21] border border-[#2A2F33]`}>
                        <h4 className={`text-[14px] font-semibold text-[#EB5757] mb-2`}>⚠️ Critical Warnings</h4>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            {data.warnings.map((warning, i) => (
                                <li key={i} className={`text-[14px] text-[#EB5757]`}>{warning}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* --- 2. Dose Calculation Section Card --- */}
                <div className={`mb-4 p-4 rounded-md bg-[#1A1D21] border border-[#2A2F33]`}>

                    {/* Section Label */}
                    <h4 className={`text-[14px] font-semibold text-[#F2F2F2] mb-3`}>Dose Calculation</h4>

                    {/* Inner Content*/}
                    <div className="space-y-1">
                        <p className={`text-[14px] text-[#9BA3AF]`}>
                            Patient Weight: <span className={`text-[#F2C94C] font-semibold`}>{calc.patientWeightKg || 'N/A'} kg</span>
                        </p>
                        <p className={`text-[14px] text-[#9BA3AF]`}>
                            Per-dose mg: <span className={`text-[#F2C94C] font-semibold`}>{calc.perDoseMg || 'N/A'} mg</span>
                        </p>
                        {calc.tabletStrengthMg && (
                            <p className={`text-[14px] text-[#9BA3AF]`}>
                                Tablet Strength: <span className={`text-[#F2C94C] font-semibold`}>{calc.tabletStrengthMg} mg</span>
                            </p>
                        )}
                        <p className={`text-[14px] text-[#9BA3AF]`}>
                            Total Tablets: <span className={`text-[#F2C94C] font-semibold`}>{calc.perDoseTablets || 'N/A'} tab(s)</span>
                        </p>

                        {/* Rounding Logic Note*/}
                        {calc.notes && (
                            <p className={`text-[13px] text-[#9BA3AF] border-t border-[#2A2F33] pt-2 mt-2`}>
                                <span className="font-medium">Rounding Logic:</span> {calc.notes}
                            </p>
                        )}
                    </div>
                </div>

                {/* --- 3. Guideline Source Section Card --- */}
                <div className={`p-4 rounded-md bg-[#1A1D21] border border-[#2A2F33]`}>
                    <h4 className={`text-[14px] font-semibold text-[#F2F2F2] mb-3`}>Guideline Source</h4>
                    <p className={`text-[14px] text-[#9BA3AF]`}>
                        Guideline: <span className={`text-[#F2F2F2] font-medium`}>{data.source.guideline || 'N/A'}</span>
                    </p>
                    <p className={`text-[14px] text-[#9BA3AF]`}>
                        Protocol: <span className={`text-[#F2F2F2] font-medium`}>{data.source.protocolName || 'N/A'}</span>
                    </p>
                    {data?.source?.url && <p className={`text-[14px] text-[#9BA3AF]`}>
                        Url: <span className={`text-[#F2F2F2] font-medium`}>{data.source.url || 'N/A'}</span>
                    </p>}
                </div>
            </div>
        </div>
    );
};