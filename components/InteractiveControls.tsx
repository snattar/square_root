import React from 'react';
import { Layers, MousePointerClick, RefreshCcw } from 'lucide-react';

interface InteractiveControlsProps {
  builtRoot: number;
  integerRoot: number;
  userPlacedCount: number;
  remainder: number;
  onBuildStep: () => void;
  onAddBlock: () => void;
  onReset: () => void;
}

export const InteractiveControls: React.FC<InteractiveControlsProps> = ({
  builtRoot,
  integerRoot,
  userPlacedCount,
  remainder,
  onBuildStep,
  onAddBlock,
  onReset
}) => {
  const isSquareComplete = builtRoot === integerRoot;
  const isRemainderComplete = userPlacedCount >= remainder;

  return (
    <div className="flex flex-col gap-4">
      {/* Step 1: Build Green Square */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 transition-all gap-4 ${isSquareComplete ? 'bg-green-50 border-green-200 opacity-70' : 'bg-white border-green-500 shadow-md ring-4 ring-green-50'}`}>
        <div className="flex-1">
          <h4 className="font-bold text-green-700 flex items-center gap-2 text-lg">
            <Layers className="w-5 h-5" />
            पायरी १: पूर्ण वर्ग तयार करा
          </h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm text-slate-500 font-medium">सध्याचे हिरवे ठोकळे:</span>
            <span className="text-2xl font-extrabold text-green-600">
              {builtRoot * builtRoot}
            </span>
            {builtRoot > 0 && (
                <span className="text-lg font-bold text-slate-400 ml-1">
                  = {builtRoot} <span className="text-xs font-normal">(वर्गमूळ)</span>
                </span>
            )}
          </div>
        </div>
        <button 
          onClick={onBuildStep} 
          disabled={isSquareComplete}
          className="bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 active:scale-95 disabled:shadow-none w-full sm:w-auto"
        >
          {isSquareComplete ? "पूर्ण झाले" : "वर्ग वाढवा (Build)"}
        </button>
      </div>

      {/* Step 2: Add Remainder Blocks */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 transition-all gap-4 ${!isSquareComplete ? 'opacity-40 pointer-events-none bg-slate-50 border-slate-200' : isRemainderComplete ? 'bg-red-50 border-red-200' : 'bg-white border-red-500 shadow-md ring-4 ring-red-50'}`}>
        <div className="flex-1">
          <h4 className="font-bold text-red-700 flex items-center gap-2 text-lg">
            <MousePointerClick className="w-5 h-5" />
            पायरी २: लाल ठोकळे (बाकी) जोडा
          </h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm text-slate-500 font-medium">लाल ठोकळे:</span>
            <span className="text-2xl font-extrabold text-red-500">
              {userPlacedCount}
            </span>
            <span className="text-lg font-bold text-slate-400">/ {remainder}</span>
          </div>
          
          {/* Stockpile visual */}
          <div className="flex gap-1 mt-2 h-3 items-center">
             {Array.from({ length: Math.min(10, remainder - userPlacedCount) }).map((_, i) => (
                 <div key={i} className="w-3 h-3 bg-red-500 rounded-sm opacity-40"></div>
             ))}
             {(remainder - userPlacedCount) > 10 && <span className="text-[10px] text-slate-400 leading-none">...</span>}
          </div>
        </div>
        <button 
          onClick={onAddBlock} 
          disabled={!isSquareComplete || isRemainderComplete}
          className="bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-200 active:scale-95 disabled:shadow-none whitespace-nowrap w-full sm:w-auto"
        >
          एक ठोकळा जोडा
        </button>
      </div>

      {/* Reset */}
      {(builtRoot > 0) && (
        <div className="flex justify-center mt-4">
           <button 
              onClick={onReset}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm py-2 px-6 rounded-full hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all"
           >
              <RefreshCcw className="w-4 h-4" /> पुन्हा सुरुवात करा (Reset)
           </button>
        </div>
      )}
    </div>
  );
};