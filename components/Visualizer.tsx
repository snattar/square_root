import React, { useMemo } from 'react';

interface VisualizerProps {
  integerRoot: number;
  builtRoot: number;
  userPlacedCount: number;
  isSquareComplete: boolean;
  isRemainderComplete: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  integerRoot,
  builtRoot,
  userPlacedCount,
  isSquareComplete,
  isRemainderComplete
}) => {
  const gridSize = integerRoot + 1;
  const boxSize = 30;
  const gap = 3;
  const totalSize = gridSize * (boxSize + gap);

  const rects = useMemo(() => {
    const elements: React.ReactElement[] = [];

    // 1. Main Square (Layer by Layer)
    for (let r = 0; r < integerRoot; r++) {
      for (let c = 0; c < integerRoot; c++) {
        // A block is visible if it falls within the 'builtRoot' size
        const isVisible = r < builtRoot && c < builtRoot;
        // Highlight the latest layer being added
        const isNewestLayer = r === builtRoot - 1 || c === builtRoot - 1;
        
        const baseClass = isVisible 
            ? (isNewestLayer ? "fill-green-400" : "fill-green-500") 
            : "fill-slate-50 stroke-slate-200 stroke-2 [stroke-dasharray:4] stroke-opacity-50"; // Ghost block

        elements.push(
          <rect 
            key={`main-${r}-${c}`} 
            x={c * (boxSize + gap)} 
            y={r * (boxSize + gap)} 
            width={boxSize} 
            height={boxSize} 
            className={`${baseClass} transition-all duration-300`} 
            rx={6} 
          />
        );

        if (isVisible && integerRoot <= 10) {
           elements.push(
               <text key={`t-${r}-${c}`} x={c * (boxSize + gap) + 15} y={r * (boxSize + gap) + 15} dominantBaseline="middle" textAnchor="middle" className="fill-white text-[10px] font-bold pointer-events-none select-none">
                   {(r * integerRoot) + c + 1}
               </text>
           )
        }
      }
    }

    // 2. Remainder Blocks (Red) - Only show placeholders if Main Square is fully built
    if (builtRoot === integerRoot) {
        let currentSlot = 0;
        
        // Right Column
        for(let r = 0; r < integerRoot; r++) {
           const isFilled = currentSlot < userPlacedCount;
           const colorClass = isFilled ? "fill-red-500" : "fill-slate-50 stroke-slate-200 stroke-2 [stroke-dasharray:4] stroke-opacity-50";
            
           elements.push(<rect key={`sr-${r}`} x={integerRoot * (boxSize + gap)} y={r * (boxSize + gap)} width={boxSize} height={boxSize} className={`${colorClass} transition-all duration-300`} rx={6} />);
           if (isFilled) elements.push(<text key={`tr-${r}`} x={integerRoot * (boxSize + gap) + 15} y={r * (boxSize + gap) + 15} dominantBaseline="middle" textAnchor="middle" className="fill-white text-xs font-bold pointer-events-none select-none">{currentSlot + 1}</text>);
           currentSlot++;
        }
        
        // Bottom Row
        for(let c = 0; c <= integerRoot; c++) {
           const isFilled = currentSlot < userPlacedCount;
           const colorClass = isFilled ? "fill-red-500" : "fill-slate-50 stroke-slate-200 stroke-2 [stroke-dasharray:4] stroke-opacity-50";
            
           elements.push(<rect key={`sb-${c}`} x={c * (boxSize + gap)} y={integerRoot * (boxSize + gap)} width={boxSize} height={boxSize} className={`${colorClass} transition-all duration-300`} rx={6} />);
           if (isFilled) elements.push(<text key={`tb-${c}`} x={c * (boxSize + gap) + 15} y={integerRoot * (boxSize + gap) + 15} dominantBaseline="middle" textAnchor="middle" className="fill-white text-xs font-bold pointer-events-none select-none">{currentSlot + 1}</text>);
           currentSlot++;
        }
    }

    return elements;
  }, [integerRoot, builtRoot, userPlacedCount]);

  if (integerRoot <= 0) return <p className="text-slate-400">कृपया संख्या निवडा</p>;

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 p-8 overflow-auto relative min-h-[400px]">
      <svg width={totalSize} height={totalSize} className="mx-auto overflow-visible transition-all duration-500 ease-out">
        {rects}
      </svg>

      {/* Celebration Message */}
      {isSquareComplete && isRemainderComplete && (
        <div className="absolute bottom-4 right-4 max-w-xs animate-in slide-in-from-right-10 fade-in duration-700 z-10">
            <div className="bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-xl border-2 border-green-500 flex items-center gap-3">
                <span className="text-2xl animate-bounce">🎉</span>
                <div>
                    <h3 className="font-bold text-green-700 text-sm">अभिनंदन!</h3>
                    <p className="text-xs text-slate-600 font-medium">आकृती पूर्ण झाली आहे.</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};