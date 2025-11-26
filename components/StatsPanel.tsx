import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StatsPanelProps {
  number: number;
  integerRoot: number;
  builtRoot: number;
  remainder: number;
  userPlacedCount: number;
  denominator: number;
  approxFraction: number;
  isSquareComplete: boolean;
  isRemainderComplete: boolean;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  number,
  integerRoot,
  builtRoot,
  remainder,
  userPlacedCount,
  denominator,
  approxFraction,
  isSquareComplete,
  isRemainderComplete
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      <div className="flex justify-between text-sm items-center pb-2 border-b border-slate-50">
        <span className="text-slate-500 font-medium">पूर्ण वर्ग (a²):</span>
        <span className={`${isSquareComplete ? 'text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded' : 'text-slate-300'}`}>
          {builtRoot}² = {builtRoot * builtRoot}
        </span>
      </div>
      
      <div className="flex justify-between text-sm items-center pb-2 border-b border-slate-50">
        <span className="text-slate-500 font-medium">बाकी (r):</span>
        <span className={`${isRemainderComplete ? 'text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded' : 'text-slate-300'}`}>
          {userPlacedCount} / {remainder}
        </span>
      </div>

      <div className="flex justify-between text-sm items-center">
        <span className="text-slate-500 font-medium">छेद (2a+1):</span>
        <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{denominator}</span>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl mt-2 border border-blue-100">
        <div className="text-xs text-center font-bold text-blue-600 mb-3 tracking-wide uppercase">सूत्राची मांडणी</div>
        <div className="flex flex-col gap-3 items-center text-slate-700 text-lg font-medium">
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow-sm w-full justify-center">
            <span>√{number}</span>
            <span>≈</span>
            <span className="text-green-600 font-bold">{integerRoot}</span>
            <span>+</span>
            <div className="flex flex-col items-center leading-none">
              <span className="text-sm font-bold text-red-500">{remainder}</span>
              <div className="w-full h-px bg-slate-400 my-1"></div>
              <span className="text-sm text-slate-500">2({integerRoot})+1</span>
            </div>
          </div>
          
          <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
          
          <div className="flex items-center gap-2 text-xl font-bold text-blue-700 bg-white border border-blue-200 shadow-sm px-4 py-2 rounded-lg">
            <span>≈ {approxFraction.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};