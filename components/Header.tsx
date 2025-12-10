import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'kn';
  setLang: (lang: 'en' | 'kn') => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <div className="flex justify-between items-center p-4 pt-6">
      <div className="flex items-center gap-2">
        <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
          <Activity className="w-6 h-6 text-emerald-400" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Clinikk</span>
      </div>

      <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
        <button 
          onClick={() => setLang('en')}
          className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm transition-all ${lang === 'en' ? 'bg-teal-500 text-white' : 'text-white/70 hover:text-white'}`}
        >
          En
        </button>
        <button 
          onClick={() => setLang('kn')}
          className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm transition-all ${lang === 'kn' ? 'bg-teal-500 text-white' : 'text-white/70 hover:text-white'}`}
        >
          ಕ
        </button>
      </div>
    </div>
  );
};