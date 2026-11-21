import React from 'react';
import { Bell, Activity, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = ({ title, subtitle, onQuickAction }) => {
  return (
    <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Backend Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-slate-400 font-mono text-[11px]">Backend: <span className="text-emerald-400 font-semibold">:8080 Active</span></span>
        </div>

        {/* Quick Link to AI */}
        <Link
          to="/ai-hub"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all border border-indigo-400/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>Ask AI Assistant</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
