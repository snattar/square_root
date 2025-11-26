import React from 'react';
import { Calculator, Plus, Minus, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-l-8 border-blue-500 flex flex-col md:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8 text-blue-500" />
          वर्गमूळ शोधक AI
        </h1>
        <p className="text-slate-600 mb-3 text-lg">
          Gemini AI सह गणित शिका: वाचा, ऐका आणि सोडवा. <br className="md:hidden"/>
          <span className="font-extrabold text-red-600">सर्वांच्या आवडीचे</span> <span className="font-extrabold text-green-600">सोपे गणित</span>
        </p>

        <div className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-100 text-slate-700 shadow-sm flex items-center gap-4 w-fit">
          <div className="flex-shrink-0 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-orange-400 flex flex-col items-center justify-center shadow-sm relative overflow-hidden group hover:scale-105 transition-transform">
              <div className="absolute top-0 left-0 w-full h-full bg-orange-50 opacity-20"></div>
              <span className="text-orange-600 font-black text-[10px] leading-none z-10">सोपे</span>
              <div className="flex gap-0.5 text-slate-600 z-10">
                <Plus className="w-3 h-3" />
                <Minus className="w-3 h-3" />
              </div>
              <span className="text-orange-600 font-black text-[10px] leading-none z-10">गणित</span>
            </div>
          </div>

          <div>
            <p className="font-extrabold text-blue-900 text-lg tracking-wide drop-shadow-sm">
              निर्मिती: श्री एस एन आत्तार
            </p>
            <p className="font-semibold text-slate-700 text-sm mt-0.5">
              शिरगाव हायस्कूल, शिरगाव, तालुका देवगड
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2 mt-2 md:mt-0 self-start md:self-center">
        <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold text-blue-700">Powered by Gemini AI</span>
      </div>
    </div>
  );
};