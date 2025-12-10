import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface BenefitPointProps {
  text: string;
  subtext?: string;
}

export const BenefitPoint: React.FC<BenefitPointProps> = ({ text, subtext }) => {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
      <div className="flex flex-col">
        <span className="text-white/90 font-medium text-sm leading-snug">{text}</span>
        {subtext && <span className="text-white/60 text-xs mt-0.5">{subtext}</span>}
      </div>
    </div>
  );
};