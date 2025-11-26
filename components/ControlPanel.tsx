import React from 'react';

interface ControlPanelProps {
  number: number;
  onChange: (n: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ number, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 1000) val = 1000;
    onChange(val);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <label className="block text-sm font-bold text-slate-500 mb-2">
        संख्या (Number) : आपल्याला ज्या संख्येचे वर्गमूळ काढायचे आहे ती संख्या निवडा
      </label>
      <input 
        type="number" 
        value={number} 
        onChange={handleInputChange} 
        className="w-full p-4 border-4 border-indigo-200 rounded-2xl text-5xl font-black text-center text-indigo-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 mb-6 outline-none transition-all shadow-inner bg-indigo-50/50" 
        min="1" 
        max="1000"
      />
      <input 
        type="range" 
        min="1" 
        max="100" 
        value={Math.min(number, 100)} 
        onChange={handleSliderChange} 
        className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all" 
      />
      <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-1">
        <span>1</span>
        <span>100 (Slider Max)</span>
      </div>
    </div>
  );
};