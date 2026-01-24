
import React, { useState, useCallback } from 'react';
import { AppState, Orientation, DeviceType, PreviewMode } from './types';
import { DEVICES } from './constants';
import ControlBar from './components/ControlBar';
import DeviceFrame from './components/DeviceFrame';
import { IconArrowRight, IconLaptop } from './components/Icons';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    url: '',
    zoom: 0.35,
    orientations: {
      mobile: 'portrait',
      tablet: 'portrait'
    },
    previewMode: 'live',
    isChecking: false
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const checkIframeCompatibility = async (url: string): Promise<PreviewMode> => {
    const lowerUrl = url.toLowerCase();

    // Whitelist for local development and dev platforms
    const isAlwaysLive = 
      lowerUrl.includes('localhost') || 
      lowerUrl.includes('127.0.0.1') || 
      lowerUrl.includes('vercel.app') || 
      lowerUrl.includes('netlify.app') ||
      lowerUrl.includes('pages.dev') ||
      lowerUrl.includes('gitpod.io');

    if (isAlwaysLive) return 'live';

    // Blacklist for major domains known to send X-Frame-Options: DENY/SAMEORIGIN or strict CSP
    const isStrictlyBlocked = [
      'instagram.com', 'chatgpt.com', 'openai.com', 'facebook.com', 
      'amazon.com', 'google.com', 'github.com', 'twitter.com', 
      'x.com', 'linkedin.com', 'apple.com', 'netflix.com', 
      'youtube.com', 'reddit.com', 'pinterest.com', 'quora.com',
      'medium.com', 'discord.com', 'twitch.tv'
    ].some(domain => lowerUrl.includes(domain));

    if (isStrictlyBlocked) return 'snapshot';

    return 'live'; 
  };

  const handleUrlSubmit = useCallback(async (newUrl: string) => {
    setState(prev => ({ ...prev, isChecking: true }));
    
    // Simulate a brief analysis for a professional "scanning" feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mode = await checkIframeCompatibility(newUrl);
    
    setState(prev => ({ 
      ...prev, 
      url: newUrl, 
      previewMode: mode,
      isChecking: false 
    }));
  }, []);

  const handleZoomChange = useCallback((newZoom: number) => {
    setState(prev => ({ ...prev, zoom: newZoom }));
  }, []);

  const handleToggleOrientation = useCallback((deviceId: DeviceType) => {
    setState(prev => ({
      ...prev,
      orientations: {
        ...prev.orientations,
        [deviceId]: prev.orientations[deviceId] === 'portrait' ? 'landscape' : 'portrait'
      }
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({ ...prev, url: '', previewMode: 'live' }));
  }, []);

  if (!state.url) {
    return (
      <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
        <header className="p-8 flex justify-center items-center w-full">
          <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={handleReset}>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-indigo-500/40 shadow-2xl group-hover:scale-110 transition-all duration-300 ring-2 ring-indigo-400/20">
              <IconLaptop className="text-white w-7 h-7" />
            </div>
            <span className="font-black text-3xl tracking-tighter text-white">LAYOUT<span className="text-indigo-500">LAB</span></span>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
          <div className="w-full max-w-4xl text-center space-y-12">
            <div className="space-y-8">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] lg:-ml-2 animate-in fade-in slide-in-from-top-4 duration-1000">
                Responsive <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-400">Perfected.</span>
              </h1>
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium italic opacity-90">
                  "A Frontend Website that shows the Frontend Of Every Website"
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                  — Frontend Developer
                </p>
              </div>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                let val = input.value.trim();
                if (val) {
                  // Ensure protocol
                  if (!/^https?:\/\//i.test(val)) {
                     if (val.startsWith('localhost') || val.startsWith('127.0.0.1')) {
                       val = 'http://' + val;
                     } else {
                       val = 'https://' + val;
                     }
                  }
                  handleUrlSubmit(val);
                }
              }}
              className="relative group max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-1000 delay-300"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative flex p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl">
                <input
                  type="text"
                  placeholder="Paste URL (e.g. chatgpt.com or instagram.com)"
                  className="w-full px-6 py-4 bg-transparent text-white focus:outline-none mono text-sm font-medium placeholder:text-slate-600"
                  disabled={state.isChecking}
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={state.isChecking}
                  className={`bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all transform hover:translate-x-1 shadow-xl shadow-indigo-500/20 active:scale-95 ${state.isChecking ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {state.isChecking ? 'Analyzing...' : 'Launch'} <IconArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-12 pt-16 border-t border-slate-900/50 animate-in fade-in duration-1000 delay-500">
              {[
                { label: 'Mobile', desc: 'iPhone 14' },
                { label: 'Tablet', desc: 'Standard' },
                { label: 'Laptop', desc: 'Standard' },
                { label: 'Desktop', desc: 'Ultra-Wide' }
              ].map((item, i) => (
                <div key={i} className="text-left group cursor-default">
                  <div className="text-white font-black text-xl mb-1 group-hover:text-indigo-400 transition-colors leading-none tracking-tighter">{item.label}</div>
                  <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="p-8 text-center animate-in fade-in duration-1000 delay-700">
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.3em]">
            Visual Testing Environment
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col overflow-hidden selection:bg-indigo-500/30">
      <ControlBar 
        url={state.url}
        onUrlSubmit={handleUrlSubmit}
        zoom={state.zoom}
        onZoomChange={handleZoomChange}
        onRefresh={handleRefresh}
        onReset={handleReset}
      />

      <div className="flex-1 overflow-auto bg-slate-950/50">
        <div className="min-h-full p-8 lg:p-16 flex items-start justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 items-start justify-items-center max-w-[2800px] mx-auto">
            {DEVICES.map(device => (
              <div key={device.id} className="w-full flex justify-center device-grid-item">
                <DeviceFrame
                  device={device}
                  url={state.url}
                  zoom={state.zoom}
                  orientation={state.orientations[device.id] || 'portrait'}
                  onToggleOrientation={() => handleToggleOrientation(device.id)}
                  refreshKey={refreshKey}
                  previewMode={state.previewMode}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-slate-900/90 backdrop-blur-2xl border border-white/5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-10 z-40 pointer-events-none sm:pointer-events-auto animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse ${state.previewMode === 'live' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
            <span className="text-[10px] font-black text-slate-100 uppercase tracking-[0.2em] text-nowrap">
              {state.previewMode === 'live' ? 'Live View' : 'Snapshot View'}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <span className="text-xs text-indigo-400 mono max-w-[240px] truncate font-bold">{state.url}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
