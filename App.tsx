import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { AITutor } from './components/AITutor';
import { StatsPanel } from './components/StatsPanel';
import { Visualizer } from './components/Visualizer';
import { InteractiveControls } from './components/InteractiveControls';
import { playAudioData } from './utils/audio';

export default function App() {
  const [number, setNumber] = useState<number>(27);
  
  // Visualizer State
  const [builtRoot, setBuiltRoot] = useState(0);
  const [userPlacedCount, setUserPlacedCount] = useState(0);

  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);

  // Math Calculations
  const integerRoot = Math.floor(Math.sqrt(number));
  const perfectSquare = integerRoot * integerRoot;
  const remainder = number - perfectSquare;
  const nextRoot = integerRoot + 1;
  const nextPerfectSquare = nextRoot * nextRoot;
  const denominator = nextPerfectSquare - perfectSquare;
  const approxFraction = integerRoot + (remainder / denominator);

  const resetSimulation = () => {
    setBuiltRoot(0);
    setUserPlacedCount(0);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const handleNumberChange = (newNumber: number) => {
    setNumber(newNumber);
    resetSimulation();
  };

  const handleBuildStep = () => {
    if (builtRoot < integerRoot) {
      setBuiltRoot(prev => prev + 1);
    }
  };

  const handleAddBlock = () => {
    if (userPlacedCount < remainder) {
      setUserPlacedCount(prev => prev + 1);
    }
  };

  const handleResetVisuals = () => {
    setBuiltRoot(0);
    setUserPlacedCount(0);
  };

  // Ensure visual state is valid if number changes drastically (e.g. typing)
  useEffect(() => {
    const currentIntRoot = Math.floor(Math.sqrt(number));
    const currentRemainder = number - (currentIntRoot * currentIntRoot);
    
    if (builtRoot > currentIntRoot) setBuiltRoot(currentIntRoot);
    if (userPlacedCount > currentRemainder) setUserPlacedCount(currentRemainder);
  }, [number, builtRoot, userPlacedCount]);

  const handlePlayAudio = async (base64Audio: string) => {
      if (audioContextRef.current) {
        await audioContextRef.current.close();
      }
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      await playAudioData(base64Audio, audioContextRef.current);
  };

  const isSquareComplete = builtRoot === integerRoot;
  const isRemainderComplete = userPlacedCount >= remainder;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Controls & AI */}
          <div className="lg:col-span-4 space-y-6">
            <ControlPanel number={number} onChange={handleNumberChange} />
            
            <AITutor 
              number={number} 
              perfectSquare={perfectSquare}
              integerRoot={integerRoot}
              remainder={remainder}
              onPlayAudio={handlePlayAudio}
            />

            <StatsPanel 
              number={number}
              integerRoot={integerRoot}
              builtRoot={builtRoot}
              remainder={remainder}
              userPlacedCount={userPlacedCount}
              denominator={denominator}
              approxFraction={approxFraction}
              isSquareComplete={isSquareComplete}
              isRemainderComplete={isRemainderComplete}
            />
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col min-h-[600px] border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xl">
                  <span className="bg-blue-100 p-1.5 rounded-lg text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                  </span>
                  आकृती (Visualization)
                </h2>
                <div className="flex gap-4 text-xs font-medium">
                   <div className="flex items-center gap-1.5">
                     <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                     <span>पूर्ण वर्ग</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                     <span>बाकी</span>
                   </div>
                </div>
              </div>

              <Visualizer 
                integerRoot={integerRoot}
                builtRoot={builtRoot}
                userPlacedCount={userPlacedCount}
                isSquareComplete={isSquareComplete}
                isRemainderComplete={isRemainderComplete}
              />

              <div className="mt-8 pt-6 border-t border-slate-100">
                 <InteractiveControls 
                    builtRoot={builtRoot}
                    integerRoot={integerRoot}
                    userPlacedCount={userPlacedCount}
                    remainder={remainder}
                    onBuildStep={handleBuildStep}
                    onAddBlock={handleAddBlock}
                    onReset={handleResetVisuals}
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}