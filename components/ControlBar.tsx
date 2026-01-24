
import React, { useState, useEffect } from 'react';
import { IconRefresh, IconLaptop } from './Icons';

interface ControlBarProps {
  url: string;
  onUrlSubmit: (url: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onRefresh: () => void;
  onReset: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  url,
  onUrlSubmit,
  zoom,
  onZoomChange,
  onRefresh,
  onReset
}) => {
  const [tempUrl, setTempUrl] = useState(url);

  useEffect(() => {
    setTempUrl(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let trimmed = tempUrl.trim();
    if (trimmed) {
      if (!/^https?:\/\//i.test(trimmed)) {
        if (trimmed.startsWith('localhost') || trimmed.startsWith('127.0.0.1')) {
          trimmed = 'http://' + trimmed;
        } else {
          trimmed = 'https://' + trimmed;
        }
      }
      onUrlSubmit(trimmed);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full h-16 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 grid grid-cols-3 items-center px-6 shadow-xl">
      {/* Left Column: Form */}
      <div className="flex items-center justify-start min-w-0">
        <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
          <div className="relative group">
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="Enter URL..."
              className="w-full h-9 px-4 pr-12 bg-slate-800/50 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500 mono"
            />
            <button 
              type="submit"
              className="absolute right-1 top-1 h-7 px-2.5 text-[9px] font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all active:scale-95"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      {/* Center Column: Branding */}
      <div className="flex justify-center">
        <button 
          onClick={onReset}
          type="button"
          className="flex items-center gap-3 hover:opacity-80 transition-all active:scale-95 group"
          aria-label="Back to home"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-500/30 shadow-lg group-hover:scale-105 transition-transform">
            <IconLaptop className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">LAYOUT<span className="text-indigo-400">LAB</span></span>
        </button>
      </div>

      {/* Right Column: Controls */}
      <div className="flex items-center justify-end gap-5">
        <div className="hidden md:flex items-center gap-4 border-r border-slate-800 pr-5">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.2"
              max="1"
              step="0.05"
              value={zoom}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[9px] font-black text-slate-500 w-6 text-right uppercase">{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        <button
          onClick={onRefresh}
          type="button"
          className="flex items-center gap-2 h-9 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95"
          title="Reload Viewports"
        >
          <IconRefresh className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
