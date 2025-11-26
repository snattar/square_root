import React, { useState } from 'react';
import { Sparkles, Brain, BookOpen, GraduationCap, Globe, Volume2, Loader2 } from 'lucide-react';
import { generateText, generateSpeech } from '../services/gemini';
import { AIMode } from '../types';

interface AITutorProps {
  number: number;
  perfectSquare: number;
  integerRoot: number;
  remainder: number;
  onPlayAudio: (base64: string) => void;
}

export const AITutor: React.FC<AITutorProps> = ({ 
  number, 
  perfectSquare, 
  integerRoot, 
  remainder,
  onPlayAudio 
}) => {
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [aiMode, setAiMode] = useState<AIMode>(null);

  const handleAction = async (mode: AIMode) => {
    if (!mode) return;
    setLoadingAI(true);
    setAiMode(mode);
    setAiResponse('');

    let prompt = '';
    switch (mode) {
      case 'explain':
        prompt = `मी इयत्ता ८वीचा विद्यार्थी आहे. संख्या: ${number}. 
        पूर्ण वर्ग: ${perfectSquare} (${integerRoot}²), बाकी: ${remainder}.
        मला मराठीत ३-४ ओळीत सोप्या भाषेत सांगा की ही 'बाकी' वापरून आपण वर्गमूळाचा अंदाज कसा काढतो?`;
        break;
      case 'quiz':
        prompt = `संख्या ${number} किंवा वर्गमूळाशी संबंधित एक सोपा बहुपर्यायी प्रश्न (MCQ) मराठीत तयार करा. 
        उत्तर आणि स्पष्टीकरण शेवटी द्या.`;
        break;
      case 'problem':
        prompt = `संख्या "${number}" वापरून एक व्यावहारिक शाब्दिक उदाहरण (Word Problem) मराठीत तयार करा.
        उदा. "जर तुमच्याकडे ${number} फरश्या असतील आणि तुम्हाला चौरस खोली बनवायची असेल, तर..." 
        अशा प्रकारचे उदाहरण आणि त्याचे उत्तर द्या.`;
        break;
      case 'realLife':
        prompt = `सध्याची संख्या ${number} आहे. मला सांगा की दैनंदिन जीवनात, विज्ञानात, निसर्गात किंवा गणितात या संख्येचे किंवा त्याच्या वर्गमुळाचे (${Math.sqrt(number).toFixed(2)}) काय व्यावहारिक महत्त्व किंवा उपयोग आहे? 
        हे एका शालेय विद्यार्थ्याला समजेल अशा सोप्या आणि रंजक मराठी भाषेत सांगा (जास्तीत जास्त ३-४ ओळी).`;
        break;
    }

    try {
      const text = await generateText(prompt);
      setAiResponse(text);
    } catch (error) {
      setAiResponse("त्रुटी: AI सेवा उपलब्ध नाही.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleTTS = async () => {
    if (!aiResponse) return;
    setLoadingAudio(true);
    try {
      const audioData = await generateSpeech(aiResponse);
      if (audioData) {
        onPlayAudio(audioData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAudio(false);
    }
  };

  const ActionButton = ({ mode, icon: Icon, label, colorClass }: { mode: AIMode, icon: any, label: string, colorClass: string }) => (
    <button 
      onClick={() => handleAction(mode)} 
      disabled={loadingAI} 
      className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-indigo-100 hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      <Icon className={`w-6 h-6 mb-1.5 ${colorClass}`} />
      <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-indigo-100">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-800">
        <Sparkles className="w-5 h-5 text-indigo-600 fill-indigo-200" /> 
        AI शिक्षक (AI Tutor)
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <ActionButton mode="explain" icon={Brain} label="समजावून सांगा" colorClass="text-indigo-500" />
        <ActionButton mode="problem" icon={BookOpen} label="शाब्दिक उदाहरण" colorClass="text-pink-500" />
        <ActionButton mode="quiz" icon={GraduationCap} label="प्रश्न विचारा" colorClass="text-purple-500" />
        <ActionButton mode="realLife" icon={Globe} label="व्यवहारात उपयोग" colorClass="text-green-600" />
      </div>

      {loadingAI && (
        <div className="flex items-center justify-center gap-2 p-4 text-sm text-indigo-600 animate-pulse bg-white/50 rounded-xl">
          <Loader2 className="w-4 h-4 animate-spin" />
          विचार करत आहे...
        </div>
      )}

      {aiResponse && !loadingAI && (
        <div className="bg-white p-4 rounded-xl border border-indigo-100 text-sm text-slate-700 leading-relaxed shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-indigo-50">
            <span className="text-xs font-bold uppercase text-indigo-400 tracking-wider">
              {aiMode === 'explain' ? 'स्पष्टीकरण' : aiMode === 'quiz' ? 'प्रश्न' : aiMode === 'problem' ? 'उदाहरण' : 'उपयोग'}
            </span>
            <button 
              onClick={handleTTS} 
              disabled={loadingAudio}
              className="p-2 rounded-full transition-colors bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 disabled:opacity-50"
              title="वाचून दाखवा"
            >
              {loadingAudio ? <Loader2 className="w-4 h-4 animate-spin"/> : <Volume2 className="w-4 h-4"/>}
            </button>
          </div>
          <div className="whitespace-pre-wrap font-medium">{aiResponse}</div>
        </div>
      )}
    </div>
  );
};