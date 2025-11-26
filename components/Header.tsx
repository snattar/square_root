import React from 'react';
import { Calculator, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-l-8 border-blue-500 flex flex-col md:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8 text-blue-500" />
          वर्गमूळ शोधक AI
        </h1>
        <p className="text-slate-600 mb-3 text-lg">
          AI सह गणित शिका: वाचा, ऐका आणि सोडवा. <br className="md:hidden"/>
          <span className="font-extrabold text-red-600">सर्वांच्या आवडीचे</span> <span className="font-extrabold text-green-600">सोपे गणित</span>
        </p>

        <div className="text-sm bg-blue-50 p-3 rounded-lg border border-blue-100 text-slate-700 shadow-sm flex items-center gap-4 w-fit">
          {/* Custom Logo: Lightbulb with Pi */}
          <div className="flex-shrink-0">
             <div className="w-20 h-24 relative flex items-center justify-center group hover:scale-105 transition-transform duration-300">
               <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-sm">
                 <defs>
                   <path id="textCurve" d="M 25,95 A 75,75 0 1,1 175,95" />
                 </defs>
                 <text fontSize="24" fontWeight="800" fill="#9A3412" letterSpacing="1.5">
                   <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
                     SOPE GANIT.IN
                   </textPath>
                 </text>
                 
                 {/* Bulb Outline */}
                 <path 
                   d="M 60,100 
                      A 40,40 0 1,1 140,100 
                      C 140,130 120,150 115,165 
                      L 85,165 
                      C 80,150 60,130 60,100 Z" 
                   fill="none" 
                   stroke="#9A3412" 
                   strokeWidth="7"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                 />
                 
                 {/* Pi Symbol */}
                 <text x="100" y="145" textAnchor="middle" fontSize="65" fontWeight="bold" fill="#9A3412" style={{ fontFamily: 'serif' }}>π</text>
                 
                 {/* Base Threads */}
                 <rect x="85" y="168" width="30" height="6" rx="2" fill="#9A3412" />
                 <rect x="85" y="176" width="30" height="6" rx="2" fill="#9A3412" />
                 <rect x="85" y="184" width="30" height="6" rx="2" fill="#9A3412" />
                 <path d="M 92,192 L 108,192 L 100,205 Z" fill="#9A3412" />

                 {/* Left Arrow with Angle */}
                 <path d="M 85,180 L 35,180 L 43,172 M 35,180 L 43,188" stroke="#9A3412" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                 
                 {/* Angle Arc */}
                 <path d="M 70,180 A 15,15 0 0,0 65,165" stroke="#9A3412" strokeWidth="2" fill="none" />
               </svg>
             </div>
          </div>

          <div>
            <p className="font-extrabold text-blue-900 text-2xl tracking-wide drop-shadow-sm mb-1">
              निर्मिती: श्री एस एन आत्तार
            </p>
            <p className="font-semibold text-slate-700 text-base mb-2">
              शिरगाव हायस्कूल, शिरगाव, तालुका देवगड
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-slate-600 font-medium text-sm">
               <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                 <span className="text-lg">📱</span> +91 9922 4134 92
               </span>
               <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                 <span className="text-lg">📧</span> snattar1968@gmail.com
               </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2 mt-2 md:mt-0 self-start md:self-center">
        <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold text-blue-700">Powered by AI</span>
      </div>
    </div>
  );
};
